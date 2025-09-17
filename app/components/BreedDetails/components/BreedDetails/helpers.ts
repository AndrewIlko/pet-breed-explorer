import { IBreedDetail } from '@/app/utils/ts';

export const getBreedDetails = (data: IBreedDetail) => {
  const {
    temperament,
    life_span,
    bred_for,
    origin,
    weight,
    height,
    reference_image_id,
  } = data;

  const dataItems = [
    { key: 'Temperament', value: temperament },
    { key: 'Life Span', value: life_span },
    { key: 'Bred For', value: bred_for },
    { key: 'Origin', value: origin },
    {
      key: 'Weight',
      value: weight ? `${weight.imperial} (${weight.metric})` : undefined,
    },
    {
      key: 'Height',
      value: height ? `${height.imperial} (${height.metric})` : undefined,
    },
    { key: 'Reference Image ID', value: reference_image_id },
  ];

  const filteredDataItems = dataItems.filter((item) => item.value);

  return filteredDataItems;
};
