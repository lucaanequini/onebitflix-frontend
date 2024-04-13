import styles from './styles.module.scss'
import { Container } from 'reactstrap'

const Footer = () => {
    return (
        <>
            <Container className={styles.footer}>
                <img src="/logoOnebitcode.svg" alt="logoFooter" className={styles.footerImg} />
                <a href="http://onebitcode.com" target={'blank'} className={styles.footerLink}>ONEBITCODE.COM</a>
            </Container>
        </>
    )
}

export default Footer