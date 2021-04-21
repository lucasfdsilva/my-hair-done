import React from 'react'
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik'

const SelectFieldWrapper = ({
  name, 
  options, 
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const { field, meta } = useField(name);

  const handleChange = evt => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelectField = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange
  };

  if(meta && meta.touched && meta.error ){
    configSelectField.error = true;
    configSelectField.helperText = meta.error;
  }

  return (
    <TextField {...configSelectField}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        )
      })}
    </TextField>
  );
};

export default SelectFieldWrapper;