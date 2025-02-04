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

import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';
import {StopwatchType} from '../../../types';
import {Timer} from '../../external';

interface StopwatchProps {
  startTime: number;
  status: number;
  timerFormat: string;
  disable?: boolean;
  disablePlay?: boolean;
  disablePause?: boolean;
  disableStop?: boolean;
  disableCancel?: boolean;
  hideCancel?: boolean;
  style?: any;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onCancel?: () => void;
}

const Stopwatch = ({
  startTime = 0,
  status = StopwatchType.status.Ready,
  timerFormat,
  disable = false,
  disablePlay = false,
  disablePause = false,
  disableStop = false,
  disableCancel = false,
  hideCancel = false,
  style,
  onPlay = () => {},
  onPause = () => {},
  onStop = () => {},
  onCancel = () => {},
}: StopwatchProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const [state, setState] = useState(status);
  const [time, setTime] = useState(startTime);

  const borderStyle = useMemo(() => {
    return getStyles(StopwatchType.getStatusBorderColor(state, Colors)).border;
  }, [Colors, state]);

  const handlePlayBtn = () => {
    setState(StopwatchType.status.InProgress);
    onPlay();
  };

  const handlePauseBtn = () => {
    setState(StopwatchType.status.Paused);
    onPause();
  };
  const handleStopBtn = () => {
    setState(StopwatchType.status.Finished);
    onStop();
  };
  const handleCancelBtn = () => {
    setState(StopwatchType.status.Canceled);
    setTime(0);
    onCancel();
  };

  return (
    <Card style={[styles.container, borderStyle, style]}>
      <View style={styles.row}>
        <Text style={styles.status}>
          {StopwatchType.getStatus(state, I18n)}
        </Text>
        <Icon name="stopwatch" size={18} style={styles.icon} />
      </View>
      <View style={styles.row}>
        <View style={styles.btnContainer}>
          {state !== StopwatchType.status.InProgress && (
            <Icon
              name="play"
              size={25}
              disabled={
                disable ||
                disablePlay ||
                state === StopwatchType.status.InProgress ||
                state === StopwatchType.status.Finished
              }
              touchable={true}
              onPress={handlePlayBtn}
              style={styles.btn}
            />
          )}
          {state === StopwatchType.status.InProgress && (
            <Icon
              name="pause"
              size={25}
              disabled={disable || disablePause}
              touchable={true}
              onPress={handlePauseBtn}
              style={styles.btn}
            />
          )}
          <Icon
            name="power-off"
            size={25}
            disabled={
              disable ||
              disableStop ||
              state === StopwatchType.status.Ready ||
              state === StopwatchType.status.Finished
            }
            touchable={true}
            onPress={handleStopBtn}
            style={styles.btn}
          />
          {!hideCancel && (
            <Icon
              name="undo"
              size={25}
              disabled={
                disable || disableCancel || state === StopwatchType.status.Ready
              }
              touchable={true}
              onPress={handleCancelBtn}
              style={styles.btn}
            />
          )}
        </View>
        <Timer
          time={time}
          onCount={setTime}
          style={styles.timer}
          isPaused={state !== StopwatchType.status.InProgress}
          timerFormat={timerFormat}
        />
      </View>
    </Card>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  btn: {
    marginRight: 20,
  },
  btnContainer: {
    width: '60%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    alignSelf: 'center',
    width: '95%',
    marginHorizontal: 12,
    marginVertical: '30%',
  },
  icon: {
    width: '50%',
    justifyContent: 'flex-end',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
  },
  status: {
    width: '50%',
    fontSize: 14,
    justifyContent: 'flex-start',
  },
  timer: {
    justifyContent: 'flex-end',
  },
});

export default Stopwatch;
