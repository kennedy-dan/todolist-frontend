import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
const initialState = {
    createToDo : {
      status: 'idle',
      todolist: null
    }
};


export const createToDoList = createAsyncThunk(
  "createToDoList",
  async (todolist) => {
    const response = await axios.post("/create", todolist);
    console.log(response)
    return response.data;
  }
)
export const listSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createToDoList.pending, (state) => {
        state.createToDo.status = "loading";
      })
      .addCase(createToDoList.fulfilled, (state, { payload }) => {
        state.createToDo.status = "successful";
        state.todolist = payload;
      });
    // builder

  },
});

export default listSlice.reducer;
