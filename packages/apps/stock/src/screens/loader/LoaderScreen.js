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

import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Screen} from '@axelor/aos-mobile-ui';
import {LoaderPopup, useLoader} from '@axelor/aos-mobile-core';

// Screen for test Loader functionnalities
const LoaderScreen = () => {
  const [runProccess, setRunProccess] = useState(false);

  const process = () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve('Process finished');
      }, 10000);
    });

  const handleSuccessAction = () => {
    setRunProccess(false);
    console.log('Success action executed!');
  };

  const handleErrorAction = () => {
    setRunProccess(false);
    console.log('Error action executed!');
  };

  const {loading} = useLoader();

  return (
    <Screen>
      <View>
        <Button
          title="Run process"
          onPress={() => setRunProccess(true)}
          disabled={loading}
        />
        <LoaderPopup
          process={process}
          runProccess={runProccess}
          timeout={5000}
          onSuccess={handleSuccessAction}
          onError={handleErrorAction}
          disabled={false}
        />
      </View>
    </Screen>
  );
};

export default LoaderScreen;
