import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type QueryParams = Record<string, string | undefined>;

/**
 * Custom hook that returns a function to update the query string in the URL.
 *
 * @returns A function that accepts `params` and `deleteKeys` as arguments and updates the query string in the URL accordingly.
 * @param params - An object representing the new query parameters to be added or updated.
 * @param deleteKeys - An optional array of keys representing the query parameters to be deleted.
 */
function useUpdateQueryString(): (
  params: QueryParams,
  deleteKeys?: string[],
) => void {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Updates the query string of the current URL and navigates to the updated URL.
   *
   * @param params - The new query parameters to be added or updated.
   * @param deleteKeys - The keys of query parameters to be deleted.
   */
  const updateFn = useCallback(
    (params: QueryParams, deleteKeys: string[] = []) => {
      // Convert existing search params to an object
      const currentParams: QueryParams = {};
      // @ts-ignore
      for (const [key, value] of searchParams.entries()) {
        currentParams[key] = value;
      }

      // Merge with new params
      const updatedParams = { ...currentParams, ...params };

      // Delete specified keys
      deleteKeys.forEach((key) => {
        delete updatedParams[key];
      });

      const updatedQueryString = createQueryString(updatedParams);

      router.push(`${pathname}?${updatedQueryString}`, {
        scroll: false,
      });
    },
    [searchParams],
  );

  return updateFn;
}

export default useUpdateQueryString;

/**
 * Creates a query string based on the provided parameters.
 *
 * @param params - The parameters to include in the query string.
 * @param currentSearchParams - The current search parameters to initialize the query string with.
 * @returns The string representation of the updated query string.
 */
export function createQueryString(
  params: Record<string, string | undefined>,
  currentSearchParams?: URLSearchParams,
): string {
  const newSearchParams = new URLSearchParams(
    currentSearchParams?.toString() ?? '',
  );

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || value === '') {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, String(value));
    }
  }

  return newSearchParams.toString();
}
