import React from 'react';
import { Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useField } from 'formik';

const CheckboxdWrapper = ({ name, ...otherProps }) => {
	const [field, meta] = useField(name);

	const configCheckbox = {
		...field,
		...otherProps,
		checked: field.value,
		fullWidth: true,
		color: 'primary',
	};

	if (meta && meta.touched && meta.error) {
		configCheckbox.error = true;
		configCheckbox.helperText = meta.error;
	}

	return <Checkbox {...configCheckbox} />;
};

export default CheckboxdWrapper;
