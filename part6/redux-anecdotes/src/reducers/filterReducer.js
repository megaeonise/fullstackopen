export const setFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        payload: { filter }
    }
}


const filterReducer = (state = {filter: ''}, action) => {
    switch(action.type){
        case 'SET_FILTER':
            return action.payload
        default: 
            return state
    }
  }
  
  export default filterReducer