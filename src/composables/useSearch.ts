import { ref } from "vue";
import { RepoTypes } from "src/types";

const MAX_REPOS_AVAILABLE = 1000;

const data = ref<RepoTypes[]>([]);
const isLoading = ref(false);
const currentPage = ref(1);
const totalPages = ref(0);
const reposPerPage = ref(20);
const totalItemsFound = ref(0);
const language = ref("");
const isTooManyRequests = ref(false);

export function useSearch() {
  const getRepos = async (
    searchedText: string,
    page: number,
    reposPerPage: number,
    language: string
  ) => {
    try {
      isLoading.value = true;
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${searchedText}${language}&page=${page}&per_page=${reposPerPage}`
      );
      if (!response.ok) {
        isTooManyRequests.value = true;
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      isTooManyRequests.value = false;
      const responseData = await response.json();
      totalItemsFound.value = responseData.total_count;
      totalPages.value = Math.ceil(
        totalItemsFound.value < MAX_REPOS_AVAILABLE
          ? totalItemsFound.value / reposPerPage
          : MAX_REPOS_AVAILABLE / reposPerPage
      );
      data.value = responseData.items;
      isLoading.value = false;
    } catch (err) {
      console.log(err);
    }
  };
  return {
    data,
    getRepos,
    currentPage,
    totalPages,
    reposPerPage,
    totalItemsFound,
    language,
    isLoading,
    isTooManyRequests,
  };
}
