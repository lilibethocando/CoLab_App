import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/logo.png';
import { navItems } from '../constants';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    }


    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80" style={{ backgroundColor: '#fff', zIndex: '1000' }}>
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-12 w-12 mr-2" src={logo} alt="Company Logo" />
                        <span className="text-xl tracking-tight">TripPlanner</span>
                    </div>
                    {/* <ul className='hidden lg:flex ml-14 space-x-12'>
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.to}>{item.label}</Link>
                            </li>
                        ))}
                    </ul> */}
                    <div className="hidden lg:flex justify-center space-x-12 items-center">
                        <Link to="/signin" className='py-2 px-3 border rounded-md text-black' >
                            Sign In
                        </Link>
                        <Link to="/signup" className="py-2 px-3 rounded-md" style={{ backgroundColor: '#235778', color: '#ffffff' }}>
    Sign Up
</Link>


                    </div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleNavbar}>
                            {mobileDrawerOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
                {mobileDrawerOpen && (
                    <div className="fixed right-0 z-20 bg-neutral-200 w-full p-12 flex flex-col justify-center items-center lg:hidden">
                        <ul>
                            {navItems.map((item, index) => (
                                <li key={index} className='py-4'>
                                    <a href="{item.href}">{item.label}</a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex space-x-6">
                        <Link to="/signin" className='py-2 px-3 border rounded-md' >
                            Sign In
                        </Link>
                        <Link to="/signup" className='bg-gradient-to-r from-green-400 to-green-200 py-2 px-3 rounded-md'>
                            Sign Up
                        </Link>

                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default NavBar;