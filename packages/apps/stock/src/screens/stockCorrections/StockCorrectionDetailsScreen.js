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

import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {
  Badge,
  Button,
  HeaderContainer,
  Picker,
  PopUpOneButton,
  Screen,
  ScrollView,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  getFromList,
  useDispatch,
  useSelector,
  useTranslator,
  HeaderOptionsMenu,
} from '@axelor/aos-mobile-core';
import {QuantityCard, ProductCardInfo} from '../../components';
import {fetchStockCorrectionReasons} from '../../features/stockCorrectionReasonSlice';
import {fetchProductWithId} from '../../features/productSlice';
import {
  createCorrection,
  updateCorrection,
} from '../../features/stockCorrectionSlice';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import StockCorrection from '../../types/stock-corrrection';

const StockCorrectionDetailsScreen = ({navigation, route}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {stockCorrectionReasonList} = useSelector(
    state => state.stockCorrectionReason,
  );
  const {loadingProduct, productFromId} = useSelector(state => state.product);
  const {activeCompany} = useSelector(state => state.user.user);
  const {productIndicators} = useSelector(state => state.productIndicators);
  const {mobileSettings} = useSelector(state => state.config);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStockCorrectionReasons());
    if (route.params.stockCorrection != null) {
      dispatch(fetchProductWithId(route.params.stockCorrection.product.id));
    }

    dispatch(
      fetchProductIndicators({
        version:
          route.params.stockCorrection != null
            ? route.params.stockCorrection.product.$version
            : route.params.stockProduct.version,
        productId:
          route.params.stockCorrection != null
            ? route.params.stockCorrection.product.id
            : route.params.stockProduct.id,
        companyId: activeCompany?.id,
        stockLocationId:
          route.params.stockCorrection != null
            ? route.params.stockCorrection.stockLocation.id
            : route.params.stockLocation.id,
      }),
    );
  }, [dispatch, activeCompany?.id, route.params]);

  const [loading, setLoading] = useState(true); // Indicator for initialisation of variables
  const [saveStatus, setSaveStatus] = useState(); // Inidicator for changes

  const [status, setStatus] = useState();
  const [stockLocation, setStockLocation] = useState();
  const [stockProduct, setStockProduct] = useState();
  const [trackingNumber, setTrackingNumber] = useState();
  const [databaseQty, setDatabaseQty] = useState();
  const [realQty, setRealQty] = useState();
  const [reason, setReason] = useState();

  const initVariables = useCallback(() => {
    if (route.params.stockCorrection == null) {
      setStatus(StockCorrection.status.Draft);
      setStockLocation(route.params.stockLocation);
      setStockProduct(route.params.stockProduct);
      setTrackingNumber(
        route.params.trackingNumber == null
          ? null
          : route.params.trackingNumber,
      );
      if (productIndicators.id !== route.params.stockProduct.id) {
        setLoading(true);
        return;
      } else {
        setDatabaseQty(productIndicators?.realQty);
        setRealQty(productIndicators?.realQty);
      }
      setReason({name: '', id: null});

      setSaveStatus(false);
    } else {
      const stockCorrection = route.params.stockCorrection;
      setStatus(stockCorrection.statusSelect);
      setStockLocation(stockCorrection.stockLocation);
      setStockProduct(productFromId);
      setTrackingNumber(stockCorrection.trackingNumber);

      if (stockCorrection.statusSelect === StockCorrection.status.Validated) {
        setDatabaseQty(stockCorrection.baseQty);
      } else {
        setDatabaseQty(productIndicators?.realQty);
      }

      setRealQty(stockCorrection.realQty);
      setReason(stockCorrection.stockCorrectionReason);

      setSaveStatus(true);
    }
    setLoading(false);
  }, [productFromId, productIndicators, route.params]);

  useEffect(() => {
    initVariables();
  }, [initVariables]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: stockProduct,
    });
  };

  const handleQtyChange = value => {
    setRealQty(value);
    setSaveStatus(false);
  };

  const handleReasonChange = reasonId => {
    if (reasonId === null) {
      setReason({name: '', id: null});
    } else {
      setReason(getFromList(stockCorrectionReasonList, 'id', reasonId));
    }
    setSaveStatus(false);
  };

  const handleSave = () => {
    if (reason.id === null) {
      // Required field
      setPopUp(true);
      return;
    }

    // Request AOS API
    if (route.params.stockCorrection == null) {
      // Stock correction doesn't exsist yet : creation
      if (
        stockProduct?.trackingNumberConfiguration == null ||
        trackingNumber == null
      ) {
        dispatch(
          createCorrection({
            productId: stockProduct.id,
            stockLocationId: stockLocation.id,
            reasonId: reason.id,
            status: StockCorrection.status.Draft,
            realQty: realQty,
          }),
        );
      } else {
        dispatch(
          createCorrection({
            productId: stockProduct.id,
            stockLocationId: stockLocation.id,
            reasonId: reason.id,
            trackingNumberId: trackingNumber.id,
            status: StockCorrection.status.Draft,
            realQty: realQty,
          }),
        );
      }
    } else {
      // Stock correction already exists : update qty or reason
      dispatch(
        updateCorrection({
          version: route.params.stockCorrection.version,
          stockCorrectionId: route.params.stockCorrection.id,
          realQty: realQty,
          reasonId: reason.id,
        }),
      );
    }
    handleNavigation();
  };

  const handleValidate = () => {
    if (reason.id === null) {
      // Required field
      setPopUp(true);
      return;
    }

    // Request AOS API
    if (route.params.stockCorrection == null) {
      // Stock correction doesn't exsist yet : creation
      if (
        stockProduct?.trackingNumberConfiguration == null ||
        trackingNumber == null
      ) {
        dispatch(
          createCorrection({
            productId: stockProduct.id,
            stockLocationId: stockLocation.id,
            reasonId: reason.id,
            status: StockCorrection.status.Validated,
            realQty: realQty,
          }),
        );
      } else {
        dispatch(
          createCorrection({
            productId: stockProduct.id,
            stockLocationId: stockLocation.id,
            reasonId: reason.id,
            trackingNumberId: trackingNumber.id,
            status: StockCorrection.status.Validated,
            realQty: realQty,
          }),
        );
      }
    } else {
      // Stock correction already exists : update qty or reason
      dispatch(
        updateCorrection({
          version: route.params.stockCorrection.version,
          stockCorrectionId: route.params.stockCorrection.id,
          realQty: saveStatus ? null : realQty,
          reasonId: saveStatus ? null : reason.id,
          status: StockCorrection.status.Validated,
        }),
      );
    }
    handleNavigation();
  };

  const handleNavigation = () => {
    if (route.params.externeNavigation === true) {
      navigation.pop();
    } else {
      navigation.popToTop();
    }
  };

  const [popUp, setPopUp] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.stock.db.StockCorrection"
          modelId={route.params.stockCorrection?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnStockApp}
        />
      ),
    });
  }, [I18n, mobileSettings, navigation, route.params.stockCorrection]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <>
          {saveStatus ? null : (
            <Button
              title={I18n.t('Base_Save')}
              color={Colors.secondaryColor}
              onPress={handleSave}
            />
          )}
          {status === StockCorrection.status.Validated ? null : (
            <Button title={I18n.t('Base_Validate')} onPress={handleValidate} />
          )}
        </>
      }
      loading={loadingProduct}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={styles.text_important}>{stockLocation?.name}</Text>
            </View>
            {status && (
              <Badge
                color={StockCorrection.getStatusColor(status, Colors)}
                title={StockCorrection.getStatus(status, I18n)}
              />
            )}
          </View>
        }
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <PopUpOneButton
            visible={popUp}
            title={I18n.t('Auth_Warning')}
            data={I18n.t('Stock_ReasonRequired')}
            btnTitle={I18n.t('Auth_Close')}
            onPress={() => setPopUp(!popUp)}
          />
          <View>
            <ProductCardInfo
              name={stockProduct?.name}
              code={stockProduct?.code}
              picture={stockProduct?.picture}
              trackingNumber={
                stockProduct?.trackingNumberConfiguration == null ||
                trackingNumber == null
                  ? null
                  : trackingNumber.trackingNumberSeq
              }
              locker={null}
              onPress={handleShowProduct}
            />
          </View>
          <QuantityCard
            labelQty={I18n.t('Stock_RealQty')}
            defaultValue={parseFloat(realQty).toFixed(2)}
            onValueChange={handleQtyChange}
            editable={status === StockCorrection.status.Draft}>
            <Text style={styles.text}>
              {`${I18n.t('Stock_DatabaseQty')}: ${parseFloat(
                databaseQty,
              ).toFixed(2)} ${stockProduct?.unit?.name}`}
            </Text>
          </QuantityCard>
          <Picker
            styleTxt={reason?.id === null ? styles.picker_empty : null}
            title={I18n.t('Stock_Reason')}
            onValueChange={handleReasonChange}
            defaultValue={reason?.id}
            listItems={stockCorrectionReasonList}
            labelField="name"
            valueField="id"
            disabled={status === StockCorrection.status.Validated}
            disabledValue={reason?.name}
          />
        </ScrollView>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text_important: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker_empty: {
    color: 'red',
  },
  text: {
    fontSize: 16,
  },
});

export default StockCorrectionDetailsScreen;
