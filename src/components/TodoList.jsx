import TodoItem from './TodoItem'

const TodoList = (props) => {
	const {
		tasks = [],
		filteredTasks,
		onDeleteTaskButtonClick,
		onTaskCompliteChange,
	} = props

	const hasTasks = tasks.length > 0
	const isEmptyFilteredTasks = filteredTasks?.length === 0

	if (!hasTasks) {
		return <div className="todo__empty-message">Задач пока нет</div>
	}

	if (hasTasks && isEmptyFilteredTasks) {
		return <div className="todo__empty-message">Задачи не найдены</div>
	}

	return (
		<ul className="todo__list">
			{/* если filteredTasks не пустой то он ренедерится, иначе рендерится tasks */}
			{(filteredTasks ?? tasks).map((task) => (
				<TodoItem
					className="todo__item"
					key={task.id}
					onDeleteTaskButtonClick={onDeleteTaskButtonClick}
					onTaskCompliteChange={onTaskCompliteChange}
					{...task}
				/>
			))}
		</ul>
	)
}

export default TodoList
