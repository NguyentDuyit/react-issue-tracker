export const initState = {
    axiosData: [],
    isLoading: false
}

export const _axiosData = (todoItem) => {
    return {
        type: "AXIOS_DATA",
        payload: todoItem
    }
}

export const _filterTodo = (filterKeyword) => {
    return {
        type: "FILTER_TODO",
        payload: filterKeyword
    }
}

export const _searchTodo = (keyword) => {
    return {
        type: "SEARCH_TODO",
        payload: keyword
    }
}

export const _orderBy = (orderKeyWord) => {
    return {
        type: "ORDER_BY",
        payload: orderKeyWord
    }
}

export const _addTodo = (todoItem) => {
    return {
        type: "ADD_DATA",
        payload: todoItem
    }
}

export const deleteTodo = (todoId) => {
    return {
        type: "DELETE_TODO",
        payload: todoId
    }
}


export const closeTodo = (todoId) => {
    return {
        type: "CLOSE_TODO",
        payload: todoId
    }
}


export const showLoading = () => {
    return {
        type: "SHOW_LOADING",
    }
}


export const hideLoading = () => {
    return {
        type: "HIDE_LOADING",
    }
}

export function reducer(state = initState, { type, payload }) {
    switch (type) {
        case "AXIOS_DATA": {
            return {
                ...state,
                axiosData: payload
            }
        }

        case "SEARCH_TODO": {

        }

        case "FILTER_TODO": {

        }

        case "ORDER_BY": {

        }

        case "ADD_DATA": {
            return {
                ...state,
                axiosData: [...state.axiosData, payload]
            }
        }

        case "DELETE_TODO": {
            return {
                ...state,
                axiosData: state.axiosData.filter(item => item._id !== payload)
            }
        }

        case "CLOSE_TODO": {
            const indexOf = state.axiosData.findIndex(item => item._id == payload)
            const deepClone = state.axiosData
            deepClone[indexOf].status = "Close"
            return {
                ...state,
                axiosData: deepClone
            }
        }

        case "HIDE_LOADING": {
            return {
                ...state,
                isLoading: false
            }
        }

        case "SHOW_LOADING": {
            return {
                ...state,
                isLoading: true
            }
        }
    }
}