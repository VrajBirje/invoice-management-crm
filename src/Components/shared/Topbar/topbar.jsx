import React from 'react'
import { MdOutlineNotificationsNone } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import './topbar.css'

export default function Topbar({ name }) {
    return (
        <div className='topbar-container'>
            <h4>{name}</h4>
            <div className="topbar-right">
                <div className='topbar-icons'>
                    <MdOutlineNotificationsNone size={20} />
                </div>
                <div className='topbar-icons'>
                    <LuSettings size={20} />
                </div>
                <div className="topbar-profile-textContainer">
                    <div className="topbar-profile-name label">
                        Nabila A.
                    </div>
                    <div className="topbar-profile-role">
                        Admin
                    </div>
                </div>
                <div className="topbar-profile-pic"></div>
            </div>
        </div>
    )
}
