import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom

const Productnew = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const LARAVEL_API_URL = process.env.REACT_APP_LARAVEL_API_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${LARAVEL_API_URL}/api/home/products`);

                if (response.data && response.data.status === "success" && response.data.sanphammoi) {
                    setProducts(response.data.sanphammoi);
                } else {
                    setError('Dữ liệu sản phẩm mới không hợp lệ.');
                }
                setLoading(false);
            } catch (err) {
                setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
                setLoading(false);
                console.error("Lỗi khi tải sản phẩm mới:", err);
            }
        };

        fetchProducts();
    }, [LARAVEL_API_URL]);

    if (loading) {
        return (
            <section className="new-products-section py-5 text-center">
                <div className="container">
                    <p>Đang tải sản phẩm mới...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="new-products-section py-5 text-center">
                <div className="container">
                    <p className="text-danger">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="new-products-section py-5">
            <div className="container">
                <div className="section-header text-center mb-4 p-3">
                    <h2 className="text-white mb-0">SẢN PHẨM MỚI</h2>
                </div>

                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 justify-content-center">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div className="col" key={product.id_product_detail || product.id_product}>
                                {/* Bọc toàn bộ thẻ sản phẩm bằng component Link */}
                                {/* 'to' là đường dẫn đến trang chi tiết, sử dụng id_product_detail */}
                               <Link to={`/product/${product.id_product}`} className="text-decoration-none text-dark">
                                    <div className="product-card">
                                        {/* Hiển thị phần trăm giảm giá nếu có */}
                                        {/* Giả định: product.gia là giá sau giảm, product.price là giá gốc */}
                                        {product.gia && product.price && parseFloat(product.gia) < parseFloat(product.price) && (
                                            <span className="discount-badge">
                                                -{((1 - (parseFloat(product.gia) / parseFloat(product.price))) * 100).toFixed(0)}%
                                            </span>
                                        )}
                                        <div className="product-image-wrapper">
                                        <img
                                          src={product.img || 'https://via.placeholder.com/150'} // Sử dụng trực tiếp product.img
                                          className="img-fluid"
                                          alt={product.name}
                                      />
                                        </div>
                                        <div className="product-info p-2">
                                            <p className="product-name mb-1">{product.name}</p>
                                            <div className="rating mb-1">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-regular fa-star"></i>
                                                <i className="fa-regular fa-star"></i>
                                            </div>
                                            <p className="product-price mb-0">
                                                {/* Hiển thị giá đã giảm nếu có, nếu không thì giá gốc */}
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseFloat(product.gia) || parseFloat(product.price))}
                                            </p>
                                            {/* Hiển thị giá gốc gạch ngang nếu có giảm giá */}
                                            {product.gia && product.price && parseFloat(product.gia) < parseFloat(product.price) && (
                                                <p className="original-price" style={{ textDecoration: 'line-through', fontSize: '0.8em', color: '#888' }}>
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseFloat(product.price))}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>Không tìm thấy sản phẩm mới nào.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Productnew;