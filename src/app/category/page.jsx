
// "use client";
// import Sidebar from '@/Components/shared/Sidebar/sidebar';
// import { React, useState, useEffect } from 'react';
// import { IoMdArrowDropdown } from "react-icons/io";
// import './page.css';
// import './table.css';
// import { RiAddFill } from "react-icons/ri";
// import Topbar from '@/Components/shared/Topbar/topbar';
// import Button from '@/Components/common/Button/Button';
// import { Search } from '@/Components/common/Search/search';
// import { Checkbox } from '@/Components/common/Checkbox/checkbox';
// import dataMain from '@/json/data';
// import { MdDeleteOutline } from "react-icons/md";
// import { LuClipboardEdit } from "react-icons/lu";
// import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
// import Modal from '@/Components/common/Modal/Modal';
// import axios from 'axios';

// export default function Page() {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [data, setData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
//     const [newCategoryName, setNewCategoryName] = useState('');

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/category/getAll');
//             const jsonData = await response.json();
//             setData(jsonData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const filteredData = searchTerm
//         ? data.filter(item => {
//             const searchTerms = searchTerm.toLowerCase().split(' ');
//             return searchTerms.every(term =>
//                 (item.serialNumber.toString().toLowerCase().includes(term)) ||
//                 (item.name.toString().toLowerCase().includes(term))
//             );
//         })
//         : data;

//     const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//     const handlePagination = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const pageNumbersToDisplay = [currentPage - 1, currentPage, currentPage + 1].filter(pageNumber => pageNumber > 0 && pageNumber <= totalPages);

//     const rangeStart = (currentPage - 1) * itemsPerPage + 1;
//     const rangeEnd = Math.min(currentPage * itemsPerPage, data.length);

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//     const handleSearch = (event) => {
//         setCurrentPage(1);
//         setSearchTerm(event.target.value);
//     };
//     var datetime = new Date();
//     console.log(datetime);

//     const handleAddCategory = async () => {
//         try {
//             await axios.post('http://localhost:5000/category/add', { createdId: 1, updatedId: 1, createdDate: datetime, categoryName: newCategoryName });
//             setShowAddCategoryModal(false);
//             setNewCategoryName('');
//             fetchData();
//         } catch (error) {
//             console.error('Error adding category:', error);
//         }
//     };

