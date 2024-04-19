import Sidebar from '@/Components/shared/Sidebar/sidebar'
import React from 'react'
import './page.css'
import Topbar from '@/Components/shared/Topbar/topbar'

export default function page() {
  return (
    <div className='customer-layout'>
      <Sidebar active="Customer" />
      <div className="mainpage-container">
        <Topbar name="Customer" />
        
      </div>
    </div>
  )
}

