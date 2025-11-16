import React, {useEffect, useState} from 'react'
import styles from './Help.module.css'
import Button from '../Button/Button'

export default function Help() {

    const [open, setOpen] = useState(false)

    function togglePanel() {
        setOpen(!open)
    }

    // Handle ESC key to close panel
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape' && open) {
                setOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open])

    return (
        <>
            <Button className={styles.configButton} onClick={togglePanel}>Help</Button>

            {/* Backdrop/Overlay */}
            {open && <div className={styles.overlay} onClick={togglePanel}/>}

            {/* Slide-out Panel */}
            <div className={`${styles.slidePanel} ${open ? styles.open : ''}`}>
                <div className={styles.innerBorder}>
                    <div className={styles.content}>
                        <h2 className={styles.header}>Help</h2>
                        <div className={styles.list}>
                            <h3>What is this?</h3>
                            <p>
                                18XX support was created as a companion app to the 18XX board games. All 18XX board
                                games
                                involves a lot of money transactions and calculations.
                                This can be both tiresome and slows down the game. This app makes the money transactions
                                a lot
                                easier while not taking focus away from the board game.
                            </p>
                            <h3>Getting started</h3>
                            <p>
                                Use a single computer with a single screen. Place the screen so that all players can see
                                it.
                                You will also need a mouse. You will need a keyboard to configure the
                                game, but you may put it away while playing.
                            </p>
                            <p>
                                All players and companies are represented as boxes on the screen. The number in the
                                boxes are
                                the player's or companies current balance.
                            </p>
                            <p>
                                A transaction from i.e. a player to a company is done like this:
                            </p>
                            <ul>
                                <li>
                                    Use the arrows on the left to adjust the values in the yellow circles until the
                                    correct
                                    amount is displayed in one of them.
                                    You may use the arrow keys and the shift key on a keyboard if you prefer. It is also
                                    possible to type in the amount using the number keys.
                                </li>
                                <li>Select the circle with the correct amount by clicking on it.</li>
                                <li>Click and drag the money from the player to the company.</li>
                            </ul>
                            <p>
                                <a href={'video/18xx-support-demo.mp4'} target="_blank" rel="noreferrer"
                                   className={styles.videoLink}>Demo</a>
                            </p>

                            <h3>The yellow circles and calculations</h3>
                            <p>
                                The yellow circles are numbered from one to ten. When you adjust the values, the number
                                in the
                                first circle increases in steps of one, the second in steps of two, the third in steps
                                of three
                                and so on.
                            </p>
                            <p>
                                If you want to transfer i.e. 6 x 67 from a player to the bank, adjust the values until
                                the first
                                circle shows 67. The sixth circle will show 402 (6 x 67). Click on that circle and drag
                                the
                                money from the player to the bank.
                            </p>

                            <h3>Save</h3>
                            <p>
                                The game is constantly saved to a local storage in your browser. The game will be
                                restored next
                                time you open this page as long as you are using the same browser. This works even if
                                you turn
                                of your computer. However, this is not designed as a safe storage over long
                                time. If you take a break in the game for i.e. several days, take a picture of the
                                screen or
                                write the numbers down on a piece of paper, just like you would have done if this was
                                paper
                                money in a board game.
                            </p>
                            <h3>Payout mode</h3>
                            <p>
                                The Payout button starts a payout mode where you can easily make a payout from a company to all shareholders.
                            </p>
                            <ul>
                                <li>Press the Payout button</li>
                                <li>Click on the company that should make a payout</li>
                                <li>Distribute the shares to the players so that it matches the actual ownership</li>
                                <li>Select the amount pr. share</li>
                                <li>Press "Payout"</li>
                            </ul>
                            <p>
                                The app remembers both share distribution and the last payout from each company to make it easier to repeat the same payout in the next operating round.
                            </p>

                            <h3>Configuration</h3>
                            <p>
                                Press the Edit button to start configuration of a new game. Players can be added or
                                removed, and
                                player names can be changed.
                                The app is by default configured for 1830, but companies can also be changed to fit
                                another
                                game.
                            </p>
                            <h3>About</h3>
                            <p>
                                https://18xx-support.stendal.io is created an maintained by Sigurd Stendal. Bugs and
                                problems
                                can be reported by sending an email to 18xx[at]stendal.io.
                            </p>
                        </div>
                    </div>
                    <div className={styles.buttonRow}>
                        <Button onClick={togglePanel}>Close</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
