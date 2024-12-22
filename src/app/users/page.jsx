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
// import { MdDeleteOutline } from "react-icons/md";
// import { LuClipboardEdit } from "react-icons/lu";
// import { LuMail } from "react-icons/lu";
// import { FiPhone } from "react-icons/fi";
// import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
// import Link from 'next/link';
// import Modal from '@/Components/common/Modal/Modal';
// import axios from 'axios';

// export default function Page() {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [data, setData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [showModal, setShowModal] = useState(false);
//     const [userToDelete, setUserToDelete] = useState(null);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/users/getAll');
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

//     const handleDeleteClick = (user) => {
//         setUserToDelete(user);
//         setShowModal(true);
//     };

//     const confirmDelete = async () => {
//         try {
//             await axios.delete(`http://localhost:5000/users/delete/${userToDelete.Id}`);
//             // setData(data.filter(item => item.id !== userToDelete.id));
//             // setShowModal(false);
//             window.location.href = '/users';
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     return (
//         <div className='customer-layout'>
//             <Sidebar active="Users" settingsBool={true} masterBool={false} />
//             <div className="mainpage-container">
//                 <Topbar name="Users" />
//                 <div className="main-section">
//                     <div className="main-section-top">
//                         <div className="main-section-search">
//                             <Search value={searchTerm} onChange={handleSearch} />
//                         </div>
//                         <div className="main-section-top-buttons">
//                             <Button variant='round-outline' suffixIcon={<IoMdArrowDropdown size={20} />}>
//                                 Newest
//                             </Button>
//                             <Button link="/users/adduser" variant='round' prefixIcon={<RiAddFill size={20} />}>
//                                 New User
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
//                                         Name
//                                     </th>
//                                     <th>
//                                         Id
//                                     </th>
//                                     <th>
//                                         Role
//                                     </th>
//                                     <th>
//                                         Company
//                                     </th>
//                                     <th>
//                                         Contact
//                                     </th>
//                                     <th>
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
//                                             {item.firstName} {item.lastName}
//                                         </td>
//                                         <td className='tableId'>#{item.phoneNo}</td>
//                                         <td className='label2'>{item.roleId}</td>
//                                         <td className='label2'>Hoarway</td>
//                                         <td className='actionsTable'>
//                                             <div className="table-contacts">
//                                                 <div className="table-contact">
//                                                     <FiPhone size={19} />
//                                                 </div>
//                                                 <div className="table-contact">
//                                                     <LuMail size={19} />
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className='actionsTable'>
//                                             <div className="table-contacts">
//                                                 <MdDeleteOutline size={22} onClick={() => handleDeleteClick(item)} />
//                                                 <Link href={{ pathname: '/users/edituser', query: { ...item } }} ><LuClipboardEdit size={22} /></Link>
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
//                             <p>Are you sure you want to delete {userToDelete.firstName} {userToDelete.lastName}?</p>
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
import { IoMdArrowDropdown } from "react-icons/io";
import './page.css';
import './table.css';
import { RiAddFill } from "react-icons/ri";
import Topbar from '@/Components/shared/Topbar/topbar';
import Button from '@/Components/common/Button/Button';
import { Search } from '@/Components/common/Search/search';
import { Checkbox } from '@/Components/common/Checkbox/checkbox';
import { MdDeleteOutline } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { LuMail } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import Link from 'next/link';
import Modal from '@/Components/common/Modal/Modal';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Page() {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [cookies] = useCookies(['token']);
    const token = cookies.token;
    // console.log(token)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getAll`,{
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

    useEffect(() => {
        const fetchRoles = async () => {
            const updatedData = await Promise.all(data.map(async user => {
                const roleResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/roles/${user.roleId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const roleName = roleResponse.data.roleName;
                return { ...user, roleName };
            }));
            setData(updatedData);
        };
        fetchRoles();
    }, [data]);

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

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/delete/${userToDelete.Id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            window.location.href = '/users';
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className='customer-layout'>
            <Sidebar active="Users" settingsBool={true} masterBool={false} />
            <div className="mainpage-container">
                <Topbar name="Users" />
                <div className="main-section">
                    <div className="main-section-top">
                        <div className="main-section-search">
                            <Search value={searchTerm} onChange={handleSearch} />
                        </div>
                        <div className="main-section-top-buttons">
                            <Button variant='round-outline' suffixIcon={<IoMdArrowDropdown size={20} />}>
                                Newest
                            </Button>
                            <Button link="/users/adduser" variant='round' prefixIcon={<RiAddFill size={20} />}>
                                New User
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
                                        Name
                                    </th>
                                    {/* <th>
                                        Id
                                    </th> */}
                                    <th>
                                        Role
                                    </th>
                                    <th>
                                        Company
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
                                        {/* <td className='tableId'>#{item.phoneNo}</td> */}
                                        <td className='label2'>{item.roleName}</td>
                                        <td className='label2'>Hoarway</td>
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
                                                <MdDeleteOutline size={22} onClick={() => handleDeleteClick(item)} />
                                                <Link href={{ pathname: '/users/edituser', query: { ...item } }} ><LuClipboardEdit size={22} /></Link>
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
                        <div style={{ marginBottom: "10px" }}>
                            <h5>Confirm Deletion</h5>
                        </div>
                        <div>
                            <p>Are you sure you want to delete {userToDelete.firstName} {userToDelete.lastName}?</p>
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
