/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import {BlockInteractionMessage, LoadingIndicator} from '@axelor/aos-mobile-ui';
import {ErrorBoundary} from '@axelor/aos-mobile-error';
import RootNavigator from './RootNavigator';
import {Module} from './Module';
import Translator from '../i18n/component/Translator';
import {getActiveUserInfo} from '../api/login-api';
import ErrorScreen from '../screens/ErrorScreen';
import {
  Camera,
  CameraScanner,
  HeaderBandList,
  Scanner,
  Toast,
} from '../components';
import {RouterProvider} from '../config';
import {proxy, releaseConfig, versionCheckConfig} from './types';

interface instanceConfig {
  testInstanceConfig: proxy;
  releaseInstanceConfig: releaseConfig;
  enableConnectionSessions: boolean;
  logoFile?: any;
  versionCheckConfig?: versionCheckConfig;
}

interface ContextedApplicationProps {
  modules: Module[];
  mainMenu?: string;
  version: string;
  configuration?: instanceConfig;
}

const ContextedApplication = ({
  modules,
  mainMenu,
  version,
  configuration,
}: ContextedApplicationProps) => {
  const [, setRefresh] = useState(false);
  const [tracebackRoute, setTracebackRoute] = useState('');

  const traceBackPutMethod = useCallback(({additionalURL, data}) => {
    return axios.put(additionalURL, {data: data});
  }, []);

  useEffect(() => {
    RouterProvider.get('TraceBack').then(setTracebackRoute);
  }, []);

  const getActiveUserId = useCallback(
    () => getActiveUserInfo().then(({userId}) => userId),
    [],
  );

  return (
    <>
      <Camera />
      <CameraScanner />
      <Scanner />
      <Translator />
      <ErrorBoundary
        errorScreen={ErrorScreen}
        userIdfetcher={getActiveUserId}
        putMethod={traceBackPutMethod}
        additionalURL={tracebackRoute}>
        <NavigationContainer>
          <HeaderBandList />
          <LoadingIndicator />
          <BlockInteractionMessage />
          <RootNavigator
            modules={modules}
            mainMenu={mainMenu}
            version={version}
            onRefresh={() => setRefresh(_current => !_current)}
            configuration={configuration}
          />
        </NavigationContainer>
      </ErrorBoundary>
      <Toast />
    </>
  );
};

export default ContextedApplication;
