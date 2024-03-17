import React from "react";
import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from "flowbite-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";


export default function Header() {
    // active links
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {theme} = useSelector((state) => state.theme);

    const handleSignOut = async () => {
        try {
          const res = await fetch('/api/user/signout', {
            method: 'POST',
          
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          }
          else{
            dispatch(signOutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      };
    
    return (
        <Navbar className="border-b-2">
            <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                <span className="px-2 py-1 bg-gradient-to-r from-lime-500 via-cyan-500 to-violet-800 rounded-lg text-white">Stars</span>
                Blog
            </Link>
            <form>
                <TextInput
                    type="text"
                    placeholder="Search...."
                    rightIcon={AiOutlineSearch}
                    className="hidden lg:inline"
                />
            </form>
            <Button className="w-12 h-10 lg:hidden" color="gray" pill>
                <AiOutlineSearch />
            </Button>
            <div className="flex gap-2 md:order-2">
                <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={() => dispatch(toggleTheme())} >
                   {theme === 'light' ? <FaSun /> : <FaMoon />}
                 
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="user avatar"
                                img={currentUser.profilePicture} />
                        }
                    >
                        <Dropdown.Header >
                            <span className="block text-sm"> @{currentUser.username}</span>
                            <span className="block truncate text-sm font-medium">{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to="/dashboard?tab=profile">
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <DropdownDivider/>

                        <Dropdown.Item onClick={handleSignOut}>SignOut</Dropdown.Item>
                    </Dropdown>
                ) :
                    (
                        <Link to="/sign-in">
                            <Button outline gradientDuoTone="purpleToBlue">
                                Sign In
                            </Button>
                        </Link>
                    )
                }

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <NavLink to="/" className="nav-link" exact="true">
                    Home
                </NavLink>
                <NavLink to="/about" className="nav-link">
                    About
                </NavLink>
                <NavLink to="/project" className="nav-link">
                    Project
                </NavLink>
            </Navbar.Collapse>
        </Navbar>
    );
}
