import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../+state/hooks';
import { User } from '../+state/user/user.definition';
import { deleteUser, selectUser } from '../+state/user/user.slice';

const UserDeletePopup: React.FC<{ open: boolean; closePopupHandler: () => void }> = ({ open, closePopupHandler }) => {
  const selectedUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleClosePopup = () => {
    dispatch(deleteUser((selectedUser as User).id));
    closePopupHandler();
  };

  return (
    <Dialog open={open} onClose={closePopupHandler}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete user <strong>{(selectedUser as User)?.name}</strong>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={closePopupHandler}>
          Cancel
        </Button>
        <Button color='primary' onClick={handleClosePopup}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDeletePopup;
