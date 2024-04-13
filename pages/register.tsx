import styles from '../styles/registerLogin.module.scss'
import Head from 'next/head'
import HeaderGeneric from '@/src/components/common/headerGeneric'
import { Form, FormGroup, Label, Container, Button, Input } from 'reactstrap'
import Footer from '@/src/components/common/footer'
import ToastComponent from '@/src/components/common/toast'
import { FormEvent } from 'react'
import authService from '@/src/services/authService'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Register = () => {
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const router = useRouter()
    const handleRegister = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)
        const firstName = formData.get('firstName')!.toString()
        const lastName = formData.get('lastName')!.toString()
        const phone = formData.get('phone')!.toString()
        const birth = formData.get('birth')!.toString()
        const email = formData.get('email')!.toString()
        const password = formData.get('password')!.toString()
        const confirmPassword = formData.get('confirmPassword')!.toString()
        const params = { firstName, lastName, phone, birth, email, password }

        if (password !== confirmPassword) {
            setToastIsOpen(true)
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)
            setToastMessage('Senha e confirmação diferentes.')
        }

        const { data, status } = await authService.getRegisterParams(params)

        if (status === 201) {
            router.push('/login?registred=true')
        } else {
            setToastIsOpen(true)
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)
            setToastMessage(data.message)
        }
    }

    return (
        <>
            <Head>
                <title>OneBitFlix - Registro</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
                <script src="https://jsuites.net/v4/jsuites.js"></script>
            </Head>
            <main className={styles.main}>
                <HeaderGeneric logoUrl='/' btnUrl='/login' btnContent='Quero fazer login'></HeaderGeneric>
                <Container className='py-5'>
                    <p className={styles.formTitle}>Bem-vindo(a) ao OneBitFlix!</p>
                    <Form className={styles.form} onSubmit={handleRegister}>
                        <p className='text-center'><strong>Faça a sua conta</strong></p>
                        <FormGroup>
                            <Label for="lastName" className={styles.label}>NOME</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                className={styles.inputName}
                                placeholder='Digite seu nome'
                                required
                                maxLength={20}
                            >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName" className={styles.label}>SOBRENOME</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                className={styles.inputName}
                                placeholder='Digite seu sobrenome'
                                required
                                maxLength={20}
                            >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone" className={styles.label}>WHATSAPP / TELEGRAM</Label>
                            <Input
                                id="phone"
                                name="phone"
                                className={styles.input}
                                placeholder='(XX) 9XXXX-XXXX'
                                data-mask="[-]+55 (00) 00000-0000"
                                required
                            >
                            </Input>
                        </FormGroup>
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
                            <Label for="birth" className={styles.label}>DATA DE NASCIMENTO</Label>
                            <Input
                                id="birth"
                                name="birth"
                                type='date'
                                className={styles.input}
                                required
                                maxLength={20}
                                min='1930-01-01'
                                max='2015-12-31'
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
                                placeholder='Digite sua senha (Min: 6 | Max: 20)'
                                required
                                minLength={6}
                                maxLength={20}
                            >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword" className={styles.label}>CONFIRME SUA SENHA</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type='password'
                                className={styles.input}
                                placeholder='Confirme sua senha'
                                required
                                minLength={6}
                                maxLength={20}
                            >
                            </Input>
                        </FormGroup>
                        <Button type='submit' outline className={styles.formBtn}>CADASTRAR</Button>
                    </Form>
                </Container>
                <Footer />
                <ToastComponent color='bg-danger' isOpen={toastIsOpen} message={toastMessage}></ToastComponent>
            </main >
        </>
    )
}

export default Register