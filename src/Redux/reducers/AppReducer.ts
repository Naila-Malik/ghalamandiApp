import { createSlice } from '@reduxjs/toolkit';
import { AppStrings } from '../../Utils/Strings';
import { IReduxState } from '../../Utils/AppTypes';

const initialState: IReduxState = {
  isLoaderStart: false,
  isNetConnected: true,
  safeArea: { top: 0, bottom: 0 },
  userData: null,
  drawerValue: false,
  drawerIndex: 0,
  isNotchDevice: false,
  fetchUpdatedUser: new Date().toISOString(),
  moveToScreen: null,
  moveToParams: null,
  alertObj: null,
  showToast: '',
  notificationObj: null,
  childList: [],
  selectedChild: null,
};

export const AppSlice = createSlice({
  name: 'AppReducer',
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoaderStart = action.payload;
    },
    setSafeArea: (state, action) => {
      state.safeArea = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    toggleDrawer: (state, action) => {
      state.drawerValue = action.payload;
    },
    setDrawerIndex: (state, action) => {
      state.drawerIndex = action.payload;
    },
    setIsNotchDevice: (state, action) => {
      state.isNotchDevice = action.payload;
    },
    setNetConnected: (state, action) => {
      state.isNetConnected = action.payload;
    },
    setFetchUpdatedUser: (state, action) => {
      state.fetchUpdatedUser = action.payload;
    },
    setMoveToScreen: (state, action) => {
      state.moveToScreen = action.payload;
    },
    setMoveToParams: (state, action) => {
      state.moveToParams = action.payload;
    },
    setAlertObj: (state, action) => {
      state.alertObj = action.payload;
    },
    setShowToast: (state, action) => {
      state.showToast = action.payload;
    },
    setNotificationObj: (state, action) => {
      state.notificationObj = action.payload;
    },
    setChildList: (state, action) => {
      state.childList = action.payload;
    },
    setSelectedChild: (state, action) => {
      state.selectedChild = action.payload;
    },

  },
});

export const {
  setLoader,
  setSafeArea,
  setUserData,
  toggleDrawer,
  setDrawerIndex,
  setIsNotchDevice,
  setNetConnected,
  setFetchUpdatedUser,
  setMoveToScreen,
  setMoveToParams,
  setAlertObj,
  setShowToast,
  setNotificationObj,
  setChildList,
  setSelectedChild,
} = AppSlice.actions;

export default AppSlice.reducer;
