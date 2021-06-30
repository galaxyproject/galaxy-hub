<template>
  <tr>
    <td class="title">
      <a :href="platform.path">
        <template v-if="platform.title">{{ platform.title }}</template>
        <template v-else>{{ platform.path }}</template>
      </a>
    </td>
    <td class="server">
      <a :href="platform.url">Server</a>
    </td>
    <td class="summary markdown" v-html="mdToHtml(platform.summary)" />
  </tr>
</template>

<script>
import { mdToHtml } from '~/utils.js';
export default {
  props: ["platform"],
  methods: {
    mdToHtml,
  },
};
</script>
