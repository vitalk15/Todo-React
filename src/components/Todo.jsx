import { useState, useEffect } from 'react'
import AddTaskForm from './AddTaskForm'
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from './TodoInfo'
import TodoList from './TodoList'

const Todo = () => {
	const [tasks, setTasks] = useState(() => {
		const savedTasks = localStorage.getItem('tasks')
		if (savedTasks) {
			return JSON.parse(savedTasks)
		}

		return [
			{ id: 'task-1', title: 'Купить молоко', isDone: false },
			{ id: 'task-2', title: 'Погладить кота', isDone: true },
		]
	})

	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [searchQuery, setSearchQuery] = useState('')

	const deleteAllTasks = () => {
		const isConfirmed = confirm('Удалить все задачи?')

		if (isConfirmed) {
			setTasks([])
		}
	}

	const deleteTask = (taskId) => {
		setTasks(tasks.filter((task) => task.id !== taskId))
	}

	const toggleTaskComplite = (taskId, isDone) => {
		setTasks(
			tasks.map((task) => {
				if (task.id === taskId) {
					return { ...task, isDone }
				}

				return task
			})
		)
	}

	const addTask = () => {
		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				id: Date.now().toString(),
				title: newTaskTitle,
				isDone: false,
			}

			setTasks([...tasks, newTask])
			setNewTaskTitle('')
			setSearchQuery('')

			// Второй вариант
			// setTasks((task) => [
			// 	...task,
			// 	{
			// 		id: String(crypto?.randomUUID ?? Date.now()),
			// 		title: newTaskTitle,
			// 		isDone: false,
			// 	},
			// ])
			// setNewTaskTitle('')
		}
	}

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	const clearSearchQuery = searchQuery.trim().toLowerCase()
	const filteredTasks =
		clearSearchQuery.length > 0
			? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
			: null

	return (
		<div className="todo">
			<h1 className="todo__title">To Do List</h1>
			<AddTaskForm
				addTask={addTask}
				newTaskTitle={newTaskTitle}
				setNewTaskTitle={setNewTaskTitle}
			/>
			<SearchTaskForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<TodoInfo
				total={tasks.length}
				done={tasks.filter(({ isDone }) => isDone).length}
				onDeleteAllButtonClick={deleteAllTasks}
			/>
			<TodoList
				tasks={tasks}
				filteredTasks={filteredTasks}
				onDeleteTaskButtonClick={deleteTask}
				onTaskCompliteChange={toggleTaskComplite}
			/>
		</div>
	)
}

export default Todo
