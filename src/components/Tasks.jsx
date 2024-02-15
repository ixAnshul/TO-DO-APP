import { useState } from 'react';
import { Collapse, Button, Popconfirm, Input } from 'antd';
import './Tasks.css';
import { DeleteOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Panel } = Collapse;

const Tasks = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedPara, setEditedPara] = useState(props.para);
  const [isSaving, setIsSaving] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      setIsSaving(true);

      // Make a PUT request to the API endpoint with the updated data
      await axios.put(`https://apis-production-145a.up.railway.app/api/todo/${props.id}`, {
        title: editedTitle,
        para: editedPara,
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
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelClick = () => {
    // Cancel the editing mode
    setIsEditing(false);
    // Reset the edited title and para
    setEditedTitle(props.title);
    setEditedPara(props.para);
  };

  const handleDeleteConfirm = async () => {
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

  const handleDeleteCancel = () => {
    // Your delete button cancel logic here
    console.log('Delete button cancelled');
  };

  return (
    <div className="main">
      <Collapse bordered={false} style={{ width: 500, background: 'none', color: 'red' }}>
        <Panel
          header={
            <div className='mains-btns'>
              {isEditing ? (
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  style={{
                    width: 300,
                    height: 25
                  }}
                />
              ) : (
                <div className='title'>{props.title}</div>
              )}
              <div className="btn">
                {isEditing ? (
                  <div className="main-btn">
                      <Button
                        type="primary"
                        shape="round"
                        icon={<SaveOutlined />}
                        onClick={handleSaveClick}
                        style={{ marginRight: 5 }}
                        loading={isSaving}
                      />
                    <Button
                      type="default"
                      shape="round"
                      icon={<CloseOutlined />}
                      onClick={handleCancelClick}
                    />
                  </div>
                ) : (
                  <>
                    <Button
                      type="primary"
                      ghost
                      shape="round"
                      icon={<EditOutlined />}
                      onClick={handleEditClick}
                      style={{ marginRight: 5 }}
                    />
                    <Popconfirm
                      title="Are you sure you want to delete?"
                      onConfirm={handleDeleteConfirm}
                      onCancel={handleDeleteCancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        shape="round"
                        ghost
                        danger
                        type="primary"
                        onClick={() => {}}
                        style={{}}
                        icon={<DeleteOutlined />}
                      />
                    </Popconfirm>
                  </>
                )}
              </div>
            </div>
          }
        >
          {isEditing ? (
            <Input.TextArea
              value={editedPara}
              onChange={(e) => setEditedPara(e.target.value)}
            />
          ) : (
            <div id='' style={{ color: '#666666' }}>{props.para}</div>
          )}
        </Panel>
      </Collapse>
    </div>
  );
};

export default Tasks;
