export interface AxiosParamsInterface {
    url: string,
    method: string,
    requiresToken?: boolean,
    params?: any,
    isFormData?: boolean,
    requestTimeoutDuration?: number,
    showLoader?: boolean,
    saveToken?: boolean

}

export const axiosMethodTypes = {
    get: 'GET',
    post: 'POST',
    update: 'UPDATE',
    delete: 'DELETE'
}

export interface IReduxState {
    isLoaderStart: boolean;
    isNetConnected: boolean;
    safeArea: { top: number; bottom: number };
    userData: any;
    drawerValue: boolean;
    drawerIndex: number;
    isNotchDevice: boolean;
    fetchUpdatedUser: any;
    moveToScreen: null | string;
    moveToParams: null | any;
    alertObj: any;
    showToast: string;
    notificationObj: any;
    selectedChild: any;
    childList: Array<any>
}