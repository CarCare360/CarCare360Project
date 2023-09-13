import { create } from 'zustand'
import { persist } from "zustand/middleware";

const appStoreConfig = (set) => ({
    dopen: true,
    updateOpen: (dopen) => set((state) => ({ dopen: dopen })),
});

const persistedAppStore = persist(appStoreConfig, { name: "my_app_store" });
export const useAppStore = create(persistedAppStore);
