import {useState} from "react"
import { Server } from "../utils/Server"
import SubmitButton from "../components/SubmitButton"
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from "../context/AuthContext"

const RegisterPage = () => {
    const {setUser} = useAuthContext()
    const [formData, setFormData] = useState({
        name : "",
        email: "",
        password: ""
      })
      // navigator to navigate user to another page
      const Navigator = useNavigate()

      const [error,setError] = useState('')
      const [isLoading,setIsLoading] = useState(false)

      // setting formData on form element changes
      const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name] : value
        }))
      }

      // function to submit user inputs to the server
      const handleSubmit = async() => {
        const {name,email,password} = formData
        if(!name || !password || !email || isLoading){
            return
        }
        try{
            setIsLoading(true)
            const {data} = await Server.post('/user/register',formData)
            setUser(data)
            localStorage.setItem('user',JSON.stringify(data))
            setFormData({
                name : "",
                email: "",
                password: ""
              })
              // after success user will redirect to the chat page automatically after 1000ms
              setTimeout(() => {
                Navigator("/chat")
            },1000)
        }
        catch(e:any){
          // setting error if occurred
            setError(e)
        }
        finally{
          // setting loading false on request error or success
            setIsLoading(false)
        }
      }

        // logging out error if occured
        if(error){
          console.log(error)
        }
      
  return (
    <div className="flex flex-col  items-center h-[80vh] justify-center">
        <h2 className="text-3xl font-md tracking-wider">Register</h2>
        <form  className="flex   justify-center w-11/12 md:w-4/12 flex-col gap-4 my-4">
          <input name="name" className="form-input" placeholder="Name" type="text" value={formData.name} onChange={handleChange}required/>
          <input name="email" className="form-input" placeholder="Email" type="email" value={formData.email} onChange={handleChange}required/>
          <input name="password" className="form-input" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required/>
          <SubmitButton label="Submit" isLoading={isLoading} onSubmit={handleSubmit}/>
        </form>
    </div>
  )
}

export default RegisterPage