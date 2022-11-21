import { useQuery } from '@tanstack/react-query';

export const sendGet = async (path:string) => {
  const requestOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  };
  const response = await fetch(path, requestOptions);
  if (!response.ok) {
    throw new Error('Error fetching API data. Try the mocked data');
  }
  return response.json();
};

export default function
useGet(path: string, id: string, intervalMs: number, displayingMockedData: boolean) {
  return useQuery([id], () => sendGet(path), {
    refetchInterval: intervalMs,
    retry: 0,
    staleTime: intervalMs,
    enabled: !displayingMockedData,
  });
}
