import { useState } from 'react';
import {Switch } from 'antd';
import black from "../assets/black.gif";
import './Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState('dark');
  

  const changeTheme = (value) => {
    setTheme(value ? 'light' : 'dark');
    if (value) {
      console.log('dark');
      document.body.style.backgroundImage = 'url("https://i.imgur.com/hzmBmWJ.gif")';
      document.getElementById("title").style.animation = "Color 4s linear infinite";
      document.getElementById('todo-title').style.color = 'white'
      document.getElementById('todo-desc').style.color = 'white'
    } else {
      console.log('light');
      document.getElementById('todo-title').style.color = 'black'
      document.getElementById('todo-desc').style.color = 'black'
      document.body.style.backgroundImage = 'url("https://i.makeagif.com/media/1-13-2023/_3qu79.gif")';
      document.getElementById("title").style.color = "#28282B";
      document.getElementById("title").style.animation = "none";
    } 
  };
  const handleLogoClick = () => {
    // Reload the page
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="logotext">
        <img src={'https://miro.medium.com/v2/resize:fit:1200/1*5ir9FUuew5S30oLH745ojA.gif'} id='logo' alt="Logo" onClick={handleLogoClick}/>
      </div>
      <p id='title'>TO-DO APP</p>
      <div className="add-todo-btn">
      <Switch
        checked={theme === 'light'}
        onClick={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      </div>
    </div>
  );
};

export default Navbar;
