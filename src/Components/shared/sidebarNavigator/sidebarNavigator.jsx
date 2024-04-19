import React from 'react'
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";
import { TbUserShield } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { LuCodesandbox } from "react-icons/lu";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { MdDeliveryDining } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import './sidebarNavigator.css'
// import { useNavigate } from 'react-router-dom';

function getIcon(iconName) {
    switch (iconName) {
        case "Dashboard":
            return <HiOutlineHome size={18} />;
        case "Customer":
            return <TbUserShield size={18} />;
        case "Items":
            return <LuCodesandbox size={18} />;
        case "Category":
            return <BiCategory size={18} />;
        case "Sub-Category":
            return <MdOutlineCategory size={18} />;
        case "Users":
            return <HiOutlineUsers size={18} />;
        case "Roles":
            return <FaRegAddressCard size={18} />;
        case "Quotation":
            return <HiOutlineClipboardDocumentCheck size={18} />;
        case "Invoice":
            return <GrDocumentText size={18} />;
        case "Delivery Challan":
            return <MdDeliveryDining size={18} />;
        case "Payments Recieved":
            return <RiMoneyDollarBoxLine size={18} />;
        case "Log Out":
            return <HiOutlineLogout size={18} />;
        default:
            return null;
    }
}

export default function SidebarNavigator({ name, active }) {
    // const navigate = useNavigate();


    return (
        <div className={active ? "sidebar-navigator active-sidebar-navigator" : "sidebar-navigator"}>
            {getIcon(name)}
            <div className="label2">
                {name}
            </div>
        </div>
    )
}
