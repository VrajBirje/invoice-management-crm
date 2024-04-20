"use client";
import Sidebar from '@/Components/shared/Sidebar/sidebar'
import { React, useState, useEffect } from 'react'
import Topbar from '@/Components/shared/Topbar/topbar'
import { MdMailOutline } from "react-icons/md";
import './page.css'

export default function page() {

    return (
        <div className='customer-layout'>
            <Sidebar active="Customer" />
            <div className="mainpage-container">
                <Topbar name="Customer" />
                <div className="main-section">
                    <div className="addcustomer-personaldetails">
                        <div className="personal-details-heading">
                            <h6>Persoanal Details</h6>
                        </div>
                        <div className="personaldetails-content">
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Customer Type
                                </div>
                                <div className="pdetails-value">
                                    <div className="pdetails-value-opt">
                                        <input type="radio" name='customer' />
                                        <div className="label2">
                                            Individual
                                        </div>
                                    </div>
                                    <div className="pdetails-value-opt">
                                        <input type="radio" name='customer' />
                                        <div className="label2">
                                            Business
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Customer Name
                                </div>
                                <div className="pdetails-value">
                                    <div className="pdetails-value-opt">
                                        <input type="text" className='pdetails-cname' placeholder='First Name'/>
                                    </div>
                                    <div className="pdetails-value-opt">
                                    <input type="text" className='pdetails-cname' placeholder='Last Name'/>
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Company Name
                                </div>
                                <div className="pdetails-value">
                                    <div className="pdetails-value-opt">
                                        <input type="text" className='pdetails-cname' placeholder='Company Name'/>
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Email
                                </div>
                                <div className="pdetails-value">
                                    <div className="pdetails-value-wrapper">
                                        <input type="text" className='pdetails-input' placeholder='abc@gmail.com'/>
                                        <MdMailOutline size={18} className='pdetails-icon'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

