import { PetType } from '@/app/utils/constants/pets';

export interface IBreedDetailProps {
  breedId: string;
  petType?: PetType;
}
