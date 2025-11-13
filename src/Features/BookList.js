// src/features/books/BooksList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setSortBy, setOrder, clearError } from './BookSlice';
import { selectSortedBooks, selectLoading, selectError } from './bookSelector';

export default function BooksList() {
  const dispatch = useDispatch();
  const books = useSelector(selectSortedBooks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const sortBy = useSelector((s) => s.books.sortBy);
  const order = useSelector((s) => s.books.order);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: 1100, margin: '1.5rem auto', padding: '1rem' }}>
      <h1>Book Sorting App</h1>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))} style={{ marginLeft: 8 }}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>
        </label>

        <label>
          Order:
          <select value={order} onChange={(e) => dispatch(setOrder(e.target.value))} style={{ marginLeft: 8 }}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>

        <button onClick={() => dispatch(fetchBooks())} style={{ marginLeft: 'auto' }}>
          Refresh
        </button>
      </div>

      {loading && <div>Loading books…</div>}

      {error && (
        <div style={{ background: '#fee', border: '1px solid #f88', padding: 12 }}>
          <div><strong>Error:</strong></div>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(error)}</pre>
          <button onClick={() => dispatch(clearError())}>Dismiss</button>
        </div>
      )}

      <div style={{ overflowX: 'auto', marginTop: 12 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f5f5f5' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: 8 }}>Title</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Author</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Publisher</th>
              <th style={{ textAlign: 'left', padding: 8 }}>ISBN-13</th>
              <th style={{ textAlign: 'left', padding: 8 }}>List</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 && !loading ? (
              <tr><td colSpan={5} style={{ padding: 12 }}>No books found.</td></tr>
            ) : (
              books.map((b) => (
                <tr key={b._id} style={{ borderTop: '1px solid #eee' }}>
                  <td style={{ padding: 8 }}>{b.title}</td>
                  <td style={{ padding: 8 }}>{b.author}</td>
                  <td style={{ padding: 8 }}>{b.publisher}</td>
                  <td style={{ padding: 8 }}>{b.isbn13}</td>
                  <td style={{ padding: 8 }}>{b.list_name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
