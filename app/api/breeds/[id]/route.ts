import { NextRequest, NextResponse } from 'next/server';

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
    const petType = (searchParams.get(QueryParamsKeys.TYPE) ||
      PetType.DOGS) as PetType;

    if (!breedId) {
      return NextResponse.json(
        { error: 'Breed ID is required' },
        { status: 400 },
      );
    }

    const baseUrl = API_CONFIG[petType].BASE_URL;

    const response = await fetch(`${baseUrl}/breeds/${breedId}`, {
      headers: createApiHeaders(petType),
    });

    const breed = await response.json();

    const data = {
      ...breed,
      petType,
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
