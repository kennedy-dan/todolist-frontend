import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { createToDoList } from '../store/slice/listSlice'


const ToDoList = () => {
    const dispatch = useDispatch()
    const [todolist, settodolist] =useState('')
    const submit = () => {
        console.log({"todolist":todolist})
        dispatch(createToDoList({todolist:todolist}))
    }
  return (
    <div>
        
    </div>
  )
}

export default ToDoList