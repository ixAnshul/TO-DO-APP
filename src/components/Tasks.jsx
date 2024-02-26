import { useState } from 'react';
import { Collapse, Button, Popconfirm, Input } from 'antd';
import './Tasks.css';
import { DeleteOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Panel } = Collapse;

const Tasks = ({ id, title, para, onSaveSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPara, setEditedPara] = useState(para);
  const [isSaving, setIsSaving] = useState(false);

  const apiUrl = `https://apis-production-145a.up.railway.app/api/todo/${id}`;
  const headers = { Authorization: '8ed65e15-95ee-42a4-96df-492e0aad83ef' };

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    try {
      setIsSaving(true);
      await axios.put(apiUrl, { title: editedTitle, para: editedPara }, { headers });
      setIsEditing(false);
      onSaveSuccess();
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle(title);
    setEditedPara(para);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(apiUrl, { headers });
      onSaveSuccess();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleDeleteCancel = () => console.log('Delete button cancelled');

  return (
    <div className="main">
      <Collapse bordered={false} style={{ width: 500, background: 'none', color: 'red' }}>
        <Panel
          header={
            <div className="mains-btns">
              {isEditing ? (
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  style={{ width: 300, height: 25 }}
                />
              ) : (
                <div className="title">{title}</div>
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
                      <Button shape="round" ghost danger type="primary" icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </>
                )}
              </div>
            </div>
          }
        >
          {isEditing ? (
            <Input.TextArea value={editedPara} onChange={(e) => setEditedPara(e.target.value)} />
          ) : (
            <div id="" style={{ color: '#666666' }}>
              {para}
            </div>
          )}
        </Panel>
      </Collapse>
    </div>
  );
};

export default Tasks;
