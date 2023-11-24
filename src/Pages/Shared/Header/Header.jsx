import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import Authentication from './Authentication';
import { useAuthState } from 'react-firebase-hooks/auth';
import UseAdmin from '../../../Hooks/useAdmin';
import auth from '../../../../firebase.init';


const Header = () => {
    const [user] = useAuthState(auth);
    const [admin] = UseAdmin();
    const navigate = useNavigate();

    let Links = [
        { name: 'Home', to: '/' },
        { name: 'Jobs', to: '/jobs' },
        { name: 'Blogs', to: '/blogs' },
        { name: 'Socializations', to: '/socializations' },
        { name: 'Contact US', to: '/contactus' }
    ];

    // console.log(user);

    let [open, setOpen] = useState(false);
    return (
        <nav className='shadow-md w-full fixed top-0 left-0 text-left z-[99]'>
            <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
                <div onClick={() => { navigate('/') }} className="font-bold text-3xl cursor-pointer flex items-center text-[#0f52ba]">
                    <span className="px-2 md:px-1"></span>
                    AlumBridge
                </div>

                <div onClick={() => setOpen(!open)} className="text-3xl absolute right-8 text-black top-6 cursor-pointer md:hidden">
                    {
                        open ? <AiOutlineClose /> : <AiOutlineBars />
                    }
                </div>
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 opacity-100' : 'top-[-490px] opacity-0 md:opacity-100'}`}>
                    {
                        Links.map(link => (
                            <li key={link.name} className='md:ml-8 text-md capitalize md:my-0 my-5'><NavLink className={({ isActive }) => (isActive ? 'text-[#0f52ba] duration-300 border-b-2 border-[#0f52ba]' : 'text-gray-800 duration-100')} to={link.to}>{link.name}</NavLink></li>
                        ))
                    }
                    {
                        user ? <div className="pl-7"><Authentication /></div> : <div className="" onClick={() => navigate('/signin')}><button className='mx-5 md:mx-10 py-2 px-5 rounded bg-purple-500 text-white'>SignIn</button></div>
                    }

                </ul>
            </div>
        </nav >
    );
};

export default Header;