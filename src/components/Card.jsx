import { useState, useEffect } from 'react'
import Task from './Task'
import propTypes from 'prop-types'
import useLocalStorage from '../hooks/useLocalStorage'

const Card = ({ tasks, setTasks }) => {

  const { clearTasks, countTasks } = useLocalStorage()
  const [ filterText, setFilterText ] = useState('')
  const [ filteredTasks, setFilteredTasks ] = useState(tasks)

  const handleSearch = (e) => {
    const text = e.target.value
    setFilterText(text)
  }

  const handleClear = () => {
    clearTasks(setTasks)
  }

  useEffect(() => {
    setFilteredTasks(tasks.filter(task => task.title.toLowerCase().includes(filterText.toLowerCase())))

    if (filteredTasks.length === 0) {
      setTimeout(() => {
        setFilterText('')
      }, 600)
    }

  }, [filteredTasks.length, filterText, tasks])
  
  return (
    <div className='bg-gray-700 mt-4 rounded-md min-h-[70vh] max-w-md'>
      <div className="flex justify-center gap-2 items-center pb-4 pt-2 flex-wrap">
        <h2 className='text-center text-2xl font-bold p-2'>{`${filteredTasks.length}`} Tasks</h2>
        <p>
          {
             <span className='flex gap-4 justify-center font-bold'>
               <span className='text-green-500'>{`${countTasks(tasks).completed}`} completed</span>
               <span className='text-yellow-500'>{`${countTasks(tasks).remaining}`} remaining</span>
             </span>
          }
        </p>
      </div>
      <div className='flex justify-center p-2'>
        <input type="text" placeholder='Search...' value={filterText} className='w-60 text-black dark:text-white p-2 rounded-md' onChange={handleSearch} />
        <button className='bg-red-500 text-white px-4 py-2 rounded-md ml-2' onClick={handleClear}>Clear</button>
      </div>
      <ul className='flex flex-col gap-2 p-2'>
        {
          filteredTasks ? filteredTasks.map((task) => {
            return (
              <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
            )
          }) : null
        }

        {
          filteredTasks.length === 0 ? <p className='text-center text-gray-400 pt-24 text-lg'>No TODOS found</p> : null 
        }
      </ul>
    </div>
    )
}

Card.propTypes = {
  tasks: propTypes.array.isRequired,
  setTasks: propTypes.func.isRequired
}

export default Card