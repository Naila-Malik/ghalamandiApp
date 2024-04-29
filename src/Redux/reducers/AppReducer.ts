import {createSlice} from '@reduxjs/toolkit';
import {AppStrings} from '../../Utils/Strings';
import {IReduxState} from '../../Utils/AppTypes';

const initialState: IReduxState = {
  isLoaderStart: false,
  isNetConnected: true,
  safeArea: {top: 0, bottom: 0},
  userData: null,
  mainMenuId: 0,
  isNotchDevice: false,
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
    setMainMenuId: (state, action) => {
      state.mainMenuId = action.payload;
    },
    setIsNotchDevice: (state, action) => {
      state.isNotchDevice = action.payload;
    },
    setNetConnected: (state, action) => {
      state.isNetConnected = action.payload;
    },
  },
});

export const {
  setLoader,
  setSafeArea,
  setUserData,
  setMainMenuId,
  setIsNotchDevice,
  setNetConnected,
} = AppSlice.actions;

export default AppSlice.reducer;
