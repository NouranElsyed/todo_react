import { useState } from "react";
import type { ITodo } from "../interface/ITodo";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../utils/schema";
import ErrorMsg from "./ui/ErrorMsg";
import api from "../config/axios.config";
import { useQueryClient } from "@tanstack/react-query";

const user = localStorage.getItem("User");
const parsedUser = user ? JSON.parse(user) : null;
const token = parsedUser?.jwt;

interface IProps {
  onclose: () => void;
}
interface IFormInput {
  title: string;
  description: string;
}
const AddTaskForm = ({ onclose }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [taskValue, setTaskValue] = useState<ITodo>({
    title: "",
    description: "",
    IsDone: false,
    user: parsedUser.user.id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(taskSchema) });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const modifedData = { ...data, IsDone: false, user: parsedUser.user.id };
    console.log(parsedUser.user.id);
    console.log({ modifedData });
    setIsLoading(true);

    try {
      const response = await api.post(
        `/todos`,
        { data: modifedData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        onclose();
      }
      console.log(response);
    } catch (errors) {
      console.log(errors);
    } finally {
      setIsLoading(false);
    }
  };
  console.log({ errors });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <Input
            placeholder="Enter task title"
            type=""
            {...register("title")}
            onChange={(e) => {
              setTaskValue((prev) => ({ ...prev, title: e.target.value }));
              console.log(taskValue);
            }}
          />
          <ErrorMsg msg={errors?.title?.message} display={true} />
        </div>
        <div>
          {" "}
          <Textarea
            {...register("description")}
            placeholder="Enter task description"
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
            className="w-1/2 flex justify-center"
            type="submit"
            isLoading={isLoading}
          >
            Add
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

export default AddTaskForm;
