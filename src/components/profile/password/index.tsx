import styles from '../../../../styles/profile.module.scss'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

const PasswordForm = () => {
    return (
        <>
            <Form className={styles.form}>
                <div className={styles.formName}>
                    <FormGroup>
                        <Label className={styles.label} for='currentPassword'>SENHA ATUAL</Label>
                        <Input name='currentPassword' type='password' id='currentPassword' placeholder='*********' required
                            minLength={6} maxLength={12} className={styles.input}
                        ></Input>
                    </FormGroup>
                </div>
                <div className={styles.formColumn}>
                    <div className={styles.formFlex}>
                        <FormGroup>
                            <Label className={styles.label} for="newPassword">
                                NOVA SENHA
                            </Label>
                            <Input
                                name="newPassword"
                                type="password"
                                id="newPassword"
                                placeholder="******"
                                required
                                className={styles.inputFlex}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className={styles.label} for="confirmNewPassword">
                                CONFIRMAR NOVA SENHA
                            </Label>
                            <Input
                                name="confirmNewPassword"
                                type="password"
                                id="confirmNewPassword"
                                placeholder="******"
                                required
                                className={styles.inputFlex}
                            />
                        </FormGroup>
                    </div>
                    <Button className={styles.formBtn} type='submit'>Salvar Alterações</Button>
                </div>
            </Form>
        </>
    )
}

export default PasswordForm