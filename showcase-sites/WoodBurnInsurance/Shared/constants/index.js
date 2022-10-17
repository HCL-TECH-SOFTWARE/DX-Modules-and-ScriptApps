/*
 * Shared Constants
 */

// const placeholder = 'https://via.placeholder.com/40';
// const gold1 = 'https://woodburninsurance.apps.hcl-dxdev.hcl-dx-dev.net:443/dx/api/dam/v1/collections/3dfa9b1d-a567-4da7-bfd1-83b8ad3235ef/items/88c52ea0-c333-4002-9f26-43ca4eae94ba/renditions/3da15f9a-3eb7-4e15-bf63-5ef8d94170ff?binary=true';
// const gold2 = 'https://woodburninsurance.apps.hcl-dxdev.hcl-dx-dev.net:443/dx/api/dam/v1/collections/3dfa9b1d-a567-4da7-bfd1-83b8ad3235ef/items/a54380de-72a1-44ba-abb3-aa2b33ed2f08/renditions/5a1bfdce-77ff-49e1-9170-7aa241b27fb5?binary=true';
// const life1 = 'https://woodburninsurance.apps.hcl-dxdev.hcl-dx-dev.net:443/dx/api/dam/v1/collections/3dfa9b1d-a567-4da7-bfd1-83b8ad3235ef/items/e83ca55d-ce51-4a33-a79b-a046539e7579/renditions/5f48ff71-cb18-4199-b0d7-71319e0e108d?binary=true';
// const travel1 = 'https://woodburninsurance.apps.hcl-dxdev.hcl-dx-dev.net:443/dx/api/dam/v1/collections/3dfa9b1d-a567-4da7-bfd1-83b8ad3235ef/items/d9ccf7c3-1a31-4e5c-8cc8-0f8dcd22ec4e/renditions/ec362c00-c593-4e7a-b47d-47a819918613?binary=true';
// const home1 = 'https://woodburninsurance.apps.hcl-dxdev.hcl-dx-dev.net:443/dx/api/dam/v1/collections/3dfa9b1d-a567-4da7-bfd1-83b8ad3235ef/items/50d0101c-a2fe-4a36-9cf3-8047262fdb20/renditions/972cf784-3394-42fa-8b3b-51df0ca5f120?binary=true';
// const auto1 = 'https://woodburninsurance.apps.hcl-dxdev.hcl-dx-dev.net:443/dx/api/dam/v1/collections/3dfa9b1d-a567-4da7-bfd1-83b8ad3235ef/items/774349f5-8ddd-421c-980c-09ad04105010/renditions/3489878f-98c6-451b-9c37-43e57a842fa4?binary=true';
// const silver1 = 'https://woodburninsurance.apps.hcl-dxdev.hcl-dx-dev.net:443/dx/api/dam/v1/collections/3dfa9b1d-a567-4da7-bfd1-83b8ad3235ef/items/f9ef47b2-950f-44a7-ba80-c388072a8614/renditions/ad3395ae-a11d-4d6d-87e5-78d5b08ae658?binary=true';
// const silver2 = 'https://woodburninsurance.apps.hcl-dxdev.hcl-dx-dev.net:443/dx/api/dam/v1/collections/3dfa9b1d-a567-4da7-bfd1-83b8ad3235ef/items/4ed4471c-2d07-4851-81b8-57f0e3f238b9/renditions/fdcc8eaf-b4dc-48ae-b542-d62a11c60c00?binary=true';

export const MODAL_TYPE = {
  ORDER_SENT: 'Order Sent',
  SEARCH_INJURY_FORM: 'Search Injury Form',
  PROOF_CAMERA: 'Proof Camera',
  CLAIM_SUBMITTED: 'Claim Submitted',
  INSURANCE_ENROLLED: 'Insurance Enrolled',
  COVERAGE_CHANGE: 'Coverage Change',
};

export const ENROLLMENT_STEPS = {
  "ENROLLMENT_STEP_TYPE": "Type",
  "ENROLLMENT_STEP_DETAILS": "Details",
  "ENROLLMENT_STEP_SELECT": "Select",
  "ENROLLMENT_STEP_REVIEW": "Review",
};

export const INSURANCE_TYPES = [ 'life', 'home', 'auto', 'travel' ];

export const PLANS = [
  {
    "id": "1",
    "name": "Woodburn Gold",
    "pricePerMonth": {
      "regular": 320,
      "discounted": 180
    },
    "recommended": true,
    "type": "gold"
  },
  {
    "id": "2",
    "name": "Woodburn Silver",
    "pricePerMonth": {
      "regular": 250,
      "discounted": 190
    },
    "recommended": false,
    "type": "silver"
  },
  {
    "id": "3",
    "name": "Woodburn Bronze",
    "pricePerMonth": {
      "regular": 320,
      "discounted": 200
    },
    "recommended": false,
    "type": "bronze"
  }
];

//
// Ribbon icons representing Woodburn Bronze, Silver, and Gold plans
//
export const INSURANCE_TYPE_RIBBON_ICON = {
  bronze: {
    '1x': require('../assets/icons/insurance-plans/bronze.png'),
    '1x': require('../assets/icons/insurance-plans/bronze.png'),
    '2x': require('../assets/icons/insurance-plans/bronze@2x.png'),
  },
  silver: {
    '1x': require('../assets/icons/insurance-plans/silver.png'),
    '2x': require('../assets/icons/insurance-plans/silver@2x.png'),
  },
  gold: {
    '1x': require('../assets/icons/insurance-plans/gold.png'),
    '2x': require('../assets/icons/insurance-plans/gold@2x.png'),
  },
};

export const INSURANCE_CATEGORY_ICON = {
  auto: {
    '1x_white': require('../assets/icons/tabs/auto.png'),
    '2x_white': require('../assets/icons/tabs/auto@2x.png'),
    // '1x': auto1,
    '1x': require('../assets/icons/tabs/auto-active.png'),
    // '2x': auto1,
    '2x': require('../assets/icons/tabs/auto-active@2x.png'),
  },
  home: {
    '1x_white': require('../assets/icons/tabs/home.png'),
    '2x_white': require('../assets/icons/tabs/home@2x.png'),
    '1x': require('../assets/icons/tabs/home-active.png'),
    '2x': require('../assets/icons/tabs/home-active@2x.png'),
  },
  life: {
    '1x_white': require('../assets/icons/tabs/life.png'),
    '2x_white': require('../assets/icons/tabs/life@2x.png'),
    '1x': require('../assets/icons/tabs/life-active.png'),
    '2x': require('../assets/icons/tabs/life-active@2x.png'),
  },
  travel: {
    '1x_white': require('../assets/icons/tabs/travel.png'),
    '2x_white': require('../assets/icons/tabs/travel@2x.png'),
    '1x': require('../assets/icons/tabs/travel-active.png'),
    '2x': require('../assets/icons/tabs/travel-active@2x.png'),
  },
};
