import create from 'zustand';
import {ITask} from "@/utils/Task";


interface TaskManagerState {
    tasks: ITask[];
    searchTask: string;
    setSearchTask: (search: string) => void;
    addTask: (task: ITask) => void;
    updateTask: (taskId: number, updatedTask: { title: string }) => void;
    deleteTask: (taskId: number) => void;
}

export const useTaskManager = create<TaskManagerState>((set) => ({
    tasks: [],
    searchTask: '',
    setSearchTask: (search) => set({ searchTask: search }),
    addTask: (task) =>
        set((state) => ({
            tasks: [...state.tasks, task],
        })),
    updateTask: (taskId, updatedTask) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
            ),
        })),
    deleteTask: (taskId) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
}));