import { useQuery } from 'react-query';

const sendGet = async (path:string) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error('Error fetching API data. Try the mocked data');
  }
  return response.json();
};

export default function
useGet(path: string, id: string, intervalMs: number, displayingMockedData: boolean) {
  return useQuery(id, () => sendGet(path), {
    refetchInterval: intervalMs,
    retry: 0,
    staleTime: intervalMs,
    enabled: !displayingMockedData,
  });
}
