import { memo, useContext } from 'react'
import TodoItem from '../TodoItem/TodoItem'
import { TasksContext } from '../../context/TasksContext'

const TodoList = (props) => {
	const { styles } = props
	const { tasks, filteredTasks } = useContext(TasksContext)

	const hasTasks = tasks.length > 0
	// возвращает true, если массив существует и пуст
	const isEmptyFilteredTasks = filteredTasks?.length === 0

	if (!hasTasks) {
		return <div className={styles.emptyMessage}>Задач пока нет</div>
	}

	if (hasTasks && isEmptyFilteredTasks) {
		return <div className={styles.emptyMessage}>Задачи не найдены</div>
	}

	return (
		<ul className={styles.list}>
			{/* если filteredTasks не пустой то он рендерится, иначе рендерится tasks */}
			{(filteredTasks ?? tasks).map((task) => (
				<TodoItem className={styles.item} key={task.id} {...task} />
			))}
		</ul>
	)
}

export default memo(TodoList)
