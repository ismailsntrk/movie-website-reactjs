const ListService = {
    getList:  ()=>{
        return fetch('/list/movies').then(response => {
            if(response.status !== 401){
                return response.json().then(data => data)
            }
            else{
               
                return {message : {msgBody : 'UnAuthorized'},msgError : true}
            }
        })
    },

    getLastWatched:  ()=>{
        return fetch('/last/getLastWatched').then(response => {
            if(response.status !== 401){
                return response.json().then(data => data)
            }
            else{
               
                return {message : {msgBody : 'UnAuthorized'},msgError : true}
            }
        })
    },

    addMovieToList: listItem => {
        return fetch('/list/addlist',{
            method: 'post',
            body: JSON.stringify(listItem),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(response => {
            if(response.status !== 401){
                
                return response.json().then(data => data)
            }
            else{
                return {message : {msgBody : 'UnAuthorized'},msgError : true}
            }})
    },

    addLastWatched: lastMovie => {
        return fetch('/last/addLastWatched',{
            method: 'post',
            body: JSON.stringify(lastMovie),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(response => {
            if(response.status !== 401){
                return response.json().then(data => data)
            }
            else{
                return {message : {msgBody : 'UnAuthorized'},msgError : true}
            }})
    },

    deleteCard : (id) =>{

        return fetch(`/list/delete/${id}`,{
            method: 'delete',
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(data => data)
    },
  };
  
  export default ListService;
  