import axios from "axios";
import { data } from "react-router-dom";

const API = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });

// export const createUser = async (userInfo) => {
//   // console.log(userInfo);
//   try {
//     const { data } = await API.post("/user/create", userInfo);
//     return data;
//   } catch (error) {
//     const { response } = error;
//     if (response?.data) return response.data;

//     return { error: error.message || error };
//   }
// };


export const signInUser = async (userInfo) => {
  try {
    const { data } = await API.post("/sign-in/", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
export const CheckerAuth = async (token) => {
  try {
    const { data } = await API.get(`/token/authenticate/${token}`, {
      headers: {
        accept: "application/json",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    console.log(response)
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
// export const forgetpassword = async (email) => {
//   try {
//     const { data } = await API.post("/user/forget-password", { email });
//     console.log(data);
//     return data;
//   } catch (error) {
//     const { response } = error;
//     if (response?.data) return response.data;

//     return { error: error.message || error };
//   }
// };
// export const verifyPasswordResetToken = async (token, userId) => {
//   try {
//     const { data } = await API.post("/user/verify-pass-reset-token", {
//       token,
//       userId,
//     });
//     return data;
//   } catch (error) {
//     const { response } = error;
//     if (response?.data) return response.data;

//     return { error: error.message || error };
//   }
// };

// export const resetPassword = async ({ token, userId, newPassword }) => {
//   try {
//     const { data } = await API.post("/user/reset-password", {
//       token,
//       userId,
//       newPassword,
//     });
//     return data;
//   } catch (error) {
//     const { response } = error;
//     if (response?.data) return response.data;

//     return { error: error.message || error };
//   }
// };

// export const resendEmailVerificationToken = async (userId) => {
//   try {
//     const { data } = await API.post(
//       "/user/resend-email-verification-token",
//       {
//         userId,
//       }
//     );
//     return data;
//   } catch (error) {
//     const { response } = error;
//     if (response?.data) return response.data;

//     return { error: error.message || error };
//   }
// };
