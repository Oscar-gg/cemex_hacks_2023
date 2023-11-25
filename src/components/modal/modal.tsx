import { useEffect, useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode,
}

export const Modal:React.FC<ModalProps> = ({isOpen, children}) => {

    const dialog = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (dialog == null) return;
        if (isOpen) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={dialog}
            className={
                "w-auto md:w-1/2 fixed right-9 rounded-lg bg-gray-100 p-5 shadow-lg shadow-sky-300/30 backdrop:bg-slate-900 backdrop:opacity-40 "
            }
        >
            <div>
                {children}
            </div>
            <button className="absolute p-2 right-3 top-3 text-neutral-800" onClick={() => dialog.current?.close()}>
                <AiOutlineCloseCircle className="text-2xl " />
            </button>

        </dialog>
    )


}