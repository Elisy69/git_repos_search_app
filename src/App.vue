<script setup lang="ts">
import SearchBar from "@components/searchBar/SearchBar.vue";
import Pagination from "@components/pagination/Pagination.vue";
import ReposList from "@components/reposList/ReposList.vue";
import Navbar from "@components/Navbar/Navbar.vue";
</script>

<template>
  <Navbar />
  <SearchBar />
  <ReposList />
  <Pagination />
</template>
