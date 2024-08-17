import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.anilibria.tv/v3/" }),
  endpoints: (builder) => ({
    getTitleUpdates: builder.query({
      query: () => `title/updates?limit=20`,
    }),
    getAnimeTitle: builder.query({
      query: (id) => `title?id=${id}`,
    }),
    getPopularTitle: builder.query({
      query: ({page, itemPage}) => `title/search/advanced?query={type.code}%20==%201&order_by=in_favorites&filter=posters,id,type,id,names,in_favorites&sort_direction=1&items_per_page=${itemPage}&page=${page}`,
    }),
    // getPopularPagination: builder.query({
    //   query: () => `title/search/advanced?query={type.code}%20==%201&order_by=in_favorites&filter=posters,id,type,id,names,in_favorites&sort_direction=1`,
    // }),
    getGenres: builder.query({
      query: () => `genres`,
    }),
    getSearch: builder.query({
      query: ({genres, year, page, itemPerPage, search, type}) => `title/search${type ? `?type=${type}&` : `?`}search=${search}&genres=${genres}&year=${year}&items_per_page=${itemPerPage}&${page && `page=${page}`}`,
    }),
    getPaginationPages: builder.query({
      query: ({genres, year, itemPerPage, search, type}) => `title/search${type ? `?type=${type}&` : `?`}search=${search}&genres=${genres}&year=${year}&items_per_page=${itemPerPage}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTitleUpdatesQuery, useGetAnimeTitleQuery, useGetPaginationPagesQuery, useGetPopularTitleQuery, useGetGenresQuery, useGetSearchQuery } = api;
