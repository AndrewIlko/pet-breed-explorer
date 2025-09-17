import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { PetType } from '@/app/utils/constants/pets';
import { QueryParamsKeys } from '@/app/utils/constants';
import { API_CONFIG, createApiHeaders } from '@/app/configuration';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: breedId } = await params;
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get(QueryParamsKeys.LIMIT) || '8';
    const petType = (searchParams.get(QueryParamsKeys.TYPE) ||
      PetType.DOGS) as PetType;

    if (!breedId) {
      return NextResponse.json(
        { error: 'Breed ID is required' },
        { status: 400 },
      );
    }
    const baseUrl = API_CONFIG[petType].BASE_URL;

    const requestSearchParams = new URLSearchParams({
      breed_ids: breedId,
      limit: limit,
    });

    const response = await fetch(
      `${baseUrl}/images/search?${requestSearchParams.toString()}`,
      {
        headers: createApiHeaders(petType),
      },
    );

    const images = await response.json();

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(error);
  }
}
