import { API } from "../config";

export const getUser = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    return res.json()
  })
  .catch(error => {
    return console.log(error);
  })
};

export const updateUser = (userId, token, user) => {
  return fetch(`${API}/user/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(user)
  })
  .then(res => {
    return res.json()
  })
  .catch(error => {
    return console.log(error);
  })
};

export const updateUserLocally = (user, next) => {
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('jwt')) {
      let auth = JSON.parse(localStorage.getItem('jwt'));
      auth.user = user;
      localStorage.setItem('jwt', JSON.stringify(auth));
      next();
    }
  }
};

export const getPurchaseHistory = (userId, token) => {
  return fetch(`${API}/order/by/user/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    return res.json()
  })
  .catch(error => {
    return console.log(error);
  })
};