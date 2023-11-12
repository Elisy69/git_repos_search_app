import ReposList from "@components/reposList/ReposList.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [{ path: "/", name: "repos_list", component: ReposList }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
