import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/api";

export const categoryKey = 'categoryKey'

export const useCategory = () => {
  const queryClient = useQueryClient();

  const getAllCategories = () =>
    useQuery<any, any>({
      queryKey: [categoryKey],
      queryFn: () => api.get('category').then((res) => res.data),
      gcTime: 1000 * 60 * 5,
    });
    const createMutation = useMutation<any, any, any>({
        mutationFn: (body) => api.post('category', body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [categoryKey]
            })
        }
    });
    const deleteMutation = useMutation<any, any, any>({
        mutationFn: (id:string | number) => api.delete(`category/${id}`),
          onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [categoryKey]
            })
        }
     });
     const updateMutation = useMutation<any, any, any> ({
            mutationFn: ({id, name}:{id:number, name:any}) => api.patch(`category/${id}`, {name}),
          onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [categoryKey]
            })
        }
     })

  return { getAllCategories, createMutation, deleteMutation, updateMutation };
};
