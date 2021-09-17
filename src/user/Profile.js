import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getUser, updateUser, updateUserLocally } from './ApiUser';
import { Redirect } from 'react-router-dom';

const Profile = ({match}) => {
  // console.log(match);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false
  });

  const {token} = isAuthenticated();

  const {name, email, password, error, success} = values;

  const init = (userId) => {
    getUser(userId, token)
      .then(data => {
        if(data.error) {
          setValues({...values, error: true})
        } else {
          setValues({...values, name: data.name, email: data.email})
        }
      })
  };

  useEffect(() => {
      init(match.params.userId) 
  }, []);

  const handleChange = (name) => e => {
    setValues({...values, error: false, [name]: e.target.value})

  }

  const clickSubmit = (e) => {
    e.preventDefault();
    updateUser(match.params.userId, token, {name, email, password})
      .then(data => {
        if(data.error) {
          console.log(data.error)
        } else {
          updateUserLocally(data, () => {
            setValues({...values, name: data.name, email: data.email, success: true})
          })
        }
      })
  };

  const redirectUser = (success) => {
    if(success) {
      return <Redirect to='/cart' />
    }
  }

  const profileUpdate = (name, email, password) => {
    return (
      <form style={{width: '50%'}}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input type="text" className="form-control" onChange={handleChange('name')} value={name} />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input type="email" className="form-control" onChange={handleChange('email')} value={email} />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input type="password" className="form-control" onChange={handleChange('password')} value={password} />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary mt-2">Submit</button>
      </form>
    )
  }
  return (
  <Layout title='Profile Update' description='Update your profile' className='container-fluid'>
    <h2>Profile</h2>
    {profileUpdate(name, email, password)}
    {redirectUser(success)}
  </Layout>
  );
};

export default Profile;