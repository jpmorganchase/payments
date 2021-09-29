import { useQuery } from 'react-query';

const sendPost = async (path) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(
      `Error fetching API data with error message: ${response.statusText}`,
    );
  }
  return response.json();
};

export default function usePost(path, id, intervalMs) {
  return useQuery(id, () => sendPost(path), {
    refetchInterval: intervalMs,
    staleTime: intervalMs,
  });
}
