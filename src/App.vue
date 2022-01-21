<template>
  <auth v-if="!store.state.user" />
  <div class="max-w-4xl m-auto" v-else>
    <nav class="flex justify-between py-5 text-center">
      <a href="/" class="m-auto">Home</a>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { store } from "./store";
import { supabase } from "./supabase";

import PodcastInputFeed from "./components/PodcastInputFeed.vue";
import Auth from "./components/Auth.vue";
export default {
  components: {
    PodcastInputFeed,
    Auth,
  },
  setup() {
    // we initially verify if a user is logged in with Supabase
    store.state.user = supabase.auth.user();
    // we then set up a listener to update the store when the user changes either by logging in or out
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_OUT") {
        store.state.user = null;
      } else {
        store.getPodcastsFromDB();
        store.state.user = session.user;
      }
    });

    return {
      store,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
