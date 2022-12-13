import {axiosApiProvider} from '@aos-mobile/core';

const crmLeadsFields = [
  'enterpriseName',
  'fullName',
  'fixedPhone',
  'firstName',
  'leadStatus',
  'mobilePhone',
  'fixedPhone',
  'primaryPostalCode',
  'emailAddress',
  'primaryAddress',
  'leadScoring',
  'simpleFullName',
  'user',
];

const sortByFields = ['leadStatus', 'enterpriseName', 'createdOn'];

const createLeadCriteria = searchValue => {
  let criterias = [];

  if (searchValue != null) {
    criterias.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'simpleFullName',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'enterpriseName',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'primaryAddress',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'mobilePhone',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'fixedPhone',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'emailAddress.name',
          operator: 'like',
          value: searchValue,
        },
      ],
    });
  }
  return criterias;
};

export async function searchCrmLeads({searchValue, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Lead/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createLeadCriteria(searchValue),
          },
        ],
      },
      fields: crmLeadsFields,
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function getLeadStatus() {
  return axiosApiProvider.get({
    url: '/ws/rest/com.axelor.apps.crm.db.LeadStatus',
  });
}
