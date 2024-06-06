"use client";
import Sidebar from '@/Components/shared/Sidebar/sidebar';
import { useState } from 'react';
import Topbar from '@/Components/shared/Topbar/topbar';
import { MdMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import './page.css';
import Button from '@/Components/common/Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
    const [formData, setFormData] = useState({
        type: '',
        firstName: '',
        lastName: '',
        companyName: '',
        emailId: '',
        phoneNo: '',
        gstNo: '',
        paymentTerms: 1,
        documents: null,
        b_address: "",
        b_country: 1,
        b_state: 1,
        b_city: 1,
        s_address: "",
        s_country: 1,
        s_state: 1,
        s_city: 1
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clear error message when input changes
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: '' // Clear error for this field
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            documents: file
        }));
    };

    const handleBlurEmail = async () => {
        console.log(formData.emailId)
        try {
            const response = await fetch('http://localhost:5000/customer/check-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailId: formData.emailId }),
            });
            const result = await response.json();
            console.log(result.exists)
            if (result.exists) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    email: 'Email already exists'
                }));
            }
            else if (!result.exists) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    email: null
                }));
            }
        } catch (error) {
            console.error('Error checking email:', error);
        }
    };

    const handleBlurPhone = async () => {
        try {
            const response = await fetch('http://localhost:5000/customer/check-phone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNo: formData.phoneNo }),
            });
            const result = await response.json();
            if (result.exists) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    phone: 'Phone number already exists'
                }));
            }
            else if (!result.exists) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    phone: null
                }));
            }
        } catch (error) {
            console.error('Error checking phone:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation rules
        let errors = {};
        if (!formData.firstName.trim()) {
            errors.firstName = 'First Name is required';
        }
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last Name is required';
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.emailId)) {
            errors.email = 'Invalid email address';
        }
        if (!/^\d{10}$/.test(formData.phoneNo)) {
            errors.phone = 'Invalid phone number';
        }
        // if (!/^\d{15}$/.test(formData.gstNo)) {
        //     errors.gstNo = 'Invalid GST number';
        // }
        if (!formData.companyName.trim()) {
            errors.companyName = 'Company name is required';
        } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.companyName)) {
            errors.companyName = 'Company Name should not contain special characters';
        }

        // Show errors and prevent submission if there are errors
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // If no errors, proceed with form submission
        try {
            const response = await fetch('http://localhost:5000/customer/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log("Form submitted successfully:", result);
            toast.success("Customer Added successfully")
            window.location.href = '/customer'
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className='customer-layout'>
        <ToastContainer/>
            <Sidebar active="Customer" settingsBool={false} masterBool={false} />
            <div className="mainpage-container">
                <Topbar name="Add Customer" />
                <form className="main-section" onSubmit={handleSubmit}>
                    <div className="addcustomer-personaldetails">
                        <div className="personal-details-heading">
                            <h6>Personal Details</h6>
                        </div>
                        <div className="personaldetails-content">
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field" style={{ color: "red" }}>
                                    Customer Type*
                                </div>
                                <div className="pdetails-value">
                                    <div className="pdetails-value-opt">
                                        <input
                                            type="radio"
                                            name='type'
                                            value= "1" 
                                            onChange={handleChange}
                                        />
                                        <div className="label2">
                                            Individual
                                        </div>
                                    </div>
                                    <div className="pdetails-value-opt">
                                        <input
                                            type="radio"
                                            name='type'
                                            value="2"
                                            onChange={handleChange}
                                        />
                                        <div className="label2">
                                            Business
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field" style={{ color: "red" }}>
                                    First Name*
                                </div>
                                <div className="pdetails-value">
                                    <input
                                        type="text"
                                        name="firstName"
                                        className='pdetails-cname'
                                        placeholder='First Name'
                                        onChange={handleChange}
                                    />
                                    {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field" style={{ color: "red" }}>
                                    Last Name*
                                </div>
                                <div className="pdetails-value">
                                    <input
                                        type="text"
                                        name="lastName"
                                        className='pdetails-cname'
                                        placeholder='Last Name'
                                        onChange={handleChange}
                                    />
                                    {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Company Name
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="text" name="companyName" className='pdetails-input2' placeholder='Company Name' onChange={handleChange} />
                                        {errors.companyName && <div className="error-message">{errors.companyName}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field" style={{ color: "red" }}>
                                    Email*
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input
                                            type="text"
                                            name="emailId"
                                            className='pdetails-input'
                                            placeholder='abc@gmail.com'
                                            onChange={handleChange}
                                            onBlur={handleBlurEmail}
                                        />
                                        <MdMailOutline size={18} className='pdetails-icon' />
                                        {errors.email && <div className="error-message">{errors.email}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field" style={{ color: "red" }}>
                                    Phone*
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input
                                            type="text"
                                            name="phoneNo"
                                            className='pdetails-input'
                                            placeholder='Mobile'
                                            onChange={handleChange}
                                            onBlur={handleBlurPhone}
                                        />
                                        {errors.phone && <div className="error-message">{errors.phone}</div>}
                                        <FiPhone size={18} className='pdetails-icon' />
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field" style={{ color: "red" }}>
                                    GST no.*
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="Number" name="gstNo" className='pdetails-input2' placeholder='GST No.' onChange={handleChange} />
                                        {errors.gstNo && <div className="error-message">{errors.gstNo}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Payment Terms
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <select
                                            type="text"
                                            name="paymentTerms"
                                            className='pdetails-input3'
                                            placeholder='Payment Terms'
                                            onChange={handleChange}
                                        >
                                            <option value="value">options</option>
                                            <option value="value">options</option>
                                        </select>
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
                                            <input
                                                type="file"
                                                className='pdetails-input4'
                                                placeholder='abc@gmail.com'
                                                onChange={handleFileChange}
                                            />
                                            <HiOutlineDocumentArrowUp size={18} className='pdetails-icon' />
                                        </div>
                                        <div style={{ color: "#010080" }} className="label5">The file size should be lesser than 5 mb</div>
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
                            <div className="personaldetails-content2">
                                <div className="aDetails">
                                    <div style={{ color: "#010080" }} className="label3">Billing Address</div>
                                    <div className="pdetails-fieldvalue">
                                        <div className="label2 pdetails-field">
                                            Address
                                        </div>
                                        <div className="pdetails-value2">
                                            <div className="pdetails-value-wrapper2">
                                                <textarea type="text" className='pdetails-input2' placeholder='Address' name="b_address" onChange={handleChange} />
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
                                                    name="b_country"
                                                    className='pdetails-input3'
                                                    placeholder='Country'
                                                    onChange={handleChange}
                                                >
                                                    <option value="1">India</option>
                                                    <option value="2">USA</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pdetails-fieldvalue">
                                        <div className="label2 pdetails-field">
                                            State
                                        </div>
                                        <div className="pdetails-value2">
                                            <div className="pdetails-value2">
                                                <div className="pdetails-value-wrapper2">
                                                    <select
                                                        type="text"
                                                        name="b_state"
                                                        className='pdetails-input3'
                                                        placeholder='State'
                                                        onChange={handleChange}
                                                    >
                                                        <option value="1">Maharashtra</option>
                                                        <option value="2">California</option>
                                                    </select>
                                                </div>
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
                                                    name="b_city"
                                                    className='pdetails-input3'
                                                    placeholder='City'
                                                    onChange={handleChange}
                                                >
                                                    <option value="1">Mumbai</option>
                                                    <option value="2">Los Angeles</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pdetails-fieldvalue">
                                        <div className="label2 pdetails-field">
                                            Pincode
                                        </div>
                                        <div className="pdetails-value2">
                                            <div className="pdetails-value-wrapper2">
                                                <input type="Number" name="b_pincode" className='pdetails-input2' placeholder='Pincode' onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="aDetails">
                                    <div style={{ color: "#010080" }} className="label3">Shipping Address</div>
                                    <div className="pdetails-fieldvalue">
                                        <div className="label2 pdetails-field">
                                            Address
                                        </div>
                                        <div className="pdetails-value2">
                                            <div className="pdetails-value-wrapper2">
                                                <textarea type="text" className='pdetails-input2' placeholder='Address' name="s_address" onChange={handleChange} />
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
                                                    name="s_country"
                                                    className='pdetails-input3'
                                                    placeholder='Country'
                                                    onChange={handleChange}
                                                >
                                                    <option value="1">India</option>
                                                    <option value="2">USA</option>
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
                                                    name="s_state"
                                                    className='pdetails-input3'
                                                    placeholder='State'
                                                    onChange={handleChange}
                                                >
                                                    <option value="1">Maharashtra</option>
                                                    <option value="2">California</option>
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
                                                    name="s_city"
                                                    className='pdetails-input3'
                                                    placeholder='City'
                                                    onChange={handleChange}
                                                >
                                                    <option value="1">Mumbai</option>
                                                    <option value="2">Los Angeles</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pdetails-fieldvalue">
                                        <div className="label2 pdetails-field">
                                            Pincode
                                        </div>
                                        <div className="pdetails-value2">
                                            <div className="pdetails-value-wrapper2">
                                                <input type="Number" name="s_pincode" className='pdetails-input2' placeholder='Pincode' onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="roleBottom" >
                                <Button variant='round-outline'>
                                    Cancel
                                </Button>
                                <Button variant='round'>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
