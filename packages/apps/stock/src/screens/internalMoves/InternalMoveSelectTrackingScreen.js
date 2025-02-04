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

import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Card,
  ClearableCard,
  HeaderContainer,
  PopUpOneButton,
  Screen,
  Text,
} from '@axelor/aos-mobile-ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {StockMoveHeader} from '../../components';
import {filterTrackingNumber} from '../../features/trackingNumberSlice';
import {displayItemTrackingNumber} from '../../utils/displayers';
import StockMove from '../../types/stock-move';

const trackingNumberScanKey = 'tracking-number_internal-move-new';

const InternalMoveSelectTrackingScreen = ({navigation, route}) => {
  const internalMove = route.params.internalMove;
  const internalMoveLine = route.params.internalMoveLine;
  const product = route.params.stockProduct;
  const {trackingNumberList} = useSelector(state => state.trackingNumber);
  const [isVisible, setVisible] = useState(false);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const fetchTrackingAPI = useCallback(
    filter => {
      dispatch(
        filterTrackingNumber({productId: product.id, searchValue: filter}),
      );
    },
    [dispatch, product.id],
  );

  const handleClearOriginalLocation = () => {
    navigation.navigate('InternalMoveSelectFromLocationScreen');
  };

  const handleClearDestinationLocation = () => {
    navigation.navigate('InternalMoveSelectToLocationScreen', {
      fromStockLocation: route.params.fromStockLocation,
    });
  };

  const handleClearProduct = () => {
    navigation.navigate('InternalMoveSelectProductScreen', {
      fromStockLocation: route.params.fromStockLocation,
      toStockLocation: route.params.toStockLocation,
    });
  };

  const handleTrackingNumberSelection = useCallback(
    trackingNumber => {
      if (trackingNumber != null) {
        if (internalMove == null) {
          navigation.navigate('InternalMoveLineDetailsScreen', {
            fromStockLocation: route.params.fromStockLocation,
            toStockLocation: route.params.toStockLocation,
            stockProduct: route.params.stockProduct,
            trackingNumber: trackingNumber,
          });
        } else {
          if (trackingNumber?.id !== internalMoveLine.trackingNumber?.id) {
            setVisible(true);
          } else {
            navigation.navigate('InternalMoveLineDetailsScreen', {
              internalMove: internalMove,
              internalMoveLine: internalMoveLine,
            });
          }
        }
      }
    },
    [internalMove, internalMoveLine, navigation, route.params],
  );

  return (
    <Screen removeSpaceOnTop={internalMove != null ? true : false}>
      {internalMove != null ? (
        <View>
          <HeaderContainer
            expandableFilter={false}
            fixedItems={
              <StockMoveHeader
                reference={internalMove.stockMoveSeq}
                status={internalMove.statusSelect}
                date={
                  internalMove.statusSelect === StockMove.status.Draft
                    ? internalMove.createdOn
                    : internalMove.statusSelect === StockMove.status.Planned
                    ? internalMove.estimatedDate
                    : internalMove.realDate
                }
                availability={internalMove.availableStatusSelect}
              />
            }
          />
          <Card style={styles.cardProductInfo}>
            <Text>{internalMoveLine.product?.fullName}</Text>
          </Card>
        </View>
      ) : (
        <View>
          <ClearableCard
            valueTxt={route.params.fromStockLocation.name}
            onClearPress={handleClearOriginalLocation}
          />
          <ClearableCard
            valueTxt={route.params.toStockLocation.name}
            onClearPress={handleClearDestinationLocation}
          />
          <ClearableCard
            valueTxt={route.params.stockProduct.name}
            onClearPress={handleClearProduct}
          />
        </View>
      )}
      <ScannerAutocompleteSearch
        objectList={trackingNumberList}
        onChangeValue={item => handleTrackingNumberSelection(item)}
        fetchData={fetchTrackingAPI}
        displayValue={displayItemTrackingNumber}
        scanKeySearch={trackingNumberScanKey}
        placeholder={I18n.t('Stock_TrackingNumber')}
        isFocus={true}
        changeScreenAfter={true}
      />
      <PopUpOneButton
        visible={isVisible}
        title={I18n.t('Auth_Warning')}
        data={I18n.t('Stock_ErrorTrackingNumber')}
        btnTitle={I18n.t('Auth_Close')}
        onPress={() => setVisible(false)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  cardProductInfo: {
    marginVertical: '2%',
    marginHorizontal: 16,
  },
});

export default InternalMoveSelectTrackingScreen;
