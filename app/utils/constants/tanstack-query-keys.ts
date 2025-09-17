export const BreedsKeys = {
  all: ['breeds'],
  lists: () => [...BreedsKeys.all, 'list'],
  list: (limit: number) => [...BreedsKeys.lists(), { limit }],
  details: () => [...BreedsKeys.all, 'detail'],
  detail: (id: string) => [...BreedsKeys.details(), id],
  images: (id: string) => [...BreedsKeys.detail(id), 'images'],
  infinite: () => [...BreedsKeys.all, 'infinite'],
  infiniteList: (limit: number, search?: string) => [
    ...BreedsKeys.infinite(),
    { limit, search },
  ],
} as const;
