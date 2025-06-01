import { useMutation } from '@tanstack/react-query';
import {Configuration, DefaultApi, WalletRequestDto} from '../api-client';
import {useAuthStore} from "../stores/useAuthenticationStore";

const api = new DefaultApi(new Configuration({ basePath: 'http://localhost:5456' }));

export const useBalanceMutation = () => {
    const token = useAuthStore.getState().token;

    return useMutation({
        mutationFn: (data: WalletRequestDto) => api.patchWallet({ walletRequestDto: data }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res)=> {console.log(res)}).catch((error) => {
            console.log(error)
        })
    });
};
