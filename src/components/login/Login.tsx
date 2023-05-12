import { pb } from "../../helpers/pb"
import { useState } from "react"
import { Modal } from "../../components/generalUI/modal/Modal"
import s from './Login.module.css'
import {LoadingButton} from "../../components/generalUI/loadingButton/LoadingButton"
import {FormComponent} from "../../components/generalUI/form/FormComponent"

interface Props {
    onClose: () => void
}

export const Login = ({onClose}: Props) => {
    const [user, setUser] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const login = async () => {
        setLoading(true)
        setError('')
        let authenticated = false
        try {
            await pb.collection('users').authWithPassword(user, password);
            authenticated = true
        } catch (e: any) {
            setError(e.message)
        }
        setLoading(false)
        if (authenticated) onClose()
    }

    return (
        <Modal onClose={onClose}>
            <div className={s.container}>
                <div className={s.icon}>🔑</div>
                <FormComponent 
                    className={s.field}
                    text={user}
                    setText={setUser}
                    label="User:"
                />
                <FormComponent 
                    className={s.field}
                    text={password}
                    setText={setPassword}
                    label="Password:"
                    isPassword={true}
                />
                <LoadingButton 
                    className={s.button}
                    loading={loading}
                    onClick={login}
                >
                    Login
                </LoadingButton>
                {error ? <div className={s.error}>{error}</div> : null}
            </div>
        </Modal>
    )
}