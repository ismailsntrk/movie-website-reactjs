import React , {useState , useContext} from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";
import MovieService from '../../services/MovieService'
import {AuthContext} from '../../services/AuthContext'


const AddMovie = () => {
    const [movie,setMovie] = useState('')
    const authContext = useContext(AuthContext);
 
    const onChange = (e) => {
        e.preventDefault();
       if(authContext.isAuthenticated){
        setMovie(e.target.value);
       }
        
        
      };

    const addNewMovie = (e) =>{
      e.preventDefault();
         
      if(authContext.isAuthenticated){
        let newMovie = JSON.parse(movie)
        const newArr = newMovie.Genre.split(', ')
        newArr.push('.')
        newMovie.Genre = newArr
        newMovie = JSON.stringify(newMovie)
        MovieService.addMovie(newMovie).then(data => (data))
        setMovie('')}
      
     
    }
    const logged = () =>{
      return(
      <div>
        <Form onSubmit={addNewMovie}>
        <FormGroup>
          <Label for="exampleText">Text Area</Label>
          <Input onChange={onChange} value={movie} type="textarea" name="text" id="exampleText" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
        </div>)
    }
    const unlogged = () =>{
      return(<div>
        <h1>Bu Sayfaya Erisim Yetkiniz Bulunmamaktadir.</h1>
      </div>)
    }
    
  return (
    <Container>
      {authContext.isAuthenticated ? logged() :  unlogged()}
      </Container>
  );
};

export default AddMovie;
