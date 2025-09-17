import { FC, memo } from 'react';
import { BreedCardProps } from './types';
import Image from 'next/image';
import { PetType } from '@/app/utils/constants';

const BreedCardComponent: FC<BreedCardProps> = ({
  data,
  onClick,
  onMouseEnter,
}) => {
  const { image, name, id } = data;

  const handleClick = () => {
    onClick(id);
  };

  const handleMouseEnter = () => {
    onMouseEnter(id);
  };

  return (
    <div
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 cursor-pointer overflow-hidden transform hover:-translate-y-1"
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex justify-center items-center min-h-[200px]">
        {image?.url && (
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Image
              src={image.url}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 128px, 128px"
            />
          </div>
        )}
      </div>
      <div className="p-6 bg-white">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">
            {data.petType === PetType.CATS ? '🐱' : '🐕'}
          </span>
          <span className="text-sm text-gray-500 font-medium uppercase">
            {data.petType}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
          {name}
        </h2>
      </div>
    </div>
  );
};

export const BreedCard = memo(BreedCardComponent);
