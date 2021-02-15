
const BACKEND = "https://fathomless-mesa-65505.herokuapp.com/";

export const getPlayers = ()=>{
   return fetch(`${BACKEND}players`)
    .then((response)=>{
       return response.json();
    }
    )
}