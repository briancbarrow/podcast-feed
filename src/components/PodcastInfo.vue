<template>
  <div class="podcast-info">
    <div class="image-container">
      <img :src="podcast.imageUrl" alt="" />
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
  </div>
</template>

<script>
export default {
  props: {
    podcast: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
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
  @apply h-48 w-full object-cover;
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
