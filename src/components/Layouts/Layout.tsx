import {ReactNode} from "react";
import Navbar from "../Navbar/Navbar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface LayoutProps {
    children: ReactNode
}

const Layout = (props: LayoutProps) => {
    return (
        <div className={"flex flex-col h-full w-full bg-"}>
            <ToastContainer
                position={"top-right"}
                autoClose={3000}
                closeOnClick={true}
                draggable={true}
                pauseOnHover={true}
                pauseOnFocusLoss={true}
                rtl={false}
                theme={"dark"}
            />
            <Navbar/>
            <div className={"w-full h-full"}>
                <div className={"mx-auto max-w-7xl sm:px-6 lg:px-8"}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Layout;