import React from 'react';
import Modal from '../components/modal';
import FormSettings from '../components/formsettings';
import { default as getCurrentDate } from '../utils/date';
import '../styles/utils.css'

function Settings() {
  return (
    <>
      <h1 style = {{textAlign: 'center'}}>IoMeter</h1>
      <Modal>
        <h2 style = {{textAlign: 'center'}}>User Settings</h2>
        <FormSettings/>
        <p className='date'>{getCurrentDate()}</p>
      </Modal>
    </>
  );
}

export default Settings;