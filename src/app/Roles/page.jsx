// "use client";
// import Sidebar from '@/Components/shared/Sidebar/sidebar';
// import { React, useState, useEffect } from 'react';
// import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
// import './page.css';
// import './table.css';
// import { RiAddFill } from "react-icons/ri";
// import Topbar from '@/Components/shared/Topbar/topbar';
// import Button from '@/Components/common/Button/Button';
// import { Search } from '@/Components/common/Search/search';
// import { Checkbox } from '@/Components/common/Checkbox/checkbox';
// import { MdDeleteOutline } from "react-icons/md";
// import { IoMdArrowDropleft } from "react-icons/io";
// import { LuClipboardEdit } from "react-icons/lu";
// import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
// import Link from 'next/link';
// import Modal from '@/Components/common/Modal/Modal';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function Page() {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [data, setData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [showModal, setShowModal] = useState(false);
//     const [roleToDelete, setRoleToDelete] = useState(null);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/roles');
//             const jsonData = await response.json();
//             setData(jsonData.roles);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const filteredData = searchTerm
//         ? data.filter(item => {
//             const searchTerms = searchTerm.toLowerCase().split(' ');
//             return searchTerms.every(term =>
//                 (item.roleName.toString().toLowerCase().includes(term))
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

//     const handleDeleteClick = (role) => {
//         setRoleToDelete(role);
//         setShowModal(true);
//     };

//     const confirmDelete = async () => {
//         try {
//             await axios.delete(`http://localhost:5000/roles/delete`, { roleId: roleToDelete.roleId });
//             console.log(roleToDelete.roleId)
//             window.location.reload(); // Reload the page after deletion
//             toast.success("role deleted successfully")
//         } catch (error) {
//             console.error('Error deleting role:', error.data.error);
//             toast.error(error.data.error)
//         }
//     };

//     return (
//         <div className='customer-layout'>
//         <ToastContainer/>
//             <Sidebar active="Roles" settingsBool={true} masterBool={false} />
//             <div className="mainpage-container">
//                 <Topbar name="Roles" />
//                 <div className="main-section">
//                     <div className="main-section-top">
//                         <div className="main-section-search">
//                             <Search value={searchTerm} onChange={handleSearch} />
//                         </div>
//                         <div className="main-section-top-buttons">
//                             <Button variant='round-outline' suffixIcon={<IoMdArrowDropdown size={20} />}>
//                                 Newest
//                             </Button>
//                             <Button link="/Roles/addrole" variant='round' prefixIcon={<RiAddFill size={20} />}>
//                                 New Role
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
//                                         Role
//                                     </th>
//                                     <th>
//                                         Permissions
//                                     </th>
//                                     <th>
//                                         Actions
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
//                                             {item.roleName}
//                                         </td>
//                                         <td className='actionsTable'>
//                                             <div className="table-contacts">
//                                                 <div className="table-contact">
//                                                     <HiOutlineClipboardDocumentCheck size={19} />
//                                                 </div>
//                                                 <div className="label2">
//                                                     Permissions
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className='actionsTable'>
//                                             <div className="table-contacts">
//                                                 <MdDeleteOutline size={22} onClick={() => handleDeleteClick(item)} />
//                                                 <Link href={{ pathname: '/Roles/editrole', query: { ...item } }}>
//                                                     <LuClipboardEdit size={22} />
//                                                 </Link>
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
//             {showModal && (
//                 <Modal>
//                     <div className="modal-content">
//                         <div style={{marginBottom:"10px"}}>
//                             <h5>Confirm Deletion</h5>
//                         </div>
//                         <div>
//                             <p>Are you sure you want to delete {roleToDelete.roleName}?</p>
//                         </div>
//                         <div className="modal-actions">
//                             <Button onClick={() => setShowModal(false)}>Cancel</Button>
//                             <Button variant='round-outline' onClick={confirmDelete}>Delete</Button>
//                         </div>
//                     </div>
//                 </Modal>
//             )}
//         </div>
//     )
// }
"use client";
import Sidebar from '@/Components/shared/Sidebar/sidebar';
import { React, useState, useEffect } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import './page.css';
import './table.css';
import { RiAddFill } from "react-icons/ri";
import Topbar from '@/Components/shared/Topbar/topbar';
import Button from '@/Components/common/Button/Button';
import { Search } from '@/Components/common/Search/search';
import { Checkbox } from '@/Components/common/Checkbox/checkbox';
import { MdDeleteOutline } from "react-icons/md";
import { IoMdArrowDropleft } from "react-icons/io";
import { LuClipboardEdit } from "react-icons/lu";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import Link from 'next/link';
import Modal from '@/Components/common/Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/roles');
            const jsonData = await response.json();
            setData(jsonData.roles);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const filteredData = searchTerm
        ? data.filter(item => {
            const searchTerms = searchTerm.toLowerCase().split(' ');
            return searchTerms.every(term =>
                (item.roleName.toString().toLowerCase().includes(term))
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

    const handleDeleteClick = (role) => {
        setRoleToDelete(role);
        setShowModal(true);
        console.log(role)
    };

    const confirmDelete = async () => {
        console.log(roleToDelete.Id)
        try {
            const response = await fetch('http://localhost:5000/roles/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roleId: roleToDelete.Id }),
            });

            if (!response.ok) {
                throw new Error('Error deleting role');
            }

            window.location.reload(); // Reload the page after deletion
            toast.success("Role deleted successfully");
        } catch (error) {
            console.error('Error deleting role:', error);
            toast.error('Error deleting role');
        }
    };

    return (
        <div className='customer-layout'>
            <ToastContainer />
            <Sidebar active="Roles" settingsBool={true} masterBool={false} />
            <div className="mainpage-container">
                <Topbar name="Roles" />
                <div className="main-section">
                    <div className="main-section-top">
                        <div className="main-section-search">
                            <Search value={searchTerm} onChange={handleSearch} />
                        </div>
                        <div className="main-section-top-buttons">
                            <Button variant='round-outline' suffixIcon={<IoMdArrowDropdown size={20} />}>
                                Newest
                            </Button>
                            <Button link="/Roles/addrole" variant='round' prefixIcon={<RiAddFill size={20} />}>
                                New Role
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
                                        Role
                                    </th>
                                    <th>
                                        Permissions
                                    </th>
                                    <th>
                                        Actions
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
                                            {item.roleName}
                                        </td>
                                        <td className='actionsTable'>
                                            <div className="table-contacts">
                                                <div className="table-contact">
                                                    <HiOutlineClipboardDocumentCheck size={19} />
                                                </div>
                                                <div className="label2">
                                                    Permissions
                                                </div>
                                            </div>
                                        </td>
                                        <td className='actionsTable'>
                                            <div className="table-contacts">
                                                <MdDeleteOutline size={22} onClick={() => handleDeleteClick(item)} />
                                                <Link href={{ pathname: '/Roles/editrole', query: { Id:item.Id} }}>
                                                    <LuClipboardEdit size={22} />
                                                </Link>
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
            {showModal && (
                <Modal>
                    <div className="modal-content">
                        <div style={{marginBottom:"10px"}}>
                            <h5>Confirm Deletion</h5>
                        </div>
                        <div>
                            <p>Are you sure you want to delete {roleToDelete.roleName}?</p>
                        </div>
                        <div className="modal-actions">
                            <Button onClick={() => setShowModal(false)}>Cancel</Button>
                            <Button variant='round-outline' onClick={confirmDelete}>Delete</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}
