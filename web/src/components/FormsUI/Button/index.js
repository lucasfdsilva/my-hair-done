import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useFormikContext, useField } from 'formik';

const ButtonWrapper = ({ children, ...otherProps }) => {
	const { submitForm, isSubmitting } = useFormikContext();

	const handleSubmit = () => {
		submitForm();
	};

	const configButton = {
		variant: 'contained',
		color: 'primary',
		fullWidth: true,
		onClick: handleSubmit,
		disabled: isSubmitting,
		className: 'button',
	};

	return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
