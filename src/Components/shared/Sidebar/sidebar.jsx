"use client";
import { React, useState } from 'react'
import './sidebar.css'
import Image from 'next/image'
import sidebarNavigators from '@/json/sidebar'
import SidebarNavigator from '../sidebarNavigator/sidebarNavigator'
import { BsClipboardData } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";

export default function Sidebar({ active , settingsBool , masterBool }) {
    const [master, setMaster] = useState(masterBool)
    const [settings, setSettings] = useState(settingsBool)
    const onMasterClick = () => {
        setMaster(master => !master);
        setSettings(false)
    }
    const onSettingsClick = () => {
        setSettings(settings => !settings);
        setMaster(false)
    }
    return (
        <div className='sidebarContainer'>
            <div className="sidebar-logoContainer">
                <Image src="/hoarwaylogo.png" width={150} height={35} />
            </div>
            <div className="sidebar-navigators">
                {sidebarNavigators
                    .filter(sidebar => sidebar.type == "Main")
                    .map((sidebar, key) => (
                        <SidebarNavigator name={sidebar.name} active={active == sidebar.name} />
                    ))}
            </div>
            <div className="sidebar-navigators master-navigators">
                <div className="sidebar-navigator-dropdown" onClick={() => onMasterClick()}>
                    <div className="sidebar-navigator">
                        <BsClipboardData size={18} />
                        <div className="label2">
                            Master
                        </div>
                    </div>
                    <div className={master? "arrow-open-master" : ""}>
                        <IoIosArrowDown />
                    </div>
                </div>
                <div className={master ? 'master-sidebar-open' : 'master-sidebar-close'}>
                    {sidebarNavigators
                        .filter(sidebar => sidebar.type == "Master")
                        .map((sidebar, key) => (
                            <SidebarNavigator name={sidebar.name} active={active == sidebar.name} />
                        ))}
                </div>
            </div>
            <div className="sidebar-navigators">
                <div className="sidebar-navigator-dropdown" onClick={() => onSettingsClick()}>
                    <div className="sidebar-navigator">
                        <LuSettings size={18} />
                        <div className="label2">
                            Settings
                        </div>
                    </div>
                    <div className={settings? "arrow-open-master" : ""}>
                        <IoIosArrowDown />
                    </div>
                </div>
                <div className={settings ? 'master-sidebar-open' : 'master-sidebar-close'}>
                    {sidebarNavigators
                        .filter(sidebar => sidebar.type == "Settings")
                        .map((sidebar, key) => (
                            <SidebarNavigator name={sidebar.name} active={active == sidebar.name} />
                        ))}
                </div>
            </div>
            <div className="sidebar-navigators">
                {sidebarNavigators
                    .filter(sidebar => sidebar.type == "Bottom")
                    .map((sidebar, key) => (
                        <SidebarNavigator name={sidebar.name} active={active == sidebar.name} />
                    ))}
            </div>
            <div className="sidebar-navigators">
                {sidebarNavigators
                    .filter(sidebar => sidebar.name == "Log Out")
                    .map((sidebar, key) => (
                        <SidebarNavigator name={sidebar.name} active={active == sidebar.name} />
                    ))}
            </div>

        </div>
    )
}
