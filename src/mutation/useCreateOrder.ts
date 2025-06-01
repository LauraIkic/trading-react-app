import { useMutation } from '@tanstack/react-query';
import {Configuration, DefaultApi, OrderCreateDto} from '../api-client';
import {useAuthStore} from "../stores/useAuthenticationStore";

export const useCreateOrder = () => {
    const token = useAuthStore.getState().token;

    const api = new DefaultApi(
        new Configuration({
            basePath: 'http://localhost:5456',
            accessToken: token ? `Bearer ${token}` : undefined,
        })
    );

    return useMutation({
        mutationFn: (data: OrderCreateDto) =>
            api.createOrder({ orderCreateDto: data })
    });
};
