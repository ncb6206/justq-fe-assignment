import { create } from 'zustand';

const usePageStore = create<IPageState>(set => ({
  listLength: 0,
  pageLength: 0,
  currentPage: 1,
  pageSize: 10,
  pageArray: [],
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
  goFirstPage: () => set({ currentPage: 1 }),
  goLastPage: () => set(state => ({ currentPage: state.pageLength })),
  clickPage: (value: number) => set({ currentPage: value }),
  generatePageNumbers: () =>
    set(state => {
      const pageRange = 2;
      let startPage = Math.max(1, state.currentPage - pageRange);
      let endPage = startPage + pageRange * 2;

      if (endPage > state.pageLength) {
        endPage = state.pageLength;
        startPage = Math.max(1, state.pageLength - pageRange * 2);
      }

      const pageNumbers = [];

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      return { pageArray: pageNumbers };
    }),
}));

interface IPageState {
  listLength: number;
  pageLength: number;
  currentPage: number;
  pageSize: number;
  pageArray: number[];
  increasePage: () => void;
  decreasePage: () => void;
  goFirstPage: () => void;
  goLastPage: () => void;
  clickPage: (value: number) => void;
  generatePageNumbers: () => void;
}

export default usePageStore;
