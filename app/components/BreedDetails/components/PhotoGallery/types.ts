import { IBreedImage } from '@/app/utils/ts';

export interface IPhotoGalleryProps {
  breedName: string | undefined;
  images: IBreedImage[] | undefined;
}
