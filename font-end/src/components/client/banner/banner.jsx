import React from 'react';

const Banner = ()=>{
    return (
        <>
      {/* 1. Sử dụng 'className' thay vì 'class'.
                2. Đảm bảo tất cả các thuộc tính inline style (nếu có) được định nghĩa dưới dạng đối tượng JS và dùng camelCase.
            */}
            <section className="hero-section position-relative d-flex align-items-center justify-content-center">
                <div className="container-fluid p-0">
                    {/* Thẻ <img> là thẻ tự đóng, cần kết thúc bằng '/>' */}
                    <img
                        src="https://lambanner.com/wp-content/uploads/2022/10/MNT-DESIGN-BANNER-GIAY-11.jpg"
                        className="img-fluid w-100"
                        alt="Sale Banner"
                    />
                    <div className="overlay-text position-absolute text-white">
                        {/* Bạn có thể thêm nội dung văn bản hoặc các component khác vào đây.
                            Ví dụ: <h2 className="display-4">Ưu đãi lớn!</h2>
                        */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner;