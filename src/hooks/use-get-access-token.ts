import { AccessToken } from '../enums/access-token.enum.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { accessTokenSelector } from '@utils/helpers/selectors.ts';
import { Nullable } from '@types/nullable.type.ts';

export const useGetAccessToken = (): Nullable<string> => {
    const localStorageAccessToken = localStorage.getItem(AccessToken.token);
    const storeAccessToken = useAppSelector(accessTokenSelector);

    return localStorageAccessToken || storeAccessToken;
};
