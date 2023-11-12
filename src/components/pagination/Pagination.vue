<script setup lang="ts">
import usePagination from "@composables/usePagination";
import { useSearch } from "@composables/useSearch";

const reposPerPageRange = [20, 30, 50, 100];

const {
  currentPage,
  totalPages,
  reposPerPage,
  getRepos,
  language,
  searchedText,
} = useSearch();
const { pagination } = usePagination(currentPage, totalPages);

function handlePageChange(newPage: number) {
  currentPage.value = newPage;
  getRepos(
    searchedText.value,
    currentPage.value,
    reposPerPage.value,
    language.value
  );
}

function setReposPerPage(event: Event) {
  const target = event.target as HTMLSelectElement;
  reposPerPage.value = +target.value;
  handlePageChange(1);
}
</script>

<template>
  <nav class="flex flex-col gap-2 pb-4">
    <menu class="self-center flex gap-2">
      <select
        @change="setReposPerPage($event)"
        v-model="reposPerPage"
        class="bg-transparent outline-none"
      >
        <option
          v-for="option in reposPerPageRange"
          :value="option"
          :key="option"
        >
          [{{ option }}]
        </option>
      </select>
      <label>per page</label>
    </menu>
    <ul class="flex gap-3">
      <li class="flex justify-center">
        <button
          class="hover:text-shadow-sm"
          type="button"
          @click="handlePageChange(currentPage - 1)"
        >
          Previous
        </button>
      </li>
      <li v-for="(page, index) in pagination" :key="index" class="">
        <button
          v-if="typeof page === 'number'"
          type="button"
          @click="handlePageChange(page)"
          :class="page === currentPage && 'text-shadow-sm'"
          class="hover:text-shadow-sm"
        >
          {{ page === currentPage ? `[${page}]` : page }}
        </button>
        <span v-else>{{ page }}</span>
      </li>
      <li class="flex justify-center">
        <button
          class="hover:text-shadow-sm"
          type="button"
          @click="handlePageChange(currentPage + 1)"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>
