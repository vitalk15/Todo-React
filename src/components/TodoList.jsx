import TodoItem from './TodoItem'

const TodoList = (props) => {
	const {
		tasks = [],
		filteredTasks,
		firstIncompleteTaskRef,
		firstIncompleteTaskId,
		onDeleteTaskButtonClick,
		onTaskCompliteChange,
	} = props

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
				<TodoItem
					className="todo__item"
					key={task.id}
					ref={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
					onDeleteTaskButtonClick={onDeleteTaskButtonClick}
					onTaskCompliteChange={onTaskCompliteChange}
					{...task}
				/>
			))}
		</ul>
	)
}

export default TodoList
