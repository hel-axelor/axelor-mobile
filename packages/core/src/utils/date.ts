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

import moment from 'moment';

export const isDate = (date: string): boolean => {
  return moment(date, moment.ISO_8601, true).isValid();
};

export const isDateTime = (date: string): boolean => {
  return isDate(date) && date?.length > 10;
};

export const getNextMonth = (date: Date): Date => {
  if (date.getMonth() === 11) {
    return new Date(date.getFullYear() + 1, 0, 1);
  } else {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }
};

export const getPreviousMonth = (date: Date): Date => {
  if (date.getMonth() === 0) {
    return new Date(date.getFullYear() - 1, 11, 1);
  } else {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }
};
