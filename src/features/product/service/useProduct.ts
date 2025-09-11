import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/api";

export const productsKey = 'productsKey'

export const useProduct = () => {
  const queryClient = useQueryClient();

  const getAllCategories = () =>
    useQuery<any, any>({
      queryKey: [productsKey],
      queryFn: () => api.get('category').then((res) => res.data),
    });
    const createMutation = useMutation<any, any, any>({
        mutationFn: (body) => api.post('/category', body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [productsKey]
            })
        }
    });
    const deleteMutation = useMutation<any, any, any>({
        mutationFn: (id:string | number) => api.delete(`/category/${id}`),
          onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [productsKey]
            })
        }
     });
     const updateMutation = useMutation<any, any, any> ({
            mutationFn: ({id, name}:{id:number, name:any}) => api.patch(`category/${id}`, {name}),
          onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [productsKey]
            })
        }
     })

  return { getAllCategories, createMutation, deleteMutation, updateMutation };
};
