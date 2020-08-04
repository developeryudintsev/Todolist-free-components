import React from 'react';
import styles from './Buttons.module.css'

type ButtonsType={
    callBack:()=>void
    title:string
    filter?:string
}

export const Buttons=(props:ButtonsType)=>{
    return(
        <button className={props.filter===props.title?styles.activeFilter:''} onClick={props.callBack}>{props.title}</button>
    )
}