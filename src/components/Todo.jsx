import "./Todo.css";
import { useState } from "react";
import { Button, Input, message } from "antd";
import axios from "axios";

const Todo = ({onSaveSuccess}) => {
  const create = import.meta.env.VITE_CREATE;
  const header = import.meta.env.VITE_HEADER;
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = async () => {
    try {
      // Validate if both title and description are entered
      if (!title && !description) {
        message.error("Please enter both Title and Description.");
        return;
      }
      if(!title){
        message.error("Please enter Title");
        return;
      }
      if(!description){
        message.error("Please enter Description");
        return;
      }


      // Set loading to true
      setLoading(true);

      // Make a POST request to the API endpoint with the input data
      await axios.post(
        create,
        {
          title,
          para: description,
        },
        {
          headers: {
            Authorization: header,
          },
        }
      );

      // Display success message
      message.success("Todo added successfully.");

      // Clear the input fields
      setTitle("");
      setDescription("");

      // Call the parent component's onSaveSuccess after successfully adding a todo
      onSaveSuccess();
    } catch (error) {
      message.error("Error adding todo. Please try again.",error);
    } finally {
      // Set loading to false after a delay
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="manager">
      <div className="add-todo">
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
        style={{
          backgroundColor: "#FF8A33",
          borderColor: "#FF8A33",
          marginRight: 5,
        }}
        onClick={handleAddTodo}
      >
        Add
      </Button>
    </div>
  );
};

export default Todo;
