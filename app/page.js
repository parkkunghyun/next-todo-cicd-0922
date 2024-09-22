"use client"

import { useEffect, useState } from "react";
import Todo from "./components/page";


export default function Home() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  
  const getTodos = async () => {
    const all = await fetch('/api/todos')
    const data = await all.json()
    setTodos(data)
  }

  const handleAddTodo = async () => {
    if (!text) return
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({text: text})
    })

    console.log(response)
    if (response.ok) {
      const newTodo = await response.json()
      setTodos([...todos, newTodo])
      setText('')
    } else {
      console.error('Failed to add todo:', response.status);
    }
  }

  const handleToggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id)
    const response = await fetch('/api/todos', {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({id, text: todo.text, completed : !todo.completed})
    })

    if (response.ok) {
      const updatedTodo = await response.json()
      console.log(updatedTodo)
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)))
    } else {
      console.error('Failed to update todo:', response.status);
    }
  }

  const handleDeleteTodo = async (id) => {
    const response = await fetch('/api/todos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({id})
    })
    if (response.ok) {
      setTodos(todos.filter((todo) => todo.id !== id))
    } else {
      console.error('Failed to delete todo:', response.status);
    }
  }

  useEffect(() => {
    getTodos()
    console.log(todos)
  }, [])

  return (
    <div className="max-w-md mx-auto my-10 p-5 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-8">Todo App</h1>
      <div className="flex items-center justify-center mb-4">
        <input type="text" placeholder="할일을 입력해주세요" onChange={(e)=>setText(e.target.value)} value={text} className="p-2 flex-grow border" />
        <button onClick={handleAddTodo} className="bg-blue-500 text-white text-xl border rounded p-2 cursor-pointer" >+</button>
      </div>
      {
        todos.map((todo) => (
          <Todo key={todo.id} todo={todo} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
        ))
      }
    </div>
  );
}
