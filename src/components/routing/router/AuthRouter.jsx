import React, { lazy, Suspense, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "../../context/store";
import SectionLoader from "../../helpers/SectionLoader";
import SpotlightPage from "../../screens/schooltest_register/Spotlights";
import EntranceLogin from "../../screens/schooltestlogin/entrance_login";

const AuthRouter = ({ children }) => {
    const {
        dispatch,
        state: { school_test_data },
    } = useContext(Context);
    return (
        <Suspense fallback={<SectionLoader />}>
            <Routes>
                <Route path="/" element={<SpotlightPage />} />
                <Route path="/entrance" element={<EntranceLogin />} />
            </Routes>
        </Suspense>
    );
};

export default AuthRouter;
