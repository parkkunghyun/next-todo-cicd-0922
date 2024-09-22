"use client"

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export default function Todo({ todo, onToggle, onDelete }) {
    if (!todo) {
        return null; // todo가 없을 경우 아무것도 렌더링하지 않음
    }
    return (
        <div className="flex items-center ">
            <input className="mr-2" type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
            <p className={`${todo.completed ? 'line-through text-gray-500 text-xl font-bold flex-grow' : 'text-xl font-bold flex-grow'}`}>{todo.text}</p>
            <div className="flex items-center justify-between gap-4">
                {/* <button onClick={() => onToggle(todo)} className="text-2xl font-bold"><FaEdit className="" /></button> */}
                <button onClick={() => onDelete(todo.id)} className="text-2xl font-bold"><MdDeleteForever className=""/></button>
            </div>
        </div>
    )
}