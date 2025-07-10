import type { ITodo } from "../interface/ITodo";
import Button from "./ui/Button";

interface IProps{
  todo:ITodo
}

const Todo = ({todo}:IProps) => {
  return (
    <div
      key={todo.id}
      className="flex items-center justify-between space-x-30 bg-[rgba(71,71,105,0.28)] px-5 py-2 rounded-lg mb-3"
    >
      <p>{todo.title}</p>
      <div className="flex space-x-2">
        <Button className="">update</Button>
        <Button className="bg-red-700">delete</Button>
      </div>
    </div>
  );
};

export default Todo;
