import common from './common';
import homePage from './home-page';

export default [
  {
    method: 'GET',
    url: 'common',
    response: common
  },
  {
    method: 'GET',
    url: 'home',
    response: homePage
  }
];
