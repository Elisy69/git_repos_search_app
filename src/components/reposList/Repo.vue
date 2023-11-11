<script lang="ts" setup>
defineProps<{
  owner: string;
  avatar: string;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
}>();
</script>

<template>
  <div
    class="flex w-11/12 sm:w-2/3 md:w-2/4 xl:w-2/6 bg-slate-500 dark:bg-green-900 p-2 gap-3 custom-boxshadow-light dark:custom-boxshadow-dark"
  >
    <div class="w-1/3 flex flex-col">
      <div class="cursor-pointer shadow-2xl peer">
        <img :src="avatar" alt="" />
      </div>
      <span
        class="cursor-pointer self-center mb-4 peer-hover:underline hover:underline text-xs"
        >{{ owner }}</span
      >
      <div class="flex flex-col text-xs gap-3">
        <span>Language: [{{ language }}]</span>
        <span>⭐[{{ stars }}]</span>
      </div>
    </div>
    <div class="w-2/3 flex flex-col">
      <h1 class="self-center text-xl text-shadow-sm">{{ name }}</h1>
      <p class="break-all p-2">{{ description }}</p>
    </div>
  </div>
</template>
