import Logo from '../assets/logo.webp'
import { Link } from 'react-router-dom'


const Navbar = () => {
    // checking user if it exist or not in localstorage and conditionally rendering ui elements
    const user = localStorage.getItem('user')  

    return (
        <nav className="flex px-8 border-b-2 py-4 items-center justify-between bg--rose-500">
            <Link to="/"><img src={Logo} alt="logo" className='h-10 w-10' /></Link>
            <div className="flex gap-4">
                {!user ? <><Link className="btn" to="/login"><button>Sigin</button></Link>
                    <Link className="btn" to="/register"><button>Register</button></Link></> : <Link className="btn" to="/chat">My Chat</Link>}
            </div>
        </nav>
    )
}

export default Navbar