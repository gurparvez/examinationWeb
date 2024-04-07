import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import useApi from "../../API/useApi";
import { Loader } from "../../components";
import AdminHeader from "./AdminHeader";

const Admin = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { apiData, response, isLoading, error } = useApi("get");
    const dispatch = useDispatch();

    return (
        <div>
            {isLoading && <Loader />}

            <AdminHeader />

            <Outlet />

            Admin Footer
        </div>
    );
};

export default Admin;
