import { Suspense, lazy, useContext, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { baseUrl, AxiosInstance } from "../../../axiosConfig.js";
import axios from "axios";

import { Context } from "../../context/store.js";
import EntranceLogin from "../../screens/schooltestlogin/entrance_login";
import EntranceInstruction from "../../screens/schooltestlogin/EntranceInstruction";
import EntrancePage from "../../screens/schooltestlogin/EntrancePage";
import ExamCompletedPage from "../../screens/schooltestlogin/includes/ExamCompletedPage";
import ExamExpired from "../../screens/schooltestlogin/includes/ExamExpired";
import SectionLoader from "../../helpers/SectionLoader.jsx";
import ExamQuestions from "../../screens/schooltestlogin/includes/ExamQuestion.jsx";
import NoExamination from "../../screens/schooltestlogin/includes/NoExamination.jsx";
import Header from "../../screens/schooltest_register/includes/Header.jsx";
import ExamEndModal from "../../screens/schooltestlogin/includes/ExamEndModal.jsx";
import TimeExceededModal from "../../screens/schooltestlogin/includes/TimeExceededModal.jsx";
import ViewResponse from "../../screens/schooltestlogin/includes/ViewResponse.jsx";
const Spotlight = lazy(() =>
    import("../../screens/schooltest_register/Spotlights")
);

function AppRouter() {
    const {
        dispatch,
        state: { school_test_data },
    } = useContext(Context);
    const is_registered = school_test_data.is_registered;
    const navigate = useNavigate();

    return (
        <div>
            <Suspense fallback={<SectionLoader />}>
                <Routes>
                    <Route path="/" element={<Spotlight />} />

                    <Route
                        path="/entrance/instructions"
                        element={<EntranceInstruction />}
                    />
                    <Route
                        path="/entrance/questions"
                        element={<EntrancePage />}
                    />

                    <Route
                        path="/entrance/completed"
                        element={<ExamCompletedPage />}
                    />
                    <Route path="/entrance/expired" element={<ExamExpired />} />
                    <Route
                        path="/entrance/commence"
                        element={<NoExamination />}
                    />
                    <Route
                        path="/entrance/endtest"
                        element={<ExamEndModal />}
                    />
                    <Route
                        path="/entrance/exam-time-exceed"
                        element={<TimeExceededModal />}
                    />
                    <Route path="/entrance/review" element={<ViewResponse />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default AppRouter;
