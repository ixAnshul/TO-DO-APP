import { useState } from 'react';
import {Switch } from 'antd';
import dark from "../assets/black.gif";
import light from "../assets/white.gif";
import './Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState('dark');
  

  const changeTheme = (value) => {
    setTheme(value ? 'light' : 'dark');
    if (value) {
      document.body.style.backgroundImage = `url(${dark})`;
      document.getElementById("title").style.animation = "Color 4s linear infinite";
      document.getElementById('todo-title').style.color = 'white'
      document.getElementById('todo-desc').style.color = 'white'
    } else {
      document.getElementById('todo-title').style.color = 'black'
      document.getElementById('todo-desc').style.color = 'black'
      document.body.style.backgroundImage = `url(${light})`;
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
        <img src={'https://media.tenor.com/auhScD7xFKYAAAAi/gb-notebook.gif'} id='logo' alt="Logo" onClick={handleLogoClick}/>
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
