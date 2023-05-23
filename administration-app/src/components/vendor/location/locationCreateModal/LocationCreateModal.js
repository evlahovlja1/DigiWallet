import React, { useState } from 'react';

import { Button, TextField, Grid, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { Stack } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';
import { createVendorLocation } from '../../../../services/vendorService';
import { getUserId } from '../../../../services/userService';
import Loader from '../../../loaderDialog/Loader';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		minHeight: '50%',
		maxWidth: '90%',
		margin: 'auto',
		border: 'none',
	},
	card: {
		border: 'none',
		padding: '5px',
	},
	button: {
		marginRight: '5%',
		'&.MuiButton-contained': {
			backgroundImage: 'linear-gradient(144deg, #ffb649 35%,#ffee00)',
			borderRadius: '15px',
			color: 'black',
			width: '8rem',
			'&:hover': {
				backgroundImage: 'linear-gradient(144deg, #e9a642 65%,#e9de00)',
				boxShadow: 'none',
			},
			'&:disabled': {
				backgroundColor: '#ffffff',
				boxShadow: 'none',
				color: '#d3d3d3',
			},
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: '95%',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	textField: {
		minWidth: '95%',
	},
	cardActions: {
		justifyContent: 'right',
		paddingTop: 20,
	},
}));

export default function LocationCreateModal(props) {
	const location = {
		name: '',
		address: '',
		createdBy: -1,
		vendorId: -1,
	};

	const classes = useStyles();
	const [address, setAddress] = useState('');
	const [name, setName] = useState('');

	const [errors, setErrors] = useState({ address: false, name: false });

	const [open, setOpen] = useState(false);
	const [loaderState, setLoaderState] = useState({ success: false, loading: true });

	const handleAddressChange = event => {
		setAddress(event.target.value);
	};

	const handleNameChange = event => {
		setName(event.target.value);
	};

	const validate = () => {
		var addressError = false;
		var nameError = false;

		if (address === '') addressError = true;
		if (name === '') nameError = true;

		setErrors({ address: addressError, name: nameError });

		if (addressError) return false;
		if (nameError) return false;
		return true;
	};

	const handleSubmit = event => {
		event.preventDefault();

		var validData = validate();

		if (validData) {
			setOpen(true);
			location.name = name;
			location.address = address;

			location.createdBy = getUserId();
			location.vendorId = props.vendorId;
			createVendorLocation(location)
				.then(res => {
					setLoaderState({ ...loaderState, loading: false, success: true });
					setOpen(false);
					props.handleClose();
				})
				.catch(() => {
					setLoaderState({ ...loaderState, loading: false, success: false });
					setOpen(false);
				});
		}
	};

	return (
		<div>
			<div className='container'>
				<form className={classes.root} onSubmit={handleSubmit}>
					<Card className={classes.card}>
						<CardHeader align='left' title={'Create B2B Location'}></CardHeader>
						<CardContent>
							<Stack direction='row' spacing={2}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											className={classes.textField}
											id='standard-basic'
											label='Name'
											data-testid={'location-name'}
											variant='standard'
											value={name}
											required={true}
											error={errors.Name}
											onChange={handleNameChange}
										/>
										<TextField
											className={classes.textField}
											id='standard-basic'
											label='Address'
											variant='standard'
											data-testid={'location-address'}
											value={address}
											required={true}
											error={errors.address}
											onChange={handleAddressChange}
										/>
									</Grid>
								</Grid>
							</Stack>
						</CardContent>
						<CardActions className={classes.cardActions}>
							<Button
								className={classes.button}
								variant='contained'
								size='small'
								type='submit'
								value='Submit'
								data-testid={'create-location-btn'}
								onClick={handleSubmit}>
								Create
							</Button>
						</CardActions>
					</Card>
				</form>
				<Loader open={open} loaderState={loaderState} />
			</div>
		</div>
	);
}
