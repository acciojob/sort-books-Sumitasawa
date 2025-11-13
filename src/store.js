import {configureStore} from "@reduxjs/toolkit"
import booksReducer from "./Features/BookSlice";
const store=configureStore({
    reducer:{
          books: booksReducer,
    }
})

export default store;