import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [index, setIndex] = useState(0)
  const [url, setUrl] = useState('https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const imageArr = [
    'https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png',
    'https://www.instagram.com/static/images/homepage/screenshots/screenshot3.png/94edb770accf.png',
    'https://www.instagram.com/static/images/homepage/screenshots/screenshot2.png/4d62acb667fb.png',
    'https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png'

  ]

  useEffect(() => {

    let clean = setInterval(() => {
      console.log('roulette fire off', index)
      if (index === 3) {
        setIndex(0)
      } else {
        setIndex(index => index + 1)
      }
      console.log(imageArr[index])
      setUrl(imageArr[index])
      return url
    }, 5000)
    return () => clearInterval(clean)
  }, [index])
  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, name));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='master-container'>
      <div className='phone-anchor'>

          <div className='phone'>
          <img className='roulette' src={url} />
          <img src='https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png' />
          </div>
      </div>

      <div className='master-form-container'>
        <div>
          <img className='' src='https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png' />
        </div>
        <div>
            <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label>User Name</label>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label>Name</label>
            <input type='text'
            name='name'
            onChange={updateName}
            value={name}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label>Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit'>Sign Up</button>
        </form>
        </div>
      </div>
    </div>
    //
  );
};

export default SignUpForm;
