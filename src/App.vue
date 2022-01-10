<template>
  <auth v-if="!store.user" />
  <rss-input v-else />
</template>

<script>
import { store } from "./store";
import { supabase } from "./supabase";

import RssInput from "./components/RssInput.vue";
import Auth from "./components/Auth.vue";
export default {
  components: {
    RssInput,
    Auth,
  },
  setup() {
    // we initially verify if a user is logged in with Supabase
    store.user = supabase.auth.user();
    // we then set up a listener to update the store when the user changes either by logging in or out
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session.user;
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
