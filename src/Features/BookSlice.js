import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    const key = "8KFTLXIAzMk4dUrhSB0Qi6Tmg4cbsq3N";

    if (!key) return rejectWithValue({ message: "Missing NYT API key" });

    const url = `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${key}`;
    try {
      const response = await axios.get(url);
      const lists = response.data?.results?.lists || [];

      const books = [];

      lists.forEach((list) => {
        (list.books || []).forEach((b) => {
          books.push({
            title: b.title || "",
            author: b.author || "",
            publisher: b.publisher || "",
            isbn13: b.primary_isbn13 || "",
            list_name: list.list_name || "",
            _id: `${b.primary_isbn13 || b.title}-${b.rank || ""}`,
            rank: b.rank || null,
          });
        });
      });
      return books;
    } catch (err) {
      if (err.response && err.response.data)
        return rejectWithValue(err.response.data);
      return rejectWithValue({ message: err.message || "Network error" });
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  sortBy: "title",
  order: "asc",
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers(builder){
     builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: action.error?.message };
      });
  }
});


export const { setSortBy, setOrder, clearError } = bookSlice.actions;
export default bookSlice.reducer;