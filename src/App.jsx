import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Cards from './components/Cards';
import Navbar from './components/navbar';

function App() {
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apis-production-145a.up.railway.app/api/todo/', {
        headers: {
          Authorization: '8ed65e15-95ee-42a4-96df-492e0aad83ef',
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleSaveSuccess = () => {
    fetchData();
  };

  return (
    <>
      <div className="header">
        <Navbar onSaveSuccess={handleSaveSuccess}/>
      </div>
      <div className="cards">
        {userData.map((data, idx) => (
          <Cards key={idx} id={data.id} title={data.title} para={data.para} onSaveSuccess={handleSaveSuccess} />
        ))}
      </div>
    </>
  );
}

export default App;
