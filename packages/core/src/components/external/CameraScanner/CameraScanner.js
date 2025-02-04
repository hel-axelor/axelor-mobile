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

import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import {formatScan} from '../../../utils/formatters';
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';

const CameraScanner = ({
  isActive = false,
  onScan = value => {},
  coordinate = {x: 0, y: 0},
  onClose = () => {},
}) => {
  const positionStyle = useMemo(() => {
    return getStyles(coordinate);
  }, [coordinate]);

  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const Colors = useThemeColor();

  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    {
      checkInverted: true,
    },
  );

  const handleScan = useCallback(
    barcode => {
      if (barcode != null) {
        onScan({
          value: formatScan(
            barcode.displayValue,
            BarcodeFormat[barcode.format],
          ),
          type: BarcodeFormat[barcode.format],
        });
      }
    },
    [onScan],
  );

  useEffect(() => {
    if (barcodes[0] != null) {
      handleScan(barcodes[0]);
    }
  }, [barcodes, handleScan]);

  useEffect(() => {
    if (isActive) {
      (async () => {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'authorized');
      })();
    }

    return () => setHasPermission(false);
  }, [isActive]);

  return (
    device != null &&
    hasPermission && (
      <>
        <Icon
          name="times"
          size={24}
          color={Colors.primaryColor.background}
          touchable={true}
          onPress={onClose}
          style={[styles.icon, positionStyle.icon]}
        />
        <Camera
          style={[styles.camera, positionStyle.camera]}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
      </>
    )
  );
};

const getStyles = coordinate => {
  return StyleSheet.create({
    camera: {
      top: coordinate != null ? -coordinate.y : 0,
    },
    icon: {
      top: coordinate != null ? -coordinate.y + 20 : 0,
    },
  });
};

const styles = StyleSheet.create({
  camera: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    zIndex: 50,
  },
  icon: {
    zIndex: 60,
    position: 'absolute',
    right: 30,
  },
});

export default CameraScanner;
