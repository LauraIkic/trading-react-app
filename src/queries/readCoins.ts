import { queryOptions } from '@tanstack/react-query';
import { QueryKeyEnum } from '../enums/QueryKeyEnum';
import { DefaultApi, Configuration } from '../api-client';
const api = new DefaultApi(new Configuration({ basePath: 'http://localhost:3000/api' }));

export const readCoinsQuery = queryOptions({
    queryKey: [QueryKeyEnum.coins],
    queryFn: () => api.readCoins(),
});

