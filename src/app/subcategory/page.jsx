// "use client";
// import Sidebar from '@/Components/shared/Sidebar/sidebar'
// import { React, useState, useEffect } from 'react'
// import { IoMdArrowDropdown } from "react-icons/io";
// import './page.css'
// import './table.css'
// import { RiAddFill } from "react-icons/ri";
// import Topbar from '@/Components/shared/Topbar/topbar'
// import Button from '@/Components/common/Button/Button'
// import { Search } from '@/Components/common/Search/search';
// import { Checkbox } from '@/Components/common/Checkbox/checkbox';
// import dataMain from '@/json/data';
// import { MdDeleteOutline } from "react-icons/md";
// import { LuClipboardEdit } from "react-icons/lu";
// import { LuMail } from "react-icons/lu";
// import { FiPhone } from "react-icons/fi";
// import { IoMdArrowDropright } from "react-icons/io";
// import { IoMdArrowDropleft } from "react-icons/io";

// export default function page() {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [itemsPerPage, setItemsPerPage] = useState(10); // State for items per page
//     const [data, setData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const date = new Date();
//     const activeDate = date.toLocaleDateString();
//     const itemsPerPageOptions = [10, 15, 20, 25];

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await fetch('https://dev-d478mkay4qiodj5.api.raw-labs.com/api/json');
//             const jsonData = await response.json();
//             // setData(jsonData);
//             setData(dataMain);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     // Filter data based on search term if there's a search term, otherwise return all data
//     const filteredData = searchTerm
//         ? data.filter(item => {
//             const searchTerms = searchTerm.toLowerCase().split(' ');
//             return searchTerms.every(term =>
//                 (item.serialNumber.toString().toLowerCase().includes(term)) ||
//                 (item.name.toString().toLowerCase().includes(term))
//             );
//         })
//         // : data.filter(item => activeDate === '' || item.date === activeDate);
//         : data;


//     // Calculate total number of pages
//     const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//     // Function to handle pagination
//     const handlePagination = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     // Calculate which page numbers to display (current, previous, next)
//     const pageNumbersToDisplay = [currentPage - 1, currentPage, currentPage + 1].filter((pageNumber) => pageNumber > 0 && pageNumber <= totalPages);

//     const rangeStart = (currentPage - 1) * itemsPerPage + 1;
//     const rangeEnd = Math.min(currentPage * itemsPerPage, data.length);

//     // Get current items to display based on current page
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//     const handleSearch = (event) => {
//         setCurrentPage(1);
//         setSearchTerm(event.target.value);
//     };

