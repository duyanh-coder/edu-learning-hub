/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string;
  readonly VITE_APP_VERSION?: string;
  readonly VITE_INSTITUTION_NAME?: string;
  readonly VITE_INSTITUTION_SHORT_NAME?: string;
  readonly VITE_INSTITUTION_LOGO_URL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_DATA_PROVIDER?: string;
  readonly VITE_GOOGLE_SHEET_URL?: string;
  readonly VITE_GOOGLE_SHEET_ID?: string;
  readonly VITE_PRIMARY_COLOR?: string;
  readonly VITE_SECONDARY_COLOR?: string;
  readonly VITE_GOOGLE_DRIVE_ENABLED?: string;
  readonly VITE_FEATURE_RECORDINGS?: string;
  readonly VITE_FEATURE_DOCUMENTS?: string;
  readonly VITE_FEATURE_ASSIGNMENTS?: string;
  readonly VITE_FEATURE_SCHEDULE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
