import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  withStyles,
} from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../+state/hooks';
import { getUser, selectUsers, sortUser } from '../+state/user/user.slice';

const EditButton = withStyles(() => ({
  root: {
    color: '#ffffff',
    backgroundColor: yellow[700],
    '&:hover': {
      backgroundColor: yellow[800],
    },
    marginRight: '1rem',
  },
}))(Button);

const useStyles = makeStyles({
  emptyListWrapper: {
    padding: '1rem',
    minHeight: '20vh',
  },
});

const UserList: React.FC<{ editUserTrigger: () => void; deleteUserTrigger: () => void }> = ({
  editUserTrigger,
  deleteUserTrigger,
}) => {
  const users = useAppSelector(selectUsers);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [asc, setAsc] = useState(true);

  const handleEditButtonClick = (id: string) => {
    dispatch(getUser(id));
    editUserTrigger();
  };

  const handleDeleteButtonClick = (id: string) => {
    dispatch(getUser(id));
    deleteUserTrigger();
  };

  const handleSortClick = () => {
    setAsc(!asc);
    dispatch(sortUser(asc ? 'ASC' : 'DESC'));
  };

  return users.length ? (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>
              <TableSortLabel onClick={handleSortClick} direction={asc ? 'asc' : 'desc'}>
                Username
              </TableSortLabel>
            </TableCell>
            <TableCell>City</TableCell>
            <TableCell>Email</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.city}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell align='center'>
                <EditButton onClick={() => handleEditButtonClick(user.id)} variant='contained' size='small'>
                  Edit
                </EditButton>
                <Button
                  onClick={() => handleDeleteButtonClick(user.id)}
                  variant='contained'
                  size='small'
                  color='secondary'>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Paper className={classes.emptyListWrapper}>
      <Typography color='secondary'>List is Empty ...</Typography>
    </Paper>
  );
};

export default UserList;
