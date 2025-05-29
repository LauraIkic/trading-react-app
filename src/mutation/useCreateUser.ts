import { useMutation } from '@tanstack/react-query';
import { Configuration, DefaultApi, SignupRequestDto } from '../api-client';

const api = new DefaultApi(new Configuration({ basePath: 'http://localhost:5456/api' }));

export const useCreateUser = () => {
    return useMutation({
        mutationFn: (data: SignupRequestDto) => api.createUser({ signupRequestDto: data }),
    });
};
