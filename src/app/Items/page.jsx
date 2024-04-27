"use client";
import Sidebar from '@/Components/shared/Sidebar/sidebar'
import { React, useState, useEffect } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import './page.css'
import './table.css'
import { RiAddFill } from "react-icons/ri";
import Topbar from '@/Components/shared/Topbar/topbar'
import Button from '@/Components/common/Button/Button'
import { Search } from '@/Components/common/Search/search';
import { Checkbox } from '@/Components/common/Checkbox/checkbox';
import dataMain from '@/json/data';
import { MdDeleteOutline } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { LuMail } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";

export default function page() {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10); // State for items per page
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const date = new Date();
    const activeDate = date.toLocaleDateString();
    const itemsPerPageOptions = [10, 15, 20, 25];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://dev-d478mkay4qiodj5.api.raw-labs.com/api/json');
            const jsonData = await response.json();
            // setData(jsonData);
            setData(dataMain);
        } catch (error) {
            console.error('Error fetching data:', error);
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
    return (
        <div className='customer-layout'>
            <Sidebar active="Items" settingsBool={false} masterBool={false} />
            <div className="mainpage-container">
                <Topbar name="Items" />
                <div className="main-section">
                    <div className="main-section-top">
                        <div className="main-section-search">
                            <Search />
                        </div>
                        <div className="main-section-top-buttons">
                            <Button variant='round-outline' suffixIcon={<IoMdArrowDropdown size={20} />}>
                                Newest
                            </Button>
                            <Button variant='round' link="/Items/additem" prefixIcon={<RiAddFill size={20} />}>
                                New Item
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
                                        Item Name
                                    </th>
                                    <th>
                                        Description
                                    </th>
                                    <th>
                                        Type
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
                                            {item.name}
                                        </td>
                                        <td className='label2'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, suscipit.
                                        </td>
                                        <td className='label2'>Product</td>
                                        <td className='actionsTable'>
                                            <div className="table-contacts">
                                                <MdDeleteOutline size={22} />
                                                <LuClipboardEdit size={22} />
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
        </div>
    )
}

