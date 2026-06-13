import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { moviesApi } from "@/features/movies/api/movies.api";

export const useSearch = (query: string, page = 1) =>
  useQuery({
    queryKey: ["search", query, page],
    queryFn: () => moviesApi.searchMulti(query, page),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
  });
