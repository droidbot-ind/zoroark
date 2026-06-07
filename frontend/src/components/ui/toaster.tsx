import * as React from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastProps,
} from "./toast";
import { create } from "zustand";

interface ToastItem extends ToastProps {
  id: string;
  title?: string;
  description?: string;
}

interface ToastStore {
  toasts: ToastItem[];
  add: (t: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
}

const uid = () =>
  typeof crypto?.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  add: (t) =>
    set((s) => ({
      toasts: [...s.toasts, { ...t, id: uid() }],
    })),
  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export const toast = (t: Omit<ToastItem, "id">) => useToastStore.getState().add(t);

export const Toaster: React.FC = () => {
  const { toasts, dismiss } = useToastStore();
  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(({ id, title, description, ...props }) => (
        <Toast key={id} onOpenChange={(open) => !open && dismiss(id)} {...props}>
          <div className="grid gap-1">
            {title ? <ToastTitle>{title}</ToastTitle> : null}
            {description ? <ToastDescription>{description}</ToastDescription> : null}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
};
