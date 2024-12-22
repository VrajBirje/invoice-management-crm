// "use client";
// import Sidebar from '@/Components/shared/Sidebar/sidebar';
// import { React, useState, useEffect } from 'react';
// import Topbar from '@/Components/shared/Topbar/topbar';
// import { MdMailOutline } from "react-icons/md";
// import { FiPhone } from "react-icons/fi";
// import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
// import './page.css';
// import Button from '@/Components/common/Button/Button';
// import { useSearchParams } from 'next/navigation';

// export default function Page() {
//     // State to store input field values with default values
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         companyName: '',
//         role: 3,
//         email: '',
//         phone: '',
//         documents: '',
//         remark: '',
//         address: '',
//         country: 'India', // default value
//         state: 'Maharashtra', // default value
//         city: 'Mumbai', // default value
//         createdDate: new Date().toISOString(), // default value
//         createdId: 2, // default value
//         updatedId: 2, // default value
//         pincode: '000000', // default value
//         password: '9757466797' // This should be updated to a secure value
//     });

//     const searchParams = useSearchParams();
//     const [userData, setUserData] = useState({});

//     useEffect(() => {
//         if (searchParams) {
//             const params = {};
//             searchParams.forEach((value, key) => {
//                 params[key] = value;
//             });
//             setUserData(params);
//         }
//     }, [searchParams]);

//     // Function to handle changes in input fields
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     // Function to handle file change
//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         setFormData(prevState => ({
//             ...prevState,
//             documents: file.name
//         }));
//     };

//     // Function to handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();


//     };

//     // Logging the formData object
//     useEffect(() => {
//         console.log(formData);
//     }, [formData]);

