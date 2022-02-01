import { Box, Button, CircularProgress, Container, makeStyles, Paper, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './+state/hooks';
import { FetchStatus } from './+state/user/user.definition';
import { getUserList, selectFetchStatus } from './+state/user/user.slice';
import UserDeletePopup from './components/user-delete-popup';
import UserFormPopup from './components/user-form-popup';

import UserList from './components/user-list.components';

const useStyles = makeStyles({
  container: {
    marginTop: '2rem',
  },
  content: {
    padding: '1rem 1rem 2rem',
    position: 'relative',
  },
  subHeader: {
    padding: '0.5rem 0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5rem 0',
  },
  backdrop: {
    zIndex: 1,
  },
});

const App = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const fetchStatus = useAppSelector(selectFetchStatus);
  const [openUserForm, setOpenUserForm] = useState(false);
  const [openDeltePopup, setOpenDeltePopup] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const onEditUser = () => {
    setOpenUserForm(true);
    setIsNew(false);
  };

  const onDeleteUser = () => {
    setOpenDeltePopup(true);
  };

  const onAddUser = () => {
    setOpenUserForm(true);
    setIsNew(true);
  };

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  return (
    <Container className={classes.container} maxWidth='lg'>
      <Typography variant='h2'>Dashboard</Typography>
      {fetchStatus === FetchStatus.LOADING ? (
        <Box className={classes.spinner}>
          <CircularProgress />
        </Box>
      ) : fetchStatus === FetchStatus.FAILED ? (
        <Typography color='secondary'>404</Typography>
      ) : (
        <Paper className={classes.content} elevation={0}>
          <Box className={classes.subHeader}>
            <Typography variant='h4'>User list</Typography>{' '}
            <Button onClick={onAddUser} variant='contained' color='primary'>
              Add new
            </Button>
          </Box>
          <UserList editUserTrigger={onEditUser} deleteUserTrigger={onDeleteUser} />
        </Paper>
      )}
      <UserFormPopup isAddnewUser={isNew} open={openUserForm} closePopupHandler={() => setOpenUserForm(false)} />
      <UserDeletePopup open={openDeltePopup} closePopupHandler={() => setOpenDeltePopup(false)} />
    </Container>
  );
};

export default App;
