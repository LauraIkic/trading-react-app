import { useMutation } from '@tanstack/react-query';
import {Configuration, DefaultApi, WalletRequestDto} from '../api-client';
import {useAuthStore} from "../stores/useAuthenticationStore";

export const useBalanceMutation = () => {
    const token = useAuthStore.getState().token;

    const api = new DefaultApi(
        new Configuration({
            basePath: 'http://localhost:5456',
            accessToken: token ? `Bearer ${token}` : undefined,
        })
    );

    return useMutation({
        mutationFn: (data: WalletRequestDto) =>
            api.patchWallet({ walletRequestDto: data })
                .then((res) => {
                    console.log(res);
                    return res;
                })
                .catch((error) => {
                    console.error(error);
                    throw error;
                }),
    });
};
