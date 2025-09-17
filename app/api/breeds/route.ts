import { NextRequest, NextResponse } from 'next/server';
import {
  parsePaginationParams,
  paginateMixedApiData,
} from '../../utils/helpers/pagination';
import { PetType } from '@/app/utils/constants/pets';
import { API_CONFIG, createApiHeaders } from '@/app/configuration';
import { IPaginationOptions } from '@/app/utils/ts';
import { QueryParamsKeys } from '@/app/utils/constants';

export const getBreedRequestByPetType = (
  petType: PetType,
  paginationOptions: IPaginationOptions,
) => {
  const baseUrl = API_CONFIG[petType].BASE_URL;
  const headers = createApiHeaders(petType);

  const commonParams = {
    [QueryParamsKeys.PAGE]: paginationOptions.page.toString(),
    [QueryParamsKeys.LIMIT]: paginationOptions.limit.toString(),
  };

  if (paginationOptions.search) {
    const params = new URLSearchParams({
      ...commonParams,
      [QueryParamsKeys.SEARCH]: paginationOptions.search,
    });
    const url = `${baseUrl}/breeds/search?${params.toString()}`;
    return fetch(url, {
      headers,
    }).then((response) => response.json());
  } else {
    const params = new URLSearchParams({
      ...commonParams,
    });

    const url = `${baseUrl}/breeds?${params.toString()}`;
    return fetch(url, {
      headers,
    }).then((response) => response.json());
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paginationOptions = parsePaginationParams(searchParams);
    const { hasMoreCatData, hasMoreDogData } = paginationOptions;

    const fetchPromises = [];

    if (hasMoreDogData) {
      fetchPromises.push(
        getBreedRequestByPetType(PetType.DOGS, paginationOptions),
      );
    }

    if (hasMoreCatData) {
      fetchPromises.push(
        getBreedRequestByPetType(PetType.CATS, paginationOptions),
      );
    }

    const [dogs = null, cats = null] = await Promise.all(fetchPromises);

    const response = paginateMixedApiData(dogs, cats, paginationOptions);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}
