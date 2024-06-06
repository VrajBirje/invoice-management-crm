"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '@/Components/shared/Sidebar/sidebar';
import Topbar from '@/Components/shared/Topbar/topbar';
import { Checkbox } from '@/Components/common/Checkbox/checkbox';
import './page.css';
import './table.css';
import Button from '@/Components/common/Button/Button';
import PageLoader from '@/Components/common/PageLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';

const EditRole = () => {
    const [rolePermissions, setRolePermissions] = useState([]);
    const [roleName, setRoleName] = useState('');
    const [tableData, setTableData] = useState([]);
    const searchParams = useSearchParams();
    const roleId = searchParams.get('Id');
    console.log(roleId)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/roles/menu');
                const jsonData = await response.json();

                const updatedRoles = jsonData.roles.map((item, index) => ({
                    ...item,
                    menuId: index + 1,
                }));

                const permissions = updatedRoles.map(item => ({
                    menuId: item.menuId,
                    actionAdd: 0,
                    actionView: 0,
                    actionEdit: 0,
                    actionDelete: 0,
                }));

                setTableData(updatedRoles);
                setRolePermissions(permissions);
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        };

        fetchData();

        const fetchRolePermissions = async () => {
            try {
                const response = await fetch('http://localhost:5000/roles/permissions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ roleId }),
                });
                const jsonData = await response.json();
                setRolePermissions(jsonData.roles);
                setRoleName(jsonData.roleName)
                setTimeout(() => {
                    console.log(jsonData);
                    // console.log(roleName);
                    // fetchData()
                }, 2000);
            } catch (error) {
                console.error('Error fetching role permissions:', error);
            }
        };

        if (roleId) {
            fetchRolePermissions();
        }
    }, [roleId]);

    const handlePermissionChange = (menuId, permissionType, checked) => {
        setRolePermissions(prevPermissions =>
            prevPermissions.map(p =>
                p.menuId === menuId
                    ? { ...p, [permissionType]: checked ? 1 : 0 }
                    : p
            )
        );
    };

    const handleSave = async () => {
        const payload = {
            roleId,
            permissions: rolePermissions,
        };

        try {
            const response = await fetch('http://localhost:5000/roles/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                toast.success("Role Updated Successfully")
                setTimeout(() => {
                    window.location.href='/Roles'
                }, 1000);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        
        <div className='customer-layout'>
        <ToastContainer/>
            <Sidebar active="Roles" settingsBool={false} masterBool={false} />
            <div className="mainpage-container">
                <Topbar name="Edit Role" />
                <div className="main-section">
                    <div className="addcustomer-personaldetails">
                        <div className="personal-details-heading">
                            <h6>Role Details</h6>
                        </div>
                        <div className="personaldetails-content">
                            <div className="pdetails-fieldvalue">
                                <div className="label2 pdetails-field">
                                    Role Name*
                                </div>
                                <div className="pdetails-value2">
                                    <div className="pdetails-value-wrapper2">
                                        <input
                                            type="text"
                                            className='pdetails-input2'
                                            placeholder='Role Name'
                                            value={roleName}
                                            onChange={(e) => setRoleName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        tableData.length>0 ?
                        <div className="main-section-table">
                        <table id='table'>
                            <thead>
                                <tr>
                                    <th className='th2'>Role</th>
                                    <th className='th4'>Add</th>
                                    <th className='th4'>View</th>
                                    <th className='th4'>Edit</th>
                                    <th className='th4'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((item, index) => (
                                    <tr key={index}>
                                        <td className='tableName'
                                            style={{ paddingLeft: item.isParent === 0 ? "40px" : "25px" }}
                                        >
                                            {item.menuName}
                                        </td>
                                        <td className='th1'>
                                            {item.actionAdd === 1 &&
                                                <Checkbox
                                                    checked={rolePermissions.find(p => p.menuId === item.menuId)?.actionAdd === 1 || false}
                                                    onChange={(e) => handlePermissionChange(item.menuId, 'actionAdd', e.target.checked)}
                                                />
                                            }
                                        </td>
                                        <td className="label2">
                                            {item.actionView === 1 &&
                                                <Checkbox
                                                    checked={rolePermissions.find(p => p.menuId === item.menuId)?.actionView === 1 || false}
                                                    onChange={(e) => handlePermissionChange(item.menuId, 'actionView', e.target.checked)}
                                                />
                                            }
                                        </td>
                                        <td className="label2">
                                            {item.actionEdit === 1 &&
                                                <Checkbox
                                                    checked={rolePermissions.find(p => p.menuId === item.menuId)?.actionEdit === 1 || false}
                                                    onChange={(e) => handlePermissionChange(item.menuId, 'actionEdit', e.target.checked)}
                                                />
                                            }
                                        </td>
                                        <td className="label2">
                                            {item.actionDelete === 1 &&
                                                <Checkbox
                                                    checked={rolePermissions.find(p => p.menuId === item.menuId)?.actionDelete === 1 || false}
                                                    onChange={(e) => handlePermissionChange(item.menuId, 'actionDelete', e.target.checked)}
                                                />
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="roleBottom">
                            <Button variant='round-outline'>Cancel</Button>
                            <Button variant='round' onClick={handleSave}>Save</Button>
                        </div>
                    </div>
                    :
                    <PageLoader/>
                    }
                </div>
            </div>
        </div>
        
    );
}
const Page = () => {
    return(
<Suspense fallback={<div>Loading...</div>}>
    <EditRole/>
</Suspense>
    )
}
export default Page;
// "use client";
// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Sidebar from '@/Components/shared/Sidebar/sidebar';
// import Topbar from '@/Components/shared/Topbar/topbar';
// import { Checkbox } from '@/Components/common/Checkbox/checkbox';
// import './page.css';
// import './table.css';
// import Button from '@/Components/common/Button/Button';

// export default function Page() {
//     const [rolePermissions, setRolePermissions] = useState([]);
//     const [roleName, setRoleName] = useState('');
//     const [tableData, setTableData] = useState([]);
//     const searchParams = useSearchParams();
//     const roleId = searchParams.get('Id');
//     // const rolename = searchParams.get('roleName')
//     // setRoleName(rolename)
//     console.log(roleId)

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/roles/menu');
//                 const jsonData = await response.json();

//                 const updatedRoles = jsonData.roles.map((item, index) => ({
//                     ...item,
//                     menuId: index + 1,
//                 }));

//                 const permissions = updatedRoles.map(item => ({
//                     menuId: item.menuId,
//                     actionAdd: 0,
//                     actionView: 0,
//                     actionEdit: 0,
//                     actionDelete: 0,
//                 }));

//                 setTableData(updatedRoles);
//                 setRolePermissions(permissions);
//             } catch (error) {
//                 console.error('Error fetching table data:', error);
//             }
//         };

//         fetchData();

//         const fetchRolePermissions = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/roles/permissions', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ roleId }),
//                 });
//                 const jsonData = await response.json();
//                 setRolePermissions(jsonData.roles);
//                 console.log(rolePermissions)
//                 console.log("hello")
//             } catch (error) {
//                 console.error('Error fetching role permissions:', error);
//             }
//         };

//         if (roleId) {
//             fetchRolePermissions();
//         }
//     }, [roleId]);

//     const handlePermissionChange = (menuId, permissionType, checked) => {
//         console.log("hello")
//         setRolePermissions(prevPermissions =>
//             prevPermissions.map(p =>
//                 p.menuId === menuId
//                     ? { ...p, [permissionType]: checked ? 1 : 0 }
//                     : p
//             )
//         );
//     };

//     const handleSave = async () => {
//         const payload = {
//             roleId,
//             permissions: rolePermissions,
//         };

//         try {
//             const response = await fetch('http://localhost:5000/roles/edit', {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(payload),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 console.log(data.message);
//             } else {
//                 console.error(data.error);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div className='customer-layout'>
//             <Sidebar active="Roles" settingsBool={false} masterBool={false} />
//             <div className="mainpage-container">
//                 <Topbar name="Edit Role" />
//                 <div className="main-section">
//                     <div className="addcustomer-personaldetails">
//                         <div className="personal-details-heading">
//                             <h6>Role Details</h6>
//                         </div>
//                         <div className="personaldetails-content">
//                             <div className="pdetails-fieldvalue">
//                                 <div className="label2 pdetails-field">
//                                     Role Name*
//                                 </div>
//                                 <div className="pdetails-value2">
//                                     <div className="pdetails-value-wrapper2">
//                                         <input
//                                             type="text"
//                                             className='pdetails-input2'
//                                             placeholder='Role Name'
//                                             value={roleName}
//                                             onChange={(e) => setRoleName(e.target.value)}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="main-section-table">
//                         <table id='table'>
//                             <thead>
//                                 <tr>
//                                     <th className='th2'>Role</th>
//                                     <th className='th4'>
//                                         <div style={{ display: "flex" }}>
//                                             <Checkbox />
//                                             <div>Add</div>
//                                         </div>
//                                     </th>
//                                     <th className='th4'>
//                                         <div style={{ display: "flex" }}>
//                                             <Checkbox />
                                      
//                                             <div>View</div>
//                                         </div>
//                                     </th>
//                                     <th className='th4'>
//                                         <div style={{ display: "flex" }}>
//                                             <Checkbox
//                                                 onChange={(e) => {
//                                                     tableData.forEach(tableItem => {
//                                                         handlePermissionChange(tableItem.menuId, 'actionEdit', e.target.checked);
//                                                     });
//                                                 }}
//                                             />
//                                             <div>Edit</div>
//                                         </div>
//                                     </th>
//                                     <th className='th4'>
//                                         <div style={{ display: "flex" }}>
//                                             <Checkbox />
//                                             <div>Delete</div>
//                                         </div>
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {tableData.map((item, index) => (
//                                     <tr key={index}>
//                                         <td className='tableName'
//                                             style={{ paddingLeft: item.isParent === 0 ? "40px" : "25px" }}
//                                         >
//                                             {item.menuName}
//                                         </td>
//                                         <td className='th1'>
//                                             {item.actionAdd === 1 &&
//                                                 <Checkbox
//                                                     checked={rolePermissions.find(p => p.menuId === item.menuId)?.actionAdd === 1 || false}
//                                                     onChange={(e) => handlePermissionChange(item.menuId, 'actionAdd', e.target.checked)}
//                                                 />
//                                             }
//                                         </td>
//                                         <td className="label2">
//                                             {item.actionView === 1 &&
//                                                 <Checkbox
//                                                     checked={rolePermissions.find(p => p.menuId === item.menuId)?.actionView === 1 || false}
//                                                     onChange={(e) => handlePermissionChange(item.menuId, 'actionView', e.target.checked)}
//                                                 />
//                                             }
//                                         </td>
//                                         <td className="label2">
//                                             {item.actionEdit === 1 &&
//                                                 <Checkbox
//                                                     checked={rolePermissions.find(p => p.menuId === item.menuId)?.actionEdit === 1 || false}
//                                                     onChange={(e) => handlePermissionChange(item.menuId, 'actionEdit', e.target.checked)}
//                                                 />
//                                             }
//                                         </td>
//                                         <td className="label2">
//                                             {item.actionDelete === 1 &&
//                                                 <Checkbox
//                                                     checked={rolePermissions.find(p => p.menuId === item.menuId)?.actionDelete === 1 || false}
//                                                     onChange={(e) => handlePermissionChange(item.menuId, 'actionDelete', e.target.checked)}
//                                                 />
//                                             }
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <div className="roleBottom">
//                             <Button variant='round-outline'>Cancel</Button>
//                             <Button variant='round' onClick={handleSave}>Save</Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
