import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/navbar';
import { Card, message } from 'antd';
import Tasks from './components/Tasks';
import Todo from './components/Todo';

const get = import.meta.env.VITE_GET
const header = import.meta.env.VITE_HEADER

const fetchData = async (setUserData, setLoading) => {
  try {
    const response = await axios.get(get, {
      headers: {
        Authorization: header,
      },
    });
    setUserData(response.data);
  } catch (error) {
    message.error('Error fetching todos', error);
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
