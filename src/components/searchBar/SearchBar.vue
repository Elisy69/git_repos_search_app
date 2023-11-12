<script lang="ts" setup>
import { useSearch } from "@composables/useSearch";
import { useDebounceFn } from "@vueuse/core";

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

const {
  getRepos,
  currentPage,
  reposPerPage,
  totalItemsFound,
  language,
  searchedText,
} = useSearch();

const debouncedFn = useDebounceFn(() => {
  if (searchedText.value && searchedText.value.trim()) {
    getRepos(
      searchedText.value,
      currentPage.value,
      reposPerPage.value,
      language.value
    );
  }
}, 500);

function setLanguage(lang: Event) {
  const target = lang.target as HTMLSelectElement;
  target.value === "All"
    ? (language.value = "")
    : (language.value = "+language:" + target.value);
  getRepos(
    searchedText.value,
    currentPage.value,
    reposPerPage.value,
    language.value
  );
}
</script>

<template>
  <div
    class="bg-slate-500 dark:bg-green-900 p-2 flex flex-col gap-3 w-11/12 sm:w-2/3 md:w-2/4 xl:w-2/6 custom-boxshadow-light dark:custom-boxshadow-dark text-light-text shadow-light-text dark:text-dark-text dark:shadow-dark-text"
  >
    <input
      @keyup="debouncedFn"
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
