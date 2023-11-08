import { createContext, useContext, useState, useEffect } from "react"
import { User } from "../types"

interface AuthContextTypes {
    user: User | null | undefined
    getUser: () => void
    setUser: React.Dispatch<React.SetStateAction<User>>
}

interface AuthContextProviderTypes {
    children: React.ReactNode
}

const AuthContext = createContext<AuthContextTypes | null>(null)

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (context === null) {
        throw new Error("useAuthContext must be used in AuthContextProvider")
    }
    return context
}


const AuthContextProvider: React.FC<AuthContextProviderTypes> = ({ children }) => {
    const [user, setUser] = useState<User | any>()


    const getUser = () => {
        // @ts-ignore
        // getting user if it exist or not in localstorage
        const localUser = localStorage.getItem("user")
        if (!localUser) {
            return
        }
        // setting user from localstorage if exist
        setUser(localUser)
    }

    useEffect(() => {
        const getUser = () => {
            // @ts-ignore
            const localUser = localStorage.getItem("user")
            if (!localUser) {
                return
            }
            setUser(localUser)
        }
        getUser()
        // re-rendering when user changes
    }, [user])


    return (
        <AuthContext.Provider value={{ user,getUser, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider