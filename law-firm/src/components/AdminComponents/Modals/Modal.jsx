// libs
import { useRef, forwardRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import { X } from "lucide-react";
// components

const Modal = forwardRef(function ModalContainer(props, ref) {
    let modalRef = useRef();

    useImperativeHandle(ref, () => ({
        open: () => {
            modalRef.current?.showModal();
        },
        close: () => {
            modalRef.current?.close();
        },
    }));

    return createPortal(
        <dialog
            ref={modalRef}
            className='bg-gradient-to-b from-bg-primary to-bg-secondary backdrop:bg-main-90 px-rounded-4xl animate-fade-slide-in m-auto rounded-4xl p-5 backdrop:backdrop-blur-md'
        >
            <div className="flex items-center justify-between gap-3 mb-5">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary bg-clip-text font-secondary">
                    {props.title}
                </h2>
                <X
                    onClick={props.onClose}
                    size={28}
                    className="hover:bg-text/30 transition-all p-1 rounded-full cursor-pointer text-primary"
                />
            </div>
            {props.children}
        </dialog>, document.getElementById('modals')
    )
})

export default Modal
