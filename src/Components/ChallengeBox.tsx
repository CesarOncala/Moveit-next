import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {

    const { activeChallenge, resetChallenge, completeChallenge} = useContext(challengesContext);
    const {resetCountdown} = useContext(CountdownContext);

    function handleChallengeCompleted (){
        completeChallenge();
        resetCountdown();
    }
    function handleChallengeFailed (){
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>

            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo  desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengedCompletedBtn}
                            onClick = {handleChallengeCompleted}
                        >   Completei
                        </button>
                        <button
                            type="button"
                            className={styles.challengeFailedBtn}
                            onClick={handleChallengeFailed}
                           >
                              Falhei
                         </button>
                    </footer>


                </div>
            ) : (

                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para obter desafios</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up" />
                    Avance de Level Completando Este Desafio
                    </p>
                </div>

            )}
        </div>



    );
}