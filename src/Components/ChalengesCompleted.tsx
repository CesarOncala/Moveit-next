import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChalenges.module.css'

export function ChalengeCompleted() {
    
    const { challengeCompleted } = useContext(challengesContext);
    
    return (
        <div className={styles.completedChallengesContainer}>
                <span>Desafios Completos</span>
                <span>{challengeCompleted}</span>
        </div>

    );
}