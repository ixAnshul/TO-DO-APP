import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/navbar';
import { Card } from 'antd';
import Tasks from './components/Tasks';
import Todo from './components/Todo';

const fetchData = async (setUserData, setLoading) => {
  try {
    const response = await axios.get('https://apis-production-145a.up.railway.app/api/todo/', {
      headers: {
        Authorization: '8ed65e15-95ee-42a4-96df-492e0aad83ef',
      },
    });
    setUserData(response.data);
  } catch (error) {
    console.error('Error fetching todos', error);
  } finally {
    setLoading(false);
  }
};

function App() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(setUserData, setLoading);
  }, []);

  const handleSaveSuccess = () => {
    fetchData(setUserData, setLoading);
  };

  return (
    <>
      <div className="header">
        <Navbar />
      </div>
      <div id='tasks-manager'>
      <div className='tasks-manager'>
          <Todo onSaveSuccess={handleSaveSuccess} />
          {/* <Tasks /> */}
          {loading ? (
              <Card style={{ width: 500, marginTop: 16 }} loading={loading}>
              </Card>
          ) : (
            userData.map((data, idx) => (
              <Tasks key={idx} id={data.id} title={data.title} para={data.para} onSaveSuccess={handleSaveSuccess} />
            ))
          )}
        </div></div>
    </>
  );
}

export default App;
