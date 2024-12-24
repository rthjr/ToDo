import Button from '@/components/commons/Button/Button';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PopUpCreate {
    handleClosePopUp: () => void;
}

const PopUpCreate: React.FC<PopUpCreate> = ({ handleClosePopUp }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');

    const router = useRouter();
    const defaultImage = 'https://images.pexels.com/photos/3299/postit-scrabble-to-do.jpg?auto=compress&cs=tinysrgb&w=600';

    const handlePostData = async () => {
        // Create the data object with title, description, priority, and imageFile
        const todoData = {
            title,
            description,
            priority,
            img: defaultImage, // Use the uploaded or default image
        };

        try {
            const response = await fetch('https://coding-fairy.com/api/mock-api-resources/1734968969/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Send data as JSON
                },
                body: JSON.stringify(todoData), // Convert data to JSON format
            });

            if (!response.ok) {
                throw new Error('Failed to post data');
            } else {
                window.location.reload()
            }

            const result = await response.json();
            console.log('Data posted successfully:', result);

            handleClosePopUp(); // Close the popup after posting
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <div className='flex flex-col gap-8 p-4 bg-white rounded-lg'>
            <div className='w-full flex justify-between'>
                <Button param="Back" onClick={handleClosePopUp} />
            </div>
            <section className="overflow-hidden rounded-lg md:grid md:grid-cols-3">
                <div className='flex justify-center items-center'>
                    <img
                        alt="Preview"
                        src={defaultImage} // Display the selected or default image
                        className="h-full w-full"
                    />
                </div>

                <div className="text-start flex flex-col gap-4 p-4 col-span-2">

                    <label
                        htmlFor="Title"
                        className="block overflow-hidden rounded-md border-2 border-black px-3 py-2 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <span className="text-lg font-medium text-gray-700"> Title </span>
                        <input
                            type="text"
                            id="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your Activity Title"
                            className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />
                    </label>

                    <label
                        htmlFor="Description"
                        className="block overflow-hidden rounded-md px-3 py-2 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 border-2 border-black"
                    >
                        <span className="text-lg font-medium text-gray-700"> Description </span>
                        <input
                            type="text"
                            id="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter your Activity Description"
                            className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />
                    </label>

                    <div>
                        <label htmlFor="Priority" className="block text-lg font-medium text-gray-900"> Priority </label>
                        <select
                            name="Priority"
                            id="Priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="mt-1.5 w-full rounded-lg text-gray-700 sm:text-sm p-2 border-2 border-black"
                        >
                            <option value="">Please select</option>
                            <option value="High">High</option>
                            <option value="Low">Low</option>
                            <option value="Very Low">Very Low</option>
                        </select>
                    </div>

                    <Button param="Submit" onClick={handlePostData} />
                </div>
            </section>
        </div>
    );
};

export default PopUpCreate;
