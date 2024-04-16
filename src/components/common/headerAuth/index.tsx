import styles from './styles.module.scss'
import Link from "next/link"
import { Container, Form, Input } from "reactstrap"
import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import profileService from '@/src/services/profileService'

Modal.setAppElement('#__next')

const HeaderAuth = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [initials, setInitials] = useState('')

    useEffect(() => {
        profileService.fetchCurrent().then((user) => {
            const firstNameInitial = user.firstName.slice(0, 1)
            const lastNameInitial = user.lastName.slice(0, 1)
            setInitials(firstNameInitial + lastNameInitial)
        })
    }, [])

    const router = useRouter()

    const handleOpenModal = () => {
        setModalIsOpen(true)
    }

    const handleCloseModal = () => {
        setModalIsOpen(false)
    }

    const handleLogout = () => {
        sessionStorage.clear()
        router.push('/')
    }

    return (
        <>
            <Container className={styles.nav}>
                <Link href='/home'>
                    <img src="/logoOnebitflix.svg" alt="logoOnebitflix" className={styles.imgNav} />
                </Link>
                <div className='d-flex align-items-center'>
                    <Form>
                        <Input name='search' type='search' placeholder='Pesquisar' className={styles.input}></Input>
                    </Form>
                    <img src="/homeAuth/iconSearch.svg" alt="searchImg" className={styles.searchImg} />
                    <p className={styles.userProfile} onClick={handleOpenModal}>{initials}</p>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleCloseModal}
                    shouldCloseOnEsc={true}
                    className={styles.modal}
                    overlayClassName={styles.overlayModal}
                >
                    <Link className={styles.link} href='/profile'><p className={styles.modalLink}>Meus Dados</p></Link>
                    <p className={styles.modalLink} onClick={handleLogout}>Sair</p>
                </Modal>
            </Container>
        </>
    )
}

export default HeaderAuth