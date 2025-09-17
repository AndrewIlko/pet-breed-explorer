import { PetType } from '../utils/constants';

export const API_CONFIG = {
  [PetType.DOGS]: {
    BASE_URL: 'https://api.thedogapi.com/v1',
    VERSION: '1.4.2',
    API_KEY: process.env.DOGS_API_KEY || '',
  },
  [PetType.CATS]: {
    BASE_URL: 'https://api.thecatapi.com/v1',
    VERSION: '1.0',
    API_KEY: process.env.CATS_API_KEY || '',
  },
} as const;

export const createApiHeaders = (apiType: PetType = PetType.DOGS) => ({
  'Content-Type': 'application/json',
  'x-api-key': API_CONFIG[apiType].API_KEY,
});
