import { create } from 'zustand';

interface IPageState {
  listLength: number;
  pageLength: number;
  currentPage: number;
  pageSize: number;
  increasePage: () => void;
  decreasePage: () => void;
  clickPage: (value: number) => void;
}

const usePageStore = create<IPageState>(set => ({
  listLength: 0,
  pageLength: 0,
  currentPage: 0,
  pageSize: 0,
  increasePage: () =>
    set(state => {
      if (state.currentPage < state.pageLength) {
        return { currentPage: state.currentPage + 1 };
      }
      return state;
    }),
  decreasePage: () =>
    set(state => {
      if (state.currentPage > 1) {
        return { currentPage: state.currentPage - 1 };
      }
      return state;
    }),
  clickPage: (value: number) => set({ currentPage: value }),
}));

export default usePageStore;
