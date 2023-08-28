import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
const initialState = {
  status: "idle",
  createToDo: {
    status: "idle",
    todolist: null,
  },
  getTodo: {
    status: "idle",
    alltodolist: null,
  },
  deleteTodo: {
    status: "idle",
    deletetodo: null,
  },
  editTodos: {
    status: "idle",
    edittodo: null,
  },
};

// todolist post request
export const createToDoList = createAsyncThunk(
  "createToDoList",
  async (todolist) => {
    const response = await axios.post("/create", todolist);

    return response.data;
  }
);

export const getToDoList = createAsyncThunk("getToDoList", async () => {
  const response = await axios.get("/todo");
  return response.data;
});
export const deleteToDoList = createAsyncThunk(
  "deleteToDoList",
  async (todo) => {
    const response = await axios.delete(`/delete/${todo}`);
    return response.data;
  }
);

export const editToDoList = createAsyncThunk(
  "editToDoList",
  async (todolist) => {
    

    const response = await axios.put(`/update/${todolist.id}`, {
      todolist: todolist.todolist,
    });

    return response.data;
  }
);

export const listSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.editTodos.status = "idle";
      state.editTodos.edittodo = null;

		}
  },
  extraReducers: (builder) => {
    // craetetodolist case
    builder
      .addCase(createToDoList.pending, (state) => {
        state.status = "loading";
        state.createToDo.status = "loading";
      })
      .addCase(createToDoList.fulfilled, (state, { payload }) => {
        state.status = "successful";

        state.createToDo.status = "successful";
        state.todolist = payload;
      });
    // get all to do list
    builder
      .addCase(getToDoList.pending, (state) => {
        state.status = "loading";

        state.getTodo.status = "loading";
      })
      .addCase(getToDoList.fulfilled, (state, { payload }) => {
        state.status = "successful";

        state.getTodo.status = "successful";
        state.getTodo.alltodolist = payload;
      });
    //delete a todo by a passing the id
    builder
      .addCase(deleteToDoList.pending, (state) => {
        state.status = "loading";

        state.deleteTodo.status = "loading";
      })
      .addCase(deleteToDoList.fulfilled, (state, { payload }) => {
        state.status = "successful";

        state.deleteTodo.status = "successful";
        state.deleteTodo.deletetodo = payload;
      });
      //update todo list
    builder
      .addCase(editToDoList.pending, (state) => {
        state.status = "loading";

        state.getTodo.status = "loading";
      })
      .addCase(editToDoList.fulfilled, (state, { payload }) => {
        state.status = "successful";

        state.editTodos.status = "successful";
        state.editTodos.edittodo = payload;
      });
  },
});
export const { resetStatus } =
listSlice.actions
export default listSlice.reducer;
