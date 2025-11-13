
import { createSelector } from '@reduxjs/toolkit';

const booksState = (state) => state.books;

export const selectSortBy = createSelector(booksState, (s) => s.sortBy);
export const selectOrder = createSelector(booksState, (s) => s.order);
export const selectLoading = createSelector(booksState, (s) => s.loading);
export const selectError = createSelector(booksState, (s) => s.error);

// returns sorted copy of items
export const selectSortedBooks = createSelector(
  [booksState],
  (s) => {
    const items = s.items || [];
    const sortBy = s.sortBy || 'title';
    const order = s.order || 'asc';
    const keyMap = { title: 'title', author: 'author', publisher: 'publisher' };
    const key = keyMap[sortBy] || 'title';

    const copy = [...items];
    copy.sort((a, b) => {
      const A = (a[key] || '').toString().toLowerCase();
      const B = (b[key] || '').toString().toLowerCase();
      if (A < B) return order === 'asc' ? -1 : 1;
      if (A > B) return order === 'asc' ? 1 : -1;
      return 0;
    });

    return copy;
  }
);
