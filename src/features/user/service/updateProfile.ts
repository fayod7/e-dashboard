
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/api";
import { useAuthKey } from "../../auth/service/useAuth";


export const useUpdateProfile = () => {
      const queryClient = useQueryClient();
    const profileUpdateMutation = useMutation<any, any, any> ({
        mutationFn: ({id, body}) => api.patch(`user/${id}`, body),
          onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [useAuthKey]
            })
        }
     })

  return { profileUpdateMutation };
};
