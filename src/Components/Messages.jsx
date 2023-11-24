/* eslint-disable react/prop-types */
const Messages = ({ messages, name }) => {
	return (
		<div className=''>
			{messages.map(({ user, message }, index) => {
				const itsMe =
					user.name.trim().toLowerCase() === name.trim().toLowerCase()
				return (
					<div key={index} className={`flex ${itsMe ? 'justify-end' : 'justify-start'} my-2`}>
						<div>
							<span className=''>{user.name}</span>
							<div
								className={` rounded-lg py-3 px-4 w-max ${
									itsMe ? 'bg-blue-500' : 'bg-gray-500'
								}`}
							>
								{message}
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Messages
