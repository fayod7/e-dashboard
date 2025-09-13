import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/api";


interface IParams {
  skip?: number
  limit?: number
  order?: string,
}

export const productsKey = 'productsKey'

export const useProduct = () => {
  const queryClient = useQueryClient();

  const getAllProducts = (params?: IParams) =>
    useQuery<any, any>({
      queryKey: [productsKey, params],
      queryFn: () => api.get('product', {params})
      .then((res) => res.data)
      .then((data) => data.data)
    });
    const createProductMutation = useMutation<any, any, any>({
        mutationFn: (body) => api.post('product', body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [productsKey]
            })
        }
    });
    const deleteProductMutation = useMutation<any, any, any>({
        mutationFn: (id:string | number) => api.delete(`product/${id}`),
          onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [productsKey]
            })
        }
     });

  return { getAllProducts, createProductMutation, deleteProductMutation };
};
