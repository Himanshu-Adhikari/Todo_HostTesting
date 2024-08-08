import React from "react";
const API_BASE ='http://localhost:5000/todo';

// const API_BASE = import.meta.env.VITE_API_BASE;

function TodoItem(props) {
  const { name, id, complete, setItems } = props;

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete a task");
      }

      const data = await response.json();
      setItems((items) => items.filter((item) => item._id !== data._id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ complete: true }),
      });

      if (!response.ok) {
        throw new Error("Failed to update a task");
      }

      const data = await response.json();
      setItems((items) =>
        items.map((item) => (item._id === data._id ? data : item))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className={"todo" + (complete ? " check-complete" : "")} key={id}>
      <div
        className="checkbox"
        onClick={() => {
          updateTodo(id);
        }}
      ></div>
      <div className="text">{name}</div>
      <div className="delete-todo" onClick={() => deleteTodo(id)}>
        <span>X</span>
      </div>
    </div>
  );
}

export default TodoItem;
