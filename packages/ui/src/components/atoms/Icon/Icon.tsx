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

import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import {useThemeColor} from '../../../theme/ThemeContext';

interface IconProps {
  style?: any;
  name: string;
  FontAwesome5?: boolean;
  color?: string;
  size?: number;
  touchable?: boolean;
  visible?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}

const Icon = ({
  style,
  name,
  FontAwesome5 = true,
  color,
  size = 18,
  touchable = false,
  visible = true,
  onPress = () => {},
  disabled = false,
}: IconProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => {
    return getStyles(
      Colors,
      color == null ? Colors.secondaryColor_dark.background : color,
      touchable ? disabled : false,
      size,
    );
  }, [Colors, color, disabled, size, touchable]);

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} disabled={!touchable || disabled}>
        {FontAwesome5 ? (
          <Icon5 name={name} style={styles.icon} />
        ) : (
          <Icon4 name={name} style={styles.icon} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (Colors, color, disabled, size) =>
  StyleSheet.create({
    icon: {
      color: disabled ? Colors.secondaryColor.background_light : color,
      fontSize: size,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Icon;
