<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, useId, watch } from 'vue';
import { Download, FileText, Film, Trash2 } from '@lucide/vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventDate from '@/components/events/EventDate.vue';
import { formatDate } from '@/utils/dateUtils';
import IdPicker, { type PickerOption } from './IdPicker.vue';
import MarkdownEditor from './MarkdownEditor.vue';
import { convertToJpeg, optimizeImage, MAX_SIDE } from '@/utils/image-optimize';
import { focusRing, hintClass, inputClass, labelClass, linkClass } from './styles';
import {
  BLUESKY_LIMIT,
  CONTINENTS,
  IMAGE_WIDTHS,
  OFFERED_SUBSITES,
  OUTLINES,
  buildPost,
  emptyForm,
  githubLink,
  mainSubsiteChoices,
  mdxProblems,
  mediaKind,
  mediaMarkdown,
  mediaName,
  postPath,
  newEntries,
  placeholderLinks,
  postProblems,
  TITLE_PROBLEM,
  DATE_PROBLEM,
  slugFromTitle,
  socialPost,
  uploadPageUrl,
  PUBLISHED_TYPES,
  type ImageSize,
  type Outline,
  type PostForm,
  type PostKind,
} from '@/utils/post-creator';

const props = defineProps<{
  tags: string[];
  people: PickerOption[];
  funders: PickerOption[];
}>();

const DOCS = 'https://github.com/galaxyproject/galaxy-hub/blob/main/CONTRIBUTING.md';
const FILES = 'https://github.com/galaxyproject/galaxy-hub/blob/main/content';
// People, organisations and grants are copied from the GTN every night (sync-training-material-metadata.yml)
const GTN = 'https://github.com/galaxyproject/training-material/edit/main';
const NONE = '__none__';

const form = reactive(emptyForm('news', ''));
// en-CA formats as YYYY-MM-DD in the author's time zone
const today = () => new Date().toLocaleDateString('en-CA');

// Autosave: the form (not the files) is kept in this browser until the author starts over
const DRAFT_KEY = 'galaxy-hub:post-creator-draft';
const draft = ref<{ form: PostForm; savedAt: string } | null>(null);
let autosave = false;
let saveTimer: ReturnType<typeof setTimeout> | undefined;

// Read storage and set today's date after hydration, so the server render and the client match
onMounted(() => {
  if (!form.date) form.date = today();
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? 'null');
    if (saved?.form && (saved.form.title?.trim() || saved.form.body?.trim())) draft.value = saved;
  } catch {
    // Unreadable draft, or storage blocked: start without one
    forgetDraft();
  }
  // Wait for the author's answer before saving over an older draft
  autosave = !draft.value;
});

watch(
  form,
  (value) => {
    if (!autosave) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      if (!value.title.trim() && !value.body.trim()) return forgetDraft();
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ form: value, savedAt: new Date().toISOString() }));
        autosaveOff.value = false;
      } catch {
        // Storage full or blocked (private mode, site settings)
        autosaveOff.value = true;
      }
    }, 500);
  },
  { deep: true }
);

const autosaveOff = ref(false);

function forgetDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Storage blocked: nothing was saved either
  }
}

function restoreDraft() {
  if (draft.value) Object.assign(form, emptyForm(draft.value.form.kind ?? 'news', today()), draft.value.form);
  draft.value = null;
  autosave = true;
}

function discardDraft() {
  forgetDraft();
  draft.value = null;
  autosave = true;
}

