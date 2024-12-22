"use client";
import Sidebar from '@/Components/shared/Sidebar/sidebar';
import { React, useState, useEffect } from 'react';
import Topbar from '@/Components/shared/Topbar/topbar';
import { MdMailOutline } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import './page.css';
import Button from '@/Components/common/Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useCookies } from 'react-cookie';

const EditItem = () => {
    const searchParams = useSearchParams();
    const itemId = searchParams.get('Id');
    // State to store input field values
    const [formData, setFormData] = useState({
        itemType: null,
        itemName: '',
        sellingPrice: null,
        unit: 1,
        documents: '',
        description: '',
        createdDate: new Date().toISOString(), // default value
        createdId: 2, // default value
        updatedId: 2,
        category:1,
        subcategory:1,
    });
    const [cookies] = useCookies(['token']);
    const token = cookies.token;


    useEffect(() => {
        if (itemId) {
            fetchItemDetails(itemId);
        }
    }, [itemId]);

    const fetchItemDetails = async (id) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item/${id}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            if (response.ok) {
                const itemData = await response.json();
                const itemData2 = itemData.item;
                setFormData({
                    ...itemData2,
                    createdDate: itemData.createdDate || new Date().toISOString(),
                    createdId: itemData.createdId || 2,
                    updatedId: itemData.updatedId || 2,
                });
                console.log(itemData.item)
            } else {
                console.error('Failed to fetch item details');
            }
        } catch (error) {
            console.error('Error fetching item details:', error);
        }
    };

    // Function to handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChange2 = (e) => {
        const { name, value } = e.target;
        const intValue = parseInt(value, 10);

        setFormData(prevState => ({
            ...prevState,
            [name]: intValue
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

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Handle successful response
                console.log('Item added successfully');
                toast.success("Item updated successfully")
                window.location.href = '/Items'
                // Reset form data or perform any other actions as needed
            } else {
                // Handle error response
                console.error('Failed to add item');
                toast.error("Failed to add the item")
            }
        } catch (error) {
            toast.error("Failed to add the item")
            console.error('Error adding item:', error);
        }
    };

    // Logging the formData object
    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        
            <div className='customer-layout'>
                <ToastContainer />
                <Sidebar active="Items" settingsBool={false} masterBool={false} />
                <div className="mainpage-container">
                    <Topbar name="Edit   Items" />
                    <div className="main-section">
                        <div className="addcustomer-personaldetails">
                            <div className="personal-details-heading">
                                <h6>Item Details</h6>
                            </div>
                            <div className="personaldetails-content">
                                <div className="pdetails-fieldvalue">
                                    <div className="label2 pdetails-field">
                                        Item Type
                                    </div>
                                    <div className="pdetails-value">
                                        <div className="pdetails-value-opt">
                                            <input type="radio" name='itemType' checked={formData.itemType === 1} value={1} onChange={handleChange2} />
                                            <div className="label2">
                                                Product
                                            </div>
                                        </div>
                                        <div className="pdetails-value-opt">
                                            <input type="radio" name='itemType' checked={formData.itemType === 2} value={2} onChange={handleChange2} />
                                            <div className="label2">
                                                Service
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pdetails-fieldvalue">
                                    <div className="label2 pdetails-field">
                                        Item Name
                                    </div>
                                    <div className="pdetails-value2">
                                        <div className="pdetails-value-wrapper2">
                                            <input type="text" name="itemName" value={formData.itemName} className='pdetails-input2' placeholder='Product Name' onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Category
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
                                    Sub-Category
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
                                        Selling Price
                                    </div>
                                    <div className="pdetails-value2">
                                        <div className="pdetails-value-wrapper2">
                                            <input type="text" name="sellingPrice" value={formData.sellingPrice} className='pdetails-input' placeholder='Rupees' onChange={handleChange2} />
                                            <FaIndianRupeeSign size={18} className='pdetails-icon' />
                                        </div>
                                    </div>
                                </div>
                                <div className="pdetails-fieldvalue">
                                    <div className="label2 pdetails-field">
                                        Unit
                                    </div>
                                    <div className="pdetails-value2">
                                        <div className="pdetails-value-wrapper2">
                                            <select
                                                type="text"
                                                name="unit"
                                                className='pdetails-input3'
                                                placeholder='Unit'
                                            // onChange={handleChange}
                                            >
                                                <option value="value">Unit</option>
                                                <option value="value">Options</option>
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
                                                <input type="file" className='pdetails-input4' placeholder='Documents' onChange={handleFileChange} />
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
                                            <textarea type="text" value={formData.description} name="description" className='pdetails-input2' placeholder='Description' onChange={handleChange} />
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
    
    )
}

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditItem/>
        </Suspense>
    )
}

export default Page;