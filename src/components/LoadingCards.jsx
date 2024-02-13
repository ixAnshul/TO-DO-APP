import { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const LoadingCards = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Create a form instance using Form.useForm()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddTodo = async (values) => {
    try {
      setLoading(true);
      await axios.post(`https://apis-production-145a.up.railway.app/api/todo/`, {
        title: values.title,
        para: values.para,
      }, {
        headers: {
          Authorization: '8ed65e15-95ee-42a4-96df-492e0aad83ef',
        },
      });

      props.onSaveSuccess();

      // Reset the form fields after successful submission
      form.resetFields();

      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
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
        <Spin spinning={loading}>
          <Form form={form} onFinish={handleAddTodo}>
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
              <Button type="primary" htmlType="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}

export default LoadingCards;