const savedAtText = computed(() =>
  draft.value
    ? new Date(draft.value.savedAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : ''
);

// Two clicks instead of a confirm() dialog
const confirmStartOver = ref(false);
let startOverTimer: ReturnType<typeof setTimeout> | undefined;
function startOver() {
  if (!confirmStartOver.value) {
    confirmStartOver.value = true;
    startOverTimer = setTimeout(() => (confirmStartOver.value = false), 4000);
    return;
  }
  confirmStartOver.value = false;
  media.value.forEach(revokeMedia);
  media.value = [];
  Object.assign(form, emptyForm(form.kind, today()));
  forgetDraft();
}

const id = (name: string) => `post-${name}-${useId()}`;
const ids = {
  kind: id('kind'),
  title: id('title'),
  titleError: id('title-error'),
  dateError: id('date-error'),
  date: id('date'),
  end: id('end'),
  tease: id('tease'),
  teaseHint: id('tease-hint'),
  continent: id('continent'),
  location: id('location'),
  contact: id('contact'),
  url: id('url'),
  urlHint: id('url-hint'),
  contactHint: id('contact-hint'),
  main: id('main'),
  slug: id('slug'),
  body: id('body'),
  bodyHint: id('body-hint'),
  secBasics: id('basics'),
  secDetails: id('details'),
  secListing: id('listing'),
  secPeople: id('people'),
  secText: id('text'),
  media: id('media'),
};

const isEvent = computed(() => form.kind === 'event');
// With an external link the post page redirects there (news and events [...slug].astro), so the text
// is not shown anywhere; the first image still becomes the list and social media picture
const linksOut = computed(() => form.externalUrl.trim() !== '');
const externalHost = computed(() => {
  const url = form.externalUrl.trim();
  return URL.canParse(url) ? new URL(url).hostname : url;
});
const writeAnyway = ref(false);
const tagOptions = computed(() => props.tags.map((tag) => ({ id: tag, name: tag })));
const mainChoices = computed(() => mainSubsiteChoices(form.subsites));
const subsiteName = (value: string) => OFFERED_SUBSITES.find((s) => s.id === value)?.name ?? value;

watch(mainChoices, (choices) => {
  if (form.mainSubsite && !choices.includes(form.mainSubsite)) form.mainSubsite = '';
});

// Reka Select reserves '' for "no value"; map it to a sentinel item.
// Its content uses :body-lock="false": locking body scroll makes <body> a scroll container,
// which unsticks the sticky preview and makes it jump.
const selectModel = (key: 'continent' | 'mainSubsite') =>
  computed({
    get: () => form[key] || NONE,
    set: (value: unknown) => (form[key] = typeof value === 'string' && value !== NONE ? value : ''),
  });
const continent = selectModel('continent');
const mainSubsite = selectModel('mainSubsite');

const path = computed(() => postPath(form));
const text = computed(() => buildPost(form));
const link = computed(() => githubLink(form, text.value));
// MDX is checked with its own parser, loaded on first use; the latest run wins
const mdxIssues = ref<string[]>([]);
let mdxTimer: ReturnType<typeof setTimeout> | undefined;
let mdxRun = 0;
watch(
  () => form.body,
  (body) => {
    clearTimeout(mdxTimer);
    mdxTimer = setTimeout(async () => {
      const run = ++mdxRun;
      const issues = await mdxProblems(body);
      if (run === mdxRun) mdxIssues.value = issues;
    }, 400);
  }
);
const problems = computed(() => [...postProblems(form), ...mdxIssues.value]);
// Title and date errors show once the field was left empty, not on a fresh form
const touched = reactive({ title: false, date: false });
const titleError = computed(() => (touched.title && problems.value.includes(TITLE_PROBLEM) ? TITLE_PROBLEM : ''));
const dateError = computed(() => (touched.date && problems.value.includes(DATE_PROBLEM) ? DATE_PROBLEM : ''));
const listedProblems = computed(() =>
  problems.value.filter((p) => !((p === TITLE_PROBLEM && !touched.title) || (p === DATE_PROBLEM && !touched.date)))
);
const waitingFor = computed(() =>
  [
    !touched.title && problems.value.includes(TITLE_PROBLEM) && 'the title',
    !touched.date && problems.value.includes(DATE_PROBLEM) && 'the date',
  ]
    .filter(Boolean)
    .join(' and ')
);
const warnings = computed(() => [
  ...media.value
    .filter((m) => mediaKind(m.name) === 'image' && !m.alt.trim())
    .map((m) => `Describe ${m.name} (alt text), so people using screen readers know what it shows.`),
  ...placeholderLinks(form.body).map((text) => `Add the address for the link “${text}”, or remove it.`),
]);
const social = computed(() => socialPost(form));
const added = computed(() =>
  newEntries(form, {
    tags: props.tags,
    people: props.people.map((p) => p.id),
    funders: props.funders.map((f) => f.id),
  })
);
const month = new Date().toLocaleDateString('en-CA').slice(0, 7);
const copied = ref(false);

const copyFailed = ref(false);
let copiedTimer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    await navigator.clipboard.writeText(text.value);
    copied.value = true;
    copyFailed.value = false;
    copiedTimer = setTimeout(() => (copied.value = false), 3000);
  } catch {
    // Refused (permissions, insecure page): the File tab shows the text to copy by hand
    copyFailed.value = true;
  }
}

const KINDS: { kind: PostKind; label: string }[] = [
  { kind: 'news', label: 'News' },
  { kind: 'event', label: 'Event' },
];

function setKind(kind: PostKind) {
  form.kind = kind;
}

const chip = 'inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors ' + focusRing;
// Underline tabs: grey text, the active one dark with a 4px gold bar; the bar sits on the list's bottom line.
// The focus outline is inset because the card clips its corners.
const tabClass =
  '-mb-px h-auto min-h-11 flex-none rounded-none border-0 border-b-4 border-transparent bg-transparent px-0 pt-3 pb-2 text-base font-medium text-fg-2 shadow-none hover:text-fg-strong data-[state=active]:border-galaxy-gold data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-fg-strong data-[state=active]:shadow-none focus-visible:ring-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid focus-visible:outline-galaxy-primary';

// Files stay in the browser: the GitHub link carries text only, so authors upload them to the post folder.
// Each file's text in the editor is tracked, so changing alt text, caption or size updates it in place.
interface MediaItem {
  name: string;
  /** The version that will be uploaded: the smaller copy, unless the author keeps the original. */
  url: string;
  size: number;
  originalUrl: string;
  originalSize: number;
  optimizing: boolean;
  smaller?: { url: string; size: number; width: number; height: number; originalWidth: number; originalHeight: number };
  keepOriginal: boolean;
  alt: string;
  caption: string;
  imageSize: ImageSize;
  snippet: string;
}
const MAX_UPLOAD = 25 * 1024 * 1024; // GitHub's web upload limit per file
const media = ref<MediaItem[]>([]);
const fileInput = ref<HTMLInputElement>();
const editor = ref<InstanceType<typeof MarkdownEditor>>();

const snippetFor = (item: MediaItem) =>
  mediaMarkdown(item.name, { alt: item.alt, caption: item.caption, size: item.imageSize });

const fileNotice = ref('');

/**
 * Adds files at the cursor: from the file picker, a drop or a paste. Only types the build publishes
 * are kept; photos in other formats (HEIC, AVIF, ...) become JPEGs when the browser can read them.
 */
