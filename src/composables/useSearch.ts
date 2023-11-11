import { ref } from "vue";
import { RepoTypes } from "src/types";

const data = ref<RepoTypes[]>([]);
const currentPage = ref(1);
const totalPages = ref(500);
const postsPerPage = ref(20);
const totalItemsFound = ref(0);

export function useSearch() {
  const getRepos = async (
    searchedText: string,
    currentPage: number,
    postsPerPage: number
  ) => {
    try {
      console.log(searchedText, currentPage, postsPerPage);

      const response = await fetch(
        `https://api.github.com/search/repositories?q=${searchedText}&page=${currentPage}&per_page=${postsPerPage}`
      );
      const responseData = await response.json();
      totalPages.value = Math.ceil(responseData.total_count / postsPerPage);
      totalItemsFound.value = responseData.total_count;
      data.value = responseData.items;
    } catch (err) {
      console.log(err);
    }
  };
  return {
    data,
    getRepos,
    currentPage,
    totalPages,
    postsPerPage,
    totalItemsFound,
  };
}
