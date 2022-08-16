import { useQuery } from 'react-query';

const sendPost = async (path) => {
  const response = await fetch(`http://localhost:8081${path}`);
  if (!response.ok) {
    throw new Error('Error fetching API data. Try the mocked data');
  }
  return response.json();
};

export default function usePost(path, id, intervalMs) {
  return useQuery(id, () => sendPost(path), {
    refetchInterval: intervalMs,
    retry: 0,
    staleTime: intervalMs,
  });
}
