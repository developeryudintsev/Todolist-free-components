import React, {ChangeEvent,KeyboardEvent, useState} from 'react';

type callBackType = {
    callBack: () => void
    title: string
    setTitle: (title: string) => void
}

export const InputButton = (props: callBackType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{
        if (e.charCode === 13) {
            props.callBack()
        }
    }
    return (
        <div>
            <input
                value={props.title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={() => props.callBack()}>+</button>
        </div>
    )
}