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

export interface Module {
  name: string;
  title: string;
  subtitle: string;
  icon: string;
  disabled?: boolean;
  menus: {
    [screenKey: string]: {
      title: string;
      icon: string;
      screen: string;
      disabled?: boolean;
    };
  };
  screens: {
    [screenKey: string]:
      | React.FC<any>
      | {
          component: React.FC<any>;
          title: string;
        };
  };
  translations?: {
    [languageKey: string]: any;
  };
  reducers?: any;
}
