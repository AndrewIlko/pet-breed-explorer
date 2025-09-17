import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import breedApiRequests from '../../api-requests';
import { BreedsKeys } from '@/app/utils/constants';
import { PetType } from '../../constants/pets';
import { getLastPageFromQueryData } from '../../helpers/pagination';

export const useBreeds = () =>
  useQuery({
    queryKey: BreedsKeys.all,
    queryFn: () => breedApiRequests.fetchBreeds(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

export const useBreed = (id: string, petType: PetType = PetType.DOGS) =>
  useQuery({
    queryKey: [...BreedsKeys.detail(id), petType],
    queryFn: () => breedApiRequests.fetchBreedById(id, petType),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });

export const usePrefetchBreed = () => {
  const queryClient = useQueryClient();

  return (id: string, petType: PetType = PetType.DOGS) => {
    queryClient.prefetchQuery({
      queryKey: [...BreedsKeys.detail(id), petType],
      queryFn: () => breedApiRequests.fetchBreedById(id, petType),
      staleTime: 10 * 60 * 1000,
    });
  };
};

export const useBreedImages = (
  breedId: string,
  limit: number,
  petType: PetType = PetType.DOGS,
) =>
  useQuery({
    queryKey: [...BreedsKeys.images(breedId), petType],
    queryFn: () => breedApiRequests.fetchBreedImages(breedId, limit, petType),
    enabled: !!breedId,
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

export const useInfiniteBreeds = (limit: number = 10, search: string = '') => {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: BreedsKeys.infiniteList(limit, search),
    queryFn: ({ pageParam = 1 }) => {
      const queryData = queryClient.getQueryData(
        BreedsKeys.infiniteList(limit, search),
      );

      const lastPage = getLastPageFromQueryData(queryData);

      const hasMoreDogData = lastPage?.pagination?.hasMoreDogData ?? true;
      const hasMoreCatData = lastPage?.pagination?.hasMoreCatData ?? true;

      return breedApiRequests.fetchBreedsPaginated({
        page: pageParam,
        limit,
        hasMoreDogData,
        hasMoreCatData,
        search,
      });
    },
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
