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

import React from 'react';
import {Application} from '@axelor/aos-mobile-core';
import {StockModule} from '@axelor/aos-mobile-stock';
import {ManufacturingModule} from '@axelor/aos-mobile-manufacturing';
import {CrmModule} from '@axelor/aos-mobile-crm';
import application_properties from '../package.json';
import {app_config} from '../app.config';
import {BootstrapIcon} from '@axelor/aos-mobile-ui';
import {StyleSheet, View} from 'react-native';

const App = () => {
  // return (
  //   <Application
  //     modules={[StockModule, ManufacturingModule, CrmModule]}
  //     mainMenu="auth_menu_user"
  //     version={application_properties.version}
  //     configuration={app_config}
  //   />
  // );

  // TODO: clean this component after test :)
  return (
    <View style={styles.container}>
      <BootstrapIcon name="apple" size={190} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
