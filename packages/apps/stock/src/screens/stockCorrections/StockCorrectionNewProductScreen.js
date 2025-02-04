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

import React, {useCallback} from 'react';
import {ClearableCard, Screen} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchProducts} from '../../features/productSlice';

const productScanKey = 'product_stock-correction-new';

const StockCorrectionNewProductScreen = ({navigation, route}) => {
  const {productList} = useSelector(state => state.product);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const fetchProductsAPI = useCallback(
    filter => {
      dispatch(searchProducts({searchValue: filter}));
    },
    [dispatch],
  );

  const handleNavigate = useCallback(
    product => {
      if (product != null) {
        if (product.trackingNumberConfiguration == null) {
          navigation.navigate('StockCorrectionDetailsScreen', {
            stockLocation: route.params.stockLocation,
            stockProduct: product,
          });
        } else {
          navigation.navigate('StockCorrectionNewTrackingScreen', {
            stockLocation: route.params.stockLocation,
            product: product,
          });
        }
      }
    },
    [navigation, route.params.stockLocation],
  );

  const handleClearLocation = () => {
    navigation.navigate('StockCorrectionNewLocationScreen');
  };

  return (
    <Screen>
      <ClearableCard
        valueTxt={route.params.stockLocation.name}
        onClearPress={handleClearLocation}
      />
      <ScannerAutocompleteSearch
        objectList={productList}
        onChangeValue={item => handleNavigate(item)}
        fetchData={fetchProductsAPI}
        displayValue={displayItemName}
        scanKeySearch={productScanKey}
        placeholder={I18n.t('Stock_Product')}
        isFocus={true}
        changeScreenAfter={true}
      />
    </Screen>
  );
};

export default StockCorrectionNewProductScreen;
