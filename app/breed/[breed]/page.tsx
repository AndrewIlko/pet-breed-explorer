import { BreedDetail } from '@/app/components/BreedDetails';
import { Loading } from '@/app/components/Loading';
import { QueryParamsKeys } from '@/app/utils/constants';
import { PetType } from '@/app/utils/constants/pets';
import { Suspense } from 'react';

interface BreedPageProps {
  params: Promise<{
    breed: string;
  }>;
  searchParams: Promise<{
    [QueryParamsKeys.TYPE]?: string;
  }>;
}

export default async function BreedPage({
  params,
  searchParams,
}: BreedPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const petType = (resolvedSearchParams[QueryParamsKeys.TYPE] ||
    PetType.DOGS) as PetType;

  return (
    <Suspense fallback={<Loading />}>
      <BreedDetail breedId={resolvedParams.breed} petType={petType} />
    </Suspense>
  );
}
