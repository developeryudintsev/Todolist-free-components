import React from 'react';

type ButtonsType={
    callBack:()=>void
    title:string
}

export const Buttons=(props:ButtonsType)=>{
    return(
        <button onClick={props.callBack}>{props.title}</button>
    )
}