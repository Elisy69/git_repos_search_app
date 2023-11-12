export const getTotalPages = (
  itemsFound: number,
  maxItemsAvailable: number,
  reposPerPage: number
) => {
  return Math.ceil(
    itemsFound < maxItemsAvailable
      ? itemsFound / reposPerPage
      : maxItemsAvailable / reposPerPage
  );
};
