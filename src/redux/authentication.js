// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    token: "",
    isAuthenticated: true,
    user: {
      employeeNo: 100,
      employeeName: "TEST",
      employeeTitle: "TT",
    },
    isAuthenticatedConsignee: false,
    consignee: {
      name: "",
      email: "",
      userNo: "",
      companyNo: "",
      company: "",
    },
    consigneeToken: "",

    currencyData: null,
    currency: "GBP",
  },

  reducers: {
    handleLogin: (state, action) => {

      localStorage.setItem("token", action.payload.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload.token}`;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    handleConsigneeLogin: (state, action) => {
      console.log(action.payload);
      state.isAuthenticatedConsignee = true;
      state.consigneeToken = action.payload.token;
      state.consignee = {
        name: action.payload.name,
        email: action.payload.email,
        userNo: action.payload.userNo,
        companyNo: action.payload.companyNo,
        company: action.payload.company,
        permissions: action.payload.permissions,
      };
    },
    handleConsigneeLogout: (state, action) => {
      state.isAuthenticatedConsignee = false;
      state.consigneeToken = "";
      state.consignee = {
        name: "",
        email: "",
        userNo: "",
        companyNo: "",
        company: "",
      };
    },
    handleLogout: (state, action) => {
      state.skin = action.payload;
      window.localStorage.setItem("skin", JSON.stringify(action.payload));
    },
    handleLoadUser: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    handleCurrency: (state, action) => {
      state.currencyData = action.payload;
    },
  },
});

export const {
  handleLogin,
  handleConsigneeLogin,
  handleConsigneeLogout,
  handleLoadUser,
  handleLogout,
  handleCurrency,
} = authSlice.actions;

export default authSlice.reducer;
