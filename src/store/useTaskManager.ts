import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const useTaskManager = () => {
    const [tasks, setTasks] = useLocalStorage('tasks', []);
    const [searchTask, setSearchTask] = useState('');

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const updateTask = (taskId, updatedTask) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, title: updatedTask.title } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    return {
        tasks,
        searchTask,
        addTask,
        updateTask,
        deleteTask,
        setSearchTask,
    };
};
