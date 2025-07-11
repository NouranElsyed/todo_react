import { useState } from "react";
import type { ITodo } from "../interface/ITodo";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";

interface IProps {
  onclose: () => void;
}

const AddTaskForm = ({onclose }: IProps) => {
  const [taskValue, setTaskValue] = useState<ITodo>();
  return (
    <>
      <Input
        name=""
        placeholder="Enter task title"
        type=""
        onChange={(e) => {
          setTaskValue((prev) => ({ ...prev, title: e.target.value }));
          console.log(taskValue);
        }}
      />
      <Textarea
        name="description"
        placeholder="task description"
        onChange={(e) => {
          setTaskValue((prev) => ({ ...prev, description: e.target.value }));
          console.log(taskValue);
        }}
      />
      <div className="flex gap-4 w-full">
        <Button className="w-1/2 flex justify-center" onClick={onclose}>
          Add
        </Button>
        <Button
          className="bg-red-800 hover:bg-red-700 w-1/2 flex justify-center"
          onClick={onclose}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default AddTaskForm;
