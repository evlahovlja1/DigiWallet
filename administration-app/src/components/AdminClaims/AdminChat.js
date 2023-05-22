import React, { useEffect, useState, useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField, Typography } from '@mui/material';
import { getMessages, sendMessage } from '../../services/adminClaimService';
import { getUserId } from '../../services/userService';

const Message = ({ text, username, sentByMe }) => (
	<div
		style={{
			display: 'flex',
			flexDirection: sentByMe ? 'row-reverse' : 'row',
			alignItems: 'center',
			marginBottom: 8,
		}}
	>
		<Typography
			variant='body1'
			sx={{
				p: 1,
				borderRadius: 1,
				bgcolor: sentByMe ? 'primary.main' : 'grey.200',
				color: sentByMe ? 'white' : 'inherit',
			}}
			align={sentByMe ? 'right' : 'left'}
		>
			{text}
		</Typography>
		<Typography variant='caption' sx={{ ml: 1, mr: 1 }}>
			{username}
		</Typography>
	</div>
);

const MessagingDialog = ({ open, onClose, claimId }) => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [file, setFile] = useState(null);
	let userId = getUserId();

	const fetchMessages = useCallback(() => {
		if (claimId !== -1) {
			getMessages(claimId)
				.then(response => {
					setMessages(response.data.messages);
				})
				.catch(error => console.error('Error while fetching messages:', error));
		}
	}, [claimId]);

	useEffect(() => {
		fetchMessages();
	}, [fetchMessages]);

	const handleNewMessageChange = event => {
		setNewMessage(event.target.value);
	};

	const handleSendMessage = () => {
		if (newMessage.trim() !== '') {
			let message = { transactionClaimId: claimId, message: newMessage, documentIds: [] };
			sendMessage(message)
				.then(response => {
					fetchMessages();
					setNewMessage('');
				})
				.catch(error => console.error('Error sending message', error));
		}
	};

	const handleClose = () => {
		setNewMessage('');
		setFile(null);
		onClose();
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
			<DialogTitle>Messages</DialogTitle>
			<DialogContent sx={{ pb: 3 }}>
				{messages.map((message, index) => (
					<Message key={index} text={message.message} username={message.userName} sentByMe={message.userId == userId} />
				))}
				<TextField
					label='New message'
					variant='outlined'
					fullWidth
					value={newMessage}
					onChange={handleNewMessageChange}
					onKeyPress={event => {
						if (event.key === 'Enter') {
							handleSendMessage();
						}
					}}
					sx={{ mt: 2 }}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button variant='contained' onClick={handleSendMessage}>
					Send Message
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default MessagingDialog;
