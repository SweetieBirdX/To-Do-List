import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setAllTasks((prevAllTasks) => [...prevAllTasks, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index, isCompleted) {
        const taskToDelete = isCompleted ? completedTasks[index] : tasks[index];
        setTasks((prevTasks) => prevTasks.filter((task) => task !== taskToDelete));
        setCompletedTasks((prevCompleted) => prevCompleted.filter((task) => task !== taskToDelete));
        setAllTasks((prevAllTasks) => prevAllTasks.filter((task) => task !== taskToDelete));
    }
    
    function deleteTaskFromAll(index) {
        const taskToDelete = allTasks[index];
        setTasks((prevTasks) => prevTasks.filter((task) => task !== taskToDelete));
        setCompletedTasks((prevCompleted) => prevCompleted.filter((task) => task !== taskToDelete));
        setAllTasks((prevAllTasks) => prevAllTasks.filter((_, i) => i !== index));
    }

    function moveTaskUp(index, isCompleted) {
        const taskList = isCompleted ? completedTasks : tasks;
        if (index > 0) {
            const updatedTasks = [...taskList];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            isCompleted ? setCompletedTasks(updatedTasks) : setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index, isCompleted) {
        const taskList = isCompleted ? completedTasks : tasks;
        if (index < taskList.length - 1) {
            const updatedTasks = [...taskList];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            isCompleted ? setCompletedTasks(updatedTasks) : setTasks(updatedTasks);
        }
    }

    function markAsCompleted(index) {
        const taskToComplete = tasks[index];
        setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
        setCompletedTasks((prevCompleted) => [...prevCompleted, taskToComplete]);
    }

    function markAsIncompleted(index) {
        const taskToIncomplete = completedTasks[index];
        setCompletedTasks((prevCompleted) => prevCompleted.filter((_, i) => i !== index));
        setTasks((prevTasks) => [...prevTasks, taskToIncomplete]);
    }

    function moveTaskUpInAll(index) {
        if (index > 0) {
            const updatedAllTasks = [...allTasks];
            [updatedAllTasks[index], updatedAllTasks[index - 1]] = [updatedAllTasks[index - 1], updatedAllTasks[index]];
            setAllTasks(updatedAllTasks);
        }
    }

    function moveTaskDownInAll(index) {
        if (index < allTasks.length - 1) {
            const updatedAllTasks = [...allTasks];
            [updatedAllTasks[index], updatedAllTasks[index + 1]] = [updatedAllTasks[index + 1], updatedAllTasks[index]];
            setAllTasks(updatedAllTasks);
        }
    }

    return (
    <div className="font-mono text-center mt-10">
        <h1 className="text-7xl pt-10 pb-10">To-Do List</h1>

    <div>
        <input
            className="text-2xl p-4 border-solid border-2 border-slate-900 mb-4"
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={handleInputChange}/>
        <button
            className="text-3xl font-bold ml-6 py-5 px-10 border-none rounded-md cursor-pointer transition-background-color duration-500 ease bg-emerald-500 hover:bg-emerald-600"
            onClick={addTask}>
        Add</button>
    </div>
            <h2 className="text-4xl mt-10">Incompleted Tasks</h2>
        <ol className="p-0 mt-5">
                {tasks.map((task, index) => (
        <li
            key={index}
            className="text-2xl font-bold p-4 bg-slate-200 mb-4 border-solid border-slate-500 border-2 rounded-md flex justify-between items-center">
        <span className="text-xl">{task}</span>
    <div className="flex space-x-6">
        <button
            className="text-3xl font-bold py-3 px-6 border-none rounded-md cursor-pointer transition-background-color duration-500 ease bg-emerald-500 hover:bg-emerald-600"
            onClick={() => markAsCompleted(index)}>    
        Complete</button>
        <button
            className="text-3xl font-bold py-3 px-6 border-none rounded-md cursor-pointer transition-background-color duration-500 ease bg-red-500 hover:bg-red-600"
            onClick={() => deleteTask(index, false)}>
        Delete</button>                    
        <button
            className="text-3xl font-bold py-3 px-6 border-none rounded-md cursor-pointer transition-background-color duration-500 ease bg-sky-600 hover:bg-sky-700"
            onClick={() => moveTaskUp(index, false)}>                                                           
        ⬆</button>
        <button
            className="text-3xl font-bold py-3 px-6 border-none rounded-md cursor-pointer transition-background-color duration-500 ease bg-sky-600 hover:bg-sky-700"
            onClick={() => moveTaskDown(index, false)}>                                                
        ⬇</button>
    </div>
        </li>))}
        </ol>
            <h2 className="text-4xl mt-10">Completed Tasks</h2>
        <ol className="p-0 mt-5">
                {completedTasks.map((task, index) => (
        <li
            key={index}
            className="text-2xl font-bold p-4 bg-slate-200 mb-4 border-solid border-slate-500 border-2 rounded-md flex justify-between items-center">                   
        <span className="text-xl">{task}</span>
    <div className="flex space-x-6">
        <button
            className="text-3xl font-bold py-3 px-6 border-none rounded-md cursor-pointer transition-background-color duration-500 ease bg-yellow-500 hover:bg-yellow-600"
            onClick={() => markAsIncompleted(index)}>                                                           
        Incomplete</button>
        <button
            className="text-3xl font-bold py-3 px-6 border-none rounded-md cursor-pointer transition-background-color duration-500 ease bg-red-500 hover:bg-red-600"
            onClick={() => deleteTask(index, true)}>                                                           
        Delete</button>
        <button
            className="text-3xl font-bold py-3 px-6 border-none rounded-md cursor-pointer transition-background-color duration-500 ease bg-sky-600 hover:bg-sky-700"
            onClick={() => moveTaskUp(index, true)}>                                
        ⬆</button>
        <button
            className="text-3xl font-bold py-3 px-6 border-none rounded-md cursor-pointer transition-background-color duration-500 ease bg-sky-600 hover:bg-sky-700"
            onClick={() => moveTaskDown(index, true)}>                                
        ⬇</button>
    </div>
            </li>))}
        </ol>
            <h2 className="text-4xl mt-10">All Tasks</h2>
        <ol className="p-0 mt-5">
                {allTasks.map((task, index) => (                   
        <li key={index}
            className="text-2xl font-bold p-4 bg-slate-200 mb-4 border-solid border-slate-500 border-2 rounded-md flex justify-between items-center">
        <span className="text-xl">{task}</span>
    <div className="flex space-x-6">
        <button
            className="text-3xl font-bold py-3 px-6 border-none rounded-md cursor-pointer transition-background-color duration-500 ease bg-red-500 hover:bg-red-600"
            onClick={() => deleteTaskFromAll(index)}>       
        Delete</button>
        <button
            className="text-3xl font-bold py-3 px-6 border-none rounded-md cursor-pointer transition-background-color duration-500 ease bg-sky-600 hover:bg-sky-700"
            onClick={() => moveTaskUpInAll(index)}>                                
        ⬆</button>
        <button
            className="text-3xl font-bold py-3 px-6 border-none rounded-md cursor-pointer transition-background-color duration-500 ease bg-sky-600 hover:bg-sky-700"
            onClick={() => moveTaskDownInAll(index)}>
        ⬇</button>
    </div>
        </li>))}
        </ol>
    </div>);
}

export default ToDoList;
