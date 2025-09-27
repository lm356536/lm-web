declare module 'rimraf' {
  export function rimraf(
    path: string,
    options?: {
      maxRetries?: number;
      retryDelay?: number;
      glob?: boolean;
      disableGlob?: boolean;
      preserveRoot?: boolean;
    },
  ): Promise<void>;
}
