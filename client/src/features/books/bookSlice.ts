import axios from "axios";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../../app/store';
import { RootState } from '../../app/rootReducer';

export interface BookState {
    books: Array<Book>;
    isLoading: boolean;
    error: BooksError;
}

export interface Book {
    id: number;
    name: string,
    author: string,
    genre: string,
    price: string,
    image: string,
    description: string
}

export interface BooksError {
    message: string;
}

const initialState: BookState = {
    books: [],
    isLoading: false,
    error: {
        message: ''
    }
}

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        assignBooks: (state, action: PayloadAction<Array<Book>>) => {
            state.books = action.payload;
        },
        addBook: (state, action: PayloadAction<Book>) => {
          state.books.push(action.payload);   
        },
        updateBook: (state, action: PayloadAction<Book>) => {
            console.log("triggered updateBook in reducer")
            const index = state.books.findIndex(book => book.name === action.payload.name);
            state.books[index] = action.payload;
        },
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
        state.isLoading = payload;
        },
        setBooksSuccess: (state, { payload }: PayloadAction<Array<Book>>) => {
        state.books = payload;
        },
        setBooksFailed: (state, { payload }: PayloadAction<BooksError>) => {
        state.error = payload;
        },
    }
});

export const { setBooksSuccess, setBooksFailed, setLoading, assignBooks, addBook, updateBook } = bookSlice.actions;

export const getBooks = (): AppThunk => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get("/books");
      // dispatch(setBooksSuccess(res.data.data));
      dispatch(assignBooks(res.data.data));
    } catch (error) {
      dispatch(setBooksFailed({ message: "An Error occurred" }));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
export const bookSelector = (state: RootState) => state.books;

export default bookSlice.reducer