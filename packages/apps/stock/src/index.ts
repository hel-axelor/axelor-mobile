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

import {Module} from '@axelor/aos-mobile-core';
import CustomerDeliveryScreens from './screens/customerDeliveries';
import InternalMovesScreens from './screens/internalMoves';
import InventoriesScreens from './screens/inventories';
import ProductsScreens from './screens/products';
import StockCorrectionScreens from './screens/stockCorrections';
import SupplierArrivalsScreens from './screens/supplierArrivals';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import * as stockReducers from './features';
import UserScreen from './screens/auth/UserScreen';

export const StockModule: Module = {
  name: 'app-stock',
  title: 'Stock',
  subtitle: 'Stock',
  icon: 'cubes',
  menus: {
    stock_menu_product: {
      title: 'Stock_Product',
      icon: 'shopping-cart',
      screen: 'ProductListScreen',
    },
    stock_menu_stock_correction: {
      title: 'Stock_StockCorrection',
      icon: 'box',
      screen: 'StockCorrectionListScreen',
    },
    stock_menu_internal_move: {
      title: 'Stock_InternalMove',
      icon: 'dolly',
      screen: 'InternalMoveListScreen',
    },
    stock_menu_customer_delivery: {
      title: 'Stock_CustomerDelivery',
      icon: 'truck',
      screen: 'CustomerDeliveryListScreen',
    },
    stock_menu_supplier_arrival: {
      title: 'Stock_SupplierArrival',
      icon: 'truck-loading',
      screen: 'SupplierArrivalListScreen',
    },
    stock_menu_inventory: {
      title: 'Stock_Inventory',
      icon: 'warehouse',
      screen: 'InventoryListScreen',
    },
  },
  screens: {
    ...CustomerDeliveryScreens,
    ...InternalMovesScreens,
    ...InventoriesScreens,
    ...ProductsScreens,
    ...StockCorrectionScreens,
    ...SupplierArrivalsScreens,
    UserScreen: {
      component: UserScreen,
      title: 'User_UserProfile',
    },
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  reducers: {
    ...stockReducers,
  },
};

export * from './components';

export {
  displayInventorySeq,
  displayItemTrackingNumber,
  displayPartner,
  displayStockMoveSeq,
} from './utils/displayers';
export {
  filterInventoryByRef,
  filterItemByStockMoveSeq,
  filterPartner,
  filterProduct,
  filterStockLocation,
  filterTrackingNumber,
} from './utils/filters';

export * from './types';
export * from './api';
export * from './features/asyncFunctions-index';

export * from './screens/customerDeliveries';
export * from './screens/internalMoves';
export * from './screens/inventories';
export * from './screens/products';
export * from './screens/stockCorrections';
export * from './screens/supplierArrivals';
