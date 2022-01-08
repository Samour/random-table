type IdExtractor<T, K> = (item: T) => K;

export const updateListItem = <T, K>(idExtractor: IdExtractor<T, K>) =>
  (list: T[]) => (itemId: K, update: Partial<T>): T[] =>
    list.map((item) => idExtractor(item) === itemId ? {
      ...item,
      ...update,
    } : item);
