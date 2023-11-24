import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Chat } from './Chat'
import { MainComponent } from './MainComponent'

export const AppRoutes = () => {
	return (
		<div className=''>
			<Routes>
				<Route path='/' element={<MainComponent />} />
				<Route path='chat' element={<Chat />} />
			</Routes>
		</div>
	)
}
