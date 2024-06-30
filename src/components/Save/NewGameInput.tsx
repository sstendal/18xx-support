import React, { useState } from 'react';
import styles from './Save.module.css';

const NewGameInput = ({ onSave }) => {
    const [gameName, setGameName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (gameName.trim()) {
            onSave(gameName.trim());
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
            <button type="submit" className={styles.button}>
                Save
            </button>
        </form>
    );
};

export default NewGameInput;
