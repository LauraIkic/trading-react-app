import { queryOptions } from '@tanstack/react-query';
import { QueryKeyEnum } from '../enums/QueryKeyEnum';
import { DefaultApi, Configuration } from '../api-client';
import {useAuthStore} from "../stores/useAuthenticationStore";

const api = new DefaultApi(new Configuration({ basePath: 'http://localhost:5456' }));

export const readOrderQuery = queryOptions({
    queryKey: [QueryKeyEnum.order],
    queryFn: () => {
        const token = useAuthStore.getState().token;
        return api.readOrders( {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
});
