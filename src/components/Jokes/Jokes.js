import React,{useEffect,useState} from 'react';
import axios from 'axios'
import MainHeader from '../MainHeader/MainHeader';
import Card from '../UI/Card/Card';
import classes from './Joke.module.css'

const Jokes = (props)=>{
   const [jokes,setJokes]=useState([]);
   const [isLoading,setLoading]=useState(false);
   useEffect(async() => {
      setLoading(true);
           const response = await axios.get('https://official-joke-api.appspot.com/jokes/ten');
                const data = await response.data;
               setJokes(data)
      setLoading(false)
   }, [])

   // console.log(props)
    return(
       <>
       <Card className={classes.home}>
      <MainHeader onLogout={props.onLogout} />
      

      
     
        {isLoading && <h1>Loading..</h1>}
        {jokes.map(joke=>{ return <p key={joke.id}>{joke.setup}</p>})}
      
      </Card>
      </>

    )

}

export default Jokes;