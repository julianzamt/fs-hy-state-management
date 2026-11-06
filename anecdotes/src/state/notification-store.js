import { create } from "zustand";

let timeoutId;

const useNotificationStore = create((set) => ({
  notification: "",
  actions: {
    notify: (msg) => {
      clearTimeout(timeoutId);
      set({ notification: msg });
      timeoutId = setTimeout(() => set({ notification: "" }), 5000);
    },
  },
}));

export const useNotification = () =>
  useNotificationStore((state) => state.notification);

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
