import { useState } from "react";
import type { ITodo } from "../interface/ITodo";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import EditTaskForm from "./EditTaskForm";
import type { ModalType } from "../types";

interface IProps {
  todo: ITodo;
}

const Todo = ({ todo }: IProps) => {
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

          <Button className="bg-red-800 hover:bg-red-700">delete</Button>
        </div>
      </div>
      {modalType == "edit" && (
        <Modal title="Edit the Task" isOpen={modalOpen} onclose={onCloseModal}>
          <EditTaskForm task={todo} onclose={onCloseModal} />
        </Modal>
      )}
      {modalType == "view" && (
        <Modal title={todo.title} isOpen={modalOpen} onclose={onCloseModal}>
          <p>{todo.description}</p>
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
    </>
  );
};

export default Todo;
