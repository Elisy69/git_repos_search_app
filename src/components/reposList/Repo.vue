<script lang="ts" setup>
import { getLangColor } from "@utils/getLangColor";
const props = defineProps<{
  owner: string;
  avatar: string;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  repoUrl: string;
  ownerUrl: string;
}>();
</script>

<template>
  <div
    class="flex w-11/12 sm:w-2/3 md:w-2/4 xl:w-2/6 bg-slate-500 dark:bg-green-900 p-2 gap-3 custom-boxshadow-light dark:custom-boxshadow-dark"
  >
    <div class="w-1/3 flex flex-col">
      <a
        :href="ownerUrl"
        target="_blank"
        class="cursor-pointer shadow-2xl peer"
      >
        <img :src="avatar" alt="avatar" class="w-full" />
      </a>
      <a
        :href="ownerUrl"
        target="_blank"
        class="cursor-pointer self-center mb-4 peer-hover:underline hover:underline text-xs"
        >{{ owner }}</a
      >
      <div class="flex flex-col text-xs gap-3">
        <span
          >Language: [<span :class="getLangColor(props.language)">{{
            language ? language : "..."
          }}</span
          >]</span
        >
        <span>⭐[{{ stars }}]</span>
      </div>
    </div>
    <div class="w-2/3 flex flex-col">
      <a
        :href="repoUrl"
        target="_blank"
        class="self-center text-xl text-shadow-sm text-center hyphens-auto break-words hover:text-shadow"
      >
        {{ name }}
      </a>
      <p class="hyphens-auto break-words text-sm sm:text-base">
        {{ description }}
      </p>
    </div>
  </div>
</template>
