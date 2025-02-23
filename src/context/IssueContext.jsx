import axios from "axios";
import { createContext, useContext, useEffect, useState, useReducer } from "react";
import {
    reducer,
    initState,
    _getData,
    hideLoading,
    showLoading,
    deleteTodo,
    closeTodo,
    _addTodo,
    _searchTodo,
    _orderBy,
    _filterByTodo,
} from '../reducer/stateReducer'
const IssueContext = createContext()
const api = "https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/todo/"
export const IssueProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState)
    const { isLoading } = state

    async function fetchTodos() {
        dispatch(showLoading())
        const response = await axios.get(api);
        dispatch(_getData(response.data.data))
        dispatch(hideLoading())
    }

    async function addItemTodo(item) {
        dispatch(showLoading())
        const response = await axios.post(api, item)
        if(response.data.data.title) {
            dispatch(_addTodo(response.data.data))
        }
        dispatch(hideLoading())
    }

    async function deleteItem(id) {
        dispatch(showLoading())
        await axios.delete(api + id)
        dispatch(deleteTodo(id))
        dispatch(hideLoading())
    }

    async function updateItem(item) {
        dispatch(showLoading())
        const dataPost = {
            data: {
                title: item.title,
                author: item.author["0"],
                severity: item.severity,
                description: item.description,
                status: "Close"
            }
        }
        await axios.put(api + item._id, dataPost)
        dispatch(closeTodo(item._id))
        dispatch(hideLoading())
    }

    function searchTodo(keyword) {
        console.log('earch')
        dispatch(_searchTodo(keyword))
    }

    function filterTodo(keyword) {
        dispatch(_filterByTodo(keyword))
    }

    function orderByTodo(keyword) {
        dispatch(_orderBy(keyword))
    }
    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <IssueContext.Provider value={{
            state,
            isLoading,
            dispatch,
            addItemTodo,
            deleteItem,
            updateItem,
            searchTodo,
            filterTodo,
            orderByTodo
        }}>

            {children}
        </IssueContext.Provider>
    )
}
export const useIssueContext = () => useContext(IssueContext)