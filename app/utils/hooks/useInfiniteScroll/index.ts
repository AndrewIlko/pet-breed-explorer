import { useCallback, useEffect, useRef } from 'react';
import { useInfiniteBreeds } from '../useBreeds';
import { IUseInfiniteScrollProps } from './types';

export const useInfiniteScroll = ({
  limit = 10,
  threshold = 0.1,
  search = '',
}: IUseInfiniteScrollProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteBreeds(limit, search);

  const observerRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (search) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          handleLoadMore();
        }
      },
      { threshold },
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleLoadMore, hasNextPage, isFetchingNextPage, threshold, search]);

  const allBreeds = data?.pages.flatMap((page) => page.data) || [];

  return {
    breeds: allBreeds,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    observerRef,
    refetch,
  };
};
