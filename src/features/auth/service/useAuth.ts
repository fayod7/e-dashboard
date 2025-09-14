import { useMutation, useQuery } from "@tanstack/react-query"
import { api } from "../../../shared/api"

export const useAuthKey = "useAuthKey"

export const useAuth = ()=>{

    const getProfile =() => useQuery<any, any>({
        queryKey: [useAuthKey],
        queryFn: () => api.get('auth/me').then(res => res.data)
        .then(data => data.data),
        retry: 0
    });
   // [SuccessType, ErrorType, BodyType]
    const signIn = useMutation<any, any, { email: string, password: string }>({
        mutationFn: (body) => api.post("auth/signin", body).then((res) => res.data)
    });
    
   // [SuccessType, ErrorType, BodyType]
    const signUp = useMutation<any, any, { email: string, password: string }>({
        mutationFn: (body) => api.post("auth/signup", body).then((res) => res.data)
    });
    const confirmOtp = useMutation<any, any, {otp: string, email: string, verificationKey: string}>({
        mutationFn: (body) => api.post('auth/confirm-otp', body).then(res => res.data)
    })
    const sendNewOtp = useMutation<any, any, { email: string }>({
        mutationFn: (body) => api.post('auth/new-opt', body).then(res => res.data)
    })

    return { signIn, signUp, confirmOtp, sendNewOtp, getProfile }
}