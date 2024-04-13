import styles from '../styles/registerLogin.module.scss'
import Head from 'next/head'
import HeaderGeneric from '@/src/components/common/headerGeneric'
import { Form, FormGroup, Label, Container, Button, Input } from 'reactstrap'
import Footer from '@/src/components/common/footer'
import ToastComponent from '@/src/components/common/toast'
import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import authService from '@/src/services/authService'
import { useEffect } from 'react'


const Login = () => {
    const [toastColor, setToastColor] = useState("")
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState("")

    const router = useRouter()

    useEffect(() => {
        const registerSucess = router.query.registred
        if (registerSucess === "true") {
            setToastColor("bg-success");
            setToastIsOpen(true);
            setTimeout(() => {
                setToastIsOpen(false);
            }, 1000 * 3);
            setToastMessage("Cadastro feito com sucesso!");
        }
    }, [router.query]);

    const handleLogin = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const formData = new FormData(ev.currentTarget)
        const email = formData.get("email")!.toString()
        const password = formData.get("password")!.toString()
        const params = { email, password }

        const { status } = await authService.getLoginParams(params);
        if (status === 200) {
            router.push('/home')
        } else {
            setToastColor("bg-danger");
            setToastIsOpen(true);
            setTimeout(() => {
                setToastIsOpen(false);
            }, 1000 * 3);
            setToastMessage("Email ou senha incorretos!");
        }

    }

    return (
        <>
            <Head>
                <title>OneBitFlix - Login</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <HeaderGeneric logoUrl='/' btnUrl='/register' btnContent='Quero fazer parte'></HeaderGeneric>
                <Container className='py-5'>
                    <p className={styles.formTitle}>Bem-vindo(a) de volta!</p>
                    <Form className={styles.form} onSubmit={handleLogin}>
                        <p className='text-center'><strong>Faça login com sua conta</strong></p>
                        <FormGroup>
                            <Label for="email" className={styles.label}>E-MAIL</Label>
                            <Input
                                id="email"
                                name="email"
                                type='email'
                                className={styles.input}
                                placeholder='Digite seu e-mail'
                                required
                                maxLength={20}
                            >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" className={styles.label}>SENHA</Label>
                            <Input
                                id="password"
                                name="password"
                                type='password'
                                className={styles.input}
                                placeholder='Digite sua senha'
                                required
                                minLength={6}
                                maxLength={20}
                            >
                            </Input>
                        </FormGroup>
                        <Button type='submit' outline className={styles.formBtn}>FAZER LOGIN</Button>
                    </Form>
                    <ToastComponent color={toastColor} isOpen={toastIsOpen} message={toastMessage}></ToastComponent>
                </Container>
                <Footer />

            </main>
        </>
    )
}

export default Login