//     return (
//         <div className='customer-layout'>
//             <Sidebar active="Users" settingsBool={false} masterBool={false} />
//             <div className="mainpage-container">
//                 <Topbar name="Add User" />
//                 <div className="main-section">
//                     <div className="addcustomer-personaldetails">
//                         <div className="personal-details-heading">
//                             <h6>Personal Details</h6>
//                         </div>
//                         <div className="personaldetails-content">
//                             <div className="pdetails-fieldvalue">
//                                 <div className="label2 pdetails-field">
//                                     Name
//                                 </div>
//                                 <div className="pdetails-value">
//                                     <div className="pdetails-value-opt">
//                                         <input type="text" name="firstName" className='pdetails-cname' placeholder='First Name' onChange={handleChange} />
//                                     </div>
//                                     <div className="pdetails-value-opt">
//                                         <input type="text" name="lastName" className='pdetails-cname' placeholder='Last Name' onChange={handleChange} />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="pdetails-fieldvalue">
//                                 <div className="label2 pdetails-field">
//                                     Company Name
//                                 </div>
//                                 <div className="pdetails-value2">
//                                     <div className="pdetails-value-wrapper2">
//                                         <input type="text" name="companyName" className='pdetails-input2' placeholder='Company Name' onChange={handleChange} />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="pdetails-fieldvalue">
//                                 <div className="label2 pdetails-field">
//                                     Role
//                                 </div>
//                                 <div className="pdetails-value2">
//                                     <div className="pdetails-value-wrapper2">
//                                         <select
//                                             name="role"
//                                             className='pdetails-input3'
//                                             // onChange={handleChange}
//                                         >
//                                             <option value="">Role</option>
//                                             <option value="options">options</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="pdetails-fieldvalue">
//                                 <div className="label2 pdetails-field">
//                                     Email
//                                 </div>
//                                 <div className="pdetails-value2">
//                                     <div className="pdetails-value-wrapper2">
//                                         <input type="text" name="email" className='pdetails-input' placeholder='Email' onChange={handleChange} />
//                                         <MdMailOutline size={18} className='pdetails-icon' />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="pdetails-fieldvalue">
//                                 <div className="label2 pdetails-field">
//                                     Phone
//                                 </div>
//                                 <div className="pdetails-value2">
//                                     <div className="pdetails-value-wrapper2">
//                                         <input type="text" name="phone" className='pdetails-input' placeholder='Phone' onChange={handleChange} />
//                                         <FiPhone size={18} className='pdetails-icon' />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="pdetails-fieldvalue">
//                                 <div className="label2 pdetails-field">
//                                     Documents
//                                 </div>
//                                 <div className="pdetails-value2">
//                                     <div className="pdetials-doc-input">
//                                         <div className="pdetails-value-wrapper2">
//                                             <input type="file" name="documents" className='pdetails-input4' placeholder='Select Documents' onChange={handleFileChange} />
//                                             <HiOutlineDocumentArrowUp size={18} className='pdetails-icon' />
//                                         </div>
//                                         <div style={{ color: "#010080" }} className="label5">The file size should be lesser than 5 mb</div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="pdetails-fieldvalue">
//                                 <div className="label2 pdetails-field">
//                                     Remark
//                                 </div>
//                                 <div className="pdetails-value2">
//                                     <div className="pdetails-value-wrapper2">
//                                         <textarea name="remark" className='pdetails-input2' placeholder='Remark' onChange={handleChange} />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="addcustomer-personaldetails">
//                         <div className="personal-details-heading">
//                             <h6>Address Details</h6>
//                         </div>
//                         <div className="personaldetails-content">
//                             <div className="pdetails-fieldvalue">
//                                 <div className="label2 pdetails-field">
//                                     Address
//                                 </div>
//                                 <div className="pdetails-value2">
//                                     <div className="pdetails-value-wrapper2">
//                                         <input type="text" name="address" className='pdetails-input2' placeholder='Address' onChange={handleChange} />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="pdetails-fieldvalue">
//                                 <div className="label2 pdetails-field">
//                                     Country
//                                 </div>
//                                 <div className="pdetails-value2">
//                                     <div className="pdetails-value-wrapper2">
//                                         <select
//                                             name="country"
//                                             className='pdetails-input3'
//                                             onChange={handleChange}
//                                         >
//                                             <option value="India">India</option>
//                                             <option value="options">options</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="pdetails-fieldvalue">
//                                 <div className="label2 pdetails-field">
//                                     State
//                                 </div>
//                                 <div className="pdetails-value2">
//                                     <div className="pdetails-value-wrapper2">
//                                         <select
//                                             name="state"
//                                             className='pdetails-input3'
//                                             onChange={handleChange}
//                                         >
//                                             <option value="Maharashtra">Maharashtra</option>
//                                             <option value="options">options</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="pdetails-fieldvalue">
//                                 <div className="label2 pdetails-field">
//                                     City
//                                 </div>
//                                 <div className="pdetails-value2">
//                                     <div className="pdetails-value-wrapper2">
//                                         <select
//                                             name="city"
//                                             className='pdetails-input3'
//                                             onChange={handleChange}
//                                         >
//                                             <option value="Mumbai">Mumbai</option>
//                                             <option value="options">options</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="roleBottom">
//                                 <Button variant='round-outline'>
//                                     Cancel
//                                 </Button>
//                                 <Button variant='round' onClick={handleSubmit}>
//                                     Save
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";
import { Suspense } from 'react';
import Sidebar from '@/Components/shared/Sidebar/sidebar';
import { React, useState, useEffect } from 'react';
import Topbar from '@/Components/shared/Topbar/topbar';
import { MdMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import './page.css';
import Button from '@/Components/common/Button/Button';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

const EditUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        roleId: 3,
        email: '',
        phoneNo: '',
        documents: '',
        remark: '',
        address: '',
        country: 'India',
        state: 'Maharashtra',
        city: 'Mumbai',
        pincode: '000000',
        password: '9757466797'
    });
    const [cookies] = useCookies(['token']);
    const token = cookies.token;

    const searchParams = useSearchParams();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (searchParams) {
            const params = {};
            searchParams.forEach((value, key) => {
                params[key] = value;
            });
            setUserData(params);
            setFormData({
                firstName: params.firstName || '',
                lastName: params.lastName || '',
                companyName: params.companyName || '',
                roleId: params.roleId || 3,
                email: params.emailId || '',
                phoneNo: params.phoneNo || '',
                documents: params.documents || '',
                remark: params.remark || '',
                address: params.address || '',
                country: params.country || 'India',
                state: params.state || 'Maharashtra',
                city: params.city || 'Mumbai',
                pincode: params.pincode || '000000',
                password: '9757466797'
            });
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            documents: file.name
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/edit/${userData.Id}`, formData, { headers: { 'Authorization': `Bearer ${token}` } });
            console.log(response.data.message);
            if(response.data.message==='User updated successfully'){
                toast.success('User updated successfully')
                window.location.href='/users'
            }
            // Handle success, maybe redirect to a success page or show a success message
        } catch (error) {
            console.error(error);
            // Handle error, maybe show an error message
        }
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <div className='customer-layout'>
            <ToastContainer />
            <Sidebar active="Users" settingsBool={false} masterBool={false} />
            <div className="mainpage-container">
                <Topbar name="Edit User" />
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
                                        <input
                                            type="text"
                                            name="firstName"
                                            className='pdetails-cname'
                                            placeholder='First Name'
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="pdetails-value-opt">
                                        <input
                                            type="text"
                                            name="lastName"
                                            className='pdetails-cname'
                                            placeholder='Last Name'
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Company Name
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input
                                            type="text"
                                            name="companyName"
                                            className='pdetails-input2'
                                            placeholder='Company Name'
                                            value={formData.companyName}
                                            onChange={handleChange}
                                        />
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
                                            name="roleId"
                                            className='pdetails-input3'
                                            value={formData.roleId}
                                            onChange={handleChange}
                                        >
                                            <option value="">Role</option>
                                            <option value="3">Sales Person</option>
                                            {/* Add other roles as needed */}
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
                                        <input
                                            type="text"
                                            name="email"
                                            className='pdetails-input'
                                            placeholder='Email'
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
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
                                        <input
                                            type="text"
                                            name="phoneNo"
                                            className='pdetails-input'
                                            placeholder='Phone'
                                            value={formData.phoneNo}
                                            onChange={handleChange}
                                        />
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
                                            <input
                                                type="file"
                                                name="documents"
                                                className='pdetails-input4'
                                                placeholder='Select Documents'
                                                onChange={handleFileChange}
                                            />
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
                                        <textarea
                                            name="remark"
                                            className='pdetails-input2'
                                            placeholder='Remark'
                                            value={formData.remark}
                                            onChange={handleChange}
                                        />
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
                                        <input
                                            type="text"
                                            name="address"
                                            className='pdetails-input2'
                                            placeholder='Address'
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
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
                                            name="country"
                                            className='pdetails-input3'
                                            value={formData.country}
                                            onChange={handleChange}
                                        >
                                            <option value="India">India</option>
                                            {/* Add other countries as needed */}
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
                                            name="state"
                                            className='pdetails-input3'
                                            value={formData.state}
                                            onChange={handleChange}
                                        >
                                            <option value="Maharashtra">Maharashtra</option>
                                            {/* Add other states as needed */}
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
                                            name="city"
                                            className='pdetails-input3'
                                            value={formData.city}
                                            onChange={handleChange}
                                        >
                                            <option value="Mumbai">Mumbai</option>
                                            {/* Add other cities as needed */}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="roleBottom">
                                <Button variant='round-outline'>
                                    Cancel
                                </Button>
                                <Button variant='round' onClick={handleSubmit}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditUser />
        </Suspense>
    )
}

export default Page;