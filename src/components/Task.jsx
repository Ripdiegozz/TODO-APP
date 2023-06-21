import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const Task = ({ task, tasks, setTasks }) => {

  const { id, title, done } = task

  const [styleText, setStyleText] = useState('w-48 text-left pl-2 text-xl')
  const [styleCard, setStyleCard] = useState('p-2 border-2 border-gray-600 rounded-md flex justify-between')

  const { completeTask, deleteTask } = useLocalStorage()

  const handleComplete = () => {
    completeTask(id, tasks, setTasks)
  }

  const handleDelete = () => {
    deleteTask(id, tasks, setTasks)
  }

  useEffect(() => {
    if (done) {
      setStyleText('w-48 text-left pl-2 line-through text-xl')
      setStyleCard('p-2 border-2 border-gray-600 rounded-md flex justify-between bg-gray-500')
    } else {
      setStyleText('w-48 text-left pl-2 text-xl')
      setStyleCard('p-2 border-2 border-gray-600 rounded-md flex justify-between')
    }
  }, [done])

  return (
    <li className={styleCard}>
      <p className={styleText}>{title}</p>
      <div className='flex gap-3 mr-4'>
        <input type='checkbox' className='scale-125' checked={done} onChange={handleComplete} disabled={done} />
        <button className='hover:text-red-500 transition-colors' onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
      </div>
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired
}

export default Task