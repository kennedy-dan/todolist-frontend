import React, { useState } from "react";
import { useDispatch } from "react-redux";

const EditModal = ({ openEdit, setopenEdit, editTodo, editToDoList }) => {
  const dispatch = useDispatch();
  const [todolistData, settodolistData] = useState(editTodo);

  const closeModal = () => {
    setopenEdit(false);
  };
  const id = todolistData.id;
  const todolist = todolistData.todolist
  console.log(todolist)
  console.log(id)
  const submit = () => {
  const todolist = todolistData.todolist
    dispatch(editToDoList(todolistData ));
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
      <div className="flex absolute  items-en justify-center items-center my-40 h-screen pt-4 px-4 pb-20 text-center  sm:p-0 ">
        <div className="inline-block align-bottom bg-white   rounded-2xl text-left shadow-xl transform transition-all sm:my-8 sm:align-middle h-auto max-w-3xl w-screen">
          <div className=" py-20 px-12 w-full">
            <div className="flex w-full justify-end">
              <img
                src="/images/cancelModal.png"
                className="w-8"
                onClick={closeModal}
              />
            </div>
            <input
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
    </div>
  );
};

export default EditModal;
