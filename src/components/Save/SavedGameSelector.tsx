import React from 'react';
import Select from 'react-select';
import styles from './Save.module.css';

interface OptionType {
    value: string;
    label: string;
}

type SavedGame = {
    id: string;
    name: string;
}

type Props = {
    savedGames: SavedGame[];
    onSelect: (id: string) => void;
}

const SavedGameSelector = ({ savedGames, onSelect } : Props) => {
    const options = savedGames.map(game => ({
        value: game.id,
        label: game.name
    }));

    return (
        <form  className={styles.restore}>

            <Select
                options={options}
                classNamePrefix="react-select"
                placeholder="Select a saved game"
                onChange={(selectedOption: OptionType | null) => {
                    if (selectedOption) {
                        onSelect(selectedOption.value);
                    }
                }}
            />
            <button type="submit" className={styles.button}>
                Load
            </button>

        </form>);
};

export default SavedGameSelector;
