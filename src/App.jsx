import { CopilotPopup } from "@copilotkit/react-ui";
import { useState } from "react";
import Todo from "./components/Todo";
import { useCopilotAction } from "@copilotkit/react-core";
import { RxCross2 } from "react-icons/rx";
import Header from "./components/header";

const App = () => {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);

    console.log(todos);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(task);
    };

    const addTodo = (task) => {
        if (task.trim()) {
            const newTodos = [
                ...todos,
                { id: Date.now(), text: task, completed: false },
            ];
            setTodos(newTodos);
            setTask("");
        }
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const completeTodo = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    // Define Copilot action
    useCopilotAction({
        name: "addTodoItem",
        description: "Add a new todo item to the list",
        parameters: [
            {
                name: "todoText",
                type: "string",
                description: "The text of the todo item to add",
                required: true,
            },
        ],
        handler: async ({ todoText }) => {
            addTodo(todoText);
        },
    });

    useCopilotAction({
        name: "deleteTodoItem",
        description:
            "Delete a todo item by ID, text, serial number, or keyword in text",
        parameters: [
            {
                name: "id",
                type: "number",
                description: "The id of the todo item to delete (optional)",
                required: false,
            },
            {
                name: "text",
                type: "string",
                description:
                    "The exact text of the todo item to delete (optional)",
                required: false,
            },
            {
                name: "index",
                type: "number",
                description:
                    "The serial number (1-based) of the todo item to delete (optional)",
                required: false,
            },
            {
                name: "contains",
                type: "string",
                description:
                    "Delete any todo that contains this text (case-insensitive, optional)",
                required: false,
            },
        ],
        handler: async ({ id, text, index, contains }) => {
            if (id) {
                deleteTodo(id);
            } else if (text) {
                const todo = todos.find(
                    (t) => t.text.toLowerCase() === text.toLowerCase()
                );
                if (todo) {
                    deleteTodo(todo.id);
                }
            } else if (index && index > 0 && index <= todos.length) {
                const todo = todos[index - 1];
                deleteTodo(todo.id);
            } else if (contains) {
                const matchingTodos = todos.filter((t) =>
                    t.text.toLowerCase().includes(contains.toLowerCase())
                );
                matchingTodos.forEach((t) => deleteTodo(t.id));
            }
        },
    });

    useCopilotAction({
        name: "completeTodoItem",
        description:
            "Mark a todo item as completed or incomplete by ID, text, serial number, or keyword in text",
        parameters: [
            {
                name: "id",
                type: "number",
                description:
                    "The ID of the todo item to toggle completion (optional)",
                required: false,
            },
            {
                name: "text",
                type: "string",
                description:
                    "The exact text of the todo item to toggle completion (optional)",
                required: false,
            },
            {
                name: "index",
                type: "number",
                description:
                    "The serial number (1-based) of the todo item to toggle completion (optional)",
                required: false,
            },
            {
                name: "contains",
                type: "string",
                description:
                    "Toggle completion for any todo that contains this text (case-insensitive, optional)",
                required: false,
            },
        ],
        handler: async ({ id, text, index, contains }) => {
            if (id) {
                completeTodo(id);
            } else if (text) {
                const todo = todos.find(
                    (t) => t.text.toLowerCase() === text.toLowerCase()
                );
                if (todo) {
                    completeTodo(todo.id);
                }
            } else if (index && index > 0 && index <= todos.length) {
                const todo = todos[index - 1];
                completeTodo(todo.id);
            } else if (contains) {
                const matchingTodos = todos.filter((t) =>
                    t.text.toLowerCase().includes(contains.toLowerCase())
                );
                matchingTodos.forEach((t) => completeTodo(t.id));
            }
        },
    });

    return (
        <div>
            <CopilotPopup
                instructions={
                    "You are an intelligent assistant for a Todo app. Help the user manage their tasks effectively by providing suggestions, answering questions, and assisting with adding or deleting tasks. Be concise and user-friendly in your responses."
                }
                labels={{
                    title: "Todo Assistant",
                    initial: "Need any help?",
                }}
                Header={Header}
            />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-1 text-center">
                        Todo App
                    </h1>
                    <p className="text-center mb-5">
                        Use the chat to add or remove todo with Ai.
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row mb-4 gap-2"
                    >
                        <input
                            type="text"
                            className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none"
                            placeholder="Add a new task"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
                        >
                            Add
                        </button>
                    </form>
                    <ul>
                        {todos.map((todo) => (
                            <Todo
                                key={todo.id}
                                todo={todo}
                                onDelete={deleteTodo}
                                onToggle={completeTodo}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default App;
