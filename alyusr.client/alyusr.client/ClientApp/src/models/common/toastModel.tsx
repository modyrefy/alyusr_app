export interface ToastModel {
  show: boolean;
  Header?: string | null;
  body?: string | null;
  variant?: string | null;
  delayDuration?: number | null;
}
