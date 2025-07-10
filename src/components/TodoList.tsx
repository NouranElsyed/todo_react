
import api from "../config/axios.config";
import type { ITodo } from "../interface/ITodo";
import Todo from "./Todo";
import { useQuery } from "@tanstack/react-query";

//* get data from localstorage 

const user = localStorage.getItem("User");
const parsedUser = user ? JSON.parse(user) : null;
const token = parsedUser?.jwt;


const TodoList = () => {
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['todos'],
    queryFn: async() =>{
    const {data}= await api.get('/users/me?populate[todos][filters][publishedAt][$notNull]=true"',{
      headers:{
        Authorization: `Bearer ${token}`,
      }
     })
        return data.todos
        
  }})
  console.log({isLoading, error, data})
  
  if(isLoading) return <p>Loading...</p>
  return (
    <>
    {
    !data.length 
    ? 
    <p className=" font-semibold text-2xl">There is no todos <span className="text-red-600 font-bold text-3xl">!</span></p>
    :
    data?.map((todo:ITodo) => {
        return (
          <Todo todo={todo}/>
        );
      })
    }
    </>
  );
};

export default TodoList;
