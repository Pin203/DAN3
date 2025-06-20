import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductFlash = () => {
    const [saleProducts, setSaleProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const LARAVEL_API_URL = process.env.REACT_APP_LARAVEL_API_URL;

    useEffect(() => {
        const fetchSaleProducts = async () => {
            try {
                const response = await axios.get(`${LARAVEL_API_URL}/api/home/products`);

                if (response.data && response.data.status === "success" && response.data.sanphamsale) {
                    setSaleProducts(response.data.sanphamsale);
                } else {
                    setError('Không tìm thấy sản phẩm giảm giá hoặc dữ liệu không hợp lệ.');
                }
                setLoading(false);
            } catch (err) {
                setError('Không thể tải sản phẩm giảm giá. Vui lòng thử lại sau.');
                setLoading(false);
                console.error("Lỗi khi tải sản phẩm giảm giá:", err);
            }
        };

        fetchSaleProducts();
    }, [LARAVEL_API_URL]);

    if (loading) {
        return (
            <section className="flash-sale-section py-5 text-center">
                <div className="container">
                    <p>Đang tải ưu đãi hấp dẫn...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="flash-sale-section py-5 text-center">
                <div className="container">
                    <p className="text-danger">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="flash-sale-section py-5">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="flash-sale-header d-flex align-items-center">
                        <img src={`${LARAVEL_API_URL}/images/flash_sale_tag.png`} alt="Flash Sale" className="flash-sale-tag me-3" />
                        <h2 className="section-title-flash mb-0">ƯU ĐÃI HẤP DẪN</h2>
                    </div>
                    <div className="countdown-timer d-flex align-items-center">
                        <span className="countdown-label">Chỉ còn:</span>
                        <div className="countdown-box">
                            <span className="countdown-value">35</span>
                        </div>
                        <span className="countdown-separator">:</span>
                        <div className="countdown-box">
                            <span className="countdown-value">16</span>
                        </div>
                        <span className="countdown-separator">:</span>
                        <div className="countdown-box">
                            <span className="countdown-value">04</span>
                        </div>
                        <span className="countdown-separator">:</span>
                        <div className="countdown-box">
                            <span className="countdown-value">11</span>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 justify-content-center">
                    {saleProducts.length > 0 ? (
                        saleProducts.map((product) => {
                            const originalPrice = parseFloat(product.price);
                            const discountPercentage = parseFloat(product.discount) || 0; // Lấy giá trị discount, mặc định là 0
                            let discountedPrice = originalPrice; // Mặc định giá đã giảm là giá gốc

                            // Nếu có phần trăm giảm giá, tính giá đã giảm
                            if (discountPercentage > 0 && discountPercentage <= 100) {
                                discountedPrice = originalPrice * (1 - discountPercentage / 100);
                            }
                            return (
                                <div className="col" key={product.id_product}>
                                    <div className="flash-product-card">
                                        {discountPercentage > 0 && (
                                            <span className="discount-badge-flash">-{discountPercentage.toFixed(0)}%</span>
                                        )}
                                        <div className="flash-product-image-wrapper">
                                            <img
                                                src={product.img  || 'https://via.placeholder.com/150'}
                                                className="img-fluid"
                                                alt={product.name}
                                            />
                                        </div>
                                        <div className="flash-product-info p-2">
                                            <p className="flash-product-name mb-1">{product.name}</p>
                                            <p className="flash-product-price mb-1">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discountedPrice)}
                                                {discountedPrice < originalPrice && (
                                                    <span className="original-price" style={{ textDecoration: 'line-through', marginLeft: '8px' }}>
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(originalPrice)}
                                                    </span>
                                                )}
                                            </p>
                                            <button className="btn btn-mua-ngay">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-12 text-center">
                            <p>Không có ưu đãi hấp dẫn nào vào lúc này.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductFlash;