import React,{useEffect,useState , useContext} from 'react'
import ListService from '../../services/ListService'
import {AuthContext} from '../../services/AuthContext'
import './MyList.scss'
import MovieCard from '../movieCard/MovieCard'


const MyList = () => {
    const [load,setLoad] = useState(false)
    const [myList, setMyList] = useState([])
    const authContext = useContext(AuthContext)
    useEffect(()=>{
        setLoad(false)
        ListService.getList().then(data => setMyList(data.listItems)).then(setLoad(true))

        
       
    },[])


 

    const deleteListItem = (id) =>{
      ListService.deleteCard(id).then(data => (data)).then( window.location.reload())
    }
    const unAut = () =>{
        return(<div>
            <h1>Bos</h1>
        </div>)
    }
    
    const Aut = () =>{
            
        if(myList.length !== 0 ) {
            return(<div id='main-cont'>
                <div id="my-list-cont">
             
             {myList.map((item) =>
           
         
           <div id="posters" key={item._id}>
             <MovieCard 
               movieImdb={item.imdbRating}
               movieGenre={item.Genre}
               movieYear={item.Year}
               movieName={item.Title}
               movieImg={item.Poster}
             ></MovieCard>
           </div>
     
       )}
            
             {/* <ul>
                  {myList.map(item=>(<li key={item.Title}>
                      {item.Title}
                      <button onClick={()=> deleteListItem(item._id)}>sil</button>
                  </li>))}
              </ul> */}
          </div>
            </div>)
        }

        else{
            return(<div>
                Liste Bos
            </div>)
        }
        
    }

    

    return (
        <div>
            {authContext.isAuthenticated === false ? unAut() : Aut() }
        </div>
    )
}

export default MyList
