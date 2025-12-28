import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import useTasksLocalStorage from './useTasksLocalStorage'

const useTasks = () => {
	const { savedTasks, saveTasks } = useTasksLocalStorage()

	const [tasks, setTasks] = useState(savedTasks ?? [])

	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [searchQuery, setSearchQuery] = useState('')

	const newTaskInputRef = useRef(null)

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

	const addTask = useCallback((title) => {
		const newTask = {
			id: Date.now().toString(),
			title,
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
	}, [])

	useEffect(() => {
		saveTasks(tasks)
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
