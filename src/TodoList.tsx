import React, {useState} from 'react';
import './App.css';
import {Buttons} from "./components/Buttons";
import {InputButton} from "./components/InputButton";

type titleType = {
    title: string;
    Tasks: Array<arrayType>
    addTask:(title:string,setTitle:(title: string)=>void)=>void
    removeTask: (removeId: string) => void
    changeFilter: (filterValue: string) => void
  }

type arrayType = {
    id: string;
    title: string;
    isDone: boolean
}

export let TodoList = (props: titleType) => {
    let [title, setTitle] = useState('');
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <InputButton callBack={()=>props.addTask(title,setTitle)} title={title} setTitle={setTitle}/>
            </div>
            <ul>
                {props.Tasks.map(m =>
                    <li>
                        <Buttons callBack={() => props.removeTask(m.id)} title={'X'}/>
                        <input type="checkbox" checked={m.isDone}/>
                        <span>{m.title}</span>
                    </li>)}
            </ul>
            <div>
                <Buttons callBack={() => props.changeFilter('All')} title={'All'}/>
                <Buttons callBack={() => props.changeFilter('Active')} title={'Active'}/>
                <Buttons callBack={() => props.changeFilter('Completed')} title={'Completed'}/>
            </div>
        </div>
    )
}