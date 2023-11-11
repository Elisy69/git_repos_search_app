<script lang="ts" setup>
import { useSearch } from "@composables/useSearch";
import { ref, watchEffect } from "vue";
import { useDebounce } from "@vueuse/core";

const langOptions = ["All", "Javascript", "Assembly", "C", "Python"];
const searchedText = ref("");
const debouncedText = useDebounce(searchedText, 500);

const { getRepos, currentPage, postsPerPage, totalItemsFound } = useSearch();

watchEffect(() => {
  if (debouncedText.value)
    getRepos(debouncedText.value, currentPage.value, postsPerPage.value);
});
</script>

<template>
  <div
    class="bg-slate-500 dark:bg-green-900 p-2 flex flex-col gap-3 w-11/12 sm:w-2/3 md:w-2/4 xl:w-2/6 custom-boxshadow-light dark:custom-boxshadow-dark"
  >
    <input
      placeholder="Type repo name..."
      v-model="searchedText"
      type="text"
      class="outline-none bg-transparent p-2 placeholder-light-text dark:placeholder-dark-text"
    />
    <div class="flex flex-col self-center w-full">
      <label
        class="text-sm line-clamp-2 text-shadow-sm w-3/4 self-center text-center"
        >[Select programming language]</label
      >
      <select
        class="cursor-pointer hover:text-[#99ff99] text-shadow bg-black dark:bg-green-900 p-2 outline-none rounded-lg text-sm w-2/4 self-center"
        name=""
        id=""
      >
        <option v-for="lang in langOptions" :value="lang">
          {{ lang }}
        </option>
      </select>
    </div>
  </div>
  <span class="text-shadow-sm"
    >Total repositories found: [{{ totalItemsFound }}]</span
  >
</template>
