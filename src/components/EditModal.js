import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetStatus } from "../store/slice/listSlice";

const EditModal = ({ openEdit, setopenEdit, editTodo, editToDoList }) => {
  const dispatch = useDispatch();
  const [todolistData, settodolistData] = useState(editTodo);
  const { editTodos } = useSelector((state) => state.list);
  const closeModal = () => {
    setopenEdit(false);
  };
  const id = todolistData.id;
  const todolist = todolistData.todolist;
  console.log(todolist);
  console.log(id);
  const submit = () => {
    const todolist = todolistData.todolist;
    dispatch(editToDoList(todolistData));
    if (editTodos.status === "successful") {
      dispatch(resetStatus());
      setopenEdit(false);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // If the Enter key is pressed, trigger the request
      submit();
    }
  };

  const handleChange = (key, newValue) => {
    settodolistData((prevObject) => ({
      ...prevObject,
      [key]: newValue,
    }));
  };

  console.log(todolistData);
  return (
    <div
      className={
        " fixed overflow-y-auto z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (openEdit
          ? " transition-opacity flex justify-center opacity-100 duration-500 translate-x  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="flex absolute  items-en justify-center h-fit items-center my-40  pt-4 px-4 pb-20 text-center  sm:p-0 ">
        <div className="inline-block align-bottom bg-white   rounded-2xl text-left shadow-xl transform transition-all sm:my-8 sm:align-middle h-auto max-w-xl md:max-w-3xl w-screen">
          <div className=" py-20 px-12 w-full">
            <textarea
              onKeyPress={handleKeyPress}
              value={todolistData.todolist}
              type="text"
              onChange={(e) => handleChange("todolist", e.target.value)}
              className="outline-none w-full h-fit"
            />
            <button className="hidden" onClick={submit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <section
        className=" w-screen z-[-1] h-screen cursor-pointer "
        onClick={() => {
          setopenEdit(false);
        }}
      ></section>
    </div>
  );
};

export default EditModal;
