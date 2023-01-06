import { useQuery } from '@tanstack/react-query';

export const sendPost = async (path:string, body:string) => {
  const requestOptions: RequestInit = {
    method: 'POST',
    body,
  };
  // Something unusual going on with api. Added until we move over
  if (!path.includes('accessapi/balance')) {
    requestOptions.headers = {
      'Content-Type': 'application/json',
    };
  }
  const response = await fetch(path, requestOptions);
  return response.json();
};

export default function usePost(
  path: string,
  id: string,
  intervalMs: number,
  body: string,
  displayingMockedData: boolean,
) {
  return useQuery([id], () => sendPost(path, body), {
    refetchInterval: intervalMs,
    retry: 0,
    staleTime: intervalMs,
    enabled: !displayingMockedData,
  });
}
