import { IBreed } from '@/app/utils/ts';

export type BreedCardProps = {
  data: IBreed;
  onMouseEnter: (breedId: number) => void;
  onClick: (breedId: number) => void;
};
