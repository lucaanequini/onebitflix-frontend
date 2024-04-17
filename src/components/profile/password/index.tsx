import styles from '../../../../styles/profile.module.scss'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { FormEvent, useEffect, useState } from 'react'
import profileService from '@/src/services/profileService'
import ToastComponent from '../../common/toast'

const PasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [color, setColor] = useState('')
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        profileService.fetchCurrent().then((password) => {
            setCurrentPassword(password.currentPassword)
            setNewPassword(password.newPassword)
        })
    }, [])

    const handlePasswordUpdate = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        if (newPassword !== confirmNewPassword) {
            setToastIsOpen(true)
            setErrorMessage('Senha e confirmação estão diferentes!')
            setColor('bg-danger')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)
            return
        }

        if (currentPassword === newPassword) {
            setToastIsOpen(true)
            setErrorMessage('Não coloque a nova senha igual a antiga!')
            setColor('bg-danger')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)
            return
        }

        const res = await profileService.passwordUpdate({ currentPassword, newPassword })

        if (res === 204) {
            setToastIsOpen(true)
            setErrorMessage('Senha alterada com sucesso!')
            setColor('bg-success')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)

            setCurrentPassword('')
            setNewPassword('')
            setConfirmNewPassword('')
        }

        if (res === 400) {
            setToastIsOpen(true)
            setErrorMessage('Senha atual incorreta!')
            setColor('bg-danger')
            setTimeout(() => {
                setToastIsOpen(false)
            }, 1000 * 3)
        }
    }

    return (
        <>
            <Form onSubmit={handlePasswordUpdate} className={styles.form}>
                <div className={styles.formName}>
                    <FormGroup>
                        <Label className={styles.label} for='currentPassword'>SENHA ATUAL</Label>
                        <Input name='currentPassword' type='password' id='currentPassword' placeholder='*********' required
                            minLength={6} maxLength={12} className={styles.input} value={currentPassword}
                            onChange={(ev) => setCurrentPassword(ev.currentTarget.value)}
                        ></Input>
                    </FormGroup>
                </div>
                <div className={styles.formColumn}>
                    <div className={styles.formFlex}>
                        <FormGroup>
                            <Label className={styles.label} for="newPassword">
                                NOVA SENHA
                            </Label>
                            <Input name="newPassword" type="password" id="newPassword" placeholder="******" required
                                className={styles.inputFlex} value={newPassword}
                                onChange={(ev) => setNewPassword(ev.currentTarget.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className={styles.label} for="confirmNewPassword">
                                CONFIRMAR NOVA SENHA
                            </Label>
                            <Input name="confirmNewPassword" type="password" id="confirmNewPassword" placeholder="******"
                                required className={styles.inputFlex} value={confirmNewPassword}
                                onChange={(ev) => setConfirmNewPassword(ev.currentTarget.value)}
                            />
                        </FormGroup>
                    </div>
                    <Button className={styles.formBtn} type='submit'>Salvar Alterações</Button>
                </div>
            </Form>
            <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage} />
        </>
    )
}

export default PasswordForm