//     const handleNavigate = (item, event) => {
//         event.preventDefault();
//     };
//     return (
//         <div className='customer-layout'>
//             <Sidebar active="Sub-Category" settingsBool={false} masterBool={true}/>
//             <div className="mainpage-container">
//                 <Topbar name="Sub-Category" />
//                 <div className="main-section">
//                     <div className="main-section-top">
//                         <div className="main-section-search">
//                             <Search />
//                         </div>
//                         <div className="main-section-top-buttons">
//                             <Button variant='round-outline' suffixIcon={<IoMdArrowDropdown size={20} />}>
//                                 Newest
//                             </Button>
//                             <Button variant='round' prefixIcon={<RiAddFill size={20} />}>
//                                 New Sub-Category
//                             </Button>
//                         </div>
//                     </div>
//                     <div className="main-section-table">
//                         <table id='table'>
//                             <thead>
//                                 <tr>
//                                     <th className='th1'>
//                                         <Checkbox />
//                                     </th>
//                                     <th>
//                                         Sub-Category
//                                     </th>
//                                     <th>
//                                         Category
//                                     </th>
//                                     <th style={{textAlign:"center"}}>
//                                         Action
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {currentItems.map((item, index) => (
//                                     <tr key={index}>
//                                         <td className='th1'>
//                                             <Checkbox />
//                                         </td>
//                                         <td className='tableName'>
//                                             {item.name}
//                                         </td>
//                                         <td className='label2'>
//                                             {item.name}
//                                         </td>
//                                         <td className='actionsTable'>
//                                             <div className="table-contacts" style={{justifyContent:"center"}}>
//                                                 <MdDeleteOutline size={22} />
//                                                 <LuClipboardEdit size={22} />
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <div className='TableBottom'>
//                             <div className="TableBottomLeft">
//                                 <span className='label2 tablePageStatus'>
//                                     Showing <div className="pagestatus-no">{rangeStart} - {rangeEnd}</div> of <div className="pagestatus-no"> {data.length}</div> results
//                                 </span>
//                             </div>
//                             <div className="TablePaginationButtons">
//                                 <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))} disabled={currentPage === 1} className="TablePaginationButton">
//                                     <IoMdArrowDropleft size={28} />
//                                 </button>

//                                 {pageNumbersToDisplay.map((pageNumber) => (
//                                     <button key={pageNumber} onClick={() => handlePagination(pageNumber)} disabled={pageNumber === currentPage} className="TablePaginationButtonNumber">
//                                         {pageNumber}
//                                     </button>
//                                 ))}
//                                 <button onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))} disabled={currentPage === totalPages} className="TablePaginationButton">
//                                     <IoMdArrowDropright size={28} />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '@/Components/shared/Sidebar/sidebar';
import { React, useState, useEffect, useCallback } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import './page.css';
import './table.css';
import { RiAddFill } from "react-icons/ri";
import Topbar from '@/Components/shared/Topbar/topbar';
import Button from '@/Components/common/Button/Button';
import { Search } from '@/Components/common/Search/search';
import { Checkbox } from '@/Components/common/Checkbox/checkbox';
import dataMain from '@/json/data';
import { MdDeleteOutline } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import Modal from '@/Components/common/Modal/Modal';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Page() {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddSubCategoryModal, setShowAddSubCategoryModal] = useState(false);
    const [showEditSubCategoryModal, setShowEditSubCategoryModal] = useState(false);
    const [showDeleteSubCategoryModal, setShowDeleteSubCategoryModal] = useState(false);
    const [newSubCategoryName, setNewSubCategoryName] = useState('');
    const [editSubCategoryId, setEditSubCategoryId] = useState(null);
    const [editSubCategoryName, setEditSubCategoryName] = useState('');
    const [deleteSubCategoryId, setDeleteSubCategoryId] = useState(null);
    const [cookies] = useCookies(['token']);
    const token = cookies.token;

    // useEffect(() => {
    //     fetchData();
    // }, [fetchData]);

    const transformResponseData = (data) => {
        let transformed = [];
        for (let category in data) {
            transformed = transformed.concat(data[category].map(subcategory => ({
                ...subcategory,
                categoryName: category // Add any necessary category info here
            })));
        }
        return transformed;
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/subcategory/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const transformedData = transformResponseData(response.data);
            setData(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []); // Empty dependency array means fetchData will be memoized only once

    useEffect(() => {
        fetchData();
    }, [fetchData]); // fetchData will be a stable dependency
    const filteredData = searchTerm
        ? data.filter(item => {
            const searchTerms = searchTerm.toLowerCase().split(' ');
            return searchTerms.every(term =>
                (item.serialNumber.toString().toLowerCase().includes(term)) ||
                (item.name.toString().toLowerCase().includes(term))
            );
        })
        : data;

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbersToDisplay = [currentPage - 1, currentPage, currentPage + 1].filter(pageNumber => pageNumber > 0 && pageNumber <= totalPages);

    const rangeStart = (currentPage - 1) * itemsPerPage + 1;
    const rangeEnd = Math.min(currentPage * itemsPerPage, data.length);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handleSearch = (event) => {
        setCurrentPage(1);
        setSearchTerm(event.target.value);
    };

    var datetime = new Date();

    const handleAddSubCategory = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subcategory/add`, { createdId: 1, updatedId: 1, createdDate: datetime, subCategoryName: newSubCategoryName, categoryId: 3 }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowAddSubCategoryModal(false);
            setNewSubCategoryName('');
            fetchData();
            toast.success("subcategory added successfully")
        } catch (error) {
            console.error('Error adding sub-category:', error);
            toast.error(error.response.data.error)
        }
    };

    const handleEditSubCategory = async () => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subcategory/${editSubCategoryId}`, { createdId: 1, updatedId: 1, createdDate: datetime, subCategoryName: editSubCategoryName, categoryId: 3 }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowEditSubCategoryModal(false);
            setEditSubCategoryId(null);
            setEditSubCategoryName('');
            fetchData();
            toast.success(`Sub-Category ${editSubCategoryId} updated successfully`);
        } catch (error) {
            console.error('Error updating sub-category:', error);
            toast.error(error.response.data.error)
        }
    };

    const handleDeleteSubCategory = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subcategory/${deleteSubCategoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowDeleteSubCategoryModal(false);
            setDeleteSubCategoryId(null);
            fetchData();
            toast.success(`Sub-Category ${deleteSubCategoryId} deleted successfully`);
        } catch (error) {
            console.error('Error deleting sub-category:', error);
            toast.error(error.response.data.error)
        }
    };

    return (
        <div className='customer-layout'>
            <ToastContainer />
            <Sidebar active="Sub-Category" settingsBool={false} masterBool={true} />
            <div className="mainpage-container">
                <Topbar name="Sub-Category" />
                <div className="main-section">
                    <div className="main-section-top">
                        <div className="main-section-search">
                            <Search value={searchTerm} onChange={handleSearch} />
                        </div>
                        <div className="main-section-top-buttons">
                            <Button variant='round-outline' suffixIcon={<IoMdArrowDropdown size={20} />}>
                                Newest
                            </Button>
                            <Button variant='round' prefixIcon={<RiAddFill size={20} />} onClick={() => setShowAddSubCategoryModal(true)}>
                                New Sub-Category
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
                                        Sub-Category
                                    </th>
                                    <th>
                                        Category
                                    </th>
                                    <th style={{ textAlign: "center" }}>
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
                                            {item.subCategoryName}
                                        </td>
                                        <td className='label2'>
                                            {item.categoryName}
                                        </td>
                                        <td className='actionsTable'>
                                            <div className="table-contacts" style={{ justifyContent: "center" }}>
                                                <MdDeleteOutline size={22} onClick={() => {
                                                    setDeleteSubCategoryId(item.Id);
                                                    setShowDeleteSubCategoryModal(true);
                                                }} />
                                                <LuClipboardEdit size={22} onClick={() => {
                                                    setEditSubCategoryId(item.Id);
                                                    setEditSubCategoryName(item.subCategoryName);
                                                    setShowEditSubCategoryModal(true);
                                                }} />
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
            {showAddSubCategoryModal && (
                <Modal >
                    <div className="modal-content" style={{ padding: "28px" }}>
                        <div style={{ marginBottom: "10px" }}>
                            <h5>Add New Sub-Category</h5>
                        </div>
                        <div className="personaldetails-content">
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field" style={{ textAlign: "left" }}>
                                    Sub-Category Name*
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input
                                            type="text"
                                            value={newSubCategoryName}
                                            onChange={(e) => setNewSubCategoryName(e.target.value)}
                                            placeholder="Sub-Category Name"
                                            className="pdetails-input2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions" style={{ marginTop: "28px" }}>
                            <Button onClick={() => setShowAddSubCategoryModal(false)}>Cancel</Button>
                            <Button variant="round-outline" onClick={handleAddSubCategory}>Add</Button>
                        </div>
                    </div>
                </Modal>
            )}

            {showEditSubCategoryModal && (
                <Modal >
                    <div className="modal-content" style={{ padding: "28px" }}>
                        <div style={{ marginBottom: "10px" }}>
                            <h5>Edit Sub-Category</h5>
                        </div>
                        <div className="personaldetails-content">
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field" style={{ textAlign: "left" }}>
                                    Sub-Category Name*
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input
                                            type="text"
                                            value={editSubCategoryName}
                                            onChange={(e) => setEditSubCategoryName(e.target.value)}
                                            placeholder="Sub-Category Name"
                                            className="pdetails-input2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions" style={{ marginTop: "28px" }}>
                            <Button onClick={() => setShowEditSubCategoryModal(false)}>Cancel</Button>
                            <Button variant="round-outline" onClick={handleEditSubCategory}>Save</Button>
                        </div>
                    </div>
                </Modal>
            )}

            {showDeleteSubCategoryModal && (
                <Modal >
                    <div className="modal-content">
                        <div style={{ marginBottom: "10px" }}>
                            <h5>Delete Sub-Category</h5>
                        </div>
                        <div className="modal-body" style={{ marginBottom: "20px" }}>
                            Are you sure you want to delete this sub-category?
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
