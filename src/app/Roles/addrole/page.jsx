"use client";
import Sidebar from '@/Components/shared/Sidebar/sidebar'
import { React, useState, useEffect } from 'react'
import Topbar from '@/Components/shared/Topbar/topbar'
import { Checkbox } from '@/Components/common/Checkbox/checkbox';
import './page.css'
import './table.css'
import sidebarNavigators from '@/json/sidebar';
import Button from '@/Components/common/Button/Button';

export default function Page() {
    // State to store role permissions
    const [rolePermissions, setRolePermissions] = useState({});

    // Function to handle changes in permission checkboxes
    const handlePermissionChange = (role, permission, value) => {
        setRolePermissions(prevState => ({
            ...prevState,
            [role]: {
                ...prevState[role],
                [permission]: value
            }
        }));
    };

    useEffect(() => {
        console.log(rolePermissions);
    }, [rolePermissions]);

    return (
        <div className='customer-layout'>
            <Sidebar active="Roles" settingsBool={false} masterBool={false} />
            <div className="mainpage-container">
                <Topbar name="Add Role" />
                <div className="main-section">
                    <div className="addcustomer-personaldetails">
                        <div className="personal-details-heading">
                            <h6>Role Details</h6>
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
                                            Add
                                        </div>
                                    </th>
                                    <th className='th4'>
                                        <div className="th2">
                                            View
                                        </div>
                                    </th>
                                    <th className='th4'>
                                        <div className="th2">
                                            Edit
                                        </div>
                                    </th>
                                    <th className='th4'>
                                        <div className="th2">
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
                                            <Checkbox
                                                checked={rolePermissions[item.name]?.add || false}
                                                onChange={(e) => handlePermissionChange(item.name, 'add', e.target.checked)}
                                            />
                                        </td>
                                        <td className="label2">
                                            <Checkbox
                                                checked={rolePermissions[item.name]?.view || false}
                                                onChange={(e) => handlePermissionChange(item.name, 'view', e.target.checked)}
                                            />
                                        </td>
                                        <td className="label2">
                                            <Checkbox
                                                checked={rolePermissions[item.name]?.edit || false}
                                                onChange={(e) => handlePermissionChange(item.name, 'edit', e.target.checked)}
                                            />
                                        </td>
                                        <td className="label2">
                                            <Checkbox
                                                checked={rolePermissions[item.name]?.delete || false}
                                                onChange={(e) => handlePermissionChange(item.name, 'delete', e.target.checked)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="roleBottom">
                            <Button variant='round-outline'>
                                Cancel
                            </Button>
                            <Button variant='round' onClick={()=>console.log(rolePermissions)}>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
