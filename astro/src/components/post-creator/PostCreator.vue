<script setup lang="ts">
import { computed, onMounted, reactive, ref, useId, watch } from 'vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import IdPicker, { type PickerOption } from './IdPicker.vue';
import { focusRing, hintClass, inputClass, labelClass, linkClass } from './styles';
import {
  CONTINENTS,
  OFFERED_SUBSITES,
  buildPost,
  emptyForm,
  githubLink,
  mainSubsiteChoices,
  postPath,
  newEntries,
  postProblems,
  slugFromTitle,
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
// Set today's date after hydration so the server render and the client match
onMounted(() => {
  // en-CA formats as YYYY-MM-DD in the author's time zone
  if (!form.date) form.date = new Date().toLocaleDateString('en-CA');
});

const id = (name: string) => `post-${name}-${useId()}`;
const ids = {
  kind: id('kind'),
  title: id('title'),
  date: id('date'),
  end: id('end'),
  tease: id('tease'),
  teaseHint: id('tease-hint'),
  continent: id('continent'),
  location: id('location'),
  contact: id('contact'),
  url: id('url'),
  urlHint: id('url-hint'),
  main: id('main'),
  slug: id('slug'),
  body: id('body'),
};

const isEvent = computed(() => form.kind === 'event');
const tagOptions = computed(() => props.tags.map((tag) => ({ id: tag, name: tag })));
const mainChoices = computed(() => mainSubsiteChoices(form.subsites));
const subsiteName = (value: string) => OFFERED_SUBSITES.find((s) => s.id === value)?.name ?? value;

watch(mainChoices, (choices) => {
  if (form.mainSubsite && !choices.includes(form.mainSubsite)) form.mainSubsite = '';
});

// Reka Select reserves '' for "no value"; map it to a sentinel item
const selectModel = (key: 'continent' | 'mainSubsite') =>
  computed({
    get: () => form[key] || NONE,
    set: (value: unknown) => (form[key] = typeof value === 'string' && value !== NONE ? value : ''),
  });
const continent = selectModel('continent');
const mainSubsite = selectModel('mainSubsite');

const path = computed(() => postPath(form));
const text = computed(() => buildPost(form));
const link = computed(() => githubLink(form));
const problems = computed(() => postProblems(form));
const added = computed(() =>
  newEntries(form, {
    tags: props.tags,
    people: props.people.map((p) => p.id),
    funders: props.funders.map((f) => f.id),
  })
);
const month = new Date().toLocaleDateString('en-CA').slice(0, 7);
const copied = ref(false);

async function copy() {
  await navigator.clipboard.writeText(text.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 3000);
}

const KINDS: { kind: PostKind; label: string }[] = [
  { kind: 'news', label: 'News' },
  { kind: 'event', label: 'Event' },
];

function setKind(kind: PostKind) {
  form.kind = kind;
}

const chip = 'inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors ' + focusRing;
const textareaClass =
  'w-full rounded-md border border-chicago-400 bg-transparent px-3 py-2 text-base shadow-xs md:text-sm ' + focusRing;
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-2">
    <form class="space-y-6" @submit.prevent>
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
                ? 'bg-galaxy-primary text-white'
                : 'bg-ebony-clay-50 text-chicago-700 hover:bg-ebony-clay-100',
            ]"
            @click="setKind(option.kind)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <div>
        <label :for="ids.title" :class="labelClass">Title (required)</label>
        <Input :id="ids.title" v-model="form.title" required :class="[inputClass, focusRing]" />
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label :for="ids.date" :class="labelClass">{{ isEvent ? 'Start date (required)' : 'Date (required)' }}</label>
          <Input :id="ids.date" v-model="form.date" type="date" required :class="[inputClass, focusRing]" />
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
          One or two plain sentences. Shown in lists and used for social media posts.
        </p>
      </div>

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
              <SelectContent>
                <SelectItem :value="NONE">Not set</SelectItem>
                <SelectItem v-for="c in CONTINENTS" :key="c.id" :value="c.id">{{ c.name }}</SelectItem>
              </SelectContent>
            </Select>
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
            :class="[inputClass, focusRing]"
          />
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
          Only if the {{ isEvent ? 'event' : 'news item' }} lives on another website. The listing then links there.
        </p>
      </div>

      <IdPicker v-model="form.tags" label="Tags" :options="tagOptions" placeholder="Type to search tags">
        <template #hint>
          Pick an existing tag where you can. New tags go in
          <a :href="`${FILES}/TAGS.yaml`" :class="linkClass">TAGS.yaml</a>.
        </template>
      </IdPicker>

      <fieldset>
        <legend :class="labelClass">Subsites</legend>
        <div class="grid gap-2 sm:grid-cols-2">
          <label v-for="subsite in OFFERED_SUBSITES" :key="subsite.id" class="flex items-center gap-2 text-sm">
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
          <SelectContent class="max-h-72">
            <SelectItem :value="NONE">Not set</SelectItem>
            <SelectItem v-for="choice in mainChoices" :key="choice" :value="choice">
              {{ subsiteName(choice) }}
            </SelectItem>
          </SelectContent>
        </Select>
        <p :class="hintClass">Used by the social media bot to pick channels.</p>
      </div>

      <IdPicker
        v-model="form.authors"
        :label="isEvent ? 'Organisers' : 'Authors'"
        :options="people"
        placeholder="Type a name or GitHub username"
      >
        <template #hint>
          Your GitHub username. Not in the list yet? Type it anyway; we show what to add below the file.
        </template>
      </IdPicker>

      <IdPicker v-model="form.funding" label="Funding" :options="funders" placeholder="Type a project or organisation">
        <template #hint> Grants and organisations shared with the Galaxy Training Network. </template>
      </IdPicker>

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

      <div>
        <label :for="ids.body" :class="labelClass">Text</label>
        <textarea :id="ids.body" v-model="form.body" rows="10" :class="textareaClass" />
        <p :class="hintClass">
          Markdown. You can also write it on GitHub.
          <a :href="`${DOCS}#markdown`" :class="linkClass">Formatting help</a>
        </p>
      </div>
    </form>

    <section aria-labelledby="post-preview-heading" class="space-y-4 lg:sticky lg:top-4 lg:self-start">
      <h2 id="post-preview-heading" class="text-h3 font-bold text-fg-strong">Your file</h2>
      <p class="text-sm break-all">
        <code>{{ path }}</code>
      </p>
      <pre
        class="max-h-[28rem] overflow-auto rounded-lg bg-galaxy-dark p-4 text-sm whitespace-pre-wrap text-white"
      ><code>{{ text }}</code></pre>

      <div aria-live="polite" aria-atomic="true">
        <ul v-if="problems.length" class="list-disc pl-5 text-sm text-danger-fg">
          <li v-for="problem in problems" :key="problem">{{ problem }}</li>
        </ul>
        <p v-else-if="!link.complete" class="mb-3 rounded-md bg-warn-bg p-3 text-sm text-warn-fg">
          Your text is too long to send in a link. GitHub opens with the metadata only: copy the file here and paste it
          in instead.
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
            class="mt-1 rounded bg-white p-2 text-fg"
          ><code>{{ added.tags.map((t) => `- ${t}`).join('\n') }}</code></pre>
        </div>
        <div v-if="added.people.length">
          <p>
            Add to
            <a :href="`${GTN}/CONTRIBUTORS.yaml`" :class="linkClass"
              >CONTRIBUTORS.yaml in the training-material repository</a
            >
            (a separate pull request). The Hub picks it up once its nightly sync pull request is merged, usually within
            a day.
          </p>
          <pre
            class="mt-1 rounded bg-white p-2 text-fg"
          ><code>{{ added.people.map((p) => `${p}:\n  name: Your Name\n  joined: ${month}`).join('\n') }}</code></pre>
        </div>
        <p v-if="added.funders.length">
          Add {{ added.funders.join(', ') }} to <a :href="`${GTN}/GRANTS.yaml`" :class="linkClass">GRANTS.yaml</a> or
          <a :href="`${GTN}/ORGANISATIONS.yaml`" :class="linkClass">ORGANISATIONS.yaml</a> in the training-material
          repository, or remove them here.
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <Button v-if="!problems.length" as="a" :href="link.url" target="_blank" rel="noopener" :class="focusRing">
          Open on GitHub
        </Button>
        <Button v-else disabled>Open on GitHub</Button>
        <Button variant="outline" type="button" :class="focusRing" @click="copy">
          {{ copied ? 'Copied' : 'Copy file' }}
        </Button>
      </div>

      <div class="text-sm text-fg">
        <p class="font-medium">On GitHub:</p>
        <ol class="mt-1 list-decimal space-y-1 pl-5">
          <li>Check the file, then click <strong>Commit changes</strong>.</li>
          <li>GitHub saves it to your copy of the repository and offers to open a pull request. Open it.</li>
          <li>
            To add images, upload them to the same folder and link them like <code>![Alt text](./image.png)</code>.
          </li>
          <li>The checks on the pull request tell you if anything needs fixing.</li>
        </ol>
      </div>
    </section>
  </div>
</template>
