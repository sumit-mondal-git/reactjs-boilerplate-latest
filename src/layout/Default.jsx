import React, { Suspense } from 'react'
import { useLocation, Outlet } from "react-router-dom";
export default function Default() {
    return (
        <div>
            <span>header</span>
            <Suspense fallback={<div className="react-load">Loading</div>}>
                <Outlet></Outlet>
            </Suspense>
            <footer>Footer</footer>
        </div>
    )
}
