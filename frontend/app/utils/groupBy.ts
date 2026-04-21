export function groupBy<T>(
  array: T[],
  key: keyof T
): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const value = String(item[key]);
    acc[value] ??= [];
    acc[value].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}
