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

type PostParamType = {
  path: string,
  id: string,
  intervalMs: number,
  body: string,
  displayingMockedData: boolean,
};

export default function usePost(params: PostParamType) {
  return useQuery(params.id, () => sendPost(params.path, params.body), {
    refetchInterval: params.intervalMs,
    retry: 0,
    staleTime: params.intervalMs,
    enabled: !params.displayingMockedData,
  });
}
