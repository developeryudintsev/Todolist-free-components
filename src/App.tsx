import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

function App() {
    let todolistId1Task = v1();
    let todolistId2Task = v1();
    let [Tasks, setTasks] = useState({
        [todolistId1Task]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todolistId2Task]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false}
        ]
    })
    let [todolists, setTodolists] = useState([
        {
            id: todolistId1Task,
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: todolistId2Task,
            title: 'What to buy',
            filter: 'all'
        }
    ])
    function removeTitleTodolist(id:string){
        console.log(id)
        todolists=todolists.filter(f=>f.id!==id);
        setTodolists([...todolists])
    }
    const addTask = (todolistId: string, title: string, setTitle: (title: any) => void, setError: (error: string | null) => void) => {
        if (title.trim() !== '') {
            let newTask = {id: v1(), title: title, isDone: true}
            let todolistTasks=Tasks[todolistId];
            let addTaskNew=[newTask,...todolistTasks];
            Tasks[todolistId]=addTaskNew
            setTasks({...Tasks})
            setTitle('')//обнуляем инпут после ввода
        } else {
            setError('Title is required')
        }

    }
    let removeTask = (removeId: string,todolistID:string) => {
        let removeTaskId=Tasks[todolistID]
        console.log(removeTaskId)
        Tasks[todolistID]=removeTaskId.filter(f=>f.id!==removeId)
        setTasks({...Tasks})
    }

    const changeFilter = (filterValue: string, todolistId: string) => {
        let filterF = todolists.find(f => f.id === todolistId);
        if (filterF) {
            filterF.filter = filterValue;
            setTodolists([...todolists])
        }
    }
    const changeStatus = (isDoneValue: boolean, idValue: string,todolistId:string) => {
        let changeStatysId=Tasks[todolistId];
        let newTasks = changeStatysId.find(f => f.id === idValue);
        if (newTasks) {
            newTasks.isDone = !isDoneValue;
            setTasks({...Tasks})
        }
    }

    return (
        <div className="App">
            {todolists.map(m => {
                let tasksLayer = Tasks[m.id]
                if (m.filter === 'Active') {
                    tasksLayer = Tasks[m.id].filter(f => f.isDone === false)
                }
                if (m.filter === 'Completed') {
                    tasksLayer = Tasks[m.id].filter(f => f.isDone === true)
                }

                return (
                    <TodoList
                        key={m.id}
                        id={m.id}
                        title={m.title}
                        Tasks={tasksLayer}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        addTask={addTask}
                        filter={m.filter}
                        removeTitleTodolist={removeTitleTodolist}
                    />
                )
            })}

        </div>
    );
}

export default App;
