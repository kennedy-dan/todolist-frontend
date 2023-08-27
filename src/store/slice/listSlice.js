import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
const initialState = {
    createToDo : {
      status: 'idle',
      todolist: null
    },
    getTodo: {
      status: 'idle',
      alltodolist: null
    }
};

// todolist post request
export const createToDoList = createAsyncThunk(
  "createToDoList",
  async (todolist) => {
    const response = await axios.post("/create", todolist);
    return response.data;
  }
)

export const getToDoList = createAsyncThunk(
  "getToDoList",
  async () => {
    const response = await axios.get("/todo");
    return response.data;
  }
)

export const listSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // craetetodolist case
    builder
      .addCase(createToDoList.pending, (state) => {
        state.createToDo.status = "loading";
      })
      .addCase(createToDoList.fulfilled, (state, { payload }) => {
        state.createToDo.status = "successful";
        state.todolist = payload;
      });
    // get all to do list
    builder
      .addCase(getToDoList.pending, (state) => {
        state.getTodo.status = "loading";
      })
      .addCase(getToDoList.fulfilled, (state, { payload }) => {
        state.getTodo.status = "successful";
        state.getTodo = payload;
      });
  },
});

export default listSlice.reducer;
