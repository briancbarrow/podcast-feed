<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <sign-up v-if="isSignUp" />
    <sign-in v-else />
    <button @click="isSignUp = !isSignUp">
      {{
        isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account yet? Sign Up"
      }}
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import SignUp from "./SignUp.vue";
import SignIn from "./SignIn.vue";
export default {
  components: { SignUp, SignIn },
  setup() {
    const isSignUp = ref(true);

    return {
      isSignUp,
    };
  },
};
</script>

<style lang="scss" scoped></style>
