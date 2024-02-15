import './Todo.css';
import { useState } from 'react';
import { Button, Input, message } from 'antd';
import axios from 'axios';

const Todo = (props) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  props.onSaveSuccess();
  const handleAddTodo = async () => {
    try {
      // Validate if both title and description are entered
      if (!title || !description) {
        message.error('Please enter both Title and Description.');
        return;
      }

      // Set loading to true
      setLoading(true);

      // Make a POST request to the API endpoint with the input data
      await axios.post('https://apis-production-145a.up.railway.app/api/todo/', {
        title,
        para: description,
      }, {
        headers: {
          Authorization: '8ed65e15-95ee-42a4-96df-492e0aad83ef',
        },
      });

      // Display success message
      message.success('Todo added successfully.');

      // Clear the input fields
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
      // Display error message
      message.error('Error adding todo. Please try again.');
    } finally {
      // Set loading to false after a delay
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className='manager'>
      <div className='add-todo'>
        <div className="name">
          <label id="todo-title">Title</label>
          <Input 
            placeholder="Title" 
            style={{ width: 150 }} 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="name">
          <label id="todo-desc">Description</label>
          <Input 
            placeholder="Description" 
            style={{ width: 150 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <Button
        type="primary"
        shape="round"
        loading={loading}
        style={{ backgroundColor: '#FF8A33', borderColor: '#FF8A33', marginRight: 5 }}
        onClick={handleAddTodo}
      >
        Add
      </Button>
    </div>
  );
};

export default Todo;
