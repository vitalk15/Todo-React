import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

const useTasks = () => {
	const [tasks, setTasks] = useState(() => {
		const savedTasks = localStorage.getItem('tasks')
		if (savedTasks) {
			return JSON.parse(savedTasks)
		}

		return []
	})

	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [searchQuery, setSearchQuery] = useState('')

	const newTaskInputRef = useRef(null)
	const firstIncompleteTaskRef = useRef(null)
	const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id

	const deleteAllTasks = useCallback(() => {
		const isConfirmed = confirm('Удалить все задачи?')

		if (isConfirmed) {
			setTasks([])
		}
	}, [])

	const deleteTask = useCallback(
		(taskId) => {
			setTasks(tasks.filter((task) => task.id !== taskId))
		},
		[tasks]
	)

	const toggleTaskComplite = useCallback(
		(taskId, isDone) => {
			setTasks(
				tasks.map((task) => {
					if (task.id === taskId) {
						return { ...task, isDone }
					}

					return task
				})
			)
		},
		[tasks]
	)

	const addTask = useCallback(() => {
		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				id: Date.now().toString(),
				title: newTaskTitle,
				isDone: false,
			}

			setTasks((prevTasks) => [...prevTasks, newTask])
			setNewTaskTitle('')
			setSearchQuery('')

			newTaskInputRef.current.focus()

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
			// setSearchQuery('')
		}
	}, [newTaskTitle])

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	useEffect(() => {
		newTaskInputRef.current.focus()
	}, [])

	const filteredTasks = useMemo(() => {
		const clearSearchQuery = searchQuery.trim().toLowerCase()

		return clearSearchQuery.length > 0
			? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
			: null
	}, [searchQuery, tasks])

	return {
		tasks,
		filteredTasks,
		firstIncompleteTaskId,
		firstIncompleteTaskRef,
		deleteTask,
		deleteAllTasks,
		toggleTaskComplite,
		addTask,
		newTaskTitle,
		setNewTaskTitle,
		newTaskInputRef,
		searchQuery,
		setSearchQuery,
	}
}

export default useTasks
