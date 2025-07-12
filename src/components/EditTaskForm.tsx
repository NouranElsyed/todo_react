import { useState } from "react";
import type { ITodo } from "../interface/ITodo";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import api from "../config/axios.config";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMsg from "./ui/ErrorMsg";
import { taskSchema } from "../utils/schema";
import { useQueryClient } from "@tanstack/react-query";

const user = localStorage.getItem("User");
const parsedUser = user ? JSON.parse(user) : null;
const token = parsedUser?.jwt;

interface IProps {
  task: ITodo;
  onclose: () => void;
}
interface IFormInput {
  title: string;
  description: string;
  IsDone: boolean;
}
const EditTaskForm = ({ task, onclose }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const [taskValue, setTaskValue] = useState<ITodo>({
    title: task.title,
    description: task.description,
    IsDone: task.IsDone,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(taskSchema) });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(token);
    console.log({ data });
    console.log(taskValue);
    setIsLoading(true);

    try {
      const response = await api.put(
        `/todos/${task.documentId}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        onclose();
      }

      console.log(response);
    } catch (errors) {
      console.log(errors);
    } finally {
      setIsLoading(true);
    }
  };
  console.log({ errors });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          {" "}
          <Input
            placeholder="Enter task title"
            type=""
            {...register("title")}
            value={taskValue?.title}
            onChange={(e) => {
              setTaskValue((prev) => ({ ...prev, title: e.target.value }));
              console.log(taskValue);
            }}
          />
          <ErrorMsg msg={errors?.title?.message} display={true} />
        </div>
        <div>
          <Textarea
            {...register("description")}
            placeholder="Enter task description"
            value={taskValue?.description}
            onChange={(e) => {
              setTaskValue((prev) => ({
                ...prev,
                description: e.target.value,
              }));
              console.log(taskValue);
            }}
          />
          <ErrorMsg msg={errors?.description?.message} display={true} />
        </div>

        <div className="flex gap-4 w-full">
          <Button
            type="submit"
            className="w-1/2 flex justify-center"
            isLoading={isLoading}
          >
            Edit
          </Button>
          <Button
            className="bg-red-800 hover:bg-red-700 w-1/2 flex justify-center"
            onClick={onclose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditTaskForm;
