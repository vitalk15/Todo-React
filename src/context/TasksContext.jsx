import { createContext } from 'react'
import useTasks from '../hooks/useTasks'
import useIncompleteTaskScroll from '../hooks/useIncompleteTaskScroll'

/* eslint-disable-next-line react-refresh/only-export-components */
export const TasksContext = createContext({})

export const TasksProvider = (props) => {
	const { children } = props

	const {
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
	} = useTasks()

	const { firstIncompleteTaskId, firstIncompleteTaskRef } = useIncompleteTaskScroll(tasks)

	return (
		<TasksContext.Provider
			value={{
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
			}}
		>
			{children}
		</TasksContext.Provider>
	)
}
