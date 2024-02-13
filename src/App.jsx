import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Cards from './components/Cards';
import Navbar from './components/navbar';
import { Card } from 'antd';
import LoadingCards from './components/LoadingCards';

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
      
      <div className="cards">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <Card  key={idx} style={{ width: 300, marginTop: 16 }} loading={loading}>
            </Card>
          ))
        ) : (
          userData.map((data, idx) => (
            <Cards key={idx} id={data.id} title={data.title} para={data.para} onSaveSuccess={handleSaveSuccess} />
          ))
        )}
      </div>
      <LoadingCards onSaveSuccess={handleSaveSuccess}/>
      {/* <Button
        type="primary"
        shape="circle"
        icon={<EditOutlined />}
        size="large"
        style={{ position: 'fixed', bottom: 20, right: 20 }}
        onClick={showModal}
      />
      <Modal
        title="Add ToDo"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleAddTodo}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="para"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="warning" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
    </>
  );
}

export default App;
