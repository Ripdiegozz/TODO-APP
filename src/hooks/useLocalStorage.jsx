import { nanoid } from 'nanoid'

const useLocalStorage = () => {

    const addTask = (text, tasks, setTasks) => {
        const newTask = {
            id: nanoid(),
            title: text,
            done: false
        }

        const newTasks = [...tasks, newTask]

        setTasks(newTasks)
        window.localStorage.setItem('tasks', JSON.stringify(newTasks))
    }
    
    const completeTask = (id, tasks, setTasks) => {
        const newTasks = tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    done: !task.done
                }
            }

            return task
        })

        setTasks(newTasks)
        window.localStorage.setItem('tasks', JSON.stringify(newTasks))
    }

    const deleteTask = (id, tasks, setTasks) => {
        const newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks)
        window.localStorage.setItem('tasks', JSON.stringify(newTasks))
    }

    const clearTasks = (setTasks) => {
        setTasks([])
        window.localStorage.setItem('tasks', JSON.stringify([]))
    }

    const countTasks = (tasks) => {
        const completed = tasks.filter(task => task.done === true)
        const remaining = tasks.filter(task => task.done === false)
        
        return {
            completed: completed.length,
            remaining: remaining.length
        }
    }

    return { addTask, completeTask, deleteTask, clearTasks, countTasks }
}

export default useLocalStorage