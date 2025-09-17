import { FC } from 'react';
import { IPhotoGalleryProps } from './types';
import Image from 'next/image';

export const PhotoGallery: FC<IPhotoGalleryProps> = ({ breedName, images }) => {
  const renderContent = () => {
    if (!images) {
      return null;
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
          >
            <div className="relative h-32 w-full">
              <Image
                src={image.url}
                alt={`${breedName} photo`}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Photo Gallery</h2>
        {images && images.length > 0 && (
          <span className="text-sm text-gray-500">{images.length} photos</span>
        )}
      </div>
      {renderContent()}
    </div>
  );
};
