import { useState } from "react"
import swal from 'sweetalert';
import propTypes from 'prop-types'
import useLocalStorage from "../hooks/useLocalStorage"

const TaskForm = ({ setTasks, tasks }) => {
  const [ text, setText ] = useState('')
  const { addTask } = useLocalStorage()

  const handleChange =   (e) => {
    e.preventDefault()
    setText(e.target.value)
  }

  const handleAddTask = () => {
    const newText = text

    if (newText === '') {
      swal("Campo vacío", "No puedes ingresar una tarea vacía", "error");
      return
    }

    addTask(newText, tasks, setTasks)

    setText('')
  }

  return (
    <div>
      <form className='flex gap-2 justify-center'>
        <input type='text' placeholder='New task...' className='p-2 text-black dark:text-white rounded-md w-80' value={text} onChange={handleChange}/>
        <button onClick={handleAddTask} type='button' className='py-2 px-4 text-md font-bold rounded-md bg-black'>Add Task</button>
      </form>
    </div>
  )
}

TaskForm.propTypes = {
  setTasks: propTypes.func.isRequired,
  tasks: propTypes.array.isRequired
}

export default TaskForm