import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(challengesContext);

    return (
        <div  className={styles.profileContainer}>
                <img alt='César Henrique Alves Oncala' src="https://avatars.githubusercontent.com/u/52250904?v=4"/>
            <div>
                <strong>César Henrique Alves Oncala</strong>
                <p>
                    <img  src="icons/level.svg" alt="Level" />
                      Level  {level} 
                </p>
            </div>
        </div>
    )
}