import { User, UserApiResponse } from './user.definition';

const USER_SERVICE_URL = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';

export const fetchUsers = async (): Promise<UserApiResponse[]> => {
  return fetch(USER_SERVICE_URL).then((response) => response.json());
};

// UN-USED FUNCTIONS
// we may call each request but we got unexpected data, since it's a mock
export const fetchUser = async (id: number): Promise<UserApiResponse> => {
  return fetch(USER_SERVICE_URL + '/' + id).then((response) => response.json());
};

export const addUser = async (user: User): Promise<User> => {
  return fetch(USER_SERVICE_URL, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());
};

export const updateUser = async (user: User): Promise<UserApiResponse> => {
  return fetch(USER_SERVICE_URL + '/' + user.id, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());
};

export const deleteUser = async (id: string): Promise<{}> => {
  return fetch(USER_SERVICE_URL + '/' + id, {
    method: 'DELETE',
  }).then((response) => response.json());
};
