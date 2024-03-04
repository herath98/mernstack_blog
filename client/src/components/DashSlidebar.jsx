import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'

export default function DashSlidebar() {
    const location = useLocation();
    const [tab , setTab] = useState('');
    useEffect (()=>{
      const urlprams = new URLSearchParams(location.search);
      const tabFormUrl= urlprams.get('tab');
      if (tabFormUrl) {
        setTab(tabFormUrl);
      }
    }, [location.search]);
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor="dark" as='div' >
                        Profile
                    </Sidebar.Item>
                    </Link>
                    <Sidebar.Item  icon={HiArrowSmRight} className="curser-pointer"  >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
