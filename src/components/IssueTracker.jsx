import React, { useState } from 'react'
import { useIssueContext } from '../context/IssueContext'
const api = "https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/todo/"
function IssueTracker() {
    const { state, isLoading, addItemTodo, deleteItem, updateItem, searchTodo, filterTodo, orderByTodo } = useIssueContext()
    const { getData } = state
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        title: "",
        author: "",
        severity: "",
        description: "",
        status: ""
    })

    function onChangeInputs(inputs) {
        const { name, value } = inputs.target
        setForm((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    function _addItemTodo(e) {
        e.preventDefault()
        let errorsSubmit = {}
        let flag = true
        if (form.title == "") {
            errorsSubmit.title = "Input email!"
            flag = false
        }
        if (form.author == "") {
            errorsSubmit.author = "Input author!"
            flag = false
        }
        if (form.severity == "") {
            errorsSubmit.severity = "Choose severity!"
            flag = false
        }
        if (form.description == "") {
            errorsSubmit.description = "Input description!"
            flag = false
        }
        if (!flag) {
            setErrors(errorsSubmit)
            return;
        }
        const dataPost = {
            data: {
                email: "tony@gmail.com",
                title: form.title,
                author: form.author,
                severity: form.severity,
                description: form.description,
                status: "New"
            }
        }
        addItemTodo(dataPost)
    }

    // useEffect(() => {
    //     // Refactor code
    //     // axios (promise then)
    //     // dispatch(showLoading()); // show loading
    //     // axios.get(api)
    //     //     .then((response) => {
    //     //         dispatch(_axiosData(response.data.data)); //0.1s
    //     //     })
    //     //     .catch(err => {
    //     //         console.log('error: ', err)
    //     //     })
    //     //     .finally(() => {
    //     //         dispatch(hideLoading())
    //     //     }) 

    //     // async await
    //     // dispatch(showLoading()); // show loading
    //     // async function fetchTodos() {
    //     //     const response = await axios.get(api);
    //     //     dispatch(_getData(response.data.data)); //0.1s
    //     //     dispatch(hideLoading())
    //     // }
    //     // fetchTodos();
    // }, [])

    // async: first load -> show loading -> call api -> hide loading
    // promise, async await

    return (
        <>
            <h1 className="text-3xl font-semibold text-center mb-8">ISSUE TRACKER</h1>
            <form>
                <div className="max-w-lg mx-auto">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input onChange={(value) => onChangeInputs(value)} name='title' type="text" id="title" placeholder="Title ..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        {errors.title && <p className="mt-2 text-sm text-red-600 dark:text-red-500">Input title!</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author</label>
                        <select name='author' onChange={(value) => onChangeInputs(value)} id="author" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option>Choose Author</option>
                            <option value={"sunny"}>Sunny</option>
                        </select>
                        {errors.author && <p className="mt-2 text-sm text-red-600 dark:text-red-500">Choose author!</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="severity" className="block text-gray-700 text-sm font-bold mb-2">Severity</label>
                        <select name='severity' onChange={(value) => onChangeInputs(value)} id="severity" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option>Choose severity</option>
                            <option value={"low"}>Low</option>
                            <option value={"medium"}>Medium</option>
                            <option value={"high"}>High</option>
                        </select>
                        {errors.severity && <p className="mt-2 text-sm text-red-600 dark:text-red-500">Choose severity!</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <input name='description' onChange={(inputs) => onChangeInputs(inputs)} type="text" id="description" placeholder="Description ..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        {errors.description && <p className="mt-2 text-sm text-red-600 dark:text-red-500">Input description!</p>}
                    </div>
                    <div className="flex items-center justify-end">
                        <button onClick={(e) => _addItemTodo(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Add
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h1 className="text-2xl font-semibold mb-4">List Issue</h1>
                {/* Filters and Ordering */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <label className="mr-2">Filter:</label>
                        <button onClick={() => filterTodo("All")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">All</button>
                        <button onClick={() => filterTodo("new")} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">Open</button>
                        <button onClick={() => filterTodo("Close")} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded ml-2">Close</button>
                    </div>
                    <input type="text" onChange={(e) => searchTodo(e.target.value)} placeholder="Search by description" className="border rounded py-2 px-3" />
                </div>
                <div className="flex items-center mb-4">
                    <label className="mr-2">Order By:</label>
                    <select onChange={(e) => orderByTodo(e.target.value)} className="border rounded py-2 px-3">
                        <option > Choose Order</option>
                        <option value={"asc"}>Ascending</option>
                        <option value={"des"}>Descending</option>
                        {/* Add more options here */}
                    </select>
                </div>
                {/* Issue List */}
                {isLoading ? (<div>Loading .......</div>) :
                    Object.keys(getData)
                        .map((value) => {
                            var x = parseInt(value)
                            return (
                                <div className="bg-white rounded shadow p-4 mb-4" key={getData[value]._id}>
                                    <div className="flex items-start mb-2">
                                        <div className="text-gray-600 font-bold mr-2">{x + 1}</div>
                                        <span className="bg-gray-300 text-gray-700 text-xs font-bold px-2 py-1 rounded uppercase">{getData[value].status}</span>
                                    </div>
                                    <p className="text-gray-800 mb-4">{getData[value].title}</p>
                                    <div className="flex justify-end">
                                        <button onClick={() => updateItem(getData[value])} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
                                        <button onClick={() => deleteItem(getData[value]._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Delete</button>
                                    </div>
                                </div>
                            )
                        })}
            </div>
        </>
    )
}

export default IssueTracker