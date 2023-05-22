import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "../../context/store";
import SectionLoader from "../../helpers/SectionLoader";
import EntranceLogin from "../../screens/schooltestlogin/entrance_login";
import SpotlightPage from "../../screens/schooltest_register/Spotlights";
import AuthRoute from "../routes/AuthRoute";
import PrivateRoute from "../routes/PrivateRoute";

import EntrancePage from "../../screens/schooltestlogin/EntrancePage";
import ExamCompletedPage from "../../screens/schooltestlogin/includes/ExamCompletedPage";
import ExamExpired from "../../screens/schooltestlogin/includes/ExamExpired";
import NoExamination from "../../screens/schooltestlogin/includes/NoExamination.jsx";
import ExamEndModal from "../../screens/schooltestlogin/includes/ExamEndModal.jsx";
import EntranceInstruction from "../../screens/schooltestlogin/EntranceInstruction";
import axios from "axios";
import ViewResponse from "../../screens/schooltestlogin/includes/ViewResponse";
import TimeExceededModal from "../../screens/schooltestlogin/includes/TimeExceededModal";

function MainRouter() {
    const {
        dispatch,
        state: { school_test_data },
    } = useContext(Context);
    const is_verified = school_test_data.is_verified;
    const [isLoading, setLoading] = useState(true);

    //---------------Mobile browser-----------------------------------
    useEffect(() => {
        window.addEventListener("beforeunload", clearLocalStorage);
        return () => {
            window.removeEventListener("beforeunload", clearLocalStorage);
        };
    }, []);

    const clearLocalStorage = () => {
        localStorage.clear();
    };

    return !isLoading ? (
        <SectionLoader />
    ) : (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AuthRoute>
                            <SpotlightPage />
                        </AuthRoute>
                    }
                />

                <Route
                    path="/entrance"
                    element={
                        <AuthRoute>
                            <EntranceLogin />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/entrance/instructions"
                    element={
                        <PrivateRoute>
                            <EntranceInstruction />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/entrance/questions"
                    element={
                        <PrivateRoute>
                            <EntrancePage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/entrance/completed"
                    element={
                        <PrivateRoute>
                            <ExamCompletedPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/entrance/review"
                    element={
                        <PrivateRoute>
                            <ViewResponse />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/entrance/expired"
                    element={
                        <PrivateRoute>
                            <ExamExpired />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/entrance/commence"
                    element={
                        <PrivateRoute>
                            <NoExamination />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/entrance/endtest"
                    element={
                        <PrivateRoute>
                            <ExamEndModal />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/entrance/exam-time-exceed"
                    element={
                        <PrivateRoute>
                            <TimeExceededModal />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default MainRouter;
