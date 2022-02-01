export type User = {
  id: string;
  name: string;
  username?: string;
  city?: string;
  email: string;
};

export type UserApiResponse = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export interface UserState {
  userList: User[];
  selectedUser: User | null;
  status: FetchStatus;
}

export enum FetchStatus {
  LOADING = 'LOADING',
  IDLE = 'IDLE',
  FAILED = 'FAILED',
}

type UserAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};
