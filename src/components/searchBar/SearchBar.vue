<script lang="ts" setup>
import { useSearch } from "@composables/useSearch";
import { ref, watch } from "vue";
import { useDebounce } from "@vueuse/core";

const langOptions = [
  "All",
  "Javascript",
  "Assembly",
  "C",
  "C++",
  "Python",
  "Typescript",
  "Rust",
];
const searchedText = ref("");
const debouncedText = useDebounce(searchedText, 500);

const { getRepos, currentPage, reposPerPage, totalItemsFound, language } =
  useSearch();

function setLanguage(lang: Event) {
  const target = lang.target as HTMLSelectElement;
  target.value === "All"
    ? (language.value = "")
    : (language.value = "+language:" + target.value);
}

watch([debouncedText, reposPerPage, language], () => {
  if (debouncedText.value && debouncedText.value.trim()) currentPage.value = 1;
  getRepos(
    debouncedText.value,
    currentPage.value,
    reposPerPage.value,
    language.value
  );
});

watch(currentPage, (newPage: number) => {
  getRepos(debouncedText.value, newPage, reposPerPage.value, language.value);
});
</script>

<template>
  <div
    class="bg-slate-500 dark:bg-green-900 p-2 flex flex-col gap-3 w-11/12 sm:w-2/3 md:w-2/4 xl:w-2/6 custom-boxshadow-light dark:custom-boxshadow-dark text-light-text shadow-light-text dark:text-dark-text dark:shadow-dark-text"
  >
    <input
      placeholder="Type repo name..."
      v-model="searchedText"
      type="text"
      class="outline-none bg-transparent p-2 placeholder-light-text dark:placeholder-dark-text"
    />
    <div class="flex flex-col self-center w-full gap-2">
      <label
        class="text-sm line-clamp-2 text-shadow-sm w-3/4 self-center text-center"
        >[Select programming language]</label
      >
      <select
        class="cursor-pointer hover:text-[#99ff99] text-shadow bg-black dark:bg-green-900 p-2 outline-none rounded-lg text-sm w-[8rem] self-center"
        @change="setLanguage($event)"
      >
        <option v-for="lang in langOptions" :value="lang">
          {{ lang }}
        </option>
      </select>
    </div>
  </div>
  <span
    class="text-shadow-sm text-light-text shadow-light-text dark:text-dark-text dark:shadow-dark-text"
    >Total repositories found: [{{ totalItemsFound }}]</span
  >
</template>
