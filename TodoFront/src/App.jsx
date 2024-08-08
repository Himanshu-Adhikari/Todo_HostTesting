import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const API_BASE = import.meta.env.VITE_API_BASE;

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const GetTodos = () => {
    fetch(`${API_BASE}/todo`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  };

  const addItem = async () => {
    try {
      const response = await fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: input,
          complete: false,
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add a task");
      }

      const data = await response.json();
      console.log(data);
      await GetTodos();
      setInput('');
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>TO-DO-APP</h1>
      </div>

      <div className="form">
        <input type='text' value={input} onChange={handleChange} />
        <button onClick={addItem}>
          <span>ADD</span>
        </button>
      </div>

      <div className="todolist">
        {items.map((item) => {
          const { _id, name, complete } = item;
          return <TodoItem key={_id} name={name} id={_id} complete={complete} setItems={setItems} />;
        })}
      </div>
    </div>
  );
}

export default App;
