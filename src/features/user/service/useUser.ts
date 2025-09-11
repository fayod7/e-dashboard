import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/api";

export const userKey = 'userkey'

export const useUser = () => {
  const getUsers = () =>
    useQuery<any, any>({
      queryKey: [userKey],
      queryFn: () => api.get('user').then((res) => res.data),
    });

  return { getUsers };
};
