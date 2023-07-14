import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { Link, Outlet } from 'react-router-dom'




function Dashboard() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }
    return (
        <div className ="container-fluid dashboard">
            <div class="row flex-nowrap">
                <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span class="fs-5 d-none d-sm-inline">ShopName</span>
                        </a>
                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li>
                                <Link to="/" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                                    <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                            </li>

                            <li>
                                <a href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                                    <i class="fs-4 bi-cash-coin"></i> <span class="ms-1 d-none d-sm-inline">Transaction</span>
                                </a>
                            </li>
                            <li>
                                <Link to="/customer" class="nav-link px-0 align-middle">
                                    <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Customers</span> </Link>
                            </li>
                            <li>
                                <Link to="employee" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                                    <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Employee</span>
                                </Link>
                            </li>



                            <li>
                                <a href="#submenu6" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                                    <i class="fs-4 bi-file-earmark-bar-graph"></i> <span class="ms-1 d-none d-sm-inline">Report</span>
                                </a>
                            </li>



                        </ul>

                    </div>
                </div>

                <div class="col p-0 m-0" >
                    <div className='p-2 d-flex justify-content-between shadow'>
                        <div></div>
                        <h4 className=''>Account Management System</h4>
                        <div className="dropdown ml-auto">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded={dropdownOpen} onClick={toggleDropdown}>
                                <i className="bi bi-gear-fill"></i>
                            </button>
                            <ul className={`dropdown-menu mr-n5 ${dropdownOpen ? "show" : ""}`} aria-labelledby="dropdownMenuButton" style={{marginLeft:'-100px'}}>
                                <li><Link to="/profile" className="dropdown-item"><i className="bi bi-person-fill"></i> Profile</Link></li>
                                <li><Link to="/logout" className="dropdown-item"><i className="bi bi-box-arrow-right"></i> Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                    <Outlet />
                </div>


            </div>
        </div>
    )
}


export default Dashboard