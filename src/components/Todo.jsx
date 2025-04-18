import { FaRegTrashAlt } from "react-icons/fa";

const Todo = ({ todo, onDelete, onToggle }) => {
    return (
        <li className="flex justify-between items-center bg-gray-50 p-3 my-2 rounded shadow-sm">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="mr-3 cursor-pointer inline-block"
            />
            <span className={`grow ${todo.completed ? "line-through" : ""}`}>
                {todo.text}
            </span>
            <button
                onClick={() => onDelete(todo.id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
            >
                <FaRegTrashAlt size={20} />
            </button>
        </li>
    );
};

export default Todo;
