import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../context/store";

const PrivateRoute = ({ children }) => {
    const [isLoading, setLoading] = useState(false);

    const { state, dispatch } = useContext(Context);
    async function fetchUserData() {
        // let promise = new Promise((resolve, reject) => {
        let school_test_data = localStorage.getItem("school_test_data");
        if (!school_test_data) {
            localStorage.setItem(
                "school_test_data",
                JSON.stringify(school_test_data)
            );
            school_test_data = localStorage.getItem("school_test_data");
        }
        let school_test_data_stored = JSON.parse(school_test_data);
        dispatch({
            type: "UPDATE_SCHOOL_TEST_DATA",
            school_test_data: school_test_data_stored,
        });
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }

    useEffect(() => {
        fetchUserData();
    }, []);
    const is_verified = state.school_test_data.is_verified;

    return is_verified ? children : <Navigate to="/entrance" />;
};

export default PrivateRoute;
