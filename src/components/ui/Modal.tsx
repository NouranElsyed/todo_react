import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  onclose: () => void;
  title: string|undefined;
  children: ReactNode
}
const Modal = ({ isOpen, onclose, title,children}: IProps) => {
  console.log(isOpen);
  return (
    <>
      <Dialog open={isOpen} onClose={onclose} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-neutral-950/60  p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-2xl bg-[#2f2f3cf0] p-12 flex flex-col justify-between items-center">
            <DialogTitle className="font-bold">{title}</DialogTitle>
            <Description className='space-y-3'>
              {children}
            </Description>
            {/* */}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
export default Modal;
