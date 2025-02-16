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
            // const newData ...;
            // newData..sort((a, b) => {
            //     if (orderBy == "asc") {
            //         return a - b
            //     } else if (orderBy == "des") {
            //         return b - a
            //     }
            // })
            // return {
            //     ...state,
            //     axiosData: newData
            // }
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
            // const deepClone = state.axiosData
            // const cloneTodos = [...state.axiosData]; // shallow clone
            const cloneTodos = JSON.parse(JSON.stringify(state.axiosData)); // deep clone
            const indexOf = cloneTodos.findIndex(item => item._id == payload)
            cloneTodos[indexOf].status = "Close"
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