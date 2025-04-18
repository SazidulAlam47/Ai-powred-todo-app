const Todo = ({ todo, onDelete }) => {
    return (
        <li className="flex justify-between items-center bg-gray-50 p-3 my-2 rounded shadow-sm">
            <span>{todo.text}</span>
            <button
                onClick={() => onDelete(todo.id)}
                className="text-red-500 hover:text-red-700"
            >
                Delete
            </button>
        </li>
    );
};

export default Todo;
