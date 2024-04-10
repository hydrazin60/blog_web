 
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   currentUser: null,
//   error: null,
//   loading: false,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     signInStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     signInSuccess(state, action) {
//       state.currentUser = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     signInFailure(state, action) {
//       // Corrected typo in the action name
//       state.loading = false;
//       state.error = action.payload;
//     },
//     updateStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     updateSuccess(state, action) {
//       state.currentUser = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     updateFailure(state, action) {
//       // Corrected typo in the action name
//       state.loading = false;
//       state.error = action.payload;
//     },
//     clearError(state) {
//       state.error = null;
//     },
//     signoutSuccess: (state) => {
//       state.currentUser = null;
//       state.error = null;
//       state.loading = false;
//     },
//     deleteUserStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     deleteUserSuccess: (state) => {
//       state.currentUser = null;
//       state.loading = false;
//       state.error = null;
//     },
//     deleteUserFailure: (state) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   signInStart,
//   signInSuccess,
//   signInFailure, // Corrected typo in the action export
//   updateStart,
//   updateFailure, // Corrected typo in the action export
//   updateSuccess,
//   signoutSuccess,
//   clearError,
//   deleteUserStart,
//   deleteUserSuccess,
//   deleteUserFailure
// } = userSlice.actions;

// export default userSlice.reducer;







import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateSuccess(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => { // add action parameter here
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateFailure,
  updateSuccess,
  signoutSuccess,
  clearError,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} = userSlice.actions;

export default userSlice.reducer;
