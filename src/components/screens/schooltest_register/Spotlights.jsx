import React, { useContext } from "react";
import LandingPage from "../schooltest_register/includes/LandingPage";
import { Context } from "../../context/store";

function SpotlightPage({ children }) {
    const {
        dispatch,
        state: { school_test_data },
    } = useContext(Context);
    const is_registered = school_test_data.is_registered;
    return is_registered ? children : <LandingPage />;
}

export default SpotlightPage;
