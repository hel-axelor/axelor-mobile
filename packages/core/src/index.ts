/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

export * from './app';
export {default as Navigator} from './navigator/Navigator';
export {configGlobalStore} from './redux/store';
export {storage, useStorage} from './storage/Storage';
export {traceError} from './api/traceback-api';
export {useEffectDebugger} from './hooks/use-effect-debugger';
export {logout} from './features/authSlice';
export {axiosApiProvider} from './axios/AxiosApi';
export {
  getApiResponseData,
  getFirstData,
  handlerApiCall,
  handlerError,
} from './api/utils';
export {
  useScannedValueByKey,
  useScannerSelector,
  enableScan,
  scanValue,
  disableScan,
  default as scannerReducer,
} from './features/scannerSlice';
export {
  useCameraSelector,
  useCameraValueByKey,
  enableCamera,
  takePhoto,
  disableCamera,
  default as cameraReducer,
} from './features/cameraSlice';
export {useDispatch, useSelector} from './redux/hooks';
export * from './components';
export * from './tools';
export * from './utils';
export * from './types';
export * from './auth';
export * from './i18n';
