import {Footer} from 'flowbite-react';
import { Link } from 'react-router-dom';
import {BsDiscord, BsFacebook, BsGithub, BsInstagram, BsTwitter} from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-emerald-400'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className='mt-5'>
                    <Link to="/" className='self-center whitespace-nowrap  font-semibold dark:text-white '>
                        <span className='px-2 py-1 bg-green-300 rounded-lg text-white text-lg sm:text-3xl'>Hafsa</span>
                        <span className='px-1 py-1 text-md sm:text-xl'>Blog</span>
                    </Link>
                </div>
                <div className='grid grid-cols-2 gap-8  mt-4 sm:grid-cols-3 sm:gap-6'>
                    <div>
                        <Footer.Title title='About' className='mt-6 text-lg'/>
                        <Footer.LinkGroup col>
                            <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'>
                                Hafsa Blog
                            </Footer.Link>
                            <Footer.Link href='/projects' target='_blank' rel='noopener noreferrer'>
                                Reads
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Follow Me' className='mt-6 text-lg'/>
                        <Footer.LinkGroup col>
                            <Footer.Link href='https://www.github.com/hafsascript' target='_blank' rel='noopener noreferrer'>
                                Github
                            </Footer.Link>
                            <Footer.Link href='#'>
                                Discord
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Legal' className='mt-6 text-lg'/>
                        <Footer.LinkGroup col>
                            <Footer.Link href='#'>
                                Terms & Conditions
                            </Footer.Link>
                            <Footer.Link href='#'>
                                Policy
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider/>
            <div className='w-full sm:flex sm:items-center sm:justify-between'>
                <Footer.Copyright href='#' by='Hafsa Blog' year={new Date().getFullYear()}/>
                <div className='flex gap-6 sm:mt-2 mt-4 sm:justify-center'>
                    <Footer.Icon href='#' icon={BsInstagram}/>
                    <Footer.Icon href='#' icon={BsTwitter}/>
                    <Footer.Icon href='#' icon={BsFacebook}/>
                    <Footer.Icon href='https://www.github.com/hafsascript' icon={BsGithub}/>
                    <Footer.Icon href='#' icon={BsDiscord}/>
                </div>
            </div>
        </div>
    </Footer>
  )
}
