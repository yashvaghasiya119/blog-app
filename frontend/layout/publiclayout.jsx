import { Outlet } from "react-router-dom";
import { Navbar } from "../componets/navbar";

export function PublicLayout() {
    return (
        <div>
            <Navbar/>
            <Outlet />
        </div>
    );
}