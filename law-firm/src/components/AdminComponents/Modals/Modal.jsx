// libs
import { useRef, forwardRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
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
        <dialog ref={modalRef}>
            {props.children}
        </dialog>, document.getElementById('modals')
    )
})

export default Modal
