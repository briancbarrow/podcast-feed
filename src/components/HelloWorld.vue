<template>
  <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
    <label for="email" class="block text-sm font-medium text-gray-700"
      >Podcast RSS Feed URL</label
    >
    <div class="mt-1">
      <input
        type="url"
        name="url"
        id="url"
        v-model="url"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="https://anchor.fm/s/3e9db190/podcast/rss"
        aria-describedby="rss-url"
      />
    </div>
    <button
      @click="getRssFeed()"
      type="button"
      class="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Get Feed
    </button>
    <!-- Putting the PodcastInfo component on the page  -->
    <podcast-info v-if="podcast.title && !requestError" :podcast="podcast" />
    <!-- Putting InfoError component on the page -->
    <info-error v-if="requestError" />
  </div>
</template>

<script>
import { ref } from "vue";
// Bringing in the PodcastInfo and InfoError components
import PodcastInfo from "./PodcastInfo.vue";
import InfoError from "./InfoError.vue";
export default {
  // Adding the PodcastInfo and InfoError components to the components object, making the component aware of them
  components: {
    PodcastInfo,
    InfoError,
  },
  setup() {
    const url = ref("https://anchor.fm/s/3e9db190/podcast/rss");
    // setting up the podcast object and requestError property to be reactive
    const podcast = ref({});
    const requestError = ref(false);

    function getRssFeed() {
      const feedUrl = url.value;
      return (
        fetch(feedUrl)
          .then((response) => response.text())
          .then((str) =>
            new window.DOMParser().parseFromString(str, "text/xml")
          )
          .then((data) => {
            // adding the image url to the podcast object
            podcast.value.imageUrl = data
              .querySelector("image")
              .querySelector("url").innerHTML;
            // adding the title to the podcast object
            podcast.value.title = data.querySelector("title").textContent;
            // adding the description to the podcast object
            podcast.value.description =
              data.querySelector("description").textContent;
          })
          // adding the catch to handle errors and display error messages
          .catch((err) => {
            requestError.value = true;
          })
      );
    }
    return {
      url,
      // making the podcast object available to the component
      podcast,
      // making the requestError property available to the component
      requestError,
      getRssFeed,
    };
  },
};
</script>

<style lang="scss" scoped></style>
