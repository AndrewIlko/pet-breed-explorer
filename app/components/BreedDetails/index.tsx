'use client';

import { useBreedImages } from '@/app/utils/hooks/useBreeds';
import { useBreed } from '../../utils/hooks/useBreeds';
import { FC } from 'react';
import { IBreedDetailProps } from './types';
import { BackLink } from './components/BackLink';
import { PhotoGallery } from './components/PhotoGallery';
import { BreedDetails } from './components/BreedDetails';
import { PetType } from '@/app/utils/constants/pets';

export const BreedDetail: FC<IBreedDetailProps> = ({
  breedId,
  petType = PetType.DOGS,
}) => {
  const { data: breed } = useBreed(breedId, petType);
  const { data: images } = useBreedImages(breedId, 12, petType);

  return (
    <div className="container mx-auto px-4 py-8">
      <BackLink />
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-white-800 mb-6">
          {breed?.name}
        </h1>
        {breed && <BreedDetails data={breed} />}
        <PhotoGallery breedName={breed?.name} images={images} />
      </div>
    </div>
  );
};
