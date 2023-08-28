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
    },
    deleteTodo: {
      status: 'idle',
      deletetodo: null
    },
    editTodos: {
      status: 'idle',
      edittodo: null
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
export const deleteToDoList = createAsyncThunk(
  "deleteToDoList",
  async (todo) => {
    const response = await axios.delete(`/delete/${todo}`);
    return response.data;
  }
)

export const editToDoList = createAsyncThunk(
  "editToDoList",
  async (todolist ) => {
    console.log(todolist.todolist)
    
    const response = await axios.put(`/update/${todolist.id}`, {todolist:todolist.todolist});
   
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
      //delete a todo by a passing the id
      builder
      .addCase(deleteToDoList.pending, (state) => {
        state.getTodo.status = "loading";
      })
      .addCase(deleteToDoList.fulfilled, (state, { payload }) => {
        state.deleteTodo.status = "successful";
        state.deleteTodo.deletetodo = payload;
      });
      builder
      .addCase(editToDoList.pending, (state) => {
        state.getTodo.status = "loading";
      })
      .addCase(editToDoList.fulfilled, (state, { payload }) => {
        state.editTodos.status = "successful";
        state.editTodos.edittodo = payload;
      });
  },
});

export default listSlice.reducer;
