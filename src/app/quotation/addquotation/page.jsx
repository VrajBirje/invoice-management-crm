"use client";
import Sidebar from '@/Components/shared/Sidebar/sidebar'
import { React, useState, useEffect } from 'react'
import Topbar from '@/Components/shared/Topbar/topbar'
import { MdMailOutline } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import './page.css'
import Button from '@/Components/common/Button/Button';

export default function page() {
    const [tableRows, setTableRows] = useState([{ id: 1 }]);

    // Function to add a new row to the table
    const addRow = () => {
        const newRow = { id: tableRows.length + 1 };
        setTableRows([...tableRows, newRow]);
    };
    return (
        <div className='customer-layout'>
            <Sidebar active="Items" settingsBool={false} masterBool={false} />
            <div className="mainpage-container">
                <Topbar name="Add Items" />
                <div className="main-section">
                    <div className="addcustomer-personaldetails">
                        <div className="personal-details-heading">
                            <h6>Quote Details</h6>
                        </div>
                        <div className="personaldetails-content">
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Customer Name*
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="text" className='pdetails-input3' placeholder='select or add a customer' />
                                        <IoIosArrowDown size={18} className='pdetails-icon2' />
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Quote Id#
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="text" className='pdetails-input2' placeholder='#QT-00001' />
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-dates">
                                <div className="pdetails-fieldvalue">
                                    <div className="label2 pdetails-field">
                                        Quote Date*
                                    </div>
                                    <div className="pdetails-value2">
                                        <div className="pdetails-value-wrapper2">
                                            <input type="text" className='pdetails-input2' placeholder='13/12/2024' />
                                        </div>
                                    </div>
                                </div>
                                <div className="pdetails-fieldvalue">
                                    <div className="label2 pdetails-field">
                                        Expiry Date
                                    </div>
                                    <div className="pdetails-value2">
                                        <div className="pdetails-value-wrapper2">
                                            <input type="text" className='pdetails-input2' placeholder='#13/12/2024' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Sales Person*
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="text" className='pdetails-input3' placeholder='select or add a user' />
                                        <IoIosArrowDown size={18} className='pdetails-icon2' />
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Subject
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="text" className='pdetails-input2' placeholder='Subject' />
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Project
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="text" className='pdetails-input3' placeholder='select or add a customer' />
                                        <IoIosArrowDown size={18} className='pdetails-icon2' />
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Documents
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetials-doc-input">
                                        <div className="pdetails-value-wrapper2">
                                            <input type="file" className='pdetails-input4' placeholder='abc@gmail.com' />
                                            <HiOutlineDocumentArrowUp size={18} className='pdetails-icon' />
                                        </div>
                                        <div style={{ color: "#010080" }} className="label5">The file size should be lesser than 5 mb</div>
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Description
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <textarea type="text" className='pdetails-input2' placeholder='Description' />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="addcustomer-personaldetails">
                        <div className="personal-details-heading">
                            <h6>Items</h6>
                        </div>
                        <div className="personaldetails-content">
                            <table id='quote-table'>
                                <thead>
                                    <tr>
                                        <th style={{ width: "30%" }}>items</th>
                                        <th>quantity</th>
                                        <th>rate</th>
                                        <th>discount</th>
                                        <th>amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableRows.map(count => (
                                        <tr key={count.id}>
                                            <td>
                                                <input type="text" className='pdetails-input6' />
                                            </td>
                                            <td>
                                                <input type="text" className='pdetails-input5' />
                                            </td>
                                            <td>
                                                <input type="text" className='pdetails-input5' />
                                            </td>
                                            <td>
                                                <input type="text" className='pdetails-input5' />
                                            </td>
                                            <td>
                                                <input type="text" className='pdetails-input5' />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='items-2'>
                                <Button variant='round-outline'onClick={addRow}>
                                    Add a New Row
                                </Button>
                                <div className="items-tax">
                                    
                                </div>
                            </div>
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
        </div>
    )
}

