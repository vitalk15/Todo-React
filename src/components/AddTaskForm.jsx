import { useContext } from 'react'
import Button from './Button'
import Field from './Field'
import { TasksContext } from '../context/TasksContext'

const AddTaskForm = () => {
	const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
		useContext(TasksContext)

	const clearNewTaskTitle = newTaskTitle.trim()
	const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

	const onSubmit = (event) => {
		event.preventDefault()

		if (!isNewTaskTitleEmpty) {
			addTask(clearNewTaskTitle)
		}
	}

	return (
		<form className="todo__form" onSubmit={onSubmit}>
			<Field
				className="todo__field"
				label="New task"
				id="new-task"
				value={newTaskTitle}
				onInput={(event) => setNewTaskTitle(event.target.value)}
				ref={newTaskInputRef}
			/>
			<Button type="submit" isDisabled={isNewTaskTitleEmpty}>
				Add
			</Button>
		</form>
	)
}

export default AddTaskForm
