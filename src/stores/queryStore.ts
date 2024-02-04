import { create } from 'zustand';

interface IQueryState {
  query: string;
  setQuery: (value: string) => void;
}

const useQueryStore = create<IQueryState>(set => ({
  query: '',
  setQuery: value => set({ query: value }),
}));

export default useQueryStore;