//     return (
//         <div className='customer-layout'>
//             <Sidebar active="Category" settingsBool={false} masterBool={true} />
//             <div className="mainpage-container">
//                 <Topbar name="Category" />
//                 <div className="main-section">
//                     <div className="main-section-top">
//                         <div className="main-section-search">
//                             <Search value={searchTerm} onChange={handleSearch} />
//                         </div>
//                         <div className="main-section-top-buttons">
//                             <Button variant='round-outline' suffixIcon={<IoMdArrowDropdown size={20} />}>
//                                 Newest
//                             </Button>
//                             <Button variant='round' prefixIcon={<RiAddFill size={20} />} onClick={() => setShowAddCategoryModal(true)}>
//                                 New Category
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
//                                         Category
//                                     </th>
//                                     <th style={{ textAlign: "center" }}>
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
//                                             {item.categoryName}
//                                         </td>
//                                         <td className='actionsTable'>
//                                             <div className="table-contacts" style={{ justifyContent: "center" }}>
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
//             {showAddCategoryModal && (
//                 <Modal >
//                     <div className="modal-content" style={{padding:"28px"}}>
//                         <div style={{ marginBottom: "10px" }}>
//                             <h5>Add New Category</h5>
//                         </div>
//                         <div className="personaldetails-content">
//                             <div className="pdetails-fieldvalue">
//                                 <div className="label2 pdetails-field" style={{textAlign:"left"}}>
//                                     Category Name*
//                                 </div>
//                                 <div className="pdetails-value2">
//                                     <div className="pdetails-value-wrapper2">
//                                         <input
//                                             type="text"
//                                             value={newCategoryName}
//                                             onChange={(e) => setNewCategoryName(e.target.value)}
//                                             placeholder="Category Name"
//                                             className="pdetails-input2"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* <div>
//                             <input
//                                 type="text"
//                                 value={newCategoryName}
//                                 onChange={(e) => setNewCategoryName(e.target.value)}
//                                 placeholder="Category Name"
//                                 className="input-field"
//                             />
//                         </div> */}
//                         <div className="modal-actions">
//                             <Button onClick={() => setShowAddCategoryModal(false)}>Cancel</Button>
//                             <Button variant='round-outline' onClick={handleAddCategory}>Add</Button>
//                         </div>
//                     </div>
//                 </Modal>
//             )}
//         </div>
//     )
// }
"use client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '@/Components/shared/Sidebar/sidebar';
import { React, useState, useEffect } from 'react';
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
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
    const [cookies] = useCookies(['token']);
    const token = cookies.token;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category/getAll`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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

    const handleAddCategory = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category/add`, { createdId: 1, updatedId: 1, createdDate: datetime, categoryName: newCategoryName }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowAddCategoryModal(false);
            setNewCategoryName('');
            fetchData();
            toast.success("Category Added successfully")
        } catch (error) {
            console.error('Error adding category:', error);
            console.log(error.response.data)
            toast.error(error.response.data.error)
        }
    };

    const handleEditCategory = async () => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${editCategoryId}`, { categoryName: editCategoryName }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowEditCategoryModal(false);
            setEditCategoryId(null);
            setEditCategoryName('');
            fetchData();
            toast.success(`Category ${editCategoryId} updated successfully`)
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDeleteCategory = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${deleteCategoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowDeleteCategoryModal(false);
            setDeleteCategoryId(null);
            fetchData();
            toast.success(`Category ${editCategoryId} deleted successfully`)
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className='customer-layout'>
            <ToastContainer />
            <Sidebar active="Category" settingsBool={false} masterBool={true} />
            <div className="mainpage-container">
                <Topbar name="Category" />
                <div className="main-section">
                    <div className="main-section-top">
                        <div className="main-section-search">
                            <Search value={searchTerm} onChange={handleSearch} />
                        </div>
                        <div className="main-section-top-buttons">
                            <Button variant='round-outline' suffixIcon={<IoMdArrowDropdown size={20} />}>
                                Newest
                            </Button>
                            <Button variant='round' prefixIcon={<RiAddFill size={20} />} onClick={() => setShowAddCategoryModal(true)}>
                                New Category
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
                                            {item.categoryName}
                                        </td>
                                        <td className='actionsTable'>
                                            <div className="table-contacts" style={{ justifyContent: "center" }}>
                                                <MdDeleteOutline size={22} onClick={() => {
                                                    setDeleteCategoryId(item.Id);
                                                    setShowDeleteCategoryModal(true);
                                                    console.log(deleteCategoryId)
                                                }} />
                                                <LuClipboardEdit size={22} onClick={() => {
                                                    setEditCategoryId(item.Id);
                                                    setEditCategoryName(item.categoryName);
                                                    setShowEditCategoryModal(true);
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
            {showAddCategoryModal && (
                <Modal >
                    <div className="modal-content" style={{ padding: "28px" }}>
                        <div style={{ marginBottom: "10px" }}>
                            <h5>Add New Category</h5>
                        </div>
                        <div className="personaldetails-content">
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field" style={{ textAlign: "left" }}>
                                    Category Name*
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input
                                            type="text"
                                            value={newCategoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                            placeholder="Category Name"
                                            className="pdetails-input2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <Button onClick={() => setShowAddCategoryModal(false)}>Cancel</Button>
                            <Button variant='round-outline' onClick={handleAddCategory}>Add</Button>
                        </div>
                    </div>
                </Modal>
            )}
            {showEditCategoryModal && (
                <Modal >
                    <div className="modal-content" style={{ padding: "28px" }}>
                        <div style={{ marginBottom: "10px" }}>
                            <h5>Edit Category</h5>
                        </div>
                        <div className="personaldetails-content">
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field" style={{ textAlign: "left" }}>
                                    Category Name*
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input
                                            type="text"
                                            value={editCategoryName}
                                            onChange={(e) => setEditCategoryName(e.target.value)}
                                            placeholder="Category Name"
                                            className="pdetails-input2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <Button onClick={() => setShowEditCategoryModal(false)}>Cancel</Button>
                            <Button variant='round-outline' onClick={handleEditCategory}>Update</Button>
                        </div>
                    </div>
                </Modal>
            )}
            {showDeleteCategoryModal && (
                <Modal >
                    <div className="modal-content" style={{ padding: "28px" }}>
                        <div style={{ marginBottom: "10px" }}>
                            <h5>Confirm Delete</h5>
                        </div>
                        <div className="modal-actions">
                            <Button onClick={() => setShowDeleteCategoryModal(false)}>Cancel</Button>
                            <Button variant='round-outline' onClick={handleDeleteCategory}>Delete</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
