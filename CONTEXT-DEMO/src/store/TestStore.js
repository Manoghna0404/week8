import {create} from 'zustand'

//create store
export const useTest=create((set)=>({
    //state
    x:10,
    y:10,
    user:{
        name:"manoghna",
        age:19,
    },
    //functions to modify the state
    incrementX:()=>set(state=>({x:state.x+1})),
    decrementX:()=>set(state=>({x:state.x-1})),
    incrementY:()=>set(state=>({y:state.y+1})),
    incrementXByValue:(v)=>set(state=>({x:state.x+v})),
    updateUser:(newName)=>set(state=>({user:{...state.user,age:30,name:newName}}))

}))