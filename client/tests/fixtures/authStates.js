export const initialState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined,
};

export const authenticatedState = {
  status: 'authenticated',
  user: {
    uid: 'abc123',
    name: 'Wilmer',
  },
  errorMessage: undefined,
};

export const notAuthenticatedState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined,
};
