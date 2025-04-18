import { useEffect, useRef, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  const [isPending, setIsPending] = useState(false);
  const skipNext = useRef(false);

  const skipNextUpdate = () => {
    skipNext.current = true;
  };

  useEffect(() => {
    if (skipNext.current) {
      skipNext.current = false;
      return;
    }

    setIsPending(true);

    const handler = setTimeout(() => {
      setDebounced(value);
      setIsPending(false);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return [debounced, skipNextUpdate, isPending] as const;
}
