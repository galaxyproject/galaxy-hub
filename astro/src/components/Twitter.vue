<template>
  <div class="twitter" :class="{ 'twitter-centered': center }">
    <div class="twitter-inner" :style="innerStyle">
      <div v-if="loading" class="twitter-loading">
        Loading Twitter content...
      </div>
      <div 
        v-show="!loading"
        ref="twitterContainer"
        class="twitter-container"
      ></div>
      <div v-if="error" class="twitter-error">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';

const props = defineProps({
  /** The id of the tweet to display */
  tweet: {
    type: String,
    default: ''
  },
  /** The username for timeline display */
  user: {
    type: String,
    default: ''
  },
  /** Height of the embed */
  height: {
    type: Number,
    default: 500
  },
  /** Width of the embed */
  width: {
    type: Number,
    default: 550
  },
  /** Center the tweet/timeline */
  center: {
    type: Boolean,
    default: true
  },
  /** Theme: 'light' or 'dark' */
  theme: {
    type: String,
    default: 'light'
  }
});

const twitterContainer = ref(null);
const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');

const innerStyle = computed(() => {
  if (props.center) {
    return `width: ${props.width}px; max-width: 100%;`;
  }
  return '';
});

let twitterScriptLoaded = false;

const loadTwitterScript = () => {
  return new Promise((resolve) => {
    if (window.twttr) {
      resolve();
      return;
    }

    if (twitterScriptLoaded) {
      // Script is loading, wait for it
      const checkInterval = setInterval(() => {
        if (window.twttr) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      return;
    }

    twitterScriptLoaded = true;
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.onload = () => {
      resolve();
    };
    document.head.appendChild(script);
  });
};

const renderTwitterContent = async () => {
  try {
    loading.value = true;
    error.value = false;
    
    await loadTwitterScript();
    
    if (!twitterContainer.value) return;
    
    // Clear previous content
    twitterContainer.value.innerHTML = '';
    
    const options = {
      width: props.width,
      height: props.height,
      theme: props.theme
    };
    
    if (props.tweet) {
      // Create tweet embed
      await window.twttr.widgets.createTweet(
        props.tweet,
        twitterContainer.value,
        options
      );
    } else if (props.user) {
      // Create timeline embed
      await window.twttr.widgets.createTimeline(
        {
          sourceType: 'profile',
          screenName: props.user
        },
        twitterContainer.value,
        {
          ...options,
          chrome: 'noheader nofooter'
        }
      );
    }
    
    loading.value = false;
  } catch (err) {
    console.error('Twitter embed error:', err);
    error.value = true;
    errorMessage.value = props.tweet 
      ? 'This tweet could not be loaded.' 
      : 'This Twitter feed could not be loaded.';
    loading.value = false;
  }
};

onMounted(() => {
  if (!props.tweet && !props.user) {
    error.value = true;
    errorMessage.value = 'Either a tweet ID or username must be provided.';
    loading.value = false;
    return;
  }
  
  renderTwitterContent();
});

// Re-render if props change
watch(() => [props.tweet, props.user], () => {
  renderTwitterContent();
});
</script>

<style scoped>
.twitter {
  margin: 1rem 0;
}

.twitter-centered {
  text-align: center;
}

.twitter-centered .twitter-inner {
  display: inline-block;
  text-align: left;
}

.twitter-inner {
  position: relative;
}

.twitter-container {
  min-height: 200px;
}

.twitter-loading {
  padding: 2rem;
  text-align: center;
  color: #666;
}

.twitter-error {
  padding: 2rem;
  text-align: center;
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 0.25rem;
}

/* Ensure Twitter embeds are responsive */
.twitter-container :deep(iframe) {
  max-width: 100% !important;
}
</style>