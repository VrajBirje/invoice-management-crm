import Sidebar from '@/Components/shared/Sidebar/sidebar'
import React from 'react'
import './page.css'
import Topbar from '@/Components/shared/Topbar/topbar'

export default function page() {
  return (
    <div className='dashboard-layout'>
      <Sidebar active="Dashboard" settingsBool={false} masterBool={false}/>
      <div className="mainpage-container">
        <Topbar name="Dashboard" />
      </div>
    </div>
  )
}

