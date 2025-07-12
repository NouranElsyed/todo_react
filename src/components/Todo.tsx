import { useState } from "react";
import type { ITodo } from "../interface/ITodo";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import EditTaskForm from "./EditTaskForm";
import type { ModalType } from "../types";
import api from "../config/axios.config";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  todo: ITodo;
  token: string;
}

const Todo = ({ todo, token }: IProps) => {
    const queryClient = useQueryClient();
  const [isLoading,setIsLoading] = useState(false)
  
  //* state management for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  //* handle modals toggle
  const onCloseModal = () => setModalOpen(false);
  const onOpenEditModal = () => {
    setModalType("edit");
    setModalOpen(true);
  };
  const onOpenTaskModal = () => {
    setModalType("view");
    setModalOpen(true);
  };
    const onOpenDeleteModal = () => {
    setModalType("delete");
    setModalOpen(true);
  };
const Delete=async()=>{
  setIsLoading(true)
  try {
      const response = await api.delete(`/todos/${todo.documentId}`,{
    headers: {              
      Authorization: `Bearer ${token}`,
    },
      })
      console.log(response)
      if(response.status === 200 || response.status === 204 ){
        queryClient.invalidateQueries({ queryKey: ["todos"] });
          onCloseModal();
      }
  }catch(err){
    console.log(err)
  }finally{
  setIsLoading(false)

  }

}
  return (
    <>
      <div
        key={todo.id}
        className="flex items-center justify-between space-x-30 bg-[rgba(71,71,105,0.28)] px-5 py-2 rounded-lg mb-3"
        onClick={() => {
          onOpenTaskModal();
        }}
      >
        <p>{todo.title}</p>
        <div className="flex space-x-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onOpenEditModal();
            }}
          >
            update
          </Button>

          <Button
            className="bg-red-800 hover:bg-red-700"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDeleteModal();

            }}
          >
            delete
          </Button>
        </div>
      </div>
      {modalType == "edit" && (
        <Modal title="Edit the Task" isOpen={modalOpen} onclose={onCloseModal}>
          <EditTaskForm task={todo} onclose={onCloseModal}  />
        </Modal>
      )}
      {modalType == "view" && (
        <Modal title={todo.title} isOpen={modalOpen} onclose={onCloseModal}>
          <p className="text-center">{todo.description}</p>
          <div className="flex gap-4 w-full">
            <Button
              className="w-1/2 flex justify-center"
              onClick={() => {
                onCloseModal();
                onOpenEditModal();
              }}
            >
              Edit
            </Button>
            <Button
              className="bg-red-800 hover:bg-red-700 w-1/2 flex justify-center"
              onClick={onCloseModal}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      )}
      {modalType == "delete" && (
        <Modal title="Are you sure you want to delete this task?" isOpen={modalOpen} onclose={onCloseModal}>
          <p className="text-center mb-5">{todo.title}</p>
          <div className="flex gap-4 w-full">
            <Button
            isLoading={isLoading}
              className="bg-red-800 hover:bg-red-700 w-1/2 flex justify-center"
              onClick={() =>  Delete()}
            >
              Delete
            </Button>
            <Button
              className="bg-gray-700 hover:bg-gray-600 w-1/2 flex justify-center"
              onClick={onCloseModal}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Todo;
