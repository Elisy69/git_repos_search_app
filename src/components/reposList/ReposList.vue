<script lang="ts" setup>
import { useSearch } from "@composables/useSearch";
import Repo from "./Repo.vue";

const { data } = useSearch();
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
    :url="repo.html_url"
  />
</template>
