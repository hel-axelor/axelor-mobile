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

import OperationOrderDetailsScreen from './OperationOrderDetailsScreen';
import OperationOrderListScreen from './OperationOrderListScreen';
import OperationOrderPlanningScreen from './OperationOrderPlanningScreen';
import ProductionFileScreen from './ProductionFileScreen';

export default {
  OperationOrderListScreen: {
    title: 'Manufacturing_OperationOrder',
    component: OperationOrderListScreen,
    options: {
      shadedHeader: false,
    },
  },
  OperationOrderDetailsScreen: {
    title: 'Manufacturing_OperationOrder',
    component: OperationOrderDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProductionFileScreen: {
    title: 'Manufacturing_ProductionFile',
    component: ProductionFileScreen,
    options: {
      shadedHeader: false,
    },
  },
  OperationOrderPlanningScreen: {
    title: 'Manufacturing_OperationOrder',
    component: OperationOrderPlanningScreen,
    options: {
      shadedHeader: false,
    },
  },
};
