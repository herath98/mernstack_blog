import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashSlidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [tab , setTab] = useState('');
    useEffect (()=>{
      const urlprams = new URLSearchParams(location.search);
      const tabFormUrl= urlprams.get('tab');
      if (tabFormUrl) {
        setTab(tabFormUrl);
      }
    }, [location.search]);
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
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor="dark" as='div' >
                        Profile
                    </Sidebar.Item>
                    </Link>
                    <Sidebar.Item onClick={handleSignOut}  icon={HiArrowSmRight} className="curser-pointer"  >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
