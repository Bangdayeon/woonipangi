export type ToastType = 'success' | 'error' | 'warn';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface ShowToastArgs {
  message: string;
  type?: ToastType;
  duration?: number;
}

export interface CloseToastArgs {
  id: number;
}
