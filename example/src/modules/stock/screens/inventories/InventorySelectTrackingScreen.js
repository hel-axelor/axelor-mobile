import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Card,
  HeaderContainer,
  PopUpOneButton,
  Screen,
  Text,
} from '@aos-mobile/ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@aos-mobile/core';
import Inventory from '@/modules/stock/types/inventory';
import {displayItemTrackingNumber} from '@/modules/stock/utils/displayers';
import {filterTrackingNumber} from '../../features/trackingNumberSlice';
import {InventoryHeader} from '../../components/organisms';

const trackingScanKey = 'tracking_inventory-select';

const InventorySelectTrackingScreen = ({route, navigation}) => {
  const inventory = route.params.inventory;
  const inventoryLine = route.params.inventoryLine;
  const product = route.params.product;
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

  const handleTrackingNumberSelection = useCallback(
    item => {
      if (item !== null) {
        if (inventoryLine != null) {
          if (item.id !== inventoryLine.trackingNumber?.id) {
            setVisible(true);
          } else {
            navigation.navigate('InventoryLineDetailsScreen', {
              inventoryLine: inventoryLine,
              inventory: inventory,
              product: product,
              trackingNumber: item,
            });
          }
        } else {
          navigation.navigate('InventoryLineDetailsScreen', {
            inventoryLine: inventoryLine,
            inventory: inventory,
            product: product,
            trackingNumber: item,
          });
        }
      }
    },
    [inventory, inventoryLine, navigation, product],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <InventoryHeader
            reference={inventory.inventorySeq}
            status={inventory.statusSelect}
            date={
              inventory.statusSelect === Inventory.status.Planned
                ? inventory.plannedStartDateT
                : inventory.plannedEndDateT
            }
            stockLocation={inventory.stockLocation?.name}
          />
        }
      />
      <Card style={styles.cardProductInfo}>
        <Text>{inventoryLine.product?.fullName}</Text>
      </Card>
      <ScannerAutocompleteSearch
        objectList={trackingNumberList}
        onChangeValue={item => handleTrackingNumberSelection(item)}
        fetchData={fetchTrackingAPI}
        displayValue={displayItemTrackingNumber}
        scanKeySearch={trackingScanKey}
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

export default InventorySelectTrackingScreen;
