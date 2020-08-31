import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton,  Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
export type FilterValuesType = "all" | "active" | "completed";

function App() {

    type TodoListType = {
        id: string;
        title: string;
        filter: FilterValuesType;
    }

    type TaskStateType = {
        [key: string]: Array<TaskType>
    }
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to Learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TaskStateType>(
        {
            [todoListId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
            ],
            [todoListId2]: [
                {id: v1(), title: "SaSS", isDone: true},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ]
        }
    )
    const changeTaskTitle=(taskID: string, newTitle: string, todoListId: string)=>{
             let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(f => f.id === taskID);
        if (task) {
            task.title = newTitle;
            console.log(todoListId)//
            setTasks({...tasks})
        }
    }

    function removeTodolist(todoListId: string) {
        delete tasks[todoListId];
        setTasks({...tasks})
        setTodolists(todolists.filter(f => f.id !== todoListId))
    }
    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = todoListTasks.filter(f => f.id !== id);
        setTasks({...tasks});
    }
    const addTask = (title: string, todoListId: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks});
    }
    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todolists.find(f => f.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodolists([...todolists])
        }
    }
    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(f => f.id === id);
        if (task) {
            task.isDone = !isDone;
            setTasks({...tasks})
        }
    }

    function addTodoList(title: string) {
        let newTodoListId = v1();
        let newTodoList: TodoListType = {
            id:newTodoListId,
            title:title,
            filter:'all'
        }
        setTodolists([...todolists,newTodoList]);
        setTasks({
            ...tasks,[newTodoListId]:[]
        })
    }

    function cgangeTodolistTitle(todoListId:string,newTitle:string) {
let todolist=todolists.find(f=>f.id===todoListId);
if(todolist){
    todolist.title=newTitle;
    setTodolists([...todolists]);
}
    }

    return <div className="App">
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start"  color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        <Container >
            <Grid spacing={0} container style={{padding:'30px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
        {
            todolists.map(m => {
                let tasksForTodolist = tasks[m.id];
                if (m.filter === "active") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                }
                return (
                <Grid item>
                    <p></p>
                    <Paper style={{padding:'20px'}}>
                    <Todolist
                        key={m.id}
                        id={m.id}
                        title={m.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={m.filter}
                        deleteTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        cgangeTodolistTitle={cgangeTodolistTitle}
                    />
                    </Paper>
                </Grid>
                )
            })
        }
            </Grid>
        </Container>

    </div>;
}

export default App;
