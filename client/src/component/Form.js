import React, { useState } from 'react';

const Form = () => {
    const [username, setUsername] = useState('');
    const [fullname, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [avatar, setAvatar] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const userInfo = {
            username,
            fullname,
            dob,
            avatar
        };

        console.log('Thông tin người dùng:', userInfo);
        // Bạn có thể thêm mã để gửi dữ liệu lên server tại đây
    };

    return (

        <div className="h-[100vh]  text-gray-900 bg-white flex justify-center items-center">
            <div className="bg-gray-400 bg-opacity-10 p-8 rounded-lg shadow-xl w-96 mx-auto mt-16 border border-slate-400">
                <h2 className="text-2xl font-bold text-center mb-6">Registration Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Nick Name</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fullname" className="block text-gray-700">Full Name</label>
                        <input
                            type="text" // Chọn loại input là text
                            id="fullname" // Cập nhật id cho phù hợp
                            value={fullname} // Thay đổi state để sử dụng fullname
                            onChange={(e) => setFullName(e.target.value)} // Cập nhật hàm xử lý sự kiện
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dob" className="block text-gray-700">Date of Birth</label>
                        <input
                            type="date" // Thay đổi type thành date
                            id="dob" // Cập nhật id cho phù hợp
                            value={dob} // Thay đổi state để sử dụng dob
                            onChange={(e) => setDob(e.target.value)} // Cập nhật hàm xử lý sự kiện
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="avatar" className="block text-gray-700">Avatar</label>
                        <input
                            type="file"
                            id="avatar"
                            accept="image/*"
                            onChange={(e) => setAvatar(e.target.files[0])}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white rounded w-full py-2 hover:bg-blue-600">Đăng Ký</button>
                </form>
            </div>

        </div>
    );
};

export default Form;
