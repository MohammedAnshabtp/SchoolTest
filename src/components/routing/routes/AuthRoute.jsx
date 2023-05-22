import React, { useContext } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { Context } from "../../context/store";

const AuthRoute = ({ children }) => {
    const {
        dispatch,
        state: { school_test_data },
    } = useContext(Context);
    const is_verified = school_test_data.is_verified;
    const [searchParams] = useSearchParams();
    const nextPath = searchParams.get("next") ? searchParams.get("next") : "/";

    return !is_verified ? children : <Navigate to="/entrance" />;
};

export default AuthRoute;
