import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createToDoList, getToDoList, deleteToDoList } from "../store/slice/listSlice";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
const ToDoList = () => {
  const dispatch = useDispatch();
  const [todolist, settodolist] = useState("");
  const [openEdit, setopenEdit] = useState(false);
  const { getTodo, createToDo, deleteTodo } = useSelector((state) => state.list);
  const submit = () => {
    console.log({ todolist: todolist });
    dispatch(createToDoList({ todolist: todolist }));
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // If the Enter key is pressed, trigger the request
      submit()
    }
  };
  function formatDate(inputDate) {
    // const inputDateString = "2023-08-27T14:47:52.944+00:00";
    const inputDateString = new Date(inputDate);
    console.log(inputDateString);
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
      inputDateString
    );
    return formattedDateTime;
  }
  const formattedDates = getTodo?.todos?.map((obj) => ({
    id: obj._id,
    todolist: obj.todolist,
    formattedDate: formatDate(obj.createdAt),
  }));

  const [todolistData, settodolistData] = useState(formattedDates);

  console.log(formattedDates);

  const handleChange = (index, newValue) => {
    const updatedItems = [...todolistData];
    updatedItems[index].todolist = newValue;
    settodolistData(updatedItems);
  };
  useEffect(() => {
    settodolistData(formattedDates);
  }, [getTodo]);

  useEffect(() => {
    dispatch(getToDoList());
  }, [dispatch, createToDo.status, deleteTodo.status]);
  console.log(todolistData);

  const delteTodo = (id) => {
    dispatch(deleteToDoList(id))
  }

  const openEditModal = () => {

  }

  return (
    <div>
      <div className="flex justify-around mx-8 font-[Poppins]">
        <div className="w-[10%]"></div>
        <div className="w-[70%]">
          <div className="flex justify-center ">
            <input
              value={todolist}
              onKeyPress={handleKeyPress}
              onChange={(e) => settodolist(e.target.value)}
              className="w-1/2  rounded-md shadow-lg outline-none outline-1 bg-slate-4 mt-1 py-2  tracking-[2px] leading-loose  text-black text-[13px] px-2 "
              placeholder="create new list"
            />
            <button className="hidden" onClick={submit}>Submit</button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {todolistData?.map((todos, index) => (
              <div className="rounded-md h-fit  w- outline-1 px-2 outline-gray-300 outline">
                <p>{todos.todolist}</p>
                {/* <div classNam></div> */}
                {/* <input
                  key={index}
                  value={todos.todolist}
                  type="text"
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="outline-none w-full h-fit"
                /> */}
                <div className="flex w-full items-center justify-between">
                <p className="pt-4 text-[12px] font-semibold">
                    {todos.formattedDate}
                  </p>
                    <button className="pt-4" onClick={() => delteTodo(todos.id)}>
                        <AiOutlineDelete />
                    </button>
                    <button className="pt-4" onClick={openEditModal}>
                        <AiOutlineEdit />
                    </button>
                
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
