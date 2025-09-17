import { PetType, QueryParamsKeys } from '../../constants';
import {
  IPaginatedResponse,
  IPaginationMeta,
  IPaginationOptions,
} from '../../ts';

export const paginateMixedApiData = <T extends { petType: string }>(
  dogs: T[] | null,
  cats: T[] | null,
  options: IPaginationOptions,
): IPaginatedResponse<T> => {
  const { page, limit } = options;

  const dogsWithType = dogs
    ? dogs?.map((breed) => ({
        ...breed,
        petType: PetType.DOGS,
      }))
    : [];
  const catsWithType = cats
    ? cats.map((breed) => ({
        ...breed,
        petType: PetType.CATS,
      }))
    : [];

  const allBreeds = [...dogsWithType, ...catsWithType];

  const hasMoreDogs = dogsWithType.length === limit;
  const hasMoreCats = catsWithType.length === limit;

  const hasNextPage = hasMoreDogs || hasMoreCats;

  const pagination: IPaginationMeta = {
    page,
    limit,
    total: allBreeds.length,
    hasNextPage,
    hasPrevPage: page > 1,
    hasMoreDogData: hasMoreDogs,
    hasMoreCatData: hasMoreCats,
  };

  return {
    data: allBreeds,
    pagination,
  };
};

export const parsePaginationParams = (
  searchParams: URLSearchParams,
): IPaginationOptions => {
  const page = parseInt(searchParams.get(QueryParamsKeys.PAGE) || '1');
  const limit = parseInt(searchParams.get(QueryParamsKeys.LIMIT) || '10');
  const hasMoreDogData =
    searchParams.get(QueryParamsKeys.HAS_MORE_DOG_DATA) === 'true';
  const hasMoreCatData =
    searchParams.get(QueryParamsKeys.HAS_MORE_CAT_DATA) === 'true';
  const search = searchParams.get(QueryParamsKeys.SEARCH) || null;

  return { page, limit, hasMoreDogData, hasMoreCatData, search };
};

export const getLastPageFromQueryData = (queryData: unknown) => {
  if (!queryData) return null;
  if (typeof queryData !== 'object') return null;
  if (!('pages' in queryData)) return null;
  if (!Array.isArray(queryData.pages)) return null;

  return queryData?.pages?.[queryData.pages.length - 1];
};
