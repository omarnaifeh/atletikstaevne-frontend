import {ReactNode, useEffect} from "react";

interface ResponsiveModalProps {
    show: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    children: ReactNode
}

const ResponsiveModal = (props: ResponsiveModalProps) => {

    useEffect(() => {
        const dialog = document.getElementById("my_modal_5")
        props.show ? dialog?.setAttribute("open", "true") : dialog?.removeAttribute("open")
    }, [props.show])

    return (
        <dialog
            id="my_modal_5"
            className={"modal modal-bottom sm:modal-middle bg-black bg-opacity-50 z-9999"}
        >
            <div className={"modal-box"}>
                <h3 className={"font-bold text-lg"}>{props.title}</h3>
                <div className={"py-4"}>{props.children}</div>
                <div className={"modal-action"}>
                    <button
                        className={"btn btn-success text-black"}
                        onClick={props.onConfirm}
                    >
                        Bekræft
                    </button>
                    <button
                        className={"btn btn-error text-black"}
                        onClick={props.onClose}
                    >
                        Annuller
                    </button>
                </div>
            </div>
        </dialog>
    )

}

export default ResponsiveModal;