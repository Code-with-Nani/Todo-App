import React, { useEffect, useState } from "react";
import img from "../assests/checklist.png"
import img2 from "../assests/more.png"
import img3 from "../assests/trash.png"

const Home = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    return storedTodos ? storedTodos.map(todo => ({ ...todo, checked: false })) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = () => {
    if (input.trim() !== "") {
      setTodos([...todos, { text: input, checked: false }]);
    }
    setInput("");
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

  const handleCheckboxToggle = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col sm:justify-center justify-normal  items-center select-none overflow-hidden">
      <div className="flex justify-center items-center py-2">
        <h1 className="text-6xl hi text-white font-[700]">TODOS</h1>
      </div>

      <div className="pt-4 pb-1 flex items-center justify-center gap-3 sm:-translate-x-48 -translate-x-28">
        <h2 className="text-white bye text-4xl tracking-tight">Todolist</h2>
        <span className="icon text-white translate-y-1"><img className="h-8 invert" src={img} alt="" /></span>
      </div>

      <div className="w-full overflow-hidden pt-2 pb-4 flex items-center justify-center gap-3 sm:gap-0 ">
        <input
          className="placeholder-black helow translate-x-3 translate-y-[1px] sm:translate-x-0 outline-none px-3 py-1 rounded-lg border-2 border-black bg-gray-100 w-80 sm:w-[30rem] placeholder mr-2"
          type="text"
          placeholder="Add a new todo"
          value={input}
          onChange={handleInput}
        />
        <button
          onClick={handleAdd}
          className="overflow-hidden rounded-lg"
        >
          <img className="h-10 sm:h-8 object-cover bg-gray-100 rounded-xl" src={img2} alt="" />
        </button>
      </div>

      <div className="line h-[2px]  sm:w-[520px] w-[400px] bg-white mt-2"></div>

      <div className="w-full pt-2 overflow-hidden">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-center mx-5 pb-1 gap-2 " >
            <label className="custom-checkbox">
              <input
                name="dummy"
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleCheckboxToggle(index)}
              />
              <span className="checkmark"></span>
            </label>
            <div className={`text-white -translate-x-2 sm:w-[430px] w-[420px] helow overflow-hidden ${todo.checked ? "line-through" : ""}`} >
              {todo.text}
            </div>
            <button
              onClick={() => handleDelete(index)}
              className="rounded-lg -translate-x-2 sm:translate-x-1"
            >
              <img className="h-9 translate-y-[1px] sm:h-8 object-cover invert" src={img3} alt="" />
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Home;
