import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchUsers } from './user.api';
import { FetchStatus, User, UserState } from './user.definition';

const initialState: UserState = {
  userList: [],
  selectedUser: null,
  status: FetchStatus.IDLE,
};

// Async action
export const getUserList = createAsyncThunk('user/fetchUsers', async (): Promise<User[]> => {
  const response = await fetchUsers();
  return response.map((res) => ({
    id: res.id + '',
    name: res.name,
    username: res.username,
    city: res.address.city,
    email: res.email,
  }));
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    unsetSelectedUser: (state) => ({ ...state, selectedUser: null }),
    getUser: (state, action: PayloadAction<string>) => {
      state.selectedUser = state.userList.find((user) => user.id === action.payload) as User;
    },
    addNewUser: (state, action: PayloadAction<User>) => {
      const ids: number[] = [];
      state.userList.map((user) => ids.push(+user.id));
      const id = '' + (ids.sort((a, b) => b - a)[0] + 1 || 1);
      state.userList = [...state.userList, { ...action.payload, id }];
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const idx = state.userList.findIndex((user) => user.id === action.payload.id);
      state.userList[idx] = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const idx = state.userList.findIndex((user) => user.id === action.payload);
      state.userList.splice(idx, 1);
    },
    sortUser: (state, action: PayloadAction<string>) => {
      state.userList.sort((a, b) => {
        const aU = a.username as string;
        const bU = b.username as string;
        if (aU < bU) {
          return action.payload === 'ASC' ? -1 : 1;
        }
        if (aU > bU) {
          return action.payload === 'ASC' ? 1 : -1;
        }
        return 0;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.status = FetchStatus.LOADING;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.status = FetchStatus.IDLE;
        state.userList = action.payload;
      })
      .addCase(getUserList.rejected, (state) => {
        state.status = FetchStatus.FAILED;
      });
  },
});

// Actions
export const { addNewUser, getUser, updateUser, deleteUser, sortUser, unsetSelectedUser } = userSlice.actions;

// Selectors
export const selectUsers = (state: RootState) => state.user.userList;
export const selectUser = (state: RootState) => state.user.selectedUser;
export const selectFetchStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
