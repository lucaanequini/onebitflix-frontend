import styles from '../../../../styles/profile.module.scss'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useState, useEffect, FormEvent, FormHTMLAttributes } from 'react'
import profileService from '@/src/services/profileService'
import ToastComponent from '../../common/toast'
import { useRouter } from 'next/router'

const UserForm = () => {
    const router = useRouter()
    const [color, setColor] = useState('')
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [initialEmail, setInitialEmail] = useState('')
    const [createdAt, setCreatedAt] = useState('')

    const date = new Date(createdAt)
    const month = date.toLocaleDateString('default', { month: 'long' })

    useEffect(() => {
        profileService.fetchCurrent().then((user) => {
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setPhone(user.phone)
            setEmail(user.email)
            setInitialEmail(user.email)
            setCreatedAt(user.createdAt)
        })
    }, [])

    const handleUserUpdate = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const res = await profileService.userUpdate({ firstName, lastName, phone, email, createdAt })
        if (res === 200) {
            setToastIsOpen(true)
            setErrorMessage('Informações alteradas com sucesso!')
            setColor('bg-success')
            setTimeout(() => setToastIsOpen(false), 1000 * 3)
            if (email !== initialEmail) {
                sessionStorage.clear()
                router.push(('/'))
            }
        } else {
            setToastIsOpen(true)
            setErrorMessage('Você não pode mudar para esse email')
            setColor('bg-danger')
            setTimeout(() => setToastIsOpen(false), 1000 * 3)
        }
    }

    return (
        <>
            <Form className={styles.form} onSubmit={handleUserUpdate}>
                <div className={styles.formName}>
                    <p className={styles.nameAbbreviation}>{firstName.slice(0, 1)}{lastName.slice(0, 1)}</p>
                    <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
                </div>
                <div className={styles.memberTime}>
                    <img src="/profile/iconUserAccount.svg" alt="userIcon" className={styles.memberTimeImg} />
                    <p className={styles.memberTimeText}>Membro desde <br />{`${date.getDate()} de ${month} de ${date.getFullYear()}`}</p>
                </div>
                <hr />
                <div className={styles.formFlex}>
                    <FormGroup>
                        <Label className={styles.label} for='firstName'>NOME</Label>
                        <Input name='firstName' type='text' id='firstName' placeholder='Qual o seu primeiro nome?'
                            required maxLength={20} className={styles.inputFlex} value={firstName}
                            onChange={(ev) => setFirstName(ev.target.value)}>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label className={styles.label} for='lastName'>SOBRENOME</Label>
                        <Input name='lastName' type='text' id='lastName' placeholder='Qual o seu último nome?'
                            required maxLength={20} className={styles.inputFlex} value={lastName}
                            onChange={(ev) => setLastName(ev.target.value)}>
                        </Input>
                    </FormGroup>
                </div>
                <div className={styles.formColumn}>
                    <FormGroup>
                        <Label className={styles.label} for='phone'>WHATSAPP / TELEGRAM</Label>
                        <Input name='phone' type='text' id='phone' placeholder='(XX) 9XXXX-XXXX'
                            required className={styles.input} value={phone}
                            onChange={(ev) => setPhone(ev.target.value)}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className={styles.label}>EMAIL</Label>
                        <Input name='email' type='text' id='email' placeholder='Coloque o seu email'
                            required maxLength={40} className={styles.input} value={email}
                            onChange={(ev) => setEmail(ev.target.value)}>
                        </Input>
                    </FormGroup>

                    <Button className={styles.formBtn} type='submit'>Salvar Alterações</Button>
                </div>
            </Form >
            <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage} />
        </>
    )
}

export default UserForm