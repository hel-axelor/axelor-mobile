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

import React, {
  useRef,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import {StyleSheet, View, Animated, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {ModuleNavigatorContext} from '../Navigator';
import MenuIconButton from './MenuIconButton';
import Menu from './Menu';
import {moduleHasMenus, numberOfModules} from '../module.helper';
import {getMenuTitle} from '../menu.helper';
import useTranslator from '../../i18n/hooks/use-translator';
import {authModule} from '../../auth';
import {CommonActions, DrawerActions} from '@react-navigation/native';
import AuthMenuIconButton from './AuthMenuIconButton';

const DrawerContent = ({
  state,
  modules,
  navigation,
  onModuleClick,
  showModulesSubtitle = false,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const styles = useMemo(() => getStyles(Colors), [Colors]);
  const secondaryMenusLeft = useRef(new Animated.Value(0)).current;
  const {activeModule} = useContext(ModuleNavigatorContext);

  const innerMenuIsVisible = useMemo(
    () => activeModule !== authModule,
    [activeModule],
  );

  const drawerModules = useMemo(
    () =>
      modules.filter(moduleHasMenus).filter(_module => _module !== authModule),
    [modules],
  );

  const externalMenuIsVisible = useMemo(
    () => numberOfModules(drawerModules) > 1,
    [drawerModules],
  );

  useEffect(() => {
    if (innerMenuIsVisible) {
      openSecondaryMenu();
    } else {
      closeSecondaryMenu();
    }
  }, [closeSecondaryMenu, innerMenuIsVisible, openSecondaryMenu]);

  const openSecondaryMenu = useCallback(() => {
    Animated.timing(secondaryMenusLeft, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [secondaryMenusLeft]);

  const closeSecondaryMenu = useCallback(() => {
    Animated.timing(secondaryMenusLeft, {
      toValue: 100,
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [secondaryMenusLeft]);

  const innerMenuPosition = useMemo(
    () =>
      externalMenuIsVisible
        ? secondaryMenusLeft.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          })
        : 0,
    [externalMenuIsVisible, secondaryMenusLeft],
  );

  const handleAuthModuleClick = () => {
    onModuleClick(authModule.name);

    const route = state.routes.find(
      _route => (_route.name = Object.keys(authModule.menus)[0]),
    );

    const focused =
      state.routes.indexOf(route) === state.index &&
      Object.keys(activeModule.menus).includes(route.name);

    const event = navigation.emit({
      type: 'drawerItemPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.dispatch({
        ...(focused
          ? DrawerActions.closeDrawer()
          : CommonActions.navigate({name: route.name, merge: true})),
        target: state.key,
      });
    }
  };

  if (numberOfModules(drawerModules) === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.iconsContainer}>
          <View style={styles.otherIconsContainer}>
            <AuthMenuIconButton
              isActive={authModule === activeModule}
              showModulesSubtitle={showModulesSubtitle}
              onPress={handleAuthModuleClick}
            />
          </View>
        </View>
        <View style={styles.menusContainer}>
          <Text style={styles.primaryMenuTitle}>
            {I18n.t('Base_NoAppConfigured')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {externalMenuIsVisible && (
        <View style={styles.iconsContainer}>
          <View>
            {drawerModules.map(_module => (
              <View key={_module.name} style={styles.menuItemContainer}>
                <MenuIconButton
                  key={_module.title}
                  icon={_module.icon}
                  subtitle={showModulesSubtitle && I18n.t(_module.subtitle)}
                  disabled={_module.disabled}
                  color={
                    _module === activeModule
                      ? Colors.primaryColor.background_light
                      : null
                  }
                  onPress={() => onModuleClick(_module.name)}
                />
              </View>
            ))}
          </View>
          <View style={styles.otherIconsContainer}>
            <AuthMenuIconButton
              isActive={authModule === activeModule}
              showModulesSubtitle={showModulesSubtitle}
              onPress={handleAuthModuleClick}
            />
          </View>
        </View>
      )}
      <View style={styles.menusContainer}>
        <View>
          {drawerModules.map(_module => (
            <TouchableOpacity
              key={_module.name}
              style={styles.menuItemContainer}
              onPress={() => onModuleClick(_module.name)}>
              <Text
                style={styles.primaryMenuTitle}
                textColor={Colors.secondaryColor_dark.background}>
                {getMenuTitle(_module, {I18n})}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Animated.View
          style={[
            styles.secondaryMenusContainer,
            {
              left: innerMenuPosition,
            },
          ]}>
          <Menu
            activeModule={
              externalMenuIsVisible ? activeModule : drawerModules[0]
            }
            state={state}
            navigation={navigation}
            authMenu={
              !externalMenuIsVisible ? (
                <AuthMenuIconButton
                  isActive={authModule === activeModule}
                  showModulesSubtitle={showModulesSubtitle}
                  onPress={handleAuthModuleClick}
                />
              ) : null
            }
            onItemClick={
              externalMenuIsVisible
                ? () => {}
                : () => onModuleClick(drawerModules[0]?.name)
            }
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: Colors.screenBackgroundColor,
      overflow: 'hidden',
    },
    menusContainer: {
      flex: 1,
    },
    iconsContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 12,
    },
    otherIconsContainer: {
      marginVertical: 8,
    },
    menuItemContainer: {
      height: 60,
      marginVertical: 8,
      justifyContent: 'center',
    },
    primaryMenuTitle: {
      marginHorizontal: 6,
      fontSize: 24,
      fontWeight: 'bold',
    },
    secondaryMenusContainer: {
      position: 'absolute',
      backgroundColor: Colors.backgroundColor,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      elevation: 4,
    },
    subMenuContainer: {
      padding: 8,
    },
  });

export default DrawerContent;
