'use client';

import { useRouter } from 'next/navigation';
import { usePrefetchBreed } from '../../utils/hooks/useBreeds';
import { useInfiniteScroll } from '../../utils/hooks/useInfiniteScroll';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { BreedCard } from './components/BreedCard';
import { SearchInput } from './components/SearchInput';
import { useCallback, useState, useEffect } from 'react';
import { PetType } from '@/app/utils/constants/pets';
import { Loading } from '../Loading';

const Breeds = () => {
  const [search, setSearch] = useState('');
  const [hoveredBreed, setHoveredBreed] = useState<{
    id: string;
    petType: PetType;
  } | null>(null);
  const debouncedHoveredBreed = useDebounce(hoveredBreed, 300);

  const { breeds, isLoading, isFetchingNextPage, hasNextPage, observerRef } =
    useInfiniteScroll({ limit: 10, search });
  const prefetchBreed = usePrefetchBreed();
  const router = useRouter();

  const handleMouseEnter = useCallback(
    (breedId: string, petType: PetType = PetType.DOGS) => {
      setHoveredBreed({ id: breedId, petType });
    },
    [],
  );

  useEffect(() => {
    if (debouncedHoveredBreed) {
      prefetchBreed(debouncedHoveredBreed.id, debouncedHoveredBreed.petType);
    }
  }, [debouncedHoveredBreed, prefetchBreed]);

  const handleClick = useCallback(
    (breedId: string, petType: PetType = PetType.DOGS) => {
      router.push(`/breed/${breedId}?type=${petType}`);
    },
    [router],
  );

  const handleSearch = useCallback((searchTerm: string) => {
    setSearch(searchTerm);
  }, []);

  return (
    <div className="space-y-6">
      <SearchInput onSearch={handleSearch} />
      {!isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {breeds.map((breed) => (
            <BreedCard
              key={`${breed.petType}-${breed.id}`}
              data={breed}
              onMouseEnter={(id) => handleMouseEnter(String(id), breed.petType)}
              onClick={(id) => handleClick(String(id), breed.petType)}
            />
          ))}
        </div>
      ) : (
        <Loading />
      )}
      {!search && (
        <div ref={observerRef} className="text-center py-4">
          {isFetchingNextPage && (
            <div className="flex flex-col items-center space-y-2">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 text-sm">Loading more breeds...</p>
            </div>
          )}
          {!hasNextPage && breeds.length > 0 && (
            <p className="text-gray-500 text-sm">
              You&apos;ve reached the end of the list
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Breeds;
