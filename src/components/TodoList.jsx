import { memo, useContext } from 'react'
import TodoItem from './TodoItem'
import { TasksContext } from '../context/TasksContext'

const TodoList = () => {
	const { tasks, filteredTasks } = useContext(TasksContext)

	const hasTasks = tasks.length > 0
	// возвращает true, если массив существует и пуст
	const isEmptyFilteredTasks = filteredTasks?.length === 0

	if (!hasTasks) {
		return <div className="todo__empty-message">Задач пока нет</div>
	}

	if (hasTasks && isEmptyFilteredTasks) {
		return <div className="todo__empty-message">Задачи не найдены</div>
	}

	return (
		<ul className="todo__list">
			{/* если filteredTasks не пустой то он рендерится, иначе рендерится tasks */}
			{(filteredTasks ?? tasks).map((task) => (
				<TodoItem className="todo__item" key={task.id} {...task} />
			))}
		</ul>
	)
}

export default memo(TodoList)
