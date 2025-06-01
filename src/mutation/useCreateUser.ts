import { useMutation } from '@tanstack/react-query';
import { Configuration, DefaultApi, SignupRequestDto } from '../api-client';
import {useAuthStore} from "../stores/useAuthenticationStore";

const api = new DefaultApi(new Configuration({ basePath: 'http://localhost:5456' }));

export const useCreateUser = () => {
    const setAuth = useAuthStore((state) => state.login);

    return useMutation({
        mutationFn: (data: SignupRequestDto) => api.createUser({ signupRequestDto: data })
            .then((response) => {
                console.log(response)
                setAuth('id', response.jwt!);
        })
    });
};
