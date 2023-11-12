<script setup lang="ts">
import SearchBar from "@components/searchBar/SearchBar.vue";
import Pagination from "@components/pagination/Pagination.vue";
import ReposList from "@components/reposList/ReposList.vue";
import Navbar from "@components/Navbar/Navbar.vue";
import BaseLoading from "@components/BaseLoading.vue";
import { useSearch } from "@composables/useSearch";
import ErrorMessage from "@components/ErrorMessage.vue";

const { data, isLoading, isTooManyRequests } = useSearch();
</script>

<template>
  <div
    class="bg-[#010084] dark:bg-[#0f0f23] w-full h-full flex flex-col items-center p-2 sm:p-4 gap-10 overflow-x-hidden text-light-text shadow-light-text dark:text-dark-text dark:shadow-dark-text"
  >
    <Navbar />
    <SearchBar />
    <BaseLoading v-if="isLoading && !isTooManyRequests" />
    <ReposList v-if="data.length && !isLoading" />
    <Pagination v-if="data.length && !isLoading" />
    <ErrorMessage v-if="isTooManyRequests" />
  </div>
</template>
