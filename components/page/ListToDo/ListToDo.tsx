"use client";

import Button from '@/components/commons/Button/Button';
import React, { useEffect, useState } from 'react';

interface ToDoItem {
  title: string;
  description: string;
  priority: string;
  img: string;
  id: number;
}

const ListToDo = () => {
  const [todoList, setTodoList] = useState<ToDoItem[]>([]);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const defaultImage = 'https://images.pexels.com/photos/3299/postit-scrabble-to-do.jpg?auto=compress&cs=tinysrgb&w=600';

  const handleOpenPopUp = (index: number) => {
    const item = todoList[index];
    setSelectedItemIndex(index);
    setTitle(item.title);
    setDescription(item.description);
    setPriority(item.priority);
    setImagePreview(item.img);
    setIsPopUpOpen(true);
  };

  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
    setSelectedItemIndex(null);
    setTitle('');
    setDescription('');
    setPriority('');
    setImagePreview(null);
  };

  
  const handlePostData = async () => {
    if (selectedItemIndex === null) return;
    const itemToUpdate = todoList[selectedItemIndex];

    const updatedItem: ToDoItem = {
      title,
      description,
      priority,
      img: imagePreview || defaultImage,
      id: itemToUpdate.id, // Include the id property
    };

    try {
      const response = await fetch(
        `https://coding-fairy.com/api/mock-api-resources/1734968969/list/${itemToUpdate.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      const updatedList = [...todoList];
      updatedList[selectedItemIndex] = updatedItem;
      setTodoList(updatedList);
      handleClosePopUp();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://coding-fairy.com/api/mock-api-resources/1734968969/list');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: ToDoItem[] = await response.json();
        setTodoList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (index: number) => {
    const item = todoList[index];

    if (!item) {
      console.error("Item not found");
      return;
    }

    try {
      const response = await fetch(
        `https://coding-fairy.com/api/mock-api-resources/1734968969/list/${item.id}`, // Use item.id instead of index
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      // After deletion, update the list to reflect the changes
      const updatedList = todoList.filter((_, i) => i !== index); // Remove the item at the index
      setTodoList(updatedList);

      console.log(`Item with id ${item.id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };



  return (
    <div>
      <div className="flex flex-wrap justify-center  gap-8">
        {todoList.map((todo, index) => (
          <article key={index} className="group w-96 h-fit p-4 bg-white shadow-2xl rounded-lg">
            <img
              alt="todo image"
              src={todo.img}
              className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
            />

            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">{todo.title}</h3>
                <span
                  className={`text-${todo.priority === 'High' ? 'green' : todo.priority === 'Low' ? 'yellow' : 'red'}-700`}
                >
                  {todo.priority}
                </span>
              </div>
              <p className="mt-2 whitespace-break-spaces text-sm/relaxed">{todo.description}</p>
            </div>

            <div className="flex justify-between w-full">
              <Button param="Edit" onClick={() => handleOpenPopUp(index)} />
              <Button param="Delete" onClick={() => handleDelete(index)} />
            </div>
          </article>
        ))}
      </div>

      {isPopUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col gap-8 p-4 bg-white rounded-lg">
            <div className="w-full flex justify-between">
              <Button param="Back" onClick={handleClosePopUp} />
            </div>
            <section className="overflow-hidden rounded-lg md:grid md:grid-cols-3">
              <div className="flex justify-center items-center">
                <img
                  alt="Preview"
                  src={imagePreview || defaultImage}
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
                  <label htmlFor="Priority" className="block text-lg font-medium text-gray-900">
                    Priority
                  </label>
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
        </div>
      )}
    </div>
  );
};

export default ListToDo;
