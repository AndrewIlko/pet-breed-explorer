import { FC, useMemo } from 'react';
import { IBreedDetailsProps } from './types';
import { getBreedDetails } from './helpers';

export const BreedDetails: FC<IBreedDetailsProps> = ({ data }) => {
  const dataItems = useMemo(() => getBreedDetails(data), [data]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {dataItems.map(({ key, value }) => (
        <div key={key} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">{key}</h2>
          <p className="text-gray-600">{value}</p>
        </div>
      ))}
    </div>
  );
};
