"use client";
import Sidebar from '@/Components/shared/Sidebar/sidebar'
import { React, useState, useEffect } from 'react'
import Topbar from '@/Components/shared/Topbar/topbar'
import { MdMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { Checkbox } from '@/Components/common/Checkbox/checkbox';
import './page.css'
import './table.css'
import sidebarNavigators from '@/json/sidebar';
import Button from '@/Components/common/Button/Button';

export default function page() {

    return (
        <div className='customer-layout'>
            <Sidebar active="Roles" settingsBool={false} masterBool={false} />
            <div className="mainpage-container">
                <Topbar name="Add Role" />
                <div className="main-section">
                    <div className="addcustomer-personaldetails">
                        <div className="personal-details-heading">
                            <h6>Persoanal Details</h6>
                        </div>
                        <div className="personaldetails-content">

                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Role Name*
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="text" className='pdetails-input2' placeholder='Role Name' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-section-table">
                        <table id='table'>
                            <thead>
                                <tr>
                                    <th className='th2'>
                                        Role
                                    </th>
                                    <th className='th4'>
                                        <div className="th2">
                                            <Checkbox />
                                            Add
                                        </div>
                                    </th>
                                    <th className='th4'>
                                        <div className="th2">
                                            <Checkbox />
                                            View
                                        </div>
                                    </th>
                                    <th className='th4'>
                                        <div className="th2">
                                            <Checkbox />
                                            Edit
                                        </div>
                                    </th>
                                    <th className='th4'>
                                        <div className="th2">
                                            <Checkbox />
                                            Delete
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sidebarNavigators.map((item, index) => (
                                    <tr key={index}>
                                        <td className='tableName'>
                                            {item.name}
                                        </td>
                                        <td className='th1'>
                                            <Checkbox />
                                        </td>
                                        <td className="label2">
                                            <Checkbox />
                                        </td>
                                        <td className="label2">
                                            <Checkbox />
                                        </td>
                                        <td className="label2">
                                            <Checkbox />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="roleBottom">
                            <Button variant='round-outline'>
                                Cancel
                            </Button>
                            <Button variant='round' >
                                Save
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

