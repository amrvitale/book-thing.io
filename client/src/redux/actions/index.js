export const SET_LIBRARY = "SET_LIBRARY";
export const setLibrary = books => ({ type: SET_LIBRARY, books });

export const SET_USER = "SET_USER";
export const setUser = (user, token) => ({
  type: SET_USER,
  user,
  token
});

export const LOG_OUT_USER = "LOG_OUT_USER";
export const logOutUser = () => ({
  type: LOG_OUT_USER
});

export const fetchUser = accessToken => dispatch => {
  return fetch("/api/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(user => {
      dispatch(setUser(user, accessToken));
    })
    .catch(err => {
      console.error(err);
    });
};

export const fetchLibrary = token => dispatch => {
  return fetch("/api/library", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(books => {
      console.log(books);
      dispatch(setLibrary(books));
    })
    .catch(err => {
      console.error(err);
    });
};

export const createBook = (books, token) => dispatch => {
  return fetch("/api/library", {
    method: "post",
    body: JSON.stringify(books),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).catch(err => {
    console.error(err);
  });
};