import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createToDoList,
  getToDoList,
  deleteToDoList,
  editToDoList,
} from "../store/slice/listSlice";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import EditModal from "../components/EditModal";
import { ClipLoader } from "react-spinners";

const ToDoList = () => {
  const dispatch = useDispatch();
  const [todolist, settodolist] = useState("");
  const [openEdit, setopenEdit] = useState(false);
  const [editTodo, seteditTodo] = useState();
  const { getTodo, createToDo, deleteTodo, editTodos, status } = useSelector(
    (state) => state.list
  );
  const submit = () => {
  
    dispatch(createToDoList({ todolist: todolist }));
    settodolist('')
  };
  //use enter keywor to send request
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // If the Enter key is pressed, trigger the request
      submit();
    }
  };

  //pass the date from the database to the function
  function formatDate(inputDate) {
    
    const inputDateString = new Date(inputDate);
    //set data options to 2 digits
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    //formatt date
    const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
      inputDateString
    );
    return formattedDateTime;
  }


  const formattedDates = getTodo?.alltodolist?.todos?.map((obj) => ({
    id: obj._id,
    todolist: obj.todolist,
    formattedDate: formatDate(obj.createdAt),
  }));

  const [todolistData, settodolistData] = useState(formattedDates);

  console.log(formattedDates);

  useEffect(() => {
    settodolistData(formattedDates);
  }, [getTodo]);

  //dispatch gettodos if there is a change in status
  useEffect(() => {
    dispatch(getToDoList());
  }, [dispatch, createToDo.status, deleteTodo.status, editTodos.status]);
 

  const delteTodo = (id) => {
    dispatch(deleteToDoList(id));
  };

  const openEditModal = (todos) => {
    setopenEdit(true);
    seteditTodo(todos);
  };
 

  return (
    <div>
      <div className="flex justify-around md:mx-8 mx-3  font-[Poppins]">
        <div className="md:w-[10%] border-r-2 h-screen hidden lg:block border-gray-500">
            <p className="mt-10">My Todo</p>
        </div>
        <div className="lg:w-[70%] md:w-[90%] w-[100%] mt-10">
          <div className="flex justify-center ">
            <input
              value={todolist}
              onKeyPress={handleKeyPress}
              onChange={(e) => settodolist(e.target.value)}
              className="w-1/2  rounded-md shadow-lg outline-none outline-1 bg-slate-4 mt-1 py-2  tracking-[2px] leading-loose  text-black text-[13px] px-2 "
              placeholder="create new list"
            />
            <button className="hidden" onClick={submit}>
              Submit
            </button>
          </div>
          {status === "loading" && (
            <div className='flex mt-10 justify-center'>
              <ClipLoader />
            </div>
          )}
          {status === "successful" && (
            <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mt-8">
              {todolistData?.map((todos, index) => (
                <div className="rounded-md h-fit shadow-sm  w- outline-1 px-2 outline-gray-300 outline">
                  <p>{todos.todolist}</p>
                  <div className="flex w-full items-center justify-between">
                    <p className="pt-4 md:text-[12px] text-[10px] font-semibold">
                      {todos.formattedDate}
                    </p>
                    <div>
                      <button
                        className="pt-4"
                        onClick={() => delteTodo(todos.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                      <button
                        className="pt-4"
                        onClick={() => openEditModal(todos)}
                      >
                        <AiOutlineEdit />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
         {/* open edit  modal */}
        {openEdit ? (
          <EditModal
            openEdit={openEdit}
            setopenEdit={setopenEdit}
            editTodo={editTodo}
            editToDoList={editToDoList}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ToDoList;
