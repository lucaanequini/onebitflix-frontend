import styles from '../../../../styles/profile.module.scss'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

const UserForm = () => {
    return (
        <>
            <Form className={styles.form}>
                <div className={styles.formName}>
                    <p className={styles.nameAbbreviation}>NT</p>
                    <p className={styles.userName}>NAME TEST</p>
                </div>
                <div className={styles.memberTime}>
                    <img src="/profile/iconUserAccount.svg" alt="userIcon" className={styles.memberTimeImg} />
                    <p className={styles.memberTimeText}>Membro desde <br /> 20 de abril de 2020</p>
                </div>
                <hr />
                <div className={styles.formFlex}>
                    <FormGroup>
                        <Label className={styles.label} for='firstName'>NOME</Label>
                        <Input name='firstName' type='text' id='firstName' placeholder='Qual o seu primeiro nome?'
                            required maxLength={20} className={styles.inputFlex} value={'Name'}>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label className={styles.label} for='lastName'>SOBRENOME</Label>
                        <Input name='lastName' type='text' id='lastName' placeholder='Qual o seu último nome?'
                            required maxLength={20} className={styles.inputFlex} value={'LastName'}>
                        </Input>
                    </FormGroup>
                </div>
                <div className={styles.formColumn}>
                    <FormGroup>
                        <Label className={styles.label} for='phone'>WHATSAPP / TELEGRAM</Label>
                        <Input name='phone' type='text' id='phone' placeholder='(XX) 9XXXX-XXXX'
                            required className={styles.input} value={'+55 (21) 99999-9999'}>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className={styles.label}>EMAIL</Label>
                        <Input name='email' type='text' id='email' placeholder='Coloque o seu email'
                            required maxLength={40} className={styles.input} value={'lucanequini@gmail.com'}>
                        </Input>
                    </FormGroup>

                    <Button className={styles.formBtn}>Salvar Alterações</Button>
                </div>
            </Form>
        </>
    )
}

export default UserForm