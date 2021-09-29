import { useQuery } from 'react-query';
export default function usePost(path, id, intervalMs) {
  return useQuery(
    id,
    async () => {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(
          `Error fetching API data with error message: ${response.statusText}`,
        );
      }
      return response.json();
    },
    {
      refetchInterval: intervalMs,
    },
  );
}
