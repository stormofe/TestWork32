type AsyncHandler<T> = () => Promise<T>;

export async function wrapAsync<T>(
  task: AsyncHandler<T>,
  {
    onStart,
    onSuccess,
    onError,
    onFinally,
  }: {
    onStart?: () => void;
    onSuccess?: (result: T) => void;
    onError?: (error: unknown) => void;
    onFinally?: () => void;
  }
): Promise<void> {
  try {
    onStart?.();
    const result = await task();
    onSuccess?.(result);
  } catch (error) {
    onError?.(error);
  } finally {
    onFinally?.();
  }
}
