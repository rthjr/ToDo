"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/commons/Button/Button'
import PopUpCreate from '../layout/panel/PopUpCreate'


const CreateToDo = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleButtonClick = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className='flex flex-col items-center gap-8 p-4 border-2 border-black rounded-lg w-96 h-fit'>
            <span className='text-center font-bold text-lg'>Create ToDO</span>

            <Image src="/banner/todoImage.webp" alt="Default Banner" width={1000} height={1000} />

            <p className='font-normal text-md'>Are you tired of keeping track of tasks in your head or on sticky notes? Our Todo App is designed to help you stay on top of your responsibilities and manage your time more efficiently.</p>

            <Button param="Create Activity" onClick={handleButtonClick} />

            {isPopupVisible && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <PopUpCreate handleClosePopUp = {handleClosePopup}/>
                </div>
            )}
        </div>
    )
}

export default CreateToDo