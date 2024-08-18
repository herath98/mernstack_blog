import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSlidebar from "../components/DashSlidebar";
import DashProfile from "../components/DashProfile";
import Dashpost from "../components/Dashpost";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";
import DashProject from "../components/DashProject";

/**
 * Dashboard component
 * 
 * This component renders the dashboard page with a sidebar and a profile section.
 * It uses the useLocation hook to get the current location and the useEffect hook
 * to update the tab state whenever the location search changes.
 * 
 * @returns {JSX.Element} The rendered dashboard component
 */
export default function Dashboard() {
  // Get the current location using the useLocation hook
  const location = useLocation();

  // State hook to store the current tab
  const [tab, setTab] = useState('');

  // UseEffect hook to update the tab state whenever the location search changes
  useEffect(() => {
    // Get the tab value from the location search
    const urlprams = new URLSearchParams(location.search);
    const tabFormUrl = urlprams.get('tab');

    // If tab value exists, update the tab state


    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen  flex flex-col md:flex-row ">
      <div className="md:w-56" >
        {/* Render the sidebar */}
        <DashSlidebar />
        
      </div>
     
      {/* Render the profile section if the tab is 'profile' */}
      {tab === 'profile' && <DashProfile />}
      {tab === 'posts' && <Dashpost />}
      {/* users */}
      {tab === 'users' && <DashUsers />}
         {/* comments  */}
         {tab === 'comments' && <DashComments />}
         {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
      {tab === 'project' && <DashProject/>}
    </div>
  )
}

