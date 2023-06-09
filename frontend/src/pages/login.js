import logo from '../logo.svg';
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Switch} from 'react-router-dom';

import { SessionContext, SessionVerbs } from '../contexts/SessionContext';
import server from '../utils/server';
import Modal from '../components/modal';
import Form from '../components/form';
import '../styles/login.css';
import { default as getCurrentDate } from '../utils/date';
import '../styles/utils.css'

const Login = () => {
  const [sessionInfo, setSessionInfo] = useState({
    loading: true,
    loggedIn: false,
    signUp: false,
    userid: '',
    display: ''
  })

  const sessionVerb = {
    login: (userid, display) => {
      localStorage.setItem('userid', userid)
      localStorage.setItem('display', display)
      setSessionInfo(prev => ({
        ...prev,
        loggedIn: true,
        userid: userid,
        display: display
      }))
    },
    logout: () => {
      localStorage.removeItem('userid')
      localStorage.removeItem('display')
      setSessionInfo(prev => ({
        ...prev,
        loggedIn: false,
        userid: '',
        display: ''
      }))
    }
  }

  useEffect(() => {
    // try to get the user auth
    const userid = localStorage.getItem('userid')
    const display = localStorage.getItem('display')
    if (userid && display) {
      sessionVerb.login(userid, display)
    }
    else {
      sessionVerb.logout()
    }
    setSessionInfo(prev => ({ ...prev, loading: false }))
  }, [])

  const handleSubmit = async (username, password) => {
    try {
      const res = await server.post('/user/login', {
        username: username,
        password: password
      })
      const id = res.data.id
      const display = res.data.username
      sessionVerb.login(id, display)
    } 
    
    catch (err) {
      console.error(err)
      const msg = err.response.data || 'Something went wrong'
      alert(msg)

      // Pls take this out later lmao
      // sessionVerb.login('', 'default user')
    }
  }

  return (
    <SessionVerbs.Provider value={sessionVerb}>
      <SessionContext.Provider value={sessionInfo}>
      {
        sessionInfo.loggedIn ?
        <>
          <Navigate to="/dashboard"/>
        </> :
        <>
          <h1 style = {{textAlign: 'center'}}>IoMeter</h1>
          <Modal>
            <h2 style = {{textAlign: 'center'}}> Welcome! </h2>
            <Form onSubmit={handleSubmit}>
            </Form>
            <p className='date'>{getCurrentDate()}</p>
          </Modal>
        </>
      }
      </SessionContext.Provider>
    </SessionVerbs.Provider>
  );
}

export default Login;
