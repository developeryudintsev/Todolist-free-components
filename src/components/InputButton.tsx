import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './InputButton.module.css'

type callBackType = {
    callBack: () => void
    title: string
    setTitle: (title: string) => void
    error: string | null
    setError: (error: string | null) => void
}

export const InputButton = (props: callBackType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value);
        props.setError('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.callBack()
        }
    }
    return (
        <div>
            <input
                className={props.title === '' ? styles.error : ''}
                value={props.title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={() => props.callBack()}>+</button>
            {props.error && <div className={styles.errorMessage}>{props.error}</div>}
        </div>
    )
}