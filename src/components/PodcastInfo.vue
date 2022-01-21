<template>
  <div class="podcast-info">
    <div class="image-container">
      <img :src="podcast.image_url" alt="" class="w-fit m-auto" />
    </div>
    <div class="podcast-text">
      <div class="flex-1">
        <div class="title-desc">
          <p class="title">
            {{ podcast.title }}
          </p>
          <p class="desc">
            {{ podcast.description }}
          </p>
        </div>
      </div>
    </div>
    <!-- Adding button to add podcast to DB -->
    <div v-if="isInUserPodcasts" class="bg-green-300 p-0.5 text-center">
      In Your Podcasts
    </div>
    <button
      v-else
      class="mt-2 inline-flex items-center justify-center w-1/2 mx-auto mb-2 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      @click="addPodcast"
    >
      Add to My Podcasts
    </button>
  </div>
</template>

<script>
import { store } from "../store";
import { supabase } from "../supabase";

export default {
  props: {
    podcast: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isInUserPodcasts() {
      return store.state.podcasts.some(
        (podcast) => podcast.rss_url === this.podcast.rss_url
      );
    },
  },
  methods: {
    addPodcast() {
      if (this.isInUserPodcasts) {
        alert("You already have this podcast in your list!");
      } else {
        const podcast = {
          name: this.podcast.title,
          image_url: this.podcast.image_url,
          description: this.podcast.description,
          rss_url: this.podcast.rss_url,
          user_id: store.state.user.id,
        };
        supabase
          .from("podcasts")
          .insert(podcast)
          .then(({ body }) => {
            store.addPodcastToStore(body[0]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  setup() {},
};
</script>

<style scoped>
.podcast-info {
  @apply mt-2 flex flex-col rounded-lg shadow-lg overflow-hidden;
}
.podcast-info .image-container {
  @apply flex-shrink-0;
}

.podcast-info .image-container img {
  @apply h-48;
}

.podcast-info .podcast-text {
  @apply flex-1 bg-white p-6 flex flex-col justify-between;
}

.podcast-info .podcast-text .title-desc {
  @apply block mt-2;
}
.podcast-info .podcast-text .title-desc .title {
  @apply text-xl font-semibold text-gray-900;
}
.podcast-info .podcast-text .title-desc .desc {
  @apply mt-3 text-base text-gray-500;
}
</style>
