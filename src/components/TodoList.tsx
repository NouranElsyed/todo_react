import useApiGetQuery from "../Hooks/useApiGetQuery";
import type { ITodo } from "../interface/ITodo";
import Todo from "./Todo";


//* get data from localstorage 

const user = localStorage.getItem("User");
const parsedUser = user ? JSON.parse(user) : null;
const token = parsedUser?.jwt;


const TodoList = () => {
  
  const { isLoading, error, data } = useApiGetQuery({queryKey:['todos'],url:'/users/me?populate[todos][filters][publishedAt][$notNull]=true"',config:{
    headers:{
      Authorization:`Bearer ${token}`
    }
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
