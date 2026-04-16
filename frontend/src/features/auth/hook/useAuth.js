import { useDispatch } from "react-redux"
import { register } from "../service/auth.api"
import { setUser } from "../state/auth.slice"



export const useAuth = ()=> {
    const dispatch = useDispatch()

    const handleRegister = async ({email, contact, password, fullname, isSeller = false})=> {
        const data = await register({email, contact, password, fullname, isSeller})
        dispatch(setUser(data))
    }

    return {
        handleRegister
    }
}