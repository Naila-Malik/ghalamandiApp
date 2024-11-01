import {ModalPropsIOS} from 'react-native';

export interface AxiosParamsInterface {
  url: string;
  method: string;
  requiresToken?: boolean;
  params?: any;
  isFormData?: boolean;
  requestTimeoutDuration?: number;
  showLoader?: boolean;
  saveToken?: boolean;
}

export const axiosMethodTypes = {
  get: 'GET',
  post: 'POST',
  update: 'UPDATE',
  delete: 'DELETE',
};

export interface IReduxState {
  isLoaderStart: boolean;
  isNetConnected: boolean;
  safeArea: {top: number; bottom: number};
  userData: any;
  userChat: any;
  mainMenuId: number;
  isNotchDevice: boolean;
  alertObj: any;
  isAlertShow: any;
}

export enum FileExtensions {
  Pdf = 'pdf',
  Png = 'png',
  Jpg = 'jpg',
  Jpeg = 'jpeg',
  Webp = 'webp',
  Doc = 'doc',
  Docx = 'docx',
}
export type DocumentPickerResponse = {
  uri: string;
  name: string | null;
  copyError?: string;
  fileCopyUri: string | null;
  type: string | null;
  size: number | null;
};

export type DirectoryPickerResponse = {
  uri: string;
};

export type TransitionStyle =
  | 'coverVertical'
  | 'flipHorizontal'
  | 'crossDissolve'
  | 'partialCurl';
export type SupportedPlatforms = 'ios' | 'android' | 'windows';
const mimeTypes = Object.freeze({
  allFiles: '*/*',
  audio: 'audio/*',
  csv: 'text/csv',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  images: 'image/*',
  pdf: 'application/pdf',
  plainText: 'text/plain',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  video: 'video/*',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  zip: 'application/zip',
} as const);

const utis = Object.freeze({
  allFiles: 'public.item',
  audio: 'public.audio',
  csv: 'public.comma-separated-values-text',
  doc: 'com.microsoft.word.doc',
  docx: 'org.openxmlformats.wordprocessingml.document',
  images: 'public.image',
  pdf: 'com.adobe.pdf',
  plainText: 'public.plain-text',
  ppt: 'com.microsoft.powerpoint.ppt',
  pptx: 'org.openxmlformats.presentationml.presentation',
  video: 'public.movie',
  xls: 'com.microsoft.excel.xls',
  xlsx: 'org.openxmlformats.spreadsheetml.sheet',
  zip: 'public.zip-archive',
} as const);

const extensions = Object.freeze({
  allFiles: '*',
  audio:
    '.3g2 .3gp .aac .adt .adts .aif .aifc .aiff .asf .au .m3u .m4a .m4b .mid .midi .mp2 .mp3 .mp4 .rmi .snd .wav .wax .wma',
  csv: '.csv',
  doc: '.doc',
  docx: '.docx',
  images: '.jpeg .jpg .png',
  pdf: '.pdf',
  plainText: '.txt',
  ppt: '.ppt',
  pptx: '.pptx',
  video: '.mp4',
  xls: '.xls',
  xlsx: '.xlsx',
  zip: '.zip .gz',
} as const);
export type PlatformTypes = {
  android: typeof mimeTypes;
  ios: typeof utis;
  windows: typeof extensions;
};

export type DocumentPickerOptions<OS extends SupportedPlatforms> = {
  type?:
    | string
    | PlatformTypes[OS][keyof PlatformTypes[OS]]
    | Array<PlatformTypes[OS][keyof PlatformTypes[OS]] | string>;
  mode?: 'import' | 'open';
  copyTo?: 'cachesDirectory' | 'documentDirectory';
  allowMultiSelection?: boolean;
  transitionStyle?: TransitionStyle;
} & Pick<ModalPropsIOS, 'presentationStyle'>;
