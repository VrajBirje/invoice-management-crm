"use client";
import { useCookies } from 'react-cookie';
import Sidebar from '@/Components/shared/Sidebar/sidebar';
import { React, useState, useEffect } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { RiAddFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { LuClipboardEdit, LuMail } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import Link from 'next/link';
import './page.css';
import './table.css';
import Topbar from '@/Components/shared/Topbar/topbar';
import Button from '@/Components/common/Button/Button';
import { Search } from '@/Components/common/Search/search';
import { Checkbox } from '@/Components/common/Checkbox/checkbox';
import dataMain from '@/json/data';
import Modal from '@/Components/common/Modal/Modal'; // Ensure you have this component

export default function Page() {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteSubCategoryModal, setShowDeleteSubCategoryModal] = useState(false);
    const [subCategoryToDelete, setSubCategoryToDelete] = useState(null); // State to keep track of the item to be deleted
    const date = new Date();
    const activeDate = date.toLocaleDateString();
    const itemsPerPageOptions = [10, 15, 20, 25];
    // console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
    useEffect(() => {
        fetchData();
    }, []);
    const [cookies] = useCookies(['token']);
    const token = cookies.token;
    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/all`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const jsonData = await response.json();
            setData(jsonData);
            // setData(dataMain);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDeleteSubCategory = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/delete/${subCategoryToDelete}`, {
                method: 'DELETE',
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            if (response.ok) {
                setData(data.filter(item => item.Id !== subCategoryToDelete));
                setShowDeleteSubCategoryModal(false);
            } else {
                console.error('Failed to delete the sub-category');
            }
        } catch (error) {
            console.error('Error deleting sub-category:', error);
        }
    };

    // Filter data based on search term if there's a search term, otherwise return all data
    const filteredData = searchTerm
        ? data.filter(item => {
            const searchTerms = searchTerm.toLowerCase().split(' ');
            return searchTerms.every(term =>
                (item.serialNumber.toString().toLowerCase().includes(term)) ||
                (item.name.toString().toLowerCase().includes(term))
            );
        })
        // : data.filter(item => activeDate === '' || item.date === activeDate);
        : data;

    // Calculate total number of pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Function to handle pagination
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate which page numbers to display (current, previous, next)
    const pageNumbersToDisplay = [currentPage - 1, currentPage, currentPage + 1].filter((pageNumber) => pageNumber > 0 && pageNumber <= totalPages);

    const rangeStart = (currentPage - 1) * itemsPerPage + 1;
    const rangeEnd = Math.min(currentPage * itemsPerPage, data.length);

    // Get current items to display based on current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handleSearch = (event) => {
        setCurrentPage(1);
        setSearchTerm(event.target.value);
    };

    const handleNavigate = (item, event) => {
        event.preventDefault();
    };

    const openDeleteModal = (itemId) => {
        setSubCategoryToDelete(itemId);
        setShowDeleteSubCategoryModal(true);
    };

    return (
        <div className='customer-layout'>
            <Sidebar active="Customer" settingsBool={false} masterBool={false} />
            <div className="mainpage-container">
                <Topbar name="Customer" />
                <div className="main-section">
                    <div className="main-section-top">
                        <div className="main-section-search">
                            <Search onChange={handleSearch} />
                        </div>
                        <div className="main-section-top-buttons">
                            <Button variant='round-outline' suffixIcon={<IoMdArrowDropdown size={20} />}>
                                Newest
                            </Button>
                            <Button variant='round' link="/customer/addcustomer" prefixIcon={<RiAddFill size={20} />}>
                                New Customer
                            </Button>
                        </div>
                    </div>
                    <div className="main-section-table">
                        <table id='table'>
                            <thead>
                                <tr>
                                    <th className='th1'>
                                        <Checkbox />
                                    </th>
                                    <th>
                                        Customer Name
                                    </th>
                                    <th>
                                        Type
                                    </th>
                                    <th>
                                        Company
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                    <th>
                                        Contact
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className='th1'>
                                            <Checkbox />
                                        </td>
                                        <td className='tableName'>
                                            {item.firstName} {item.lastName}
                                        </td>
                                        <td className='label2'>Individual</td>
                                        <td className='label2'>Hoarway</td>
                                        <td className='label2'>Active</td>
                                        <td className='actionsTable'>
                                            <div className="table-contacts">
                                                <div className="table-contact">
                                                    <FiPhone size={19} />
                                                </div>
                                                <div className="table-contact">
                                                    <LuMail size={19} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='actionsTable'>
                                            <div className="table-contacts">
                                                <MdDeleteOutline size={22} onClick={() => openDeleteModal(item.Id)} />
                                                <Link href={{ pathname: '/customer/editcustomer', query: { id: item.Id } }}><LuClipboardEdit size={22} /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='TableBottom'>
                            <div className="TableBottomLeft">
                                <span className='label2 tablePageStatus'>
                                    Showing <div className="pagestatus-no">{rangeStart} - {rangeEnd}</div> of <div className="pagestatus-no"> {data.length}</div> results
                                </span>
                            </div>
                            <div className="TablePaginationButtons">
                                <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))} disabled={currentPage === 1} className="TablePaginationButton">
                                    <IoMdArrowDropleft size={28} />
                                </button>

                                {pageNumbersToDisplay.map((pageNumber) => (
                                    <button key={pageNumber} onClick={() => handlePagination(pageNumber)} disabled={pageNumber === currentPage} className="TablePaginationButtonNumber">
                                        {pageNumber}
                                    </button>
                                ))}
                                <button onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))} disabled={currentPage === totalPages} className="TablePaginationButton">
                                    <IoMdArrowDropright size={28} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showDeleteSubCategoryModal && (
                <Modal>
                    <div className="modal-content">
                        <div style={{ marginBottom: "10px" }}>
                            <h5>Delete Customer</h5>
                        </div>
                        <div className="modal-body" style={{ marginBottom: "20px" }}>
                            Are you sure you want to delete this customer?
                        </div>
                        <div className="modal-actions">
                            <Button onClick={() => setShowDeleteSubCategoryModal(false)}>Cancel</Button>
                            <Button variant="round-outline" onClick={handleDeleteSubCategory}>Delete</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
