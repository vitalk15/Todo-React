// import Todo from './components/Todo'
// import { TasksProvider } from './context/TasksContext'

import TaskPage from './pages/TaskPage'
import TasksPage from './pages/TasksPage'
import Router from './Router'

const App = () => {
	const routes = {
		'/': TasksPage,
		'/tasks/123': TaskPage,
		'*': () => <div>404 Page not found</div>,
	}

	return <Router routes={routes} />
}

export default App