async function addFiles(dropped: File[]) {
  const files: File[] = [];
  const refused: string[] = [];
  for (const file of dropped) {
    if (mediaKind(file.name)) files.push(file);
    else {
      const jpeg =
        file.type.startsWith('image/') || /\.(heic|heif|avif|tiff?|bmp)$/i.test(file.name)
          ? await convertToJpeg(file)
          : null;
      if (jpeg) files.push(jpeg);
      else refused.push(file.name);
    }
  }
  fileNotice.value = refused.length
    ? `${refused.join(', ')}: the Hub can only publish ${PUBLISHED_TYPES.map((t) => t.toUpperCase()).join(', ')} files.`
    : '';
  for (const file of files) {
    const name = mediaName(
      file.name,
      media.value.map((m) => m.name)
    );
    const url = URL.createObjectURL(file);
    const item: MediaItem = {
      name,
      url,
      size: file.size,
      originalUrl: url,
      originalSize: file.size,
      optimizing: mediaKind(name) === 'image',
      keepOriginal: false,
      alt: '',
      caption: '',
      imageSize: 'full',
      snippet: '',
    };
    item.snippet = snippetFor(item);
    media.value.push(item);
    editor.value?.insertBlock(item.snippet);
    // The text goes in right away; the smaller copy follows (the reactive item, not the plain object)
    if (item.optimizing) void shrink(media.value[media.value.length - 1], file);
  }
}

async function shrink(item: MediaItem, file: File) {
  const result = await optimizeImage(file);
  item.optimizing = false;
  if (!result || !media.value.includes(item)) return;
  const { blob, ...dimensions } = result;
  item.smaller = { url: URL.createObjectURL(blob), size: blob.size, ...dimensions };
  useVersion(item, false);
}

function useVersion(item: MediaItem, keepOriginal: boolean) {
  item.keepOriginal = keepOriginal;
  const chosen = !keepOriginal && item.smaller ? item.smaller : { url: item.originalUrl, size: item.originalSize };
  item.url = chosen.url;
  item.size = chosen.size;
}

function revokeMedia(item: MediaItem) {
  URL.revokeObjectURL(item.originalUrl);
  if (item.smaller) URL.revokeObjectURL(item.smaller.url);
}

function onFiles(event: Event) {
  const input = event.target as HTMLInputElement;
  void addFiles([...(input.files ?? [])]);
  input.value = '';
}

function updateMedia(item: MediaItem, change: Partial<Pick<MediaItem, 'alt' | 'caption' | 'imageSize'>>) {
  Object.assign(item, change);
  const next = snippetFor(item);
  // When the author edited the text by hand and it is not found, the text is left alone
  editor.value?.replaceText(item.snippet, next);
  item.snippet = next;
}

function removeMedia(item: MediaItem) {
  editor.value?.replaceText(item.snippet, '');
  revokeMedia(item);
  media.value = media.value.filter((m) => m !== item);
}

function useOutline(outline: Outline) {
  form.body = outline.text;
}

const IMAGE_SIZES: { value: ImageSize; label: string }[] = [
  { value: 'full', label: 'Full width' },
  { value: 'medium', label: `Medium (${IMAGE_WIDTHS.medium} px)` },
  { value: 'small', label: `Small (${IMAGE_WIDTHS.small} px)` },
];

onBeforeUnmount(() => {
  media.value.forEach(revokeMedia);
  [saveTimer, mdxTimer, previewTimer, copiedTimer, startOverTimer].forEach((timer) => clearTimeout(timer));
});

// Posts with files (or text too long for a link) go up through GitHub's upload page in one commit
const useUpload = computed(() => media.value.length > 0 || !link.value.complete);
const uploadUrl = computed(() => uploadPageUrl(form));
const saved = ref(false);

// Saving waits for the smaller copies, so what is saved is what the cards describe
const shrinking = computed(() => media.value.some((m) => m.optimizing));
// Chrome and Edge can write into a folder the author picks, with the exact names; others download
const canPickFolder = ref(false);
onMounted(() => (canPickFolder.value = 'showDirectoryPicker' in window));
const savedTo = ref('');

type DirectoryHandle = {
  name: string;
  getFileHandle(
    name: string,
    options: { create: boolean }
  ): Promise<{
    createWritable(): Promise<{ write(data: Blob): Promise<void>; close(): Promise<void> }>;
  }>;
};

