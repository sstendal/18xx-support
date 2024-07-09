import React, { useState } from 'react';
import styles from './Save.module.css';
import {useDispatch} from '../../state/useSelector'

const NewGameInput = ({ onSave }) => {
    const [gameName, setGameName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('gameName', gameName)
        if (gameName.trim()) {
            dispatch(onSave(gameName.trim()))
            setGameName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '1.6rem' }}>
            <input
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder="New game name"
                className={styles.input}
            />
            <button type="submit" className={styles.button} onClick={handleSubmit}>
                Save
            </button>
        </form>
    );
};

export default NewGameInput;
