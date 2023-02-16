import { create } from 'zustand'

export const useDataStore = create((set) => ({
  data: [],
  setData: (data) => set(() => ({ data: data })),
}))