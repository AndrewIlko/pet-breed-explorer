import { PetType } from '../../constants/pets';

export interface IBreed {
  id: number;
  name: string;
  image?: { url: string };
  petType?: PetType;
}

type Weight = {
  imperial: string;
  metric: string;
};

type Height = {
  imperial: string;
  metric: string;
};

export interface IBreedDetail {
  weight: Weight;
  height: Height;
  id: number;
  name: string;
  bred_for: string;
  life_span: string;
  temperament: string;
  origin: string;
  reference_image_id: string;
}

export interface IBreedImage {
  id: string;
  url: string;
  breeds: IBreed[];
  width?: number;
  height?: number;
}
