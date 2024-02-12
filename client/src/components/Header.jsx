import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa"

export default function Header() {
    // active links
    const path = useLocation().pathname
    return (
        <Navbar className="border-b-2" >
            <Link to="/" className="self-center whitespace-nowrap
        text-sm sm:text-xl font-semibold dark:text-white">
                <span className="px-2 py-1 bg-gradient-to-r from-lime-500
            via-cyan-500 to-violet-800 rounded-lg text-white " >Stars</span>
                Blog
            </Link>
            <form >
                <TextInput
                    type="text"
                    placeholder="Search...."
                    rightIcon={AiOutlineSearch}
                    className="hidden lg:inline"
                >

                </TextInput>
            </form>
            <Button className="w-12 h-10  lg:hidden" color="gray" pill>
                <AiOutlineSearch />
            </Button>
            <div className="flex gap-2 md:order-2">
                <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
                    <FaMoon />
                </Button>
                <Link to="/sign-in">
                    <Button outline gradientDuoTone="purpleToBlue" >
                        Sing In</Button>
                </Link>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"}>
                    <Link to="/">
                        Home
                    </Link>
                </Navbar.Link>

                <Navbar.Link active={path === "/about"}>
                    <Link to="about">
                        About
                    </Link>
                </Navbar.Link>

                <Navbar.Link active={path === "/project"}>

                    <Link to="project">
                        Project
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>

        </Navbar>
    )
}
