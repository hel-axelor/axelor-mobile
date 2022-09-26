import {getApiResponseData, getFirstData} from '@/api/utils';
import {axiosApiProvider} from '@aos-mobile/core';

const MobileMenuFields = ['name', 'enabled'];

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
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.mobile.db.MobileMenu/search',
    data:
      listMenus == null
        ? {
            fields: MobileMenuFields,
            limit: null,
            offset: 0,
          }
        : {
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
  });
}

export async function getMenuConfig({AppSequence}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.mobile.db.MobileConfig/search',
    data: {
      data: {
        criteria: [
          {
            fieldName: 'sequence',
            operator: '=',
            value: AppSequence,
          },
        ],
      },
      fields: ['menus', 'sequence'],
    },
  });
}

export async function getStockMenuConfig() {
  return getMenuConfig({AppSequence: 1})
    .then(getApiResponseData)
    .then(getFirstData)
    .then(data => searchMenu({listMenus: data.menus}));
}
