import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

function App() {
    let [Tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false}
    ])

    const addTask = (title: string,setTitle:(title: string)=>void) => {
        let newTask = {id: v1(), title: title, isDone: true}
        setTasks([newTask, ...Tasks])
        setTitle('')//обнуляем инпут после ввода
    }

    let removeTask = (removeId: string) => {
        console.log(removeId);
        Tasks = Tasks.filter(f => f.id !== removeId);
        setTasks([...Tasks])

    }

    let [filter, setFilter] = useState('All');
    let tasksLayer = Tasks
    if (filter === 'Active') {
        tasksLayer = Tasks.filter(f => f.isDone === false)
    }
    if (filter === 'Completed') {
        tasksLayer = Tasks.filter(f => f.isDone === true)
    }
    const changeFilter = (filterValue: string) => {
        console.log(filterValue)
        setFilter(filterValue)
    }

    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                Tasks={tasksLayer}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
