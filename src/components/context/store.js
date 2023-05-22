import React, { createContext, useReducer } from "react";

const initialState = {
    isMarked: false,
    isMalayalam: true,
    school_test_data: {
        is_verified: false,
        is_registered: false,
        name: "",
        phone: "",
        isClass: "",
        studentDivison: "",
        CampusName: "",
        register_token: "",
        access_token: "",
        refresh_token: "",
        exam_status: "pending",
        start_timestamp: "",
        end_timestamp: "",
        is_loading: true,
        exam_pk: "",
        date: "",
        predate: "",
        total_questions: "",
        total_time_allotted: "",
        all_questions: [],
        currentQuestionnumber: 1,
        currentQuestionId: "",
    },
    isStudentList: false,
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_LANGUAGE":
            return {
                ...state,
                isMalayalam: action.isMalayalam,
            };
        case "UPDATE_SCHOOL_TEST_DATA":
            const school_test_data = {
                ...state.school_test_data,
                ...action.school_test_data,
            };
            localStorage.setItem(
                "school_test_data",
                JSON.stringify(school_test_data)
            );
            return {
                ...state,
                school_test_data: school_test_data,
            };
    }
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};

export const Context = createContext(initialState);

export default Store;
