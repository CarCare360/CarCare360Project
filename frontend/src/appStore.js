import create from "zustand";
import { persist } from "zustand/middleware";

const appStore = (set)=>({
    dopen: true,
    updateOpen: (dopen) => set((state) => ({ dopen: dopen })),
});

appStore = persist(appStore, { name: "my_app_store" });
export const useAppStore = create(appStore);