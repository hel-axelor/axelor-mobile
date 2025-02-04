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

import {axiosApiProvider} from '../axios/AxiosApi';
import {getMobileConfigs} from './mobile-config-api';

const MobileMenuFields = ['name', 'technicalName', 'authorizedRoles'];

const createCriteria = listMenus => {
  if (listMenus != null) {
    let criterias = [];
    listMenus.forEach(item => {
      criterias.push({fieldName: 'id', operator: '=', value: item.id});
    });
    return criterias;
  }
};

async function searchMenu({listMenus}) {
  if (listMenus == null || listMenus?.length === 0) {
    return [];
  } else {
    return axiosApiProvider
      .post({
        url: '/ws/rest/com.axelor.apps.mobilesettings.db.MobileMenu/search',
        data: {
          data: {
            criteria: [
              {
                operator: 'or',
                criteria: createCriteria(listMenus),
              },
            ],
          },
          fields: MobileMenuFields,
          limit: null,
          offset: 0,
        },
      })
      .then(res => res?.data?.data);
  }
}

export async function getModulesConfig() {
  const modulesConfig = await getMobileConfigs().then(res => res?.data?.data);
  let results = [];

  for (let index = 0; index < modulesConfig.length; index++) {
    const element = modulesConfig[index];
    if (element.customizeMenu) {
      const menuConfig = await searchMenu({listMenus: element.menus});
      results.push(menuConfig);
    }
  }

  const restrictedMenus = results.flat();
  return {data: {data: restrictedMenus}};
}
