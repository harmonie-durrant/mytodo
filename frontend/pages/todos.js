import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const TodoPage = () => {
    const [todos, setTodos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/user/todos', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });
                const status = await response.status;
                if (status == 200) {
                    const todosData = await response.json();
                    setTodos(todosData);
                } else if (status == 401) {
                    router.push('/login');
                } else {
                    console.error('Failed to fetch todos');
                }
            } catch (error) {
                console.error('Error fetching todos', error);
            }
        };
        fetchTodos();
    }, []);

    return (
        <div data-theme="valentine">
            <h1 className='text-6xl font-bold'>Todos</h1>
            <div className='grid grid-cols-3'>
                {
                    todos.map((todo) => (
                        <div className="card w-[450px] bg-base-200 shadow-xl m-4">
                            <div className="card-body">
                                    <h2 className="card-title">
                                        {todo.title}
                                    </h2>
                                    <div className="badge badge-primary">Created : {todo.created_at}</div>
                                    <div className="badge badge-secondary">Due Time: {todo.due_time}</div>
                                    <p>{todo.description}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Status: {todo.status}</button>
                                    </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default TodoPage;
