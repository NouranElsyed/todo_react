import { useState } from "react";
import useApiGetQuery from "../Hooks/useApiGetQuery";
import type { ITodo } from "../interface/ITodo";
import Todo from "./Todo";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import type { ModalType } from "../types";
import AddTaskForm from "./AddTaskForm";

//* get data from localstorage

const user = localStorage.getItem("User");
const parsedUser = user ? JSON.parse(user) : null;
const token = parsedUser?.jwt;

const TodoList = () => {
  //* manage modal state
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalOpen, setModalOpen] = useState(false);
//* handle open and close modal
  const onCloseModal = () => setModalOpen(false);
  const onOpenAddModal = () => {
    setModalType("add");
    setModalOpen(true);
  };
  //* get data from api
  const { isLoading, error, data } = useApiGetQuery({
    queryKey: ["todos"],
    url: '/users/me?populate[todos][filters][publishedAt][$notNull]=true"',
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
console.log(error)
  //* Loading
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <p className="text-2xl font-semibold text-indigo-700">Tasks: </p>
        <Button onClick={onOpenAddModal} className="font-semibold text-xl">
          +
        </Button>
        <Modal title="Add Task" isOpen={modalOpen} onclose={onCloseModal}>
          {modalType == "add" && (
            <AddTaskForm  onclose={onCloseModal}></AddTaskForm>
          )}
        </Modal>
      </div>

      {!data.length ? (
        <p className=" font-semibold text-2xl">
          There is no todos{" "}
          <span className="text-red-600 font-bold text-3xl">!</span>
        </p>
      ) : (
        data?.map((todo: ITodo) => {
          return (
          
              <Todo key={todo.id} todo={todo} token={token}/>
            
          );
        })
      )}
    </>
  );
};

export default TodoList;
