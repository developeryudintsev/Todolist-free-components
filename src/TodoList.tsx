import React, {useState} from 'react';
import './App.css';
import {Buttons} from "./components/Buttons";
import {InputButton} from "./components/InputButton";
import {CheckBox} from "./components/CheckBox";

type titleType = {
    key:string
    id:string
    title: string;
    Tasks: Array<arrayType>
    addTask:(todolistId: string,title:string,setTitle:(title: string)=>void,setError:(error:string|null)=>void)=>void
    removeTask: (removeId: string,todolistID:string) => void
    changeFilter: (filterValue: string,todolistId:string) => void
    changeStatus:(isDoneValue:boolean,idValue:string,todolistId:string)=>void
    filter:string
    removeTitleTodolist:(id:string)=>void
  }

type arrayType = {
    id: string;
    title: string;
    isDone: boolean
}

export let TodoList = (props: titleType) => {
    let [title, setTitle] = useState('');
    let [error,setError]=useState()
        return (
        <div>
            <h3 onClick={()=>props.removeTitleTodolist(props.id)}>{props.title}</h3>
            <div>
                <InputButton callBack={()=>props.addTask(props.id,title,setTitle,setError)}
                             title={title}
                             setTitle={setTitle}
                             error={error}
                             setError={setError}
                />
            </div>
            <ul>
                {props.Tasks.map(m =>
                    <li>
                        <Buttons callBack={() => props.removeTask(m.id,props.id)} title={'X'}/>
                        <CheckBox callBack={()=>props.changeStatus(m.isDone,m.id,props.id)} checked={m.isDone}/>
                        <span>{m.title}</span>
                    </li>)}
            </ul>
            <div>
                <Buttons callBack={() => props.changeFilter('All',props.id)} title={'All'} filter={props.filter}/>
                <Buttons callBack={() => props.changeFilter('Active',props.id)} title={'Active'} filter={props.filter}/>
                <Buttons callBack={() => props.changeFilter('Completed',props.id)} title={'Completed'} filter={props.filter}/>
            </div>
        </div>
    )
}