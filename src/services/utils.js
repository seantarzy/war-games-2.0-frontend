
const BACKEND = "http://localhost:3000/";

export const getPlayers = ()=>{
   return fetch(`${BACKEND}players`)
    .then((response)=>{
       return response.json();
    }
    )
}