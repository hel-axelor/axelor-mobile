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

import {stringNoAccent} from './string';

export function areObjectsEquals(object1, object2) {
  if (typeof object1 !== typeof object2 || object1 == null || object2 == null) {
    return false;
  } else {
    if (typeof object1 === 'string') {
      return stringNoAccent(object1)
        .toLowerCase()
        .includes(stringNoAccent(object2).toLowerCase());
    } else {
      return object1 === object2;
    }
  }
}

export const isEmpty = obj =>
  Object.keys(obj).length === 0 &&
  Object.getPrototypeOf(obj) === Object.prototype;
