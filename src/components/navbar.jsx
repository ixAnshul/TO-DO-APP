import { useState } from 'react';
import {Switch } from 'antd';
import logo from "../assets/logo.jpg";
import './Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState('dark');
  

  const changeTheme = (value) => {
    setTheme(value ? 'light' : 'dark');
    if (value) {
      console.log('dark');
      document.body.style.backgroundColor = "#28282B";
      document.getElementById("title").style.animation = "Color 4s linear infinite"
    } else {
      console.log('light');
      document.body.style.backgroundColor = "white";
      document.getElementById("title").style.color = "#28282B"
      document.getElementById("title").style.animation = "none"
    } 
  };
  const handleLogoClick = () => {
    // Reload the page
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="logotext">
        <img src={logo} id='logo' alt="Logo" onClick={handleLogoClick}/>
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
