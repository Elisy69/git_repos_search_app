<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";
import SunIcon from "@components/Navbar/SunIcon.vue";
import MoonIcon from "@components/Navbar/MoonIcon.vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div class="relative flex items-center px-2 py-4">
    <h1 class="flex justify-center items-center text-center">
      <span
        class="text-3xl sm:text-6xl md:text-7xl dark:hover:text-[#99ff99] hover:text-gray-200 text-shadow cursor-pointer"
        >GitHub repos.</span
      >
    </h1>
    <button
      class="flex items-center justify-center w-5 sm:w-7"
      @click="toggleDark()"
    >
      <MoonIcon class="text-white hover:text-amber-100" v-show="isDark" />
      <SunIcon class="text-green-500 hover:text-amber-200" v-show="!isDark" />
    </button>
    <div class="w-12">
      <span class="line-clamp-2 text-[0.55rem] lg:text-[0.7rem]"
        >[Toggle theme]</span
      >
    </div>
  </div>
</template>
