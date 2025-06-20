import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 

const Header = () => {
    return (
        <> 
            <nav className="navbar navbar-expand-lg top-navbar py-2">
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img src="" alt="" className="me-2" style={{ height: '35px' }} />
                    </a>

                    <div className="d-flex align-items-center ms-4 me-5">
                        <i className="fa-solid fa-location-dot store-icon me-1"></i>
                        <a className="nav-link store-link" href="#">HỆ THỐNG CỬA HÀNG</a>
                    </div>

                    <div className="input-group search-bar flex-grow-1 mx-4">
                        <input type="text" className="form-control" placeholder="Tìm sản phẩm..." aria-label="Tìm sản phẩm" />
                        <button className="btn btn-search" type="button"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>

                    <ul className="navbar-nav right-icons d-flex flex-row ms-auto">
                        <li className="nav-item text-center mx-2">
                            <a className="nav-link d-flex flex-column align-items-center" href="#">
                                <div className="icon-circle d-flex justify-content-center align-items-center">
                                    <i className="fa-solid fa-user fa-lg"></i>
                                </div>
                                <small>TÀI KHOẢN</small>
                            </a>
                        </li>
                        <li className="nav-item text-center mx-2">
                            <a className="nav-link d-flex flex-column align-items-center" href="#">
                                <div className="icon-circle d-flex justify-content-center align-items-center">
                                    <i className="fa-regular fa-heart fa-lg"></i>
                                </div>
                                <small>YÊU THÍCH</small>
                            </a>
                        </li>
                        <li className="nav-item text-center mx-2">
                            <a className="nav-link d-flex flex-column align-items-center" href="#">
                                <div className="icon-circle d-flex justify-content-center align-items-center">
                                    <i className="fa-solid fa-cart-shopping fa-lg"></i>
                                </div>
                                <small>GIỎ HÀNG</small>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <nav className="navbar navbar-expand-lg main-nav">
                <div className="container">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">TRANG CHỦ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">GIỚI THIỆU</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    SẢN PHẨM
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Sản phẩm 1</a></li>
                                    <li><a className="dropdown-item" href="#">Sản phẩm 2</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">THƯƠNG HIỆU</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">HƯỚNG DẪN</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">TIN TỨC</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">LIÊN HỆ</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header; 


