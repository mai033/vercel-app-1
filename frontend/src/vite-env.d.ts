/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REACT_APP_BUCKET_NAME: string;
    readonly VITE_REACT_APP_BUCKET_REGION: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  