import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashboardPanel from '../components/DashboardPanel';
import DashboardProfile from '../components/DashboardProfile';

export default function Dashboard() {
  const location = useLocation();
  const [tab,setTab] = useState('');
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-70'>
        {/*SidePanel*/}
        <DashboardPanel/>
      </div>
      
      {/* Profile, dashboard features */}
      {tab === 'profile' && <DashboardProfile/>} 

    </div>
  )
}
