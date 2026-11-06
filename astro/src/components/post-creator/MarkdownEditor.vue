<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef, useId, watch } from 'vue';
import type { EditorView } from 'codemirror';
import {
  Bold,
  Clapperboard,
  Code,
  Heading2,
  ImagePlus,
  Italic,
  Link,
  List,
  ListOrdered,
  Paperclip,
  Quote,
  Table,
} from '@lucide/vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { embedFor } from '@/utils/post-creator';
import { focusRing, hintClass, inputClass, labelClass } from './styles';

const props = defineProps<{ labelId: string; hintId: string }>();
const emit = defineEmits<{
  /** Open the file picker. */
  (e: 'add-files'): void;
  /** Files dropped or pasted into the editor; the cursor is where they go. */
  (e: 'files', files: File[]): void;
}>();
const model = defineModel<string>({ required: true });

const host = ref<HTMLElement>();
const view = shallowRef<EditorView>();
const dragging = ref(false);
const notice = ref('');

// Formatting worth keeping; plain paragraphs or code from another editor paste as plain text
const RICH_HTML = /<(h[1-6]|ul|ol|table|strong|b|em|i|a|blockquote)\b/i;
const URL_ONLY = /^https?:\/\/\S+$/;

function say(message: string) {
  notice.value = message;
}

async function pasteHtml(html: string, plain: string) {
  const v = view.value;
  if (!v) return;
  let result;
  try {
    const { htmlToMarkdown } = await import('@/utils/paste-markdown');
    result = await htmlToMarkdown(html);
  } catch {
    // Conversion or its download failed: keep the paste as plain text rather than losing it
    v.dispatch(v.state.replaceSelection(plain));
    say('Pasted as plain text: the formatting could not be converted.');
    return;
  }
  const { markdown, droppedImages } = result;
  v.dispatch(v.state.replaceSelection(markdown));
  v.focus();
  say(
    droppedImages
      ? `Pasted with formatting. ${droppedImages} image${droppedImages > 1 ? 's were' : ' was'} left out: add ${droppedImages > 1 ? 'them' : 'it'} with the Image button.`
      : 'Pasted with formatting. Press Ctrl+Shift+V to paste plain text instead.'
  );
}

// Edits the Markdown text as is, so HTML blocks, comments and components are never rewritten
onMounted(async () => {
  const [
    { EditorView, minimalSetup },
    { markdown },
    { html },
    { placeholder },
    { HighlightStyle, syntaxHighlighting },
    { tags },
  ] = await Promise.all([
    import('codemirror'),
    import('@codemirror/lang-markdown'),
    import('@codemirror/lang-html'),
    import('@codemirror/view'),
    import('@codemirror/language'),
    import('@lezer/highlight'),
  ]);
  // Reads like formatted text, not code: the default style underlines headings and links
  const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
  const META = 'var(--color-fg-meta)';
  const hubHighlight = HighlightStyle.define([
    { tag: tags.heading1, fontSize: '1.375em', fontWeight: '700' },
    { tag: tags.heading2, fontSize: '1.25em', fontWeight: '700' },
    { tag: [tags.heading3, tags.heading4, tags.heading5, tags.heading6], fontSize: '1.1em', fontWeight: '700' },
    { tag: tags.strong, fontWeight: '700' },
    { tag: tags.emphasis, fontStyle: 'italic' },
    { tag: tags.strikethrough, textDecoration: 'line-through' },
    { tag: tags.link, color: 'var(--color-link)' },
    { tag: [tags.url, tags.processingInstruction, tags.contentSeparator, tags.quote], color: META },
    { tag: tags.monospace, fontFamily: MONO },
    // HTML and components
    { tag: [tags.angleBracket, tags.tagName, tags.attributeName], color: META, fontFamily: MONO },
    { tag: tags.attributeValue, color: 'var(--color-link)', fontFamily: MONO },
    { tag: tags.comment, color: META, fontStyle: 'italic' },
  ]);
  view.value = new EditorView({
    doc: model.value,
    parent: host.value,
    extensions: [
      minimalSetup,
      // Behaves like a normal text box: Enter starts a new line (the default keeps adding `>` to quotes),
      // and typing <figure> does not add a second </figure>. URL pasting is handled below.
      markdown({
        addKeymap: false,
        completeHTMLTags: false,
        pasteURLAsLink: false,
        htmlTagLanguage: html({ matchClosingTags: false, autoCloseTags: false }),
      }),
      syntaxHighlighting(hubHighlight),
      placeholder('Write your post here. Paste from a document, or start from an outline above.'),
      EditorView.lineWrapping,
      EditorView.contentAttributes.of({
        'aria-labelledby': props.labelId,
        'aria-describedby': props.hintId,
        spellcheck: 'true',
        autocorrect: 'on',
        autocapitalize: 'sentences',
      }),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) model.value = update.state.doc.toString();
      }),
      EditorView.domEventHandlers({
        paste(event, v) {
          const data = event.clipboardData;
          if (!data) return false;
          const files = [...data.files];
          if (files.length) {
            event.preventDefault();
            emit('files', files);
            return true;
          }
          const text = data.getData('text/plain').trim();
          const { from, to } = v.state.selection.main;
          if (from !== to && URL_ONLY.test(text)) {
            event.preventDefault();
            v.dispatch(v.state.replaceSelection(`[${v.state.sliceDoc(from, to)}](${text})`));
            return true;
          }
          const html = data.getData('text/html');
          if (html && RICH_HTML.test(html)) {
            event.preventDefault();
            void pasteHtml(html, data.getData('text/plain'));
            return true;
          }
          return false;
        },
        dragover(event) {
          if (event.dataTransfer?.types.includes('Files')) dragging.value = true;
          return false;
        },
        dragleave() {
          dragging.value = false;
          return false;
        },
        drop(event, v) {
          dragging.value = false;
          const files = [...(event.dataTransfer?.files ?? [])];
          if (!files.length) return false;
          event.preventDefault();
          const pos = v.posAtCoords({ x: event.clientX, y: event.clientY });
          if (pos !== null) v.dispatch({ selection: { anchor: pos } });
          emit('files', files);
          return true;
        },
      }),
      EditorView.theme({
        '&': { fontSize: '1rem' },
        '&.cm-focused': { outline: 'none' },
        // The editable area fills the box, so the whole box takes clicks and shows the typing cursor
        '.cm-scroller': { fontFamily: 'inherit', lineHeight: '1.6', cursor: 'text' },
        '.cm-content': { minHeight: '16rem', padding: '0.75rem 0.25rem', caretColor: 'var(--color-fg)' },
        '.cm-placeholder': { color: META },
      }),
    ],
  });
});

