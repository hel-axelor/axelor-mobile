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

import {Dimensions, StyleSheet} from 'react-native';

export const getCommonStyles = Colors =>
  StyleSheet.create({
    filter: {
      backgroundColor: Colors.backgroundColor,
      borderRadius: 13,
      elevation: 2,
      paddingHorizontal: 12,
      paddingVertical: 0,
      marginVertical: 3,
    },
    filterAlign: {
      marginHorizontal: 18,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    filterSize: {
      width: '90%',
      height: 40,
    },
    button: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      paddingVertical: 5,
      marginVertical: 5,
      borderRadius: 35,
      width: '90%',
      height: Dimensions.get('window').height * 0.07,
      minHeight: 30,
      maxHeight: 40,
    },
  });
