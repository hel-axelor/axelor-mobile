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

import React, {useEffect, useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {formatDuration} from '../../../utils/formatters';

interface TimerProps {
  time: number;
  timerFormat: string;
  style?: any;
  isPaused?: boolean;
  onCount: (value: any) => void;
}

function Timer({
  style,
  timerFormat,
  time = 0,
  isPaused = true,
  onCount,
}: TimerProps) {
  const interval = React.useRef(null);
  const Colors = useThemeColor();
  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  const counterHandle = useCallback(() => {
    if (isNaN(time)) {
      console.warn('Timer: something went wrong');
      return;
    }
    onCount(time + 1000);
  }, [onCount, time]);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    interval.current = setInterval(counterHandle, 1000);
    return () => clearInterval(interval.current);
  }, [counterHandle, isPaused, time]);

  return (
    <View style={[styles.timer, style]}>
      <Text style={styles.text}>{formatDuration(time, timerFormat)}</Text>
    </View>
  );
}

const getStyles = Colors =>
  StyleSheet.create({
    timer: {
      flexShrink: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 36,
      fontWeight: 'bold',
      color: Colors.secondaryColor_dark.background,
    },
  });

export default Timer;
