export function isNullable(value: unknown): value is null | undefined {
  return value === null || value === undefined; //We use strict equality (===) to compare with null and undefined.
}

export function isNotNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}
