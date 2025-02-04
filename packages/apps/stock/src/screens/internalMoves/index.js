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

import InternalMoveDetailsGeneralScreen from './InternalMoveDetailsGeneralScreen';
import InternalMoveLineDetailsScreen from './InternalMoveLineDetailsScreen';
import InternalMoveLineListScreen from './InternalMoveLineListScreen';
import InternalMoveListScreen from './InternalMoveListScreen';
import InternalMoveSelectFromLocationScreen from './InternalMoveSelectFromLocationScreen';
import InternalMoveSelectProductScreen from './InternalMoveSelectProductScreen';
import InternalMoveSelectToLocationScreen from './InternalMoveSelectToLocationScreen';
import InternalMoveSelectTrackingScreen from './InternalMoveSelectTrackingScreen';

export default {
  InternalMoveListScreen: {
    title: 'Stock_InternalMove',
    component: InternalMoveListScreen,
    options: {
      shadedHeader: false,
    },
  },
  InternalMoveDetailsGeneralScreen: {
    title: 'Stock_InternalMove',
    component: InternalMoveDetailsGeneralScreen,
    options: {
      shadedHeader: false,
    },
  },
  InternalMoveLineDetailsScreen: {
    title: 'Stock_InternalMove',
    component: InternalMoveLineDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  InternalMoveLineListScreen: {
    title: 'Stock_InternalMove',
    component: InternalMoveLineListScreen,
    options: {
      shadedHeader: false,
    },
  },
  InternalMoveSelectFromLocationScreen: {
    title: 'Stock_InternalMove',
    component: InternalMoveSelectFromLocationScreen,
  },
  InternalMoveSelectProductScreen: {
    title: 'Stock_InternalMove',
    component: InternalMoveSelectProductScreen,
    options: {
      shadedHeader: false,
    },
  },
  InternalMoveSelectToLocationScreen: {
    title: 'Stock_InternalMove',
    component: InternalMoveSelectToLocationScreen,
  },
  InternalMoveSelectTrackingScreen: {
    title: 'Stock_InternalMove',
    component: InternalMoveSelectTrackingScreen,
    options: {
      shadedHeader: false,
    },
  },
};
