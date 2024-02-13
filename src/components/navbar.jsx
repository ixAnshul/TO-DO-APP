import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import logo from "../assets/logo.png";
import axios from 'axios';
import './Navbar.css';

const Navbar = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddTodo = async (values) => {
    try {
      // Make a POST request to the API endpoint with the form data
      await axios.post(`https://apis-production-145a.up.railway.app/api/todo/`, {
        title: values.title,
        para: values.para,
      }, {
        headers: {
          Authorization: '8ed65e15-95ee-42a4-96df-492e0aad83ef',
        },
      });
  
      // Close the modal after successful submission
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  useEffect(() => {
    // Trigger any additional actions or updates after modal is closed
    props.onSaveSuccess && props.onSaveSuccess();
  }, [isModalVisible, props.onSaveSuccess]);

  return (
    <div className="navbar">
      <div className="logotext">
        <img src={logo} width={60} height={60} alt="Logo" />
        <h4>TO-DO APP</h4>
      </div>
      <div className="add-todo-btn">
        <Button type="primary" onClick={showModal}>
          Add ToDo
        </Button>
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
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
