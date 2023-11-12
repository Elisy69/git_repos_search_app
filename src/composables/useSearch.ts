import { ref } from "vue";
import { RepoTypes } from "src/types";
import { getTotalPages } from "@utils/getTotalPages";
import router from "@router/index";

const MAX_REPOS_AVAILABLE = 1000;

let prevLanguage = "";
let prevSearchedText = "";
let prevReposPerPage = 0;

const data = ref<RepoTypes[]>([]);
const searchedText = ref("");
const isLoading = ref(false);
const currentPage = ref(1);
const totalPages = ref(0);
const reposPerPage = ref(20);
const totalItemsFound = ref(0);
const language = ref("");
const isTooManyRequests = ref(false);

export function useSearch() {
  const getRepos = async (
    text: string,
    page: number,
    reposCount: number,
    lang: string
  ) => {
    try {
      isLoading.value = true;

      if (
        lang !== prevLanguage ||
        text !== prevSearchedText ||
        reposCount !== prevReposPerPage
      ) {
        currentPage.value = 1;
        page = 1;
      }

      prevLanguage = lang;
      prevSearchedText = text;
      prevReposPerPage = reposCount;

      const response = await fetch(
        `https://api.github.com/search/repositories?q=${text}${lang}&page=${page}&per_page=${reposCount}`
      );
      console.log("making a request");
      router.push({
        name: "repos_list",
        query: {
          q: searchedText.value,
          page: currentPage.value,
          per_page: reposPerPage.value,
          language: lang,
        },
      });
      if (!response.ok) {
        isTooManyRequests.value = true;
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      isTooManyRequests.value = false;
      const responseData = await response.json();
      totalItemsFound.value = responseData.total_count;
      totalPages.value = getTotalPages(
        totalItemsFound.value,
        MAX_REPOS_AVAILABLE,
        reposCount
      );
      data.value = responseData.items;
      isLoading.value = false;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    data,
    searchedText,
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
