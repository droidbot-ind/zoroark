import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { searchApi } from "../api/search.api";

export const useSearch = (query: string, page = 1) =>
  useQuery({
    queryKey: ["search", query, page],
    queryFn: () => searchApi.multi(query, page),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
  });
