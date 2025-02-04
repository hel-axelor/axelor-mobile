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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Card,
  LabelText,
  Screen,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {PlanningView, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchPlannedOperationOrder} from '../../features/operationOrderSlice';
import OperationOrder from '../../types/operation-order';

function OperationOrderPlanningScreen() {
  const {plannedOperationOrderList, loading} = useSelector(
    state => state.operationOrder,
  );
  const dispatch = useDispatch();
  const Colors = useThemeColor();

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  const listItem = useMemo(() => {
    if (
      plannedOperationOrderList !== undefined &&
      plannedOperationOrderList.length > 1
    ) {
      return plannedOperationOrderList.map(elt => {
        const borderColor = OperationOrder.getStatusColor(
          elt.statusSelect,
          Colors,
        );
        const startDate = new Date(elt.plannedStartDateT);
        const endDate = new Date(elt.plannedEndDateT);
        return {
          id: elt.id,
          date: elt.plannedStartDateT,
          name: elt.operationName,
          ref: elt.manufOrder.manufOrderSeq,
          workCenter: elt.workCenter.name,
          startHour:
            startDate.getHours() +
            'h' +
            (startDate.getMinutes() < 10 ? '0' : '') +
            startDate.getMinutes(),
          endHour:
            endDate.getHours() +
            'h' +
            (endDate.getMinutes() < 10 ? '0' : '') +
            +endDate.getMinutes(),
          border: borderColor.background,
        };
      });
    }
  }, [Colors, plannedOperationOrderList]);

  const fetchItemsByMonth = useCallback(
    date => {
      dispatch(fetchPlannedOperationOrder(date));
    },
    [dispatch],
  );

  const rendBorderColor = borderColor => {
    return {
      borderLeftWidth: 7,
      borderLeftColor: borderColor,
    };
  };

  const renderDayItem = (agendaItem, isFirst) => {
    if (agendaItem) {
      return (
        <View
          style={
            isFirst ? styles.firstItemContainer : styles.containerListItem
          }>
          {isFirst ? <View style={styles.borderTop} /> : null}
          <View style={styles.containerTime}>
            <Text>{agendaItem.startHour}</Text>
            <Text>{agendaItem.endHour}</Text>
          </View>
          <Card style={[styles.container, rendBorderColor(agendaItem.border)]}>
            <Text style={styles.bold}>{agendaItem.ref}</Text>
            <Text>{agendaItem.name}</Text>
            <LabelText iconName="pallet" title={agendaItem.workCenter} />
          </Card>
          <View style={styles.borderBottom} />
        </View>
      );
    }
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <PlanningView
        itemList={listItem}
        renderItem={renderDayItem}
        fetchbyMonth={fetchItemsByMonth}
        loading={loading}
      />
    </Screen>
  );
}

const getStyles = Colors =>
  StyleSheet.create({
    containerListItem: {
      flexDirection: 'row',
      marginVertical: '3%',
    },
    firstItemContainer: {
      flexDirection: 'row',
      marginTop: '5%',
      marginBottom: '3%',
    },
    containerTime: {
      flexDirection: 'column',
    },
    container: {
      alignSelf: 'center',
      width: '80%',
      marginHorizontal: 12,
    },
    bold: {
      fontWeight: 'bold',
    },
    borderBottom: {
      position: 'absolute',
      width: '80%',
      borderBottomWidth: 1.5,
      borderBottomColor: Colors.secondaryColor.background,
      bottom: -10,
      right: '10%',
    },
    borderTop: {
      position: 'absolute',
      width: '80%',
      borderTopWidth: 1.5,
      borderTopColor: Colors.secondaryColor.background,
      top: -10,
      right: '10%',
    },
  });

export default OperationOrderPlanningScreen;
