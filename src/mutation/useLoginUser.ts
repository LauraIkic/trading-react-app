import { useMutation } from '@tanstack/react-query';
import { DefaultApi, Configuration, LoginRequestDto } from '../api-client';
import {useAuthStore} from "../stores/useAuthenticationStore";

const api = new DefaultApi(new Configuration({ basePath: 'http://localhost:5456' }));

export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.login);

    return useMutation({
        mutationFn: (data: LoginRequestDto) => api.loginUser({ loginRequestDto: data }),
        onSuccess: (res) => {
            setAuth(res.userId!, res.token!);
        },
    });
};
