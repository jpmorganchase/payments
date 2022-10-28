import { useQuery } from 'react-query';

const sendPost = async (path:string, body:string) => {
  const response = await fetch(path, {
    method: 'POST',
    body,
  });
  if (!response.ok) {
    throw new Error('Error fetching API data. Try the mocked data');
  }
  return response.json();
};

export default function usePost(
  path: string,
  id: string,
  intervalMs: number,
  body: string,
  displayingMockedData: boolean,
) {
  return useQuery(id, () => sendPost(path, body), {
    refetchInterval: intervalMs,
    retry: 0,
    staleTime: intervalMs,
    enabled: !displayingMockedData,
  });
}
