import axios from "axios";
//Demo Server
export const accountsConfig = axios.create({
    baseURL: "https://demo-api.ykipp.com/",
});
export const communityConfig = axios.create({
    baseURL: "https://demo-api.ykipp.com/api/v1/",
});
export const manageConfig = axios.create({
    baseURL: "https://demo-api.ykipp.com/api/v1/",
});

export const baseUrl = "https://demo-api.ykipp.com/api/v1";

// Live Server
// export const accountsConfig = axios.create({
//     baseURL: "https://deep.ykipp.com/",
// });
// export const communityConfig = axios.create({
//     baseURL: "https://deep.ykipp.com/api/v1/",
// });
// export const manageConfig = axios.create({
//     baseURL: "https://deep.ykipp.com/api/v1/",
// });

// export const baseUrl = "https://deep.ykipp.com/api/v1";

// const communityConfig = "https://demo-api.ykipp.com/api/v1/";
