import { useQuery } from 'react-query';

const sendGet = async (path:string) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error('Error fetching API data. Try the mocked data');
  }
  return response.json();
};

type ParamsType = {
  path:string, id:string, intervalMs:number, displayingMockedData:boolean
};
export default function useGet(params: ParamsType) {
  return useQuery(params.id, () => sendGet(params.path), {
    refetchInterval: params.intervalMs,
    retry: 0,
    staleTime: params.intervalMs,
    enabled: !params.displayingMockedData,
  });
}
