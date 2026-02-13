import { create } from 'zustand';

export const MODAL_TYPE = {
  CARDMORE: 'CARDMORE',
} as const;

export type ModalKey = keyof typeof MODAL_TYPE;
export type ModalType = ModalKey | null;

interface ModalStore {
  type: ModalType;
  props?: Record<string, unknown>;
  open: (type: ModalKey, props?: Record<string, unknown>) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>(set => ({
  type: null,
  props: undefined,
  open: (type, props) => set({ type, props }),
  close: () => set({ type: null, props: undefined }),
}));
