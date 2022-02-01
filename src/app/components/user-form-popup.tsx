import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';

import { User } from '../+state/user/user.definition';
import { useAppDispatch, useAppSelector } from '../+state/hooks';
import { addNewUser, selectUser, updateUser } from '../+state/user/user.slice';

type FormPopupParam = {
  open: boolean;
  isAddnewUser: boolean;
  closePopupHandler: () => void;
};

const UserFormPopup: React.FC<FormPopupParam> = ({ open, isAddnewUser, closePopupHandler }) => {
  const selectedUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { formValues, setFormValues, handleInputValue, formIsValid, errors } = useFormControl();

  const handleFormSubmit = () => {
    dispatch(
      isAddnewUser
        ? addNewUser({ ...formValues, id: new Date().getTime().toString() })
        : updateUser({ ...formValues, id: selectedUser?.id as string })
    );
    closePopupHandler();
  };

  useEffect(() => {
    setFormValues({ name: '', username: '', email: '', city: '' } as User);
    if (!isAddnewUser && selectedUser) {
      setFormValues(selectedUser as User);
    }
  }, [isAddnewUser, selectedUser, setFormValues]);

  return (
    <Dialog maxWidth='sm' fullWidth={true} open={open} onClose={closePopupHandler} aria-labelledby='form-dialog-title'>
      <DialogTitle disableTypography id='form-dialog-title'>
        <Typography>{isAddnewUser ? 'Add new user' : 'Upadate user'}</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          name='name'
          label='Name'
          type='text'
          value={formValues['name']}
          onBlur={handleInputValue}
          onChange={handleInputValue}
          {...(errors['name'] && { error: true, helperText: errors['name'] })}
          autoComplete='off'
          fullWidth
          required
        />
        <TextField
          margin='dense'
          name='username'
          label='User Name'
          type='text'
          value={formValues['username']}
          onBlur={handleInputValue}
          onChange={handleInputValue}
          autoComplete='off'
          fullWidth
        />
        <TextField
          margin='dense'
          name='email'
          label='Email Address'
          type='email'
          value={formValues['email']}
          onBlur={handleInputValue}
          onChange={handleInputValue}
          {...(errors['email'] && { error: true, helperText: errors['email'] })}
          autoComplete='off'
          fullWidth
          required
        />
        <TextField
          margin='dense'
          name='city'
          label='City'
          type='text'
          value={formValues['city']}
          onBlur={handleInputValue}
          onChange={handleInputValue}
          autoComplete='off'
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closePopupHandler} color='secondary'>
          Cancel
        </Button>
        <Button disabled={!formIsValid()} onClick={handleFormSubmit} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormPopup;

// custom from hooks
const useFormControl = () => {
  const initialFormValues = { name: '', username: '', email: '', city: '' } as User;
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);
  const validate: any = (fieldValues = formValues) => {
    let temp = { ...errors };
    if ('name' in fieldValues) {
      temp.name = fieldValues.name ? '' : 'Name is required.';
    }
    if ('email' in fieldValues) {
      temp.email =
        fieldValues.email === ''
          ? 'Email address is required.'
          : /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ''
          : 'Invalid Email address.';
    }
    setErrors({ ...temp });
  };
  const handleInputValue: any = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validate({ [name]: value });
  };

  const formIsValid = (fieldValues = formValues) => {
    return fieldValues.name && fieldValues.email && Object.values(errors).every((x) => x === '');
  };
  return {
    handleInputValue,
    setFormValues,
    formIsValid,
    formValues,
    errors,
  };
};
