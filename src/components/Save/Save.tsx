import React, {useEffect} from 'react'
import styles from './Save.module.css'
import {useDispatch} from 'react-redux'
import {startSave, stopSave} from '../../state/actions'
import {useSelector} from '../../state/useSelector'
import SavedGameSelector from './SavedGameSelector'
import NewGameInput from './NewGameInput'
import {useSession} from '../Session/Session'
import netlifyIdentity from 'netlify-identity-widget'

export default function Save() {

    const {user, login, logout} = useSession()
    const save = useSelector(state => state.save)
    const dispatch = useDispatch()

    function toggle() {
        if (save) {
            dispatch(stopSave())
        } else {
            dispatch(startSave())
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && save) {
                dispatch(stopSave())
                netlifyIdentity.close()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [save, dispatch])


    return (
        <>
            <button className={styles.saveButton} onClick={toggle}>Save</button>
            {save && (
                <div className={styles.frame}>
                    <button className={styles.closeButton} onClick={() => dispatch(stopSave())}>
                        <span className={styles.closeIcon}>X</span>
                    </button>
                    <div>
                        <h2>Save</h2>
                        <p>
                            Save or restore your game for backup or to play on another device.
                        </p>
                        {!user &&
                            <>
                                <div className={styles.section}>
                                    <p>
                                        Save the current game
                                    </p>
                                    <NewGameInput onSave={() => {
                                    }}/>
                                </div>
                                <div className={styles.section}>
                                    <p>
                                        Restore a saved game
                                    </p>
                                    <SavedGameSelector
                                        savedGames={[
                                            {id: '1', name: 'Game 1'},
                                            {id: '2', name: 'Game 2'},
                                            {id: '3', name: 'Game 3'}
                                        ]}
                                        onSelect={() => {
                                        }}
                                    />
                                </div>
                                <p>
                                    You are logged in as {user.user_metadata?.full_name || user.email}
                                </p>
                                <div className={styles.section}>
                                    <button className={styles.button} onClick={logout}>Log out</button>
                                </div>
                            </>
                        }
                        {!user && (
                            <div className={styles.section}>
                                <p>
                                You must be logged in to save your game in the cloud.
                                </p>
                                <button className={styles.button} onClick={login}>Log in</button>
                            </div>
                        )}
                    </div>
                    {user &&
                        <div className={styles.bottom}>
                            <p className={styles.explanation}>
                                The game is continously saved in your browser while you are playing.
                                However, if you want to access the game from another
                                device, keep this game while playing another game, or just want a backup, you may save
                                the
                                game in
                                the cloud.
                            </p>
                        </div>
                    }
                    {!user &&
                        <div className={styles.bottom}>
                            <p className={styles.explanation}>
                                Logging in is completely optional. You can still use the app without an account.
                            </p>
                            <p className={styles.explanation}>
                                The game is continously saved in your browser
                                while you are playing.
                                However, if you want to access the game from another
                                device, keep this game while playing another game, or just want a backup, you may
                                save the game in the cloud.
                            </p>
                            <p className={styles.explanation}>
                                You can create an account for free. Your email address and
                                personal information will only be used to save and restore games, and will not be
                                shared with anyone.
                            </p>
                        </div>
                    }
                </div>
            )}
        </>
    )

}

