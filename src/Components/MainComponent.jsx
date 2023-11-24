import { useState } from 'react'
import { Link } from 'react-router-dom'

const FIELDS = {
	NAME: 'name',
	ROOM: 'room',
}

export const MainComponent = () => {
	const { NAME, ROOM } = FIELDS
	const [values, setValues] = useState({ [NAME]: '', [ROOM]: '' })

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value })
	}
	// проверка на пустые поля
	const handleClick = (e) => {
		const isDisabled = Object.values(values).some((value) => !value)
		if (isDisabled) e.preventDefault()
	}

	return (
		<div className='w-screen h-screen flex justify-center items-center'>
			<div className='flex flex-col gap-6 rounded-lg items-center p-6 max-w-[400px] w-full'>
				<h1 className='text-3xl'>Join</h1>
				<form className='flex flex-col items-center gap-4 w-full text-lg'>
					<div className='flex flex-col gap-4 w-full'>
						<input
							className='p-3 rounded-lg  focus-within:outline focus-within:outline-green-600'
							type='text'
							name='name'
							value={values[NAME]}
							onChange={handleChange}
							autoComplete='off'
							placeholder='Username'
							required
						/>
						<input
							className='p-3 rounded-lg  focus-within:outline focus-within:outline-green-600'
							type='text'
							name='room'
							value={values[ROOM]}
							onChange={handleChange}
							autoComplete='off'
							placeholder='Room'
							required
						/>
					</div>
					<Link
						className='rounded-lg w-full text-center bg-[#2b2a33] hover:bg-green-600 hover:text-[#2b2a33] focus-visible:outline active:scale-[97%] active:bg-green-700 focus-visible:outline-green-600'
						to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
						onClick={handleClick}
					>
						<button className='w-full h-full p-3' type='submit'>Enter</button>
					</Link>
				</form>
			</div>
		</div>
	)
}
