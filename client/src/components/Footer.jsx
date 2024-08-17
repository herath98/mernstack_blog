import { Footer } from 'flowbite-react'
import { BsGithub, BsLinkedin, BsFacebook, BsTwitter, BsInstagram ,BsYoutube,BsFillEnvelopeFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function FooterSec() {
    return (
        <Footer container className='border border-t-8 border-teal-400'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='flex'>
                        <div className="mt-1">
                            <Link to="/" className="self-center whitespace-nowrap text-lg lg:text-4xl sm:text-3xl  font-semibold dark:text-white ">
                                <span className="px-2 py-1 bg-gradient-to-r from-lime-500 via-cyan-500 to-violet-800 rounded-lg text-white">Stars</span>
                                Blog
                            </Link>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-6 '>
                        <div className='mt-4 ml-4 text-left'>
                            <Footer.Title title="About" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="/" target="_blank" rel='noopener noreferrer'>
                                    Stars Blog
                                </Footer.Link>
                                <Footer.Link href="/about" target="_blank" rel='noopener noreferrer'>
                                    About
                                </Footer.Link>
                                <Footer.Link href="/project" target="_blank" rel='noopener noreferrer'>
                                    Project
                                </Footer.Link>
                            </Footer.LinkGroup>

                        </div>
                        <div className='mt-4 text-left'>
                            <Footer.Title title="Follow us" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="/" target="_blank" rel='noopener noreferrer'>
                                    Home
                                </Footer.Link>
                                <Footer.Link href="/about" target="_blank" rel='noopener noreferrer'>
                                    About
                                </Footer.Link>

                            </Footer.LinkGroup>

                        </div>
                        <div className='mt-4 text-left '>
                            <Footer.Title title="legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="/" target="_blank" rel='noopener noreferrer'>
                                    Privancy and Policy
                                </Footer.Link>
                                <Footer.Link href="/about" target="_blank" rel='noopener noreferrer'>
                                    Teams & Conditions
                                </Footer.Link>

                            </Footer.LinkGroup>

                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="flex justify-center gap-5 w-1/4  sm:items-center sm:justify-between">
                   
                    <Footer.Icon href="#" target="_blank" rel='noopener noreferrer' icon={BsFacebook}/>
                    <Footer.Icon href="#" target="_blank" rel='noopener noreferrer' icon={BsTwitter}/>
                    <Footer.Icon href="#" target="_blank" rel='noopener noreferrer' icon={BsInstagram}/>
                    <Footer.Icon href="#" target="_blank" rel='noopener noreferrer' icon={BsLinkedin}/>
                    <Footer.Icon href="#" target="_blank" rel='noopener noreferrer' icon={BsGithub}/>
                    <Footer.Icon href="#" target="_blank" rel='noopener noreferrer' icon={BsYoutube}/>
                    

                </div>
                <div className='mt-2'>
                <Footer.Copyright
                        href="#"
                        by="Stars Blog @All rights reserved by Harsha Udayanga "
                        year={new Date().getFullYear()}
                    > <p>All</p> </Footer.Copyright>
                </div>
            </div>
        </Footer>
    )
};
