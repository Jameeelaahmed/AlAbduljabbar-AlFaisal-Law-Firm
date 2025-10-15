// libs
import { useRef, forwardRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import { X, Trash2 } from "lucide-react";
// components

const Modal = forwardRef(function ModalContainer(props, ref) {
    let modalRef = useRef();
    const isDelete = props.delete || "";

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
            className='bg-gradient-to-b from-bg-primary to-bg-secondary backdrop:bg-main-90 px-rounded-4xl animate-fade-slide-in m-auto rounded-4xl pb-5 backdrop:backdrop-blur-md'
        >
            <div className={`flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r ${isDelete && "from-red-50 to-orange-50"} from-primary/10 to-accent/50 `}>
                <div className="flex items-center gap-3">
                    {isDelete &&
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 shadow-sm">
                            <Trash2 className="w-5 h-5 text-red-600" />
                        </div>
                    }
                    <h2 className={`text-xl sm:text-2xl md:text-2xl font-bold ${isDelete && " text-gray-900"} text-primary bg-clip-text font-secondary`}>
                        {props.title}
                    </h2>
                </div>
                <X
                    onClick={props.onClose}
                    size={28}
                    className="hover:bg-text/30 transition-all p-1 rounded-full cursor-pointer text-primary"
                />
            </div>
            <div className='pr-4 pl-4'>
                {props.children}
            </div>
        </dialog>, document.getElementById('modals')
    )
})

export default Modal
