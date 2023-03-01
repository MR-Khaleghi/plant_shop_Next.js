import { fetchJson } from '@/lib/api';
import { server } from '@/pages';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const USER_QUERY_KEY = 'user';

export function useCart() {
  const query = useQuery(
    'cart',
    async () => {
      try {
        return await fetchJson(`${server}/api/cart`);
      } catch (error) {
        return undefined;
      }
    },
    {
      staleTime: 30_000, // ms
      cacheTime: Infinity,
    }
  );
  return query.data;
}

export default function useSignOut() {
  const queryClient = useQueryClient();
  const mutation = useMutation(async () => {
    await fetchJson(`${server}/api/logout`);
  });
  return async () => {
    try {
      await mutation.mutateAsync();
      queryClient.setQueryData('user', undefined);
    } catch (error) {}
  };
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const mutation = useMutation(async ({ email, password }) => {
    return await fetchJson(`${server}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  });
  return {
    signIn: async (email, password) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueryData(USER_QUERY_KEY, user);
        return true;
      } catch (error) {
        return false;
      }
    },
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
  };
}

export function useUser() {
  const query = useQuery(
    USER_QUERY_KEY,
    async () => {
      try {
        return await fetchJson(`${server}/api/user`);
      } catch (error) {
        return undefined;
      }
    },
    {
      staleTime: 30_000, // ms
      cacheTime: Infinity,
    }
  );
  return query.data;
}
