import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";

import { HiOutlineUsers } from "react-icons/hi2";

const JoinTeam = ({ event }) => {
    const [joinCode, setJoinCode] = useState('');

    const handleInputChange = (e) => {
        setJoinCode(e.target.value);
    };

    const handleSubmit = () => {
        console.log(`Join code submitted: ${joinCode}`);
    };

    return (
        <div className="flex items-center justify-center h-full w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-[2px] ">
            <div className={`shadow-lg rounded-lg p-4 w-96  border border-gray-500 transition duration-200 ${joinCode ? 'bg-gray-200' : 'bg-white'}`}>

                <div className="flex items-center justify-center mb-8 relative">
                    <div className="icon-container">
                        <HiOutlineUsers size={60} className='text-white bg-gray-500 px-2 py-3 rounded-md' />
                    </div>
                    <button onClick={event}>
                        <IoCloseOutline className="text-3xl font-bold text-gray-950 cursor-pointer absolute top-0 right-0 " />
                    </button>
                </div>
                <h2 className="text-lg font-semibold text-center mb-4">Join a project with a code</h2>
                <div className='mb-4'>
                    <input
                        type="text"
                        placeholder="Enter join code."
                        value={joinCode}
                        onChange={handleInputChange}
                        className="w-full border border-blue-500 p-2 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className='mb-4'>
                    <button
                        onClick={handleSubmit}
                        className={`w-full p-2 rounded  border border-gray-500 transition ease-in-out duration-200 ${joinCode ? 'bg-[#38af50] text-white hover:bg-[#29903e] '
                            : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
                    >
                        Add project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinTeam;