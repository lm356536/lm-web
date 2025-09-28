/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly BASE_URL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly MODE: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
