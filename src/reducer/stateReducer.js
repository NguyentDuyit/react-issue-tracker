export const initState = {
    getData: [],
    isLoading: false,
    cloneData: [],
}

export const _getData = (todoList) => {
    return {
        type: "GET_DATA",
        payload: todoList
    }
}

export const _filterByTodo = (filtKeyWord) => {
    return {
        type: "FILTER_BY_TODO",
        payload: filtKeyWord
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
        type: "ADD_TODO",
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
        case "GET_DATA": {
            return {
                ...state,
                getData: payload,
                cloneData: payload
            }
        }

        case "SEARCH_TODO": {
            return {
                ...state,
                getData: state.cloneData.filter(item => item["title"].toLowerCase().includes(payload))
            }
        }

        case "FILTER_BY_TODO": {
            if (payload !== "All") {
                return {
                    ...state,
                    getData: state.cloneData.filter(item => item["status"] == payload)
                }
            } else {
                return {
                    ...state,
                    getData: state.cloneData
                }
            }
        }

        case "ORDER_BY": {
            if (payload == "asc") {
                return {
                    ...state,
                    getData: state.getData.sort((a, b) => {
                        return a.title.localeCompare(b.title)
                    })
                }
            } else if (payload == "des") {
                return {
                    ...state,
                    getData: state.getData.sort((a, b) => {
                        return b.title.localeCompare(a.title)
                    })
                }
            }
        }

        case "ADD_TODO": {
            return {
                ...state,
                getData: [...state.getData, payload],
                cloneData: [...state.getData, payload]
            }
        }

        case "DELETE_TODO": {
            return {
                ...state,
                getData: state.getData.filter(item => item._id !== payload)
            }
        }

        case "CLOSE_TODO": {
            // const cloneTodos = [...state.axiosData]; // shallow clone
            const cloneTodos = JSON.parse(JSON.stringify(state.getData)); // deep clone
            const indexOf = cloneTodos.findIndex(item => item._id == payload)
            cloneTodos[indexOf].status = "Close"
            return {
                ...state,
                getData: cloneTodos
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