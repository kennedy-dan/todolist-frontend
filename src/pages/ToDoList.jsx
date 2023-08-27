import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createToDoList, getToDoList } from "../store/slice/listSlice";

const ToDoList = () => {
  const dispatch = useDispatch();
  const [todolist, settodolist] = useState("");
  const submit = () => {
    console.log({ todolist: todolist });
    dispatch(createToDoList({ todolist: todolist }));
  };

  useEffect(() => {
    dispatch(getToDoList())
  }, [])
  
  return (
    <div>
      <div className="flex">
        <div className="w-[10%]"></div>
        <div className="w-[90%]">
          <div className='flex justify-center '>
            <input
              className="w-1/2  rounded-md shadow-lg outline-none outline-1 bg-slate-4 mt-1 py-2  tracking-[2px] leading-loose  text-black text-[13px] px-2 "
              placeholder="create new list"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
