import { useContext } from 'react'
import { challengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/LVLUPModal.module.css'

export function LevelUpModal(){

    const {level, closeLVLUpModal} = useContext(challengesContext)
    return (
            <div className={styles.overlay}>
                <div className={styles.container}>
                    <header>{level}</header>
                    <strong>Parabéns</strong>
                    <p>Você alcançou mais um Level!</p>

                    <button type="button" 
                        onClick={closeLVLUpModal}
                    >
                         <img src="/icons/close.svg" alt="Fechar Modal" />
                    </button>
                </div>
            </div>
    )
}