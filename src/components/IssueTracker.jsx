import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import {
    reducer,
    initState,
    _axiosData,
    hideLoading,
    showLoading,
    deleteTodo,
    closeTodo,
    _addTodo,
    _searchTodo,
    _orderBy,
    _filterTodo,
} from '../reducer/stateReducer'
const api = "https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/todo/"
function IssueTracker() {
    const [{ axiosData, isLoading }, dispatch] = useReducer(reducer, initState)
    const [inputs, setInputs] = useState({
        title: "",
        author: "",
        severity: "",
        description: "",
        status: ""
    })
    const [search, setSearch] = useState("")
    const [orderBy, setOrderBy] = useState("asc")
    const [filters, setFilters] = useState("All")
    function onChangeInputs(inputs) {
        const { name, value } = inputs.target
        setInputs((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    const _onSubmitTodo = async (e) => {
        e.preventDefault()
        const dataPost = {
            data: {
                email: "tony@gmail.com",
                title: inputs.title,
                author: inputs.author,
                severity: inputs.severity,
                description: inputs.description,
                status: "New"
            }
        }
        try {
            await axios.post(api, dataPost)
                .then((res) => {
                    dispatch(_addTodo(res.data.data))
                    dispatch(showLoading())
                    setTimeout(() => {
                        dispatch(hideLoading())
                    }, 2000)
                })
        } catch (errors) {
            console.log(errors)
        }

    }

    const _deleteTodo = async (id) => {
        try {
            await axios.delete(api + id)
                .then((res) => {
                    dispatch(deleteTodo(id))
                    dispatch(showLoading())
                    setTimeout(() => {
                        dispatch(hideLoading())
                    }, 2000)
                })
        } catch (errors) {
            console.log(errors)
        }
    }

    const _updateStatus = async (item) => {
        try {
            const dataPost = {
                data: {
                    title: item.title,
                    author: item.author,
                    severity: item.severity,
                    description: item.description,
                    status: "Close"
                }
            }
            await axios.put(api + item._id, dataPost)
                .then((res) => {
                    dispatch(closeTodo(item._id))
                    dispatch(showLoading())
                    setTimeout(() => {
                        dispatch(hideLoading())
                    }, 2000)
                })
        } catch (errors) {
            console.log(errors)
        }
    }

    useEffect(() => {
        // Duy
        // try {
        //     axios.get(api)
        //         .then((response) => {
        //             dispatch(showLoading()); // show loading
        //             dispatch(_axiosData(response.data.data)); //0.1s

        //             // 2s -> hide loading
        //             setTimeout(() => {
        //                 dispatch(hideLoading())
        //             }, 2000);
        //         })
        // } catch (errors) {
        //     console.log(errors)
        // }

        // Refactor code
        // axios (promise then)
        // dispatch(showLoading()); // show loading
        // axios.get(api)
        //     .then((response) => {
        //         dispatch(_axiosData(response.data.data)); //0.1s
        //     })
        //     .catch(err => {
        //         console.log('error: ', err)
        //     })
        //     .finally(() => {
        //         dispatch(hideLoading())
        //     }) 

        // async await
        dispatch(showLoading()); // show loading
        async function fetchTodos() {
            const response = await axios.get(api);
            dispatch(_axiosData(response.data.data)); //0.1s
            dispatch(hideLoading())
        }
        fetchTodos();
    }, [])

    // async: first load -> show loading -> call api -> hide loading
    // promise, async await

    return (
        <>
            <h1 className="text-3xl font-semibold text-center mb-8">ISSUE TRACKER</h1>
            <form type="submit">
                <div className="max-w-lg mx-auto">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input onChange={(value) => onChangeInputs(value)} name='title' type="text" id="title" placeholder="Title ..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author</label>
                        <select value={"sunny"} name='author' onChange={(value) => onChangeInputs(value)} id="author" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value={"sunny"}>Sunny</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="severity" className="block text-gray-700 text-sm font-bold mb-2">Severity</label>
                        <select defaultValue={"low"} name='severity' onChange={(value) => onChangeInputs(value)} id="severity" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value={"low"}>Low</option>
                            <option value={"medium"}>Medium</option>
                            <option value={"high"}>High</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <input name='description' onChange={(inputs) => onChangeInputs(inputs)} type="text" id="description" placeholder="Description ..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex items-center justify-end">
                        <button onClick={(e) => _onSubmitTodo(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
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
                        <button onClick={() => setFilters("All")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">All</button>
                        <button onClick={() => setFilters("New")} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">Open</button>
                        <button onClick={() => setFilters("Close")} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded ml-2">Close</button>
                    </div>
                    <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search by description" className="border rounded py-2 px-3" />
                </div>
                <div className="flex items-center mb-4">
                    <label className="mr-2">Order By:</label>
                    <select onChange={(e) => setOrderBy(e.target.value)} className="border rounded py-2 px-3">
                        <option value={"asc"}>Ascending</option>
                        <option value={"des"}>Descending</option>
                        {/* Add more options here */}
                    </select>
                </div>
                {/* Issue List */}
                {isLoading ? (<div>Loading .......</div>) :
                    Object.keys(axiosData)
                        .sort((a, b) => {
                            if (orderBy == "asc") {
                                return a - b
                            } else if (orderBy == "des") {
                                return b - a
                            }
                        })
                        .filter((value) => {
                            if (filters !== "All") {
                                return axiosData[value]["status"] == filters
                            }
                            return search.toLowerCase() == ''
                                ? value
                                : axiosData[value].title.toLowerCase().includes(search)
                        })
                        .map((value) => {
                            var x = parseInt(value)
                            return (
                                <div className="bg-white rounded shadow p-4 mb-4" key={axiosData[value]._id}>
                                    <div className="flex items-start mb-2">
                                        <div className="text-gray-600 font-bold mr-2">{x + 1}</div>
                                        <span className="bg-gray-300 text-gray-700 text-xs font-bold px-2 py-1 rounded uppercase">{axiosData[value].status}</span>
                                    </div>
                                    <p className="text-gray-800 mb-4">{axiosData[value].title}</p>
                                    <div className="flex justify-end">
                                        <button onClick={() => _updateStatus(axiosData[value])} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
                                        <button onClick={() => _deleteTodo(axiosData[value]._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Delete</button>
                                    </div>
                                </div>
                            )
                        })}
            </div>
        </>
    )
}

export default IssueTracker