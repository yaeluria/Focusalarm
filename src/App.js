import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Title from './components/Title'
import TimeRadioForm from './components/TimeRadioForm'
import SoundRadioForm from './components/SoundRadioForm'





function App() {


  return (
    <div classname="App">
     
        <Title/>
  
      <TimeRadioForm />
      <SoundRadioForm />

    </div>
  )
}

export default App;
