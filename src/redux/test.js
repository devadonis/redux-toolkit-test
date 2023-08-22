// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "test",
  initialState: {
    tabs: ['home'],
    currentTab: 'home',
  },

  reducers: {
    addTab: (state, action) => {
      const exist = state.tabs.includes(action.payload)

      if (!exist) {
        state.tabs.push(action.payload)
      }
      state.currentTab = action.payload
    },
    deleteTab: (state, action) => {
      state.tabs = state.tabs.filter(tab => {
        if (tab !== 'home') {
          return tab != action.payload
        }
        return tab
     })
      state.currentTab = 'home'
    },
    deleteAll: (state, action) => {
      state.tabs = ['home']
      state.currentTab = 'home'
    },
    navigateTab: (state, action) => {
      state.currentTab = action.payload
    }
  }
});

export const {
  addTab,
  deleteTab,
  deleteAll,
  navigateTab
} = testSlice.actions;

export default testSlice.reducer;
