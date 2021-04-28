import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useField } from 'formik';

const TextArea = ({
  name, 
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    multiline: true,
    rows: 3,
    rowsMax: 4,
    variant: 'outlined',
  };


  if(meta && meta.touched && meta.error){
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }


  return(
    <TextField {...configTextField}/>
  );
};

export default TextArea;