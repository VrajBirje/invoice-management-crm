
// "use client";
// import Sidebar from '@/Components/shared/Sidebar/sidebar';
// import { React, useState, useEffect } from 'react';
// import Topbar from '@/Components/shared/Topbar/topbar';
// import { MdMailOutline } from "react-icons/md";
// import { FiPhone } from "react-icons/fi";
// import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
// import './page.css';
// import Button from '@/Components/common/Button/Button';

// export default function Page() {
//     // State to store input field values with default values
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         companyName: '',
//         roleId: 3,
//         emailId: '',
//         phoneNo: '',
//         documents: '',
//         remark: '',
//         address: '',
//         country: 1, // default value
//         state: 1, // default value
//         city: 1, // default value
//         createdDate: new Date().toISOString(), // default value
//         createdId: 2, // default value
//         updatedId: 2, // default value
//         pincode: '000000', // default value
//         password: '9757466797' // This should be updated to a secure value
//     });

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

//         try {
//             const response = await fetch('http://localhost:5000/auth/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 console.log('User registered successfully:', data);
//                 window.location.href = '/users';
                
//                 // Add your success handling logic here
//             } else {
//                 console.error('Error registering user:', data.error);
//                 // Add your error handling logic here
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             // Add your error handling logic here
//         }
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
import Sidebar from '@/Components/shared/Sidebar/sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { React, useState, useEffect } from 'react';
import Topbar from '@/Components/shared/Topbar/topbar';
import { MdMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import './page.css';
import Button from '@/Components/common/Button/Button';

export default function Page() {
    // State to store input field values with default values
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        roleId: 3,
        emailId: '',
        phoneNo: '',
        documents: '',
        remark: '',
        address: '',
        country: 1, // default value
        state: 1, // default value
        city: 1, // default value
        createdDate: new Date().toISOString(), // default value
        createdId: 2, // default value
        updatedId: 2, // default value
        pincode: '000000', // default value
        password: '', 
        confirmPassword: '' 
    });

    const [emailError, setEmailError] = useState("")

    const [errors, setErrors] = useState({});

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

    const validateForm = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[a-zA-Z]+$/;

        if (!formData.firstName) newErrors.firstName = "First name is required.";
        else if (!nameRegex.test(formData.firstName)) newErrors.firstName = "First name should not contain special characters.";

        if (!formData.lastName) newErrors.lastName = "Last name is required.";
        else if (!nameRegex.test(formData.lastName)) newErrors.lastName = "Last name should not contain special characters.";

        if (!formData.companyName) newErrors.companyName = "Company name is required.";

        if (!formData.emailId) newErrors.emailId = "Email is required.";
        else if (!emailRegex.test(formData.emailId)) newErrors.emailId = "Invalid email format.";

        if (!formData.phoneNo) newErrors.phoneNo = "Phone number is required.";

        if (!formData.password) newErrors.password = "Password is required.";
        else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters long.";

        if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required.";
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User registered successfully:', data);
                window.location.href = '/users';
                toast.success("User registered successfully")
                // Add your success handling logic here
            } else {
                console.error('Error registering user:', data.error);
                toast.error('register failed: ' + data.error);
                if(data.error = "User already exists with this email id"){
                    setEmailError("email Id already exists")
                    console.log("hello")
                }
                // Add your error handling logic here
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('failed: ' + error);
            // Add your error handling logic here
        }
    };

    // Function to check if email already exists
    const checkEmailExists = async (emailId) => {
        console.log("email")
        try {
            const response = await fetch('http://localhost:5000/users/emailCheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emailId })
            });

            const data = await response.json();

            if (response.ok) {
                setEmailError("Email already exists");
                console.log("email")
            } else {
                setEmailError("");
            }
        } catch (error) {
            console.error('Error:', error);
            setEmailError('Failed to check email.');
        }
    };

    // Logging the formData object
    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <div className='customer-layout'>
         <ToastContainer />
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
                                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                                    </div>
                                    <div className="pdetails-value-opt">
                                        <input type="text" name="lastName" className='pdetails-cname' placeholder='Last Name' onChange={handleChange} />
                                        {errors.lastName && <p className="error">{errors.lastName}</p>}
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
                                        {errors.companyName && <p className="error">{errors.companyName}</p>}
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
                                            name="role"
                                            className='pdetails-input3'
                                            // onChange={handleChange}
                                        >
                                            <option value="">Role</option>
                                            <option value="options">options</option>
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
                                        <input type="text" name="emailId" className='pdetails-input' placeholder='Email' onChange={handleChange} onBlur={() => checkEmailExists(formData.emailId)}/>
                                        {errors.emailId && <p className="error">{errors.emailId}</p>}
                                        {emailError != "" && <p className="error">Email id already exists</p>}
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
                                        <input type="text" name="phoneNo" className='pdetails-input' placeholder='Phone' onChange={handleChange} />
                                        {errors.phoneNo && <p className="error">{errors.phoneNo}</p>}
                                        <FiPhone size={18} className='pdetails-icon' />
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Password
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="password" name="password" className='pdetails-input2' placeholder='Password' onChange={handleChange} />
                                        {errors.password && <p className="error">{errors.password}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Confirm Password
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="password" name="confirmPassword" className='pdetails-input2' placeholder='Confirm Password' onChange={handleChange} />
                                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
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
                                            name="country"
                                            className='pdetails-input3'
                                            onChange={handleChange}
                                        >
                                            <option value="India">India</option>
                                            <option value="options">options</option>
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
                                            onChange={handleChange}
                                        >
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="options">options</option>
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
                                            onChange={handleChange}
                                        >
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="options">options</option>
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
