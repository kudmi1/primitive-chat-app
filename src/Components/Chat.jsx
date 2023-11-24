import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import EmojiPicker from 'emoji-picker-react'
import Messages from './Messages'

const socket = io.connect('https://primitive-chat-app.onrender.com/')

export const Chat = () => {
	const { search } = useLocation()
	const navigate = useNavigate()
	const [state, setState] = useState([])
	const [params, setParams] = useState({ room: '', user: '' })
	const [message, setMessage] = useState('')
	const [isOpen, setOpen] = useState(false)
	const [usersInRoom, setUsersInRoom] = useState(0)
	const messageFieldRef = useRef(null)
	const leftRoom = () => {
		socket.emit('leftRoom', { params })
		navigate('/')
	}
	const handleChange = ({ target: { value } }) => {
		setMessage(value)
	}
	const handleSubmit = (e) => {
		e.preventDefault()

		if(!message) return
		socket.emit('sendMessage', { message, params })

		setMessage('')
	}
	const onEmojiClick = ({ emoji }) => {
		setMessage((prevMessage) => prevMessage + emoji)
	}

	useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search))
		setParams(searchParams)
		socket.emit('join', searchParams)

		return () => {
			socket.off()
		}
	}, [search])

	useEffect(() => {
		socket.on('message', ({ data }) => {
			setState((_state) => [..._state, data])
		})
	}, [])

	useEffect(() => {
		socket.on('room', ({ data: { users } }) => {
			setUsersInRoom(users.length)
		})
	}, [])

	useEffect(() => {
    if (messageFieldRef.current) {
      messageFieldRef.current.scrollTop = messageFieldRef.current.scrollHeight;
    }
  }, [state])

	return (
		<div className='w-screen h-screen flex justify-center items-center border'>
			<div className='w-[1000px] h-[800px] max-h-[800px] flex flex-col rounded-3xl overflow-hidden '>
				<div className='flex justify-between w-full p-4 items-center bg-[#2b2a33]'>
					<div className=''>{`Room: ${params.room}`}</div>
					<p className=''>{usersInRoom} users in this room</p>
					<button
						className='rounded-lg bg-red-500 py-2 px-4'
						onClick={leftRoom}
					>
						Left room
					</button>
				</div>
				<div ref={messageFieldRef} className='message-field grow overflow-scroll p-4 bg-[#313338] flex flex-col'>
					<Messages messages={state} name={params.name} />
				</div>
				<form className=' w-full flex min-h-[90px] items-center bg-[#2b2a33]' onSubmit={handleSubmit}>
					<div className='grow h-full'>
						<input
							className='w-full h-full p-4 outline-none '
							type='text'
							name='message'
							value={message}
							onChange={handleChange}
							autoComplete='off'
							placeholder='What do you want to write?'
							required
						/>
					</div>
					<div className='pr-4'>
						<div className='relative flex justify-between items-center gap-4 h-full'>
							<img
								src='/images/emoji.svg'
								alt=''
								className='rounded-lg w-10 h-10 p-1 aspect-square cursor-pointer hover:bg-[#383742] '
								onClick={() => setOpen(!isOpen)}
							/>
							<div
								className={`absolute bottom-[70%] right-full ${
									isOpen
										? 'opacity-100 translate-y-0 pointer-events-auto'
										: 'opacity-0 translate-y-2 pointer-events-none'
								} transition-all duration-300`}
							>
								<EmojiPicker onEmojiClick={onEmojiClick} />
							</div>
							<div className='h-full'>
								<input
									type='submit'
									value='Send'
									onSubmit={handleSubmit}
									className='py-2 h-full px-4 bg-green-600 rounded-lg text-[#2b2a33] cursor-pointer min-w-[80px]'
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