/** Saves index.md and every file under the names the text uses. */
async function saveAll() {
  const indexUrl = URL.createObjectURL(new Blob([text.value], { type: 'text/markdown' }));
  const files = [{ name: 'index.md', url: indexUrl }, ...media.value.map((m) => ({ name: m.name, url: m.url }))];
  if (canPickFolder.value) {
    try {
      const pick = (window as unknown as { showDirectoryPicker: (o: object) => Promise<DirectoryHandle> })
        .showDirectoryPicker;
      const dir = await pick({ id: 'galaxy-hub-post', mode: 'readwrite' });
      for (const file of files) {
        const writable = await (await dir.getFileHandle(file.name, { create: true })).createWritable();
        await writable.write(await (await fetch(file.url)).blob());
        await writable.close();
      }
      savedTo.value = dir.name;
      saved.value = true;
      URL.revokeObjectURL(indexUrl);
      return;
    } catch (error) {
      if ((error as Error).name === 'AbortError') return;
      // Not allowed here (permissions, sandboxed browser): fall back to downloads
      canPickFolder.value = false;
    }
  }
  savedTo.value = '';
  for (const file of files) {
    const a = document.createElement('a');
    a.href = file.url;
    a.download = file.name;
    document.body.append(a);
    a.click();
    a.remove();
    // Browsers drop downloads that start in the same instant
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  setTimeout(() => URL.revokeObjectURL(indexUrl), 10_000);
  saved.value = true;
}

const uploadNames = computed(() => ['index.md', ...media.value.map((m) => m.name)]);

// The social media bot attaches the local images it finds in the text
const attachedImages = computed(() =>
  media.value.filter((m) => mediaKind(m.name) === 'image' && form.body.includes(`./${m.name}`)).map((m) => m.name)
);

// The preview runs the build's own steps (utils/post-preview.ts), loaded on first use
const bodyHtml = ref('');
const pageSlug = computed(() => `${form.kind === 'news' ? 'news' : 'events'}/${path.value.split('/').at(-2)}`);
let previewTimer: ReturnType<typeof setTimeout> | undefined;
let previewRun = 0;
watch(
  [() => form.body, pageSlug, () => media.value.map((m) => [m.name, m.url])],
  () => {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(async () => {
      const run = ++previewRun;
      const { renderPostBody } = await import('@/utils/post-preview');
      const files = Object.fromEntries(media.value.map((m) => [m.name, m.url]));
      const html = form.body.trim() ? await renderPostBody(form.body, { slug: pageSlug.value, files }) : '';
      if (run === previewRun) bodyHtml.value = html;
    }, 250);
  },
  { deep: true }
);
const folder = computed(() => path.value.replace(/\/index\.md$/, '/'));
const sizeText = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.ceil(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-2">
    <form class="space-y-8" @submit.prevent>
      <div v-if="draft" class="space-y-2 rounded-md bg-info-bg p-3 text-sm text-info-fg" role="status" data-draft>
        <p>
          You have an unfinished post from {{ savedAtText }}: “{{ draft.form.title || 'Untitled' }}”. Images and files
          are not kept, so add them again after restoring.
        </p>
        <div class="flex flex-wrap gap-2">
          <Button size="sm" type="button" :class="focusRing" @click="restoreDraft">Restore it</Button>
          <Button size="sm" type="button" variant="outline" :class="focusRing" @click="discardDraft">Discard it</Button>
        </div>
      </div>

      <section :aria-labelledby="ids.secBasics" class="space-y-5">
        <h3 :id="ids.secBasics" class="text-h4 font-bold text-fg-strong">The basics</h3>
        <div>
          <span :id="ids.kind" :class="labelClass">What are you writing?</span>
          <div role="group" :aria-labelledby="ids.kind" class="flex gap-2">
            <button
              v-for="option in KINDS"
              :key="option.kind"
              type="button"
              :aria-pressed="form.kind === option.kind"
              :class="[
                chip,
                form.kind === option.kind
                  ? 'bg-selected text-on-selected'
                  : 'bg-ebony-clay-50 text-fg-2 hover:bg-ebony-clay-100',
              ]"
              @click="setKind(option.kind)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <div>
          <label :for="ids.title" :class="labelClass">Title (required)</label>
          <Input
            :id="ids.title"
            v-model="form.title"
            required
            :aria-invalid="titleError ? true : undefined"
            :aria-describedby="titleError ? ids.titleError : undefined"
            :class="[inputClass, focusRing]"
            @blur="touched.title = true"
          />
          <p v-if="titleError" :id="ids.titleError" class="mt-1 text-sm text-danger-fg">{{ titleError }}</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label :for="ids.date" :class="labelClass">{{
              isEvent ? 'Start date (required)' : 'Date (required)'
            }}</label>
            <Input
              :id="ids.date"
              v-model="form.date"
              type="date"
              required
              :aria-invalid="dateError ? true : undefined"
              :aria-describedby="dateError ? ids.dateError : undefined"
              :class="[inputClass, focusRing]"
              @blur="touched.date = true"
            />
            <p v-if="dateError" :id="ids.dateError" class="mt-1 text-sm text-danger-fg">{{ dateError }}</p>
          </div>
          <div v-if="isEvent">
            <label :for="ids.end" :class="labelClass">Last day</label>
            <Input :id="ids.end" v-model="form.end" type="date" :min="form.date" :class="[inputClass, focusRing]" />
            <p :class="hintClass">Leave empty for a one-day event.</p>
          </div>
        </div>

        <div>
          <label :for="ids.tease" :class="labelClass">Short summary (tease)</label>
          <Input
            :id="ids.tease"
            v-model="form.tease"
            :aria-describedby="ids.teaseHint"
            :class="[inputClass, focusRing]"
          />
          <p :id="ids.teaseHint" :class="hintClass">
            One or two plain sentences. Shown in lists and used as the social media post (see the Social media tab).
          </p>
        </div>
      </section>

      <section :aria-labelledby="ids.secDetails" class="space-y-5 border-t border-line pt-8">
        <h3 :id="ids.secDetails" class="text-h4 font-bold text-fg-strong">Details</h3>
        <template v-if="isEvent">
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <span :id="ids.continent" :class="labelClass">Continent</span>
              <Select v-model="continent">
                <SelectTrigger
                  :aria-labelledby="ids.continent"
                  class="h-10 w-full border-chicago-400 data-[size=default]:h-10"
                  :class="focusRing"
                >
                  <SelectValue placeholder="Choose a continent" />
                </SelectTrigger>
                <SelectContent :body-lock="false">
                  <SelectItem :value="NONE">Not set</SelectItem>
                  <SelectItem v-for="c in CONTINENTS" :key="c.id" :value="c.id">{{ c.name }}</SelectItem>
                </SelectContent>
              </Select>
              <p :class="hintClass">Shown as a flag in the event tables other Galaxy sites embed.</p>
            </div>
            <div>
              <label :for="ids.location" :class="labelClass">Location</label>
              <Input
                :id="ids.location"
                v-model="form.location"
                placeholder="Freiburg, Germany or Online"
                :class="[inputClass, focusRing]"
              />
            </div>
          </div>
          <div>
            <label :for="ids.contact" :class="labelClass">Contact</label>
            <Input
              :id="ids.contact"
              v-model="form.contact"
              placeholder="Name or email"
              :aria-describedby="ids.contactHint"
              :class="[inputClass, focusRing]"
            />
            <p :id="ids.contactHint" :class="hintClass">Shown in the event tables other Galaxy sites embed.</p>
          </div>
        </template>

        <div>
          <label :for="ids.url" :class="labelClass">External link</label>
          <Input
            :id="ids.url"
            v-model="form.externalUrl"
            type="url"
            placeholder="https://"
            :aria-describedby="ids.urlHint"
            :class="[inputClass, focusRing]"
          />
          <p :id="ids.urlHint" :class="hintClass">
            Only if the {{ isEvent ? 'event' : 'news item' }} lives on another website. Its Hub page then sends visitors
            there, and lists link straight to it.
          </p>
        </div>

        <div>
          <label :for="ids.slug" :class="labelClass">Folder name</label>
          <Input
            :id="ids.slug"
            v-model="form.slug"
            :placeholder="slugFromTitle(form.title) || 'my-post'"
            :class="[inputClass, focusRing]"
          />
          <p :class="hintClass">Part of the web address. Made from the title if empty.</p>
        </div>
      </section>

      <section :aria-labelledby="ids.secListing" class="space-y-5 border-t border-line pt-8">
        <h3 :id="ids.secListing" class="text-h4 font-bold text-fg-strong">Where it shows</h3>
        <IdPicker v-model="form.tags" label="Tags" :options="tagOptions" placeholder="Type to search tags">
          <template #hint>
            Pick an existing tag where you can. New tags go in
            <a :href="`${FILES}/TAGS.yaml`" :class="linkClass">TAGS.yaml</a>.
          </template>
        </IdPicker>

        <fieldset>
          <legend :class="labelClass">Subsites</legend>
          <div class="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            <label v-for="subsite in OFFERED_SUBSITES" :key="subsite.id" class="flex items-center gap-2.5 text-sm">
              <input
                v-model="form.subsites"
                type="checkbox"
                :value="subsite.id"
                class="size-4 accent-galaxy-primary"
                :class="focusRing"
              />
              {{ subsite.name }} <code class="text-fg-meta">{{ subsite.id }}</code>
            </label>
          </div>
          <p :class="hintClass">
            Where the post is listed besides the main page.
            <a :href="`${DOCS}#subsites-and-main_subsite-in-news-and-events`" :class="linkClass">What do these mean?</a>
          </p>
        </fieldset>

        <div v-if="mainChoices.length">
          <span :id="ids.main" :class="labelClass">Main subsite</span>
          <Select v-model="mainSubsite">
            <SelectTrigger
              :aria-labelledby="ids.main"
              class="h-10 w-full border-chicago-400 data-[size=default]:h-10"
              :class="focusRing"
            >
              <SelectValue placeholder="Not set" />
            </SelectTrigger>
            <SelectContent class="max-h-72" :body-lock="false">
              <SelectItem :value="NONE">Not set</SelectItem>
              <SelectItem v-for="choice in mainChoices" :key="choice" :value="choice">
                {{ subsiteName(choice) }}
              </SelectItem>
            </SelectContent>
          </Select>
          <p :class="hintClass">Used by the social media bot to pick channels.</p>
        </div>
      </section>

      <section :aria-labelledby="ids.secPeople" class="space-y-5 border-t border-line pt-8">
        <h3 :id="ids.secPeople" class="text-h4 font-bold text-fg-strong">People and funding</h3>
        <IdPicker
          v-model="form.authors"
          :label="isEvent ? 'Organisers' : 'Authors'"
          :options="people"
          placeholder="Type a name or GitHub username"
          :new-pattern="/^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/"
          new-pattern-hint="Not in the list. For someone new, type their GitHub username (letters, numbers and -)."
        >
          <template #hint>
            Your GitHub username. Not in the list yet? Type it anyway; we show what to add below the file.
          </template>
        </IdPicker>

        <IdPicker
          v-model="form.funding"
          label="Funding"
          :options="funders"
          placeholder="Type a project or organisation"
          :new-pattern="/^[\w.-]+$/"
          new-pattern-hint="Not in the list. A new ID uses letters, numbers, - and _, with no spaces."
        >
          <template #hint> Grants and organisations shared with the Galaxy Training Network. </template>
        </IdPicker>
      </section>

      <section :aria-labelledby="ids.secText" class="space-y-5 border-t border-line pt-8">
        <h3 :id="ids.secText" class="text-h4 font-bold text-fg-strong">Your text</h3>
        <div>
          <span :id="ids.body" :class="labelClass">Text</span>
          <div v-if="linksOut" class="mb-3 space-y-2 rounded-md bg-info-bg p-3 text-sm text-info-fg" data-external-note>
            <p>
              This {{ isEvent ? 'event' : 'news item' }} links to {{ externalHost }}, so it has no page of its own on
              the Hub: text written here is not shown anywhere. Images are: the first one is the picture in news lists
              and on social media.
            </p>
            <div class="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" type="button" :class="focusRing" @click="fileInput?.click()">
                Add an image
              </Button>
              <Button
                v-if="!writeAnyway && !form.body.trim()"
                size="sm"
                variant="ghost"
                type="button"
                :class="focusRing"
                @click="writeAnyway = true"
              >
                Write text anyway
              </Button>
            </div>
          </div>
          <p v-if="fileNotice" class="mt-2 text-sm text-danger-fg" role="status" data-file-notice>{{ fileNotice }}</p>
          <div v-show="!linksOut || writeAnyway || form.body.trim()">
            <div
              v-if="!form.body.trim() && !linksOut"
              class="mb-2 flex flex-wrap items-center gap-2 text-sm"
              data-outlines
            >
              <span class="text-fg-meta">Start from an outline:</span>
              <button
                v-for="outline in OUTLINES[form.kind]"
                :key="outline.label"
                type="button"
                class="rounded-md border border-line px-2.5 py-1 text-fg-2 hover:bg-ebony-clay-50"
                :class="focusRing"
                @click="useOutline(outline)"
              >
                {{ outline.label }}
              </button>
            </div>
            <MarkdownEditor
              ref="editor"
              v-model="form.body"
              :label-id="ids.body"
              :hint-id="ids.bodyHint"
              @add-files="fileInput?.click()"
              @files="addFiles"
            />
            <input
              ref="fileInput"
              type="file"
              multiple
              :accept="[...PUBLISHED_TYPES, 'heic', 'heif', 'avif'].map((t) => `.${t}`).join(',')"
              class="hidden"
              aria-label="Choose images or files"
              @change="onFiles"
            />
            <p :id="ids.bodyHint" :class="hintClass">
              Paste from Google Docs, Word or an email and the formatting is kept. Markdown, HTML and Hub components all
              work. <a :href="`${DOCS}#markdown`" :class="linkClass">Formatting help</a>
            </p>
          </div>
        </div>

        <div v-if="media.length">
          <h3 :id="ids.media" :class="labelClass">Files in this post</h3>
          <p :class="[hintClass, 'mb-3']">
            They stay on your computer until you upload them with your post (see the steps next to it). Photos larger
            than {{ MAX_SIDE }} px are made smaller. The first image is also the picture in news lists and on social
            media.
          </p>
          <ul class="space-y-3" :aria-labelledby="ids.media" data-media-list>
            <li
              v-for="(item, i) in media"
              :key="item.originalUrl"
              class="flex flex-col gap-3 rounded-md border border-line p-3 sm:flex-row sm:gap-4"
            >
              <img
                v-if="mediaKind(item.name) === 'image'"
                :src="item.url"
                alt=""
                class="size-16 shrink-0 rounded-sm object-cover"
              />
              <span v-else class="flex size-16 shrink-0 items-center justify-center rounded-sm bg-ebony-clay-50">
                <component
                  :is="mediaKind(item.name) === 'video' ? Film : FileText"
                  class="size-6 text-fg-2"
                  aria-hidden="true"
                />
              </span>
              <div class="min-w-0 flex-1 space-y-3">
                <p class="text-sm break-all">
                  <code>{{ item.name }}</code> <span class="text-fg-meta">{{ sizeText(item.size) }}</span>
                </p>
                <p v-if="item.optimizing" class="text-sm text-fg-meta">Making it smaller…</p>
                <div v-else-if="item.smaller" class="space-y-1.5 text-sm" data-smaller>
                  <p class="text-fg-meta">
                    {{
                      item.smaller.width < item.smaller.originalWidth
                        ? `Resized from ${item.smaller.originalWidth} × ${item.smaller.originalHeight} px (${sizeText(item.originalSize)}) to ${item.smaller.width} × ${item.smaller.height} px (${sizeText(item.smaller.size)}).`
                        : `Made smaller: ${sizeText(item.originalSize)} to ${sizeText(item.smaller.size)}.`
                    }}
                    Location and camera details are removed.
                  </p>
                  <label class="flex items-center gap-2">
                    <input
                      type="checkbox"
                      :checked="item.keepOriginal"
                      class="size-4 accent-galaxy-primary"
                      :class="focusRing"
                      @change="useVersion(item, ($event.target as HTMLInputElement).checked)"
                    />
                    Keep the original instead
                  </label>
                </div>
                <p v-if="mediaKind(item.name) === 'video'" class="text-sm text-fg-meta">
                  Videos make the Hub repository large. If you can, put it on YouTube and use Embed instead.
                </p>
                <p v-if="item.size > MAX_UPLOAD" class="text-sm text-danger-fg">
                  Too big for GitHub's web upload (25 MB). Use a smaller file.
                </p>
                <template v-if="mediaKind(item.name) === 'image'">
                  <div>
                    <label :for="`${ids.media}-alt-${i}`" :class="labelClass">Alt text</label>
                    <Input
                      :id="`${ids.media}-alt-${i}`"
                      :model-value="item.alt"
                      placeholder="What the image shows, for people who cannot see it"
                      :class="[inputClass, focusRing]"
                      @update:model-value="(v) => updateMedia(item, { alt: String(v) })"
                    />
                  </div>
                  <div>
                    <label :for="`${ids.media}-caption-${i}`" :class="labelClass">Caption (optional)</label>
                    <Input
                      :id="`${ids.media}-caption-${i}`"
                      :model-value="item.caption"
                      placeholder="Shown under the image"
                      :class="[inputClass, focusRing]"
                      @update:model-value="(v) => updateMedia(item, { caption: String(v) })"
                    />
                  </div>
                  <fieldset>
                    <legend :class="labelClass">Size</legend>
                    <div class="flex flex-wrap gap-x-4 gap-y-2">
                      <label
                        v-for="option in IMAGE_SIZES"
                        :key="option.value"
                        class="flex items-center gap-1.5 text-sm"
                      >
                        <input
                          type="radio"
                          :name="`${ids.media}-size-${i}`"
                          :value="option.value"
                          :checked="item.imageSize === option.value"
                          class="size-4 accent-galaxy-primary"
                          :class="focusRing"
                          @change="updateMedia(item, { imageSize: option.value })"
                        />
                        {{ option.label }}
                      </label>
                    </div>
                  </fieldset>
                </template>
                <div v-else-if="mediaKind(item.name) === 'file'">
                  <label :for="`${ids.media}-alt-${i}`" :class="labelClass">Link text</label>
                  <Input
                    :id="`${ids.media}-alt-${i}`"
                    :model-value="item.alt"
                    :placeholder="item.name"
                    :class="[inputClass, focusRing]"
                    @update:model-value="(v) => updateMedia(item, { alt: String(v) })"
                  />
                </div>
                <div class="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" as="a" :href="item.url" :download="item.name" :class="focusRing">
                    <Download class="size-4" aria-hidden="true" /> Save as {{ item.name }}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    type="button"
                    :class="focusRing"
                    @click="editor?.insertBlock(item.snippet)"
                  >
                    Insert again
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    type="button"
                    :class="focusRing"
                    :aria-label="`Remove ${item.name}`"
                    @click="removeMedia(item)"
                  >
                    <Trash2 class="size-4" aria-hidden="true" /> Remove
                  </Button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </form>

    <section aria-labelledby="post-preview-heading" class="space-y-5 lg:sticky lg:top-4 lg:self-start">
      <h2 id="post-preview-heading" class="text-h3 font-bold text-fg-strong">Your post</h2>
      <!-- One card with the tabs as its header; underline tabs with the gold active bar (IWC DESIGN.md Tabs) -->
      <Tabs default-value="preview" class="gap-0 overflow-hidden rounded-lg border-1 border-line bg-surface-raised">
        <TabsList
          class="h-auto w-full justify-start gap-6 rounded-none border-b-1 border-ebony-clay-100 bg-ebony-clay-50 px-5 py-0"
        >
          <TabsTrigger value="preview" :class="tabClass">Preview</TabsTrigger>
          <TabsTrigger value="file" :class="tabClass">File</TabsTrigger>
          <TabsTrigger value="social" :class="tabClass">Social media</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <article class="max-h-[36rem] overflow-auto p-5" data-preview>
            <p v-if="form.externalUrl" class="mb-3 rounded-md bg-info-bg p-2 text-sm text-info-fg">
              Listings link to {{ form.externalUrl }} instead of this page.
            </p>
            <h3 class="text-h2 font-bold text-fg-strong">{{ form.title || 'Your title' }}</h3>
            <div class="mt-2 flex flex-wrap gap-x-3 text-sm text-fg-meta">
              <EventDate v-if="isEvent && form.date" :start="form.date" :end="form.end || undefined" />
              <span v-else-if="form.date">{{ formatDate(form.date) }}</span>
              <span v-if="isEvent && form.location">{{ form.location }}</span>
            </div>
            <p v-if="form.tease" class="mt-3 text-fg-2">{{ form.tease }}</p>
            <ul v-if="form.tags.length" class="mt-3 flex flex-wrap gap-2" aria-label="Tags">
              <li
                v-for="tag in form.tags"
                :key="tag"
                class="rounded-md border border-galaxy-primary/30 px-2.5 py-1 text-sm font-medium text-galaxy-dark"
              >
                {{ tag }}
              </li>
            </ul>
            <!-- Same wrapper classes as article pages (ContentWithToc), so the site CSS applies -->
            <div
              v-if="form.body.trim()"
              class="prose prose-compact prose-galaxy mt-4 max-w-none min-w-0"
              v-html="bodyHtml"
            />
            <p v-else class="mt-4 text-sm text-fg-meta">Your text shows here.</p>
          </article>
        </TabsContent>
        <TabsContent value="file" class="space-y-3 p-5">
          <p class="text-sm break-all">
            <code>{{ path }}</code>
          </p>
          <pre
            class="max-h-[36rem] overflow-auto rounded-lg bg-galaxy-dark p-4 text-sm whitespace-pre-wrap text-white"
            data-file-text
          ><code>{{ text }}</code></pre>
        </TabsContent>
        <TabsContent value="social" class="space-y-3 p-5" data-social>
          <p v-if="!social.posted" class="rounded-md bg-warn-bg p-3 text-sm text-warn-fg">
            Not posted to social media: choose at least one subsite.
          </p>
          <p class="text-sm text-fg-meta">
            The Galaxy social media bot posts this text
            {{ isEvent ? 'for upcoming events' : 'for news from the last 30 days' }}. Images in your text are attached
            to the post.
          </p>
          <pre
            class="rounded-lg border border-line bg-surface-raised p-4 font-sans text-sm whitespace-pre-wrap text-fg"
            data-social-text
            >{{ social.text }}</pre>
          <p v-if="attachedImages.length" class="text-sm text-fg-meta" data-social-images>
            Attached images: {{ attachedImages.join(', ') }}
          </p>
          <p class="text-sm" :class="social.length > BLUESKY_LIMIT ? 'text-danger-fg' : 'text-fg-meta'">
            {{ social.length }} characters.
            {{
              social.length > BLUESKY_LIMIT
                ? `Bluesky allows about ${BLUESKY_LIMIT}: shorten the summary, or the Bluesky post will need editing.`
                : `Fits Bluesky (about ${BLUESKY_LIMIT}).`
            }}
          </p>
          <p v-if="!form.tease.trim()" class="text-sm text-warn-fg">
            Add a short summary (tease): it is the main text of the post.
          </p>
        </TabsContent>
      </Tabs>

      <div aria-live="polite" aria-atomic="true">
        <ul v-if="listedProblems.length" class="list-disc pl-5 text-sm text-danger-fg">
          <li v-for="problem in listedProblems" :key="problem">{{ problem }}</li>
        </ul>
        <p v-else-if="waitingFor" class="text-sm text-fg-meta">Fill in {{ waitingFor }} to continue.</p>
        <p v-if="autosaveOff" class="text-sm text-warn-fg">
          This browser does not allow saving a draft here, so your work is not kept if you close the page.
        </p>
        <p v-if="copyFailed" class="text-sm text-warn-fg">
          The browser did not allow copying. Open the File tab and copy the text from there.
        </p>
        <ul v-if="warnings.length" class="list-disc pl-5 text-sm text-warn-fg" data-warnings>
          <li v-for="warning in warnings" :key="warning">{{ warning }}</li>
        </ul>
        <p v-if="!problems.length && !link.complete" class="mb-3 rounded-md bg-warn-bg p-3 text-sm text-warn-fg">
          Your text is too long to send in a link, so save the file and upload it (see below).
        </p>
      </div>

      <div
        v-if="added.tags.length || added.people.length || added.funders.length"
        class="space-y-3 rounded-md bg-warn-bg p-3 text-sm text-warn-fg"
        data-new-entries
      >
        <p class="font-medium">
          Some names are new to the Hub. The checks on your pull request fail until they are added:
        </p>
        <div v-if="added.tags.length">
          <p>
            Add to <a :href="`${FILES}/TAGS.yaml`" :class="linkClass">content/TAGS.yaml</a> in the same pull request:
          </p>
          <pre
            class="mt-1 rounded-sm bg-surface-raised p-2 text-fg"
          ><code>{{ added.tags.map((t) => `- ${t}`).join('\n') }}</code></pre>
        </div>
        <div v-if="added.people.length">
          <p>
            Add to
            <a :href="`${GTN}/CONTRIBUTORS.yaml`" :class="linkClass">the GTN's CONTRIBUTORS.yaml</a>
            (in the training-material repository, a separate pull request). The Hub picks it up once its nightly sync
            pull request is merged, usually within a day.
          </p>
          <pre
            class="mt-1 rounded-sm bg-surface-raised p-2 text-fg"
          ><code>{{ added.people.map((p) => `${p}:\n  name: Your Name\n  joined: ${month}`).join('\n') }}</code></pre>
        </div>
        <p v-if="added.funders.length">
          Add {{ added.funders.join(', ') }} to <a :href="`${GTN}/GRANTS.yaml`" :class="linkClass">GRANTS.yaml</a> or
          <a :href="`${GTN}/ORGANISATIONS.yaml`" :class="linkClass">ORGANISATIONS.yaml</a> in the training-material
          repository, or remove them here.
        </p>
      </div>

      <div v-if="useUpload" class="space-y-4 rounded-lg bg-surface-tint p-4 text-sm text-fg" data-upload-flow>
        <p class="font-medium">
          {{
            media.length
              ? 'Your post has files, so it goes up in one upload:'
              : 'Your text is too long for a link, so it goes up as a file:'
          }}
        </p>
        <ol class="list-decimal space-y-4 pl-5">
          <li class="space-y-2">
            <Button type="button" :disabled="problems.length > 0 || shrinking" :class="focusRing" @click="saveAll">
              <Download class="size-4" aria-hidden="true" />
              {{
                shrinking ? 'Making images smaller…' : canPickFolder ? 'Save all files to a folder' : 'Save all files'
              }}
            </Button>
            <p v-if="canPickFolder" class="text-fg-meta">
              Pick an empty folder: {{ uploadNames.join(', ') }} are written there with these exact names.
            </p>
            <p v-else class="text-fg-meta">
              {{ uploadNames.join(', ') }} go to your downloads. Your browser may ask to allow several downloads. If it
              renames one (for example <code>index (1).md</code>), rename it back before uploading.
            </p>
            <p v-if="saved" class="text-ok-fg" data-saved>
              {{ savedTo ? `Saved to the folder ${savedTo}.` : 'Saved.' }}
            </p>
          </li>
          <li class="space-y-2">
            <Button
              v-if="!problems.length"
              as="a"
              :href="uploadUrl"
              target="_blank"
              rel="noopener"
              variant="outline"
              :class="focusRing"
            >
              Open the upload page
            </Button>
            <Button v-else disabled variant="outline">Open the upload page</Button>
            <p class="break-all text-fg-meta">
              It opens GitHub in the folder <code>{{ folder }}</code>
            </p>
          </li>
          <li>
            Drag all the saved files onto that page, then click <strong>Propose changes</strong> (or
            <strong>Commit changes</strong>) and open the pull request. The checks on it tell you if anything needs
            fixing. If GitHub first asks you to fork the repository, do that, then open the upload page again.
          </li>
        </ol>
      </div>

      <template v-else>
        <div class="flex flex-wrap gap-3">
          <Button v-if="!problems.length" as="a" :href="link.url" target="_blank" rel="noopener" :class="focusRing">
            Open on GitHub
          </Button>
          <Button v-else disabled>Open on GitHub</Button>
        </div>
        <div class="rounded-lg bg-surface-tint p-4 text-sm text-fg">
          <p class="font-medium">On GitHub:</p>
          <ol class="mt-2 list-decimal space-y-1.5 pl-5">
            <li>Check the file, then click <strong>Commit changes</strong>.</li>
            <li>GitHub saves it to your copy of the repository and offers to open a pull request. Open it.</li>
            <li>The checks on the pull request tell you if anything needs fixing.</li>
          </ol>
        </div>
      </template>

      <div class="flex flex-wrap gap-3">
        <Button variant="outline" type="button" :class="focusRing" @click="copy">
          {{ copied ? 'Copied' : 'Copy file' }}
        </Button>
        <Button variant="ghost" type="button" :class="focusRing" data-start-over @click="startOver">
          {{ confirmStartOver ? 'Click again to clear everything' : 'Start over' }}
        </Button>
      </div>
    </section>
  </div>
</template>
