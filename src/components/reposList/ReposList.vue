<script lang="ts" setup>
import { useSearch } from "@composables/useSearch";
import Repo from "./Repo.vue";
import { onBeforeRouteUpdate } from "vue-router";
const { data, language, getRepos, searchedText, currentPage, reposPerPage } =
  useSearch();

onBeforeRouteUpdate((to, from, next) => {
  console.log(to);
  searchedText.value = String(to.query?.q) || "";
  currentPage.value = to.query?.page ? +to.query.page : 1;
  reposPerPage.value = to.query?.per_page ? +to.query.per_page : 20;
  language.value = String(to.query?.language);

  if (to.query) {
    getRepos(
      searchedText.value,
      currentPage.value,
      reposPerPage.value,
      language.value
    );
  }

  next();
});
</script>

<template>
  <Repo
    v-for="repo in data"
    :key="repo.id"
    :avatar="repo.owner.avatar_url"
    :owner="repo.owner.login"
    :name="repo.name"
    :description="repo.description"
    :language="repo.language"
    :stars="repo.stargazers_count"
    :repoUrl="repo.html_url"
    :ownerUrl="repo.owner.html_url"
  />
</template>
