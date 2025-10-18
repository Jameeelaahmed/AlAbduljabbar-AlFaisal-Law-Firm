import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../api/user';

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
};

export default useUserInfo;
