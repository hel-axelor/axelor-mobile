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

import React, {useState, useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  Card,
  getCommonStyles,
  Icon,
  Input,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  enableScan,
  useScannedValueByKey,
  useScannerSelector,
} from '../../../features/scannerSlice';
import {CameraScanner} from '../../external';

const InputBarCodeCard = ({
  style,
  scanKeySearch,
  title,
  onChange = () => {},
}) => {
  const Colors = useThemeColor();
  const [camScan, setCamScan] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [viewCoordinate, setViewCoordinate] = useState(null);
  const [inputData, setInputData] = useState(null);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(scanKeySearch);
  const dispatch = useDispatch();

  useEffect(() => {
    if (scannedValue) {
      setInputData(scannedValue);
      onChange(scannedValue);
    } else if (scanData != null && scanData.value != null) {
      setCamScan(false);
      setInputData(scanData.value);
      onChange(scanData.value);
    }
  }, [onChange, scanData, scannedValue]);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <View
      style={style}
      onLayout={event => {
        const {x, y} = event.nativeEvent.layout;
        setViewCoordinate({x: x, y: y});
      }}>
      <CameraScanner
        isActive={camScan}
        onScan={setScanData}
        coordinate={viewCoordinate}
        onClose={() => setCamScan(false)}
      />
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.textImportant}>{title}</Text>
        </View>
      )}
      <Card
        style={[
          commonStyles.filter,
          commonStyles.filterAlign,
          styles.container,
        ]}>
        <Input
          style={styles.inputField}
          value={inputData}
          onChange={onChange}
          onSelection={() => {
            scanKeySearch ? dispatch(enableScan(scanKeySearch)) : undefined;
          }}
        />
        <Icon
          name="qrcode"
          touchable={true}
          onPress={() => setCamScan(true)}
          color={
            isEnabled && scanKey === scanKeySearch
              ? Colors.primaryColor.background
              : Colors.secondaryColor_dark.background
          }
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    paddingRight: 15,
    marginBottom: '3%',
  },
  inputField: {
    width: '90%',
  },
  titleContainer: {
    marginHorizontal: 16,
  },
  textImportant: {
    fontWeight: 'bold',
  },
});

export default InputBarCodeCard;
