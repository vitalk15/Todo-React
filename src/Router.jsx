import { useEffect, useState } from 'react'

/* eslint-disable-next-line react-refresh/only-export-components */
export const useRoute = () => {
	const [path, setPath] = useState(window.location.pathname)

	useEffect(() => {
		const onLocationChange = () => {
			setPath(window.location.pathname)
		}

		window.addEventListener('popstate', onLocationChange)

		return () => {
			window.removeEventListener('popstate', onLocationChange)
		}
	}, [])

	return path
}

const Router = (props) => {
	const { routes } = props
	const path = useRoute()
	const Page = routes[path] ?? routes['*']

	return <Page />
}

export default Router
