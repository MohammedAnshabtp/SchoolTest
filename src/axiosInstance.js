import axios from "axios";
export const baseURL = "https://demo-api.ykipp.com/";

const AxiosInstance = axios.create({
    baseURL: baseURL,
});

axios.defaults.headers.common["Accept"] = "application/json";

AxiosInstance.interceptors.request.use(
    async (config) => {
        const token = await localStorage.getItem("newToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.key = token?.refresh;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
);
//Error handling
AxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (
            error?.response?.data?.code == "token_not_valid" &&
            error?.response?.status === 401
        ) {
            if (
                error?.response?.data?.messages &&
                error?.response?.data?.messages[0]?.token_type == "access"
            ) {
                const originalConfig = error.config;
                originalConfig._retry = true;
                //repeat Api calling
            } else {
                return Promise.reject("refresh_not_valid");
            }
            // alert("Token not valid")
        } else if (error?.response?.status == 502) {
            console.log("Failed");
        } else if (error?.response?.status == 403) {
            console.log("For bidden");

            const originalConfig = error.config;
            originalConfig._retry = true;
            try {
                var updateToken = await localStorage.getItem("newToken");
                const tokens = JSON.parse(
                    await localStorage.getItem("school_test_data")
                );

                const response = await AxiosInstance.post(
                    `api/v1/accounts/token/refresh/`,
                    {
                        refresh: tokens.refresh_token,
                    }
                );
                updateToken = response?.data?.access;

                await localStorage.setItem("newToken", updateToken);

                return AxiosInstance(originalConfig);
            } catch (_error) {
                return Promise.reject(_error);
            }
        } else {
            return Promise.reject(error);
        }
    }
);

export { AxiosInstance };
