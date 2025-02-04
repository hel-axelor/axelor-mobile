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
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Badge, Icon, useThemeColor} from '@axelor/aos-mobile-ui';

interface HeaderOptionMenuItemProps {
  icon: string;
  FontAwesome5?: boolean;
  indicator?: number;
  hideIf: boolean;
  onPress: () => void;
}

const HeaderOptionMenuItem = ({
  icon,
  indicator = 0,
  FontAwesome5 = true,
  hideIf = false,
  onPress,
}: HeaderOptionMenuItemProps) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(16), []);

  if (hideIf) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <Icon name={icon} FontAwesome5={FontAwesome5} size={22} />
      {indicator > 0 && (
        <Badge
          style={styles.badge}
          txtStyle={styles.badgeText}
          color={{
            background_light: Colors.backgroundColor,
            foreground: Colors.text,
            background: Colors.primaryColor.background,
          }}
          title={indicator}
        />
      )}
    </TouchableOpacity>
  );
};

const getStyles = badgeSize =>
  StyleSheet.create({
    badge: {
      width: badgeSize,
      height: badgeSize,
      borderRadius: Math.ceil(badgeSize / 2),
      position: 'absolute',
      top: -4,
      right: -8,
      zIndex: 10,
    },
    badgeText: {
      fontSize: Math.ceil(badgeSize / 2),
    },
    container: {
      marginRight: 5,
      marginLeft: 15,
      flexDirection: 'row',
    },
  });

export default HeaderOptionMenuItem;
