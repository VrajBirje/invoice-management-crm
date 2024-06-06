"use client";
import Sidebar from '@/Components/shared/Sidebar/sidebar'
import { React, useState, useEffect } from 'react'
import Topbar from '@/Components/shared/Topbar/topbar'
import { MdMailOutline } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import './page.css'
import Button from '@/Components/common/Button/Button';
import items from '@/json/items';

export default function Page() {
    const [tableRows, setTableRows] = useState([{ id: 1, item: items[0], quantity: 1, discount: 0, discountType: 'per', amount: items[0].price }]);
    const [totalAmount, setTotalAmount] = useState(tableRows[0].amount);
    const [adjustment, setAdjustment] = useState(0);
    const [tax, setTax] = useState(18);
    const [finalAmount, setfinalAmount] = useState(totalAmount + adjustment + (((totalAmount + adjustment) * tax) / 100));

    const addRow = () => {
        const newRow = { id: tableRows.length + 1, item: items[0], quantity: 1, discount: 0, discountType: 'per', amount: items[0].price };
        setTableRows([...tableRows, newRow]);
    };

    const handleItemChange = (index, event) => {
        const selectedItem = items.find(item => item.name === event.target.value);
        const updatedRows = [...tableRows];
        updatedRows[index].item = selectedItem;
        updatedRows[index].amount = selectedItem.price * updatedRows[index].quantity - calculateDiscount(selectedItem.price, updatedRows[index].quantity, updatedRows[index].discount, updatedRows[index].discountType);
        setTableRows(updatedRows);
        updateTotalAmount(updatedRows);
    };

    const handleQuantityChange = (index, event) => {
        const updatedRows = [...tableRows];
        updatedRows[index].quantity = event.target.value;
        updatedRows[index].amount = updatedRows[index].item.price * event.target.value - calculateDiscount(updatedRows[index].item.price, event.target.value, updatedRows[index].discount, updatedRows[index].discountType);
        setTableRows(updatedRows);
        updateTotalAmount(updatedRows);
    };

    const handleDiscountChange = (index, event) => {
        const updatedRows = [...tableRows];
        updatedRows[index].discount = event.target.value;
        updatedRows[index].amount = updatedRows[index].item.price * updatedRows[index].quantity - calculateDiscount(updatedRows[index].item.price, updatedRows[index].quantity, event.target.value, updatedRows[index].discountType);
        setTableRows(updatedRows);
        updateTotalAmount(updatedRows);
    };

    const handleDiscountTypeChange = (index, event) => {
        const updatedRows = [...tableRows];
        updatedRows[index].discountType = event.target.value;
        updatedRows[index].amount = updatedRows[index].item.price * updatedRows[index].quantity - calculateDiscount(updatedRows[index].item.price, updatedRows[index].quantity, updatedRows[index].discount, event.target.value);
        setTableRows(updatedRows);
        updateTotalAmount(updatedRows);
    };

    const calculateDiscount = (price, quantity, discount, discountType) => {
        if (discountType === 'per') {
            return (price * quantity * discount) / 100;
        } else if (discountType === 'num') {
            return discount;
        }
        return 0;
    };

    useEffect(() => {
        // Recalculate final amount whenever totalAmount, adjustment, or tax changes
        setfinalAmount(totalAmount + parseFloat(adjustment) + ((totalAmount + parseFloat(adjustment)) * parseFloat(tax)) / 100);
    }, [totalAmount, adjustment, tax]);

    const updateTotalAmount = (rows) => {
        const total = rows.reduce((acc, curr) => acc + curr.amount, 0);
        setTotalAmount(total);
        // setfinalAmount(totalAmount + adjustment + (((totalAmount + adjustment) * tax) / 100));
    };
    return (
        <div className='customer-layout'>
            <Sidebar active="Quotation" settingsBool={false} masterBool={false} />
            <div className="mainpage-container">
                <Topbar name="Add Quotation" />
                <div className="main-section">
                    <div className="addcustomer-personaldetails">
                        <div className="personal-details-heading">
                            <h6>Quote Details</h6>
                        </div>
                        <div className="personaldetails-content">
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field" style={{ color: "red" }}>
                                    Customer Name*
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <select
                                            type="text"
                                            name="country"
                                            className='pdetails-input3'
                                            placeholder='Mumbai'
                                        // onChange={handleChange}
                                        >
                                            <option value="" disabled selected>Select or add customer</option>
                                            <option value="value">options</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Quote Id#
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="text" className='pdetails-input2' placeholder='#QT-00001' />
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-dates">
                                <div className="pdetails-fieldvalue">
                                    <div className="label2 pdetails-field" style={{ color: "red" }}>
                                        Quote Date*
                                    </div>
                                    <div className="pdetails-value2">
                                        <div className="pdetails-value-wrapper2">
                                            <input type="text" className='pdetails-input2' placeholder='13/12/2024' />
                                        </div>
                                    </div>
                                </div>
                                <div className="pdetails-fieldvalue">
                                    <div className="label2 pdetails-field">
                                        Expiry Date
                                    </div>
                                    <div className="pdetails-value2">
                                        <div className="pdetails-value-wrapper2">
                                            <input type="text" className='pdetails-input2' placeholder='#13/12/2024' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field" style={{ color: "red" }}>
                                    Sales Person*
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <select
                                            type="text"
                                            name="country"
                                            className='pdetails-input3'
                                            placeholder='Mumbai'
                                        // onChange={handleChange}
                                        >
                                            <option value="" disabled selected>Select or add sales person</option>
                                            <option value="value">options</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field" style={{ color: "red" }}>
                                    Subject
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input type="text" className='pdetails-input2' placeholder='Subject' />
                                    </div>
                                </div>
                            </div>
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Description
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <textarea type="text" className='pdetails-input2' placeholder='Description' />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="addcustomer-personaldetails">
                        <div className="personal-details-heading">
                            <h6>Items</h6>
                        </div>
                        <div className="personaldetails-content">
                            <table id='quote-table'>
                                <thead>
                                    <tr>
                                        <th style={{ width: "30%", textAlign: "left" }}>Items</th>
                                        <th>Quantity</th>
                                        <th>Rate</th>
                                        <th>Discount</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                {/* <tbody>
                                    {tableRows.map(count => (
                                        <tr key={count.id}>
                                            <td>
                                                <select type="text" className='pdetails-input6' style={{width:"100%"}}>
                                                    <option value="">items</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input style={{textAlign:"center"}} type="number" className='pdetails-input5' />
                                            </td>
                                            <td>
                                                <input style={{textAlign:"center"}} type="number" className='pdetails-input5' />
                                            </td>
                                            <td style={{
                                                display:"flex"
                                            }}>
                                                <input style={{textAlign:"center"}} type="number" className='pdetails-input5' />
                                                <select name="" id="">
                                                    <option value="per">%</option>
                                                    <option value="num">₹</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input style={{textAlign:"center"}} type="number" className='pdetails-input5' />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody> */}
                                <tbody>
                                    {tableRows.map((row, index) => (
                                        <tr key={row.id}>
                                            {/* Select dropdown for item */}
                                            <td>
                                                <select id='item' value={row.item.name} onChange={(e) => handleItemChange(index, e)} className='pdetails-input6'
                                                    style={{
                                                        width: "100%",
                                                        WebkitAppearance: "none",
                                                        MozAppearance: "none",
                                                        border: "none"
                                                    }}>
                                                    {items.map((item, i) => (
                                                        <option key={i} value={item.name}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            {/* Input for quantity */}
                                            <td
                                                style={{
                                                    width: "17%",
                                                }}
                                            >
                                                <input type="number" value={row.quantity} onChange={(e) => handleQuantityChange(index, e)} className='pdetails-input5' style={{ textAlign: "right" }} />
                                            </td>
                                            <td
                                                style={{
                                                    width: "17%",
                                                    textAlign: "right",
                                                    padding: "7px"
                                                }}
                                            >{row.item.price}</td>
                                            {/* Input and select for discount */}
                                            <td style={{ display: 'flex', alignItems: 'center' }}>
                                                <input type="number" value={row.discount} onChange={(e) => handleDiscountChange(index, e)} className='pdetails-input5' style={{ width: "100%", textAlign: "right" }} />
                                                <select value={row.discountType} onChange={(e) => handleDiscountTypeChange(index, e)} style={{ marginLeft: '5px' }}>
                                                    <option value="per">%</option>
                                                    <option value="num">₹</option>
                                                </select>
                                            </td>
                                            {/* Display calculated amount */}
                                            <td
                                                style={{
                                                    width: "17%",
                                                    textAlign: "right",
                                                    padding: "7px"
                                                }}
                                            >{row.amount}/-</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='items-2'>
                                <Button variant='round-outline' onClick={addRow}>
                                    Add a New Row
                                </Button>
                                <div className="items-tax">

                                </div>
                            </div>
                            <div className="finalQuote-container">
                                <div className="personaldetails-content">
                                    <div className="pdetails-fieldvalue">
                                        <div className="label2 pdetails-field">
                                            Documents
                                        </div>
                                        <div className="pdetails-value2">
                                            <div className="pdetials-doc-input">
                                                <div className="pdetails-value-wrapper2">
                                                    <input type="file" className='pdetails-input4' placeholder='abc@gmail.com' />
                                                    <HiOutlineDocumentArrowUp size={18} className='pdetails-icon' />
                                                </div>
                                                <div style={{ color: "#010080" }} className="label5">The file size should be lesser than 5 mb</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pdetails-fieldvalue">
                                        <div className="label2 pdetails-field">
                                            Terms and Conditions
                                        </div>
                                        <div className="pdetails-value2">
                                            <div className="pdetails-value-wrapper2">
                                                <textarea type="text" className='pdetails-input2' placeholder='Terms and Conditions' />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="finalQuote">
                                    <div className='subtotal'>
                                        <div className="label2" style={{ fontWeight: "500" }}>Sub-Total:</div>
                                        <div className="label2" style={{ fontWeight: "500" }}>{totalAmount}/-</div>
                                    </div>
                                    <div className="subtotal">
                                        <div className="label2" style={{ fontWeight: "500" }}>Adjustment:</div>
                                        <div className="label2" style={{ fontWeight: "500" }}><input className='subtotal-input' type="number" value={adjustment} onChange={(e) => setAdjustment(e.target.value === '' ? 0 : e.target.value)} /></div>
                                    </div>
                                    <div className="subtotal">
                                        <div className="label2" style={{ fontWeight: "500" }}>Tax:</div>
                                        <div className="label2" style={{ fontWeight: "500" }}>{tax}</div>
                                    </div>
                                    <hr style={{ width: "100%" }} />
                                    <div className="subtotal">
                                        <div className="label3" style={{ fontWeight: "500", fontSize: "14px" }}>Total Amount(₹)</div>
                                        <div className="label3" style={{ fontWeight: "500", fontSize: "14px" }}>{finalAmount}/-</div>
                                    </div>
                                </div>
                            </div>
                            <div className="roleBottom">
                                <Button variant='round-outline'>
                                    Cancel
                                </Button>
                                <Button variant='round' >
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