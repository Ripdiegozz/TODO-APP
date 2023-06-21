/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import TaskForm from './components/TaskForm'

function App() {
  const [ tasks, setTasks ] = useState(() => {
    const tasksFromLocalStorage = localStorage.getItem('tasks')

    if (tasksFromLocalStorage) {
      return JSON.parse(tasksFromLocalStorage)
    }

    return []
  })

  return (
    <main className='flex flex-col justify-center mx-auto max-w-md p-2 pt-10'>
      <h1 className='font-bold text-5xl mb-14 text-center'>TaskQ</h1>
      <TaskForm setTasks={setTasks} tasks={tasks}/>
      <Card tasks={tasks} setTasks={setTasks}/>
    </main>
  )
}

export default App
