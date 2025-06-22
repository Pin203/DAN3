import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams(); // id này sẽ là id_product từ URL
    const [product, setProduct] = useState(null); // Dữ liệu sản phẩm chính
    const [availableDetails, setAvailableDetails] = useState([]); // Các biến thể khác (màu/size)
    const [mainImage, setMainImage] = useState(''); // URL của ảnh chính đang hiển thị
    const [thumbnails, setThumbnails] = useState([]); // Mảng các URL ảnh nhỏ
    const [error, setError] = useState(null); // Xử lý lỗi

    // Đảm bảo biến môi trường này được cấu hình trong .env.local hoặc .env
    // Ví dụ: REACT_APP_LARAVEL_API_URL=http://localhost:8000
    const LARAVEL_API_URL = process.env.REACT_APP_LARAVEL_API_URL;

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                // Gọi API để lấy thông tin chi tiết sản phẩm dựa trên id_product
                const response = await axios.get(`${LARAVEL_API_URL}/api/product/${id}`);

                if (response.data && response.data.name) {
                    setProduct(response.data); // Đặt dữ liệu của sản phẩm chính
                    setAvailableDetails(response.data.other_details || []);

                    // LƯU Ý QUAN TRỌNG VỀ ĐƯỜNG DẪN ẢNH:
                    // Như đã thảo luận, nếu product.img từ API đã là URL đầy đủ,
                    // KHÔNG cần thêm LARAVEL_API_URL vào nữa.
                    if (response.data.img) {
                        setMainImage(response.data.img); // Sử dụng trực tiếp URL từ API
                    }

                    let allThumbnails = [];
                    // Thêm ảnh chính vào danh sách ảnh nhỏ
                    if (response.data.img) {
                        allThumbnails.push(response.data.img);
                    }
                    // Thêm ảnh từ các biến thể khác (nếu có và nếu chúng có ảnh riêng)
                    if (response.data.other_details && Array.isArray(response.data.other_details)) {
                        response.data.other_details.forEach(detail => {
                            if (detail.img && detail.img !== response.data.img && !allThumbnails.includes(detail.img)) {
                                allThumbnails.push(detail.img);
                            }
                        });
                    }
                    setThumbnails(allThumbnails);

                } else {
                    setError('Dữ liệu sản phẩm không hợp lệ hoặc không tìm thấy.');
                }
            } catch (err) {
                setError('Không thể tải chi tiết sản phẩm. Vui lòng thử lại sau.');
                console.error("Lỗi khi tải chi tiết sản phẩm:", err);
            }
        };
        fetchProductDetail();
    }, [id, LARAVEL_API_URL]); // Dependency array

    // Hàm xử lý khi click vào ảnh nhỏ để thay đổi ảnh chính
    const handleThumbnailClick = (imagePath) => {
        setMainImage(imagePath); // Sử dụng trực tiếp imagePath (đã là URL đầy đủ)
    };

    // Hiển thị thông báo lỗi hoặc đang tải
    if (error) return <p className="text-danger">{error}</p>;
    if (!product) return <p>Đang tải chi tiết sản phẩm...</p>;
    return (
        <> 
           
        <div className="product-detail-container">
            <div className="product-main-content">
                <div className="product-images">
                    <div className="main-image">
                        {/* Ảnh chính hiển thị động */}
                        <img src={mainImage || 'https://via.placeholder.com/400'} alt={product.name || 'Sản phẩm'} />
                    </div>
                    <div className="thumbnails">
                        {/* Danh sách ảnh nhỏ hiển thị động */}
                        {thumbnails.map((thumbPath, index) => (
                            <img
                                key={index}
                                src={thumbPath} // Sử dụng trực tiếp URL đã có
                                alt={`${product.name} - ảnh ${index + 1}`}
                                onClick={() => handleThumbnailClick(thumbPath)}
                                className={mainImage === thumbPath ? 'active' : ''} // Class 'active' cho ảnh đang được chọn
                            />
                        ))}
                    </div>
                </div>

                <div className="product-info-wrapper">
                    <div className="product-info">
                        {/* Tên sản phẩm động */}
                        <h2>{product.name}</h2>
                        <p className="product-meta">
                            Mã: <span className="product-code">{product.id || 'N/A'}</span> |
                            Thương hiệu: <span className="product-brand">{product.brand || 'N/A'}</span> |
                            Số Lượng: <span className="status-available">{product.sl}</span> <br/>
                            Màu: {product.color || 'N/A'}
                            {/* Phần chọn màu (nếu có nhiều màu) sẽ được render động ở đây */}
                            {/* Bạn có thể thêm logic để hiển thị các nút màu từ availableDetails */}
                        </p>
                        <p className="price">
                            {/* Giá động */}
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.final_price)}
                            {product.discount && product.discount > 0 && (
                                <span className="old-price">Giá niêm yết: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</span>
                            )}
                        </p>

                        <div className="product-features benefit-section">
                            <h3><span className="icon-gift">🎁</span> Ưu Đãi</h3>
                            <ul>
                                <li><span className="icon-check">✔</span> Sản phẩm cam kết chính hãng</li>
                                <li><span className="icon-check">✔</span> Một số sản phẩm sẽ được tặng bao đơn</li>
                                <li><span className="icon-check">✔</span> Thanh toán sau khi kiểm tra và nhận hàng</li>
                                <li><span className="icon-check">✔</span> Bảo hành chính hãng theo nhà sản xuất (Trừ hàng nội địa, xách tay)</li>
                            </ul>
                            <h3 className="benefit-subheading"><span className="icon-fire">🔥</span> Ưu đãi thêm khi mua sản phẩm tại VNB Premium</h3>
                            <ul>
                                <li><span className="icon-check">✔</span> Sơn logo mặt vợt miễn phí</li>
                                <li><span className="icon-check">✔</span> Bảo hành lưới đan trong 72 giờ</li>
                                <li><span className="icon-check">✔</span> Thay gen vợt miễn phí trọn đời</li>
                                <li><span className="icon-check">✔</span> Tích luỹ điểm thành viên Premium</li>
                                <li><span className="icon-check">✔</span> Voucher giảm giá cho lần mua hàng tiếp theo</li>
                            </ul>
                        </div>
                        <div className="quantity-selector">
                            <button className="quantity-btn minus">-</button>
                            <input type="text" value="1" className="quantity-input" readOnly /> {/* Thường dùng state để quản lý giá trị này */}
                            <button className="quantity-btn plus">+</button>
                        </div>
                        <div className="add-to-cart-section">
                            <button className="add-to-cart-btn buy-now">Mua</button>
                            <button className="add-to-cart-btn add-to-cart">Thêm Giỏ Hàng</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hiển thị các biến thể khác nếu có nhiều hơn 1 */}
            {availableDetails.length > 1 && (
                <div className="mt-4">
                    <h3>Các biến thể khác:</h3>
                    <ul>
                        {availableDetails.map(detail => (
                            <li key={detail.id_product_detail}>
                                Màu: {detail.color}, Kích thước: {detail.size}, Số lượng: {detail.sl}
                                {/* Có thể thêm nút hoặc link để chọn biến thể này */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="related-products-sidebar">
                <h3>Sản Phẩm Liên Quan</h3>
                {/* Phần này vẫn giữ nội dung tĩnh như trong HTML gốc. 
                    Trong ứng dụng thực tế, bạn sẽ fetch dữ liệu động cho phần này. */}
                <div className="related-item">
                    <img src="https://tungluxury.com/wp-content/uploads/2023/02/giay-louis-vuitton-lv-trainer-54-damier-ebene-multi-like-auth-3.jpg" alt="Related Product 1"/>
                    <p>Giày Nike Run <br/> Defy Nam - <br/> Đen Trắng</p>
                </div>
                <div className="related-item">
                    <img src="https://tungluxury.com/wp-content/uploads/2023/02/giay-louis-vuitton-lv-trainer-54-damier-ebene-multi-like-auth-3.jpg" alt="Related Product 2"/>
                    <p>Giày Nike Run <br/> Defy Nam - <br/> Đen Trắng</p>
                </div>
                <div className="related-item">
                    <img src="https://tungluxury.com/wp-content/uploads/2023/02/giay-louis-vuitton-lv-trainer-54-damier-ebene-multi-like-auth-3.jpg" alt="Related Product 3"/>
                    <p>Giày Nike Run <br/> Defy Nam - <br/> Đen Trắng</p>
                </div>
                <div className="related-item">
                    <img src="https://tungluxury.com/wp-content/uploads/2023/02/giay-louis-vuitton-lv-trainer-54-damier-ebene-multi-like-auth-3.jpg" alt="Related Product 4"/>
                    <p>Giày Nike Run <br/> Defy Nam - <br/> Đen Trắng</p>
                </div>
                <div className="related-item">
                    <img src="https://tungluxury.com/wp-content/uploads/2023/02/giay-louis-vuitton-lv-trainer-54-damier-ebene-multi-like-auth-3.jpg" alt="Related Product 5"/>
                    <p>Giày Nike Run <br/> Defy Nam - <br/> Đen Trắng</p>
                </div>
                <div className="related-item">
                    <img src="https://tungluxury.com/wp-content/uploads/2023/02/giay-louis-vuitton-lv-trainer-54-damier-ebene-multi-like-auth-3.jpg" alt="Related Product 6"/>
                    <p>Giày Nike Run <br/> Defy Nam - <br/> Đen Trắng</p>
                </div>
            </div>

            <div className="product-description-section">
                <h3>Mô Tả Sản Phẩm</h3>
                {/* Sử dụng dangerouslySetInnerHTML cho mô tả nếu nó chứa HTML từ API */}
                <div dangerouslySetInnerHTML={{ __html: product.mota || 'Chưa có mô tả chi tiết.' }} />
                {/* Ảnh trong mô tả, nếu nó là một phần của mô tả dynamic, hãy fetch từ API */}
                {/* Hiện tại đang giữ tĩnh như HTML bạn cung cấp */}
                <img src="https://tungluxury.com/wp-content/uploads/2023/02/giay-louis-vuitton-lv-trainer-54-damier-ebene-multi-like-auth-3.jpg" alt="Ảnh chi tiết sản phẩm" style={{ maxWidth: '100%', height: 'auto', marginTop: '15px' }}/>
            </div>

            <div className="product-care-section">
                <h3>Hướng dẫn bảo quản Giày Adidas</h3>
                {/* Phần này cũng có thể lấy động từ API nếu cần */}
                <ul>
                    <li>- Thường xuyên vệ sinh giày, lau nám.</li>
                    <li>- Không giặt giày bằng máy giặt. Nên dùng cho đôi giày bỏ vào bên dựng một bình giày.</li>
                    <li>- Tránh phơi trực tiếp dưới nắng.</li>
                    <li>- Không sử dụng chất tẩy rửa.</li>
                    <li>- Lau khô giày bằng khăn ẩm sau khi trời mưa.</li>
                    <li>- Nên để giày trong kẽ rỗng giữa hoặc quấn giặt vội và liền hơn.</li>
                </ul>
            </div>

            <div className="comments-section">
                <h3>Bình Luận</h3>
                <textarea placeholder="Viết bình luận của bạn..."></textarea>
                <button className="comment-submit-btn">Gửi</button>
                <div className="existing-comment">
                </div>
            </div>
        </div>


        </>
       
    );
};

export default ProductDetail;