// Restoring a draft or picking an outline changes the text from outside
watch(model, (value) => {
  const v = view.value;
  if (v && value !== v.state.doc.toString()) {
    v.dispatch({ changes: { from: 0, to: v.state.doc.length, insert: value } });
  }
});

onBeforeUnmount(() => view.value?.destroy());

/** Wraps the selection, or a placeholder that is left selected for typing over. */
function wrap(before: string, after: string, placeholder: string) {
  const v = view.value;
  if (!v) return;
  const { from, to } = v.state.selection.main;
  const text = v.state.sliceDoc(from, to) || placeholder;
  const start = from + before.length;
  v.dispatch({
    changes: { from, to, insert: before + text + after },
    selection: { anchor: start, head: start + text.length },
  });
  v.focus();
}

/** Adds a prefix (`## `, `- `, `> `) to every selected line. */
function prefixLines(prefix: string) {
  const v = view.value;
  if (!v) return;
  const { from, to: end } = v.state.selection.main;
  // A selection that ends at the start of a line (shift+down, triple-click) does not include that line
  const to = end > from && v.state.doc.lineAt(end).from === end ? end - 1 : end;
  const changes = [];
  for (let pos = from; pos <= to;) {
    const line = v.state.doc.lineAt(pos);
    changes.push({ from: line.from, insert: prefix });
    pos = line.to + 1;
  }
  v.dispatch({ changes });
  v.focus();
}

/** Inserts a block on its own paragraph at the cursor. */
function insertBlock(text: string) {
  const v = view.value;
  if (!v) return;
  const { from, to } = v.state.selection.main;
  const before = v.state.sliceDoc(Math.max(0, from - 2), from);
  const lead = from === 0 || before === '\n\n' ? '' : before.endsWith('\n') ? '\n' : '\n\n';
  const insert = `${lead}${text}\n\n`;
  v.dispatch({ changes: { from, to, insert }, selection: { anchor: from + insert.length } });
  v.focus();
}

/** Replaces every `old` with `next` (removing each with its blank line when `next` is empty). */
function replaceText(old: string, next: string): boolean {
  const v = view.value;
  if (!v || !old) return false;
  const doc = v.state.doc.toString();
  const changes = [];
  for (let from = doc.indexOf(old); from >= 0; from = doc.indexOf(old, from + old.length)) {
    const to = from + old.length + (next === '' && doc.startsWith('\n\n', from + old.length) ? 2 : 0);
    changes.push({ from, to, insert: next });
  }
  if (!changes.length) return false;
  v.dispatch({ changes });
  return true;
}

defineExpose({ insertBlock, replaceText });

// Embeds: one row that takes any link, instead of a button per component
const embedOpen = ref(false);
const embedUrl = ref('');
const embedInputId = useId();
const embedHintId = useId();

const embedButton = ref<HTMLButtonElement>();

function openEmbed() {
  embedOpen.value = !embedOpen.value;
  if (embedOpen.value) setTimeout(() => document.getElementById(embedInputId)?.focus());
}

/** Closes the row and puts focus back on the Embed button, so it does not drop to the page. */
function closeEmbed() {
  embedOpen.value = false;
  embedButton.value?.focus();
}

function insertEmbed() {
  const link = embedUrl.value.trim();
  if (!link) return;
  const embed = embedFor(link);
  if (embed) {
    insertBlock(embed.text);
    say(
      embed.kind === 'youtube'
        ? 'Added the YouTube video.'
        : embed.kind === 'mastodon'
          ? 'Added the Mastodon post.'
          : 'Added the calendar.'
    );
  } else if (URL.canParse(link) && /^https?:$/.test(new URL(link).protocol)) {
    // Only web links: a javascript: or data: address must not become a link in the post
    const href = new URL(link).href;
    insertBlock(`[${href}](${href})`);
    say('This site cannot be embedded, so it was added as a link.');
  } else {
    say('That does not look like a web link. Copy the full address, starting with https://.');
    return;
  }
  embedUrl.value = '';
  embedOpen.value = false;
}

const TABLE = '| Column | Column |\n| :-- | :-- |\n| Text | Text |';

const tools = [
  { label: 'Bold', icon: Bold, run: () => wrap('**', '**', 'bold text') },
  { label: 'Italic', icon: Italic, run: () => wrap('_', '_', 'italic text') },
  { label: 'Heading', icon: Heading2, run: () => prefixLines('## ') },
  { label: 'Link', icon: Link, run: () => wrap('[', '](https://)', 'link text') },
  { label: 'Bulleted list', icon: List, run: () => prefixLines('- ') },
  { label: 'Numbered list', icon: ListOrdered, run: () => prefixLines('1. ') },
  { label: 'Quote', icon: Quote, run: () => prefixLines('> ') },
  { label: 'Code', icon: Code, run: () => wrap('`', '`', 'code') },
  { label: 'Table', icon: Table, run: () => insertBlock(TABLE) },
];

const toolButton =
  'inline-flex size-8 items-center justify-center rounded-sm text-fg-2 hover:bg-ebony-clay-100 ' + focusRing;
const textButton =
  'inline-flex h-8 items-center gap-1.5 rounded-sm px-2 text-sm text-fg-2 hover:bg-ebony-clay-100 ' + focusRing;
</script>

<template>
  <div
    class="rounded-md border focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-galaxy-primary focus-within:outline-solid"
    :class="dragging ? 'border-galaxy-primary bg-surface-tint' : 'border-chicago-400'"
  >
    <div
      role="group"
      aria-label="Formatting"
      class="flex flex-wrap items-center gap-1 border-b border-line bg-ebony-clay-50 px-1 py-1"
    >
      <button
        v-for="tool in tools"
        :key="tool.label"
        type="button"
        :class="toolButton"
        :aria-label="tool.label"
        :title="tool.label"
        @click="tool.run"
      >
        <component :is="tool.icon" class="size-4" aria-hidden="true" />
      </button>
      <span class="mx-1 h-5 w-px bg-line" aria-hidden="true" />
      <button type="button" :class="textButton" @click="emit('add-files')">
        <ImagePlus class="size-4" aria-hidden="true" /> Image
      </button>
      <button ref="embedButton" type="button" :class="textButton" :aria-expanded="embedOpen" @click="openEmbed">
        <Clapperboard class="size-4" aria-hidden="true" /> Embed
      </button>
    </div>

    <div v-if="embedOpen" class="space-y-2 border-b border-line bg-surface-raised p-3">
      <label :for="embedInputId" :class="labelClass">Link to embed</label>
      <div class="flex flex-wrap gap-2">
        <Input
          :id="embedInputId"
          v-model="embedUrl"
          type="url"
          placeholder="https://www.youtube.com/watch?v=…"
          :aria-describedby="embedHintId"
          :class="[inputClass, focusRing, 'min-w-0 flex-1']"
          @keydown.enter.prevent="insertEmbed"
          @keydown.escape="closeEmbed"
        />
        <Button type="button" :class="focusRing" @click="insertEmbed">Insert</Button>
        <Button type="button" variant="ghost" :class="focusRing" @click="closeEmbed">Cancel</Button>
      </div>
      <p :id="embedHintId" :class="hintClass">
        A YouTube video, a Mastodon post or a Google Calendar (from its “Integrate calendar” settings). Other links are
        added as a normal link.
      </p>
    </div>

    <div ref="host" class="bg-surface-raised" />

    <div class="flex items-start gap-2 border-t border-line bg-ebony-clay-50 px-3 py-2 text-sm text-fg-meta">
      <Paperclip class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>
        Add images or files by dragging or pasting them here.
        <button
          type="button"
          class="text-link underline underline-offset-2 hover:text-link-hover"
          :class="focusRing"
          @click="emit('add-files')"
        >
          Choose files
        </button>
      </span>
    </div>
  </div>
  <p class="text-sm text-fg-meta empty:hidden [&:not(:empty)]:mt-2" aria-live="polite" data-editor-notice>
    {{ notice }}
  </p>
</template>
