import { create } from 'zustand';

const usePageStore = create<IPageState>(set => ({
  listLength: 0,
  pageLength: 0,
  currentpage: 1,
  pagesize: 10,
  pageArray: [],
  increasePage: () =>
    set(state => {
      if (state.currentpage < state.pageLength) {
        return { currentpage: state.currentpage + 1 };
      }
      return state;
    }),
  decreasePage: () =>
    set(state => {
      if (state.currentpage > 1) {
        return { currentpage: state.currentpage - 1 };
      }
      return state;
    }),
  goFirstPage: () => set({ currentpage: 1 }),
  goLastPage: () => set(state => ({ currentpage: state.pageLength })),
  clickPage: (value: number) => set({ currentpage: value }),
  generatePageNumbers: () =>
    set(state => {
      const pageRange = 2;
      let startPage = Math.max(1, state.currentpage - pageRange);
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
  currentpage: number;
  pagesize: number;
  pageArray: number[];
  increasePage: () => void;
  decreasePage: () => void;
  goFirstPage: () => void;
  goLastPage: () => void;
  clickPage: (value: number) => void;
  generatePageNumbers: () => void;
}

export default usePageStore;
