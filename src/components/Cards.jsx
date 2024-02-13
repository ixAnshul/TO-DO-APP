import { useState } from 'react';
import { Card, Input, Popconfirm } from 'antd';
import axios from 'axios';
import './Cards.css';

const Cards = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedNotes, setEditedNotes] = useState(props.para);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Make a PUT request to the API endpoint with the updated data
      await axios.put(`https://apis-production-145a.up.railway.app/api/todo/${props.id}`, {
        title: editedTitle,
        para: editedNotes,
      }, {
        headers: {
          Authorization: '8ed65e15-95ee-42a4-96df-492e0aad83ef',
        },
      });
  
      // Update the local state if the request is successful
      setIsEditing(false);
      props.onSaveSuccess(); // Assuming you have a callback to handle any UI updates after saving
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset edited title and notes to the original values
    setEditedTitle(props.title);
    setEditedNotes(props.para);
  };

  const handleDeleteClick = async () => {
    try {
      console.log('Deleting todo...');
      await axios.delete(`https://apis-production-145a.up.railway.app/api/todo/${props.id}`, {
        headers: {
          Authorization: '8ed65e15-95ee-42a4-96df-492e0aad83ef',
        },
      });
      console.log('Todo deleted successfully.');
      props.onSaveSuccess();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  

  return (
    <div className="cards">
      <Card
        title={
          isEditing ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            props.title
          )
        }
        extra={
          isEditing ? (
            <>
              <a href="#" onClick={handleSaveClick}>
                Save
              </a>{' '}
              |{' '}
              <a href="#" onClick={handleCancelClick}>
                Cancel
              </a>
            </>
          ) : (
            <>
              <a onClick={handleEditClick}>
                Edit
              </a>{' '}
              |{' '}
              <Popconfirm
                title="Are you sure you want to delete?"
                onConfirm={handleDeleteClick}
                okText="Yes"
                cancelText="No"
              >
                <a>Delete</a>
              </Popconfirm>
            </>
          )
        }
        style={{ width: 280, margin: 5 }}
      >
        {isEditing ? (
          <Input.TextArea
            value={editedNotes}
            onChange={(e) => setEditedNotes(e.target.value)}
          />
        ) : (
          <p className='para'>{props.para}</p>
        )}
      </Card>
      
    </div>
  );
};

export default Cards;
