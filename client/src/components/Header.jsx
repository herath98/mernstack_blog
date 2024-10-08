import React, { useState, useEffect } from "react";
import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from "flowbite-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
import logo from "../assets/logo.png";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);  // State to manage mobile menu
    const { pathname, search } = useLocation();
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [search]);

    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signOutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);  // Toggle menu open state
    };

    const closeMenu = () => {
        setMenuOpen(false);  // Close menu when a link is clicked
    };

    return (
        <Navbar className="border-b-2  w-full">
            <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                <img src={logo} alt="logo" className="h-12 w-12 rounded-full" />
            </Link>
            <form onSubmit={handleSubmit} className="hidden md:block">
                <TextInput
                    type="text"
                    placeholder="Search..."
                    icon={AiOutlineSearch}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            <Button className="w-10 h-10 hidden" color="gray" pill>
                <AiOutlineSearch />
            </Button>
            <div className="flex gap-2 md:order-2">
                <Button className="w-12 h-10" color="gray" pill onClick={() => dispatch(toggleTheme())}>
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="user avatar"
                                img={currentUser.profilePicture}
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm"> @{currentUser.username}</span>
                            <span className="block truncate text-sm font-medium">{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to="/dashboard?tab=profile" onClick={closeMenu}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <DropdownDivider />
                        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to="/sign-in">
                        <Button outline gradientDuoTone="purpleToBlue">
                            Sign In
                        </Button>
                    </Link>
                )}
                <Navbar.Toggle onClick={toggleMenu} />
            </div>
            <Navbar.Collapse className="hidden md:flex">
                <NavLink to="/" className="nav-link" exact onClick={closeMenu}>
                    Home
                </NavLink>
                <NavLink to="/about" className="nav-link" onClick={closeMenu}>
                    About
                </NavLink>
                <NavLink to="/search" className="nav-link" onClick={closeMenu}>
                   Post
                </NavLink>
                <NavLink to="/project" className="nav-link" onClick={closeMenu}>
                    Project
                </NavLink>
            </Navbar.Collapse>

            {/* Fullscreen Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-800 z-50 transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="relative flex flex-col items-center justify-center h-full">
                    {/* Close Icon */}
                    <button
                        onClick={closeMenu}
                        className="absolute top-4 right-4 text-3xl focus:outline-none"
                    >
                        <AiOutlineClose />
                    </button>

                    {/* Menu Links */}
                    <NavLink to="/" className="nav-link text-xl py-2" exact onClick={closeMenu}>
                        Home
                    </NavLink>
                    {currentUser && currentUser.isAdmin && (
                        <NavLink className="nav-link text-xl py-2" to="/dashboard?tab=dash" onClick={closeMenu}>
                            Dashboard
                        </NavLink>
                    )}
                    <NavLink className="nav-link text-xl py-2" to="/dashboard?tab=profile" onClick={closeMenu}>
                        Profile
                    </NavLink>
                    <NavLink to="/about" className="nav-link text-xl py-2" onClick={closeMenu}>
                        About
                    </NavLink>
                    <NavLink to="/search" className="nav-link text-xl py-2" onClick={closeMenu}>
                       Post
                    </NavLink>
                    <NavLink to="/project" className="nav-link text-xl py-2" onClick={closeMenu}>
                        Project
                    </NavLink>
                    {currentUser?.isAdmin && (
                        <>
                            <Link className="nav-link text-xl py-2" to="/dashboard?tab=posts" onClick={closeMenu}>
                                Posts
                            </Link>
                            <Link className="nav-link text-xl py-2" to='/dashboard?tab=project' onClick={closeMenu}>
                               Projects
                            </Link>
                            <Link className="nav-link text-xl py-2" to="/dashboard?tab=users" onClick={closeMenu}>
                                Users
                            </Link>
                            <Link className="nav-link text-xl py-2" to="/dashboard?tab=comments" onClick={closeMenu}>
                                Comments
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </Navbar>
    );
}
