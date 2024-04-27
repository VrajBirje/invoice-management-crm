"use client";
import Sidebar from '@/Components/shared/Sidebar/sidebar'
import { React, useState, useEffect } from 'react'
import Topbar from '@/Components/shared/Topbar/topbar'
import { MdMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import './page.css'
import Button from '@/Components/common/Button/Button';

export default function Page() {
    // State to store input field values
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        role: '',
        email: '',
        phone: '',
        documents: '',
        remark: '',
        address: '',
        country: '',
        state: '',
        city: ''
    });

    // Function to handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            documents: file.name
        }));
    };

    // Logging the formData object
    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <div className='customer-layout'>
            <Sidebar active="Users" settingsBool={false} masterBool={false} />
            <div className="mainpage-container">
                <Topbar name="Add User" />
                <div className="main-section">
                    <div className="addcustomer-personaldetails">
                        <div className="personal-details-heading">
                            <h6>Personal Details</h6>
                        </div>
                        <div className="personaldetails-content">

                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Name
                                </div>
                                <div className="pdetails-value">
                                    <div className="pdetails-value-opt">
                                        <input type="text" name="firstName" className='pdetails-cname' placeholder='First Name' onChange={handleChange} />
                                    </div>
                                    <div className="pdetails-value-opt">
                                        <input type="text" name="lastName" className='pdetails-cname' placeholder='Last Name' onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Company Name
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="text" name="companyName" className='pdetails-input2' placeholder='Company Name' onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Role
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <select
                                            type="text"
                                            name="role"
                                            className='pdetails-input3'
                                            placeholder='Mumbai'
                                            onChange={handleChange}
                                        >
                                            <option value="value">Role</option>
                                            <option value="value">options</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Email
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="text" name="email" className='pdetails-input' placeholder='Email' onChange={handleChange} />
                                        <MdMailOutline size={18} className='pdetails-icon' />
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Phone
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="text" name="phone" className='pdetails-input' placeholder='Phone' onChange={handleChange} />
                                        <FiPhone size={18} className='pdetails-icon' />
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
                                            <input type="file" name="documents" className='pdetails-input4' placeholder='Select Documents' onChange={handleFileChange} />
                                            <HiOutlineDocumentArrowUp size={18} className='pdetails-icon' />
                                        </div>
                                        <div style={{ color: "#010080" }} className="label5">The file size should be lesser than 5 mb</div>
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Remark
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <textarea name="remark" className='pdetails-input2' placeholder='Remark' onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="addcustomer-personaldetails">
                        <div className="personal-details-heading">
                            <h6>Address Details</h6>
                        </div>
                        <div className="personaldetails-content">
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Address
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="text" name="address" className='pdetails-input2' placeholder='Address' onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Country
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <select
                                            type="text"
                                            name="country"
                                            className='pdetails-input3'
                                            placeholder='Mumbai'
                                            onChange={handleChange}
                                        >
                                            <option value="value">India</option>
                                            <option value="value">options</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    State
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <select
                                            type="text"
                                            name="state"
                                            className='pdetails-input3'
                                            placeholder='Mumbai'
                                            onChange={handleChange}
                                        >
                                            <option value="value">Maharashtra</option>
                                            <option value="value">options</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    City
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <select
                                            type="text"
                                            name="city"
                                            className='pdetails-input3'
                                            placeholder='Mumbai'
                                            onChange={handleChange}
                                        >
                                            <option value="value">Mumbai</option>
                                            <option value="value">options</option>
                                        </select>
                                    </div>
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
