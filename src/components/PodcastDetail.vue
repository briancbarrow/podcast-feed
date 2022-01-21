<template>
  <!-- Basic layout for showing podcast info -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto text-center">
      <img :src="podcast.image_url" :alt="podcast.name" class="w-1/2 m-auto" />
      <h1 class="text-3xl font-bold p-4">{{ podcast.name }}</h1>
      <p>{{ podcast.description }}</p>
      <h2 class="text-xl font-bold mt-10">Episodes</h2>
      <!-- Looping through each episode of a podcast and displaying episode info -->
      <ul class="divide-y divide-gray-200 text-left">
        <li
          v-for="episode in episodes"
          :key="episode.guid || episode.link"
          class="py-4"
        >
          <h3>{{ episode.title }}</h3>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Importing necessary methods
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "../supabase";

export default {
  setup() {
    const route = useRoute();
    const podcast = ref({});
    const episodes = ref([]);
    const requestError = ref(false);

    // Getting podcast info from the database
    async function getPodcastData() {
      const {
        data: [podcastinfo],
      } = await supabase.from("podcasts").select().eq("id", route.params.id);
      podcast.value = podcastinfo;

      // Making call to episode url to get episode info
      getEpisodes(podcastinfo.rss_url);
    }

    function getEpisodes(url) {
      fetch(url)
        .then((response) => response.text())
        .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
        .then((data) => {
          // Finding all the "item" tags in the xml response which will contain the episode info
          const items = data.querySelectorAll("item");
          // Looping through each item and getting the episode info and pushing it to the 'episodes' array
          items.forEach((item) => {
            episodes.value.push({
              // this one looks a little different because the title contains CDATA tags which need to be grabbed with the 'childNodes' property
              title: item.querySelector("title").childNodes[0].textContent,
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
        });
    }

    onMounted(() => {
      // Getting podcast info from the database once the component is mounted
      getPodcastData();
    });

    return {
      podcast,
      episodes,
    };
  },
};
</script>

<style lang="scss" scoped></style>
