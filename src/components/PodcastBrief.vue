<template>
  <div class="mt-2 flex flex-col rounded-lg shadow-lg overflow-hidden">
    <div class="flex-shrink-0">
      <img class="h-48 w-full object-cover" :src="podcast.imageUrl" alt="" />
    </div>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
      <div class="flex-1">
        <a :href="podcast.href" class="block mt-2">
          <p class="text-xl font-semibold text-gray-900">
            {{ podcast.title }}
          </p>
          <p class="mt-3 text-base text-gray-500">
            {{ podcast.description }}
          </p>
        </a>
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

<style lang="scss" scoped></style>
