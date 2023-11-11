<script setup lang="ts">
import { watchEffect } from "vue";
import usePagination from "@composables/usePagination";
import { useSearch } from "@composables/useSearch";

const postsPerPageRange = [20, 30, 50, 100];

const { currentPage, totalPages, postsPerPage } = useSearch();
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
function setPostsPerPage(posts: Event) {
  const target = posts.target as HTMLSelectElement;
  postsPerPage.value = +target.value;
}

function getButtonLabel(page: number) {
  return page === totalPages.value
    ? `Go to page ${page}, the last page`
    : `Go to page ${page}`;
}

watchEffect(() => {
  // console.log(currentPage.value, totalPages.value, postsPerPage.value);
});
</script>

<template>
  <nav aria-label="pagination" class="pagination">
    <select @change="setPostsPerPage($event)" v-model="postsPerPage">
      <option v-for="option in postsPerPageRange" :value="option">
        {{ option }}
      </option>
    </select>
    <ul>
      <li>
        <button
          type="button"
          @click="prevPage"
          :aria-disabled="currentPage === 1"
          :aria-label="`Go to the previous page, page ${currentPage - 1}`"
        >
          Previous
        </button>
      </li>
      <li
        v-for="(page, index) in pagination"
        :key="index"
        class="pagination__range"
      >
        <button
          v-if="typeof page === 'number'"
          type="button"
          :aria-current="currentPage === page"
          :aria-label="getButtonLabel(page)"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <span v-else>{{ page }}</span>
      </li>
      <li>
        <button
          type="button"
          @click="nextPage"
          :aria-disabled="currentPage === totalPages"
          :aria-label="`Go to the next page, page ${currentPage + 1}`"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.pagination ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 8px;
}

.pagination__range > * {
  width: 32px;
  padding: 4px;
  display: block;
  text-align: center;
}

button[aria-current] {
  outline: 2px solid blue;
  outline-offset: 2px;
}

button[aria-disabled] {
  opacity: 0.5;
}
</style>
