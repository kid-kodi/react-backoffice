// export const SOCKET_URL = "http://localhost:2000";
// export const BASE_URL = "http://localhost:2000/api/admin";
// export const FILE_URL = "http://localhost:2000/api";

export const SOCKET_URL = "/";
export const BASE_URL = "/api/admin";
export const FILE_URL = "/api";

export const REGISTER = BASE_URL + "/auth/register";
export const LOGIN = BASE_URL + "/auth/login";
export const LOGOUT = BASE_URL + "/auth/logout";
export const CHECK_EMAIL = BASE_URL + "/auth/verify-email";
export const FORGOT_PASSWORD = BASE_URL + "/auth/forgot-password";
export const RESET_PASSWORD = BASE_URL + "/auth/reset-password";

export const GET_ME = BASE_URL + "/auth/me";
export const EDIT_ME = BASE_URL + "/auth/me/update";
export const GET_CHAT = BASE_URL + "/chats/";

export const UPLOAD_IMG = FILE_URL + "/upload/upload-img";
export const UPLOAD_AUDIO = FILE_URL + "/upload/upload-audio";

// Blog End point
export const GET_POSTS = BASE_URL + "/posts/";
export const NEW_POSTS = BASE_URL + "/posts/create";

// Category end point
export const GET_POSTS_BY_CATEGORY = BASE_URL + "/posts/category/";
export const GET_CATEGORIES = BASE_URL + "/categories/";
export const NEW_CATEGORY = BASE_URL + "/categories/create";

// Blog End point
export const GET_USERS = BASE_URL + "/users/";
export const NEW_USER = BASE_URL + "/users/create";
