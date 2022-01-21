<template>
  <button @click="logout">Log Out</button>
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
        placeholder="https://rss.your-org.org/feed/"
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
    <podcast-info v-if="podcast.title && !requestError" :podcast="podcast" />
    <info-error v-if="requestError" />
  </div>
  <div class="m-10">
    <h2 class="text-left">Your Podcast Feeds</h2>
    <ul class="podcast-feeds">
      <li v-for="podcast in podcasts" :key="podcast.id">
        <podcast-info :podcast="podcast" />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase";
import { store } from "../store";
import PodcastInfo from "./PodcastInfo.vue";
import InfoError from "./InfoError.vue";
export default {
  components: {
    PodcastInfo,
    InfoError,
  },

  setup() {
    const url = ref("https://anchor.fm/s/3e9db190/podcast/rss");
    const feedItems = ref([]);
    const podcast = ref({});
    const requestError = ref(false);

    function logout() {
      supabase.auth.signOut();
    }

    function getRssFeed() {
      requestError.value = false;
      const feedUrl = url.value;
      return (
        fetch(feedUrl)
          // this returns a promise so we need to convert it to a string
          .then((response) => response.text())
          // this next line is to parse the xml response
          .then((str) =>
            new window.DOMParser().parseFromString(str, "text/xml")
          )
          .then((data) => {
            console.log("Data: ", data);
            // console.log("Data TItle: ", data.querySelector("title").textContent);
            podcast.value.image_url = data
              .querySelector("image")
              .querySelector("url").innerHTML;
            podcast.value.title = data.querySelector("title").textContent;
            podcast.value.description =
              data.querySelector("description").textContent;
            podcast.value.rss_url = feedUrl;

            const items = data.querySelectorAll("item");
            // console.log("ITEMS", items);
            items.forEach((item) => {
              feedItems.value.push({
                title: item.querySelector("title").innerHTML,
                link: item.querySelector("link").innerHTML,
                url: item.querySelector("enclosure").getAttribute("url"),
                description: item.querySelector("description").innerHTML,
                pubDate: item.querySelector("pubDate").innerHTML,
                guid: item.querySelector("guid").innerHTML,
              });
            });
          })
          .catch((err) => {
            requestError.value = true;
          })
      );
    }
    return {
      url,
      feedItems,
      podcast,
      requestError,
      podcasts: store.state.podcasts,

      logout,
      getRssFeed,
    };
  },
};
</script>

<style lang="scss" scoped></style>
