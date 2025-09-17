import {
  IBreed,
  IBreedDetail,
  IBreedImage,
  IPaginatedResponse,
  IPaginationOptions,
} from '../ts';
import { PetType } from '../constants/pets';
import { QueryParamsKeys } from '../constants';

class BreedApiRequests {
  async fetchBreeds(): Promise<IBreed[]> {
    const response = await fetch(`/api/breeds`);

    return response.json();
  }

  async fetchBreedsPaginated(
    options: IPaginationOptions,
  ): Promise<IPaginatedResponse<IBreed>> {
    const {
      page = 1,
      limit = 10,
      hasMoreDogData = false,
      hasMoreCatData = false,
      search = null,
    } = options;

    const searchParams = new URLSearchParams({
      [QueryParamsKeys.PAGE]: page.toString(),
      [QueryParamsKeys.LIMIT]: limit.toString(),
      [QueryParamsKeys.HAS_MORE_DOG_DATA]: hasMoreDogData.toString(),
      [QueryParamsKeys.HAS_MORE_CAT_DATA]: hasMoreCatData.toString(),
    });

    if (search) {
      searchParams.set(QueryParamsKeys.SEARCH, search);
    }

    const response = await fetch(`/api/breeds?${searchParams.toString()}`);

    return response.json();
  }

  async fetchBreedById(
    id: string,
    petType: PetType = PetType.DOGS,
  ): Promise<IBreedDetail> {
    const searchParams = new URLSearchParams({
      [QueryParamsKeys.TYPE]: petType,
    });

    const response = await fetch(
      `/api/breeds/${id}?${searchParams.toString()}`,
    );

    return response.json();
  }

  async fetchBreedImages(
    breedId: string,
    limit = 8,
    petType: PetType = PetType.DOGS,
  ): Promise<IBreedImage[]> {
    const searchParams = new URLSearchParams({
      [limit]: limit.toString(),
      [QueryParamsKeys.TYPE]: petType,
    });

    const response = await fetch(
      `/api/breeds/${breedId}/images?${searchParams.toString()}`,
    );

    return response.json();
  }
}

const breedApiRequests = new BreedApiRequests();

export default breedApiRequests;
