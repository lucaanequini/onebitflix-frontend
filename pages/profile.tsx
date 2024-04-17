import Head from "next/head";
import UserForm from "@/src/components/profile/user";
import HeaderAuth from "@/src/components/common/headerAuth";
import { Container, Row, Col, Button } from "reactstrap";
import { useState } from "react";
import styles from '../styles/profile.module.scss'
import Footer from "@/src/components/common/footer";
import PasswordForm from "@/src/components/profile/password";

const Profile = () => {
    const [form, setForm] = useState('userForm')

    return (
        <>
            <Head>
                <title>OneBitFlix - Meus Dados</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <div className={styles.header}>
                    <HeaderAuth />
                </div>
                <Container className="py-5">
                    <p className={styles.title}>Minha Conta</p>
                    <Row className="pt-3 pb-5">
                        <Col md={4} className={styles.btnColumn}>
                            <Button style={{ color: form === "userForm" ? "#ff0044" : "white" }} className={styles.renderForm}
                                onClick={() => setForm('userForm')}>DADOS PESSOAIS
                            </Button>
                            <Button style={{ color: form === "passwordForm" ? "#ff0044" : "white" }} className={styles.renderForm}
                                onClick={() => setForm('passwordForm')}>SENHA
                            </Button>
                        </Col>
                        <Col md>{form === 'userForm' ? <UserForm /> : <PasswordForm />}</Col>
                    </Row>
                </Container>
                <div className={styles.footer}>
                    <Footer />
                </div>
            </main>
        </>
    )

}

export default Profile