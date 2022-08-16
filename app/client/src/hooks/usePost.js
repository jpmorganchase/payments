import { useQuery } from 'react-query';

const sendPost = async (path, body) => {
  const response = await fetch(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Error fetching API data. Try the mocked data');
  }
  return response.json();
};

export default function usePost(path, id, intervalMs, body) {
  return useQuery(id, () => sendPost(path, body), {
    refetchInterval: intervalMs,
    retry: 0,
    staleTime: intervalMs,
  });
}
