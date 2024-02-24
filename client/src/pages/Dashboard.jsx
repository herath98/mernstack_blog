import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSlidebar from "../components/DashSlidebar";
import DashProfile from "../components/DashProfile";

export default function Dashboard() {
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
    <div className="min-h-screen  flex flex-col md:flex-row ">
      <div className="md:w-56" >
          {/* Slidebar */}
          <DashSlidebar />
      </div>
          {/* profile... */}
          {tab === 'profile' && <DashProfile/>}
    </div>
  )
}
