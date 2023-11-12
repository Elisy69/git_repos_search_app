<script setup lang="ts">
import usePagination from "@composables/usePagination";
import { useSearch } from "@composables/useSearch";

const reposPerPageRange = [20, 30, 50, 100];

const { currentPage, totalPages, reposPerPage } = useSearch();
const { pagination } = usePagination(currentPage, totalPages);

function goToPage(page: number) {
  currentPage.value = page;
}
function prevPage() {
  currentPage.value = currentPage.value - 1;
}
function nextPage() {
  currentPage.value = currentPage.value + 1;
}
function setreposPerPage(posts: Event) {
  const target = posts.target as HTMLSelectElement;
  reposPerPage.value = +target.value;
}
</script>

<template>
  <nav class="flex flex-col gap-2 pb-4">
    <menu class="self-center flex gap-2">
      <select
        @change="setreposPerPage($event)"
        v-model="reposPerPage"
        class="bg-transparent outline-none"
      >
        <option v-for="option in reposPerPageRange" :value="option">
          [{{ option }}]
        </option>
      </select>
      <label>per page</label>
    </menu>
    <ul class="flex gap-3">
      <li class="flex justify-center">
        <button class="hover:text-shadow-sm" type="button" @click="prevPage">
          Previous
        </button>
      </li>
      <li v-for="(page, index) in pagination" :key="index" class="">
        <button
          v-if="typeof page === 'number'"
          type="button"
          @click="goToPage(page)"
          :class="page === currentPage && 'text-shadow-sm'"
          class="hover:text-shadow-sm"
        >
          {{ page === currentPage ? `[${page}]` : page }}
        </button>
        <span v-else>{{ page }}</span>
      </li>
      <li class="flex justify-center">
        <button class="hover:text-shadow-sm" type="button" @click="nextPage">
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>
