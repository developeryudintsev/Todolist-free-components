import React, {useState} from 'react';
import './App.css';
import {Buttons} from "./components/Buttons";
import {InputButton} from "./components/InputButton";
import {CheckBox} from "./components/CheckBox";

type titleType = {
    title: string;
    Tasks: Array<arrayType>
    addTask:(title:string,setTitle:(title: string)=>void,setError:(error:string|null)=>void)=>void
    removeTask: (removeId: string) => void
    changeFilter: (filterValue: string) => void
    changeStatus:(isDoneValue:boolean,idValue:string)=>void
    filter:string
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
            <h3>{props.title}</h3>
            <div>
                <InputButton callBack={()=>props.addTask(title,setTitle,setError)}
                             title={title}
                             setTitle={setTitle}
                             error={error}
                             setError={setError}
                />
            </div>
            <ul>
                {props.Tasks.map(m =>
                    <li>
                        <Buttons callBack={() => props.removeTask(m.id)} title={'X'}/>
                        <CheckBox callBack={()=>props.changeStatus(m.isDone,m.id)} checked={m.isDone}/>
                        <span>{m.title}</span>
                    </li>)}
            </ul>
            <div>
                <Buttons callBack={() => props.changeFilter('All')} title={'All'} filter={props.filter}/>
                <Buttons callBack={() => props.changeFilter('Active')} title={'Active'} filter={props.filter}/>
                <Buttons callBack={() => props.changeFilter('Completed')} title={'Completed'} filter={props.filter}/>
            </div>
        </div>
    )
}