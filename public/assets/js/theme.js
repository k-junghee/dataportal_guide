/* -------------------------------------------------------------------------- */
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */
const docReady = fn => {
  // see if DOM is already available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    setTimeout(fn, 1);
  }
};
const resize = fn => window.addEventListener('resize', fn);
const isIterableArray = array => Array.isArray(array) && !!array.length;
const camelize = str => {
  const text = str.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
  return `${text.substr(0, 1).toLowerCase()}${text.substr(1)}`;
};
const getData = (el, data) => {
  try {
    return JSON.parse(el.dataset[camelize(data)]);
  } catch (e) {
    return el.dataset[camelize(data)];
  }
};

/* ----------------------------- Colors function ---------------------------- */

const hexToRgb = hexValue => {
  let hex;
  hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue;
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b));
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};
const rgbaColor = (color = '#fff', alpha = 0.5) => `rgba(${hexToRgb(color)}, ${alpha})`;

/* --------------------------------- Colors --------------------------------- */

const getColor = (name, dom = document.documentElement) => getComputedStyle(dom).getPropertyValue(`--falcon-${name}`).trim();
const getColors = dom => ({
  primary: getColor('primary', dom),
  secondary: getColor('secondary', dom),
  success: getColor('success', dom),
  info: getColor('info', dom),
  warning: getColor('warning', dom),
  danger: getColor('danger', dom),
  light: getColor('light', dom),
  dark: getColor('dark', dom),
  white: getColor('white', dom),
  black: getColor('black', dom),
  emphasis: getColor('emphasis-color', dom)
});
const getSubtleColors = dom => ({
  primary: getColor('primary-bg-subtle', dom),
  secondary: getColor('secondary-bg-subtle', dom),
  success: getColor('success-bg-subtle', dom),
  info: getColor('info-bg-subtle', dom),
  warning: getColor('warning-bg-subtle', dom),
  danger: getColor('danger-bg-subtle', dom),
  light: getColor('light-bg-subtle', dom),
  dark: getColor('dark-bg-subtle', dom)
});
const getGrays = dom => ({
  100: getColor('gray-100', dom),
  200: getColor('gray-200', dom),
  300: getColor('gray-300', dom),
  400: getColor('gray-400', dom),
  500: getColor('gray-500', dom),
  600: getColor('gray-600', dom),
  700: getColor('gray-700', dom),
  800: getColor('gray-800', dom),
  900: getColor('gray-900', dom),
  1000: getColor('gray-1000', dom),
  1100: getColor('gray-1100', dom)
});
const hasClass = (el, className) => {
  !el && false;
  return el.classList.value.includes(className);
};
const addClass = (el, className) => {
  el.classList.add(className);
};
const removeClass = (el, className) => {
  el.classList.remove(className);
};
const getOffset = el => {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};
function isScrolledIntoView(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
  return vertInView && horInView;
}
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540
};
const getBreakpoint = el => {
  const classes = el && el.classList.value;
  let breakpoint;
  if (classes) {
    breakpoint = breakpoints[classes.split(' ').filter(cls => cls.includes('navbar-expand-')).pop().split('-').pop()];
  }
  return breakpoint;
};
const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

/* --------------------------------- Cookie --------------------------------- */

const setCookie = (name, value, expire) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + expire);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()}`;
};
const getCookie = name => {
  const keyValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return keyValue ? keyValue[2] : keyValue;
};
const settings = {
  tinymce: {
    theme: 'oxide'
  },
  chart: {
    borderColor: 'rgba(255, 255, 255, 0.8)'
  }
};

/* -------------------------- Chart Initialization -------------------------- */

const newChart = (chart, config) => {
  const ctx = chart.getContext('2d');
  return new window.Chart(ctx, config);
};

/* ---------------------------------- Store --------------------------------- */

const getItemFromStore = (key, defaultValue, store = localStorage) => {
  try {
    return JSON.parse(store.getItem(key)) || defaultValue;
  } catch {
    return store.getItem(key) || defaultValue;
  }
};
const setItemToStore = (key, payload, store = localStorage) => store.setItem(key, payload);
const getStoreSpace = (store = localStorage) => parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));

/* get Dates between */

const getDates = (startDate, endDate, interval = 1000 * 60 * 60 * 24) => {
  const duration = endDate - startDate;
  const steps = duration / interval;
  return Array.from({
    length: steps + 1
  }, (v, i) => new Date(startDate.valueOf() + interval * i));
};
const getPastDates = duration => {
  let days;
  switch (duration) {
    case 'week':
      days = 7;
      break;
    case 'month':
      days = 30;
      break;
    case 'year':
      days = 365;
      break;
    default:
      days = duration;
  }
  const date = new Date();
  const endDate = date;
  const startDate = new Date(new Date().setDate(date.getDate() - (days - 1)));
  return getDates(startDate, endDate);
};

/* Get Random Number */
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);
const utils = {
  docReady,
  breakpoints,
  resize,
  isIterableArray,
  camelize,
  getData,
  hasClass,
  addClass,
  hexToRgb,
  rgbaColor,
  getColor,
  getColors,
  getSubtleColors,
  getGrays,
  getOffset,
  isScrolledIntoView,
  getBreakpoint,
  setCookie,
  getCookie,
  newChart,
  settings,
  getItemFromStore,
  setItemToStore,
  getStoreSpace,
  getDates,
  getPastDates,
  getRandomNumber,
  removeClass,
  getSystemTheme
};

/* -------------------------------------------------------------------------- */
/*                                  Detector                                  */
/* -------------------------------------------------------------------------- */

const detectorInit = () => {
  const {
    is
  } = window;
  const html = document.querySelector('html');
  is.opera() && addClass(html, 'opera');
  is.mobile() && addClass(html, 'mobile');
  is.firefox() && addClass(html, 'firefox');
  is.safari() && addClass(html, 'safari');
  is.ios() && addClass(html, 'ios');
  is.iphone() && addClass(html, 'iphone');
  is.ipad() && addClass(html, 'ipad');
  is.ie() && addClass(html, 'ie');
  is.edge() && addClass(html, 'edge');
  is.chrome() && addClass(html, 'chrome');
  is.mac() && addClass(html, 'osx');
  is.windows() && addClass(html, 'windows');
  navigator.userAgent.match('CriOS') && addClass(html, 'chrome');
};

/*-----------------------------------------------
|   DomNode
-----------------------------------------------*/
class DomNode {
  constructor(node) {
    this.node = node;
  }
  addClass(className) {
    this.isValidNode() && this.node.classList.add(className);
  }
  removeClass(className) {
    this.isValidNode() && this.node.classList.remove(className);
  }
  toggleClass(className) {
    this.isValidNode() && this.node.classList.toggle(className);
  }
  hasClass(className) {
    this.isValidNode() && this.node.classList.contains(className);
  }
  data(key) {
    if (this.isValidNode()) {
      try {
        return JSON.parse(this.node.dataset[this.camelize(key)]);
      } catch (e) {
        return this.node.dataset[this.camelize(key)];
      }
    }
    return null;
  }
  attr(name) {
    return this.isValidNode() && this.node[name];
  }
  setAttribute(name, value) {
    this.isValidNode() && this.node.setAttribute(name, value);
  }
  removeAttribute(name) {
    this.isValidNode() && this.node.removeAttribute(name);
  }
  setProp(name, value) {
    this.isValidNode() && (this.node[name] = value);
  }
  on(event, cb) {
    this.isValidNode() && this.node.addEventListener(event, cb);
  }
  isValidNode() {
    return !!this.node;
  }

  // eslint-disable-next-line class-methods-use-this
  camelize(str) {
    const text = str.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
    return `${text.substr(0, 1).toLowerCase()}${text.substr(1)}`;
  }
}

/* eslint-disable */
const orders = [{
  id: 1,
  dropdownId: 'order-dropdown-1',
  orderId: '#181',
  mailLink: 'mailto:ricky@example.com',
  name: 'Ricky Antony',
  email: 'ricky@example.com',
  date: '20/04/2019',
  address: 'Ricky Antony, 2392 Main Avenue, Penasauka, New Jersey 02149',
  shippingType: 'Via Flat Rate',
  status: 'Completed',
  badge: {
    type: 'success',
    icon: 'fas fa-check'
  },
  amount: '$99'
}, {
  id: 2,
  dropdownId: 'order-dropdown-2',
  orderId: '#182',
  mailLink: 'mailto:kin@example.com',
  name: 'Kin Rossow',
  email: 'kin@example.com',
  date: '20/04/2019',
  address: 'Kin Rossow, 1 Hollywood Blvd,Beverly Hills, California 90210',
  shippingType: 'Via Free Shipping',
  status: 'Processing',
  badge: {
    type: 'primary',
    icon: 'fas fa-redo'
  },
  amount: '$120'
}, {
  id: 3,
  dropdownId: 'order-dropdown-3',
  orderId: '#183',
  mailLink: 'mailto:merry@example.com',
  name: 'Merry Diana',
  email: 'merry@example.com',
  date: '30/04/2019',
  address: 'Merry Diana, 1 Infinite Loop, Cupertino, California 90210',
  shippingType: 'Via Link Road',
  status: 'On Hold',
  badge: {
    type: 'secondary',
    icon: 'fas fa-ban'
  },
  amount: '$70'
}, {
  id: 4,
  dropdownId: 'order-dropdown-4',
  orderId: '#184',
  mailLink: 'mailto:bucky@example.com',
  name: 'Bucky Robert',
  email: 'bucky@example.com',
  date: '30/04/2019',
  address: 'Bucky Robert, 1 Infinite Loop, Cupertino, California 90210',
  shippingType: 'Via Free Shipping',
  status: 'Pending',
  badge: {
    type: 'warning',
    icon: 'fas fa-stream'
  },
  amount: '$92'
}, {
  id: 5,
  dropdownId: 'order-dropdown-5',
  orderId: '#185',
  mailLink: 'mailto:rocky@example.com',
  name: 'Rocky Zampa',
  email: 'rocky@example.com',
  date: '30/04/2019',
  address: 'Rocky Zampa, 1 Infinite Loop, Cupertino, California 90210',
  shippingType: 'Via Free Road',
  status: 'On Hold',
  badge: {
    type: 'secondary',
    icon: 'fas fa-ban'
  },
  amount: '$120'
}, {
  id: 6,
  dropdownId: 'order-dropdown-6',
  orderId: '#186',
  mailLink: 'mailto:ricky@example.com',
  name: 'Ricky John',
  email: 'ricky@example.com',
  date: '30/04/2019',
  address: 'Ricky John, 1 Infinite Loop, Cupertino, California 90210',
  shippingType: 'Via Free Shipping',
  status: 'Processing',
  badge: {
    type: 'primary',
    icon: 'fas fa-redo'
  },
  amount: '$145'
}, {
  id: 7,
  dropdownId: 'order-dropdown-7',
  orderId: '#187',
  mailLink: 'mailto:cristofer@example.com',
  name: 'Cristofer Henric',
  email: 'cristofer@example.com',
  date: '30/04/2019',
  address: 'Cristofer Henric, 1 Infinite Loop, Cupertino, California 90210',
  shippingType: 'Via Flat Rate',
  status: 'Completed',
  badge: {
    type: 'success',
    icon: 'fas fa-check'
  },
  amount: '$55'
}, {
  id: 8,
  dropdownId: 'order-dropdown-8',
  orderId: '#188',
  mailLink: 'mailto:lee@example.com',
  name: 'Brate Lee',
  email: 'lee@example.com',
  date: '29/04/2019',
  address: 'Brate Lee, 1 Infinite Loop, Cupertino, California 90210',
  shippingType: 'Via Link Road',
  status: 'On Hold',
  badge: {
    type: 'secondary',
    icon: 'fas fa-ban'
  },
  amount: '$90'
}, {
  id: 9,
  dropdownId: 'order-dropdown-9',
  orderId: '#189',
  mailLink: 'mailto:Stephenson@example.com',
  name: 'Thomas Stephenson',
  email: 'Stephenson@example.com',
  date: '29/04/2019',
  address: 'Thomas Stephenson, 116 Ballifeary Road, Bamff',
  shippingType: 'Via Flat Rate',
  status: 'Processing',
  badge: {
    type: 'primary',
    icon: 'fas fa-redo'
  },
  amount: '$52'
}, {
  id: 10,
  dropdownId: 'order-dropdown-10',
  orderId: '#190',
  mailLink: 'mailto:eviewsing@example.com',
  name: 'Evie Singh',
  email: 'eviewsing@example.com',
  date: '29/04/2019',
  address: 'Evie Singh, 54 Castledore Road, Tunstead',
  shippingType: 'Via Flat Rate',
  status: 'Completed',
  badge: {
    type: 'success',
    icon: 'fas fa-check'
  },
  amount: '$90'
}, {
  id: 11,
  dropdownId: 'order-dropdown-11',
  orderId: '#191',
  mailLink: 'mailto:peter@example.com',
  name: 'David Peters',
  email: 'peter@example.com',
  date: '29/04/2019',
  address: 'David Peters, Rhyd Y Groes, Rhosgoch, LL66 0AT',
  shippingType: 'Via Link Road',
  status: 'Completed',
  badge: {
    type: 'success',
    icon: 'fas fa-check'
  },
  amount: '$69'
}, {
  id: 12,
  dropdownId: 'order-dropdown-12',
  orderId: '#192',
  mailLink: 'mailto:jennifer@example.com',
  name: 'Jennifer Johnson',
  email: 'jennifer@example.com',
  date: '28/04/2019',
  address: 'Jennifer Johnson, Rhyd Y Groes, Rhosgoch, LL66 0AT',
  shippingType: 'Via Flat Rate',
  status: 'Processing',
  badge: {
    type: 'primary',
    icon: 'fas fa-redo'
  },
  amount: '$112'
}, {
  id: 13,
  dropdownId: 'order-dropdown-13',
  orderId: '#193',
  mailLink: 'mailto:okuneva@example.com',
  name: ' Demarcus Okuneva',
  email: 'okuneva@example.com',
  date: '28/04/2019',
  address: ' Demarcus Okuneva, 90555 Upton Drive Jeffreyview, UT 08771',
  shippingType: 'Via Flat Rate',
  status: 'Completed',
  badge: {
    type: 'success',
    icon: 'fas fa-check'
  },
  amount: '$99'
}, {
  id: 14,
  dropdownId: 'order-dropdown-14',
  orderId: '#194',
  mailLink: 'mailto:simeon@example.com',
  name: 'Simeon Harber',
  email: 'simeon@example.com',
  date: '27/04/2019',
  address: 'Simeon Harber, 702 Kunde Plain Apt. 634 East Bridgetview, HI 13134-1862',
  shippingType: 'Via Free Shipping',
  status: 'On Hold',
  badge: {
    type: 'secondary',
    icon: 'fas fa-ban'
  },
  amount: '$129'
}, {
  id: 15,
  dropdownId: 'order-dropdown-15',
  orderId: '#195',
  mailLink: 'mailto:lavon@example.com',
  name: 'Lavon Haley',
  email: 'lavon@example.com',
  date: '27/04/2019',
  address: 'Lavon Haley, 30998 Adonis Locks McGlynnside, ID 27241',
  shippingType: 'Via Free Shipping',
  status: 'Pending',
  badge: {
    type: 'warning',
    icon: 'fas fa-stream'
  },
  amount: '$70'
}, {
  id: 16,
  dropdownId: 'order-dropdown-16',
  orderId: '#196',
  mailLink: 'mailto:ashley@example.com',
  name: 'Ashley Kirlin',
  email: 'ashley@example.com',
  date: '26/04/2019',
  address: 'Ashley Kirlin, 43304 Prosacco Shore South Dejuanfurt, MO 18623-0505',
  shippingType: 'Via Link Road',
  status: 'Processing',
  badge: {
    type: 'primary',
    icon: 'fas fa-redo'
  },
  amount: '$39'
}, {
  id: 17,
  dropdownId: 'order-dropdown-17',
  orderId: '#197',
  mailLink: 'mailto:johnnie@example.com',
  name: 'Johnnie Considine',
  email: 'johnnie@example.com',
  date: '26/04/2019',
  address: 'Johnnie Considine, 6008 Hermann Points Suite 294 Hansenville, TN 14210',
  shippingType: 'Via Flat Rate',
  status: 'Pending',
  badge: {
    type: 'warning',
    icon: 'fas fa-stream'
  },
  amount: '$70'
}, {
  id: 18,
  dropdownId: 'order-dropdown-18',
  orderId: '#198',
  mailLink: 'mailto:trace@example.com',
  name: 'Trace Farrell',
  email: 'trace@example.com',
  date: '26/04/2019',
  address: 'Trace Farrell, 431 Steuber Mews Apt. 252 Germanland, AK 25882',
  shippingType: 'Via Free Shipping',
  status: 'Completed',
  badge: {
    type: 'success',
    icon: 'fas fa-check'
  },
  amount: '$70'
}, {
  id: 19,
  dropdownId: 'order-dropdown-19',
  orderId: '#199',
  mailLink: 'mailto:nienow@example.com',
  name: 'Estell Nienow',
  email: 'nienow@example.com',
  date: '26/04/2019',
  address: 'Estell Nienow, 4167 Laverna Manor Marysemouth, NV 74590',
  shippingType: 'Via Free Shipping',
  status: 'Completed',
  badge: {
    type: 'success',
    icon: 'fas fa-check'
  },
  amount: '$59'
}, {
  id: 20,
  dropdownId: 'order-dropdown-20',
  orderId: '#200',
  mailLink: 'mailto:howe@example.com',
  name: 'Daisha Howe',
  email: 'howe@example.com',
  date: '25/04/2019',
  address: 'Daisha Howe, 829 Lavonne Valley Apt. 074 Stehrfort, RI 77914-0379',
  shippingType: 'Via Free Shipping',
  status: 'Completed',
  badge: {
    type: 'success',
    icon: 'fas fa-check'
  },
  amount: '$39'
}, {
  id: 21,
  dropdownId: 'order-dropdown-21',
  orderId: '#201',
  mailLink: 'mailto:haley@example.com',
  name: 'Miles Haley',
  email: 'haley@example.com',
  date: '24/04/2019',
  address: 'Miles Haley, 53150 Thad Squares Apt. 263 Archibaldfort, MO 00837',
  shippingType: 'Via Flat Rate',
  status: 'Completed',
  badge: {
    type: 'success',
    icon: 'fas fa-check'
  },
  amount: '$55'
}, {
  id: 22,
  dropdownId: 'order-dropdown-22',
  orderId: '#202',
  mailLink: 'mailto:watsica@example.com',
  name: 'Brenda Watsica',
  email: 'watsica@example.com',
  date: '24/04/2019',
  address: "Brenda Watsica, 9198 O'Kon Harbors Morarborough, IA 75409-7383",
  shippingType: 'Via Free Shipping',
  status: 'Completed',
  badge: {
    type: 'success',
    icon: 'fas fa-check'
  },
  amount: '$89'
}, {
  id: 23,
  dropdownId: 'order-dropdown-23',
  orderId: '#203',
  mailLink: 'mailto:ellie@example.com',
  name: "Ellie O'Reilly",
  email: 'ellie@example.com',
  date: '24/04/2019',
  address: "Ellie O'Reilly, 1478 Kaitlin Haven Apt. 061 Lake Muhammadmouth, SC 35848",
  shippingType: 'Via Free Shipping',
  status: 'Completed',
  badge: {
    type: 'success',
    icon: 'fas fa-check'
  },
  amount: '$47'
}, {
  id: 24,
  dropdownId: 'order-dropdown-24',
  orderId: '#204',
  mailLink: 'mailto:garry@example.com',
  name: 'Garry Brainstrow',
  email: 'garry@example.com',
  date: '23/04/2019',
  address: 'Garry Brainstrow, 13572 Kurt Mews South Merritt, IA 52491',
  shippingType: 'Via Free Shipping',
  status: 'Completed',
  badge: {
    type: 'success',
    icon: 'fas fa-check'
  },
  amount: '$139'
}, {
  id: 25,
  dropdownId: 'order-dropdown-25',
  orderId: '#205',
  mailLink: 'mailto:estell@example.com',
  name: 'Estell Pollich',
  email: 'estell@example.com',
  date: '23/04/2019',
  address: 'Estell Pollich, 13572 Kurt Mews South Merritt, IA 52491',
  shippingType: 'Via Free Shipping',
  status: 'On Hold',
  badge: {
    type: 'secondary',
    icon: 'fas fa-ban'
  },
  amount: '$49'
}, {
  id: 26,
  dropdownId: 'order-dropdown-26',
  orderId: '#206',
  mailLink: 'mailto:ara@example.com',
  name: 'Ara Mueller',
  email: 'ara@example.com',
  date: '23/04/2019',
  address: 'Ara Mueller, 91979 Kohler Place Waelchiborough, CT 41291',
  shippingType: 'Via Flat Rate',
  status: 'On Hold',
  badge: {
    type: 'secondary',
    icon: 'fas fa-ban'
  },
  amount: '$19'
}, {
  id: 27,
  dropdownId: 'order-dropdown-27',
  orderId: '#207',
  mailLink: 'mailto:blick@example.com',
  name: 'Lucienne Blick',
  email: 'blick@example.com',
  date: '23/04/2019',
  address: 'Lucienne Blick, 6757 Giuseppe Meadows Geraldinemouth, MO 48819-4970',
  shippingType: 'Via Flat Rate',
  status: 'On Hold',
  badge: {
    type: 'secondary',
    icon: 'fas fa-ban'
  },
  amount: '$59'
}, {
  id: 28,
  dropdownId: 'order-dropdown-28',
  orderId: '#208',
  mailLink: 'mailto:haag@example.com',
  name: 'Laverne Haag',
  email: 'haag@example.com',
  date: '22/04/2019',
  address: 'Laverne Haag, 2327 Kaylee Mill East Citlalli, AZ 89582-3143',
  shippingType: 'Via Flat Rate',
  status: 'On Hold',
  badge: {
    type: 'secondary',
    icon: 'fas fa-ban'
  },
  amount: '$49'
}, {
  id: 29,
  dropdownId: 'order-dropdown-29',
  orderId: '#209',
  mailLink: 'mailto:bednar@example.com',
  name: 'Brandon Bednar',
  email: 'bednar@example.com',
  date: '22/04/2019',
  address: 'Brandon Bednar, 25156 Isaac Crossing Apt. 810 Lonborough, CO 83774-5999',
  shippingType: 'Via Flat Rate',
  status: 'On Hold',
  badge: {
    type: 'secondary',
    icon: 'fas fa-ban'
  },
  amount: '$39'
}, {
  id: 30,
  dropdownId: 'order-dropdown-30',
  orderId: '#210',
  mailLink: 'mailto:dimitri@example.com',
  name: 'Dimitri Boehm',
  email: 'dimitri@example.com',
  date: '23/04/2019',
  address: 'Dimitri Boehm, 71603 Wolff Plains Apt. 885 Johnstonton, MI 01581',
  shippingType: 'Via Flat Rate',
  status: 'On Hold',
  badge: {
    type: 'secondary',
    icon: 'fas fa-ban'
  },
  amount: '$111'
}];
const advanceAjaxTableInit = () => {
  const togglePaginationButtonDisable = (button, disabled) => {
    button.disabled = disabled;
    button.classList[disabled ? 'add' : 'remove']('disabled');
  };
  // Selectors
  const table = document.getElementById('advanceAjaxTable');
  if (table) {
    const options = {
      page: 10,
      pagination: {
        item: "<li><button class='page' type='button'></button></li>"
      },
      item: values => {
        const {
          orderId,
          id,
          name,
          email,
          date,
          address,
          shippingType,
          status,
          badge,
          amount
        } = values;
        return `
          <tr class="btn-reveal-trigger">
            <td class="order py-2 align-middle white-space-nowrap">
              <a href="https://prium.github.io/falcon/v3.16.0/app/e-commerce/orders/order-details.html">
                <strong>${orderId}</strong>
              </a>
              by
              <strong>${name}</strong>
              <br />
              <a href="mailto:${email}">${email}</a>
            </td>
            <td class="py-2 align-middle">
              ${date}
            </td>
            <td class="py-2 align-middle white-space-nowrap">
              ${address}
              <p class="mb-0 text-500">${shippingType}</p>
            </td>
            <td class="py-2 align-middle text-center fs-0 white-space-nowrap">
              <span class="badge rounded-pill d-block badge-subtle-${badge.type}">
                ${status}
                <span class="ms-1 ${badge.icon}" data-fa-transform="shrink-2"></span>
              </span>
            </td>
            <td class="py-2 align-middle text-end fs-0 fw-medium">
              ${amount}
            </td>
            <td class="py-2 align-middle white-space-nowrap text-end">
              <div class="dropstart font-sans-serif position-static d-inline-block">
                <button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal" type='button' id="order-dropdown-${id}" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent">
                  <span class="fas fa-ellipsis-h fs--1"></span>
                </button>
                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="order-dropdown-${id}">
                  <a href="#!" class="dropdown-item">View</a>
                  <a href="#!" class="dropdown-item">Edit</a>
                  <a href="#!" class="dropdown-item">Refund</a>
                  <div class"dropdown-divider"></div>
                  <a href="#!" class="dropdown-item text-warning">Archive</a>
                  <a href="#!" class="dropdown-item text-warning">Archive</a>
                </div>
              </div>
            </td>
          </tr>
        `;
      }
    };
    const paginationButtonNext = table.querySelector('[data-list-pagination="next"]');
    const paginationButtonPrev = table.querySelector('[data-list-pagination="prev"]');
    const viewAll = table.querySelector('[data-list-view="*"]');
    const viewLess = table.querySelector('[data-list-view="less"]');
    const listInfo = table.querySelector('[data-list-info]');
    const listFilter = document.querySelector('[data-list-filter]');
    const orderList = new window.List(table, options, orders);

    // Fallback
    orderList.on('updated', item => {
      const fallback = table.querySelector('.fallback') || document.getElementById(options.fallback);
      if (fallback) {
        if (item.matchingItems.length === 0) {
          fallback.classList.remove('d-none');
        } else {
          fallback.classList.add('d-none');
        }
      }
    });
    const totalItem = orderList.items.length;
    const itemsPerPage = orderList.page;
    const btnDropdownClose = orderList.listContainer.querySelector('.btn-close');
    let pageQuantity = Math.ceil(totalItem / itemsPerPage);
    let numberOfcurrentItems = orderList.visibleItems.length;
    let pageCount = 1;
    btnDropdownClose && btnDropdownClose.addEventListener('search.close', () => orderList.fuzzySearch(''));
    const updateListControls = () => {
      listInfo && (listInfo.innerHTML = `${orderList.i} to ${numberOfcurrentItems} of ${totalItem}`);
      paginationButtonPrev && togglePaginationButtonDisable(paginationButtonPrev, pageCount === 1);
      paginationButtonNext && togglePaginationButtonDisable(paginationButtonNext, pageCount === pageQuantity);
      if (pageCount > 1 && pageCount < pageQuantity) {
        togglePaginationButtonDisable(paginationButtonNext, false);
        togglePaginationButtonDisable(paginationButtonPrev, false);
      }
    };
    updateListControls();
    if (paginationButtonNext) {
      paginationButtonNext.addEventListener('click', e => {
        e.preventDefault();
        pageCount += 1;
        const nextInitialIndex = orderList.i + itemsPerPage;
        nextInitialIndex <= orderList.size() && orderList.show(nextInitialIndex, itemsPerPage);
        numberOfcurrentItems += orderList.visibleItems.length;
        updateListControls();
      });
    }
    if (paginationButtonPrev) {
      paginationButtonPrev.addEventListener('click', e => {
        e.preventDefault();
        pageCount -= 1;
        numberOfcurrentItems -= orderList.visibleItems.length;
        const prevItem = orderList.i - itemsPerPage;
        prevItem > 0 && orderList.show(prevItem, itemsPerPage);
        updateListControls();
      });
    }
    const toggleViewBtn = () => {
      viewLess.classList.toggle('d-none');
      viewAll.classList.toggle('d-none');
    };
    if (viewAll) {
      viewAll.addEventListener('click', () => {
        orderList.show(1, totalItem);
        pageQuantity = 1;
        pageCount = 1;
        numberOfcurrentItems = totalItem;
        updateListControls();
        toggleViewBtn();
      });
    }
    if (viewLess) {
      viewLess.addEventListener('click', () => {
        orderList.show(1, itemsPerPage);
        pageQuantity = Math.ceil(totalItem / itemsPerPage);
        pageCount = 1;
        numberOfcurrentItems = orderList.visibleItems.length;
        updateListControls();
        toggleViewBtn();
      });
    }
    if (options.pagination) {
      table.querySelector('.pagination').addEventListener('click', e => {
        if (e.target.classList[0] === 'page') {
          pageCount = Number(e.target.innerText);
          updateListControls();
        }
      });
    }
    if (options.filter) {
      const {
        key
      } = options.filter;
      listFilter.addEventListener('change', e => {
        orderList.filter(item => {
          if (e.target.value === '') {
            return true;
          }
          return item.values()[key].toLowerCase().includes(e.target.value.toLowerCase());
        });
      });
    }
  }
};

/* -------------------------------------------------------------------------- */
/*                                  Anchor JS                                 */
/* -------------------------------------------------------------------------- */

const anchors = new window.AnchorJS();
anchors.options = {
  icon: '#'
};
anchors.add('[data-anchor]');

/*-----------------------------------------------
|   Bottom Bar Control
-----------------------------------------------*/

const bottomBarInit = () => {
  const bottomBars = document.querySelectorAll('[data-bottom-bar]');
  const navbarButtons = [document.querySelector('[data-bs-target="#navbarVerticalCollapse"]'), document.querySelector('[data-bs-target="#navbarStandard"]')];
  const isElementInViewport = (el, offsetTop = 0) => {
    const rect = el.getBoundingClientRect();
    return rect.bottom > 0 && rect.top > offsetTop && rect.right > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth) && rect.top < (window.innerHeight || document.documentElement.clientHeight);
  };
  if (bottomBars.length) {
    bottomBars.forEach(bar => {
      // get options
      const barOptions = utils.getData(bar, 'bottom-bar');
      const defaultOptions = {
        target: '#bottom-bar-target',
        offsetTop: 0,
        breakPoint: 'lg'
      };
      const {
        target,
        offsetTop,
        breakPoint
      } = window._.merge(defaultOptions, barOptions);

      // select target
      const targetEl = document.getElementById(target);

      // handle Bottombar
      const toggleBottomBar = () => {
        if (window.matchMedia(`(max-width: ${utils.breakpoints[breakPoint]}px)`).matches) {
          if (!isElementInViewport(targetEl, offsetTop)) {
            utils.removeClass(bar, 'hide');
          } else {
            utils.addClass(bar, 'hide');
          }
        }
      };
      window.addEventListener('scroll', toggleBottomBar);
      const toggleBottomBarOnNavbarCollapse = el => {
        if (!utils.hasClass(el, 'collapsed')) {
          utils.addClass(bar, 'hide');
        } else if (!isElementInViewport(targetEl, offsetTop)) {
          utils.removeClass(bar, 'hide');
        }
      };
      navbarButtons.forEach(btn => btn && btn.addEventListener('click', () => toggleBottomBarOnNavbarCollapse(btn)));
    });
  }
};

/*-----------------------------------------------
|   Bulk Select
-----------------------------------------------*/

const elementMap = new Map();
class BulkSelect {
  constructor(element, option) {
    this.element = element;
    this.option = {
      displayNoneClassName: 'd-none',
      ...option
    };
    elementMap.set(this.element, this);
  }

  // Static
  static getInstance(element) {
    if (elementMap.has(element)) {
      return elementMap.get(element);
    }
    return null;
  }
  init() {
    this.attachNodes();
    this.clickBulkCheckbox();
    this.clickRowCheckbox();
  }
  getSelectedRows() {
    return Array.from(this.bulkSelectRows).filter(row => row.checked).map(row => utils.getData(row, 'bulk-select-row'));
  }
  attachNodes() {
    const {
      body,
      actions,
      replacedElement
    } = utils.getData(this.element, 'bulk-select');
    this.actions = new DomNode(document.getElementById(actions));
    this.replacedElement = new DomNode(document.getElementById(replacedElement));
    this.bulkSelectRows = document.getElementById(body).querySelectorAll('[data-bulk-select-row]');
  }
  attachRowNodes(elms) {
    this.bulkSelectRows = elms;
  }
  clickBulkCheckbox() {
    // Handle click event in bulk checkbox
    this.element.addEventListener('click', () => {
      if (this.element.indeterminate === 'indeterminate') {
        this.actions.addClass(this.option.displayNoneClassName);
        this.replacedElement.removeClass(this.option.displayNoneClassName);
        this.removeBulkCheck();
        this.bulkSelectRows.forEach(el => {
          const rowCheck = new DomNode(el);
          rowCheck.setProp('checked', false);
          rowCheck.setAttribute('checked', false);
        });
        return;
      }
      this.toggleDisplay();
      this.bulkSelectRows.forEach(el => {
        // eslint-disable-next-line
        el.checked = this.element.checked;
      });
    });
  }
  clickRowCheckbox() {
    // Handle click event in checkbox of each row
    this.bulkSelectRows.forEach(el => {
      const rowCheck = new DomNode(el);
      rowCheck.on('click', () => {
        if (this.element.indeterminate !== 'indeterminate') {
          this.element.indeterminate = true;
          this.element.setAttribute('indeterminate', 'indeterminate');
          this.element.checked = true;
          this.element.setAttribute('checked', true);
          this.actions.removeClass(this.option.displayNoneClassName);
          this.replacedElement.addClass(this.option.displayNoneClassName);
        }
        if ([...this.bulkSelectRows].every(element => element.checked)) {
          this.element.indeterminate = false;
          this.element.setAttribute('indeterminate', false);
        }
        if ([...this.bulkSelectRows].every(element => !element.checked)) {
          this.removeBulkCheck();
          this.toggleDisplay();
        }
      });
    });
  }
  removeBulkCheck() {
    this.element.indeterminate = false;
    this.element.removeAttribute('indeterminate');
    this.element.checked = false;
    this.element.setAttribute('checked', false);
  }
  toggleDisplay() {
    this.actions.toggleClass(this.option.displayNoneClassName);
    this.replacedElement.toggleClass(this.option.displayNoneClassName);
  }
}
function bulkSelectInit() {
  const bulkSelects = document.querySelectorAll('[data-bulk-select');
  if (bulkSelects.length) {
    bulkSelects.forEach(el => {
      const bulkSelect = new BulkSelect(el);
      bulkSelect.init();
    });
  }
}
window.BulkSelect = BulkSelect;

/*-----------------------------------------------
|   Chat
-----------------------------------------------*/
const chatInit = () => {
  const Events = {
    CLICK: 'click',
    SHOWN_BS_TAB: 'shown.bs.tab',
    KEYUP: 'keyup',
    EMOJI: 'emoji'
  };
  const Selector = {
    CHAT_SIDEBAR: '.chat-sidebar',
    CHAT_CONTACT: '.chat-contact',
    CHAT_CONTENT_SCROLL_AREA: '.chat-content-scroll-area',
    CHAT_CONTENT_SCROLL_AREA_ACTIVE: '.card-chat-pane.active .chat-content-scroll-area',
    CHAT_EMOJIAREA: '.chat-editor-area .emojiarea-editor',
    BTN_SEND: '.btn-send',
    EMOJIEAREA_EDITOR: '.emojiarea-editor',
    BTN_INFO: '.btn-chat-info',
    CONVERSATION_INFO: '.conversation-info',
    CONTACTS_LIST_SHOW: '.contacts-list-show'
  };
  const ClassName = {
    UNREAD_MESSAGE: 'unread-message',
    TEXT_PRIMARY: 'text-primary',
    SHOW: 'show'
  };
  const DATA_KEY = {
    INDEX: 'index'
  };
  const $chatSidebar = document.querySelector(Selector.CHAT_SIDEBAR);
  const $chatContact = document.querySelectorAll(Selector.CHAT_CONTACT);
  const $chatEmojiarea = document.querySelector(Selector.CHAT_EMOJIAREA);
  const $btnSend = document.querySelector(Selector.BTN_SEND);
  const $currentChatArea = document.querySelector(Selector.CHAT_CONTENT_SCROLL_AREA);

  // Set scrollbar position
  const setScrollbarPosition = $chatArea => {
    if ($chatArea) {
      const scrollArea = $chatArea;
      scrollArea.scrollTop = $chatArea.scrollHeight;
    }
  };
  setTimeout(() => {
    setScrollbarPosition($currentChatArea);
  }, 700);
  document.querySelectorAll(Selector.CHAT_CONTACT).forEach(el => {
    el.addEventListener(Events.CLICK, e => {
      const $this = e.currentTarget;
      $this.classList.add('active');
      // Hide contact list sidebar on responsive
      window.innerWidth < 768 && !e.target.classList.contains('hover-actions') && ($chatSidebar.style.left = '-100%');

      // Remove unread-message class when read
      $this.classList.contains(ClassName.UNREAD_MESSAGE) && $this.classList.remove(ClassName.UNREAD_MESSAGE);
    });
  });
  $chatContact.forEach(el => {
    el.addEventListener(Events.SHOWN_BS_TAB, () => {
      $chatEmojiarea.innerHTML = '';
      $btnSend.classList.remove(ClassName.TEXT_PRIMARY);
      const TargetChatArea = document.querySelector(Selector.CHAT_CONTENT_SCROLL_AREA_ACTIVE);
      setScrollbarPosition(TargetChatArea);
    });
  });

  // change send button color on

  if ($chatEmojiarea) {
    $chatEmojiarea.setAttribute('placeholder', 'Type your message');
    $chatEmojiarea.addEventListener(Events.KEYUP, e => {
      if (e.target.textContent.length <= 0) {
        $btnSend.classList.remove(ClassName.TEXT_PRIMARY);
        if (e.target.innerHTML === '<br>') {
          e.target.innerHTML = '';
        }
      } else {
        $btnSend.classList.add(ClassName.TEXT_PRIMARY);
      }
      const TargetChatArea = document.querySelector(Selector.CHAT_CONTENT_SCROLL_AREA_ACTIVE);
      setScrollbarPosition(TargetChatArea);
    });
  }
  // Open conversation info sidebar
  $chatEmojiarea && document.querySelectorAll(Selector.BTN_INFO).forEach(el => {
    el.addEventListener(Events.CLICK, e => {
      const $this = e.currentTarget;
      const dataIndex = utils.getData($this, DATA_KEY.INDEX);
      const $info = document.querySelector(`${Selector.CONVERSATION_INFO}[data-${DATA_KEY.INDEX}='${dataIndex}']`);
      $info.classList.toggle(ClassName.SHOW);
    });
  });

  // Show contact list sidebar on responsive
  document.querySelectorAll(Selector.CONTACTS_LIST_SHOW).forEach(el => {
    el.addEventListener(Events.CLICK, function () {
      $chatSidebar.style.left = 0;
    });
  });

  // Set scrollbar area height on resize
  utils.resize(() => {
    const TargetChatArea = document.querySelector(Selector.CHAT_CONTENT_SCROLL_AREA_ACTIVE);
    setScrollbarPosition(TargetChatArea);
  });
};

/* -------------------------------------------------------------------------- */
/*                                   choices                                   */
/* -------------------------------------------------------------------------- */
const choicesInit = () => {
  if (window.Choices) {
    const elements = document.querySelectorAll('.js-choice');
    elements.forEach(item => {
      const userOptions = utils.getData(item, 'options');
      const choices = new window.Choices(item, {
        itemSelectText: '',
        ...userOptions
      });
      const needsValidation = document.querySelectorAll('.needs-validation');
      needsValidation.forEach(validationItem => {
        const selectFormValidation = () => {
          validationItem.querySelectorAll('.choices').forEach(choicesItem => {
            const singleSelect = choicesItem.querySelector('.choices__list--single');
            const multipleSelect = choicesItem.querySelector('.choices__list--multiple');
            if (choicesItem.querySelector('[required]')) {
              if (singleSelect) {
                if (singleSelect.querySelector('.choices__item--selectable')?.getAttribute('data-value') !== '') {
                  choicesItem.classList.remove('invalid');
                  choicesItem.classList.add('valid');
                } else {
                  choicesItem.classList.remove('valid');
                  choicesItem.classList.add('invalid');
                }
              }
              //----- for multiple select only ----------
              if (multipleSelect) {
                if (choicesItem.getElementsByTagName('option').length) {
                  choicesItem.classList.remove('invalid');
                  choicesItem.classList.add('valid');
                } else {
                  choicesItem.classList.remove('valid');
                  choicesItem.classList.add('invalid');
                }
              }

              //------ select end ---------------
            }
          });
        };

        validationItem.addEventListener('submit', () => {
          selectFormValidation();
        });
        item.addEventListener('change', () => {
          selectFormValidation();
        });
      });
      return choices;
    });
  }
};

/*-----------------------------------------------
|   Cookie notice
-----------------------------------------------*/
const cookieNoticeInit = () => {
  const Selector = {
    NOTICE: '.notice',
    DATA_TOGGLE_Notice: '[data-bs-toggle="notice"]'
  };
  const Events = {
    CLICK: 'click',
    HIDDEN_BS_TOAST: 'hidden.bs.toast'
  };
  const DataKeys = {
    OPTIONS: 'options'
  };
  const ClassNames = {
    HIDE: 'hide'
  };
  const notices = document.querySelectorAll(Selector.NOTICE);
  let showNotice = true;
  notices.forEach(item => {
    const notice = new window.bootstrap.Toast(item);
    const options = {
      autoShow: false,
      autoShowDelay: 0,
      showOnce: false,
      cookieExpireTime: 3600000,
      ...utils.getData(item, DataKeys.OPTIONS)
    };
    const {
      showOnce,
      autoShow,
      autoShowDelay
    } = options;
    if (showOnce) {
      const hasNotice = utils.getCookie('notice');
      showNotice = hasNotice === null;
    }
    if (autoShow && showNotice) {
      setTimeout(() => {
        notice.show();
      }, autoShowDelay);
    }
    item.addEventListener(Events.HIDDEN_BS_TOAST, function (e) {
      const el = e.currentTarget;
      const toastOptions = {
        cookieExpireTime: 3600000,
        showOnce: false,
        ...utils.getData(el, DataKeys.OPTIONS)
      };
      toastOptions.showOnce && utils.setCookie('notice', false, toastOptions.cookieExpireTime);
    });
  });
  const btnNoticeToggle = document.querySelector(Selector.DATA_TOGGLE_Notice);
  btnNoticeToggle && btnNoticeToggle.addEventListener(Events.CLICK, ({
    currentTarget
  }) => {
    const id = currentTarget.getAttribute('href');
    const notice = new window.bootstrap.Toast(document.querySelector(id));

    /*eslint-disable-next-line*/
    const el = notice._element;
    utils.hasClass(el, ClassNames.HIDE) ? notice.show() : notice.hide();
  });
};

/* -------------------------------------------------------------------------- */
/*                                  Copy LinK                                 */
/* -------------------------------------------------------------------------- */

const copyLink = () => {
  const copyLinkModal = document.getElementById('copyLinkModal');
  copyLinkModal && copyLinkModal.addEventListener('shown.bs.modal', () => {
    const invitationLink = document.querySelector('.invitation-link');
    invitationLink.select();
  });
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons && copyButtons.forEach(button => {
    const tooltip = new window.bootstrap.Tooltip(button);
    button.addEventListener('mouseover', () => tooltip.show());
    button.addEventListener('mouseleave', () => tooltip.hide());
    button.addEventListener('click', e => {
      e.stopPropagation();
      const el = e.target;
      el.setAttribute('data-original-title', 'Copied');
      tooltip.show();
      el.setAttribute('data-original-title', 'Copy to clipboard');
      tooltip.update();
      const inputID = utils.getData(el, 'copy');
      const input = document.querySelector(inputID);
      input.select();
      document.execCommand('copy');
    });
  });
};

/* -------------------------------------------------------------------------- */
/*                                  Count Up                                  */
/* -------------------------------------------------------------------------- */

const countupInit = () => {
  if (window.countUp) {
    const countups = document.querySelectorAll('[data-countup]');
    countups.forEach(node => {
      const {
        endValue,
        ...options
      } = utils.getData(node, 'countup');
      const countUp = new window.countUp.CountUp(node, endValue, {
        duration: 5,
        ...options
      });
      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    });
  }
};

/*-----------------------------------------------
|   Data table
-----------------------------------------------*/
const dataTablesInit = () => {
  if (window.jQuery) {
    const $ = window.jQuery;
    const dataTables = $('[data-datatables]');
    const customDataTable = elem => {
      elem.find('.pagination').addClass('pagination-sm');
    };
    dataTables.length && dataTables.each((index, value) => {
      const $this = $(value);
      const options = $.extend({
        dom: "<'row mx-0'<'col-md-6'l><'col-md-6'f>>" + "<'table-responsive scrollbar'tr>" + "<'row g-0 align-items-center justify-content-center justify-content-sm-between'<'col-auto mb-2 mb-sm-0 px-3'i><'col-auto px-3'p>>"
      }, $this.data('datatables'));
      $this.DataTable(options);
      const $wrpper = $this.closest('.dataTables_wrapper');
      customDataTable($wrpper);
      $this.on('draw.dt', () => customDataTable($wrpper));
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                  Draggable                                 */
/* -------------------------------------------------------------------------- */

const draggableInit = () => {
  const Selectors = {
    BODY: 'body',
    KANBAN_CONTAINER: '.kanban-container',
    KABNBAN_COLUMN: '.kanban-column',
    KANBAN_ITEMS_CONTAINER: '.kanban-items-container',
    KANBAN_ITEM: '.kanban-item',
    ADD_CARD_FORM: '.add-card-form'
  };
  const Events = {
    DRAG_START: 'drag:start',
    DRAG_STOP: 'drag:stop'
  };
  const ClassNames = {
    FORM_ADDED: 'form-added'
  };
  const columns = document.querySelectorAll(Selectors.KABNBAN_COLUMN);
  const columnContainers = document.querySelectorAll(Selectors.KANBAN_ITEMS_CONTAINER);
  const container = document.querySelector(Selectors.KANBAN_CONTAINER);
  if (!!columnContainers.length) {
    // Initialize Sortable
    const sortable = new window.Draggable.Sortable(columnContainers, {
      draggable: Selectors.KANBAN_ITEM,
      delay: 200,
      mirror: {
        appendTo: Selectors.BODY,
        constrainDimensions: true
      },
      scrollable: {
        draggable: Selectors.KANBAN_ITEM,
        scrollableElements: [...columnContainers, container]
      }
    });

    // Hide form when drag start
    sortable.on(Events.DRAG_START, () => {
      columns.forEach(column => {
        utils.hasClass(column, ClassNames.FORM_ADDED) && column.classList.remove(ClassNames.FORM_ADDED);
      });
    });

    // Place forms and other contents bottom of the sortable container
    sortable.on(Events.DRAG_STOP, ({
      data: {
        source: el
      }
    }) => {
      const columnContainer = el.closest(Selectors.KANBAN_ITEMS_CONTAINER);
      const form = columnContainer.querySelector(Selectors.ADD_CARD_FORM);
      !el.nextElementSibling && columnContainer.appendChild(form);
    });
  }
};

/*-----------------------------------------------
|   Dashboard Table dropdown
-----------------------------------------------*/
const dropdownMenuInit = () => {
  // Only for ios
  if (window.is.ios()) {
    const Event = {
      SHOWN_BS_DROPDOWN: 'shown.bs.dropdown',
      HIDDEN_BS_DROPDOWN: 'hidden.bs.dropdown'
    };
    const Selector = {
      TABLE_RESPONSIVE: '.table-responsive',
      DROPDOWN_MENU: '.dropdown-menu'
    };
    document.querySelectorAll(Selector.TABLE_RESPONSIVE).forEach(table => {
      table.addEventListener(Event.SHOWN_BS_DROPDOWN, e => {
        const t = e.currentTarget;
        if (t.scrollWidth > t.clientWidth) {
          t.style.paddingBottom = e.target.nextElementSibling.clientHeight + 'px';
        }
      });
      table.addEventListener(Event.HIDDEN_BS_DROPDOWN, e => {
        e.currentTarget.style.paddingBottom = '';
      });
    });
  }
};

// Reference
// https://github.com/twbs/bootstrap/issues/11037#issuecomment-274870381

/* -------------------------------------------------------------------------- */
/*                           Open dropdown on hover                           */
/* -------------------------------------------------------------------------- */

const dropdownOnHover = () => {
  const navbarArea = document.querySelector("[data-top-nav-dropdowns]");
  if (navbarArea) {
    navbarArea.addEventListener("mouseover", e => {
      if (e.target.className.includes("dropdown-toggle") && window.innerWidth > 992) {
        const dropdownInstance = new window.bootstrap.Dropdown(e.target);

        /* eslint-disable no-underscore-dangle */
        dropdownInstance._element.classList.add('show');
        dropdownInstance._menu.classList.add('show');
        dropdownInstance._menu.setAttribute('data-bs-popper', 'none');
        e.target.parentNode.addEventListener("mouseleave", () => {
          dropdownInstance.hide();
        });
      }
    });
  }
};

/* eslint-disable */

/*-----------------------------------------------
|   Dropzone
-----------------------------------------------*/

window.Dropzone ? window.Dropzone.autoDiscover = false : '';
const dropzoneInit = () => {
  const {
    merge
  } = window._;
  const Selector = {
    DROPZONE: '[data-dropzone]',
    DZ_ERROR_MESSAGE: '.dz-error-message',
    DZ_PREVIEW: '.dz-preview',
    DZ_PROGRESS: '.dz-preview .dz-preview-cover .dz-progress',
    DZ_PREVIEW_COVER: '.dz-preview .dz-preview-cover'
  };
  const ClassName = {
    DZ_FILE_PROCESSING: 'dz-file-processing',
    DZ_FILE_COMPLETE: 'dz-file-complete',
    DZ_COMPLETE: 'dz-complete',
    DZ_PROCESSING: 'dz-processing'
  };
  const DATA_KEY = {
    OPTIONS: 'options'
  };
  const Events = {
    ADDED_FILE: 'addedfile',
    REMOVED_FILE: 'removedfile',
    COMPLETE: 'complete'
  };
  const dropzones = document.querySelectorAll(Selector.DROPZONE);
  !!dropzones.length && dropzones.forEach(item => {
    let userOptions = utils.getData(item, DATA_KEY.OPTIONS);
    userOptions = userOptions ? userOptions : {};
    const data = userOptions.data ? userOptions.data : {};
    const options = merge({
      url: '/assets/php/',
      addRemoveLinks: false,
      previewsContainer: item.querySelector(Selector.DZ_PREVIEW),
      previewTemplate: item.querySelector(Selector.DZ_PREVIEW).innerHTML,
      thumbnailWidth: null,
      thumbnailHeight: null,
      maxFilesize: 20,
      autoProcessQueue: false,
      filesizeBase: 1000,
      init: function init() {
        const thisDropzone = this;
        if (data.length) {
          data.forEach(v => {
            const mockFile = {
              name: v.name,
              size: v.size
            };
            thisDropzone.options.addedfile.call(thisDropzone, mockFile);
            thisDropzone.options.thumbnail.call(thisDropzone, mockFile, `${v.url}/${v.name}`);
          });
        }
        thisDropzone.on(Events.ADDED_FILE, function addedfile() {
          if ('maxFiles' in userOptions) {
            if (userOptions.maxFiles === 1 && item.querySelectorAll(Selector.DZ_PREVIEW_COVER).length > 1) {
              item.querySelector(Selector.DZ_PREVIEW_COVER).remove();
            }
            if (userOptions.maxFiles === 1 && this.files.length > 1) {
              this.removeFile(this.files[0]);
            }
          }
        });
      },
      error(file, message) {
        if (file.previewElement) {
          file.previewElement.classList.add('dz-error');
          if (typeof message !== 'string' && message.error) {
            message = message.error;
          }
          for (let node of file.previewElement.querySelectorAll('[data-dz-errormessage]')) {
            node.textContent = message;
          }
        }
      }
    }, userOptions);
    // eslint-disable-next-line
    item.querySelector(Selector.DZ_PREVIEW).innerHTML = '';
    const dropzone = new window.Dropzone(item, options);
    dropzone.on(Events.ADDED_FILE, () => {
      if (item.querySelector(Selector.DZ_PREVIEW_COVER)) {
        item.querySelector(Selector.DZ_PREVIEW_COVER).classList.remove(ClassName.DZ_FILE_COMPLETE);
      }
      item.classList.add(ClassName.DZ_FILE_PROCESSING);
    });
    dropzone.on(Events.REMOVED_FILE, () => {
      if (item.querySelector(Selector.DZ_PREVIEW_COVER)) {
        item.querySelector(Selector.DZ_PREVIEW_COVER).classList.remove(ClassName.DZ_PROCESSING);
      }
      item.classList.add(ClassName.DZ_FILE_COMPLETE);
    });
    dropzone.on(Events.COMPLETE, () => {
      if (item.querySelector(Selector.DZ_PREVIEW_COVER)) {
        item.querySelector(Selector.DZ_PREVIEW_COVER).classList.remove(ClassName.DZ_PROCESSING);
      }
      item.classList.add(ClassName.DZ_FILE_COMPLETE);
    });
  });
};

/* -------------------------------------------------------------------------- */
/*                                Emoji Button                                */
/* -------------------------------------------------------------------------- */

const picker = new EmojiButton({
  style: window.is.windows() ? "twemoji" : "native",
  showPreview: false,
  zIndex: 1,
  autoFocusSearch: false
});
const emojiButtons = document.querySelectorAll("[data-emoji-button]");
emojiButtons.forEach(button => {
  button.addEventListener("click", ({
    currentTarget
  }) => {
    picker.togglePicker(currentTarget);
    localStorage.getItem("theme") === "dark" ? picker.setTheme("dark") : picker.setTheme("light");
  });
});
window.picker = picker;

/* -------------------------------------------------------------------------- */
/*                               from-validation                              */
/* -------------------------------------------------------------------------- */

const formValidationInit = () => {
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    }, false);
  });
};

/* -------------------------------------------------------------------------- */
/*                                FullCalendar                                */
/* -------------------------------------------------------------------------- */

const {
  merge
} = window._;
const renderCalendar = (el, option) => {
  const options = merge({
    initialView: 'dayGridMonth',
    editable: true,
    direction: document.querySelector('html').getAttribute('dir'),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    buttonText: {
      month: 'Month',
      week: 'Week',
      day: 'Day'
    }
  }, option);
  const calendar = new window.FullCalendar.Calendar(el, options);
  calendar.render();
  document.querySelector('.navbar-vertical-toggle')?.addEventListener('navbar.vertical.toggle', () => calendar.updateSize());
  return calendar;
};
const fullCalendarInit = () => {
  const calendars = document.querySelectorAll('[data-calendar]');
  calendars.forEach(item => {
    const options = utils.getData(item, 'calendar');
    renderCalendar(item, options);
  });
};
const fullCalendar = {
  renderCalendar,
  fullCalendarInit
};

/* -------------------------------------------------------------------------- */
/*                                 Glightbox                                */
/* -------------------------------------------------------------------------- */

const glightboxInit = () => {
  if (window.GLightbox) {
    window.GLightbox({
      selector: '[data-gallery]'
    });
  }
};

/*-----------------------------------------------
|   Gooogle Map
-----------------------------------------------*/

function initMap() {
  const themeController = document.body;
  const $googlemaps = document.querySelectorAll('.googlemap');
  if ($googlemaps.length && window.google) {
    // Visit https://snazzymaps.com/ for more themes
    const mapStyles = {
      Default: [{
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#e9e9e9'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{
          color: '#f5f5f5'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#ffffff'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#ffffff'
        }, {
          lightness: 29
        }, {
          weight: 0.2
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
          color: '#ffffff'
        }, {
          lightness: 18
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          color: '#ffffff'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          color: '#f5f5f5'
        }, {
          lightness: 21
        }]
      }, {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{
          color: '#dedede'
        }, {
          lightness: 21
        }]
      }, {
        elementType: 'labels.text.stroke',
        stylers: [{
          visibility: 'on'
        }, {
          color: '#ffffff'
        }, {
          lightness: 16
        }]
      }, {
        elementType: 'labels.text.fill',
        stylers: [{
          saturation: 36
        }, {
          color: '#333333'
        }, {
          lightness: 40
        }]
      }, {
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          color: '#f2f2f2'
        }, {
          lightness: 19
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#fefefe'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#fefefe'
        }, {
          lightness: 17
        }, {
          weight: 1.2
        }]
      }],
      Gray: [{
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{
          saturation: 36
        }, {
          color: '#000000'
        }, {
          lightness: 40
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{
          visibility: 'on'
        }, {
          color: '#000000'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 17
        }, {
          weight: 1.2
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 21
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 29
        }, {
          weight: 0.2
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 18
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 19
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 17
        }]
      }],
      Midnight: [{
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#ffffff'
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 13
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#144b53'
        }, {
          lightness: 14
        }, {
          weight: 1.4
        }]
      }, {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [{
          color: '#08304b'
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          color: '#0c4152'
        }, {
          lightness: 5
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#0b434f'
        }, {
          lightness: 25
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#0b3d51'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }]
      }, {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{
          color: '#146474'
        }]
      }, {
        featureType: 'water',
        elementType: 'all',
        stylers: [{
          color: '#021019'
        }]
      }],
      Hopper: [{
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          hue: '#165c64'
        }, {
          saturation: 34
        }, {
          lightness: -69
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{
          hue: '#b7caaa'
        }, {
          saturation: -14
        }, {
          lightness: -18
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'landscape.man_made',
        elementType: 'all',
        stylers: [{
          hue: '#cbdac1'
        }, {
          saturation: -6
        }, {
          lightness: -9
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
          hue: '#8d9b83'
        }, {
          saturation: -89
        }, {
          lightness: -12
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
          hue: '#d4dad0'
        }, {
          saturation: -88
        }, {
          lightness: 54
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
          hue: '#bdc5b6'
        }, {
          saturation: -89
        }, {
          lightness: -3
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          hue: '#bdc5b6'
        }, {
          saturation: -89
        }, {
          lightness: -26
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          hue: '#c17118'
        }, {
          saturation: 61
        }, {
          lightness: -45
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'poi.park',
        elementType: 'all',
        stylers: [{
          hue: '#8ba975'
        }, {
          saturation: -46
        }, {
          lightness: -28
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          hue: '#a43218'
        }, {
          saturation: 74
        }, {
          lightness: -51
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'administrative.province',
        elementType: 'all',
        stylers: [{
          hue: '#ffffff'
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'administrative.neighborhood',
        elementType: 'all',
        stylers: [{
          hue: '#ffffff'
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative.locality',
        elementType: 'labels',
        stylers: [{
          hue: '#ffffff'
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative.land_parcel',
        elementType: 'all',
        stylers: [{
          hue: '#ffffff'
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'all',
        stylers: [{
          hue: '#3a3935'
        }, {
          saturation: 5
        }, {
          lightness: -57
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'poi.medical',
        elementType: 'geometry',
        stylers: [{
          hue: '#cba923'
        }, {
          saturation: 50
        }, {
          lightness: -46
        }, {
          visibility: 'on'
        }]
      }],
      Beard: [{
        featureType: 'poi.business',
        elementType: 'labels.text',
        stylers: [{
          visibility: 'on'
        }, {
          color: '#333333'
        }]
      }],
      AssassianCreed: [{
        featureType: 'all',
        elementType: 'all',
        stylers: [{
          visibility: 'on'
        }]
      }, {
        featureType: 'all',
        elementType: 'labels',
        stylers: [{
          visibility: 'off'
        }, {
          saturation: '-100'
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{
          saturation: 36
        }, {
          color: '#000000'
        }, {
          lightness: 40
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{
          visibility: 'off'
        }, {
          color: '#000000'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 17
        }, {
          weight: 1.2
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'landscape.natural',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          lightness: 21
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
          visibility: 'on'
        }, {
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#7f8d89'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#7f8d89'
        }, {
          lightness: 29
        }, {
          weight: 0.2
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 18
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 19
        }]
      }, {
        featureType: 'water',
        elementType: 'all',
        stylers: [{
          color: '#2b3638'
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#2b3638'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#24282b'
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#24282b'
        }]
      }, {
        featureType: 'water',
        elementType: 'labels',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'water',
        elementType: 'labels.text',
        stylers: [{
          visibility: 'off '
        }]
      }, {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'water',
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }]
      }],
      SubtleGray: [{
        featureType: 'administrative',
        elementType: 'all',
        stylers: [{
          saturation: '-100'
        }]
      }, {
        featureType: 'administrative.province',
        elementType: 'all',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [{
          saturation: -100
        }, {
          lightness: 65
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'poi',
        elementType: 'all',
        stylers: [{
          saturation: -100
        }, {
          lightness: '50'
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'road',
        elementType: 'all',
        stylers: [{
          saturation: -100
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'all',
        stylers: [{
          visibility: 'simplified'
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'all',
        stylers: [{
          lightness: '30'
        }]
      }, {
        featureType: 'road.local',
        elementType: 'all',
        stylers: [{
          lightness: '40'
        }]
      }, {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{
          saturation: -100
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          hue: '#ffff00'
        }, {
          lightness: -25
        }, {
          saturation: -97
        }]
      }, {
        featureType: 'water',
        elementType: 'labels',
        stylers: [{
          lightness: -25
        }, {
          saturation: -100
        }]
      }],
      Tripitty: [{
        featureType: 'all',
        elementType: 'labels',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'all',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [{
          color: '#2c5ca5'
        }]
      }, {
        featureType: 'poi',
        elementType: 'all',
        stylers: [{
          color: '#2c5ca5'
        }]
      }, {
        featureType: 'road',
        elementType: 'all',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'water',
        elementType: 'all',
        stylers: [{
          color: '#193a70'
        }, {
          visibility: 'on'
        }]
      }],
      Cobalt: [{
        featureType: 'all',
        elementType: 'all',
        stylers: [{
          invert_lightness: true
        }, {
          saturation: 10
        }, {
          lightness: 30
        }, {
          gamma: 0.5
        }, {
          hue: '#435158'
        }]
      }]
    };
    $googlemaps.forEach(itm => {
      const latLng = utils.getData(itm, 'latlng').split(',');
      const markerPopup = itm.innerHTML;
      const icon = utils.getData(itm, 'icon') ? utils.getData(itm, 'icon') : 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png';
      const zoom = utils.getData(itm, 'zoom');
      const mapElement = itm;
      const mapStyle = utils.getData(itm, 'theme');
      if (utils.getData(itm, 'theme') === 'streetview') {
        const pov = utils.getData(itm, 'pov');
        const mapOptions = {
          position: {
            lat: Number(latLng[0]),
            lng: Number(latLng[1])
          },
          pov,
          zoom,
          gestureHandling: 'none',
          scrollwheel: false
        };
        return new window.google.maps.StreetViewPanorama(mapElement, mapOptions);
      }
      const mapOptions = {
        zoom,
        scrollwheel: utils.getData(itm, 'scrollwheel'),
        center: new window.google.maps.LatLng(latLng[0], latLng[1]),
        styles: localStorage.getItem('theme') === 'dark' ? mapStyles.Cobalt : mapStyles[mapStyle]
      };
      const map = new window.google.maps.Map(mapElement, mapOptions);
      const infowindow = new window.google.maps.InfoWindow({
        content: markerPopup
      });
      const marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(latLng[0], latLng[1]),
        icon,
        map
      });
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
      themeController && themeController.addEventListener('clickControl', ({
        detail: {
          control,
          value
        }
      }) => {
        if (control === 'theme') {
          map.set('styles', value === 'dark' ? mapStyles.Cobalt : mapStyles[mapStyle]);
        }
      });
      return null;
    });
  }
}
const hideOnCollapseInit = () => {
  const previewMailForm = document.querySelector('#previewMailForm');
  const previewFooter = document.querySelector('#preview-footer');
  if (previewMailForm) {
    previewMailForm.addEventListener("show.bs.collapse", () => {
      previewFooter.classList.add("d-none");
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                           Icon copy to clipboard                           */
/* -------------------------------------------------------------------------- */

const iconCopiedInit = () => {
  const iconList = document.getElementById("icon-list");
  const iconCopiedToast = document.getElementById("icon-copied-toast");
  const iconCopiedToastInstance = new window.bootstrap.Toast(iconCopiedToast);
  if (iconList) {
    iconList.addEventListener("click", e => {
      const el = e.target;
      if (el.tagName === "INPUT") {
        el.select();
        el.setSelectionRange(0, 99999);
        document.execCommand("copy");
        iconCopiedToast.querySelector(".toast-body").innerHTML = `<span class="fw-black">Copied:</span> <code>${el.value}</code>`;
        iconCopiedToastInstance.show();
      }
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                   Inputmask                                */
/* -------------------------------------------------------------------------- */
const inputmaskInit = () => {
  if (window.Inputmask) {
    const elements = document.querySelectorAll('[data-input-mask]');
    elements.forEach(item => {
      const userOptions = utils.getData(item, 'input-mask');
      const defaultOptions = {
        showMaskOnFocus: false,
        showMaskOnHover: false,
        jitMasking: true
      };
      const maskOptions = window._.merge(defaultOptions, userOptions);
      const inputmask = new window.Inputmask({
        ...maskOptions
      }).mask(item);
      return inputmask;
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                   Kanbah                                   */
/* -------------------------------------------------------------------------- */

const kanbanInit = () => {
  const Selectors = {
    KANBAN_COLUMN: '.kanban-column',
    KANBAN_ITEMS_CONTAINER: '.kanban-items-container',
    BTN_ADD_CARD: '.btn-add-card',
    COLLAPSE: '.collapse',
    ADD_LIST_FORM: '#addListForm',
    BTN_COLLAPSE_DISMISS: '[data-dismiss="collapse"]',
    BTN_FORM_HIDE: '[data-btn-form="hide"]',
    INPUT_ADD_CARD: '[data-input="add-card"]',
    INPUT_ADD_LIST: '[data-input="add-list"]'
  };
  const ClassNames = {
    FORM_ADDED: 'form-added',
    D_NONE: 'd-none'
  };
  const Events = {
    CLICK: 'click',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    SHOWN_BS_COLLAPSE: 'shown.bs.collapse'
  };
  const addCardButtons = document.querySelectorAll(Selectors.BTN_ADD_CARD);
  const formHideButtons = document.querySelectorAll(Selectors.BTN_FORM_HIDE);
  const addListForm = document.querySelector(Selectors.ADD_LIST_FORM);
  const collapseDismissButtons = document.querySelectorAll(Selectors.BTN_COLLAPSE_DISMISS);

  // Show add card form and place scrollbar bottom of the list
  addCardButtons && addCardButtons.forEach(button => {
    button.addEventListener(Events.CLICK, ({
      currentTarget: el
    }) => {
      const column = el.closest(Selectors.KANBAN_COLUMN);
      const container = column.querySelector(Selectors.KANBAN_ITEMS_CONTAINER);
      const scrollHeight = container.scrollHeight;
      column.classList.add(ClassNames.FORM_ADDED);
      container.querySelector(Selectors.INPUT_ADD_CARD).focus();
      container.scrollTo({
        top: scrollHeight
      });
    });
  });

  // Remove add card form
  formHideButtons.forEach(button => {
    button.addEventListener(Events.CLICK, ({
      currentTarget: el
    }) => {
      el.closest(Selectors.KANBAN_COLUMN).classList.remove(ClassNames.FORM_ADDED);
    });
  });
  if (addListForm) {
    // Hide add list button when the form is going to show
    addListForm.addEventListener(Events.SHOW_BS_COLLAPSE, ({
      currentTarget: el
    }) => {
      const nextElement = el.nextElementSibling;
      nextElement && nextElement.classList.add(ClassNames.D_NONE);
    });

    // Focus input field when the form is shown
    addListForm.addEventListener(Events.SHOWN_BS_COLLAPSE, ({
      currentTarget: el
    }) => {
      el.querySelector(Selectors.INPUT_ADD_LIST).focus();
    });
  }

  // Hide add list form when the dismiss button is clicked
  collapseDismissButtons.forEach(button => {
    button.addEventListener(Events.CLICK, ({
      currentTarget: el
    }) => {
      const collapseElement = el.closest(Selectors.COLLAPSE);
      const collapse = window.bootstrap.Collapse.getInstance(collapseElement);
      utils.hasClass(collapseElement.nextElementSibling, ClassNames.D_NONE) && collapseElement.nextElementSibling.classList.remove(ClassNames.D_NONE);
      collapse.hide();
    });
  });
};

/* -------------------------------------------------------------------------- */
/*                                   leaflet                                  */
/* -------------------------------------------------------------------------- */

const leafletActiveUserInit = () => {
  const points = [{
    lat: 53.958332,
    long: -1.080278,
    name: 'Diana Meyer',
    street: 'Slude Strand 27',
    location: '1130 Kobenhavn'
  }, {
    lat: 52.958332,
    long: -1.080278,
    name: 'Diana Meyer',
    street: 'Slude Strand 27',
    location: '1130 Kobenhavn'
  }, {
    lat: 51.958332,
    long: -1.080278,
    name: 'Diana Meyer',
    street: 'Slude Strand 27',
    location: '1130 Kobenhavn'
  }, {
    lat: 53.958332,
    long: -1.080278,
    name: 'Diana Meyer',
    street: 'Slude Strand 27',
    location: '1130 Kobenhavn'
  }, {
    lat: 54.958332,
    long: -1.080278,
    name: 'Diana Meyer',
    street: 'Slude Strand 27',
    location: '1130 Kobenhavn'
  }, {
    lat: 55.958332,
    long: -1.080278,
    name: 'Diana Meyer',
    street: 'Slude Strand 27',
    location: '1130 Kobenhavn'
  }, {
    lat: 53.908332,
    long: -1.080278,
    name: 'Diana Meyer',
    street: 'Slude Strand 27',
    location: '1130 Kobenhavn'
  }, {
    lat: 53.008332,
    long: -1.080278,
    name: 'Diana Meyer',
    street: 'Slude Strand 27',
    location: '1130 Kobenhavn'
  }, {
    lat: 53.158332,
    long: -1.080278,
    name: 'Diana Meyer',
    street: 'Slude Strand 27',
    location: '1130 Kobenhavn'
  }, {
    lat: 53.000032,
    long: -1.080278,
    name: 'Diana Meyer',
    street: 'Slude Strand 27',
    location: '1130 Kobenhavn'
  }, {
    lat: 52.292001,
    long: -2.22,
    name: 'Anke Schroder',
    street: 'Industrivej 54',
    location: '4140 Borup'
  }, {
    lat: 52.392001,
    long: -2.22,
    name: 'Anke Schroder',
    street: 'Industrivej 54',
    location: '4140 Borup'
  }, {
    lat: 51.492001,
    long: -2.22,
    name: 'Anke Schroder',
    street: 'Industrivej 54',
    location: '4140 Borup'
  }, {
    lat: 51.192001,
    long: -2.22,
    name: 'Anke Schroder',
    street: 'Industrivej 54',
    location: '4140 Borup'
  }, {
    lat: 52.292001,
    long: -2.22,
    name: 'Anke Schroder',
    street: 'Industrivej 54',
    location: '4140 Borup'
  }, {
    lat: 54.392001,
    long: -2.22,
    name: 'Anke Schroder',
    street: 'Industrivej 54',
    location: '4140 Borup'
  }, {
    lat: 51.292001,
    long: -2.22,
    name: 'Anke Schroder',
    street: 'Industrivej 54',
    location: '4140 Borup'
  }, {
    lat: 52.102001,
    long: -2.22,
    name: 'Anke Schroder',
    street: 'Industrivej 54',
    location: '4140 Borup'
  }, {
    lat: 52.202001,
    long: -2.22,
    name: 'Anke Schroder',
    street: 'Industrivej 54',
    location: '4140 Borup'
  }, {
    lat: 51.063202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 51.363202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 51.463202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 51.563202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 51.763202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 51.863202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 51.963202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 51.000202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 51.000202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 51.163202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 52.263202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 53.463202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 55.163202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 56.263202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 56.463202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 56.563202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 56.663202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 56.763202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 56.863202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 56.963202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 57.973202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 57.163202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 51.163202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 51.263202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 51.363202,
    long: -1.308,
    name: 'Tobias Vogel',
    street: 'Mollebakken 33',
    location: '3650 Olstykke'
  }, {
    lat: 51.409,
    long: -2.647,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.68,
    long: -1.49,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 50.259998,
    long: -5.051,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 54.906101,
    long: -1.38113,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.383331,
    long: -1.466667,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.483002,
    long: -2.2931,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 51.509865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 51.109865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 51.209865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 51.309865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 51.409865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 51.609865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 51.709865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 51.809865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 51.909865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 52.109865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 52.209865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 52.309865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 52.409865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 52.509865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 52.609865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 52.709865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 52.809865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 52.909865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 52.519865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 52.529865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 52.539865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.549865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 52.549865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.109865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.209865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.319865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.329865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.409865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.559865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.619865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.629865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.639865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.649865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.669865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.669865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.719865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.739865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.749865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.759865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.769865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.769865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.819865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.829865,
    long: -0.118092,
    name: 'Richard Hendricks',
    street: '37 Seafield Place',
    location: 'London'
  }, {
    lat: 53.483959,
    long: -2.244644,
    name: 'Ethel B. Brooks',
    street: '2576 Sun Valley Road'
  }, {
    lat: 40.737,
    long: -73.923,
    name: 'Marshall D. Lewis',
    street: '1489 Michigan Avenue',
    location: 'Michigan'
  }, {
    lat: 39.737,
    long: -73.923,
    name: 'Marshall D. Lewis',
    street: '1489 Michigan Avenue',
    location: 'Michigan'
  }, {
    lat: 38.737,
    long: -73.923,
    name: 'Marshall D. Lewis',
    street: '1489 Michigan Avenue',
    location: 'Michigan'
  }, {
    lat: 37.737,
    long: -73.923,
    name: 'Marshall D. Lewis',
    street: '1489 Michigan Avenue',
    location: 'Michigan'
  }, {
    lat: 40.737,
    long: -73.923,
    name: 'Marshall D. Lewis',
    street: '1489 Michigan Avenue',
    location: 'Michigan'
  }, {
    lat: 41.737,
    long: -73.923,
    name: 'Marshall D. Lewis',
    street: '1489 Michigan Avenue',
    location: 'Michigan'
  }, {
    lat: 42.737,
    long: -73.923,
    name: 'Marshall D. Lewis',
    street: '1489 Michigan Avenue',
    location: 'Michigan'
  }, {
    lat: 43.737,
    long: -73.923,
    name: 'Marshall D. Lewis',
    street: '1489 Michigan Avenue',
    location: 'Michigan'
  }, {
    lat: 44.737,
    long: -73.923,
    name: 'Marshall D. Lewis',
    street: '1489 Michigan Avenue',
    location: 'Michigan'
  }, {
    lat: 45.737,
    long: -73.923,
    name: 'Marshall D. Lewis',
    street: '1489 Michigan Avenue',
    location: 'Michigan'
  }, {
    lat: 46.7128,
    long: 74.006,
    name: 'Elizabeth C. Lyons',
    street: '4553 Kenwood Place',
    location: 'Fort Lauderdale'
  }, {
    lat: 40.7128,
    long: 74.1181,
    name: 'Elizabeth C. Lyons',
    street: '4553 Kenwood Place',
    location: 'Fort Lauderdale'
  }, {
    lat: 14.235,
    long: 51.9253,
    name: 'Ralph D. Wylie',
    street: '3186 Levy Court',
    location: 'North Reading'
  }, {
    lat: 15.235,
    long: 51.9253,
    name: 'Ralph D. Wylie',
    street: '3186 Levy Court',
    location: 'North Reading'
  }, {
    lat: 16.235,
    long: 51.9253,
    name: 'Ralph D. Wylie',
    street: '3186 Levy Court',
    location: 'North Reading'
  }, {
    lat: 14.235,
    long: 51.9253,
    name: 'Ralph D. Wylie',
    street: '3186 Levy Court',
    location: 'North Reading'
  }, {
    lat: 15.8267,
    long: 47.9218,
    name: 'Hope A. Atkins',
    street: '3715 Hillcrest Drive',
    location: 'Seattle'
  }, {
    lat: 15.9267,
    long: 47.9218,
    name: 'Hope A. Atkins',
    street: '3715 Hillcrest Drive',
    location: 'Seattle'
  }, {
    lat: 23.4425,
    long: 58.4438,
    name: 'Samuel R. Bailey',
    street: '2883 Raoul Wallenberg Place',
    location: 'Cheshire'
  }, {
    lat: 23.5425,
    long: 58.3438,
    name: 'Samuel R. Bailey',
    street: '2883 Raoul Wallenberg Place',
    location: 'Cheshire'
  }, {
    lat: -37.8927369333,
    long: 175.4087452333,
    name: 'Samuel R. Bailey',
    street: '3228 Glory Road',
    location: 'Nashville'
  }, {
    lat: -38.9064188833,
    long: 175.4441556833,
    name: 'Samuel R. Bailey',
    street: '3228 Glory Road',
    location: 'Nashville'
  }, {
    lat: -12.409874,
    long: -65.596832,
    name: 'Ann J. Perdue',
    street: '921 Ella Street',
    location: 'Dublin'
  }, {
    lat: -22.090887,
    long: -57.411827,
    name: 'Jorge C. Woods',
    street: '4800 North Bend River Road',
    location: 'Allen'
  }, {
    lat: -19.019585,
    long: -65.261963,
    name: 'Russ E. Panek',
    street: '4068 Hartland Avenue',
    location: 'Appleton'
  }, {
    lat: -16.500093,
    long: -68.214684,
    name: 'Russ E. Panek',
    street: '4068 Hartland Avenue',
    location: 'Appleton'
  }, {
    lat: -17.413977,
    long: -66.165321,
    name: 'Russ E. Panek',
    street: '4068 Hartland Avenue',
    location: 'Appleton'
  }, {
    lat: -16.489689,
    long: -68.119293,
    name: 'Russ E. Panek',
    street: '4068 Hartland Avenue',
    location: 'Appleton'
  }, {
    lat: 54.766323,
    long: 3.08603729,
    name: 'Russ E. Panek',
    street: '4068 Hartland Avenue',
    location: 'Appleton'
  }, {
    lat: 54.866323,
    long: 3.08603729,
    name: 'Russ E. Panek',
    street: '4068 Hartland Avenue',
    location: 'Appleton'
  }, {
    lat: 49.537685,
    long: 3.08603729,
    name: 'Russ E. Panek',
    street: '4068 Hartland Avenue',
    location: 'Appleton'
  }, {
    lat: 54.715424,
    long: 0.509207,
    name: 'Russ E. Panek',
    street: '4068 Hartland Avenue',
    location: 'Appleton'
  }, {
    lat: 44.891666,
    long: 10.136665,
    name: 'Russ E. Panek',
    street: '4068 Hartland Avenue',
    location: 'Appleton'
  }, {
    lat: 48.078335,
    long: 14.535004,
    name: 'Russ E. Panek',
    street: '4068 Hartland Avenue',
    location: 'Appleton'
  }, {
    lat: -26.358055,
    long: 27.398056,
    name: 'Russ E. Panek',
    street: '4068 Hartland Avenue',
    location: 'Appleton'
  }, {
    lat: -29.1,
    long: 26.2167,
    name: 'Wilbur J. Dry',
    street: '2043 Jadewood Drive',
    location: 'Northbrook'
  }, {
    lat: -29.883333,
    long: 31.049999,
    name: 'Wilbur J. Dry',
    street: '2043 Jadewood Drive',
    location: 'Northbrook'
  }, {
    lat: -26.266111,
    long: 27.865833,
    name: 'Wilbur J. Dry',
    street: '2043 Jadewood Drive',
    location: 'Northbrook'
  }, {
    lat: -29.087217,
    long: 26.154898,
    name: 'Wilbur J. Dry',
    street: '2043 Jadewood Drive',
    location: 'Northbrook'
  }, {
    lat: -33.958252,
    long: 25.619022,
    name: 'Wilbur J. Dry',
    street: '2043 Jadewood Drive',
    location: 'Northbrook'
  }, {
    lat: -33.977074,
    long: 22.457581,
    name: 'Wilbur J. Dry',
    street: '2043 Jadewood Drive',
    location: 'Northbrook'
  }, {
    lat: -26.563404,
    long: 27.844164,
    name: 'Wilbur J. Dry',
    street: '2043 Jadewood Drive',
    location: 'Northbrook'
  }, {
    lat: 51.21389,
    long: -102.462776,
    name: 'Joseph B. Poole',
    street: '3364 Lunetta Street',
    location: 'Wichita Falls'
  }, {
    lat: 52.321945,
    long: -106.584167,
    name: 'Joseph B. Poole',
    street: '3364 Lunetta Street',
    location: 'Wichita Falls'
  }, {
    lat: 50.288055,
    long: -107.793892,
    name: 'Joseph B. Poole',
    street: '3364 Lunetta Street',
    location: 'Wichita Falls'
  }, {
    lat: 52.7575,
    long: -108.28611,
    name: 'Joseph B. Poole',
    street: '3364 Lunetta Street',
    location: 'Wichita Falls'
  }, {
    lat: 50.393333,
    long: -105.551941,
    name: 'Joseph B. Poole',
    street: '3364 Lunetta Street',
    location: 'Wichita Falls'
  }, {
    lat: 50.930557,
    long: -102.807777,
    name: 'Joseph B. Poole',
    street: '3364 Lunetta Street',
    location: 'Wichita Falls'
  }, {
    lat: 52.856388,
    long: -104.610001,
    name: 'Joseph B. Poole',
    street: '3364 Lunetta Street',
    location: 'Wichita Falls'
  }, {
    lat: 52.289722,
    long: -106.666664,
    name: 'Joseph B. Poole',
    street: '3364 Lunetta Street',
    location: 'Wichita Falls'
  }, {
    lat: 52.201942,
    long: -105.123055,
    name: 'Joseph B. Poole',
    street: '3364 Lunetta Street',
    location: 'Wichita Falls'
  }, {
    lat: 53.278046,
    long: -110.00547,
    name: 'Joseph B. Poole',
    street: '3364 Lunetta Street',
    location: 'Wichita Falls'
  }, {
    lat: 49.13673,
    long: -102.990959,
    name: 'Joseph B. Poole',
    street: '3364 Lunetta Street',
    location: 'Wichita Falls'
  }, {
    lat: 45.484531,
    long: -73.597023,
    name: 'Claudette D. Nowakowski',
    street: '3742 Farland Avenue',
    location: 'San Antonio'
  }, {
    lat: 45.266666,
    long: -71.900002,
    name: 'Claudette D. Nowakowski',
    street: '3742 Farland Avenue',
    location: 'San Antonio'
  }, {
    lat: 45.349998,
    long: -72.51667,
    name: 'Claudette D. Nowakowski',
    street: '3742 Farland Avenue',
    location: 'San Antonio'
  }, {
    lat: 47.333332,
    long: -79.433334,
    name: 'Claudette D. Nowakowski',
    street: '3742 Farland Avenue',
    location: 'San Antonio'
  }, {
    lat: 45.400002,
    long: -74.033333,
    name: 'Claudette D. Nowakowski',
    street: '3742 Farland Avenue',
    location: 'San Antonio'
  }, {
    lat: 45.683334,
    long: -73.433334,
    name: 'Claudette D. Nowakowski',
    street: '3742 Farland Avenue',
    location: 'San Antonio'
  }, {
    lat: 48.099998,
    long: -77.783333,
    name: 'Claudette D. Nowakowski',
    street: '3742 Farland Avenue',
    location: 'San Antonio'
  }, {
    lat: 45.5,
    long: -72.316666,
    name: 'Claudette D. Nowakowski',
    street: '3742 Farland Avenue',
    location: 'San Antonio'
  }, {
    lat: 46.349998,
    long: -72.550003,
    name: 'Claudette D. Nowakowski',
    street: '3742 Farland Avenue',
    location: 'San Antonio'
  }, {
    lat: 48.119999,
    long: -69.18,
    name: 'Claudette D. Nowakowski',
    street: '3742 Farland Avenue',
    location: 'San Antonio'
  }, {
    lat: 45.599998,
    long: -75.25,
    name: 'Claudette D. Nowakowski',
    street: '3742 Farland Avenue',
    location: 'San Antonio'
  }, {
    lat: 46.099998,
    long: -71.300003,
    name: 'Claudette D. Nowakowski',
    street: '3742 Farland Avenue',
    location: 'San Antonio'
  }, {
    lat: 45.700001,
    long: -73.633331,
    name: 'Claudette D. Nowakowski',
    street: '3742 Farland Avenue',
    location: 'San Antonio'
  }, {
    lat: 47.68,
    long: -68.879997,
    name: 'Claudette D. Nowakowski',
    street: '3742 Farland Avenue',
    location: 'San Antonio'
  }, {
    lat: 46.716667,
    long: -79.099998,
    name: '299'
  }, {
    lat: 45.016666,
    long: -72.099998,
    name: '299'
  }];
  const {
    L
  } = window;
  const mapContainer = document.getElementById('map');
  if (L && mapContainer) {
    const getFilterColor = () => localStorage.getItem('theme') === 'dark' ? ['invert:98%', 'grayscale:69%', 'bright:89%', 'contrast:111%', 'hue:205deg', 'saturate:1000%'] : ['bright:101%', 'contrast:101%', 'hue:23deg', 'saturate:225%'];
    const tileLayerTheme = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    const tiles = L.tileLayer.colorFilter(tileLayerTheme, {
      attribution: null,
      transparent: true,
      filter: getFilterColor()
    });
    const map = L.map('map', {
      center: L.latLng(10.737, 0),
      zoom: 0,
      layers: [tiles],
      minZoom: 1.3,
      zoomSnap: 0.5,
      dragging: !L.Browser.mobile,
      tap: !L.Browser.mobile
    });
    const mcg = L.markerClusterGroup({
      chunkedLoading: false,
      spiderfyOnMaxZoom: false
    });
    points.map(point => {
      const {
        name,
        location,
        street
      } = point;
      const icon = L.icon({
        iconUrl: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAACXBIWXMAAAFgAAABYAEg2RPaAAADpElEQVRYCZ1XS1LbQBBtybIdiMEJKSpUqihgEW/xDdARyAnirOIl3MBH8NK7mBvkBpFv4Gy9IRSpFIQiRPyNfqkeZkY9HwmFt7Lm06+7p/vN2MmyDIrQ6QebALAHAD4AbFuWfQeAAACGs5H/w5jlsJJw4wMA+GhMFuMA99jIDJJOP+ihZwDQFmNuowWO1wS3viDXpdEdZPEc0odruj0EgN5s5H8tJOEEX8R3rbkMtcU34NTqhe5nSQTJ7Tkk80s6/Gk28scGiULguFBffgdufdEwWoQ0uoXo8hdAlooVH0REjISfwZSlyHGh0V5n6aHAtKTxXI5g6nQnMH0P4bEgwtR18Yw8Pj8QZ4ARUAI0Hl+fQZZGisGEBVwHr7XKzox57DXZ/ij8Cdwe2u057z9/wygOxRl4S2vSUHx1oucaMQGAHTrgtdag9mK5aN+Wx/uAAQ9Zenp/SRce4TpaNbQK4+sTcGqeTB/aIXv3XN5oj2VKqii++U0JunpZ8urxee4hvjqVc2hHpBDXuKKT9XMgVYJ1/1fPGSeaikzgmWWkMIi9bVf8UhotXxzORn5gWFchI8QyttlzjS0qpsaIGY2MMsujV/AUSdcY0dDpB6/EiOPYzclR1CI5mOez3ekHvrFLxa7cR5pTscfrXjk0Vhm5V2PqLUWnH3R5GbPGpMVD7E1ckXesKBQ7AS/vmQ1c0+kHuxpBj98lTCm8pbc5QRJRdZ6qHb/wGryXq3Lxszv+5gySuwvxueXySwYvHEjuQ9ofTGKYlrmK1EsCHMd5SoD7mZ1HHFCBHLNbMEshvrugqWLn01hpVVJhFgVGkDvK7hR6n2B+d9C7xsqWsbkqHv4cCsWezEb+o2SR+SFweUBxfA5wH7kShjKt2vWL57Px3GhIFEezkb8pxvUWHYhotAfCk2AtkEcxoOttrxUWDR5svb1emSQKj0WXK1HYIgFREbiBqmoZcB2RkbE+byMZiosorVgAZF1ID7yQhEs38wa7nUqNDezdlavC2HbBGSQkGgZ8uJVBmzeiKCRRpEa9ilWghORVeGB7BxeSKF5xqbFBkxBrFKUk/JHA7ppENQaCnCjthK+3opCEYyANztXmZN858cDYWSUSHk3A311GAZDvo6deNKUk1EsqnJoQlkYBNlmxQZeaMgmxoUokICoHDce351RCCiuKoirJWEgNOYvQplM2VCLhUqF7jf94rW9kHVUjQeheV4riv0i4ZOzzz/2y/+0KAOAfr4EE4HpCFhwAAAAASUVORK5CYII=
        `
      });
      const marker = L.marker(new L.LatLng(point.lat, point.long), {
        icon
      }, {
        name,
        location
      });
      const popupContent = `
        <h6 class="mb-1">${name}</h6>
        <p class="m-0 text-500">${street}, ${location}</p>
      `;
      const popup = L.popup({
        minWidth: 180
      }).setContent(popupContent);
      marker.bindPopup(popup);
      mcg.addLayer(marker);
      return true;
    });
    map.addLayer(mcg);
    const themeController = document.body;
    themeController.addEventListener('clickControl', ({
      detail: {
        control,
        value
      }
    }) => {
      if (control === 'theme') {
        tiles.updateFilter(value === 'dark' ? ['invert:98%', 'grayscale:69%', 'bright:89%', 'contrast:111%', 'hue:205deg', 'saturate:1000%'] : ['bright:101%', 'contrast:101%', 'hue:23deg', 'saturate:225%']);
      }
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                 Data Table                                 */
/* -------------------------------------------------------------------------- */
/* eslint-disable */

const togglePaginationButtonDisable = (button, disabled) => {
  button.disabled = disabled;
  button.classList[disabled ? 'add' : 'remove']('disabled');
};
const listInit = () => {
  if (window.List) {
    const lists = document.querySelectorAll('[data-list]');
    if (lists.length) {
      lists.forEach(el => {
        const bulkSelect = el.querySelector('[data-bulk-select]');
        let options = utils.getData(el, 'list');
        if (options.pagination) {
          options = {
            ...options,
            pagination: {
              item: "<li><button class='page' type='button'></button></li>",
              ...options.pagination
            }
          };
        }
        const paginationButtonNext = el.querySelector('[data-list-pagination="next"]');
        const paginationButtonPrev = el.querySelector('[data-list-pagination="prev"]');
        const viewAll = el.querySelector('[data-list-view="*"]');
        const viewLess = el.querySelector('[data-list-view="less"]');
        const listInfo = el.querySelector('[data-list-info]');
        const listFilter = document.querySelector('[data-list-filter]');
        const list = new window.List(el, options);

        //-------fallback-----------

        list.on('updated', item => {
          const fallback = el.querySelector('.fallback') || document.getElementById(options.fallback);
          if (fallback) {
            if (item.matchingItems.length === 0) {
              fallback.classList.remove('d-none');
            } else {
              fallback.classList.add('d-none');
            }
          }
        });

        // ---------------------------------------

        const totalItem = list.items.length;
        const itemsPerPage = list.page;
        const btnDropdownClose = list.listContainer.querySelector('.btn-close');
        let pageQuantity = Math.ceil(totalItem / itemsPerPage);
        let numberOfcurrentItems = list.visibleItems.length;
        let pageCount = 1;
        btnDropdownClose && btnDropdownClose.addEventListener('search.close', () => {
          list.fuzzySearch('');
        });
        const updateListControls = () => {
          listInfo && (listInfo.innerHTML = `${list.i} to ${numberOfcurrentItems} of ${totalItem}`);
          paginationButtonPrev && togglePaginationButtonDisable(paginationButtonPrev, pageCount === 1);
          paginationButtonNext && togglePaginationButtonDisable(paginationButtonNext, pageCount === pageQuantity);
          if (pageCount > 1 && pageCount < pageQuantity) {
            togglePaginationButtonDisable(paginationButtonNext, false);
            togglePaginationButtonDisable(paginationButtonPrev, false);
          }
        };

        // List info
        updateListControls();
        if (paginationButtonNext) {
          paginationButtonNext.addEventListener('click', e => {
            e.preventDefault();
            pageCount += 1;
            const nextInitialIndex = list.i + itemsPerPage;
            nextInitialIndex <= list.size() && list.show(nextInitialIndex, itemsPerPage);
            numberOfcurrentItems += list.visibleItems.length;
            updateListControls();
          });
        }
        if (paginationButtonPrev) {
          paginationButtonPrev.addEventListener('click', e => {
            e.preventDefault();
            pageCount -= 1;
            numberOfcurrentItems -= list.visibleItems.length;
            const prevItem = list.i - itemsPerPage;
            prevItem > 0 && list.show(prevItem, itemsPerPage);
            updateListControls();
          });
        }
        const toggleViewBtn = () => {
          viewLess.classList.toggle('d-none');
          viewAll.classList.toggle('d-none');
        };
        if (viewAll) {
          viewAll.addEventListener('click', () => {
            list.show(1, totalItem);
            pageQuantity = 1;
            pageCount = 1;
            numberOfcurrentItems = totalItem;
            updateListControls();
            toggleViewBtn();
          });
        }
        if (viewLess) {
          viewLess.addEventListener('click', () => {
            list.show(1, itemsPerPage);
            pageQuantity = Math.ceil(totalItem / itemsPerPage);
            pageCount = 1;
            numberOfcurrentItems = list.visibleItems.length;
            updateListControls();
            toggleViewBtn();
          });
        }
        // numbering pagination
        if (options.pagination) {
          el.querySelector('.pagination').addEventListener('click', e => {
            if (e.target.classList[0] === 'page') {
              pageCount = Number(e.target.innerText);
              updateListControls();
            }
          });
        }
        if (options.filter) {
          const {
            key
          } = options.filter;
          listFilter.addEventListener('change', e => {
            list.filter(item => {
              if (e.target.value === '') {
                return true;
              }
              return item.values()[key].toLowerCase().includes(e.target.value.toLowerCase());
            });
          });
        }

        //bulk-select
        if (bulkSelect) {
          const bulkSelectInstance = window.BulkSelect.getInstance(bulkSelect);
          bulkSelectInstance.attachRowNodes(list.items.map(item => item.elm.querySelector('[data-bulk-select-row]')));
          bulkSelect.addEventListener('change', () => {
            if (list) {
              if (bulkSelect.checked) {
                list.items.forEach(item => {
                  item.elm.querySelector('[data-bulk-select-row]').checked = true;
                });
              } else {
                list.items.forEach(item => {
                  item.elm.querySelector('[data-bulk-select-row]').checked = false;
                });
              }
            }
          });
        }
      });
    }
  }
};
const lottieInit = () => {
  const lotties = document.querySelectorAll(".lottie");
  if (lotties.length) {
    lotties.forEach(item => {
      const options = utils.getData(item, "options");
      window.bodymovin.loadAnimation({
        container: item,
        path: "../img/animated-icons/warning-light.json",
        renderer: "svg",
        loop: true,
        autoplay: true,
        name: "Hello World",
        ...options
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                             Navbar Combo Layout                            */
/* -------------------------------------------------------------------------- */

const navbarComboInit = () => {
  const Selector = {
    NAVBAR_VERTICAL: '.navbar-vertical',
    NAVBAR_TOP_COMBO: '[data-navbar-top="combo"]',
    COLLAPSE: '.collapse',
    DATA_MOVE_CONTAINER: '[data-move-container]',
    NAVBAR_NAV: '.navbar-nav',
    NAVBAR_VERTICAL_DIVIDER: '.navbar-vertical-divider'
  };
  const ClassName = {
    FLEX_COLUMN: 'flex-column'
  };
  const navbarVertical = document.querySelector(Selector.NAVBAR_VERTICAL);
  const navbarTopCombo = document.querySelector(Selector.NAVBAR_TOP_COMBO);
  const moveNavContent = windowWidth => {
    const navbarVerticalBreakpoint = utils.getBreakpoint(navbarVertical);
    const navbarTopBreakpoint = utils.getBreakpoint(navbarTopCombo);
    if (windowWidth < navbarTopBreakpoint) {
      const navbarCollapse = navbarTopCombo.querySelector(Selector.COLLAPSE);
      const navbarTopContent = navbarCollapse.innerHTML;
      if (navbarTopContent) {
        const targetID = utils.getData(navbarTopCombo, 'move-target');
        const targetElement = document.querySelector(targetID);
        navbarCollapse.innerHTML = '';
        targetElement.insertAdjacentHTML('afterend', `
            <div data-move-container>
              <div class='navbar-vertical-divider'>
                <hr class='navbar-vertical-hr' />
              </div>
              ${navbarTopContent}
            </div>
          `);
        if (navbarVerticalBreakpoint < navbarTopBreakpoint) {
          const navbarNav = document.querySelector(Selector.DATA_MOVE_CONTAINER).querySelector(Selector.NAVBAR_NAV);
          utils.addClass(navbarNav, ClassName.FLEX_COLUMN);
        }
      }
    } else {
      const moveableContainer = document.querySelector(Selector.DATA_MOVE_CONTAINER);
      if (moveableContainer) {
        const navbarNav = moveableContainer.querySelector(Selector.NAVBAR_NAV);
        utils.hasClass(navbarNav, ClassName.FLEX_COLUMN) && navbarNav.classList.remove(ClassName.FLEX_COLUMN);
        moveableContainer.querySelector(Selector.NAVBAR_VERTICAL_DIVIDER).remove();
        navbarTopCombo.querySelector(Selector.COLLAPSE).innerHTML = moveableContainer.innerHTML;
        moveableContainer.remove();
      }
    }
  };
  moveNavContent(window.innerWidth);
  utils.resize(() => moveNavContent(window.innerWidth));
};

/* -------------------------------------------------------------------------- */
/*                         Navbar Darken on scroll                        */
/* -------------------------------------------------------------------------- */
const navbarDarkenOnScroll = () => {
  const Selector = {
    NAVBAR: '[data-navbar-darken-on-scroll]',
    NAVBAR_COLLAPSE: '.navbar-collapse',
    NAVBAR_TOGGLER: '.navbar-toggler'
  };
  const ClassNames = {
    COLLAPSED: 'collapsed'
  };
  const Events = {
    SCROLL: 'scroll',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    HIDE_BS_COLLAPSE: 'hide.bs.collapse',
    HIDDEN_BS_COLLAPSE: 'hidden.bs.collapse'
  };
  const DataKey = {
    NAVBAR_DARKEN_ON_SCROLL: 'navbar-darken-on-scroll'
  };
  const navbar = document.querySelector(Selector.NAVBAR);
  function removeNavbarBgClass() {
    navbar.classList.remove('bg-dark');
    navbar.classList.remove('bg-100');
  }
  const toggleThemeClass = theme => {
    if (theme === 'dark') {
      navbar.classList.remove('navbar-dark');
      navbar.classList.add('navbar-light');
    } else {
      navbar.classList.remove('navbar-light');
      navbar.classList.add('navbar-dark');
    }
  };
  function getBgClassName(name, defaultColorName) {
    const parent = document.documentElement;
    const allColors = {
      ...utils.getColors(parent),
      ...utils.getGrays(parent)
    };
    const colorName = Object.keys(allColors).includes(name) ? name : defaultColorName;
    const color = allColors[colorName];
    const bgClassName = `bg-${colorName}`;
    return {
      color,
      bgClassName
    };
  }
  if (navbar) {
    const theme = localStorage.getItem('theme');
    let defaultColorName = theme === 'dark' ? '100' : 'dark';
    const name = utils.getData(navbar, DataKey.NAVBAR_DARKEN_ON_SCROLL);
    toggleThemeClass(theme);
    const themeController = document.body;
    themeController.addEventListener('clickControl', ({
      detail: {
        control,
        value
      }
    }) => {
      if (control === 'theme') {
        toggleThemeClass(value);
        defaultColorName = value === 'dark' ? '100' : 'dark';
        if (navbar.classList.contains('bg-dark') || navbar.classList.contains('bg-100')) {
          removeNavbarBgClass();
          navbar.classList.add(getBgClassName(name, defaultColorName).bgClassName);
        }
      }
    });
    const windowHeight = window.innerHeight;
    const html = document.documentElement;
    const navbarCollapse = navbar.querySelector(Selector.NAVBAR_COLLAPSE);
    const colorRgb = utils.hexToRgb(getBgClassName(name, defaultColorName).color);
    const {
      backgroundImage
    } = window.getComputedStyle(navbar);
    const transition = 'background-color 0.35s ease';
    navbar.style.backgroundImage = 'none';
    // Change navbar background color on scroll
    window.addEventListener(Events.SCROLL, () => {
      const {
        scrollTop
      } = html;
      let alpha = scrollTop / windowHeight * 2;
      alpha >= 1 && (alpha = 1);
      navbar.style.backgroundColor = `rgba(${colorRgb[0]}, ${colorRgb[1]}, ${colorRgb[2]}, ${alpha})`;
      navbar.style.backgroundImage = alpha > 0 || utils.hasClass(navbarCollapse, 'show') ? backgroundImage : 'none';
    });

    // Toggle bg class on window resize
    utils.resize(() => {
      const breakPoint = utils.getBreakpoint(navbar);
      if (window.innerWidth > breakPoint) {
        removeNavbarBgClass();
        navbar.style.backgroundImage = html.scrollTop ? backgroundImage : 'none';
        navbar.style.transition = 'none';
      } else if (utils.hasClass(navbar.querySelector(Selector.NAVBAR_TOGGLER), ClassNames.COLLAPSED)) {
        removeNavbarBgClass();
        navbar.style.backgroundImage = backgroundImage;
      }
      if (window.innerWidth <= breakPoint) {
        navbar.style.transition = utils.hasClass(navbarCollapse, 'show') ? transition : 'none';
      }
    });
    navbarCollapse.addEventListener(Events.SHOW_BS_COLLAPSE, () => {
      navbar.classList.add(getBgClassName(name, defaultColorName).bgClassName);
      navbar.style.backgroundImage = backgroundImage;
      navbar.style.transition = transition;
    });
    navbarCollapse.addEventListener(Events.HIDE_BS_COLLAPSE, () => {
      removeNavbarBgClass();
      !html.scrollTop && (navbar.style.backgroundImage = 'none');
    });
    navbarCollapse.addEventListener(Events.HIDDEN_BS_COLLAPSE, () => {
      navbar.style.transition = 'none';
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                 Navbar Top                                 */
/* -------------------------------------------------------------------------- */

const navbarTopDropShadow = () => {
  const Selector = {
    NAVBAR: '.navbar:not(.navbar-vertical)',
    NAVBAR_VERTICAL: '.navbar-vertical',
    NAVBAR_VERTICAL_CONTENT: '.navbar-vertical-content',
    NAVBAR_VERTICAL_COLLAPSE: 'navbarVerticalCollapse'
  };
  const ClassNames = {
    NAVBAR_GLASS_SHADOW: 'navbar-glass-shadow',
    SHOW: 'show'
  };
  const Events = {
    SCROLL: 'scroll',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    HIDDEN_BS_COLLAPSE: 'hidden.bs.collapse'
  };
  let navDropShadowFlag = true;
  const $navbar = document.querySelector(Selector.NAVBAR);
  const $navbarVertical = document.querySelector(Selector.NAVBAR_VERTICAL);
  const $navbarVerticalContent = document.querySelector(Selector.NAVBAR_VERTICAL_CONTENT);
  const $navbarVerticalCollapse = document.getElementById(Selector.NAVBAR_VERTICAL_COLLAPSE);
  const html = document.documentElement;
  const breakPoint = utils.getBreakpoint($navbarVertical);
  const setDropShadow = $elem => {
    if ($elem.scrollTop > 0 && navDropShadowFlag) {
      $navbar && $navbar.classList.add(ClassNames.NAVBAR_GLASS_SHADOW);
    } else {
      $navbar && $navbar.classList.remove(ClassNames.NAVBAR_GLASS_SHADOW);
    }
  };
  setDropShadow(html);
  window.addEventListener(Events.SCROLL, () => {
    setDropShadow(html);
  });
  if ($navbarVerticalContent) {
    $navbarVerticalContent.addEventListener(Events.SCROLL, () => {
      if (window.outerWidth < breakPoint) {
        navDropShadowFlag = true;
        setDropShadow($navbarVerticalContent);
      }
    });
  }
  if ($navbarVerticalCollapse) {
    $navbarVerticalCollapse.addEventListener(Events.SHOW_BS_COLLAPSE, () => {
      if (window.outerWidth < breakPoint) {
        navDropShadowFlag = false;
        setDropShadow(html);
      }
    });
  }
  if ($navbarVerticalCollapse) {
    $navbarVerticalCollapse.addEventListener(Events.HIDDEN_BS_COLLAPSE, () => {
      if (utils.hasClass($navbarVerticalCollapse, ClassNames.SHOW) && window.outerWidth < breakPoint) {
        navDropShadowFlag = false;
      } else {
        navDropShadowFlag = true;
      }
      setDropShadow(html);
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                               Navbar Vertical                              */
/* -------------------------------------------------------------------------- */

const handleNavbarVerticalCollapsed = () => {
  const Selector = {
    HTML: 'html',
    NAVBAR_VERTICAL_TOGGLE: '.navbar-vertical-toggle',
    NAVBAR_VERTICAL_COLLAPSE: '.navbar-vertical .navbar-collapse',
    ECHART_RESPONSIVE: '[data-echart-responsive]'
  };
  const Events = {
    CLICK: 'click',
    MOUSE_OVER: 'mouseover',
    MOUSE_LEAVE: 'mouseleave',
    NAVBAR_VERTICAL_TOGGLE: 'navbar.vertical.toggle'
  };
  const ClassNames = {
    NAVBAR_VERTICAL_COLLAPSED: 'navbar-vertical-collapsed',
    NAVBAR_VERTICAL_COLLAPSED_HOVER: 'navbar-vertical-collapsed-hover'
  };
  const navbarVerticalToggle = document.querySelector(Selector.NAVBAR_VERTICAL_TOGGLE);
  const html = document.querySelector(Selector.HTML);
  const navbarVerticalCollapse = document.querySelector(Selector.NAVBAR_VERTICAL_COLLAPSE);
  if (navbarVerticalToggle) {
    navbarVerticalToggle.addEventListener(Events.CLICK, e => {
      navbarVerticalToggle.blur();
      html.classList.toggle(ClassNames.NAVBAR_VERTICAL_COLLAPSED);

      // Set collapse state on localStorage
      const isNavbarVerticalCollapsed = utils.getItemFromStore('isNavbarVerticalCollapsed');
      utils.setItemToStore('isNavbarVerticalCollapsed', !isNavbarVerticalCollapsed);
      const event = new CustomEvent(Events.NAVBAR_VERTICAL_TOGGLE);
      e.currentTarget.dispatchEvent(event);
    });
  }
  if (navbarVerticalCollapse) {
    navbarVerticalCollapse.addEventListener(Events.MOUSE_OVER, () => {
      if (utils.hasClass(html, ClassNames.NAVBAR_VERTICAL_COLLAPSED)) {
        html.classList.add(ClassNames.NAVBAR_VERTICAL_COLLAPSED_HOVER);
      }
    });
    navbarVerticalCollapse.addEventListener(Events.MOUSE_LEAVE, () => {
      if (utils.hasClass(html, ClassNames.NAVBAR_VERTICAL_COLLAPSED_HOVER)) {
        html.classList.remove(ClassNames.NAVBAR_VERTICAL_COLLAPSED_HOVER);
      }
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                               noUiSlider                                   */
/* -------------------------------------------------------------------------- */
const nouisliderInit = () => {
  if (window.noUiSlider) {
    const elements = document.querySelectorAll('[data-nouislider]');
    elements.forEach(item => {
      const sliderValue = document.querySelector('[data-nouislider-value]');
      const userOptions = utils.getData(item, 'nouislider');
      const defaultOptions = {
        start: [10],
        connect: [true, false],
        step: 1,
        range: {
          min: [0],
          max: [100]
        },
        tooltips: true
      };
      const options = window._.merge(defaultOptions, userOptions);
      window.noUiSlider.create(item, {
        ...options
      });
      sliderValue && item.noUiSlider.on('update', (values, handle) => {
        sliderValue.innerHTML = values[handle];
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                   Popover                                  */
/* -------------------------------------------------------------------------- */
const picmoInit = () => {
  const picmoBtns = document.querySelectorAll('[data-picmo]');
  if (picmoBtns) {
    Array.from(picmoBtns).forEach(btn => {
      const inputTarget = utils.getData(btn, 'picmo-input-target');
      const userOptions = utils.getData(btn, 'picmo');
      const defaultOptions = {
        referenceElement: btn,
        triggerElement: btn,
        position: 'bottom-center',
        showCloseButton: false
      };
      const options = window._.merge(defaultOptions, userOptions);
      const picker = window.picmoPopup.createPopup({
        showPreview: false
      }, {
        ...options
      });
      btn.addEventListener('click', () => {
        picker.toggle();
      });
      const input = document.querySelector(inputTarget);
      picker.addEventListener('emoji:select', selection => {
        if (input) {
          input.innerHTML += selection.emoji;
        }
      });
    });
  }
};

/*-----------------------------------------------
|   Inline Player [plyr]
-----------------------------------------------*/

const plyrInit = () => {
  if (window.Plyr) {
    const plyrs = document.querySelectorAll('.player');
    plyrs.forEach(plyr => {
      const userOptions = utils.getData(plyr, 'options');
      const defaultOptions = {
        captions: {
          active: true
        }
      };
      const options = window._.merge(defaultOptions, userOptions);
      return new window.Plyr(plyr, options);
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                   Popover                                  */
/* -------------------------------------------------------------------------- */

const popoverInit = () => {
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(popoverTriggerEl => {
    return new window.bootstrap.Popover(popoverTriggerEl);
  });
};

/* -------------------------------------------------------------------------- */
/*                         Bootstrap Animated Progress                        */
/* -------------------------------------------------------------------------- */

const progressAnimationToggle = () => {
  const animatedProgress = document.querySelectorAll('[data-progress-animation]');
  animatedProgress.forEach(progress => {
    progress.addEventListener('click', e => {
      const progressID = utils.getData(e.currentTarget, 'progressAnimation');
      const $progress = document.getElementById(progressID);
      $progress.classList.toggle('progress-bar-animated');
    });
  });
};

/*-----------------------------------------------
|  Quantity
-----------------------------------------------*/
const quantityInit = () => {
  const Selector = {
    DATA_QUANTITY_BTN: '[data-quantity] [data-type]',
    DATA_QUANTITY: '[data-quantity]',
    DATA_QUANTITY_INPUT: '[data-quantity] input[type="number"]'
  };
  const Events = {
    CLICK: 'click'
  };
  const Attributes = {
    MIN: 'min'
  };
  const DataKey = {
    TYPE: 'type'
  };
  const quantities = document.querySelectorAll(Selector.DATA_QUANTITY_BTN);
  quantities.forEach(quantity => {
    quantity.addEventListener(Events.CLICK, e => {
      const el = e.currentTarget;
      const type = utils.getData(el, DataKey.TYPE);
      const numberInput = el.closest(Selector.DATA_QUANTITY).querySelector(Selector.DATA_QUANTITY_INPUT);
      const min = numberInput.getAttribute(Attributes.MIN);
      let value = parseInt(numberInput.value, 10);
      if (type === 'plus') {
        value += 1;
      } else {
        value = value > min ? value -= 1 : value;
      }
      numberInput.value = value;
    });
  });
};

/* -------------------------------------------------------------------------- */

/*                               Ratings                               */

/* -------------------------------------------------------------------------- */

const ratingInit = () => {
  const raters = document.querySelectorAll("[data-rater]");
  raters.forEach(rater => {
    let options = {
      reverse: utils.getItemFromStore('isRTL'),
      starSize: 32,
      step: 0.5,
      element: rater,
      rateCallback(rating, done) {
        this.setRating(rating);
        done();
      },
      ...utils.getData(rater, "rater")
    };
    return window.raterJs(options);
  });
};

/* -------------------------------------------------------------------------- */
/*                                 Scrollbars                                 */
/* -------------------------------------------------------------------------- */
// import utils from './utils';

const scrollInit = () => {
  const dropdownElements = Array.from(document.querySelectorAll('[data-hide-on-body-scroll]'));
  if (window.innerWidth < 1200) {
    window.addEventListener('scroll', () => {
      dropdownElements.forEach(dropdownElement => {
        const instanceEl = window.bootstrap.Dropdown.getInstance(dropdownElement);
        instanceEl && instanceEl.hide();
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                 Scrollbars                                 */
/* -------------------------------------------------------------------------- */

const scrollbarInit = () => {
  Array.prototype.forEach.call(document.querySelectorAll('.scrollbar-overlay'), el => new window.SimpleBar(el, {
    autoHide: true
  }));
};
const searchInit = () => {
  const Selectors = {
    SEARCH_DISMISS: '[data-bs-dismiss="search"]',
    DROPDOWN_TOGGLE: '[data-bs-toggle="dropdown"]',
    DROPDOWN_MENU: '.dropdown-menu',
    SEARCH_BOX: '.search-box',
    SEARCH_INPUT: '.search-input',
    SEARCH_TOGGLE: '[data-bs-toggle="search"]'
  };
  const ClassName = {
    SHOW: 'show'
  };
  const Attribute = {
    ARIA_EXPANDED: 'aria-expanded'
  };
  const Events = {
    CLICK: 'click',
    FOCUS: 'focus',
    SHOW_BS_DROPDOWN: 'show.bs.dropdown',
    SEARCH_CLOSE: 'search.close'
  };
  const hideSearchSuggestion = searchArea => {
    const el = searchArea.querySelector(Selectors.SEARCH_TOGGLE);
    const dropdownMenu = searchArea.querySelector(Selectors.DROPDOWN_MENU);
    if (!el || !dropdownMenu) return;
    el.setAttribute(Attribute.ARIA_EXPANDED, 'false');
    el.classList.remove(ClassName.SHOW);
    dropdownMenu.classList.remove(ClassName.SHOW);
  };
  const searchAreas = document.querySelectorAll(Selectors.SEARCH_BOX);
  const hideAllSearchAreas = () => {
    searchAreas.forEach(hideSearchSuggestion);
  };
  searchAreas.forEach(searchArea => {
    const input = searchArea.querySelector(Selectors.SEARCH_INPUT);
    const btnDropdownClose = searchArea.querySelector(Selectors.SEARCH_DISMISS);
    const dropdownMenu = searchArea.querySelector(Selectors.DROPDOWN_MENU);
    if (input) {
      input.addEventListener(Events.FOCUS, () => {
        hideAllSearchAreas();
        const el = searchArea.querySelector(Selectors.SEARCH_TOGGLE);
        if (!el || !dropdownMenu) return;
        el.setAttribute(Attribute.ARIA_EXPANDED, 'true');
        el.classList.add(ClassName.SHOW);
        dropdownMenu.classList.add(ClassName.SHOW);
      });
    }
    document.addEventListener(Events.CLICK, ({
      target
    }) => {
      !searchArea.contains(target) && hideSearchSuggestion(searchArea);
    });
    btnDropdownClose && btnDropdownClose.addEventListener(Events.CLICK, e => {
      hideSearchSuggestion(searchArea);
      input.value = '';
      const event = new CustomEvent(Events.SEARCH_CLOSE);
      e.currentTarget.dispatchEvent(event);
    });
  });
  document.querySelectorAll(Selectors.DROPDOWN_TOGGLE).forEach(dropdown => {
    dropdown.addEventListener(Events.SHOW_BS_DROPDOWN, () => {
      hideAllSearchAreas();
    });
  });
};

/*-----------------------------------------------
|   Select2
-----------------------------------------------*/

const select2Init = () => {
  if (window.jQuery) {
    const $ = window.jQuery;
    const select2 = $('.selectpicker');
    select2.length && select2.each((index, value) => {
      const $this = $(value);
      const options = $.extend({
        theme: 'bootstrap-5'
      }, $this.data('options'));
      $this.select2(options);
    });
  }
};

/*-----------------------------------------------
|  Swiper
-----------------------------------------------*/
const swiperInit = () => {
  const swipers = document.querySelectorAll('[data-swiper]');
  const navbarVerticalToggle = document.querySelector('.navbar-vertical-toggle');
  swipers.forEach(swiper => {
    const options = utils.getData(swiper, 'swiper');
    const thumbsOptions = options.thumb;
    let thumbsInit;
    if (thumbsOptions) {
      const thumbImages = swiper.querySelectorAll('img');
      let slides = '';
      thumbImages.forEach(img => {
        slides += `
          <div class='swiper-slide '>
            <img class='img-fluid rounded mt-1' src=${img.src} alt=''/>
          </div>
        `;
      });
      const thumbs = document.createElement('div');
      thumbs.setAttribute('class', 'swiper-container thumb');
      thumbs.innerHTML = `<div class='swiper-wrapper'>${slides}</div>`;
      if (thumbsOptions.parent) {
        const parent = document.querySelector(thumbsOptions.parent);
        parent.parentNode.appendChild(thumbs);
      } else {
        swiper.parentNode.appendChild(thumbs);
      }
      thumbsInit = new window.Swiper(thumbs, thumbsOptions);
    }
    const swiperNav = swiper.querySelector('.swiper-nav');
    const newSwiper = new window.Swiper(swiper, {
      ...options,
      navigation: {
        nextEl: swiperNav?.querySelector('.swiper-button-next'),
        prevEl: swiperNav?.querySelector('.swiper-button-prev')
      },
      thumbs: {
        swiper: thumbsInit
      }
    });
    if (navbarVerticalToggle) {
      navbarVerticalToggle.addEventListener('navbar.vertical.toggle', () => {
        newSwiper.update();
      });
    }
  });
};

// export default themeControl;
// eslint-disable-next-line

/* -------------------------------------------------------------------------- */
/*                                Theme Control                               */
/* -------------------------------------------------------------------------- */
/* eslint-disable no-param-reassign */
/* eslint-disable */

const initialDomSetup = element => {
  if (!element) return;
  const dataUrlDom = element.querySelector('[data-theme-control = "navbarPosition"]');
  const hasDataUrl = dataUrlDom ? getData(dataUrlDom, 'page-url') : null;
  element.querySelectorAll('[data-theme-control]').forEach(el => {
    const inputDataAttributeValue = getData(el, 'theme-control');
    const localStorageValue = getItemFromStore(inputDataAttributeValue);
    if (inputDataAttributeValue === 'navbarStyle' && !hasDataUrl && (getItemFromStore('navbarPosition') === 'top' || getItemFromStore('navbarPosition') === 'double-top')) {
      el.setAttribute('disabled', true);
    }
    if (el.type === 'select-one' && inputDataAttributeValue === 'navbarPosition') {
      el.value = localStorageValue;
    }
    if (el.type === 'checkbox') {
      if (inputDataAttributeValue === 'theme') {
        if (localStorageValue === 'auto' ? getSystemTheme() === 'dark' : localStorageValue === 'dark') {
          el.setAttribute('checked', true);
        }
      } else {
        localStorageValue && el.setAttribute('checked', true);
      }
    } else if (el.type === 'radio') {
      const isChecked = localStorageValue === el.value;
      isChecked && el.setAttribute('checked', true);
    } else {
      const isActive = localStorageValue === el.value;
      isActive && el.classList.add('active');
    }
  });
};
const changeTheme = element => {
  element.querySelectorAll('[data-theme-control = "theme"]').forEach(el => {
    const inputDataAttributeValue = getData(el, 'theme-control');
    const localStorageValue = getItemFromStore(inputDataAttributeValue);
    if (el.type === 'checkbox') {
      if (localStorageValue === 'auto') {
        getSystemTheme() === 'dark' ? el.checked = true : el.checked = false;
      } else {
        localStorageValue === 'dark' ? el.checked = true : el.checked = false;
      }
    } else if (el.type === 'radio') {
      localStorageValue === el.value ? el.checked = true : el.checked = false;
    } else {
      localStorageValue === el.value ? el.classList.add('active') : el.classList.remove('active');
    }
  });
};
const localStorageValue = getItemFromStore('theme');
const handleThemeDropdownIcon = value => {
  document.querySelectorAll('[data-theme-dropdown-toggle-icon]').forEach(el => {
    const theme = getData(el, 'theme-dropdown-toggle-icon');
    if (value === theme) {
      el.classList.remove('d-none');
    } else {
      el.classList.add('d-none');
    }
  });
};
handleThemeDropdownIcon(localStorageValue);
const themeControl = () => {
  const themeController = new DomNode(document.body);
  const navbarVertical = document.querySelector('.navbar-vertical');
  initialDomSetup(themeController.node);
  themeController.on('click', e => {
    const target = new DomNode(e.target);
    if (target.data('theme-control')) {
      const control = target.data('theme-control');
      let value = e.target[e.target.type === 'checkbox' ? 'checked' : 'value'];
      if (control === 'theme') {
        typeof value === 'boolean' && (value = value ? 'dark' : 'light');
      }
      if (control !== 'navbarPosition') {
        CONFIG.hasOwnProperty(control) && setItemToStore(control, value);
        switch (control) {
          case 'theme':
            {
              document.documentElement.setAttribute('data-bs-theme', value === 'auto' ? getSystemTheme() : value);
              const clickControl = new CustomEvent('clickControl', {
                detail: {
                  control,
                  value
                }
              });
              e.currentTarget.dispatchEvent(clickControl);
              changeTheme(themeController.node);
              break;
            }
          case 'navbarStyle':
            {
              navbarVertical.classList.remove('navbar-card');
              navbarVertical.classList.remove('navbar-inverted');
              navbarVertical.classList.remove('navbar-vibrant');
              if (value !== 'transparent') {
                navbarVertical.classList.add(`navbar-${value}`);
              }
              break;
            }
          case 'reset':
            {
              Object.keys(CONFIG).forEach(key => {
                localStorage.setItem(key, CONFIG[key]);
              });
              window.location.reload();
              break;
            }
          default:
            window.location.reload();
        }
      }
    }
  });

  // control navbar position
  themeController.on('change', e => {
    const target = new DomNode(e.target);
    if (target.data('theme-control') === 'navbarPosition') {
      CONFIG.hasOwnProperty('navbarPosition') && setItemToStore('navbarPosition', e.target.value);
      const pageUrl = getData(target.node.selectedOptions[0], 'page-url');
      !!pageUrl ? window.location.replace(pageUrl) : window.location.replace(window.location.href.split('#')[0]);
    }
  });
  themeController.on('clickControl', ({
    detail: {
      control,
      value
    }
  }) => {
    if (control === 'theme') {
      handleThemeDropdownIcon(value);
    }
  });
};

/* -------------------------------------------------------------------------- */
/*                                   Tinymce                                  */
/* -------------------------------------------------------------------------- */

const tinymceInit = () => {
  if (window.tinymce) {
    const tinymces = document.querySelectorAll('[data-tinymce]');
    if (tinymces.length) {
      window.tinymce.execCommand('mceFocus', false, 'course-description');
      window.tinymce.init({
        selector: '.tinymce',
        height: '50vh',
        menubar: false,
        skin: utils.settings.tinymce.theme,
        content_style: `.mce-content-body { color: ${utils.getColors().emphasis}; background-color: ${utils.getColor('tinymce-bg')} }`,
        mobile: {
          theme: 'mobile',
          toolbar: ['undo', 'bold']
        },
        statusbar: false,
        plugins: 'link,image,lists,table,media',
        toolbar: 'styleselect | bold italic link bullist numlist image blockquote table media undo redo',
        directionality: utils.getItemFromStore('isRTL') ? 'rtl' : 'ltr',
        theme_advanced_toolbar_align: 'center',
        setup: editor => {
          editor.on('change', () => {
            window.tinymce.triggerSave();
          });
        }
      });
    }
    const themeController = document.body;
    themeController && themeController.addEventListener('clickControl', ({
      detail: {
        control
      }
    }) => {
      if (control === 'theme') {
        window.tinyMCE.editors.forEach(el => {
          el.dom.addStyle(`.mce-content-body{color: ${utils.getColors().emphasis} !important; background-color: ${utils.getColor('tinymce-bg')} !important;}`);
        });
      }
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                    Toast                                   */
/* -------------------------------------------------------------------------- */

const toastInit = () => {
  const toastElList = [].slice.call(document.querySelectorAll('.toast'));
  toastElList.map(toastEl => new window.bootstrap.Toast(toastEl));
  const liveToastBtn = document.getElementById('liveToastBtn');
  if (liveToastBtn) {
    const liveToast = new window.bootstrap.Toast(document.getElementById('liveToast'));
    liveToastBtn.addEventListener('click', () => {
      liveToast && liveToast.show();
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                   Tooltip                                  */
/* -------------------------------------------------------------------------- */
const tooltipInit = () => {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl, {
    trigger: 'hover'
  }));
};

/* eslint-disable no-param-reassign */

/* -------------------------------------------------------------------------- */
/*                                   Treeview                                  */
/* -------------------------------------------------------------------------- */
const treeviewInit = () => {
  const Events = {
    CHANGE: 'change',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    HIDE_BS_COLLAPSE: 'hide.bs.collapse'
  };
  const Selector = {
    TREEVIEW_ROW: '.treeview > li > .treeview-row,.treeview-list.collapse-show > li > .treeview-row',
    TREEVIEW: '.treeview',
    TREEVIEW_LIST: '.treeview-list',
    TOGGLE_ELEMENT: "[data-bs-toggle='collapse']",
    INPUT: 'input',
    TREEVIEW_LIST_ITEM: '.treeview-list-item',
    CHILD_SELECTOR: ':scope > li > .collapse.collapse-show'
  };
  const ClassName = {
    TREEVIEW: 'treeview',
    TREEVIEW_LIST: 'treeview-list',
    TREEVIEW_BORDER: 'treeview-border',
    TREEVIEW_BORDER_TRANSPARENT: 'treeview-border-transparent',
    COLLAPSE_SHOW: 'collapse-show',
    COLLAPSE_HIDDEN: 'collapse-hidden',
    TREEVIEW_ROW: 'treeview-row',
    TREEVIEW_ROW_ODD: 'treeview-row-odd',
    TREEVIEW_ROW_EVEN: 'treeview-row-even'
  };
  const treeviews = document.querySelectorAll(Selector.TREEVIEW);
  const makeStriped = treeview => {
    const tags = Array.from(treeview.querySelectorAll(Selector.TREEVIEW_ROW));
    const uTags = tags.filter(tag => {
      let result = true;
      while (tag.parentElement) {
        if (tag.parentElement.classList.contains(ClassName.COLLAPSE_HIDDEN)) {
          result = false;
          break;
        }
        tag = tag.parentElement;
      }
      return result;
    });
    uTags.forEach((tag, index) => {
      if (index % 2 === 0) {
        tag.classList.add(ClassName.TREEVIEW_ROW_EVEN);
        tag.classList.remove(ClassName.TREEVIEW_ROW_ODD);
      } else {
        tag.classList.add(ClassName.TREEVIEW_ROW_ODD);
        tag.classList.remove(ClassName.TREEVIEW_ROW_EVEN);
      }
    });
  };
  if (treeviews.length) {
    treeviews.forEach(treeview => {
      const options = utils.getData(treeview, 'options');
      const striped = options?.striped;
      const select = options?.select;
      if (striped) {
        makeStriped(treeview);
      }
      const collapseElementList = Array.from(treeview.querySelectorAll(Selector.TREEVIEW_LIST));
      const collapseListItem = Array.from(treeview.querySelectorAll(Selector.TREEVIEW_LIST_ITEM));
      collapseListItem.forEach(item => {
        const wholeRow = document.createElement('div');
        wholeRow.setAttribute('class', ClassName.TREEVIEW_ROW);
        item.prepend(wholeRow);
      });
      collapseElementList.forEach(collapse => {
        const collapseId = collapse.id;
        if (!striped) {
          collapse.classList.add(ClassName.TREEVIEW_BORDER);
        }
        collapse.addEventListener(Events.SHOW_BS_COLLAPSE, e => {
          e.target.classList.remove(ClassName.COLLAPSE_HIDDEN);
          e.target.classList.add(ClassName.COLLAPSE_SHOW);
          if (striped) {
            makeStriped(treeview);
          } else {
            e.composedPath()[2].classList.add(ClassName.TREEVIEW_BORDER_TRANSPARENT);
          }
        });
        collapse.addEventListener(Events.HIDE_BS_COLLAPSE, e => {
          e.target.classList.add(ClassName.COLLAPSE_HIDDEN);
          e.target.classList.remove(ClassName.COLLAPSE_SHOW);
          if (striped) {
            makeStriped(treeview);
          } else {
            const childs = e.composedPath()[2].querySelectorAll(Selector.CHILD_SELECTOR);
            // eslint-disable-next-line
            if (!e.composedPath()[2].classList.contains(ClassName.TREEVIEW) && childs.length === 0) {
              e.composedPath()[2].classList.remove(ClassName.TREEVIEW_BORDER_TRANSPARENT);
            }
          }
        });
        if (collapse.dataset.show === 'true') {
          const parents = [collapse];
          while (collapse.parentElement) {
            if (collapse.parentElement.classList.contains(ClassName.TREEVIEW_LIST)) {
              parents.unshift(collapse.parentElement);
            }
            collapse = collapse.parentElement;
          }
          parents.forEach(collapseEl => {
            // eslint-disable-next-line no-new
            new window.bootstrap.Collapse(collapseEl, {
              show: true
            });
          });
        }
        if (select) {
          const inputElement = treeview.querySelector(`input[data-target='#${collapseId}']`);
          inputElement.addEventListener(Events.CHANGE, e => {
            const childInputElements = Array.from(treeview.querySelector(`#${collapseId}`).querySelectorAll(Selector.INPUT));
            childInputElements.forEach(input => {
              input.checked = e.target.checked;
            });
          });
        }
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                 Typed Text                                 */
/* -------------------------------------------------------------------------- */

const typedTextInit = () => {
  const typedTexts = document.querySelectorAll('.typed-text');
  if (typedTexts.length && window.Typed) {
    typedTexts.forEach(typedText => {
      return new window.Typed(typedText, {
        strings: utils.getData(typedText, 'typedText'),
        typeSpeed: 100,
        loop: true,
        backDelay: 1500
      });
    });
  }
};
const unresolvedTicketsTabInit = () => {
  const dropdownToggle = document.querySelectorAll('.dropdown-toggle-item a');
  const layout = document.querySelector('.table-layout');
  dropdownToggle.forEach(item => {
    item.addEventListener('shown.bs.tab', e => {
      layout.innerText = e.target.innerText;
    });
  });
};

/* -------------------------------------------------------------------------- */
/*                                 step wizard                                */
/* -------------------------------------------------------------------------- */
/* eslint-disable no-restricted-syntax */
/* -------------------------------------------------------------------------- */
/*                                 step wizard                                */
/* -------------------------------------------------------------------------- */

const wizardInit = () => {
  const {
    getData
  } = utils;
  const selectors = {
    WIZARDS: '.theme-wizard',
    TOGGLE_BUTTON_EL: '[data-wizard-step]',
    FORMS: '[data-wizard-form]',
    PASSWORD_INPUT: '[data-wizard-password]',
    CONFIRM_PASSWORD_INPUT: '[data-wizard-confirm-password]',
    NEXT_BTN: '.next button',
    PREV_BTN: '.previous button',
    FOOTER: '.theme-wizard .card-footer'
  };
  const events = {
    SUBMIT: 'submit',
    SHOW: 'show.bs.tab',
    SHOWN: 'shown.bs.tab',
    CLICK: 'click'
  };
  const wizards = document.querySelectorAll(selectors.WIZARDS);
  wizards.forEach(wizard => {
    const tabToggleButtonEl = wizard.querySelectorAll(selectors.TOGGLE_BUTTON_EL);
    const forms = wizard.querySelectorAll(selectors.FORMS);
    const passwordInput = wizard.querySelector(selectors.PASSWORD_INPUT);
    const confirmPasswordInput = wizard.querySelector(selectors.CONFIRM_PASSWORD_INPUT);
    const nextButton = wizard.querySelector(selectors.NEXT_BTN);
    const prevButton = wizard.querySelector(selectors.PREV_BTN);
    const wizardFooter = wizard.querySelector(selectors.FOOTER);
    const submitEvent = new Event(events.SUBMIT, {
      bubbles: true,
      cancelable: true
    });

    // eslint-disable-next-line
    const tabs = Array.from(tabToggleButtonEl).map(item => window.bootstrap.Tab.getOrCreateInstance(item));
    let count = 0;
    let showEvent = null;
    forms.forEach(form => {
      form.addEventListener(events.SUBMIT, e => {
        e.preventDefault();
        if (form.classList.contains('needs-validation')) {
          if (passwordInput && confirmPasswordInput) {
            if (passwordInput.value !== confirmPasswordInput.value) {
              confirmPasswordInput.setCustomValidity('Invalid field.');
            } else {
              confirmPasswordInput.setCustomValidity('');
            }
          }
          if (!form.checkValidity()) {
            showEvent.preventDefault();
            return false;
          }
        }
        count += 1;
        return null;
      });
    });
    nextButton.addEventListener(events.CLICK, () => {
      if (count + 1 < tabs.length) {
        tabs[count + 1].show();
      }
    });
    prevButton.addEventListener(events.CLICK, () => {
      count -= 1;
      tabs[count].show();
    });
    if (tabToggleButtonEl.length) {
      tabToggleButtonEl.forEach((item, index) => {
        item.addEventListener(events.SHOW, e => {
          const step = getData(item, 'wizard-step');
          showEvent = e;
          if (step > count) {
            forms[count].dispatchEvent(submitEvent);
          }
        });
        item.addEventListener(events.SHOWN, () => {
          count = index;
          // can't go back tab
          if (count === tabToggleButtonEl.length - 1) {
            tabToggleButtonEl.forEach(tab => {
              tab.setAttribute('data-bs-toggle', 'modal');
              tab.setAttribute('data-bs-target', '#error-modal');
            });
          }
          // add done class
          for (let i = 0; i < count; i += 1) {
            tabToggleButtonEl[i].classList.add('done');
            if (i > 0) {
              tabToggleButtonEl[i - 1].classList.add('complete');
            }
          }
          // remove done class
          for (let j = count; j < tabToggleButtonEl.length; j += 1) {
            tabToggleButtonEl[j].classList.remove('done');
            if (j > 0) {
              tabToggleButtonEl[j - 1].classList.remove('complete');
            }
          }

          // card footer remove at last step
          if (count > tabToggleButtonEl.length - 2) {
            wizardFooter.classList.add('d-none');
          } else {
            wizardFooter.classList.remove('d-none');
          }
          // prev-button removing
          if (count > 0 && count !== tabToggleButtonEl.length - 1) {
            prevButton.classList.remove('d-none');
          } else {
            prevButton.classList.add('d-none');
          }
        });
      });
    }
  });
};
const {
  dayjs
} = window;
const currentDay = dayjs && dayjs().format("DD");
const currentMonth = dayjs && dayjs().format("MM");
const prevMonth = dayjs && dayjs().subtract(1, "month").format("MM");
const nextMonth = dayjs && dayjs().add(1, "month").format("MM");
const currentYear = dayjs && dayjs().format("YYYY");
const events = [{
  title: "Boot Camp",
  start: `${currentYear}-${currentMonth}-01 10:00:00`,
  end: `${currentYear}-${currentMonth}-03 16:00:00`,
  description: "Boston Harbor Now in partnership with the Friends of Christopher Columbus Park, the Wharf District Council and the City of Boston is proud to announce the New Year's Eve Midnight Harbor Fireworks! This beloved nearly 40-year old tradition is made possible by the generous support of local waterfront organizations and businesses and the support of the City of Boston and the Office of Mayor Marty Walsh.",
  className: "bg-success-subtle",
  location: "Boston Harborwalk, Christopher Columbus Park, <br /> Boston, MA 02109, United States",
  organizer: "Boston Harbor Now"
}, {
  title: `Crain's New York Business `,
  start: `${currentYear}-${currentMonth}-11`,
  description: "Crain's 2020 Hall of Fame. Sponsored Content By Crain's Content Studio. Crain's Content Studio Presents: New Jersey: Perfect for Business. Crain's Business Forum: Letitia James, New York State Attorney General. Crain's NYC Summit: Examining racial disparities during the pandemic",
  className: "bg-primary-subtle"
}, {
  title: "Conference",
  start: `${currentYear}-${currentMonth}-${currentDay}`,
  description: "The Milken Institute Global Conference gathered the best minds in the world to tackle some of its most stubborn challenges. It was a unique experience in which individuals with the power to enact change connected with experts who are reinventing health, technology, philanthropy, industry, and media.",
  className: "bg-success-subtle",
  allDay: true,
  schedules: [{
    title: "Reporting",
    start: `${currentYear}-${currentMonth}-${currentDay} 11:00:00`,
    description: "Time to start the conference and will briefly describe all information about the event.  ",
    className: "event-bg-success-subtle"
  }, {
    title: "Lunch",
    start: `${currentYear}-${currentMonth}-${currentDay} 14:00:00`,
    description: "Lunch facility for all the attendance in the conference.",
    className: "event-bg-success-subtle"
  }, {
    title: "Contest",
    start: `${currentYear}-${currentMonth}-${currentDay} 16:00:00`,
    description: "The starting of the programming contest",
    className: "event-bg-success-subtle"
  }, {
    title: "Dinner",
    start: `${currentYear}-${currentMonth}-${currentDay} 22:00:00`,
    description: "Dinner facility for all the attendance in the conference",
    className: "event-bg-success-subtle"
  }]
}, {
  title: `ICT Expo ${currentYear} - Product Release`,
  start: `${currentYear}-${currentMonth}-16 10:00:00`,
  description: `ICT Expo ${currentYear} is the largest private-sector exposition aimed at showcasing IT and ITES products and services in Switzerland.`,
  end: `${currentYear}-${currentMonth}-18 16:00:00`,
  className: "bg-warning-subtle"
}, {
  title: "Meeting",
  start: `${currentYear}-${currentMonth}-07 10:00:00`,
  description: "Discuss about the upcoming projects in current year and assign all tasks to the individuals"
}, {
  title: "Contest",
  start: `${currentYear}-${currentMonth}-14 10:00:00`,
  description: "PeaceX is an international peace and amity organisation that aims at casting a pall at the striking issues surmounting the development of peoples and is committed to impacting the lives of young people all over the world."
}, {
  title: "Event With Url",
  start: `${currentYear}-${currentMonth}-23`,
  description: "Sample example of a event with url. Click the event, will redirect to the given link.",
  className: "bg-success-subtle",
  url: "http://google.com"
}, {
  title: "Competition",
  start: `${currentYear}-${currentMonth}-26`,
  description: "The Future of Zambia – Top 30 Under 30 is an annual award, ranking scheme, and recognition platform for young Zambian achievers under the age of 30, who are building brands, creating jobs, changing the game, and transforming the country.",
  className: "bg-danger-subtle"
}, {
  title: "Birthday Party",
  start: `${currentYear}-${nextMonth}-05`,
  description: "Will celebrate birthday party with my friends and family",
  className: "bg-primary-subtle"
}, {
  title: "Click for Google",
  url: "http://google.com/",
  start: `${currentYear}-${prevMonth}-10`,
  description: "Applications are open for the New Media Writing Prize 2020. The New Media Writing Prize (NMWP) showcases exciting and inventive stories and poetry that integrate a variety of formats, platforms, and digital media.",
  className: "bg-primary-subtle"
}];
"use strict";

/*-----------------------------------------------
|   Calendar
-----------------------------------------------*/
const appCalendarInit = () => {
  const Selectors = {
    ACTIVE: ".active",
    ADD_EVENT_FORM: "#addEventForm",
    ADD_EVENT_MODAL: "#addEventModal",
    CALENDAR: "#appCalendar",
    CALENDAR_TITLE: ".calendar-title",
    DATA_CALENDAR_VIEW: "[data-fc-view]",
    DATA_EVENT: "[data-event]",
    DATA_VIEW_TITLE: "[data-view-title]",
    EVENT_DETAILS_MODAL: "#eventDetailsModal",
    EVENT_DETAILS_MODAL_CONTENT: "#eventDetailsModal .modal-content",
    EVENT_START_DATE: '#addEventModal [name="startDate"]',
    INPUT_TITLE: '[name="title"]'
  };
  const Events = {
    CLICK: "click",
    SHOWN_BS_MODAL: "shown.bs.modal",
    SUBMIT: "submit"
  };
  const DataKeys = {
    EVENT: "event",
    FC_VIEW: "fc-view"
  };
  const ClassNames = {
    ACTIVE: "active"
  };
  const eventList = events.reduce((acc, val) => val.schedules ? acc.concat(val.schedules.concat(val)) : acc.concat(val), []);
  const updateTitle = title => {
    document.querySelector(Selectors.CALENDAR_TITLE).textContent = title;
  };
  const appCalendar = document.querySelector(Selectors.CALENDAR);
  const addEventForm = document.querySelector(Selectors.ADD_EVENT_FORM);
  const addEventModal = document.querySelector(Selectors.ADD_EVENT_MODAL);
  const eventDetailsModal = document.querySelector(Selectors.EVENT_DETAILS_MODAL);
  if (appCalendar) {
    const calendar = renderCalendar(appCalendar, {
      headerToolbar: false,
      dayMaxEvents: 2,
      height: 800,
      stickyHeaderDates: false,
      views: {
        week: {
          eventLimit: 3
        }
      },
      eventTimeFormat: {
        hour: "numeric",
        minute: "2-digit",
        omitZeroMinute: true,
        meridiem: true
      },
      events: eventList,
      eventClick: info => {
        if (info.event.url) {
          window.open(info.event.url, "_blank");
          info.jsEvent.preventDefault();
        } else {
          const template = getTemplate(info.event);
          document.querySelector(Selectors.EVENT_DETAILS_MODAL_CONTENT).innerHTML = template;
          const modal = new window.bootstrap.Modal(eventDetailsModal);
          modal.show();
        }
      },
      dateClick(info) {
        const modal = new window.bootstrap.Modal(addEventModal);
        modal.show();
        /*eslint-disable-next-line*/
        const flatpickr = document.querySelector(Selectors.EVENT_START_DATE)._flatpickr;
        flatpickr.setDate([info.dateStr]);
      }
    });
    updateTitle(calendar.currentData.viewTitle);
    document.querySelectorAll(Selectors.DATA_EVENT).forEach(button => {
      button.addEventListener(Events.CLICK, e => {
        const el = e.currentTarget;
        const type = utils.getData(el, DataKeys.EVENT);
        switch (type) {
          case "prev":
            calendar.prev();
            updateTitle(calendar.currentData.viewTitle);
            break;
          case "next":
            calendar.next();
            updateTitle(calendar.currentData.viewTitle);
            break;
          case "today":
            calendar.today();
            updateTitle(calendar.currentData.viewTitle);
            break;
          default:
            calendar.today();
            updateTitle(calendar.currentData.viewTitle);
            break;
        }
      });
    });
    document.querySelectorAll(Selectors.DATA_CALENDAR_VIEW).forEach(link => {
      link.addEventListener(Events.CLICK, e => {
        e.preventDefault();
        const el = e.currentTarget;
        const text = el.textContent;
        el.parentElement.querySelector(Selectors.ACTIVE).classList.remove(ClassNames.ACTIVE);
        el.classList.add(ClassNames.ACTIVE);
        document.querySelector(Selectors.DATA_VIEW_TITLE).textContent = text;
        calendar.changeView(utils.getData(el, DataKeys.FC_VIEW));
        updateTitle(calendar.currentData.viewTitle);
      });
    });
    addEventForm && addEventForm.addEventListener(Events.SUBMIT, e => {
      e.preventDefault();
      const {
        title,
        startDate,
        endDate,
        label,
        description,
        allDay
      } = e.target;
      calendar.addEvent({
        title: title.value,
        start: startDate.value,
        end: endDate.value ? endDate.value : null,
        allDay: allDay.checked,
        className: allDay.checked && label.value ? `bg-${label.value}-subtle` : "",
        description: description.value
      });
      e.target.reset();
      window.bootstrap.Modal.getInstance(addEventModal).hide();
    });
  }
  addEventModal && addEventModal.addEventListener(Events.SHOWN_BS_MODAL, ({
    currentTarget
  }) => {
    currentTarget.querySelector(Selectors.INPUT_TITLE).focus();
  });
};
'use strict';

/*-----------------------------------------------
|   Project Management Calendar
-----------------------------------------------*/
const managementCalendarInit = () => {
  const Selectors = {
    ADD_EVENT_FORM: '#addEventForm',
    ADD_EVENT_MODAL: '#addEventModal',
    CALENDAR: '#managementAppCalendar',
    EVENT_DETAILS_MODAL: '#eventDetailsModal',
    EVENT_DETAILS_MODAL_CONTENT: '#eventDetailsModal .modal-content',
    DATA_EVENT: '[data-event]',
    DATA_VIEW_TITLE: '[data-view-title]',
    EVENT_START_DATE: '#addEventModal [name="startDate"]',
    EVENT_MANAGEMENT_INFO: '[data-calendar-events]'
  };
  const Events = {
    CLICK: 'click',
    SUBMIT: 'submit'
  };
  const managementEventList = [];
  const DataKeys = {
    EVENT: 'event'
  };
  const managementCalendar = document.querySelector(Selectors.CALENDAR);
  if (managementCalendar) {
    const calendarData = utils.getData(managementCalendar, 'calendar-option');
    const managementCalendarEvents = document.getElementById(calendarData?.events);
    const addEventForm = document.querySelector(Selectors.ADD_EVENT_FORM);
    const addEventModal = document.querySelector(Selectors.ADD_EVENT_MODAL);
    const eventDetailsModal = document.querySelector(Selectors.EVENT_DETAILS_MODAL);
    const updateTitle = title => {
      const selectTitle = document.getElementById(calendarData?.title);
      if (selectTitle) {
        selectTitle.textContent = title;
      }
    };
    const updateDay = day => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const selectDay = document.getElementById(calendarData?.day);
      if (selectDay) {
        selectDay.textContent = days[day];
      }
    };
    if (managementEvents) {
      managementEvents.forEach(e => {
        managementEventList.push({
          start: e.start,
          end: e.end,
          display: 'background',
          classNames: `border border-2 border-${e.classNames} bg-100`
        });
      });
    }
    if (managementCalendarEvents) {
      managementEvents.forEach(e => {
        managementCalendarEvents.innerHTML += `
          <li class= 'border-top pt-3 mb-3 pb-1 cursor-pointer' data-calendar-events>
            <div class= 'border-start border-3 border-${e.classNames} ps-3 mt-1'>
              <h6 class="mb-1 fw-semi-bold text-700">${e.title}</h6>
              <p class= 'fs--2 text-600 mb-0'>${e.startTime || ''} ${e.endTime ? '-' : ''} ${e.endTime || ''}</p>
            </div>
          </li> `;
      });
    }
    const eventManagementInfo = document.querySelectorAll(Selectors.EVENT_MANAGEMENT_INFO);
    if (eventManagementInfo) {
      eventManagementInfo.forEach((li, index) => {
        li.addEventListener(Events.CLICK, () => {
          const event = managementEvents[index];
          const template = getTemplate(event);
          document.querySelector(Selectors.EVENT_DETAILS_MODAL_CONTENT).innerHTML = template;
          const modal = new window.bootstrap.Modal(eventDetailsModal);
          modal.show();
        });
      });
    }
    if (managementCalendar) {
      const calendar = renderCalendar(managementCalendar, {
        headerToolbar: false,
        dayMaxEvents: 2,
        height: 360,
        stickyHeaderDates: false,
        dateClick(info) {
          const modal = new window.bootstrap.Modal(addEventModal);
          modal.show();
          /*eslint-disable-next-line*/
          const flatpickr = document.querySelector(Selectors.EVENT_START_DATE)._flatpickr;
          flatpickr.setDate([info.dateStr]);
        },
        events: managementEventList
      });
      updateTitle(calendar.currentData.viewTitle);
      updateDay(calendar.currentData.currentDate.getDay());
      document.querySelectorAll(Selectors.DATA_EVENT).forEach(button => {
        button.addEventListener(Events.CLICK, e => {
          const el = e.currentTarget;
          const type = utils.getData(el, DataKeys.EVENT);
          switch (type) {
            case 'prev':
              calendar.prev();
              updateTitle(calendar.currentData.viewTitle);
              break;
            case 'next':
              calendar.next();
              updateTitle(calendar.currentData.viewTitle);
              break;
            case 'today':
              calendar.today();
              updateTitle(calendar.currentData.viewTitle);
              break;
            default:
              calendar.today();
              updateTitle(calendar.currentData.viewTitle);
              break;
          }
        });
      });
      if (addEventForm) {
        addEventForm.addEventListener(Events.SUBMIT, e => {
          e.preventDefault();
          e.target.reset();
          window.bootstrap.Modal.getInstance(addEventModal).hide();
        });
      }
    }
  }
};
const thisDay = window.dayjs && window.dayjs().format('DD');
const plus2Day = window.dayjs && window.dayjs().add(2, 'day').format('DD');
const thisMonthNumber = window.dayjs && window.dayjs().format('MM');
const thisMonthName = window.dayjs && window.dayjs().format('MMM');
const upcomingMonthNumber = window.dayjs && window.dayjs().add(1, 'month').format('MM');
const upcomingMonthName = window.dayjs && window.dayjs().format('MMM');
const thisYear = window.dayjs && window.dayjs().format('YYYY');
const managementEvents = [{
  title: 'Monthly team meeting for Falcon React Project',
  start: `${thisYear}-${thisMonthNumber}-07`,
  end: `${thisYear}-${thisMonthNumber}-09`,
  startTime: `07 ${thisMonthName}, ${thisYear}`,
  endTime: `10 ${thisMonthName}, ${thisYear}`,
  classNames: 'primary',
  extendedProps: {
    description: 'Boston Harbor Now in partnership with the Friends of Christopher Columbus Park, the Wharf District Council.',
    location: 'Boston Harborwalk, Christopher Columbus Park, <br /> Boston, MA 02109, United States',
    organizer: 'Boston Harbor Now'
  }
}, {
  title: 'Newmarket Nights',
  start: `${thisYear}-${thisMonthNumber}-16`,
  end: `${thisYear}-${thisMonthNumber}-18`,
  startTime: `16 ${thisMonthName}, ${thisYear}`,
  classNames: 'success',
  extendedProps: {
    description: 'Boston Harbor Now in partnership with the Friends of Christopher Columbus Park, the Wharf District Council.',
    location: 'Boston Harborwalk, Christopher Columbus Park, <br /> Boston, MA 02109, United States',
    organizer: 'Boston Harbor Now'
  }
}, {
  title: 'Folk Festival',
  start: `${thisYear}-${thisMonthNumber}-25`,
  end: `${thisYear}-${thisMonthNumber}-28`,
  startTime: `07 ${thisMonthName}, ${thisYear}`,
  endTime: `10 ${thisMonthName}, ${thisYear}`,
  classNames: 'warning',
  extendedProps: {
    description: 'Boston Harbor Now in partnership with the Friends of Christopher Columbus Park, the Wharf District Council.',
    location: 'Boston Harborwalk, Christopher Columbus Park, <br /> Boston, MA 02109, United States',
    organizer: 'Boston Harbor Now'
  }
}, {
  title: 'Film Festival',
  start: `${thisYear}-${upcomingMonthNumber}-${thisDay}`,
  end: `${thisYear}-${upcomingMonthNumber}-${plus2Day}`,
  startTime: `07 ${upcomingMonthName}, ${thisYear}`,
  endTime: `10 ${upcomingMonthName}, ${thisYear}`,
  classNames: 'danger',
  extendedProps: {
    description: 'Boston Harbor Now in partnership with the Friends of Christopher Columbus Park, the Wharf District Council.',
    location: 'Boston Harborwalk, Christopher Columbus Park, <br /> Boston, MA 02109, United States',
    organizer: 'Boston Harbor Now'
  }
}, {
  title: 'Meeting',
  start: `${thisYear}-${upcomingMonthNumber}-28`,
  startTime: `07 ${upcomingMonthName}, ${thisYear}`,
  classNames: 'warning',
  extendedProps: {
    description: 'Boston Harbor Now in partnership with the Friends of Christopher Columbus Park, the Wharf District Council.',
    location: 'Boston Harborwalk, Christopher Columbus Park, <br /> Boston, MA 02109, United States',
    organizer: 'Boston Harbor Now'
  }
}];
const getStackIcon = (icon, transform) => `
  <span class="fa-stack ms-n1 me-3">
    <i class="fas fa-circle fa-stack-2x text-200"></i>
    <i class="${icon} fa-stack-1x text-primary" data-fa-transform=${transform}></i>
  </span>
`;
const getTemplate = event => `
<div class="modal-header bg-body-tertiary ps-card pe-5 border-bottom-0">
  <div>
    <h5 class="modal-title mb-0">${event.title}</h5>
    ${!!event.extendedProps.organizer ? `<p class="mb-0 fs--1 mt-1">
        by <a href="#!">${event.extendedProps.organizer}</a>
      </p>` : ''}
  </div>
  <button type="button" class="btn-close position-absolute end-0 top-0 mt-3 me-3" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body px-card pb-card pt-1 fs--1">
  ${event.extendedProps.description ? `
      <div class="d-flex mt-3">
        ${getStackIcon('fas fa-align-left')}
        <div class="flex-1">
          <h6>Description</h6>
          <p class="mb-0">
            
          ${event.extendedProps.description.split(' ').slice(0, 30).join(' ')}
          </p>
        </div>
      </div>
    ` : ''} 
  <div class="d-flex mt-3">
    ${getStackIcon('fas fa-calendar-check')}
    <div class="flex-1">
        <h6>Date and Time</h6>
        <p class="mb-1">
          ${window.dayjs && window.dayjs(event.start).format('dddd, MMMM D, YYYY, h:mm A')} 
          ${event.end ? `– <br/>${window.dayjs && window.dayjs(event.end).subtract(1, 'day').format('dddd, MMMM D, YYYY, h:mm A')}` : ''}
        </p>
    </div>
  </div>
  ${event.extendedProps.location ? `
        <div class="d-flex mt-3">
          ${getStackIcon('fas fa-map-marker-alt')}
          <div class="flex-1">
              <h6>Location</h6>
              <p class="mb-0">${event.extendedProps.location}</p>
          </div>
        </div>
      ` : ''}
  ${event.schedules ? `
        <div class="d-flex mt-3">
        ${getStackIcon('fas fa-clock')}
        <div class="flex-1">
            <h6>Schedule</h6>
            
            <ul class="list-unstyled timeline mb-0">
              ${event.schedules.map(schedule => `<li>${schedule.title}</li>`).join('')}
            </ul>
        </div>
      ` : ''}
  </div>
</div>
<div class="modal-footer d-flex justify-content-end bg-body-tertiary px-card border-top-0">
  <a href="${document.location.href.split('/').slice(0, 5).join('/')}/app/events/create-an-event.html" class="btn btn-falcon-default btn-sm">
    <span class="fas fa-pencil-alt fs--2 mr-2"></span> Edit
  </a>
  <a href='${document.location.href.split('/').slice(0, 5).join('/')}/app/events/event-detail.html' class="btn btn-falcon-primary btn-sm">
    See more details
    <span class="fas fa-angle-right fs--2 ml-1"></span>
  </a>
</div>
`;

/* -------------------------------------------------------------------------- */
/*                                  bar-chart                                 */
/* -------------------------------------------------------------------------- */

const barChartInit = () => {
  const barChartElement = document.getElementById('chartjs-bar-chart');
  const getOptions = () => ({
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 6, 3],
        backgroundColor: [utils.getSubtleColors()['secondary'], utils.getSubtleColors()['warning'], utils.getSubtleColors()['info'], utils.getSubtleColors()['success'], utils.getSubtleColors()['info'], utils.getSubtleColors()['primary']],
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
        tooltip: chartJsDefaultTooltip(),
        legend: {
          labels: {
            color: utils.getGrays()['500']
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: utils.getGrays()['500']
          },
          grid: {
            color: utils.getGrays()['300'],
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: utils.getGrays()['500']
          },
          grid: {
            color: utils.getGrays()['300'],
            drawBorder: false
          }
        }
      }
    }
  });
  chartJsInit(barChartElement, getOptions);
};

/* eslint-disable */

/* -------------------------------------------------------------------------- */
/*                            Chart Bubble                                    */
/* -------------------------------------------------------------------------- */

const chartBubble = () => {
  const pie = document.getElementById('chartjs-bubble-chart');
  const getOptions = () => ({
    type: 'bubble',
    data: {
      datasets: [{
        label: 'Dataset 1',
        data: getBubbleDataset(5, 5, 15, 0, 100),
        backgroundColor: utils.getColor('info'),
        hoverBackgroundColor: utils.getColor('info')
      }, {
        label: 'Dataset 2',
        data: getBubbleDataset(5, 5, 15, 0, 100),
        backgroundColor: utils.getColor('success'),
        hoverBackgroundColor: utils.getColor('success')
      }, {
        label: 'Dataset 3',
        data: getBubbleDataset(5, 5, 15, 0, 100),
        backgroundColor: utils.getColor('warning'),
        hoverBackgroundColor: utils.getColor('warning')
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: utils.getGrays()['500']
          }
        },
        tooltip: chartJsDefaultTooltip()
      },
      scales: {
        x: {
          ticks: {
            color: utils.getGrays()['500']
          },
          grid: {
            color: utils.getGrays()['300'],
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: utils.getGrays()['500']
          },
          grid: {
            color: utils.getGrays()['300'],
            drawBorder: false
          }
        }
      }
    }
  });
  chartJsInit(pie, getOptions);
};

/* -------------------------------------------------------------------------- */
/*                            Chart Combo                                  */
/* -------------------------------------------------------------------------- */
const chartCombo = () => {
  const combo = document.getElementById('chartjs-combo-chart');
  const getOptions = () => ({
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        type: 'line',
        label: 'Dataset 1',
        borderColor: utils.getColor('primary'),
        borderWidth: 2,
        fill: false,
        data: [55, 80, -60, -22, -50, 40, 90]
      }, {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: utils.getSubtleColors()['danger'],
        data: [4, -80, 90, -22, 70, 35, -50],
        borderWidth: 1
      }, {
        type: 'bar',
        label: 'Dataset 3',
        backgroundColor: utils.getSubtleColors()['primary'],
        data: [-30, 30, -18, 100, -45, -25, -50],
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        tooltip: chartJsDefaultTooltip(),
        legend: {
          position: 'top',
          labels: {
            color: utils.getGrays()['500']
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: utils.getGrays()['500']
          },
          grid: {
            color: utils.getGrays()['300'],
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: utils.getGrays()['500']
          },
          grid: {
            color: utils.getGrays()['300'],
            drawBorder: false
          }
        }
      }
    }
  });
  chartJsInit(combo, getOptions);
};

/* -------------------------------------------------------------------------- */
/*                            Chart Doughnut                                  */
/* -------------------------------------------------------------------------- */
const chartDoughnut = () => {
  const doughnut = document.getElementById('chartjs-doughnut-chart');
  const getOptions = () => ({
    type: 'doughnut',
    data: {
      datasets: [{
        data: [5, 3, 2, 1, 1],
        backgroundColor: [utils.rgbaColor(utils.getColor('facebook'), 0.75), utils.rgbaColor(utils.getColor('youtube'), 0.75), utils.rgbaColor(utils.getColor('twitter'), 0.75), utils.rgbaColor(utils.getColor('linkedin'), 0.75), utils.rgbaColor(utils.getColor('github'), 0.75)],
        borderWidth: 1,
        borderColor: utils.getGrays()['100']
      }],
      labels: ['Facebook', 'Youtube', 'Twitter', 'Linkedin', 'GitHub']
    },
    options: {
      plugins: {
        tooltip: chartJsDefaultTooltip(),
        legend: {
          labels: {
            color: utils.getGrays()['500']
          }
        }
      },
      maintainAspectRatio: false
    }
  });
  chartJsInit(doughnut, getOptions);
};

/* -------------------------------------------------------------------------- */
/*                            Chart Half Doughnut                             */
/* -------------------------------------------------------------------------- */
const chartHalfDoughnutInit = () => {
  const $chartHalfDoughnuts = document.querySelectorAll('[data-half-doughnut]');
  $chartHalfDoughnuts.forEach($chartHalfDoughnut => {
    if ($chartHalfDoughnut) {
      const getOptions = () => {
        const userOptions = utils.getData($chartHalfDoughnut, 'half-doughnut');
        const defaultOptions = {
          type: 'doughnut',
          data: {
            labels: ['Reached', 'Target'],
            datasets: [{
              data: [50, 50],
              backgroundColor: ['primary', 'gray-300'],
              borderWidth: [0, 0, 0, 0]
            }]
          },
          options: {
            rotation: -90,
            circumference: '180',
            cutout: '80%',
            hover: {
              mode: null
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: false
              }
            }
          }
        };
        const options = window._.merge(defaultOptions, userOptions);
        const mergedDatasets = options.data.datasets[0];
        mergedDatasets.backgroundColor = [utils.getColor(mergedDatasets.backgroundColor[0]), utils.getColor(mergedDatasets.backgroundColor[1])];
        return options;
      };
      chartJsInit($chartHalfDoughnut, getOptions);
    }
  });
};

/* -------------------------------------------------------------------------- */
/*                            Chart Line                                  */
/* -------------------------------------------------------------------------- */
const chartLine = () => {
  const line = document.getElementById('chartjs-line-chart');
  const getOptions = () => ({
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        type: 'line',
        label: 'Dataset 1',
        borderColor: utils.getColor('primary'),
        borderWidth: 2,
        fill: false,
        data: [55, 80, 60, 22, 50, 40, 90],
        tension: 0.3
      }]
    },
    options: {
      plugins: {
        tooltip: chartJsDefaultTooltip(),
        legend: {
          labels: {
            color: utils.getGrays()['500']
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: utils.getGrays()['500']
          },
          grid: {
            color: utils.getGrays()['300'],
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: utils.getGrays()['500']
          },
          grid: {
            color: utils.getGrays()['300'],
            drawBorder: false
          }
        }
      }
    }
  });
  chartJsInit(line, getOptions);
};

/* -------------------------------------------------------------------------- */
/*                            Chart Pie                                  */
/* -------------------------------------------------------------------------- */
const chartPie = () => {
  const pie = document.getElementById('chartjs-pie-chart');
  const getOptions = () => ({
    type: 'pie',
    data: {
      datasets: [{
        data: [5, 3, 2, 1, 1],
        backgroundColor: [utils.rgbaColor(utils.getColor('facebook'), 0.75), utils.rgbaColor(utils.getColor('youtube'), 0.75), utils.rgbaColor(utils.getColor('twitter'), 0.75), utils.rgbaColor(utils.getColor('linkedin'), 0.75), utils.rgbaColor(utils.getColor('github'), 0.75)],
        borderWidth: 1,
        borderColor: utils.getGrays()['100']
      }],
      labels: ['Facebook', 'Youtube', 'Twitter', 'Linkedin', 'GitHub']
    },
    options: {
      plugins: {
        tooltip: chartJsDefaultTooltip(),
        legend: {
          labels: {
            color: utils.getGrays()['500']
          }
        }
      },
      maintainAspectRatio: false
    }
  });
  chartJsInit(pie, getOptions);
};

/* -------------------------------------------------------------------------- */
/*                            Chart Polar                                  */
/* -------------------------------------------------------------------------- */
const chartPolar = () => {
  const polar = document.getElementById('chartjs-polar-chart');
  const getOptions = () => ({
    type: 'polarArea',
    data: {
      datasets: [{
        data: [10, 20, 50, 40, 30],
        backgroundColor: [utils.rgbaColor(utils.getColor('facebook'), 0.5), utils.rgbaColor(utils.getColor('youtube'), 0.5), utils.rgbaColor(utils.getColor('twitter'), 0.5), utils.rgbaColor(utils.getColor('linkedin'), 0.5), utils.rgbaColor(utils.getColor('success'), 0.5)],
        borderWidth: 1,
        borderColor: utils.getGrays()['400']
      }],
      labels: ['Facebook', 'Youtube', 'Twitter', 'Linkedin', 'Medium']
    },
    options: {
      plugins: {
        tooltip: chartJsDefaultTooltip(),
        legend: {
          labels: {
            color: utils.getGrays()['500']
          }
        }
      },
      maintainAspectRatio: false,
      scales: {
        r: {
          grid: {
            color: utils.getGrays()['300']
          }
        }
      }
    }
  });
  chartJsInit(polar, getOptions);
};

/* -------------------------------------------------------------------------- */
/*                            Chart Radar                                  */
/* -------------------------------------------------------------------------- */
const chartRadar = () => {
  const radar = document.getElementById('chartjs-radar-chart');
  const getOptions = () => ({
    type: 'radar',
    data: {
      labels: ['English', 'Maths', 'Physics', 'Chemistry', 'Biology', 'History'],
      datasets: [{
        label: 'Student A',
        backgroundColor: utils.rgbaColor(utils.getColor('success'), 0.5),
        data: [65, 75, 70, 80, 60, 80],
        borderWidth: 1
      }, {
        label: 'Student B',
        backgroundColor: utils.rgbaColor(utils.getColor('primary'), 0.5),
        data: [54, 65, 60, 70, 70, 75],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        tooltip: chartJsDefaultTooltip(),
        legend: {
          labels: {
            color: utils.getGrays()['500']
          }
        }
      },
      maintainAspectRatio: false,
      scales: {
        r: {
          grid: {
            color: utils.getGrays()['300']
          }
        }
      }
    }
  });
  chartJsInit(radar, getOptions);
};

/* -------------------------------------------------------------------------- */
/*                            Chart Scatter                                   */
/* -------------------------------------------------------------------------- */
const chartScatter = () => {
  const scatter = document.getElementById('chartjs-scatter-chart');
  const getOptions = () => ({
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Dataset one',
        data: [{
          x: -98,
          y: 42
        }, {
          x: -85,
          y: -29
        }, {
          x: -87,
          y: -70
        }, {
          x: -53,
          y: 28
        }, {
          x: -29,
          y: 4
        }, {
          x: -2,
          y: -42
        }, {
          x: 5,
          y: 3
        }, {
          x: 39,
          y: 19
        }, {
          x: 49,
          y: 79
        }, {
          x: 83,
          y: -9
        }, {
          x: 93,
          y: 12
        }],
        pointBackgroundColor: utils.getColor('primary'),
        borderColor: utils.getColor('primary'),
        borderWidth: 1
      }, {
        label: 'Dataset Two',
        data: [{
          x: 53,
          y: 12
        }, {
          x: -78,
          y: 42
        }, {
          x: -65,
          y: -39
        }, {
          x: -57,
          y: -20
        }, {
          x: 57,
          y: 28
        }, {
          x: -35,
          y: 75
        }, {
          x: -29,
          y: -43
        }, {
          x: 15,
          y: 31
        }, {
          x: 97,
          y: 19
        }, {
          x: 49,
          y: 69
        }, {
          x: 33,
          y: -57
        }],
        pointBackgroundColor: utils.getColor('warning'),
        borderColor: utils.getColor('warning'),
        borderWidth: 1,
        borderRadius: '50%'
      }]
    },
    options: {
      plugins: {
        tooltip: chartJsDefaultTooltip(),
        legend: {
          labels: {
            color: utils.getGrays()['500']
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: utils.getGrays()['500']
          },
          grid: {
            color: utils.getGrays()['300'],
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: utils.getGrays()['500']
          },
          grid: {
            color: utils.getGrays()['300'],
            drawBorder: false
          }
        }
      },
      animation: {
        duration: 2000
      }
    }
  });
  chartJsInit(scatter, getOptions);
};

/* -------------------------------------------------------------------------- */
/*                            ChartJs Initialization                          */
/* -------------------------------------------------------------------------- */

const chartJsInit = (chartEl, config) => {
  if (!chartEl) return;
  const ctx = chartEl.getContext('2d');
  let chart = new window.Chart(ctx, config());
  const themeController = document.body;
  themeController.addEventListener('clickControl', ({
    detail: {
      control
    }
  }) => {
    if (control === 'theme') {
      chart.destroy();
      chart = new window.Chart(ctx, config());
    }
    return null;
  });
};
const chartJsDefaultTooltip = () => ({
  backgroundColor: utils.getGrays()['100'],
  borderColor: utils.getGrays()['300'],
  borderWidth: 1,
  titleColor: utils.getColors()['emphasis'],
  callbacks: {
    labelTextColor() {
      return utils.getColors()['emphasis'];
    }
  }
});
const getBubbleDataset = (count, rmin, rmax, min, max) => {
  const arr = Array.from(Array(count).keys());
  return arr.map(() => ({
    x: utils.getRandomNumber(min, max),
    y: utils.getRandomNumber(min, max),
    r: utils.getRandomNumber(rmin, rmax)
  }));
};

/* eslint-disable */

/* -------------------------------------------------------------------------- */
/*                            Chart Scatter                                   */
/* -------------------------------------------------------------------------- */
const productShareDoughnutInit = () => {
  const marketShareDoughnutElement = document.getElementById('marketShareDoughnut');
  const getOptions = () => ({
    type: 'doughnut',
    data: {
      labels: ['Flacon', 'Sparrow'],
      datasets: [{
        data: [50, 88],
        backgroundColor: [utils.getColor('primary'), utils.getColor('gray-300')],
        borderColor: [utils.getColor('primary'), utils.getColor('gray-300')]
      }]
    },
    options: {
      tooltips: chartJsDefaultTooltip(),
      rotation: -90,
      circumference: '180',
      cutout: '80%',
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
  chartJsInit(marketShareDoughnutElement, getOptions);
};

/* -------------------------------------------------------------------------- */
/*                          D3 Packed Bubble Chart                            */
/* -------------------------------------------------------------------------- */

const D3PackedBubbleInit = () => {
  const $d3PackedBubble = document.querySelector('.d3-packed-bubble-chart');
  if ($d3PackedBubble) {
    const width = 960;
    const height = 960;
    const itemsSpacing = 30;
    const svg = d3.select('.d3-packed-bubble-svg');
    const tooltip = d3.select('.d3-packed-bubble-tooltip');
    const tooltipDot = tooltip.select('.d3-tooltip-dot');
    const tooltipName = tooltip.select('.d3-tooltip-name');
    const tooltipValue = tooltip.select('.d3-tooltip-value');
    const tooltipStyles = {
      backgroundColor: utils.getColor('gray-100'),
      tooltipNameColor: utils.getColor('gray-700'),
      tooltipValueColor: utils.getColor('gray-700')
    };
    const labelStyles = {
      fill: '#ffffff',
      fontSize: '1.8rem'
    };
    const packedBubbleData = [{
      name: 'Blockchain',
      value: 160,
      color: '#2A7BE4'
    }, {
      name: 'NFT',
      value: 20,
      color: '#1956A6'
    }, {
      name: 'HTML',
      value: 90,
      color: '#195099'
    }, {
      name: 'Crypto',
      value: 57,
      color: '#2A7BE4'
    }, {
      name: 'Photoshop',
      value: 117,
      color: '#2A7BE4'
    }, {
      name: 'UX',
      value: 20,
      color: '#1956A6'
    }, {
      name: 'AWS',
      value: 90,
      color: '#195099'
    }, {
      name: '3D',
      value: 33,
      color: '#9DBFEB'
    }, {
      name: 'Writing',
      value: 117,
      color: '#2A7BE4'
    }, {
      name: 'sql',
      value: 20,
      color: '#1956A6'
    }, {
      name: 'Blender',
      value: 90,
      color: '#195099'
    }, {
      name: 'UI/UX',
      value: 33,
      color: '#9DBFEB'
    }, {
      name: 'Blockchain',
      value: 117,
      color: '#2A7BE4'
    }, {
      name: 'css',
      value: 20,
      color: '#1956A6'
    }, {
      name: 'Marketing',
      value: 90,
      color: '#195099'
    }, {
      name: 'Meta',
      value: 33,
      color: '#9DBFEB'
    }, {
      name: 'js',
      value: 12,
      color: '#0F67D9'
    }, {
      name: 'FOREX',
      value: 66,
      color: '#7FA5D5'
    }, {
      name: 'UI',
      value: 33,
      color: '#8ABBFB'
    }, {
      name: 'Vector',
      value: 56,
      color: '#85B6F5'
    }, {
      name: 'CAD',
      value: 28,
      color: '#6486B4'
    }, {
      name: 'Python',
      value: 66,
      color: '#2A7BE4'
    }, {
      name: 'Adobe',
      value: 66,
      color: '#68A0E9'
    }, {
      name: 'C#',
      value: 20,
      color: '#385780'
    }, {
      name: 'Branding',
      value: 88,
      color: '#74A2DE'
    }, {
      name: 'Bitcoin',
      value: 80,
      color: '#4E7AB4'
    }, {
      name: 'AI',
      value: 34,
      color: '#71AFFF'
    }];
    const generateChart = data => {
      const bubble = bubbleData => d3.pack().size([width, height]).padding(itemsSpacing)(d3.hierarchy({
        children: bubbleData
      }).sum(d => d.value));
      tooltip.style('visibility', 'hidden');
      svg.attr('width', '100%').attr('height', '100%').attr('viewBox', `-20 10 ${width} ${height}`);
      const root = bubble(data);
      const node = svg.selectAll().data(root.children).enter().append('g').style('cursor', 'pointer').style('pointer-events', 'all').attr('text-anchor', 'middle').on('mousemove', e => tooltip.style('top', `${e.clientY - 40}px`).style('left', `${e.clientX - 40}px`)).attr('transform', d => `translate(${d.x}, ${d.y})`);
      const circle = node.append('circle').style('fill', d => d.data.color).on('mouseover', (e, d) => {
        d3.select(e.target).transition().ease(d3.easeExpInOut).duration(200).attr('r', diagram => diagram.r * 1.1);
        tooltip.style('visibility', 'visible').style('z-index', '100000').style('background-color', tooltipStyles.backgroundColor).style('border', `1px solid ${d.data.color}`);
        tooltipDot.style('background-color', d.data.color);
        tooltipName.text(d.data.name).style('color', tooltipStyles.tooltipNameColor);
        tooltipValue.text(d.data.value).style('color', tooltipStyles.tooltipValueColor);
      }).on('mouseout', e => {
        d3.select(e.target).transition().ease(d3.easeExpInOut).duration(200).attr('r', d => d.r);
        tooltip.style('visibility', 'hidden');
      });
      const label = node.append('text').style('fill', labelStyles.fill).style('font-size', labelStyles.fontSize).style('pointer-events', 'none').style('opacity', 0).attr('dy', '.35em').text(d => d.data.name);
      node.transition().ease(d3.easeExpInOut).duration(1000);
      circle.transition().ease(d3.easeExpInOut).duration(1000).attr('r', d => d.r);
      label.transition().delay(400).ease(d3.easeExpInOut).duration(2000).style('opacity', 1);
    };
    generateChart(packedBubbleData);
  }
};

/* -------------------------------------------------------------------------- */
/*                           Trending Keywords                                */
/* -------------------------------------------------------------------------- */

const trendingKeywordsInit = () => {
  const $d3TrendingKeywords = document.querySelector('.d3-trending-keywords');
  if ($d3TrendingKeywords) {
    const width = 960;
    const height = 960;
    const itemsSpacing = 30;
    const svg = d3.select('.d3-trending-keywords-svg');
    const tooltip = d3.select('.d3-trending-keywords-tooltip');
    const tooltipDot = tooltip.select('.d3-tooltip-dot');
    const tooltipName = tooltip.select('.d3-tooltip-name');
    const tooltipValue = tooltip.select('.d3-tooltip-value');
    const tooltipStyles = {
      backgroundColor: utils.getColor('gray-100'),
      tooltipNameColor: utils.getColor('gray-700'),
      tooltipValueColor: utils.getColor('gray-700')
    };
    const labelStyles = {
      fill: '#ffffff',
      fontSize: '1.8rem'
    };
    const trendingKeywordsData = [{
      name: '포스코',
      value: 160,
      color: '#2A7BE4'
    }, {
      name: '철근',
      value: 20,
      color: '#1956A6'
    }, {
      name: '포스코퓨처엠',
      value: 90,
      color: '#195099'
    }, {
      name: '회수',
      value: 57,
      color: '#2A7BE4'
    }, {
      name: '개발',
      value: 117,
      color: '#2A7BE4'
    }, {
      name: '폐내화물',
      value: 20,
      color: '#1956A6'
    }, {
      name: '바이오원료',
      value: 90,
      color: '#195099'
    }, {
      name: '식약처',
      value: 33,
      color: '#9DBFEB'
    }, {
      name: '광산',
      value: 117,
      color: '#2A7BE4'
    }, {
      name: '포스코이앤씨',
      value: 20,
      color: '#1956A6'
    }, {
      name: '호주',
      value: 90,
      color: '#195099'
    }, {
      name: '국감',
      value: 33,
      color: '#9DBFEB'
    }, {
      name: '철근누락',
      value: 117,
      color: '#2A7BE4'
    }, {
      name: '사업',
      value: 20,
      color: '#1956A6'
    }, {
      name: '전기차',
      value: 90,
      color: '#195099'
    }, {
      name: '컬러강판',
      value: 33,
      color: '#9DBFEB'
    }, {
      name: '포스코인터내셔널',
      value: 12,
      color: '#0F67D9'
    }, {
      name: 'ISO50001',
      value: 66,
      color: '#7FA5D5'
    }, {
      name: '체결',
      value: 33,
      color: '#8ABBFB'
    }, {
      name: '부실시공',
      value: 56,
      color: '#85B6F5'
    }, {
      name: '동국씨엠',
      value: 28,
      color: '#6486B4'
    }, {
      name: '최정우교수',
      value: 66,
      color: '#2A7BE4'
    }, {
      name: '공급',
      value: 66,
      color: '#68A0E9'
    }, {
      name: '솔루션',
      value: 20,
      color: '#385780'
    }, {
      name: '투자비',
      value: 88,
      color: '#74A2DE'
    }, {
      name: '광산',
      value: 80,
      color: '#4E7AB4'
    }, {
      name: '폐배터리',
      value: 34,
      color: '#71AFFF'
    }];
    const generateChart = data => {
      const bubble = bubbleData => d3.pack().size([width, height]).padding(itemsSpacing)(d3.hierarchy({
        children: bubbleData
      }).sum(d => d.value));
      tooltip.style('visibility', 'hidden');
      svg.attr('width', '100%').attr('height', '100%').attr('viewBox', `-20 10 ${width} ${height}`);
      const root = bubble(data);
      const node = svg.selectAll().data(root.children).enter().append('g').style('cursor', 'pointer').style('pointer-events', 'all').attr('text-anchor', 'middle').on('mousemove', e => tooltip.style('top', `${e.clientY - 40}px`).style('left', `${e.clientX - 40}px`)).attr('transform', d => `translate(${d.x}, ${d.y})`);
      const circle = node.append('circle').style('fill', d => d.data.color).on('mouseover', (e, d) => {
        d3.select(e.target).transition().ease(d3.easeExpInOut).duration(200).attr('r', diagram => diagram.r * 1.1);
        tooltip.style('visibility', 'visible').style('z-index', '100000').style('background-color', tooltipStyles.backgroundColor).style('border', `1px solid ${d.data.color}`);
        tooltipDot.style('background-color', d.data.color);
        tooltipName.text(d.data.name).style('color', tooltipStyles.tooltipNameColor);
        tooltipValue.text(d.data.value).style('color', tooltipStyles.tooltipValueColor);
      }).on('mouseout', e => {
        d3.select(e.target).transition().ease(d3.easeExpInOut).duration(200).attr('r', d => d.r);
        tooltip.style('visibility', 'hidden');
      });
      const label = node.append('text').style('fill', labelStyles.fill).style('font-size', labelStyles.fontSize).style('pointer-events', 'none').style('opacity', 0).attr('dy', '.35em').text(d => d.data.name);
      node.transition().ease(d3.easeExpInOut).duration(1000);
      circle.transition().ease(d3.easeExpInOut).duration(1000).attr('r', d => d.r);
      label.transition().delay(400).ease(d3.easeExpInOut).duration(2000).style('opacity', 1);
    };
    generateChart(trendingKeywordsData);
  }
};

/* -------------------------------------------------------------------------- */
/*                             Echarts Active Users                           */
/* -------------------------------------------------------------------------- */

const activeUsersChartReportInit = () => {
  const $echartsActiveUsersChart = document.querySelector('.echart-active-users-report');
  if ($echartsActiveUsersChart) {
    const userOptions = utils.getData($echartsActiveUsersChart, 'options');
    const chart = window.echarts.init($echartsActiveUsersChart);
    const tooltipFormatter = params => {
      return `
      <div>
        <p class='mb-2 text-600'>${window.dayjs(params[0].axisValue).format('MMM DD, YYYY')}</p>
        <div class='ms-1'>
          <h6 class="fs--1 text-700"><span class="fas fa-circle text-primary me-2"></span>${params[0].value}</h6>
          <h6 class="fs--1 text-700"><span class="fas fa-circle text-success me-2"></span>${params[1].value}</h6>
          <h6 class="fs--1 text-700"><span class="fas fa-circle text-info me-2"></span>${params[2].value}</h6>
        </div>
      </div>
      `;
    };
    const getDefaultOptions = () => ({
      color: [utils.getColor('primary'), utils.getColor('success'), utils.getColor('info')],
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        },
        formatter: tooltipFormatter
      },
      xAxis: {
        type: 'category',
        data: utils.getPastDates(30).map(date => window.dayjs(date).format('DD MMM, YYYY')),
        boundaryGap: false,
        silent: true,
        axisPointer: {
          lineStyle: {
            color: utils.getGrays()['300']
          }
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['300']
          }
        },
        axisTick: {
          show: true,
          length: 20,
          lineStyle: {
            color: utils.getGrays()['200']
          },
          interval: 5
        },
        axisLabel: {
          color: utils.getGrays()['600'],
          formatter: value => window.dayjs(value).format('MMM DD'),
          align: 'left',
          fontSize: 11,
          padding: [0, 0, 0, 5],
          interval: 5
        }
      },
      yAxis: {
        type: 'value',
        position: 'right',
        axisPointer: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['200']
          }
        },
        axisLabel: {
          show: true,
          color: utils.getGrays()['600'],
          formatter: value => `${Math.round(value / 1000 * 10) / 10}k`
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      series: [{
        type: 'line',
        data: [4164, 4652, 4817, 4841, 4920, 5439, 5486, 5498, 5512, 5538, 5841, 5877, 6086, 6146, 6199, 6431, 6704, 7939, 8127, 8296, 8322, 8389, 8411, 8502, 8868, 8977, 9273, 9325, 9345, 9430],
        showSymbol: false,
        symbol: 'circle',
        itemStyle: {
          borderColor: utils.getColors().primary,
          borderWidth: 2
        },
        lineStyle: {
          color: utils.getColor('primary')
        },
        symbolSize: 2
      }, {
        type: 'line',
        data: [2164, 2292, 2386, 2430, 2528, 3045, 3255, 3295, 3481, 3604, 3688, 3840, 3932, 3949, 4003, 4298, 4424, 4869, 4922, 4973, 5155, 5267, 5566, 5689, 5692, 5758, 5773, 5799, 5960, 6000],
        showSymbol: false,
        symbol: 'circle',
        itemStyle: {
          borderColor: utils.getColors().success,
          borderWidth: 2
        },
        lineStyle: {
          color: utils.getColor('success')
        },
        symbolSize: 2
      }, {
        type: 'line',
        data: [1069, 1089, 1125, 1141, 1162, 1179, 1185, 1216, 1274, 1322, 1346, 1395, 1439, 1564, 1581, 1590, 1656, 1815, 1868, 2010, 2133, 2179, 2264, 2265, 2278, 2343, 2354, 2456, 2472, 2480],
        showSymbol: false,
        symbol: 'circle',
        itemStyle: {
          borderColor: utils.getColors().info,
          borderWidth: 2
        },
        lineStyle: {
          color: utils.getColor('info')
        },
        symbolSize: 2
      }],
      grid: {
        right: '30px',
        left: '5px',
        bottom: '20px',
        top: '20px'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                                Market Share                                */
/* -------------------------------------------------------------------------- */

const assignmentScoresInit = () => {
  const $echartAssignmentScores = document.querySelector('.echart-assignment-scores');
  if ($echartAssignmentScores) {
    const userOptions = utils.getData($echartAssignmentScores, 'options');
    const chart = window.echarts.init($echartAssignmentScores);
    const data = [{
      value: 12,
      name: '90-100%'
    }, {
      value: 16,
      name: '70-90%'
    }, {
      value: 12,
      name: '40-70%'
    }, {
      value: 2,
      name: '0-40%'
    }];
    const getDefaultOptions = () => ({
      color: [utils.getColors().success, utils.getColors().primary, utils.getColors().info, utils.getColors().warning],
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        formatter(params) {
          return `<strong>${params.data.name}:</strong> ${params.data.value} courses`;
        }
      },
      position(pos, params, dom, rect, size) {
        return getPosition(pos, params, dom, rect, size);
      },
      legend: {
        show: false
      },
      series: [{
        type: 'pie',
        radius: ['85%', '60%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,
        itemStyle: {
          borderWidth: 2,
          borderColor: utils.getColor('gray-100')
        },
        label: {
          normal: {
            show: false,
            position: 'center',
            textStyle: {
              fontSize: '20',
              fontWeight: '500',
              color: utils.getGrays()['700']
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data
      }]
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                                Audience Chart                              */
/* -------------------------------------------------------------------------- */

const audienceChartInit = () => {
  const data = {
    dates: utils.getPastDates(7),
    dataset: {
      users: [[504, 333, 400, 606, 451, 685, 404], [237, 229, 707, 575, 420, 536, 258]],
      sessions: [[322, 694, 235, 537, 791, 292, 806], [584, 661, 214, 286, 526, 707, 627]],
      rate: [[789, 749, 412, 697, 633, 254, 472], [276, 739, 525, 394, 643, 653, 719]],
      duration: [[625, 269, 479, 654, 549, 305, 671], [499, 670, 550, 222, 696, 695, 469]]
    }
  };
  const tooltipFormatter = params => {
    const percentage = (params[0].value - params[1].value) / params[1].value * 100;
    const perTemp = `
      <div class="d-flex align-items-center ms-2">
        <span class="fas fa-caret-${percentage < 0 ? 'down' : 'up'} text-${percentage < 0 ? 'danger' : 'success'}"></span>
        <h6 class="fs--2 mb-0 ms-1 fw-semi-bold">${Math.abs(percentage).toFixed(2)} %</h6>
      </div>
    `;
    const currentDate = new Date(params[0].axisValue);
    const prevDate = new Date(new Date().setDate(currentDate.getDate() - 7));
    return `<div>
          <p class='mb-0 fs--2 text-600'>${window.dayjs(params[0].axisValue).format('MMM DD')} vs ${window.dayjs(prevDate).format('MMM DD')}</p>
          <div class="d-flex align-items-center">
            <p class='mb-0 text-600 fs--1'>
              Users: <span class='text-800 fw-semi-bold fs--1'>${params[0].data}</span>
            </p>
            ${perTemp}
          </div>
        </div>`;
  };
  const getDefaultOptions = (data1, data2) => () => ({
    color: utils.getGrays()['100'],
    tooltip: {
      trigger: 'axis',
      padding: [7, 10],
      backgroundColor: utils.getGrays()['100'],
      borderColor: utils.getGrays()['300'],
      textStyle: {
        color: utils.getGrays()['1100']
      },
      borderWidth: 1,
      transitionDuration: 0,
      position(pos, params, dom, rect, size) {
        return getPosition(pos, params, dom, rect, size);
      },
      axisPointer: {
        type: 'none'
      },
      formatter: tooltipFormatter
    },
    xAxis: {
      type: 'category',
      data: data.dates,
      axisLabel: {
        color: utils.getGrays()['600'],
        formatter: value => window.dayjs(value).format('MMM DD'),
        align: 'left',
        fontSize: 11,
        padding: [0, 0, 0, 5],
        showMaxLabel: false
      },
      axisLine: {
        lineStyle: {
          color: utils.getGrays()['200']
        }
      },
      axisTick: {
        show: true,
        length: 20,
        lineStyle: {
          color: utils.getGrays()['200']
        }
      },
      boundaryGap: false
    },
    yAxis: {
      position: 'right',
      axisPointer: {
        type: 'none'
      },
      axisTick: 'none',
      splitLine: {
        lineStyle: {
          color: utils.getGrays()['200']
        }
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        color: utils.getGrays()['600']
      }
    },
    series: [{
      type: 'line',
      data: data1,
      showSymbol: false,
      symbol: 'circle',
      itemStyle: {
        borderColor: utils.getColors().primary,
        borderWidth: 2
      },
      lineStyle: {
        color: utils.getColor('primary')
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: utils.rgbaColor(utils.getColors().primary, 0.2)
          }, {
            offset: 1,
            color: utils.rgbaColor(utils.getColors().primary, 0)
          }]
        }
      }
    }, {
      type: 'line',
      data: data2,
      symbol: 'none',
      lineStyle: {
        type: 'dashed',
        width: 1,
        color: utils.getColor('info')
      }
    }],
    grid: {
      right: '40px',
      left: '5px',
      bottom: '10%',
      top: '3%'
    }
  });
  const initChart = (el, options) => {
    const userOptions = utils.getData(el, 'options');
    const chart = window.echarts.init(el);
    echartSetOption(chart, userOptions, options);
  };
  const tab = document.querySelector('#audience-chart-tab');
  if (tab) {
    initChart(document.querySelector('.echart-audience'), getDefaultOptions(data.dataset.users[0], data.dataset.users[1]));
    const triggerTabList = Array.from(tab.querySelectorAll('[data-bs-toggle="tab"]'));
    triggerTabList.forEach(function (triggerEl) {
      triggerEl.addEventListener('shown.bs.tab', function () {
        const key = triggerEl.href.split('#').pop();
        const $echartAudience = document.getElementById(key).querySelector('.echart-audience');
        initChart($echartAudience, getDefaultOptions(data.dataset[key][0], data.dataset[key][1]));
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                      Echarts Total Sales Courses                           */
/* -------------------------------------------------------------------------- */

const avgEnrollmentRateInit = () => {
  const $echartsLineAvgEnrollmentLms = document.querySelector('.echart-avg-enrollment-rate');
  function getFormatter(params) {
    return params.map(({
      seriesName,
      value,
      borderColor
    }) => `<span class= "fas fa-circle fs--2" style="color: ${borderColor}"></span>
            <span class='text-600'>
              ${seriesName} : <strong>${value}</strong>
            </span>`).join('<br/>');
  }
  if ($echartsLineAvgEnrollmentLms) {
    const userOptions = utils.getData($echartsLineAvgEnrollmentLms, 'options');
    const onSaleCourseRate = document.querySelector(`#${userOptions.optionOne}`);
    const regularPaidCourseRate = document.querySelector(`#${userOptions.optionTwo}`);
    const chart = window.echarts.init($echartsLineAvgEnrollmentLms);
    const getDefaultOptions = () => ({
      color: utils.getGrays()['100'],
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        formatter(params) {
          return getFormatter(params);
        },
        transitionDuration: 0
      },
      legend: {
        show: false
      },
      xAxis: [{
        type: 'category',
        position: 'bottom',
        data: ['launch', 'week 1', 'week 2', 'week 3', 'week 4', 'week 5', 'week 6', 'week 7', 'week 8', 'week 9', 'week 10', 'week 11', 'week 12'],
        boundaryGap: false,
        axisPointer: {
          lineStyle: {
            color: utils.getGrays()['200'],
            type: 'line'
          }
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['200'],
            type: 'line'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getColor('gray-500'),
          formatter(value) {
            return value;
          },
          interval: 3,
          margin: 15,
          showMinLabel: true,
          showMaxLabel: false,
          align: 'center'
        }
      }, {
        type: 'category',
        position: 'bottom',
        data: ['launch', 'week 1', 'week 2', 'week 3', 'week 4', 'week 5', 'week 6', 'week 7', 'week 8', 'week 9', 'week 10', 'week 11', 'week 12'],
        boundaryGap: false,
        axisPointer: {
          lineStyle: {
            color: utils.getGrays()['200'],
            type: 'line'
          }
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['200'],
            type: 'line'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getColor('gray-500'),
          formatter(value) {
            return value;
          },
          interval: 200,
          margin: 15,
          showMaxLabel: true,
          showMinLabel: false,
          align: 'right'
        }
      }],
      yAxis: {
        type: 'value',
        splitNumber: 3,
        axisPointer: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: utils.getColor('gray-200'),
            type: 'line'
          }
        },
        boundaryGap: false,
        axisLabel: {
          showMinLabel: false,
          show: true,
          color: utils.getColor('gray-400'),
          formatter: value => `${Math.round(value / 1000 * 10) / 10}k`
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      series: [{
        name: 'On Sale Course',
        type: 'line',
        data: [2000, 2800, 2200, 3001, 600, 600, 2000, 2000, 700, 1000, 200, 900, 1200],
        lineStyle: {
          color: utils.getColor('primary')
        },
        itemStyle: {
          borderColor: utils.getColor('primary'),
          borderWidth: 2
        },
        symbol: 'circle',
        symbolSize: 10,
        hoverAnimation: true
      }, {
        name: 'Regular Paid Course',
        type: 'line',
        data: [1700, 1200, 500, 700, 1500, 1100, 700, 1100, 2600, 2050, 1050, 600, 700],
        lineStyle: {
          color: utils.getColor('warning'),
          type: 'dashed'
        },
        itemStyle: {
          borderColor: utils.getColor('warning'),
          borderWidth: 2
        },
        symbol: 'circle',
        symbolSize: 10,
        hoverAnimation: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: utils.rgbaColor(utils.getColor('warning'), 0.4)
            }, {
              offset: 1,
              color: utils.rgbaColor(utils.getColor('warning'), 0)
            }]
          }
        }
      }],
      grid: {
        right: '10px',
        left: '30px',
        bottom: '15%',
        top: '5%'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
    onSaleCourseRate.addEventListener('click', () => {
      onSaleCourseRate.classList.toggle('opacity-50');
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'On Sale Course'
      });
    });
    regularPaidCourseRate.addEventListener('click', () => {
      regularPaidCourseRate.classList.toggle('opacity-50');
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'Regular Paid Course'
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                            Bandwidth Saved                                 */
/* -------------------------------------------------------------------------- */

const bandwidthSavedInit = () => {
  const $echartsBandwidthSaved = document.querySelector('.echart-bandwidth-saved');
  if ($echartsBandwidthSaved) {
    const userOptions = utils.getData($echartsBandwidthSaved, 'options');
    const chart = window.echarts.init($echartsBandwidthSaved);
    const getDefaultOptions = () => ({
      series: [{
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        radius: '90%',
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 0,
                color: '#1970e2'
              }, {
                offset: 1,
                color: '#4695ff'
              }]
            }
          }
        },
        axisLine: {
          lineStyle: {
            width: 8,
            color: [[1, utils.getColor('gray-200')]]
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        data: [{
          value: 93,
          detail: {
            offsetCenter: ['7%', '4%']
          }
        }],
        detail: {
          width: 50,
          height: 14,
          fontSize: 28,
          fontWeight: 500,
          fontFamily: 'poppins',
          color: utils.getColor('gray-500'),
          formatter: '{value}%',
          valueAnimation: true
        },
        animationDuration: 3000
      }]
    });
    const initChart = () => {
      if (utils.isScrolledIntoView($echartsBandwidthSaved)) {
        echartSetOption(chart, userOptions, getDefaultOptions);
        window.removeEventListener('scroll', initChart);
      }
    };
    window.addEventListener('scroll', initChart);
  }
};

/* -------------------------------------------------------------------------- */
/*                     Echart Bar Member info                                 */
/* -------------------------------------------------------------------------- */

const basicEchartsInit = () => {
  const $echartBasicCharts = document.querySelectorAll('[data-echarts]');
  $echartBasicCharts.forEach($echartBasicChart => {
    const userOptions = utils.getData($echartBasicChart, 'echarts');
    const chart = window.echarts.init($echartBasicChart);
    const getDefaultOptions = () => ({
      color: utils.getColors().primary,
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'none'
        },
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        }
      },
      xAxis: {
        type: 'category',
        show: false,
        boundaryGap: false
      },
      yAxis: {
        show: false,
        type: 'value',
        boundaryGap: false
      },
      series: [{
        type: 'bar',
        symbol: 'none',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: utils.rgbaColor(utils.getColor('primary'), 0.25)
            }, {
              offset: 1,
              color: utils.rgbaColor(utils.getColor('primary'), 0)
            }]
          }
        }
      }],
      grid: {
        right: '0',
        left: '0',
        bottom: '0',
        top: '0'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  });
};

/* -------------------------------------------------------------------------- */
/*                             Echarts Bounce Rate                            */
/* -------------------------------------------------------------------------- */

const bounceRateChartInit = () => {
  const $echartsBounceRateChart = document.querySelector('.echart-bounce-rate');
  const tooltipFormatter = params => {
    return `<div>
          <p class='mb-0 text-600'>${window.dayjs(params[0].axisValue).format('DD, MMMM')}</p>
          <div class="d-flex align-items-center">
            <p class="mb-0 text-600">
              Rate : <span class='text-800'>${params[0].value}%</span>
            </p>
          </div>
        </div>`;
  };
  const dataset = {
    week: [41, 45, 37, 44, 35, 39, 43],
    month: [40, 37, 42, 44, 36, 39, 37, 43, 38, 35, 43, 39, 42, 36, 37, 36, 42, 44, 34, 41, 37, 41, 40, 40, 43, 34, 41, 35, 44, 41, 40]
  };
  if ($echartsBounceRateChart) {
    const userOptions = utils.getData($echartsBounceRateChart, 'options');
    const chart = window.echarts.init($echartsBounceRateChart);
    const getDefaultOptions = () => ({
      color: utils.getGrays()['100'],
      title: {
        text: 'Bounce Rate',
        padding: [5, 0, 0, 0],
        textStyle: {
          color: utils.getGrays()['900'],
          fontSize: 13,
          fontWeight: 600
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        },
        formatter: tooltipFormatter
      },
      xAxis: {
        type: 'category',
        data: utils.getPastDates(30).map(date => window.dayjs(date).format('DD MMM, YYYY')),
        axisPointer: {
          lineStyle: {
            color: utils.getGrays()['300']
          }
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['400']
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['600'],
          formatter: value => window.dayjs(value).format('MMM DD'),
          fontSize: 11
        }
      },
      yAxis: {
        type: 'value',
        axisPointer: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['200']
          }
        },
        axisLabel: {
          show: true,
          color: utils.getGrays()['600'],
          formatter: value => `${value}%`,
          margin: 15
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      series: [{
        type: 'line',
        data: [40, 37, 42, 44, 36, 39, 37, 43, 38, 35, 43, 39, 42, 36, 37, 36, 42, 44, 34, 41, 37, 41, 40, 40, 43, 34, 41, 35, 44, 41, 40],
        showSymbol: false,
        symbol: 'circle',
        itemStyle: {
          borderColor: utils.getColors().primary,
          borderWidth: 2
        },
        lineStyle: {
          color: utils.getColor('primary')
        },
        symbolSize: 2
      }],
      grid: {
        right: '10px',
        left: '40px',
        bottom: '10%',
        top: '13%'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
    const selectMenu = document.querySelector("[data-target='.echart-bounce-rate']");
    if (selectMenu) {
      selectMenu.addEventListener('change', e => {
        const value = e.currentTarget.value;
        chart.setOption({
          xAxis: {
            data: utils.getPastDates(value).map(date => window.dayjs(date).format('DD MMM, YYYY'))
          },
          series: [{
            data: dataset[value]
          }]
        });
      });
    }
  }
};

/* -------------------------------------------------------------------------- */
/*                                Browsed Courses                           */
/* -------------------------------------------------------------------------- */

const browsedCoursesInit = () => {
  const $echartsBrowsedCourses = document.querySelector('.echart-browsed-courses');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const tooltipFormatter = params => `
    <div>
      <p class='mb-2 text-600'>
      ${window.dayjs(params[0].axisValue).isValid() ? window.dayjs(params[0].axisValue).format('MMMM YYYY') : params[0].axisValue}
      </p>
      ${params.map(({
    seriesName,
    value,
    borderColor
  }) => `<span class= "fas fa-circle fs--2" style="color: ${borderColor}"></span>
            <span class='text-600'>
              ${seriesName} : <strong>${value}</strong>
            </span>`).join('<br />')}
    </div>`;
  if ($echartsBrowsedCourses) {
    const userOptions = utils.getData($echartsBrowsedCourses, 'options');
    const newCourseBrowsedEl = document.querySelector(`#${userOptions.optionOne}`);
    const paidCourseBrowsedEl = document.querySelector(`#${userOptions.optionTwo}`);
    const chart = window.echarts.init($echartsBrowsedCourses);
    const getDefaultOptions = () => ({
      color: utils.getGrays()['100'],
      legend: {
        data: ['newCourseBrowsed', 'paidCourseBrowsed'],
        show: false
      },
      xAxis: {
        type: 'category',
        data: ['2020-01-01', '2020-02-01', '2020-03-01', '2020-04-01', '2020-05-01', '2020-06-01', '2020-07-01', '2020-08-01', '2020-09-01', '2020-10-01', '2020-11-01', '2020-12-01', '2021-01-01', '2021-02-01', '2021-03-01', '2021-04-01', '2021-05-01', '2021-06-01', '2021-07-01', '2021-08-01', '2021-09-01', '2021-10-01', '2021-11-01', '2021-12-01'],
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['600'],
          formatter: value => {
            const date = new Date(value);
            return `${months[date.getMonth()]}`;
          },
          interval: 2
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        axisPointer: {
          type: 'none'
        },
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        formatter(params) {
          return tooltipFormatter(params);
        }
      },
      series: [{
        name: 'Total',
        type: 'bar',
        barWidth: '50%',
        z: -1,
        data: [600, 832, 901, 934, 1290, 1330, 1320, 1250, 1190, 1345, 1009, 1320, 600, 832, 901, 934, 1290, 1330, 1320, 1250, 1190, 1345, 1009, 1320],
        itemStyle: {
          emphasis: {
            color: utils.getSubtleColors().info,
            barBorderRadius: [5, 5, 0, 0],
            borderWidth: 1,
            borderColor: utils.getGrays()[300]
          },
          normal: {
            color: utils.getSubtleColors().primary,
            barBorderRadius: [5, 5, 0, 0],
            borderWidth: 1,
            borderColor: utils.getGrays()[300]
          }
        }
      }, {
        name: 'Paid',
        type: 'bar',
        barWidth: '50%',
        barGap: '-100%',
        data: [320, 420, 800, 100, 1000, 930, 720, 1020, 800, 320, 450, 150, 320, 420, 800, 100, 1000, 930, 720, 1020, 800, 320, 450, 150],
        itemStyle: {
          normal: {
            barBorderRadius: [5, 5, 0, 0],
            color: utils.getColors().primary,
            borderWidth: 1,
            borderColor: utils.getColors().primary
          }
        }
      }],
      grid: {
        right: '0px',
        left: '0px',
        bottom: '10%',
        top: '15%'
      }
    });
    const initChart = () => {
      if (utils.isScrolledIntoView($echartsBrowsedCourses)) {
        echartSetOption(chart, userOptions, getDefaultOptions);
        window.removeEventListener('scroll', initChart);
      }
    };
    window.addEventListener('scroll', initChart);
    newCourseBrowsedEl.addEventListener('click', () => {
      newCourseBrowsedEl.classList.toggle('opacity-50');
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'Total'
      });
    });
    paidCourseBrowsedEl.addEventListener('click', () => {
      paidCourseBrowsedEl.classList.toggle('opacity-50');
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'Paid'
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                             Echarts Candle Chart                           */
/* -------------------------------------------------------------------------- */

const candleChartInit = () => {
  const ECHART_CANDLE_CHART = '.echart-candle-chart';
  const ECHART_ZOOM_IN = "[data-zoom='in']";
  const ECHART_ZOOM_OUT = "[data-zoom='out']";
  const $echartsCandleChart = document.querySelector(ECHART_CANDLE_CHART);
  if ($echartsCandleChart) {
    const userOptions = utils.getData($echartsCandleChart, 'options');
    const chart = window.echarts.init($echartsCandleChart);
    const $echartsZoomIn = document.getElementById($echartsCandleChart.dataset.actionTarget).querySelector(ECHART_ZOOM_IN);
    const $echartsZoomOut = document.getElementById($echartsCandleChart.dataset.actionTarget).querySelector(ECHART_ZOOM_OUT);
    let warning = utils.getColors()['warning'];
    let primary = utils.getColors()['primary'];
    const splitData = rawData => {
      let categoryData = [];
      let values = [];
      rawData.forEach(item => {
        categoryData.push(item.splice(0, 1)[0]);
        values.push(item);
      });
      return {
        categoryData,
        values
      };
    };
    const data = splitData([['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94], ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38], ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92], ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8], ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76], ['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82], ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15], ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38], ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42], ['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73], ['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89], ['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03], ['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8], ['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07], ['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94], ['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82], ['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88], ['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78], ['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71], ['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63], ['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16], ['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65], ['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54], ['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14], ['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44], ['2013/3/7', 2340.44, 2324.29, 2304.27, 2352.02], ['2013/3/8', 2326.42, 2318.61, 2314.59, 2333.67], ['2013/3/11', 2314.68, 2310.59, 2296.58, 2320.96], ['2013/3/12', 2309.16, 2286.6, 2264.83, 2333.29], ['2013/3/13', 2282.17, 2263.97, 2253.25, 2286.33], ['2013/3/14', 2255.77, 2270.28, 2253.31, 2276.22], ['2013/3/15', 2269.31, 2278.4, 2250, 2312.08], ['2013/3/18', 2267.29, 2240.02, 2239.21, 2276.05], ['2013/3/19', 2244.26, 2257.43, 2232.02, 2261.31], ['2013/3/20', 2257.74, 2317.37, 2257.42, 2317.86], ['2013/3/21', 2318.21, 2324.24, 2311.6, 2330.81], ['2013/3/22', 2321.4, 2328.28, 2314.97, 2332], ['2013/3/25', 2334.74, 2326.72, 2319.91, 2344.89], ['2013/3/26', 2318.58, 2297.67, 2281.12, 2319.99], ['2013/3/27', 2299.38, 2301.26, 2289, 2323.48], ['2013/3/28', 2273.55, 2236.3, 2232.91, 2273.55], ['2013/3/29', 2238.49, 2236.62, 2228.81, 2246.87], ['2013/4/1', 2229.46, 2234.4, 2227.31, 2243.95], ['2013/4/2', 2234.9, 2227.74, 2220.44, 2253.42], ['2013/4/3', 2232.69, 2225.29, 2217.25, 2241.34], ['2013/4/8', 2196.24, 2211.59, 2180.67, 2212.59], ['2013/4/9', 2215.47, 2225.77, 2215.47, 2234.73], ['2013/4/10', 2224.93, 2226.13, 2212.56, 2233.04], ['2013/4/11', 2236.98, 2219.55, 2217.26, 2242.48], ['2013/4/12', 2218.09, 2206.78, 2204.44, 2226.26]]);
    let zoomStart = 0;
    let zoomEnd = 70;
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'axis',
        // axisPointer: {
        //   type: "cross",
        // },
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        }
      },
      xAxis: {
        type: 'category',
        data: data.categoryData,
        scale: true,
        splitLine: {
          show: false
        },
        splitNumber: 10,
        min: 'dataMin',
        max: 'dataMax',
        boundaryGap: true,
        axisPointer: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['600'],
          formatter: function (value) {
            return new Date(value).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric'
            });
          },
          margin: 15,
          fontWeight: 500
        }
      },
      yAxis: {
        scale: true,
        position: 'right',
        axisPointer: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['200'],
            type: 'dashed'
          }
        },
        boundaryGap: false,
        axisLabel: {
          show: true,
          color: utils.getGrays()['600'],
          margin: 15,
          fontWeight: 500
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      dataZoom: [{
        type: 'inside',
        start: zoomStart,
        end: zoomEnd
      }],
      series: [{
        name: 'candlestick',
        type: 'candlestick',
        data: data.values,
        itemStyle: {
          color: warning,
          color0: primary,
          borderColor: warning,
          borderColor0: primary
        }
      }],
      grid: {
        right: '70px',
        left: '20px',
        bottom: '15%',
        top: '20px'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
    const dispatchZoomAction = () => {
      chart.dispatchAction({
        type: 'dataZoom',
        start: zoomStart,
        end: zoomEnd
      });
    };
    $echartsZoomIn.addEventListener('click', () => {
      if (zoomEnd > 10) {
        zoomEnd -= 10;
      }
      if (zoomEnd <= 10) {
        $echartsZoomIn.disabled = true;
      }
      if (zoomEnd > 0) {
        $echartsZoomOut.disabled = false;
        dispatchZoomAction();
      }
    });
    $echartsZoomOut.addEventListener('click', () => {
      if (zoomEnd < 100) {
        zoomEnd += 10;
      }
      if (zoomEnd >= 100) {
        $echartsZoomOut.disabled = true;
      }
      if (zoomEnd > 0) {
        $echartsZoomIn.disabled = false;
        dispatchZoomAction();
      }
    });
    chart.on('dataZoom', function (params) {
      if (params.batch) {
        zoomStart = params.batch[0].start;
        zoomEnd = params.batch[0].end;
      }
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                             Echarts Total Sales                            */
/* -------------------------------------------------------------------------- */

const closedVsGoalInit = () => {
  const ECHART_LINE_TOTAL_SALES = '.echart-closed-vs-goal';
  const $echartsLineTotalSales = document.querySelector(ECHART_LINE_TOTAL_SALES);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if ($echartsLineTotalSales) {
    // Get options from data attribute
    const userOptions = utils.getData($echartsLineTotalSales, 'options');
    const chart = window.echarts.init($echartsLineTotalSales);
    const getDefaultOptions = () => ({
      color: [utils.getColors().primary, utils.getColors().warning],
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        formatter: tooltipFormatter,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        }
      },
      legend: {
        left: 'left',
        data: ['Closed Amount', 'Revenue Date'],
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 0,
        icon: 'circle',
        inactiveColor: utils.getGrays()['400'],
        textStyle: {
          color: utils.getGrays()['700']
        },
        itemGap: 20
      },
      xAxis: {
        type: 'category',
        name: 'Closed Date',
        nameGap: 50,
        nameLocation: 'center',
        offset: 0,
        nameTextStyle: {
          color: utils.getGrays()['700']
        },
        data: ['2019-06-15', '2019-06-22', '2019-06-29', '2019-07-06', '2019-07-13', '2019-07-20', '2019-07-27', '2019-07-12', '2019-07-03'],
        boundaryGap: false,
        axisPointer: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: utils.rgbaColor('#000', 0.01),
            type: 'dashed'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['400'],
          formatter: function (value) {
            var date = new Date(value);
            return `${date.getDate()} ${months[date.getMonth()]} , 21`;
          },
          margin: 20
        }
      },
      yAxis: {
        type: 'value',
        name: 'Closed Amount',
        nameGap: 85,
        nameLocation: 'middle',
        nameTextStyle: {
          color: utils.getGrays()['700']
        },
        splitNumber: 3,
        axisPointer: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['200']
          }
        },
        boundaryGap: false,
        axisLabel: {
          show: true,
          color: utils.getGrays()['400'],
          formatter: function (value) {
            return `$${value}`;
          },
          margin: 15
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      series: [{
        type: 'line',
        name: 'Closed Amount',
        data: [0, 9000, 18000, 40000, 58000, 65000, 90000, 110000, 140000],
        symbolSize: 5,
        symbol: 'circle',
        smooth: false,
        hoverAnimation: true,
        lineStyle: {
          color: utils.rgbaColor(utils.getColor('primary'))
        },
        itemStyle: {
          borderColor: utils.rgbaColor(utils.getColor('primary'), 0.6),
          borderWidth: 2
        }
      }, {
        type: 'line',
        name: 'Revenue Date',
        data: [0, 10000, 24000, 35000, 45000, 53000, 57000, 68000, 79000],
        symbolSize: 5,
        symbol: 'circle',
        smooth: false,
        hoverAnimation: true,
        lineStyle: {
          color: utils.rgbaColor(utils.getColor('warning'))
        },
        itemStyle: {
          borderColor: utils.rgbaColor(utils.getColor('warning'), 0.6),
          borderWidth: 2
        }
      }],
      grid: {
        right: '25px',
        left: '100px',
        bottom: '60px',
        top: '35px'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                             Course Enrollment                              */
/* -------------------------------------------------------------------------- */

const courseEnrollmentsInit = () => {
  const $echartBarCourseEnrollments = document.querySelector('.echart-bar-course-enrollments');
  const data = [['course', 'Free Course', 'Paid Course', 'On sale Course'], ['Sun', 4300, 8500, 5000], ['Mon', 8300, 7300, 4500], ['Tue', 8600, 6200, 3600], ['Wed', 7200, 5300, 4500], ['Thu', 8000, 5000, 2600], ['Fri', 5000, 7000, 8800], ['Sat', 8000, 9000, 6000]];
  if ($echartBarCourseEnrollments) {
    const userOptions = utils.getData($echartBarCourseEnrollments, 'options');
    const chart = window.echarts.init($echartBarCourseEnrollments);
    const getDefaultOptions = () => ({
      color: [utils.rgbaColor(utils.getColors().info, 0.6), utils.getColors().primary, utils.rgbaColor(utils.getColors().warning, 0.4)],
      dataset: {
        source: data
      },
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays().primary,
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        formatter: params => `<div class="font-weight-semi-bold">${params.seriesName}</div><div class="fs--1 text-600"><strong>${params.name}:</strong> ${params.value[params.componentIndex + 1]}</div>`
      },
      legend: {
        data: ['Free Course', 'Paid Course', 'On sale Course'],
        left: 'left',
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 0,
        icon: 'circle',
        inactiveColor: utils.getGrays()['400'],
        textStyle: {
          color: utils.getGrays()['700']
        }
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          color: utils.getGrays()['400']
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'line'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: utils.getGrays()['200'],
            type: 'line',
            width: 0.5
          }
        },
        axisTick: {
          show: false
        },
        boundaryGap: true
      },
      yAxis: {
        axisPointer: {
          type: 'none'
        },
        axisTick: 'none',
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['200'],
            type: 'dashed'
          }
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['400'],
          formatter: value => `${Math.round(value / 1000 * 10) / 10}k`
        }
      },
      series: [{
        type: 'bar',
        barWidth: '15%',
        barGap: '30%',
        label: {
          normal: {
            show: false
          }
        },
        z: 10,
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 0, 0]
          }
        }
      }, {
        type: 'bar',
        barWidth: '15%',
        barGap: '30%',
        label: {
          normal: {
            show: false
          }
        },
        z: 10,
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 0, 0]
          }
        }
      }, {
        type: 'bar',
        barWidth: '15%',
        barGap: '30%',
        label: {
          normal: {
            show: false
          }
        },
        z: 10,
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          normal: {
            barBorderRadius: [2, 2, 0, 0]
          }
        }
      }],
      grid: {
        right: '1px',
        left: '30px',
        bottom: '10%',
        top: '20%'
      }
    });
    const initChart = () => {
      if (utils.isScrolledIntoView($echartBarCourseEnrollments)) {
        echartSetOption(chart, userOptions, getDefaultOptions);
        window.removeEventListener('scroll', initChart);
      }
    };
    window.addEventListener('scroll', initChart);
  }
};

/* -------------------------------------------------------------------------- */
/*                             Echarts Pie Chart                              */
/* -------------------------------------------------------------------------- */

const courseStatusInit = () => {
  const $echartsCourseStatus = document.querySelector('.echart-course-status');
  const data = [{
    value: 13,
    name: 'Completed',
    itemStyle: {
      color: utils.getColor('primary')
    }
  }, {
    value: 20,
    name: 'On going',
    itemStyle: {
      color: utils.getColor('info')
    }
  }, {
    value: 10,
    name: 'Droped',
    itemStyle: {
      color: utils.getColor('warning')
    }
  }, {
    value: 7,
    name: 'Refunded',
    itemStyle: {
      color: utils.getColor('success')
    }
  }];
  if ($echartsCourseStatus) {
    const userOptions = utils.getData($echartsCourseStatus, 'options');
    const chart = window.echarts.init($echartsCourseStatus);
    const getDefaultOptions = () => ({
      legend: {
        show: false
      },
      series: [{
        type: 'pie',
        radius: '70%',
        itemStyle: {
          borderWidth: 2,
          borderColor: utils.getColor('gray-100')
        },
        label: {
          show: false
        },
        center: ['50%', '50%'],
        data
      }],
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        }
      }
    });
    const initChart = () => {
      if (utils.isScrolledIntoView($echartsCourseStatus)) {
        echartSetOption(chart, userOptions, getDefaultOptions);
        window.removeEventListener('scroll', initChart);
      }
    };
    window.addEventListener('scroll', initChart);
  }
};

/* -------------------------------------------------------------------------- */
/*                                Audience Chart                              */
/* -------------------------------------------------------------------------- */

const revenueChartInit = () => {
  const data = {
    dates: utils.getDates(new Date('5-6-2019'), new Date('5-6-2021'), 1000 * 60 * 60 * 24 * 30),
    dataset: {
      revenue: [[645, 500, 550, 550, 473, 405, 286, 601, 743, 450, 604, 815, 855, 722, 700, 896, 866, 952, 719, 558, 737, 885, 972, 650, 600], [440, 250, 270, 400, 175, 180, 200, 400, 600, 380, 340, 550, 650, 450, 400, 688, 650, 721, 500, 300, 445, 680, 568, 400, 371]],
      users: [[545, 500, 650, 727, 773, 705, 686, 501, 643, 580, 604, 615, 755, 722, 727, 816, 836, 952, 719, 758, 937, 785, 872, 850, 800], [340, 360, 230, 250, 410, 430, 450, 200, 220, 540, 500, 250, 355, 320, 500, 630, 680, 500, 520, 550, 750, 720, 700, 780, 750]],
      deals: [[545, 400, 450, 627, 473, 450, 460, 780, 770, 800, 504, 550, 500, 530, 727, 716, 736, 820, 719, 758, 737, 885, 872, 850, 800], [245, 300, 450, 427, 273, 250, 260, 580, 570, 500, 402, 450, 400, 330, 527, 516, 536, 620, 519, 558, 537, 483, 472, 250, 300]],
      profit: [[545, 400, 450, 627, 673, 605, 686, 501, 843, 518, 504, 715, 955, 622, 627, 716, 736, 952, 619, 558, 937, 785, 872, 550, 400], [340, 360, 330, 300, 410, 380, 450, 400, 420, 240, 200, 250, 355, 320, 500, 630, 680, 400, 420, 450, 650, 620, 700, 450, 340]]
    }
  };
  const tooltipFormatter = params => {
    return `<div class="card">
                <div class="card-header bg-body-tertiary py-2">
                  <h6 class="text-600 mb-0">${params[0].axisValue}</h6>
                </div>
              <div class="card-body py-2">
                <h6 class="text-600 fw-normal">
                  <span class="fas fa-circle text-primary me-2"></span>Revenue: 
                  <span class="fw-medium">$${params[0].data}</span></h6>
                <h6 class="text-600 mb-0 fw-normal"> 
                  <span class="fas fa-circle text-warning me-2"></span>Revenue Goal: 
                  <span class="fw-medium">$${params[1].data}</span></h6>
              </div>
            </div>`;
  };
  const getDefaultOptions = (data1, data2) => () => ({
    color: utils.getColors().white,
    tooltip: {
      trigger: 'axis',
      padding: 0,
      backgroundColor: 'transparent',
      borderWidth: 0,
      transitionDuration: 0,
      position(pos, params, dom, rect, size) {
        return getPosition(pos, params, dom, rect, size);
      },
      axisPointer: {
        type: 'none'
      },
      formatter: tooltipFormatter
    },
    xAxis: {
      type: 'category',
      data: utils.getPastDates(25).map(date => window.dayjs(date).format('DD MMM, YYYY')),
      axisLabel: {
        color: utils.getGrays()['600'],
        formatter: value => window.dayjs(value).format('MMM DD'),
        align: 'left',
        fontSize: 11,
        padding: [0, 0, 0, 5],
        showMaxLabel: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      boundaryGap: true
    },
    yAxis: {
      position: 'right',
      axisPointer: {
        type: 'none'
      },
      axisTick: 'none',
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    series: [{
      type: 'bar',
      name: 'Revenue',
      data: data1,
      lineStyle: {
        color: utils.getColor('primary')
      },
      itemStyle: {
        barBorderRadius: [4, 4, 0, 0],
        color: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        borderWidth: 1
      },
      emphasis: {
        itemStyle: {
          color: utils.getColor('primary')
        }
      }
    }, {
      type: 'line',
      name: 'Revenue Goal',
      data: data2,
      symbol: 'circle',
      symbolSize: 6,
      animation: false,
      itemStyle: {
        color: utils.getColor('warning')
      },
      lineStyle: {
        type: 'dashed',
        width: 2,
        color: utils.getColor('warning')
      }
    }],
    grid: {
      right: 5,
      left: 5,
      bottom: '8%',
      top: '5%'
    }
  });
  const initChart = (el, options) => {
    const userOptions = utils.getData(el, 'options');
    const chart = window.echarts.init(el);
    echartSetOption(chart, userOptions, options);
  };
  const chartKeys = ['revenue', 'users', 'deals', 'profit'];
  chartKeys.forEach(key => {
    const el = document.querySelector(`.echart-crm-${key}`);
    el && initChart(el, getDefaultOptions(data.dataset[key][0], data.dataset[key][1]));
  });
};
const echartsCustomerSatisfactionInit = () => {
  const $echartCustomerSatisfaction = document.querySelector('.echart-customer-setisfaction');
  if ($echartCustomerSatisfaction) {
    // Get options from data attribute
    const userOptions = utils.getData($echartCustomerSatisfaction, 'options');
    const chart = window.echarts.init($echartCustomerSatisfaction);
    const getDefaultOptions = () => ({
      legend: {
        left: 'center',
        bottom: 22,
        itemWidth: 12,
        itemHeight: 12,
        borderRadius: 0,
        icon: 'circle',
        inactiveColor: utils.getGrays()['400'],
        inactiveBorderColor: 'transparent',
        textStyle: {
          color: utils.getGrays()['600'],
          fontSize: 12,
          fontFamily: 'Poppins',
          fontWeight: '500'
        },
        itemGap: 16
      },
      series: [{
        type: 'pie',
        radius: '70%',
        label: {
          show: false
        },
        center: ['50%', '45%'],
        itemStyle: {
          borderWidth: 2,
          borderColor: localStorage.getItem('theme') === 'dark' ? '#121E2D' : utils.getGrays()['100']
        },
        data: [{
          value: 1100,
          name: 'Positive',
          itemStyle: {
            color: utils.getColor('primary')
          }
        }, {
          value: 550,
          name: 'Nagative',
          itemStyle: {
            color: utils.rgbaColor(utils.getColor('primary'), 0.5)
          }
        }]
      }],
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        }
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                             Echarts Bounce Rate                            */
/* -------------------------------------------------------------------------- */

const dealStorageFunnelInit = () => {
  const $echartDealStorageFunnel = document.querySelector('.echart-deal-storage-funnel');
  if ($echartDealStorageFunnel) {
    const userOptions = utils.getData($echartDealStorageFunnel, 'options');
    const {
      data,
      dataAxis1,
      dataAxis2
    } = userOptions;
    const chart = window.echarts.init($echartDealStorageFunnel);
    const getDefaultOptions = () => ({
      yAxis: [{
        data: dataAxis1,
        axisLabel: {
          inside: true,
          textStyle: {
            color: utils.getGrays()['700'],
            fontWeight: 500,
            fontSize: 11,
            fontFamily: 'poppins'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      }, {
        data: dataAxis2,
        axisLabel: {
          inside: false,
          textStyle: {
            color: utils.getColors().primary,
            fontWeight: 500,
            fontSize: 11,
            fontFamily: 'poppins'
          },
          borderRadius: 5,
          backgroundColor: utils.getSubtleColors().primary,
          padding: [6, 16, 6, 16],
          width: 115
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      }],
      xAxis: {
        type: 'value',
        //min: 0,
        // max: 35,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        inverse: true,
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      series: [{
        type: 'bar',
        showBackground: true,
        barWidth: 25,
        label: {
          show: true,
          formatter: '{c} ',
          position: 'insideLeft'
        },
        backgroundStyle: {
          color: utils.getGrays()['200'],
          borderRadius: 5
        },
        itemStyle: {
          color: utils.getColors().primary,
          borderRadius: 5
        },
        data: data
      }],
      grid: {
        right: '65px',
        left: '0',
        bottom: '0',
        top: '0'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};
const echartsDistributionOfPerformanceInit = () => {
  const $distributionOfPerformance = document.querySelector('.echart-distribution-of-performance');
  if ($distributionOfPerformance) {
    const userOptions = utils.getData($distributionOfPerformance, 'options');
    const chart = window.echarts.init($distributionOfPerformance);
    let xAxisData = ["Mar 01", "Mar 02", "Mar 03", "Mar 04", "Mar 05", "Mar 06", "Mar 07", "Mar 08", "Mar 09", "Mar 10", "Mar 11", "Mar 12"];
    let data1 = [50, 25, 35, 30, 45, 35, 38, 30, 35, 30, 35, 38];
    let data2 = [45, 50, 40, 35, 50, 40, 44, 35, 40, 45, 40, 44];
    const emphasisStyle = {
      itemStyle: {
        shadowColor: utils.rgbaColor(utils.getColor('dark'), 0.3)
      }
    };
    const getDefaultOptions = () => ({
      color: [utils.getColor('primary'), localStorage.getItem('theme') === 'dark' ? '#236EA1' : '#7DD7FE'],
      legend: {
        data: ['Agent Support', 'Group Support'],
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        padding: [0, 0, 0, 0],
        textStyle: {
          color: utils.getGrays()['700'],
          fontWeight: "500",
          fontSize: "13px"
        },
        left: 0,
        itemGap: 16
      },
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['900']
        },
        borderWidth: 1,
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        }
      },
      xAxis: {
        data: xAxisData,
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['600']
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['300']
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: "dashed"
          }
        },
        axisLabel: {
          color: utils.getGrays()['600']
        }
      },
      series: [{
        name: 'Agent Support',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle,
        data: data1
      }, {
        name: 'Group Support',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle,
        data: data2,
        itemStyle: {
          barBorderRadius: [3, 3, 0, 0]
        }
      }],
      barWidth: "15px",
      grid: {
        top: '15%',
        bottom: 0,
        left: 0,
        right: 0,
        containLabel: true
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* eslint-disable */
const getPosition = (pos, params, dom, rect, size) => ({
  top: pos[1] - size.contentSize[1] - 10,
  left: pos[0] - size.contentSize[0] / 2
});
const echartSetOption = (chart, userOptions, getDefaultOptions) => {
  const themeController = document.body;
  // Merge user options with lodash
  chart.setOption(window._.merge(getDefaultOptions(), userOptions));
  themeController.addEventListener('clickControl', ({
    detail: {
      control
    }
  }) => {
    if (control === 'theme') {
      chart.setOption(window._.merge(getDefaultOptions(), userOptions));
    }
  });
};
const tooltipFormatter = params => {
  let tooltipItem = ``;
  params.forEach(el => {
    tooltipItem = tooltipItem + `<div class='ms-1'>
        <h6 class="text-700"><span class="fas fa-circle me-1 fs--2" style="color:${el.borderColor ? el.borderColor : el.color}"></span>
          ${el.seriesName} : ${typeof el.value === 'object' ? el.value[1] : el.value}
        </h6>
      </div>`;
  });
  return `<div>
            <p class='mb-2 text-600'>
              ${window.dayjs(params[0].axisValue).isValid() ? window.dayjs(params[0].axisValue).format('MMMM DD') : params[0].axisValue}
            </p>
            ${tooltipItem}
          </div>`;
};
const resizeEcharts = () => {
  const $echarts = document.querySelectorAll('[data-echart-responsive]');
  if (!!$echarts.length) {
    $echarts.forEach(item => {
      if (!!utils.getData(item, 'echart-responsive')) {
        if (!(item.closest('.tab-pane') && window.getComputedStyle(item.closest('.tab-pane')).display === 'none')) {
          window.echarts.init(item).resize();
        }
      }
    });
  }
};
utils.resize(() => resizeEcharts());
const navbarVerticalToggle = document.querySelector('.navbar-vertical-toggle');
navbarVerticalToggle && navbarVerticalToggle.addEventListener('navbar.vertical.toggle', () => resizeEcharts());
const echartTabs = document.querySelectorAll('[data-tab-has-echarts]');
echartTabs && echartTabs.forEach(tab => {
  tab.addEventListener('shown.bs.tab', e => {
    const el = e.target;
    const {
      hash
    } = el;
    const id = hash ? hash : el.dataset.bsTarget;
    const content = document.getElementById(id.substring(1));
    const chart = content?.querySelector('[data-echart-tab]');
    chart && window.echarts.init(chart).resize();
  });
});

/* -------------------------------------------------------------------------- */
/*                             Echarts Gross Revenue                          */
/* -------------------------------------------------------------------------- */

const grossRevenueChartInit = () => {
  const ECHART_GROSS_REVENUE = '.echart-gross-revenue-chart';
  const $echartsGrossRevenue = document.querySelector(ECHART_GROSS_REVENUE);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if ($echartsGrossRevenue) {
    // Get options from data attribute
    const userOptions = utils.getData($echartsGrossRevenue, 'options');
    const chart = window.echarts.init($echartsGrossRevenue);
    const SELECT_MONTH = `#${userOptions.monthSelect}`;
    const LEGEND_MONTH_TARGET = userOptions.target;
    const LEGEND_CURRENT_MONTH = `#${userOptions.optionOne}`;
    const LEGEND_PREV_MONTH = `#${userOptions.optionTwo}`;
    const $legendCurrentMonth = document.getElementById(LEGEND_MONTH_TARGET).querySelector(LEGEND_CURRENT_MONTH);
    const $legendPrevMonth = document.getElementById(LEGEND_MONTH_TARGET).querySelector(LEGEND_PREV_MONTH);
    const dates = month => {
      return utils.getDates(window.dayjs().month(month).date(1), window.dayjs().month(Number(month) + 1).date(0), 1000 * 60 * 60 * 24 * 3);
    };
    const monthsnumber = [[20, 40, 20, 80, 50, 80, 120, 80, 50, 120, 110, 110], [60, 80, 60, 80, 65, 130, 120, 100, 30, 40, 30, 70], [100, 70, 80, 50, 120, 100, 130, 140, 90, 100, 40, 50], [80, 50, 60, 40, 60, 120, 100, 130, 60, 80, 50, 60], [70, 80, 100, 70, 90, 60, 80, 130, 40, 60, 50, 80], [90, 40, 80, 80, 100, 140, 100, 130, 90, 60, 70, 50], [80, 60, 80, 60, 40, 100, 120, 100, 30, 40, 30, 70], [20, 40, 20, 50, 70, 60, 110, 80, 90, 30, 50, 50], [60, 70, 30, 40, 80, 140, 80, 140, 120, 130, 100, 110], [90, 90, 40, 60, 40, 110, 90, 110, 60, 80, 60, 70], [50, 80, 50, 80, 50, 80, 120, 80, 50, 120, 110, 110], [60, 90, 60, 70, 40, 70, 100, 140, 30, 40, 30, 70], [20, 40, 20, 50, 30, 80, 120, 100, 30, 40, 30, 70]];
    const tooltipFormatter = params => {
      const currentDate = window.dayjs(params[0].axisValue);
      let tooltipItem = ``;
      params.forEach(el => {
        tooltipItem = tooltipItem + `<h6 class="fs--1 text-700"><span class="fas fa-circle me-2" style="color:${el.borderColor}"></span>
        ${currentDate.format('MMM DD')} : ${el.value}
      </h6>`;
      });
      return `<div class='ms-1'>
                ${tooltipItem}
              </div>`;
    };
    const getDefaultOptions = () => ({
      title: {
        text: 'Sales over time',
        textStyle: {
          fontWeight: 500,
          fontSize: 13,
          fontFamily: 'poppins'
        }
      },
      legend: {
        show: false,
        data: ['currentMonth', 'prevMonth']
      },
      color: utils.getColors().white,
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        formatter: tooltipFormatter,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        }
      },
      xAxis: {
        type: 'category',
        data: dates(0),
        boundaryGap: false,
        axisPointer: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['400'],
          formatter: function (value) {
            var date = new Date(value);
            return `${months[date.getMonth()].substring(0, 3)} ${date.getDate()}`;
          },
          margin: 15
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisPointer: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['300']
          }
        },
        boundaryGap: false,
        axisLabel: {
          show: true,
          color: utils.getGrays()['400'],
          margin: 15
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      series: [{
        name: 'prevMonth',
        type: 'line',
        data: monthsnumber[0],
        lineStyle: {
          color: utils.getGrays()['300']
        },
        itemStyle: {
          borderColor: utils.getGrays()['300'],
          borderWidth: 2
        },
        symbol: 'none',
        smooth: false,
        hoverAnimation: true
      }, {
        name: 'currentMonth',
        type: 'line',
        data: monthsnumber[1],
        lineStyle: {
          color: utils.getColors().primary
        },
        itemStyle: {
          borderColor: utils.getColors().primary,
          borderWidth: 2
        },
        symbol: 'none',
        smooth: false,
        hoverAnimation: true
      }],
      grid: {
        right: '8px',
        left: '40px',
        bottom: '15%',
        top: '20%'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);

    // Change chart options accordiong to the selected month
    const monthSelect = document.querySelector(SELECT_MONTH);
    let month = 0;
    let currentMonthData = monthsnumber[Number(month) + 1];
    let prevMonthData = monthsnumber[monthSelect.selectedIndex];
    monthSelect.addEventListener('change', e => {
      month = e.currentTarget.value;
      currentMonthData = monthsnumber[Number(month) + 1];
      prevMonthData = monthsnumber[month];
      $legendCurrentMonth.querySelector('.text').innerText = months[month];
      $legendPrevMonth.querySelector('.text').innerText = months[month - 1] ? months[month - 1] : 'Dec';
      chart.setOption({
        xAxis: {
          data: dates(month)
        },
        series: [{
          data: currentMonthData
        }, {
          data: prevMonthData
        }]
      });
    });
    $legendCurrentMonth.addEventListener('click', () => {
      $legendCurrentMonth.classList.toggle('opacity-50');
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'currentMonth'
      });
    });
    $legendPrevMonth.addEventListener('click', () => {
      $legendPrevMonth.classList.toggle('opacity-50');
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'prevMonth'
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                Traffic Channels                           */
/* -------------------------------------------------------------------------- */

const leadConversionInit = () => {
  const $leadConversion = document.querySelector('.echart-lead-conversion');
  if ($leadConversion) {
    const userOptions = utils.getData($leadConversion, 'options');
    const chart = window.echarts.init($leadConversion);
    const getDefaultOptions = () => ({
      color: [utils.rgbaColor(utils.getColors().primary, 0.7), utils.rgbaColor(utils.getColors().info, 0.6), utils.rgbaColor(utils.getColors().secondary, 0.2), utils.rgbaColor(utils.getColors().warning, 0.6)],
      legend: {
        data: ['Campaigns', 'Lead', 'Opportunity', 'Deal'],
        left: '0%',
        icon: 'circle',
        inactiveColor: utils.getGrays()['400'],
        textStyle: {
          color: utils.getGrays()['700']
        },
        itemGap: 10
      },
      yAxis: {
        type: 'category',
        data: ['kerry Ingram', 'Bradie Pitter', 'Harrington', 'Ashley Shaw', 'Jenny Horas', 'Chris Pratt'],
        axisLine: {
          show: false
        },
        boundaryGap: false,
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['200']
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['600']
        }
      },
      xAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['200']
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        axisPointer: {
          type: 'none'
        },
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        },
        formatter: tooltipFormatter
      },
      series: [{
        name: 'Campaigns',
        type: 'bar',
        stack: 'total',
        data: [1405, 1300, 1620, 1430, 1500, 1520],
        barWidth: '20%'
      }, {
        name: 'Lead',
        type: 'bar',
        stack: 'total',
        data: [320, 302, 301, 334, 340, 390],
        barWidth: '20%'
      }, {
        name: 'Opportunity',
        type: 'bar',
        stack: 'total',
        data: [220, 182, 351, 234, 290, 300],
        barWidth: '20%'
      }, {
        name: 'Deal',
        type: 'bar',
        stack: 'total',
        data: [120, 182, 191, 134, 190, 170],
        barWidth: '20%'
      }],
      grid: {
        right: 5,
        left: 5,
        bottom: 8,
        top: 60,
        containLabel: true
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                             Echarts Line Payment                           */
/* -------------------------------------------------------------------------- */

const linePaymentChartInit = () => {
  const $echartsLinePaymentChart = document.querySelector('.echart-line-payment');
  const dataset = {
    all: [4, 1, 6, 2, 7, 12, 4, 6, 5, 4, 5, 10],
    successful: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
    failed: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2]
  };
  const labels = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];
  if ($echartsLinePaymentChart) {
    const userOptions = utils.getData($echartsLinePaymentChart, 'options');
    const chart = window.echarts.init($echartsLinePaymentChart);
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        borderWidth: 1,
        transitionDuration: 0,
        formatter: params => `${params[0].axisValue} - ${params[0].value} USD`,
        textStyle: {
          fontWeight: 500,
          fontSize: 12,
          color: utils.getGrays()['1100']
        }
      },
      xAxis: {
        type: 'category',
        data: labels,
        splitLine: {
          show: true,
          lineStyle: {
            color: utils.rgbaColor('#fff', 0.1)
          },
          interval: 0
        },
        axisLine: {
          lineStyle: {
            color: utils.rgbaColor('#fff', 0.1)
          }
        },
        axisTick: {
          show: true,
          length: 10,
          lineStyle: {
            color: utils.rgbaColor('#fff', 0.1)
          }
        },
        axisLabel: {
          color: utils.getGrays()['400'],
          fontWeight: 600,
          formatter: value => value.substring(0, value.length - 3),
          fontSize: 12,
          interval: window.innerWidth < 768 ? 'auto' : 0,
          margin: 15
        },
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        axisPointer: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      series: [{
        type: 'line',
        smooth: true,
        data: dataset.successful.map(d => (d * 3.14).toFixed(2)),
        symbol: 'emptyCircle',
        itemStyle: {
          color: localStorage.getItem('theme') === 'light' ? utils.getColors().white : utils.getColors().primary
        },
        lineStyle: {
          color: localStorage.getItem('theme') === 'light' ? utils.rgbaColor(utils.getColors().white, 0.8) : utils.getColors().primary
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: localStorage.getItem('theme') === 'light' ? 'rgba(255, 255, 255, 0.5)' : utils.rgbaColor(utils.getColors().primary, 0.5)
            }, {
              offset: 1,
              color: localStorage.getItem('theme') === 'light' ? 'rgba(255, 255, 255, 0)' : utils.rgbaColor(utils.getColors().primary, 0)
            }]
          }
        },
        emphasis: {
          lineStyle: {
            width: 2
          }
        }
      }],
      grid: {
        right: 15,
        left: 15,
        bottom: '15%',
        top: 0
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
    utils.resize(() => {
      if (window.innerWidth < 768) {
        chart.setOption({
          xAxis: {
            axisLabel: {
              interval: 'auto'
            }
          }
        });
      }
    });
    const selectMenu = document.querySelector('#dashboard-chart-select');
    if (selectMenu) {
      selectMenu.addEventListener('change', e => {
        const value = e.currentTarget.value;
        chart.setOption({
          series: [{
            data: dataset[value].map(d => (d * 3.14).toFixed(2))
          }]
        });
      });
    }
  }
};

/* -------------------------------------------------------------------------- */
/*                                Session By Country Map                      */
/* -------------------------------------------------------------------------- */

const locationBySessionInit = () => {
  const $locationBySessionMap = document.querySelector('.echart-location-by-session-map');
  const data = [{
    name: 'Afghanistan',
    value: 28397.812
  }, {
    name: 'Angola',
    value: 19549.124
  }, {
    name: 'Albania',
    value: 3150.143
  }, {
    name: 'United Arab Emirates',
    value: 8441.537
  }, {
    name: 'Argentina',
    value: 40374.224
  }, {
    name: 'Armenia',
    value: 2963.496
  }, {
    name: 'French Southern and Antarctic Lands',
    value: 268.065
  }, {
    name: 'Australia',
    value: 22404.488
  }, {
    name: 'Austria',
    value: 8401.924
  }, {
    name: 'Azerbaijan',
    value: 9094.718
  }, {
    name: 'Burundi',
    value: 9232.753
  }, {
    name: 'Belgium',
    value: 10941.288
  }, {
    name: 'Benin',
    value: 9509.798
  }, {
    name: 'Burkina Faso',
    value: 15540.284
  }, {
    name: 'Bangladesh',
    value: 151125.475
  }, {
    name: 'Bulgaria',
    value: 7389.175
  }, {
    name: 'The Bahamas',
    value: 66402.316
  }, {
    name: 'Bosnia and Herzegovina',
    value: 3845.929
  }, {
    name: 'Belarus',
    value: 9491.07
  }, {
    name: 'Belize',
    value: 308.595
  }, {
    name: 'Bermuda',
    value: 64.951
  }, {
    name: 'Bolivia',
    value: 716.939
  }, {
    name: 'Brazil',
    value: 195210.154
  }, {
    name: 'Brunei',
    value: 27.223
  }, {
    name: 'Bhutan',
    value: 716.939
  }, {
    name: 'Botswana',
    value: 1969.341
  }, {
    name: 'Central African Rep.',
    value: 4349.921
  }, {
    name: 'Canada',
    value: 34126.24
  }, {
    name: 'Switzerland',
    value: 7830.534
  }, {
    name: 'Chile',
    value: 17150.76
  }, {
    name: 'China',
    value: 1359821.465
  }, {
    name: "Côte d'Ivoire",
    value: 60508.978
  }, {
    name: 'Cameroon',
    value: 20624.343
  }, {
    name: 'Dem. Rep. Congo',
    value: 62191.161
  }, {
    name: 'Congo',
    value: 3573.024
  }, {
    name: 'Colombia',
    value: 46444.798
  }, {
    name: 'Costa Rica',
    value: 4669.685
  }, {
    name: 'Cuba',
    value: 11281.768
  }, {
    name: 'Northern Cyprus',
    value: 1.468
  }, {
    name: 'Cyprus',
    value: 1103.685
  }, {
    name: 'Czech Republic',
    value: 10553.701
  }, {
    name: 'Germany',
    value: 83017.404
  }, {
    name: 'Djibouti',
    value: 834.036
  }, {
    name: 'Denmark',
    value: 5550.959
  }, {
    name: 'Dominican Republic',
    value: 10016.797
  }, {
    name: 'Algeria',
    value: 37062.82
  }, {
    name: 'Ecuador',
    value: 15001.072
  }, {
    name: 'Egypt',
    value: 78075.705
  }, {
    name: 'Eritrea',
    value: 5741.159
  }, {
    name: 'Spain',
    value: 46182.038
  }, {
    name: 'Estonia',
    value: 1298.533
  }, {
    name: 'Ethiopia',
    value: 87095.281
  }, {
    name: 'Finland',
    value: 5367.693
  }, {
    name: 'Fiji',
    value: 860.559
  }, {
    name: 'Falkland Islands',
    value: 49.581
  }, {
    name: 'France',
    value: 63230.866
  }, {
    name: 'Gabon',
    value: 1556.222
  }, {
    name: 'United Kingdom',
    value: 62066.35
  }, {
    name: 'Georgia',
    value: 4388.674
  }, {
    name: 'Ghana',
    value: 24262.901
  }, {
    name: 'Eq. Guinea',
    value: 10876.033
  }, {
    name: 'Guinea',
    value: 10876.033
  }, {
    name: 'Gambia',
    value: 1680.64
  }, {
    name: 'Guinea Bissau',
    value: 10876.033
  }, {
    name: 'Equatorial Guinea',
    value: 696.167
  }, {
    name: 'Greece',
    value: 11109.999
  }, {
    name: 'Greenland',
    value: 56.546
  }, {
    name: 'Guatemala',
    value: 14341.576
  }, {
    name: 'French Guiana',
    value: 231.169
  }, {
    name: 'Guyana',
    value: 786.126
  }, {
    name: 'Honduras',
    value: 7621.204
  }, {
    name: 'Croatia',
    value: 4338.027
  }, {
    name: 'Haiti',
    value: 9896.4
  }, {
    name: 'Hungary',
    value: 10014.633
  }, {
    name: 'Indonesia',
    value: 240676.485
  }, {
    name: 'India',
    value: 1205624.648
  }, {
    name: 'Ireland',
    value: 4467.561
  }, {
    name: 'Iran',
    value: 240676.485
  }, {
    name: 'Iraq',
    value: 30962.38
  }, {
    name: 'Iceland',
    value: 318.042
  }, {
    name: 'Israel',
    value: 7420.368
  }, {
    name: 'Italy',
    value: 60508.978
  }, {
    name: 'Jamaica',
    value: 2741.485
  }, {
    name: 'Jordan',
    value: 6454.554
  }, {
    name: 'Japan',
    value: 127352.833
  }, {
    name: 'Kazakhstan',
    value: 15921.127
  }, {
    name: 'Kenya',
    value: 40909.194
  }, {
    name: 'Kyrgyzstan',
    value: 5334.223
  }, {
    name: 'Cambodia',
    value: 14364.931
  }, {
    name: 'South Korea',
    value: 51452.352
  }, {
    name: 'Kosovo',
    value: 97.743
  }, {
    name: 'Kuwait',
    value: 2991.58
  }, {
    name: 'Laos',
    value: 6395.713
  }, {
    name: 'Lebanon',
    value: 4341.092
  }, {
    name: 'Liberia',
    value: 3957.99
  }, {
    name: 'Libya',
    value: 6040.612
  }, {
    name: 'Sri Lanka',
    value: 20758.779
  }, {
    name: 'Lesotho',
    value: 2008.921
  }, {
    name: 'Lithuania',
    value: 3068.457
  }, {
    name: 'Luxembourg',
    value: 507.885
  }, {
    name: 'Latvia',
    value: 2090.519
  }, {
    name: 'Morocco',
    value: 31642.36
  }, {
    name: 'Moldova',
    value: 103.619
  }, {
    name: 'Madagascar',
    value: 21079.532
  }, {
    name: 'Mexico',
    value: 117886.404
  }, {
    name: 'Macedonia',
    value: 507.885
  }, {
    name: 'Mali',
    value: 13985.961
  }, {
    name: 'Myanmar',
    value: 51931.231
  }, {
    name: 'Montenegro',
    value: 620.078
  }, {
    name: 'Mongolia',
    value: 2712.738
  }, {
    name: 'Mozambique',
    value: 23967.265
  }, {
    name: 'Mauritania',
    value: 3609.42
  }, {
    name: 'Malawi',
    value: 15013.694
  }, {
    name: 'Malaysia',
    value: 28275.835
  }, {
    name: 'Namibia',
    value: 2178.967
  }, {
    name: 'New Caledonia',
    value: 246.379
  }, {
    name: 'Niger',
    value: 15893.746
  }, {
    name: 'Nigeria',
    value: 159707.78
  }, {
    name: 'Nicaragua',
    value: 5822.209
  }, {
    name: 'Netherlands',
    value: 16615.243
  }, {
    name: 'Norway',
    value: 4891.251
  }, {
    name: 'Nepal',
    value: 26846.016
  }, {
    name: 'New Zealand',
    value: 4368.136
  }, {
    name: 'Oman',
    value: 2802.768
  }, {
    name: 'Pakistan',
    value: 173149.306
  }, {
    name: 'Panama',
    value: 3678.128
  }, {
    name: 'Peru',
    value: 29262.83
  }, {
    name: 'Philippines',
    value: 93444.322
  }, {
    name: 'Papua New Guinea',
    value: 6858.945
  }, {
    name: 'Poland',
    value: 38198.754
  }, {
    name: 'Puerto Rico',
    value: 3709.671
  }, {
    name: 'North Korea',
    value: 1.468
  }, {
    name: 'Portugal',
    value: 10589.792
  }, {
    name: 'Paraguay',
    value: 6459.721
  }, {
    name: 'Qatar',
    value: 1749.713
  }, {
    name: 'Romania',
    value: 21861.476
  }, {
    name: 'Russia',
    value: 21861.476
  }, {
    name: 'Rwanda',
    value: 10836.732
  }, {
    name: 'Western Sahara',
    value: 514.648
  }, {
    name: 'Saudi Arabia',
    value: 27258.387
  }, {
    name: 'Sudan',
    value: 35652.002
  }, {
    name: 'S. Sudan',
    value: 9940.929
  }, {
    name: 'Senegal',
    value: 12950.564
  }, {
    name: 'Solomon Islands',
    value: 526.447
  }, {
    name: 'Sierra Leone',
    value: 5751.976
  }, {
    name: 'El Salvador',
    value: 6218.195
  }, {
    name: 'Somaliland',
    value: 9636.173
  }, {
    name: 'Somalia',
    value: 9636.173
  }, {
    name: 'Republic of Serbia',
    value: 3573.024
  }, {
    name: 'Suriname',
    value: 524.96
  }, {
    name: 'Slovakia',
    value: 5433.437
  }, {
    name: 'Slovenia',
    value: 2054.232
  }, {
    name: 'Sweden',
    value: 9382.297
  }, {
    name: 'Swaziland',
    value: 1193.148
  }, {
    name: 'Syria',
    value: 7830.534
  }, {
    name: 'Chad',
    value: 11720.781
  }, {
    name: 'Togo',
    value: 6306.014
  }, {
    name: 'Thailand',
    value: 66402.316
  }, {
    name: 'Tajikistan',
    value: 7627.326
  }, {
    name: 'Turkmenistan',
    value: 5041.995
  }, {
    name: 'East Timor',
    value: 10016.797
  }, {
    name: 'Trinidad and Tobago',
    value: 1328.095
  }, {
    name: 'Tunisia',
    value: 10631.83
  }, {
    name: 'Turkey',
    value: 72137.546
  }, {
    name: 'Tanzania',
    value: 44973.33
  }, {
    name: 'Uganda',
    value: 33987.213
  }, {
    name: 'Ukraine',
    value: 46050.22
  }, {
    name: 'Uruguay',
    value: 3371.982
  }, {
    name: 'United States',
    value: 312247.116
  }, {
    name: 'Uzbekistan',
    value: 27769.27
  }, {
    name: 'Venezuela',
    value: 236.299
  }, {
    name: 'Vietnam',
    value: 89047.397
  }, {
    name: 'Vanuatu',
    value: 236.299
  }, {
    name: 'West Bank',
    value: 13.565
  }, {
    name: 'Yemen',
    value: 22763.008
  }, {
    name: 'South Africa',
    value: 51452.352
  }, {
    name: 'Zambia',
    value: 13216.985
  }, {
    name: 'Zimbabwe',
    value: 13076.978
  }];
  const total = 6961500;
  const maxZoomLevel = 5;
  const minZoomLevel = 1;
  if ($locationBySessionMap) {
    const userOptions = utils.getData($locationBySessionMap, 'options');
    const chart = window.echarts.init($locationBySessionMap);
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        formatter: params => `<strong>${params.data?.name} :</strong> ${(params.data?.value / total * 100).toFixed(2)}%`
      },
      visualMap: {
        show: false,
        min: 800,
        max: 50000,
        inRange: {
          color: [utils.getColors().primary, utils.rgbaColor(utils.getColors().primary, 0.8), utils.rgbaColor(utils.getColors().primary, 0.6), utils.rgbaColor(utils.getColors().primary, 0.4), utils.rgbaColor(utils.getColors().primary, 0.2)].reverse()
        }
      },
      series: [{
        type: 'map',
        map: 'world',
        data,
        roam: 'move',
        scaleLimit: {
          min: minZoomLevel,
          max: maxZoomLevel
        },
        left: 0,
        right: 0,
        label: {
          show: false
        },
        itemStyle: {
          borderColor: utils.getGrays()['300']
        },
        emphasis: {
          label: {
            show: false
          },
          itemStyle: {
            areaColor: utils.getColor('warning')
          }
        }
      }]
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
    let zoomLevel = 1;
    document.querySelector('.location-by-session-map-reset')?.addEventListener('click', () => {
      zoomLevel = 1;
      chart.dispatchAction({
        type: 'restore'
      });
      chart.setOption({
        series: {
          zoom: 1
        }
      });
    });
    document.querySelector('.location-by-session-map-zoom')?.addEventListener('click', () => {
      if (zoomLevel < maxZoomLevel) {
        zoomLevel += 1;
      }
      chart.setOption({
        series: {
          zoom: zoomLevel
        }
      });
    });
    document.querySelector('.location-by-session-map-zoomOut')?.addEventListener('click', () => {
      if (zoomLevel > minZoomLevel) {
        zoomLevel -= 1;
      }
      chart.setOption({
        series: {
          zoom: zoomLevel
        }
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                Product Share                               */
/* -------------------------------------------------------------------------- */

const marketShareEcommerceInit = () => {
  const ECHART_PRODUCT_SHARE = '.echart-product-share';
  const $echartProductShare = document.querySelector(ECHART_PRODUCT_SHARE);
  if ($echartProductShare) {
    const userOptions = utils.getData($echartProductShare, 'options');
    const chart = window.echarts.init($echartProductShare);
    const getDefaultOptions = () => ({
      color: [utils.getColors().primary, utils.getColors().info, utils.getColors().warning],
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        formatter(params) {
          return `<strong>${params.data.name}:</strong> ${params.percent}%`;
        }
      },
      position(pos, params, dom, rect, size) {
        return getPosition(pos, params, dom, rect, size);
      },
      legend: {
        show: false
      },
      series: [{
        type: 'pie',
        radius: ['100%', '80%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,
        itemStyle: {
          borderWidth: 2,
          borderColor: utils.getColor('gray-100')
        },
        label: {
          normal: {
            show: false,
            position: 'center',
            textStyle: {
              fontSize: '20',
              fontWeight: '500',
              color: utils.getGrays()['700']
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          value: 5300000,
          name: 'Falcon'
        }, {
          value: 1900000,
          name: 'Sparrow'
        }, {
          value: 2000000,
          name: 'Phoenix'
        }]
      }]
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                                Market Share                                */
/* -------------------------------------------------------------------------- */

const marketShareInit = () => {
  const ECHART_MARKET_SHARE = '.echart-market-share';
  const $echartMarketShare = document.querySelector(ECHART_MARKET_SHARE);
  if ($echartMarketShare) {
    const userOptions = utils.getData($echartMarketShare, 'options');
    const chart = window.echarts.init($echartMarketShare);
    const getDefaultOptions = () => ({
      color: [utils.getColors().primary, utils.getColors().info, utils.getGrays()[300]],
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        formatter(params) {
          return `<strong>${params.data.name}:</strong> ${params.percent}%`;
        }
      },
      position(pos, params, dom, rect, size) {
        return getPosition(pos, params, dom, rect, size);
      },
      legend: {
        show: false
      },
      series: [{
        type: 'pie',
        radius: ['100%', '87%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,
        itemStyle: {
          borderWidth: 2,
          borderColor: utils.getColor('gray-100')
        },
        label: {
          normal: {
            show: false,
            position: 'center',
            textStyle: {
              fontSize: '20',
              fontWeight: '500',
              color: utils.getGrays()['100']
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          value: 5300000,
          name: 'Samsung'
        }, {
          value: 1900000,
          name: 'Huawei'
        }, {
          value: 2000000,
          name: 'Apple'
        }]
      }]
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                            Bandwidth Saved                                 */
/* -------------------------------------------------------------------------- */

const marketingExpensesInit = () => {
  const $echartsMarketingExp = document.querySelector('.echart-marketing-expenses');
  if ($echartsMarketingExp) {
    const userOptions = utils.getData($echartsMarketingExp, 'options');
    const chart = window.echarts.init($echartsMarketingExp);
    const marketingExpenses = [{
      value: 412600,
      name: 'Offline Marketing',
      itemStyle: {
        color: utils.getColor('primary')
      },
      label: {
        rich: {
          per: {
            color: '#1C4F93'
          }
        }
      }
    }, {
      value: 641500,
      name: 'Digital Marketing',
      itemStyle: {
        color: utils.rgbaColor(utils.getColor('info'), 0.35)
      },
      label: {
        rich: {
          per: {
            color: '#1978A2'
          }
        }
      }
    }];
    const detailedExpenses = [{
      value: 91600,
      name: 'Event Sponsorship',
      itemStyle: {
        color: utils.rgbaColor(utils.getColor('primary'), 0.4)
      }
    }, {
      value: 183000,
      name: 'Outrich Event',
      itemStyle: {
        color: utils.rgbaColor(utils.getColor('primary'), 0.6)
      }
    }, {
      value: 138000,
      name: 'Ad Campaign',
      itemStyle: {
        color: utils.rgbaColor(utils.getColor('primary'), 0.8)
      }
    }, {
      value: 183000,
      name: 'Social Media',
      itemStyle: {
        color: utils.rgbaColor(utils.getColor('info'), 0.2)
      }
    }, {
      value: 45900,
      name: 'Google Ads',
      itemStyle: {
        color: utils.rgbaColor(utils.getColor('info'), 0.35)
      }
    }, {
      value: 138000,
      name: 'Influencer Marketing',
      itemStyle: {
        color: utils.rgbaColor(utils.getColor('info'), 0.5)
      }
    }, {
      value: 183000,
      name: 'Email Marketing',
      itemStyle: {
        color: utils.rgbaColor(utils.getColor('info'), 0.7)
      }
    }, {
      value: 91600,
      name: 'Generate Backlinks',
      itemStyle: {
        color: utils.rgbaColor(utils.getColor('info'), 0.8)
      }
    }];
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'item',
        backgroundColor: utils.getGrays()['100'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        formatter: '{b}<br/> {c} ({d}%)'
      },
      series: [{
        name: 'Marketing Expenses',
        type: 'pie',
        selectedMode: 'single',
        radius: ['45%', '60%'],
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          borderColor: utils.getColor('gray-100'),
          borderWidth: 2
        },
        data: detailedExpenses
      }, {
        name: 'Marketing Expenses',
        type: 'pie',
        radius: ['70%', '75%'],
        barWidth: 10,
        labelLine: {
          length: 0,
          show: false
        },
        label: {
          formatter: '{per|{d}%}',
          rich: {
            per: {
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 33
            }
          }
        },
        data: marketingExpenses
      }]
    });
    const initChart = () => {
      if (utils.isScrolledIntoView($echartsMarketingExp)) {
        echartSetOption(chart, userOptions, getDefaultOptions);
        window.removeEventListener('scroll', initChart);
      }
    };
    window.addEventListener('scroll', initChart);
  }
};

/* -------------------------------------------------------------------------- */
/*                                Market Share                                */
/* -------------------------------------------------------------------------- */

const mostLeadsInit = () => {
  const ECHART_MOST_LEADS = '.echart-most-leads';
  const $echartMostLeads = document.querySelector(ECHART_MOST_LEADS);
  if ($echartMostLeads) {
    const userOptions = utils.getData($echartMostLeads, 'options');
    const chart = window.echarts.init($echartMostLeads);
    const getDefaultOptions = () => ({
      color: [utils.getColors().primary, utils.rgbaColor(utils.getColors().primary, 0.5), utils.getColors().warning, utils.getColors().info],
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        formatter(params) {
          return `<strong>${params.data.name}:</strong> ${params.percent}%`;
        }
      },
      position(pos, params, dom, rect, size) {
        return getPosition(pos, params, dom, rect, size);
      },
      legend: {
        show: false
      },
      series: [{
        type: 'pie',
        radius: ['100%', '67%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,
        itemStyle: {
          borderWidth: 2,
          borderColor: utils.getColor('gray-100')
        },
        label: {
          normal: {
            show: false,
            position: 'center',
            textStyle: {
              fontSize: '20',
              fontWeight: '500',
              color: utils.getGrays()['700']
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          value: 60,
          name: 'Social'
        }, {
          value: 30,
          name: 'Other'
        }, {
          value: 10,
          name: 'Call'
        }, {
          value: 120,
          name: 'Email'
        }]
      }]
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};
const echartsNumberOfTicketsInit = () => {
  const $numberOfTickets = document.querySelector('.echart-number-of-tickets');
  if ($numberOfTickets) {
    const userOptions = utils.getData($numberOfTickets, 'options');
    const chart = window.echarts.init($numberOfTickets);
    const numberOfTicketsLegend = document.querySelectorAll("[data-number-of-tickets]");
    let xAxisData = ["Mar 01", "Mar 02", "Mar 03", "Mar 04", "Mar 05", "Mar 06"];
    let data1 = [45, 35, 55, 55, 55, 45];
    let data2 = [58, 42, 65, 65, 65, 30];
    let data3 = [38, 25, 42, 42, 42, 45];
    let data4 = [62, 45, 75, 75, 75, 55];
    const emphasisStyle = {
      itemStyle: {
        shadowColor: utils.rgbaColor(utils.getColor('dark'), 0.3),
        borderRadius: [5, 5, 5, 5]
      }
    };
    const getDefaultOptions = () => ({
      color: [utils.getColor('primary'), localStorage.getItem('theme') === 'dark' ? '#1E4C88' : '#94BCF1', localStorage.getItem('theme') === 'dark' ? '#1A3A64' : '#C0D8F7', localStorage.getItem('theme') === 'dark' ? '#225FAE' : '#6AA3ED'],
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['900']
        },
        borderWidth: 1,
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        }
      },
      legend: {
        data: ['On Hold Tickets', 'Open Tickets', 'Due Tickets', 'Unassigned Tickets'],
        show: false
      },
      xAxis: {
        data: xAxisData,
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['600']
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: "dashed"
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: "dashed"
          }
        },
        axisLabel: {
          color: utils.getGrays()['600']
        }
      },
      series: [{
        name: 'On Hold Tickets',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle,
        data: data1
      }, {
        name: 'Open Tickets',
        type: 'bar',
        stack: 'two',
        emphasis: emphasisStyle,
        data: data2
      }, {
        name: 'Due Tickets',
        type: 'bar',
        stack: 'three',
        emphasis: emphasisStyle,
        data: data3
      }, {
        name: 'Unassigned Tickets',
        type: 'bar',
        stack: 'four',
        emphasis: emphasisStyle,
        data: data4
      }],
      itemStyle: {
        borderRadius: [3, 3, 0, 0]
      },
      barWidth: "12px",
      grid: {
        top: '10%',
        bottom: 0,
        left: 0,
        right: 0,
        containLabel: true
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
    numberOfTicketsLegend.forEach(el => {
      el.addEventListener('change', () => {
        chart.dispatchAction({
          type: 'legendToggleSelect',
          name: utils.getData(el, 'number-of-tickets')
        });
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                             Echarts Real Time Users                        */
/* -------------------------------------------------------------------------- */

const realTimeUsersChartInit = () => {
  const $echartsRealTimeUsers = document.querySelector('.echart-real-time-users');
  if ($echartsRealTimeUsers) {
    const userOptions = utils.getData($echartsRealTimeUsers, 'options');
    const chart = window.echarts.init($echartsRealTimeUsers);
    const data = [921, 950, 916, 913, 909, 962, 926, 936, 977, 976, 999, 981, 998, 1000, 900, 906, 973, 911, 994, 982, 917, 972, 952, 963, 991];
    const axisData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    const tooltipFormatter = params => {
      return `
      <div>
          <h6 class="fs--1 text-700 mb-0"><span class="fas fa-circle me-1 text-info"></span>
            Users : ${params[0].value}
          </h6>
      </div>
      `;
    };
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        axisPointer: {
          type: 'none'
        },
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        },
        formatter: tooltipFormatter
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        boundaryGap: [0.2, 0.2],
        data: axisData
      },
      yAxis: {
        type: 'value',
        scale: true,
        boundaryGap: false,
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        min: 500,
        max: 1100
      },
      series: [{
        type: 'bar',
        barCategoryGap: '12%',
        data,
        itemStyle: {
          color: utils.rgbaColor('#fff', 0.3)
        }
      }],
      grid: {
        right: '0px',
        left: '0px',
        bottom: 0,
        top: 0
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
    const userCounterDom = document.querySelector('.real-time-user');
    setInterval(() => {
      const rndData = utils.getRandomNumber(900, 1000);
      data.shift();
      data.push(rndData);
      axisData.shift();
      axisData.push(utils.getRandomNumber(100, 500));
      userCounterDom.innerHTML = rndData;
      chart.setOption({
        xAxis: {
          data: axisData
        },
        series: [{
          data
        }]
      });
    }, 2000);
  }
};
const echartsReceivedTicketsInit = () => {
  const $receivedTickets = document.querySelector('.echart-received-tickets');
  if ($receivedTickets) {
    const userOptions = utils.getData($receivedTickets, 'options');
    const chart = window.echarts.init($receivedTickets);
    let xAxisData = ["Apr 01", "Apr 02", "Apr 03", "Apr 04", "Apr 05", "Apr 06", "Apr 07", "Apr 08", "Apr 09", "Apr 10"];
    let data1 = [28, 35, 28, 25, 21, 32, 25, 30, 23, 37];
    let data2 = [20, 27, 21, 15, 17, 22, 18, 20, 15, 27];
    let data3 = [15, 21, 23, 21, 12, 14, 13, 15, 10, 19];
    const emphasisStyle = {
      itemStyle: {
        shadowColor: utils.rgbaColor(utils.getColor('dark'), 0.3)
      }
    };
    const getDefaultOptions = () => ({
      color: [utils.getColor('primary'), utils.getColor('info'), utils.getGrays()['300']],
      legend: {
        data: ['All Received Tickets', 'New Received Tickets', 'Total Received Load Tickets'],
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        padding: [0, 0, 0, 0],
        textStyle: {
          color: utils.getGrays()['700'],
          fontWeight: "500",
          fontSize: "13px"
        },
        left: 0,
        itemGap: 16
      },
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['900']
        },
        borderWidth: 1,
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        }
      },
      xAxis: {
        data: xAxisData,
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['600']
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: "dashed"
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: "dashed"
          }
        },
        axisLabel: {
          color: utils.getGrays()['600']
        }
      },
      series: [{
        name: 'All Received Tickets',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle,
        data: data1
      }, {
        name: 'New Received Tickets',
        type: 'bar',
        stack: 'two',
        emphasis: emphasisStyle,
        data: data2
      }, {
        name: 'Total Received Load Tickets',
        type: 'bar',
        stack: 'three',
        emphasis: emphasisStyle,
        data: data3
      }],
      itemStyle: {
        borderRadius: [3, 3, 0, 0]
      },
      barWidth: "13.03px",
      grid: {
        top: '13%',
        bottom: 0,
        left: 0,
        right: 0,
        containLabel: true
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                     Echart Bar Report For This Week                        */
/* -------------------------------------------------------------------------- */

const reportForThisWeekInit = () => {
  const ECHART_BAR_REPORT_FOR_THIS_WEEK = '.echart-bar-report-for-this-week';
  const $echartBarReportForThisWeek = document.querySelector(ECHART_BAR_REPORT_FOR_THIS_WEEK);
  if ($echartBarReportForThisWeek) {
    const selectChart = utils.getData($echartBarReportForThisWeek, 'chart');
    const legendThisWeek = document.getElementById(selectChart?.option1);
    const legendLastWeek = document.getElementById(selectChart?.option2);
    const data = [['product', 'This Week', 'Last Week'], ['Sun', 43, 85], ['Mon', 83, 73], ['Tue', 86, 62], ['Wed', 72, 53], ['Thu', 80, 50], ['Fri', 50, 70], ['Sat', 80, 90]];
    const userOptions = utils.getData($echartBarReportForThisWeek, 'options');
    const chart = window.echarts.init($echartBarReportForThisWeek);
    const getDefaultOptions = () => ({
      color: [utils.getColors().primary, utils.getGrays()['300']],
      dataset: {
        source: data
      },
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        },
        formatter: function (params) {
          return `<div class="font-weight-semi-bold">${params.seriesName}</div><div class="fs--1 text-600"><strong>${params.name}:</strong> ${params.value[params.componentIndex + 1]}</div>`;
        }
      },
      legend: {
        show: false
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          color: utils.getGrays()['400']
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        },
        axisTick: false,
        boundaryGap: true
      },
      yAxis: {
        axisPointer: {
          type: 'none'
        },
        axisTick: 'none',
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['400'],
          formatter: value => `${value} hr`
        }
      },
      series: [{
        type: 'bar',
        name: '',
        barWidth: '12%',
        barGap: '30%',
        label: {
          normal: {
            show: false
          }
        },
        z: 10,
        itemStyle: {
          normal: {
            barBorderRadius: [10, 10, 0, 0],
            color: utils.getColors().primary
          }
        }
      }, {
        type: 'bar',
        barWidth: '12%',
        barGap: '30%',
        label: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            barBorderRadius: [4, 4, 0, 0],
            color: utils.getGrays()[300]
          }
        }
      }],
      grid: {
        right: '0',
        left: '40px',
        bottom: '10%',
        top: '15%'
      }
    });
    legendLastWeek && legendLastWeek.addEventListener('click', () => {
      legendLastWeek.classList.toggle('opacity-50');
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'Last Week'
      });
    });
    legendThisWeek && legendThisWeek.addEventListener('click', () => {
      legendThisWeek.classList.toggle('opacity-50');
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'This Week'
      });
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                     Echarts Line Returing Customer Rate                    */
/* -------------------------------------------------------------------------- */
const returningCustomerRateInit = () => {
  const ECHART_LINE_RETURNING_CUSTOMER_RATE = '.echart-line-returning-customer-rate';
  const $echartsLineReturningCustomerRate = document.querySelector(ECHART_LINE_RETURNING_CUSTOMER_RATE);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if ($echartsLineReturningCustomerRate) {
    // Get options from data attribute
    const userOptions = utils.getData($echartsLineReturningCustomerRate, 'options');
    const LEGEND_MONTH_TARGET = userOptions.target;
    const SELECT_MONTH = `#${userOptions.monthSelect}`;
    const LEGEND_NEW_MONTH = `#${userOptions.optionOne}`;
    const LEGEND_RETURNING_MONTH = `#${userOptions.optionTwo}`;
    const $legendNewMonth = document.getElementById(LEGEND_MONTH_TARGET).querySelector(LEGEND_NEW_MONTH);
    const $legendReturningMonth = document.getElementById(LEGEND_MONTH_TARGET).querySelector(LEGEND_RETURNING_MONTH);
    const chart = window.echarts.init($echartsLineReturningCustomerRate);
    const monthNumbers = [[20, 40, 20, 80, 50, 80, 120, 80, 50, 120, 110, 110], [60, 80, 60, 80, 65, 130, 120, 100, 30, 40, 30, 70], [100, 70, 80, 50, 120, 100, 130, 140, 90, 100, 40, 50], [80, 50, 60, 40, 60, 120, 100, 130, 60, 80, 50, 60], [70, 80, 100, 70, 90, 60, 80, 130, 40, 60, 50, 80], [90, 40, 80, 80, 100, 140, 100, 130, 90, 60, 70, 50], [80, 60, 80, 60, 40, 100, 120, 100, 30, 40, 30, 70], [20, 40, 20, 50, 70, 60, 110, 80, 90, 30, 50, 50], [60, 70, 30, 40, 80, 140, 80, 140, 120, 130, 100, 110], [90, 90, 40, 60, 40, 110, 90, 110, 60, 80, 60, 70], [50, 80, 50, 80, 50, 80, 120, 80, 50, 120, 110, 110], [60, 90, 60, 70, 40, 70, 100, 140, 30, 40, 30, 70], [20, 40, 20, 50, 30, 80, 120, 100, 30, 40, 30, 70]];
    const dates = month => {
      return utils.getDates(window.dayjs().month(month).date(1), window.dayjs().month(Number(month) + 1).date(0), 1000 * 60 * 60 * 24 * 3);
    };
    const getDefaultOptions = () => ({
      title: {
        text: 'Customers',
        textStyle: {
          fontWeight: 500,
          fontSize: 13,
          fontFamily: 'poppins',
          color: utils.getColor('gray-900')
        }
      },
      legend: {
        show: false,
        data: ['New', 'Returning']
      },
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        },
        formatter: tooltipFormatter
      },
      xAxis: {
        type: 'category',
        data: dates(0),
        boundaryGap: false,
        axisPointer: {
          lineStyle: {
            color: utils.getColor('gray-300'),
            type: 'dashed'
          }
        },
        axisLine: {
          lineStyle: {
            color: utils.getColor('gray-300'),
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getColor('gray-400'),
          formatter(value) {
            const date = new Date(value);
            if (date.getDate() === 1) {
              return `${months[date.getMonth()].substring(0, 3)} ${date.getDate()}`;
            }
            return `${date.getDate()}`;
          },
          margin: 15
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisPointer: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['300']
          }
        },
        boundaryGap: false,
        axisLabel: {
          show: true,
          color: utils.getGrays()['400'],
          margin: 15
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      series: [{
        name: 'New',
        type: 'line',
        data: monthNumbers[1],
        lineStyle: {
          color: utils.getColors().primary
        },
        itemStyle: {
          borderColor: utils.getColors().primary,
          borderWidth: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: utils.rgbaColor(utils.getColor('primary'), 0.2)
            }, {
              offset: 1,
              color: utils.rgbaColor(utils.getColor('primary'), 0.01)
            }]
          }
        },
        symbol: 'none',
        smooth: false,
        hoverAnimation: true
      }, {
        name: 'Returning',
        type: 'line',
        data: monthNumbers[0],
        lineStyle: {
          color: utils.getColor('warning')
        },
        itemStyle: {
          borderColor: utils.getColor('warning'),
          borderWidth: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: utils.rgbaColor(utils.getColor('warning'), 0.2)
            }, {
              offset: 1,
              color: utils.rgbaColor(utils.getColor('warning'), 0.01)
            }]
          }
        },
        symbol: 'none',
        smooth: false,
        hoverAnimation: true
      }],
      grid: {
        right: '7px',
        left: '35px',
        bottom: '8%',
        top: '15%'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);

    // Change chart options accordiong to the selected month
    const monthSelect = document.querySelector(SELECT_MONTH);
    monthSelect.addEventListener('change', e => {
      const month = e.currentTarget.value;
      const dataNewMonth = monthNumbers[Number(month) + 1];
      const dataReturningMonth = monthNumbers[month];
      chart.setOption({
        xAxis: {
          data: dates(month)
        },
        series: [{
          data: dataNewMonth
        }, {
          data: dataReturningMonth
        }]
      });
    });
    $legendNewMonth.addEventListener('click', () => {
      $legendNewMonth.classList.toggle('opacity-50');
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'New'
      });
    });
    $legendReturningMonth.addEventListener('click', () => {
      $legendReturningMonth.classList.toggle('opacity-50');
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'Returning'
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                          Echarts Sales Pos Location                        */
/* -------------------------------------------------------------------------- */

const salesByPosLocationInit = () => {
  const ECHART_RADAR_SALES_BY_POS_LOCATION = '.echart-radar-sales-by-pos-location';

  // eslint-disable-next-line
  const $echartsRadarSalesByPosLocation = document.querySelector(ECHART_RADAR_SALES_BY_POS_LOCATION);
  function getformatter(params) {
    //const indicators = ['Marketing','Sales', 'Dev', 'Support', 'Tech', 'Admin']
    return `<strong > ${params.name} </strong>
    <div class="fs--1 text-600">
      <strong >Marketing</strong>: ${params.value[0]}  <br>
      <strong>Sales</strong>: ${params.value[1]}  <br>
      <strong>Dev</strong>: ${params.value[2]}  <br>
      <strong>Support</strong>: ${params.value[3]}  <br>
      <strong>Tech</strong>: ${params.value[4]}  <br>
      <strong>Admin</strong>: ${params.value[5]}  <br>
    </div>`;
  }
  if ($echartsRadarSalesByPosLocation) {
    // Get options from data attribute
    const userOptions = utils.getData($echartsRadarSalesByPosLocation, 'options');
    const chart = window.echarts.init($echartsRadarSalesByPosLocation);
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getColor('gray-100'),
        borderColor: utils.getColor('gray-300'),
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        formatter: getformatter
      },
      radar: {
        splitNumber: 7,
        radius: '75%',
        axisLine: {
          show: true,
          symbol: 'circle',
          symbolSize: [13, 13],
          lineStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [{
                offset: 0.7,
                color: utils.getColor('gray-100')
              }, {
                offset: 1,
                color: utils.getColor('gray-400')
              }]
            }
          }
        },
        splitArea: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: utils.getColor('gray-300')
          }
        },
        name: {
          textStyle: {
            color: utils.getColor('gray-600'),
            fontWeight: 500
          }
        },
        indicator: [{
          name: 'Marketing',
          max: 70
        }, {
          name: 'Admin',
          max: 70
        }, {
          name: 'Tech',
          max: 70
        }, {
          name: 'Support',
          max: 70
        }, {
          name: 'Dev',
          max: 70
        }, {
          name: 'Sales',
          max: 70
        }]
      },
      series: [{
        name: 'Budget vs spending',
        type: 'radar',
        symbol: 'pin',
        data: [{
          value: [20, 50, 60, 50, 60, 60],
          name: 'Budget',
          itemStyle: {
            color: utils.rgbaColor(utils.getColors().warning, 0.5)
          },
          areaStyle: {
            color: utils.rgbaColor(utils.getColors().warning, 0.24)
          },
          symbol: 'circle',
          symbolSize: 8
        }, {
          value: [40, 60, 30, 15, 60, 35],
          name: 'Spending',
          areaStyle: {
            color: utils.rgbaColor(utils.getColors().primary, 0.24)
          },
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: utils.rgbaColor(utils.getColors().primary)
          }
        }]
      }],
      grid: {
        top: 0,
        bottom: '100px'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};
const echartsSatisfactionSurveyInit = () => {
  const $satisfactionSurvey = document.querySelector('.echart-satisfaction-survey');
  if ($satisfactionSurvey) {
    const userOptions = utils.getData($satisfactionSurvey, 'options');
    const chart = window.echarts.init($satisfactionSurvey);
    let xAxisData = ["05 April", "06 April", "07 April", "08 April", "09 April", "10 April", "11 April", "12 April", "13 April", "14 April", "15 April"];
    let data1 = [98, 105, 65, 110, 75, 55, 95, 75, 90, 45, 70];
    let data2 = [80, 60, 78, 58, 65, 65, 75, 110, 40, 60, 60];
    const emphasisStyle1 = {
      itemStyle: {
        shadowColor: utils.rgbaColor(utils.getColor('dark'), 0.3),
        color: utils.rgbaColor(utils.getColor('primary'), 0.8)
      }
    };
    const emphasisStyle2 = {
      itemStyle: {
        shadowColor: utils.rgbaColor(utils.getColor('dark'), 0.3),
        color: utils.getGrays()['300']
      }
    };
    const getDefaultOptions = () => ({
      color: [utils.getColor('primary'), utils.getGrays()['200']],
      legend: {
        data: ['Satisfied', 'Dissatisfied'],
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        padding: [0, 0, 0, 0],
        textStyle: {
          color: utils.getGrays()['700'],
          fontWeight: "500",
          fontSize: "13px"
        },
        left: 0,
        itemGap: 16
      },
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['900']
        },
        borderWidth: 1,
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        }
      },
      xAxis: {
        data: xAxisData,
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['600']
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['300']
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: "dashed"
          }
        },
        axisLabel: {
          color: utils.getGrays()['600']
        }
      },
      series: [{
        name: 'Satisfied',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle1,
        data: data1
      }, {
        name: 'Dissatisfied',
        type: 'bar',
        stack: 'two',
        emphasis: emphasisStyle2,
        data: data2
      }],
      itemStyle: {
        borderRadius: [3, 3, 0, 0]
      },
      barWidth: "13.03px",
      grid: {
        top: '13%',
        bottom: 0,
        left: 0,
        right: 0,
        containLabel: true
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                                Session By Device                           */
/* -------------------------------------------------------------------------- */

const sessionByBrowserChartInit = () => {
  const $sessionByBroswser = document.querySelector('.echart-session-by-browser');
  if ($sessionByBroswser) {
    const userOptions = utils.getData($sessionByBroswser, 'options');
    const chart = window.echarts.init($sessionByBroswser);
    const dataset = {
      week: [{
        value: 50.3,
        name: 'Chrome'
      }, {
        value: 20.6,
        name: 'Safari'
      }, {
        value: 30.1,
        name: 'Mozilla'
      }],
      month: [{
        value: 35.1,
        name: 'Chrome'
      }, {
        value: 25.6,
        name: 'Safari'
      }, {
        value: 40.3,
        name: 'Mozilla'
      }],
      year: [{
        value: 26.1,
        name: 'Chrome'
      }, {
        value: 10.6,
        name: 'Safari'
      }, {
        value: 64.3,
        name: 'Mozilla'
      }]
    };
    const getDefaultOptions = () => ({
      color: [utils.getColors().primary, utils.getColors().success, utils.getColors().info],
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        formatter: params => `<strong>${params.data.name}:</strong> ${params.data.value}%`,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        }
      },
      legend: {
        show: false
      },
      series: [{
        type: 'pie',
        radius: ['100%', '65%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,
        itemStyle: {
          borderWidth: 2,
          borderColor: utils.getColor('gray-100')
        },
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: dataset.week
      }]
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
    const selectMenu = document.querySelector("[data-target='.echart-session-by-browser']");
    if (selectMenu) {
      selectMenu.addEventListener('change', e => {
        const {
          value
        } = e.currentTarget;
        chart.setOption({
          series: [{
            data: dataset[value]
          }]
        });
      });
    }
  }
};

/* -------------------------------------------------------------------------- */
/*                                Session By Country Map                      */
/* -------------------------------------------------------------------------- */

const sessionByCountryMapInit = () => {
  const $sessionByCountryMap = document.querySelector('.echart-session-by-country-map');
  const data = [{
    name: 'Afghanistan',
    value: 28397.812
  }, {
    name: 'Angola',
    value: 19549.124
  }, {
    name: 'Albania',
    value: 3150.143
  }, {
    name: 'United Arab Emirates',
    value: 8441.537
  }, {
    name: 'Argentina',
    value: 40374.224
  }, {
    name: 'Armenia',
    value: 2963.496
  }, {
    name: 'French Southern and Antarctic Lands',
    value: 268.065
  }, {
    name: 'Australia',
    value: 22404.488
  }, {
    name: 'Austria',
    value: 8401.924
  }, {
    name: 'Azerbaijan',
    value: 9094.718
  }, {
    name: 'Burundi',
    value: 9232.753
  }, {
    name: 'Belgium',
    value: 10941.288
  }, {
    name: 'Benin',
    value: 9509.798
  }, {
    name: 'Burkina Faso',
    value: 15540.284
  }, {
    name: 'Bangladesh',
    value: 151125.475
  }, {
    name: 'Bulgaria',
    value: 7389.175
  }, {
    name: 'The Bahamas',
    value: 66402.316
  }, {
    name: 'Bosnia and Herzegovina',
    value: 3845.929
  }, {
    name: 'Belarus',
    value: 9491.07
  }, {
    name: 'Belize',
    value: 308.595
  }, {
    name: 'Bermuda',
    value: 64.951
  }, {
    name: 'Bolivia',
    value: 716.939
  }, {
    name: 'Brazil',
    value: 195210.154
  }, {
    name: 'Brunei',
    value: 27.223
  }, {
    name: 'Bhutan',
    value: 716.939
  }, {
    name: 'Botswana',
    value: 1969.341
  }, {
    name: 'Central African Rep.',
    value: 4349.921
  }, {
    name: 'Canada',
    value: 34126.24
  }, {
    name: 'Switzerland',
    value: 7830.534
  }, {
    name: 'Chile',
    value: 17150.76
  }, {
    name: 'China',
    value: 1359821.465
  }, {
    name: "Côte d'Ivoire",
    value: 60508.978
  }, {
    name: 'Cameroon',
    value: 20624.343
  }, {
    name: 'Dem. Rep. Congo',
    value: 62191.161
  }, {
    name: 'Congo',
    value: 3573.024
  }, {
    name: 'Colombia',
    value: 46444.798
  }, {
    name: 'Costa Rica',
    value: 4669.685
  }, {
    name: 'Cuba',
    value: 11281.768
  }, {
    name: 'Northern Cyprus',
    value: 1.468
  }, {
    name: 'Cyprus',
    value: 1103.685
  }, {
    name: 'Czech Republic',
    value: 10553.701
  }, {
    name: 'Germany',
    value: 83017.404
  }, {
    name: 'Djibouti',
    value: 834.036
  }, {
    name: 'Denmark',
    value: 5550.959
  }, {
    name: 'Dominican Republic',
    value: 10016.797
  }, {
    name: 'Algeria',
    value: 37062.82
  }, {
    name: 'Ecuador',
    value: 15001.072
  }, {
    name: 'Egypt',
    value: 78075.705
  }, {
    name: 'Eritrea',
    value: 5741.159
  }, {
    name: 'Spain',
    value: 46182.038
  }, {
    name: 'Estonia',
    value: 1298.533
  }, {
    name: 'Ethiopia',
    value: 87095.281
  }, {
    name: 'Finland',
    value: 5367.693
  }, {
    name: 'Fiji',
    value: 860.559
  }, {
    name: 'Falkland Islands',
    value: 49.581
  }, {
    name: 'France',
    value: 63230.866
  }, {
    name: 'Gabon',
    value: 1556.222
  }, {
    name: 'United Kingdom',
    value: 62066.35
  }, {
    name: 'Georgia',
    value: 4388.674
  }, {
    name: 'Ghana',
    value: 24262.901
  }, {
    name: 'Eq. Guinea',
    value: 10876.033
  }, {
    name: 'Guinea',
    value: 10876.033
  }, {
    name: 'Gambia',
    value: 1680.64
  }, {
    name: 'Guinea Bissau',
    value: 10876.033
  }, {
    name: 'Equatorial Guinea',
    value: 696.167
  }, {
    name: 'Greece',
    value: 11109.999
  }, {
    name: 'Greenland',
    value: 56.546
  }, {
    name: 'Guatemala',
    value: 14341.576
  }, {
    name: 'French Guiana',
    value: 231.169
  }, {
    name: 'Guyana',
    value: 786.126
  }, {
    name: 'Honduras',
    value: 7621.204
  }, {
    name: 'Croatia',
    value: 4338.027
  }, {
    name: 'Haiti',
    value: 9896.4
  }, {
    name: 'Hungary',
    value: 10014.633
  }, {
    name: 'Indonesia',
    value: 240676.485
  }, {
    name: 'India',
    value: 1205624.648
  }, {
    name: 'Ireland',
    value: 4467.561
  }, {
    name: 'Iran',
    value: 240676.485
  }, {
    name: 'Iraq',
    value: 30962.38
  }, {
    name: 'Iceland',
    value: 318.042
  }, {
    name: 'Israel',
    value: 7420.368
  }, {
    name: 'Italy',
    value: 60508.978
  }, {
    name: 'Jamaica',
    value: 2741.485
  }, {
    name: 'Jordan',
    value: 6454.554
  }, {
    name: 'Japan',
    value: 127352.833
  }, {
    name: 'Kazakhstan',
    value: 15921.127
  }, {
    name: 'Kenya',
    value: 40909.194
  }, {
    name: 'Kyrgyzstan',
    value: 5334.223
  }, {
    name: 'Cambodia',
    value: 14364.931
  }, {
    name: 'South Korea',
    value: 51452.352
  }, {
    name: 'Kosovo',
    value: 97.743
  }, {
    name: 'Kuwait',
    value: 2991.58
  }, {
    name: 'Laos',
    value: 6395.713
  }, {
    name: 'Lebanon',
    value: 4341.092
  }, {
    name: 'Liberia',
    value: 3957.99
  }, {
    name: 'Libya',
    value: 6040.612
  }, {
    name: 'Sri Lanka',
    value: 20758.779
  }, {
    name: 'Lesotho',
    value: 2008.921
  }, {
    name: 'Lithuania',
    value: 3068.457
  }, {
    name: 'Luxembourg',
    value: 507.885
  }, {
    name: 'Latvia',
    value: 2090.519
  }, {
    name: 'Morocco',
    value: 31642.36
  }, {
    name: 'Moldova',
    value: 103.619
  }, {
    name: 'Madagascar',
    value: 21079.532
  }, {
    name: 'Mexico',
    value: 117886.404
  }, {
    name: 'Macedonia',
    value: 507.885
  }, {
    name: 'Mali',
    value: 13985.961
  }, {
    name: 'Myanmar',
    value: 51931.231
  }, {
    name: 'Montenegro',
    value: 620.078
  }, {
    name: 'Mongolia',
    value: 2712.738
  }, {
    name: 'Mozambique',
    value: 23967.265
  }, {
    name: 'Mauritania',
    value: 3609.42
  }, {
    name: 'Malawi',
    value: 15013.694
  }, {
    name: 'Malaysia',
    value: 28275.835
  }, {
    name: 'Namibia',
    value: 2178.967
  }, {
    name: 'New Caledonia',
    value: 246.379
  }, {
    name: 'Niger',
    value: 15893.746
  }, {
    name: 'Nigeria',
    value: 159707.78
  }, {
    name: 'Nicaragua',
    value: 5822.209
  }, {
    name: 'Netherlands',
    value: 16615.243
  }, {
    name: 'Norway',
    value: 4891.251
  }, {
    name: 'Nepal',
    value: 26846.016
  }, {
    name: 'New Zealand',
    value: 4368.136
  }, {
    name: 'Oman',
    value: 2802.768
  }, {
    name: 'Pakistan',
    value: 173149.306
  }, {
    name: 'Panama',
    value: 3678.128
  }, {
    name: 'Peru',
    value: 29262.83
  }, {
    name: 'Philippines',
    value: 93444.322
  }, {
    name: 'Papua New Guinea',
    value: 6858.945
  }, {
    name: 'Poland',
    value: 38198.754
  }, {
    name: 'Puerto Rico',
    value: 3709.671
  }, {
    name: 'North Korea',
    value: 1.468
  }, {
    name: 'Portugal',
    value: 10589.792
  }, {
    name: 'Paraguay',
    value: 6459.721
  }, {
    name: 'Qatar',
    value: 1749.713
  }, {
    name: 'Romania',
    value: 21861.476
  }, {
    name: 'Russia',
    value: 21861.476
  }, {
    name: 'Rwanda',
    value: 10836.732
  }, {
    name: 'Western Sahara',
    value: 514.648
  }, {
    name: 'Saudi Arabia',
    value: 27258.387
  }, {
    name: 'Sudan',
    value: 35652.002
  }, {
    name: 'S. Sudan',
    value: 9940.929
  }, {
    name: 'Senegal',
    value: 12950.564
  }, {
    name: 'Solomon Islands',
    value: 526.447
  }, {
    name: 'Sierra Leone',
    value: 5751.976
  }, {
    name: 'El Salvador',
    value: 6218.195
  }, {
    name: 'Somaliland',
    value: 9636.173
  }, {
    name: 'Somalia',
    value: 9636.173
  }, {
    name: 'Republic of Serbia',
    value: 3573.024
  }, {
    name: 'Suriname',
    value: 524.96
  }, {
    name: 'Slovakia',
    value: 5433.437
  }, {
    name: 'Slovenia',
    value: 2054.232
  }, {
    name: 'Sweden',
    value: 9382.297
  }, {
    name: 'Swaziland',
    value: 1193.148
  }, {
    name: 'Syria',
    value: 7830.534
  }, {
    name: 'Chad',
    value: 11720.781
  }, {
    name: 'Togo',
    value: 6306.014
  }, {
    name: 'Thailand',
    value: 66402.316
  }, {
    name: 'Tajikistan',
    value: 7627.326
  }, {
    name: 'Turkmenistan',
    value: 5041.995
  }, {
    name: 'East Timor',
    value: 10016.797
  }, {
    name: 'Trinidad and Tobago',
    value: 1328.095
  }, {
    name: 'Tunisia',
    value: 10631.83
  }, {
    name: 'Turkey',
    value: 72137.546
  }, {
    name: 'Tanzania',
    value: 44973.33
  }, {
    name: 'Uganda',
    value: 33987.213
  }, {
    name: 'Ukraine',
    value: 46050.22
  }, {
    name: 'Uruguay',
    value: 3371.982
  }, {
    name: 'United States',
    value: 312247.116
  }, {
    name: 'Uzbekistan',
    value: 27769.27
  }, {
    name: 'Venezuela',
    value: 236.299
  }, {
    name: 'Vietnam',
    value: 89047.397
  }, {
    name: 'Vanuatu',
    value: 236.299
  }, {
    name: 'West Bank',
    value: 13.565
  }, {
    name: 'Yemen',
    value: 22763.008
  }, {
    name: 'South Africa',
    value: 51452.352
  }, {
    name: 'Zambia',
    value: 13216.985
  }, {
    name: 'Zimbabwe',
    value: 13076.978
  }];
  const total = 6961500;
  if ($sessionByCountryMap) {
    const userOptions = utils.getData($sessionByCountryMap, 'options');
    const chart = window.echarts.init($sessionByCountryMap);
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        formatter: params => `<strong>${params.data?.name} :</strong> ${(params.data?.value / total * 100).toFixed(2)}%`
      },
      toolbox: {
        show: false,
        feature: {
          restore: {}
        }
      },
      visualMap: {
        show: false,
        min: 800,
        max: 50000,
        inRange: {
          color: [utils.getColors().primary, utils.rgbaColor(utils.getColors().primary, 0.8), utils.rgbaColor(utils.getColors().primary, 0.6), utils.rgbaColor(utils.getColors().primary, 0.4), utils.rgbaColor(utils.getColors().primary, 0.2)].reverse()
        }
      },
      series: [{
        type: 'map',
        map: 'world',
        data,
        roam: true,
        scaleLimit: {
          min: 1,
          max: 5
        },
        left: 0,
        right: 0,
        label: {
          show: false
        },
        itemStyle: {
          borderColor: utils.getGrays()['300']
        },
        emphasis: {
          label: {
            show: false
          },
          itemStyle: {
            areaColor: utils.getColor('warning')
          }
        }
      }]
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
    document.querySelector('.session-by-country-map-reset')?.addEventListener('click', () => {
      chart.dispatchAction({
        type: 'restore'
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                Session By Country                          */
/* -------------------------------------------------------------------------- */

const sessionByCountryChartInit = () => {
  const $sessionByCountry = document.querySelector('.echart-session-by-country');
  const data = [['CHINA', 'INDIA', 'USA', 'IRAN', 'BRAZIL', 'PAKISTAN'], [19.53, 17.32, 4.49, 3.46, 2.8, 1.7]];
  if ($sessionByCountry) {
    const userOptions = utils.getData($sessionByCountry, 'options');
    const chart = window.echarts.init($sessionByCountry);
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        axisPointer: {
          type: 'none'
        },
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        }
        // formatter: tooltipFormatter
      },

      xAxis: {
        type: 'category',
        data: data[0],
        axisLabel: {
          color: utils.getGrays()['600'],
          formatter: value => value.substring(0, 3)
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['400']
          }
        },
        axisTick: {
          show: true,
          // length: 8,
          alignWithLabel: true,
          lineStyle: {
            color: utils.getGrays()['200']
          }
        }
      },
      yAxis: {
        type: 'value',
        // inverse: true,
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        },
        axisLabel: {
          color: utils.getGrays()['600'],
          formatter: value => `${value}%`,
          fontWeight: 500,
          padding: [3, 0, 0, 0],
          margin: 12
        },
        axisLine: {
          show: false
        }
      },
      series: [{
        type: 'bar',
        data: data[1],
        itemStyle: {
          barBorderRadius: [3, 3, 0, 0],
          color: utils.getColors().primary
        },
        barWidth: 15
      }],
      grid: {
        right: '12px',
        left: '40px',
        bottom: '10%',
        top: '16px'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};
const echartTicketPriority = () => {
  const $paginationBtnNext = document.querySelector('[data-list-pagination-chart="next"]');
  const $paginationBtnPrev = document.querySelector('[data-list-pagination-chart="prev"]');
  const $paginationContainer = document.querySelector('[data-list-pagination-chart]');
  if ($paginationBtnNext) {
    $paginationBtnNext.addEventListener('click', () => {
      basicEchartsInit();
    });
  }
  if ($paginationBtnPrev) {
    $paginationBtnPrev.addEventListener('click', () => {
      basicEchartsInit();
    });
  }
  if ($paginationContainer) {
    $paginationContainer.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        setTimeout(() => {
          basicEchartsInit();
        });
      }
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                Traffic Channels                           */
/* -------------------------------------------------------------------------- */

const ticketVolumeChartInit = () => {
  const $ticketVolume = document.querySelector('.echart-ticket-volume');
  if ($ticketVolume) {
    const userOptions = utils.getData($ticketVolume, 'options');
    const chart = window.echarts.init($ticketVolume);
    const ticketVolumeLegend = document.querySelectorAll('[data-ticket-volume]');
    const getDefaultOptions = () => ({
      color: [utils.getColors().primary, localStorage.getItem('theme') === 'dark' ? '#235FAD' : '#6AA2EC', localStorage.getItem('theme') === 'dark' ? '#1C4477' : '#AACAF4', localStorage.getItem('theme') === 'dark' ? '#152C48' : '#DFEBFB'],
      legend: {
        data: ['On Hold Tickets', 'Open Tickets', 'Due Tickets', 'Unassigned Tickets'],
        show: false
      },
      xAxis: {
        type: 'category',
        data: utils.getPastDates(10),
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['300']
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['600'],
          formatter: value => window.dayjs(value).format('MMM DD')
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['300']
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          color: utils.getGrays()['600']
        }
      },
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        axisPointer: {
          type: 'none'
        },
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        },
        formatter: tooltipFormatter
      },
      series: [{
        name: 'On Hold Tickets',
        type: 'bar',
        stack: 'total',
        data: [8, 6, 5, 12, 9, 6, 9, 6, 4, 7],
        emphasis: {
          itemStyle: {
            color: utils.getColor('primary')
          }
        }
      }, {
        name: 'Open Tickets',
        type: 'bar',
        stack: 'total',
        data: [15, 10, 7, 7, 5, 6, 15, 10, 7, 12],
        emphasis: {
          itemStyle: {
            color: localStorage.getItem('theme') === 'dark' ? '#2567BD' : '#5595E9'
          }
        }
      }, {
        name: 'Due Tickets',
        type: 'bar',
        stack: 'total',
        data: [5, 4, 4, 6, 6, 8, 7, 4, 3, 5],
        emphasis: {
          itemStyle: {
            color: localStorage.getItem('theme') === 'dark' ? '#205396' : '#7FB0EF'
          }
        }
      }, {
        name: 'Unassigned Tickets',
        type: 'bar',
        stack: 'total',
        data: [6, 3, 6, 4, 12, 7, 5, 3, 2, 4],
        itemStyle: {
          barBorderRadius: [2, 2, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: localStorage.getItem('theme') === 'dark' ? '#1A3F6F' : '#AACAF4'
          }
        }
      }],
      grid: {
        right: '0px',
        left: '23px',
        bottom: '6%',
        top: '10%'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
    ticketVolumeLegend.forEach(el => {
      el.addEventListener('change', () => {
        chart.dispatchAction({
          type: 'legendToggleSelect',
          name: utils.getData(el, 'ticket-volume')
        });
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                Audience Chart                              */
/* -------------------------------------------------------------------------- */

const topCustomersChartInit = () => {
  const data = {
    hours: ['1H', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H'],
    dataset: {
      monday: [[18, 50, 45, 80, 45, 60, 55, 82, 61, 50]],
      tuesday: [[50, 45, 32, 74, 45, 55, 85, 30, 25, 50]],
      wednesday: [[88, 70, 75, 54, 45, 44, 25, 65, 11, 20]],
      thursday: [[20, 30, 40, 50, 70, 80, 85, 40, 30, 20]],
      friday: [[18, 50, 45, 75, 45, 80, 85, 65, 61, 50]],
      saturday: [[25, 50, 45, 75, 80, 44, 55, 85, 61, 45]],
      sunday: [[11, 50, 45, 78, 45, 54, 80, 90, 50, 65]]
    }
  };
  const getDefaultOptions = data1 => () => ({
    color: utils.getGrays()['100'],
    tooltip: {
      trigger: 'item',
      padding: [7, 10],
      backgroundColor: utils.getGrays()['100'],
      borderColor: utils.getGrays()['300'],
      textStyle: {
        color: utils.getGrays()['1100']
      },
      borderWidth: 1,
      transitionDuration: 0,
      position(pos, params, dom, rect, size) {
        return getPosition(pos, params, dom, rect, size);
      },
      axisPointer: {
        type: 'none'
      }
    },
    xAxis: {
      type: 'category',
      data: data.hours,
      axisLabel: {
        color: utils.getGrays()['600'],
        margin: 15
      },
      axisLine: {
        lineStyle: {
          color: utils.getGrays()['300'],
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      },
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      axisPointer: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: utils.getGrays()['300'],
          type: 'dashed'
        }
      },
      boundaryGap: false,
      axisLabel: {
        show: true,
        color: utils.getGrays()['600'],
        margin: 25
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    series: [{
      type: 'line',
      data: data1,
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: {
        borderColor: utils.getColors().primary,
        borderWidth: 2
      },
      lineStyle: {
        color: utils.getColors().primary
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: utils.rgbaColor(utils.getColors().primary, 0.1)
          }, {
            offset: 1,
            color: utils.rgbaColor(utils.getColors().primary, 0)
          }]
        }
      }
    }],
    grid: {
      right: '12px',
      left: '46px',
      bottom: '12%',
      top: '3%'
    }
  });
  const initChart = (el, options) => {
    const userOptions = utils.getData(el, 'options');
    const chart = window.echarts.init(el);
    echartSetOption(chart, userOptions, options);
  };
  const tab = document.querySelector('#top-customers-chart-tab');
  if (tab) {
    initChart(document.querySelector('.echart-top-customers'), getDefaultOptions(data.dataset.monday[0]));
    const triggerTabList = Array.from(tab.querySelectorAll('[data-bs-toggle="tab"]'));
    triggerTabList.forEach(function (triggerEl) {
      triggerEl.addEventListener('shown.bs.tab', function () {
        const key = triggerEl.href.split('#').pop();
        const $echartTopCustomers = document.getElementById(key).querySelector('.echart-top-customers');
        initChart($echartTopCustomers, getDefaultOptions(data.dataset[key][0]));
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                Top Products                                */
/* -------------------------------------------------------------------------- */

const topProductsInit = () => {
  const ECHART_BAR_TOP_PRODUCTS = '.echart-bar-top-products';
  const $echartBarTopProducts = document.querySelector(ECHART_BAR_TOP_PRODUCTS);
  if ($echartBarTopProducts) {
    const data = [['product', '2019', '2018'], ['Boots4', 43, 85], ['Reign Pro', 83, 73], ['Slick', 86, 62], ['Falcon', 72, 53], ['Sparrow', 80, 50], ['Hideway', 50, 70], ['Freya', 80, 90]];
    const userOptions = utils.getData($echartBarTopProducts, 'options');
    const chart = window.echarts.init($echartBarTopProducts);
    const getDefaultOptions = () => ({
      color: [utils.getColors().primary, utils.getGrays()['300']],
      dataset: {
        source: data
      },
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        },
        formatter: function (params) {
          return `<div class="font-weight-semi-bold">${params.seriesName}</div><div class="fs--1 text-600"><strong>${params.name}:</strong> ${params.value[params.componentIndex + 1]}</div>`;
        }
      },
      legend: {
        data: ['2019', '2018'],
        left: 'left',
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 0,
        icon: 'circle',
        inactiveColor: utils.getGrays()['400'],
        textStyle: {
          color: utils.getGrays()['700']
        }
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          color: utils.getGrays()['400']
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        },
        axisTick: false,
        boundaryGap: true
      },
      yAxis: {
        axisPointer: {
          type: 'none'
        },
        axisTick: 'none',
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['400']
        }
      },
      series: [{
        type: 'bar',
        barWidth: '10px',
        barGap: '30%',
        label: {
          normal: {
            show: false
          }
        },
        z: 10,
        itemStyle: {
          normal: {
            barBorderRadius: [10, 10, 0, 0],
            color: utils.getColors().primary
          }
        }
      }, {
        type: 'bar',
        barWidth: '10px',
        barGap: '30%',
        label: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            barBorderRadius: [4, 4, 0, 0],
            color: utils.getGrays()[300]
          }
        }
      }],
      grid: {
        right: '0',
        left: '30px',
        bottom: '10%',
        top: '20%'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                                Total Order                                 */
/* -------------------------------------------------------------------------- */

const totalOrderInit = () => {
  const ECHART_LINE_TOTAL_ORDER = '.echart-line-total-order';

  //
  // ─── TOTAL ORDER CHART ──────────────────────────────────────────────────────────
  //
  const $echartLineTotalOrder = document.querySelector(ECHART_LINE_TOTAL_ORDER);
  if ($echartLineTotalOrder) {
    // Get options from data attribute
    const userOptions = utils.getData($echartLineTotalOrder, 'options');
    const chart = window.echarts.init($echartLineTotalOrder);

    // Default options
    const getDefaultOptions = () => ({
      tooltip: {
        triggerOn: 'mousemove',
        trigger: 'axis',
        padding: [7, 10],
        formatter: '{b0}: {c0}',
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getColors().dark
        },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        }
      },
      xAxis: {
        type: 'category',
        data: ['Week 4', 'Week 5', 'Week 6', 'Week 7'],
        boundaryGap: false,
        splitLine: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisPointer: {
          type: 'none'
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisPointer: {
          show: false
        }
      },
      series: [{
        type: 'line',
        lineStyle: {
          color: utils.getColors().primary,
          width: 3
        },
        itemStyle: {
          color: utils.getColors().white,
          borderColor: utils.getColors().primary,
          borderWidth: 2
        },
        hoverAnimation: true,
        data: [20, 40, 100, 120],
        // connectNulls: true,
        smooth: 0.6,
        smoothMonotone: 'x',
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 8,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: utils.rgbaColor(utils.getColors().primary, 0.25)
            }, {
              offset: 1,
              color: utils.rgbaColor(utils.getColors().primary, 0)
            }]
          }
        }
      }],
      grid: {
        bottom: '2%',
        top: '0%',
        right: '10px',
        left: '10px'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                      Echarts Total Sales E-commerce                        */
/* -------------------------------------------------------------------------- */

const totalSalesEcommerce = () => {
  const ECHART_LINE_TOTAL_SALES_ECOMM = '.echart-line-total-sales-ecommerce';
  const $echartsLineTotalSalesEcomm = document.querySelector(ECHART_LINE_TOTAL_SALES_ECOMM);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function getFormatter(params) {
    return params.map(({
      value,
      borderColor,
      seriesName
    }) => `<span class= "fas fa-circle" style="color: ${borderColor}"></span>
    <span class='text-600'>${seriesName === 'lastMonth' ? 'Last Month' : 'Previous Year'}: ${value}</span>`).join('<br/>');
  }
  if ($echartsLineTotalSalesEcomm) {
    // Get options from data attribute
    const userOptions = utils.getData($echartsLineTotalSalesEcomm, 'options');
    const TOTAL_SALES_LAST_MONTH = `#${userOptions.optionOne}`;
    const TOTAL_SALES_PREVIOUS_YEAR = `#${userOptions.optionTwo}`;
    const totalSalesLastMonth = document.querySelector(TOTAL_SALES_LAST_MONTH);
    const totalSalesPreviousYear = document.querySelector(TOTAL_SALES_PREVIOUS_YEAR);
    const chart = window.echarts.init($echartsLineTotalSalesEcomm);
    const getDefaultOptions = () => ({
      color: utils.getGrays()['100'],
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        formatter(params) {
          return getFormatter(params);
        },
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        }
      },
      legend: {
        data: ['lastMonth', 'previousYear'],
        show: false
      },
      xAxis: {
        type: 'category',
        data: ['2019-01-05', '2019-01-06', '2019-01-07', '2019-01-08', '2019-01-09', '2019-01-10', '2019-01-11', '2019-01-12', '2019-01-13', '2019-01-14', '2019-01-15', '2019-01-16'],
        boundaryGap: false,
        axisPointer: {
          lineStyle: {
            color: utils.getColor('gray-300'),
            type: 'dashed'
          }
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            // color: utils.getGrays()['300'],
            color: utils.rgbaColor('#000', 0.01),
            type: 'dashed'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getColor('gray-400'),
          formatter(value) {
            const date = new Date(value);
            return `${months[date.getMonth()]} ${date.getDate()}`;
          },
          margin: 15
          // showMaxLabel: false
        }
      },

      yAxis: {
        type: 'value',
        axisPointer: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: utils.getColor('gray-300'),
            type: 'dashed'
          }
        },
        boundaryGap: false,
        axisLabel: {
          show: true,
          color: utils.getColor('gray-400'),
          margin: 15
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      series: [{
        name: 'lastMonth',
        type: 'line',
        data: [50, 80, 60, 80, 65, 90, 130, 90, 30, 40, 30, 70],
        lineStyle: {
          color: utils.getColor('primary')
        },
        itemStyle: {
          borderColor: utils.getColor('primary'),
          borderWidth: 2
        },
        symbol: 'circle',
        symbolSize: 10,
        hoverAnimation: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: utils.rgbaColor(utils.getColor('primary'), 0.2)
            }, {
              offset: 1,
              color: utils.rgbaColor(utils.getColor('primary'), 0)
            }]
          }
        }
      }, {
        name: 'previousYear',
        type: 'line',
        data: [110, 30, 40, 50, 80, 70, 50, 40, 110, 90, 60, 60],
        lineStyle: {
          color: utils.rgbaColor(utils.getColor('warning'), 0.3)
        },
        itemStyle: {
          borderColor: utils.rgbaColor(utils.getColor('warning'), 0.6),
          borderWidth: 2
        },
        symbol: 'circle',
        symbolSize: 10,
        hoverAnimation: true
      }],
      grid: {
        right: '18px',
        left: '40px',
        bottom: '15%',
        top: '5%'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
    totalSalesLastMonth.addEventListener('click', () => {
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'lastMonth'
      });
    });
    totalSalesPreviousYear.addEventListener('click', () => {
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'previousYear'
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                             Echarts Total Sales                            */
/* -------------------------------------------------------------------------- */

const totalSalesInit = () => {
  const ECHART_LINE_TOTAL_SALES = '.echart-line-total-sales';
  const SELECT_MONTH = '.select-month';
  const $echartsLineTotalSales = document.querySelector(ECHART_LINE_TOTAL_SALES);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function getFormatter(params) {
    const {
      name,
      value
    } = params[0];
    const date = new Date(name);
    return `${months[0]} ${date.getDate()}, ${value}`;
  }
  if ($echartsLineTotalSales) {
    // Get options from data attribute
    const userOptions = utils.getData($echartsLineTotalSales, 'options');
    const chart = window.echarts.init($echartsLineTotalSales);
    const monthsnumber = [[60, 80, 60, 80, 65, 130, 120, 100, 30, 40, 30, 70], [100, 70, 80, 50, 120, 100, 130, 140, 90, 100, 40, 50], [80, 50, 60, 40, 60, 120, 100, 130, 60, 80, 50, 60], [70, 80, 100, 70, 90, 60, 80, 130, 40, 60, 50, 80], [90, 40, 80, 80, 100, 140, 100, 130, 90, 60, 70, 50], [80, 60, 80, 60, 40, 100, 120, 100, 30, 40, 30, 70], [20, 40, 20, 50, 70, 60, 110, 80, 90, 30, 50, 50], [60, 70, 30, 40, 80, 140, 80, 140, 120, 130, 100, 110], [90, 90, 40, 60, 40, 110, 90, 110, 60, 80, 60, 70], [50, 80, 50, 80, 50, 80, 120, 80, 50, 120, 110, 110], [60, 90, 60, 70, 40, 70, 100, 140, 30, 40, 30, 70], [20, 40, 20, 50, 30, 80, 120, 100, 30, 40, 30, 70]];
    const getDefaultOptions = () => ({
      color: utils.getGrays()['100'],
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        formatter(params) {
          return getFormatter(params);
        },
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        }
      },
      xAxis: {
        type: 'category',
        data: ['2019-01-05', '2019-01-06', '2019-01-07', '2019-01-08', '2019-01-09', '2019-01-10', '2019-01-11', '2019-01-12', '2019-01-13', '2019-01-14', '2019-01-15', '2019-01-16'],
        boundaryGap: false,
        axisPointer: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            // color: utils.getGrays()['300'],
            color: utils.rgbaColor('#000', 0.01),
            type: 'dashed'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['400'],
          formatter: value => {
            const date = new Date(value);
            return `${months[date.getMonth()]} ${date.getDate()}`;
          },
          margin: 15
        }
      },
      yAxis: {
        type: 'value',
        axisPointer: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        },
        boundaryGap: false,
        axisLabel: {
          show: true,
          color: utils.getGrays()['400'],
          margin: 15
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      series: [{
        type: 'line',
        data: monthsnumber[0],
        lineStyle: {
          color: utils.getColors().primary
        },
        itemStyle: {
          borderColor: utils.getColors().primary,
          borderWidth: 2
        },
        symbol: 'circle',
        symbolSize: 10,
        smooth: false,
        hoverAnimation: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: utils.rgbaColor(utils.getColors().primary, 0.2)
            }, {
              offset: 1,
              color: utils.rgbaColor(utils.getColors().primary, 0)
            }]
          }
        }
      }],
      grid: {
        right: '28px',
        left: '40px',
        bottom: '15%',
        top: '5%'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);

    // Change chart options accordiong to the selected month
    const monthSelect = document.querySelector(SELECT_MONTH);
    if (monthSelect) {
      monthSelect.addEventListener('change', e => {
        const month = e.currentTarget.value;
        const data = monthsnumber[month];
        chart.setOption({
          tooltip: {
            formatter: params => {
              const {
                name,
                value
              } = params[0];
              const date = new Date(name);
              return `${months[month]} ${date.getDate()}, ${value}`;
            }
          },
          xAxis: {
            axisLabel: {
              formatter: value => {
                const date = new Date(value);
                return `${months[month]} ${date.getDate()}`;
              },
              margin: 15
            }
          },
          series: [{
            data
          }]
        });
      });
    }
  }
};

/* -------------------------------------------------------------------------- */
/*                                Traffic Channels                           */
/* -------------------------------------------------------------------------- */

const trafficChannelChartInit = () => {
  const $trafficChannels = document.querySelector('.echart-traffic-channels');
  if ($trafficChannels) {
    const userOptions = utils.getData($trafficChannels, 'options');
    const chart = window.echarts.init($trafficChannels);
    const getDefaultOptions = () => ({
      color: [utils.getColors().primary, utils.rgbaColor(utils.getColors().primary, 0.8), utils.rgbaColor(utils.getColors().primary, 0.6), utils.rgbaColor(utils.getColors().primary, 0.4), utils.rgbaColor(utils.getColors().primary, 0.2)],
      legend: {
        data: ['Display', 'Direct', 'Organic Search', 'Paid Search', 'Other'],
        left: 5,
        // bottom: 10,
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 0,
        icon: 'circle',
        inactiveColor: utils.getGrays()['400'],
        textStyle: {
          color: utils.getGrays()['700']
        },
        itemGap: 20
      },
      xAxis: {
        type: 'category',
        data: utils.getPastDates(7).map(date => window.dayjs(date).format('DD MMM, YYYY')),
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['200']
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['600'],
          formatter: value => window.dayjs(value).format('ddd')
        }
      },
      yAxis: {
        type: 'value',
        position: 'right',
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['200']
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          color: utils.getGrays()['600'],
          margin: 15
        }
      },
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        axisPointer: {
          type: 'none'
        },
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        },
        formatter: tooltipFormatter
      },
      series: [{
        name: 'Display',
        type: 'bar',
        stack: 'total',
        data: [320, 302, 301, 334, 390, 330, 320]
      }, {
        name: 'Direct',
        type: 'bar',
        stack: 'total',
        data: [120, 132, 101, 134, 90, 230, 210]
      }, {
        name: 'Organic Search',
        type: 'bar',
        stack: 'total',
        data: [220, 182, 191, 234, 290, 330, 310]
      }, {
        name: 'Paid Search',
        type: 'bar',
        stack: 'total',
        data: [150, 212, 201, 154, 190, 330, 410]
      }, {
        name: 'Other',
        type: 'bar',
        stack: 'total',
        data: [820, 832, 901, 934, 1290, 1330, 1320],
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0]
        }
      }],
      grid: {
        right: '50px',
        left: '0px',
        bottom: '10%',
        top: '15%'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};
const echartsUnresolvedTicketsInit = () => {
  const $unresolvedTickets = document.querySelector('.echart-unresolved-tickets');
  if ($unresolvedTickets) {
    const userOptions = utils.getData($unresolvedTickets, 'options');
    const chart = window.echarts.init($unresolvedTickets);
    const unresolvedTicketsLegend = document.querySelectorAll("[data-unresolved-tickets]");
    let xAxisData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let data1 = [20, 18, 15, 20, 12, 15, 10];
    let data2 = [30, 20, 20, 25, 20, 15, 10];
    let data3 = [35, 32, 40, 50, 30, 25, 15];
    let data4 = [15, 25, 20, 18, 10, 15, 25];
    const emphasisStyle = {
      itemStyle: {
        shadowColor: utils.rgbaColor(utils.getColor('dark'), 0.3)
      }
    };
    const getDefaultOptions = () => ({
      color: [utils.getColor('primary'), utils.getColor('info'), localStorage.getItem('theme') === 'dark' ? '#229BD2' : '#73D3FE', localStorage.getItem('theme') === 'dark' ? '#195979' : '#A9E4FF'],
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['900']
        },
        borderWidth: 1,
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        }
      },
      legend: {
        data: ['Urgent', 'High', 'Medium', 'Low'],
        show: false
      },
      xAxis: {
        data: xAxisData,
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['600'],
          margin: 8
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: "dashed"
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: "dashed"
          }
        },
        axisLabel: {
          color: utils.getGrays()['600']
        },
        position: "right"
      },
      series: [{
        name: 'Urgent',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle,
        data: data1
      }, {
        name: 'High',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle,
        data: data2
      }, {
        name: 'Medium',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle,
        data: data3
      }, {
        name: 'Low',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle,
        data: data4,
        itemStyle: {
          borderRadius: [2, 2, 0, 0]
        }
      }],
      barWidth: "15px",
      grid: {
        top: '8%',
        bottom: 10,
        left: 0,
        right: 2,
        containLabel: true
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
    unresolvedTicketsLegend.forEach(el => {
      el.addEventListener('change', () => {
        chart.dispatchAction({
          type: 'legendToggleSelect',
          name: utils.getData(el, 'unresolved-tickets')
        });
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                User By Location Map                      */
/* -------------------------------------------------------------------------- */

const userByLocationInit = () => {
  const $userByLocationMap = document.querySelector('.echart-user-by-location-map');
  const data = [{
    name: 'Afghanistan',
    value: 28397
  }, {
    name: 'Angola',
    value: 19549
  }, {
    name: 'Albania',
    value: 3150
  }, {
    name: 'United Arab Emirates',
    value: 8441
  }, {
    name: 'Argentina',
    value: 40374
  }, {
    name: 'Armenia',
    value: 2963
  }, {
    name: 'French Southern and Antarctic Lands',
    value: 268
  }, {
    name: 'Australia',
    value: 22404
  }, {
    name: 'Austria',
    value: 8401
  }, {
    name: 'Azerbaijan',
    value: 9094
  }, {
    name: 'Burundi',
    value: 9232
  }, {
    name: 'Belgium',
    value: 10941
  }, {
    name: 'Benin',
    value: 9509
  }, {
    name: 'Burkina Faso',
    value: 15540
  }, {
    name: 'Bangladesh',
    value: 151125
  }, {
    name: 'Bulgaria',
    value: 7389
  }, {
    name: 'The Bahamas',
    value: 66402
  }, {
    name: 'Bosnia and Herzegovina',
    value: 3845
  }, {
    name: 'Belarus',
    value: 9491
  }, {
    name: 'Belize',
    value: 308
  }, {
    name: 'Bermuda',
    value: 64
  }, {
    name: 'Bolivia',
    value: 716
  }, {
    name: 'Brazil',
    value: 195210
  }, {
    name: 'Brunei',
    value: 27
  }, {
    name: 'Bhutan',
    value: 716
  }, {
    name: 'Botswana',
    value: 1969
  }, {
    name: 'Central African Rep.',
    value: 4349
  }, {
    name: 'Canada',
    value: 34126
  }, {
    name: 'Switzerland',
    value: 7830
  }, {
    name: 'Chile',
    value: 17150
  }, {
    name: 'China',
    value: 1359821
  }, {
    name: "Côte d'Ivoire",
    value: 60508
  }, {
    name: 'Cameroon',
    value: 20624
  }, {
    name: 'Dem. Rep. Congo',
    value: 62191
  }, {
    name: 'Congo',
    value: 3573
  }, {
    name: 'Colombia',
    value: 46444
  }, {
    name: 'Costa Rica',
    value: 4669
  }, {
    name: 'Cuba',
    value: 11281
  }, {
    name: 'Northern Cyprus',
    value: 1
  }, {
    name: 'Cyprus',
    value: 1103
  }, {
    name: 'Czech Republic',
    value: 10553
  }, {
    name: 'Germany',
    value: 83017
  }, {
    name: 'Djibouti',
    value: 834
  }, {
    name: 'Denmark',
    value: 5550
  }, {
    name: 'Dominican Republic',
    value: 10016
  }, {
    name: 'Algeria',
    value: 37062
  }, {
    name: 'Ecuador',
    value: 15001
  }, {
    name: 'Egypt',
    value: 78075
  }, {
    name: 'Eritrea',
    value: 5741
  }, {
    name: 'Spain',
    value: 46182
  }, {
    name: 'Estonia',
    value: 1298
  }, {
    name: 'Ethiopia',
    value: 87095
  }, {
    name: 'Finland',
    value: 5367
  }, {
    name: 'Fiji',
    value: 860
  }, {
    name: 'Falkland Islands',
    value: 49
  }, {
    name: 'France',
    value: 63230
  }, {
    name: 'Gabon',
    value: 1556
  }, {
    name: 'United Kingdom',
    value: 62066
  }, {
    name: 'Georgia',
    value: 4388
  }, {
    name: 'Ghana',
    value: 24262
  }, {
    name: 'Eq. Guinea',
    value: 10876
  }, {
    name: 'Guinea',
    value: 10876
  }, {
    name: 'Gambia',
    value: 1680
  }, {
    name: 'Guinea Bissau',
    value: 10876
  }, {
    name: 'Equatorial Guinea',
    value: 696
  }, {
    name: 'Greece',
    value: 11109
  }, {
    name: 'Greenland',
    value: 56
  }, {
    name: 'Guatemala',
    value: 14341
  }, {
    name: 'French Guiana',
    value: 231
  }, {
    name: 'Guyana',
    value: 786
  }, {
    name: 'Honduras',
    value: 7621
  }, {
    name: 'Croatia',
    value: 4338
  }, {
    name: 'Haiti',
    value: 9896
  }, {
    name: 'Hungary',
    value: 10014
  }, {
    name: 'Indonesia',
    value: 240676
  }, {
    name: 'India',
    value: 1205624
  }, {
    name: 'Ireland',
    value: 4467
  }, {
    name: 'Iran',
    value: 240676
  }, {
    name: 'Iraq',
    value: 30962
  }, {
    name: 'Iceland',
    value: 318
  }, {
    name: 'Israel',
    value: 7420
  }, {
    name: 'Italy',
    value: 60508
  }, {
    name: 'Jamaica',
    value: 2741
  }, {
    name: 'Jordan',
    value: 6454
  }, {
    name: 'Japan',
    value: 127352
  }, {
    name: 'Kazakhstan',
    value: 15921
  }, {
    name: 'Kenya',
    value: 40909
  }, {
    name: 'Kyrgyzstan',
    value: 5334
  }, {
    name: 'Cambodia',
    value: 14364
  }, {
    name: 'South Korea',
    value: 51452
  }, {
    name: 'Kosovo',
    value: 97
  }, {
    name: 'Kuwait',
    value: 2991
  }, {
    name: 'Laos',
    value: 6395
  }, {
    name: 'Lebanon',
    value: 4341
  }, {
    name: 'Liberia',
    value: 3957
  }, {
    name: 'Libya',
    value: 6040
  }, {
    name: 'Sri Lanka',
    value: 20758
  }, {
    name: 'Lesotho',
    value: 2008
  }, {
    name: 'Lithuania',
    value: 3068
  }, {
    name: 'Luxembourg',
    value: 507
  }, {
    name: 'Latvia',
    value: 2090
  }, {
    name: 'Morocco',
    value: 31642
  }, {
    name: 'Moldova',
    value: 103
  }, {
    name: 'Madagascar',
    value: 21079
  }, {
    name: 'Mexico',
    value: 117886
  }, {
    name: 'Macedonia',
    value: 507
  }, {
    name: 'Mali',
    value: 13985
  }, {
    name: 'Myanmar',
    value: 51931
  }, {
    name: 'Montenegro',
    value: 620
  }, {
    name: 'Mongolia',
    value: 2712
  }, {
    name: 'Mozambique',
    value: 23967
  }, {
    name: 'Mauritania',
    value: 3609
  }, {
    name: 'Malawi',
    value: 15013
  }, {
    name: 'Malaysia',
    value: 28275
  }, {
    name: 'Namibia',
    value: 2178
  }, {
    name: 'New Caledonia',
    value: 246
  }, {
    name: 'Niger',
    value: 15893
  }, {
    name: 'Nigeria',
    value: 159707
  }, {
    name: 'Nicaragua',
    value: 5822
  }, {
    name: 'Netherlands',
    value: 16615
  }, {
    name: 'Norway',
    value: 4891
  }, {
    name: 'Nepal',
    value: 26846
  }, {
    name: 'New Zealand',
    value: 4368
  }, {
    name: 'Oman',
    value: 2802
  }, {
    name: 'Pakistan',
    value: 173149
  }, {
    name: 'Panama',
    value: 3678
  }, {
    name: 'Peru',
    value: 29262
  }, {
    name: 'Philippines',
    value: 93444
  }, {
    name: 'Papua New Guinea',
    value: 6858
  }, {
    name: 'Poland',
    value: 38198
  }, {
    name: 'Puerto Rico',
    value: 3709
  }, {
    name: 'North Korea',
    value: 1
  }, {
    name: 'Portugal',
    value: 10589
  }, {
    name: 'Paraguay',
    value: 6459
  }, {
    name: 'Qatar',
    value: 1749
  }, {
    name: 'Romania',
    value: 21861
  }, {
    name: 'Russia',
    value: 21861
  }, {
    name: 'Rwanda',
    value: 10836
  }, {
    name: 'Western Sahara',
    value: 514
  }, {
    name: 'Saudi Arabia',
    value: 27258
  }, {
    name: 'Sudan',
    value: 35652
  }, {
    name: 'S. Sudan',
    value: 9940
  }, {
    name: 'Senegal',
    value: 12950
  }, {
    name: 'Solomon Islands',
    value: 526
  }, {
    name: 'Sierra Leone',
    value: 5751
  }, {
    name: 'El Salvador',
    value: 6218
  }, {
    name: 'Somaliland',
    value: 9636
  }, {
    name: 'Somalia',
    value: 9636
  }, {
    name: 'Republic of Serbia',
    value: 3573
  }, {
    name: 'Suriname',
    value: 524
  }, {
    name: 'Slovakia',
    value: 5433
  }, {
    name: 'Slovenia',
    value: 2054
  }, {
    name: 'Sweden',
    value: 9382
  }, {
    name: 'Swaziland',
    value: 1193
  }, {
    name: 'Syria',
    value: 7830
  }, {
    name: 'Chad',
    value: 11720
  }, {
    name: 'Togo',
    value: 6306
  }, {
    name: 'Thailand',
    value: 66402
  }, {
    name: 'Tajikistan',
    value: 7627
  }, {
    name: 'Turkmenistan',
    value: 5041
  }, {
    name: 'East Timor',
    value: 10016
  }, {
    name: 'Trinidad and Tobago',
    value: 1328
  }, {
    name: 'Tunisia',
    value: 10631
  }, {
    name: 'Turkey',
    value: 72137
  }, {
    name: 'Tanzania',
    value: 44973
  }, {
    name: 'Uganda',
    value: 33987
  }, {
    name: 'Ukraine',
    value: 46050
  }, {
    name: 'Uruguay',
    value: 3371
  }, {
    name: 'United States',
    value: 2526
  }, {
    name: 'Uzbekistan',
    value: 27769
  }, {
    name: 'Venezuela',
    value: 236
  }, {
    name: 'Vietnam',
    value: 89047
  }, {
    name: 'Vanuatu',
    value: 236
  }, {
    name: 'West Bank',
    value: 13
  }, {
    name: 'Yemen',
    value: 22763
  }, {
    name: 'South Africa',
    value: 51452
  }, {
    name: 'Zambia',
    value: 13216
  }, {
    name: 'Zimbabwe',
    value: 13076
  }];
  const maxZoomLevel = 5;
  const minZoomLevel = 1;
  if ($userByLocationMap) {
    const userOptions = utils.getData($userByLocationMap, 'options');
    const chart = window.echarts.init($userByLocationMap);
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0,
        formatter: params => `<strong>${params.data?.name} :</strong> ${params.data?.value}`
      },
      visualMap: {
        show: false,
        min: 800,
        max: 50000,
        inRange: {
          color: [utils.getColors().primary, utils.rgbaColor(utils.getColors().primary, 0.8), utils.rgbaColor(utils.getColors().primary, 0.6), utils.rgbaColor(utils.getColors().primary, 0.4), utils.rgbaColor(utils.getColors().primary, 0.2)].reverse()
        }
      },
      series: [{
        type: 'map',
        map: 'world',
        data,
        roam: 'move',
        scaleLimit: {
          min: minZoomLevel,
          max: maxZoomLevel
        },
        left: 0,
        right: 0,
        label: {
          show: false
        },
        itemStyle: {
          borderColor: utils.getGrays()['300']
        },
        emphasis: {
          label: {
            show: false
          },
          itemStyle: {
            areaColor: utils.getColor('warning')
          }
        }
      }]
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
    let zoomLevel = 1;
    document.querySelector('.user-by-location-map-zoom')?.addEventListener('click', () => {
      if (zoomLevel < maxZoomLevel) {
        zoomLevel += 1;
      }
      chart.setOption({
        series: {
          zoom: zoomLevel
        }
      });
    });
    document.querySelector('.user-by-location-map-zoomOut')?.addEventListener('click', () => {
      if (zoomLevel > minZoomLevel) {
        zoomLevel -= 1;
      }
      chart.setOption({
        series: {
          zoom: zoomLevel
        }
      });
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                             Echarts Users By Time                          */
/* -------------------------------------------------------------------------- */

const usersByTimeChartInit = () => {
  const $echartUsersByTimeChart = document.querySelector('.echart-users-by-time');
  const hours = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];
  const data = [];
  for (let i = 0; i < 24; i += 1) {
    for (let j = 0; j < 7; j += 1) {
      data.push([j, i, utils.getRandomNumber(20, 300)]);
    }
  }
  const tooltipFormatter = params => {
    return `<div>
          <p class='mb-0 text-600'>${window.dayjs(params.name).format('MMM DD, YYYY')}</p>
          <div class="d-flex align-items-center">
            <p class="mb-0 text-600">
              ${window.dayjs().hour(params.data[1]).format('hA')} : <span class='text-800 fw-semi-bold'>${params.data[2]}</span>
            </p>
          </div>
        </div>`;
  };
  if ($echartUsersByTimeChart) {
    const userOptions = utils.getData($echartUsersByTimeChart, 'options');
    const chart = window.echarts.init($echartUsersByTimeChart);
    const getDefaultOptions = () => ({
      gradientColor: [utils.getColor('info'), utils.getColor('primary')],
      tooltip: {
        position: 'top',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        formatter: tooltipFormatter
      },
      xAxis: {
        type: 'category',
        data: utils.getPastDates(7),
        splitArea: {
          show: true
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['600'],
          formatter: value => window.dayjs(value).format('ddd')
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['400']
          }
        }
      },
      yAxis: {
        position: 'right',
        type: 'category',
        inverse: true,
        data: hours,
        splitArea: {
          show: true
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: utils.getGrays()['600'],
          margin: 20,
          padding: [10, 0, 0, 0]
        },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['400']
          }
        }
      },
      visualMap: {
        type: 'piecewise',
        orient: 'horizontal',
        left: 'left',
        bottom: '3%',
        itemSymbol: 'diamond',
        itemWidth: '10px',
        itemHeight: '10px',
        min: 20,
        max: 300,
        splitNumber: 4,
        textGap: 5,
        textStyle: {
          color: utils.getGrays()['600'],
          fontWeight: 500
        }
      },
      series: [{
        name: 'Users By Time',
        type: 'heatmap',
        data: data,
        label: {
          show: false
        },
        itemStyle: {
          borderColor: utils.getGrays()['100'],
          borderWidth: 3
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 3,
            shadowColor: utils.rgbaColor(utils.getColors()['emphasis'], 0.5)
          }
        }
      }],
      grid: {
        right: '60px',
        left: '0px',
        bottom: '20%',
        top: '0%'
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                            Bandwidth Saved                                 */
/* -------------------------------------------------------------------------- */

const weeklyGoalsInit = () => {
  const $echartsBandwidthSaved = document.querySelector('.echart-weekly-goals-lms');
  if ($echartsBandwidthSaved) {
    const userOptions = utils.getData($echartsBandwidthSaved, 'options');
    const chart = window.echarts.init($echartsBandwidthSaved);
    const getDefaultOptions = () => ({
      series: [{
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        radius: '85%',
        pointer: {
          show: false
        },
        center: ['50%', '50%'],
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: utils.getColor('info')
          }
        },
        axisLine: {
          lineStyle: {
            width: 8,
            color: [[1, utils.getColor('gray-200')]]
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        data: [79],
        detail: {
          show: false
        },
        animationDuration: 2000
      }, {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        radius: '70%',
        pointer: {
          show: false
        },
        center: ['50%', '50%'],
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: utils.getColor('primary')
          }
        },
        axisLine: {
          lineStyle: {
            width: 8,
            color: [[1, utils.getColor('gray-200')]]
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        data: [85],
        detail: {
          show: false
        },
        animationDuration: 2000
      }, {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        radius: '55%',
        pointer: {
          show: false
        },
        center: ['50%', '50%'],
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: utils.getColor('success')
          }
        },
        axisLine: {
          lineStyle: {
            width: 8,
            color: [[1, utils.getColor('gray-200')]]
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        data: [70],
        detail: {
          show: false
        },
        animationDuration: 2000
      }]
    });
    const initChart = () => {
      if (utils.isScrolledIntoView($echartsBandwidthSaved)) {
        echartSetOption(chart, userOptions, getDefaultOptions);
        window.removeEventListener('scroll', initChart);
      }
    };
    window.addEventListener('scroll', initChart);
  }
};

/* eslint-disable */

/* -------------------------------------------------------------------------- */
/*                                Weekly Sales                                */
/* -------------------------------------------------------------------------- */

const weeklySalesInit = () => {
  const ECHART_BAR_WEEKLY_SALES = '.echart-bar-weekly-sales';
  const $echartBarWeeklySales = document.querySelector(ECHART_BAR_WEEKLY_SALES);
  if ($echartBarWeeklySales) {
    // Get options from data attribute
    const userOptions = utils.getData($echartBarWeeklySales, 'options');
    const data = [120, 200, 150, 80, 70, 110, 120];

    // Max value of data
    const yMax = Math.max(...data);

    // const dataBackground = data.map(() => yMax);
    const chart = window.echarts.init($echartBarWeeklySales);

    // Default options
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        formatter: '{b0} : {c0}',
        transitionDuration: 0,
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        }
      },
      xAxis: {
        type: 'category',
        data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        boundaryGap: false,
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisPointer: {
          type: 'none'
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisPointer: {
          type: 'none'
        }
      },
      series: [{
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          borderRadius: 10
        },
        barWidth: '5px',
        itemStyle: {
          barBorderRadius: 10,
          color: utils.getColors().primary
        },
        data,
        z: 10,
        emphasis: {
          itemStyle: {
            color: utils.getColors().primary
          }
        }
      }],
      grid: {
        right: 5,
        left: 10,
        top: 0,
        bottom: 0
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                            Theme Initialization                            */
/* -------------------------------------------------------------------------- */
docReady(detectorInit);
docReady(handleNavbarVerticalCollapsed);
docReady(totalOrderInit);
docReady(weeklySalesInit);
docReady(marketShareInit);
docReady(totalSalesInit);
docReady(topProductsInit);
docReady(navbarTopDropShadow);
docReady(tooltipInit);
docReady(popoverInit);
docReady(toastInit);
docReady(progressAnimationToggle);
docReady(glightboxInit);
docReady(plyrInit);
docReady(initMap);
docReady(dropzoneInit);
docReady(choicesInit);
docReady(formValidationInit);
docReady(barChartInit);
docReady(leafletActiveUserInit);
docReady(countupInit);
docReady(copyLink);
docReady(navbarDarkenOnScroll);
docReady(typedTextInit);
docReady(tinymceInit);
docReady(chatInit);
docReady(quantityInit);
docReady(navbarComboInit);
docReady(swiperInit);
docReady(ratingInit);
docReady(draggableInit);
docReady(kanbanInit);
docReady(fullCalendarInit);
docReady(appCalendarInit);
docReady(managementCalendarInit);
docReady(lottieInit);
docReady(wizardInit);
docReady(searchInit);
docReady(cookieNoticeInit);
docReady(themeControl);
docReady(dropdownOnHover);
docReady(marketShareEcommerceInit);
docReady(productShareDoughnutInit);
docReady(totalSalesEcommerce);
docReady(avgEnrollmentRateInit);
docReady(bandwidthSavedInit);
docReady(salesByPosLocationInit);
docReady(returningCustomerRateInit);
docReady(candleChartInit);
docReady(grossRevenueChartInit);
docReady(scrollbarInit);
docReady(iconCopiedInit);
docReady(reportForThisWeekInit);
docReady(basicEchartsInit);
docReady(chartScatter);
docReady(chartDoughnut);
docReady(chartPie);
docReady(chartPolar);
docReady(chartRadar);
docReady(chartCombo);
docReady(dropdownMenuInit);
docReady(audienceChartInit);
docReady(sessionByBrowserChartInit);
docReady(sessionByCountryChartInit);
docReady(activeUsersChartReportInit);
docReady(trafficChannelChartInit);
docReady(bounceRateChartInit);
docReady(usersByTimeChartInit);
docReady(sessionByCountryMapInit);
docReady(mostLeadsInit);
docReady(closedVsGoalInit);
docReady(leadConversionInit);
docReady(dealStorageFunnelInit);
docReady(revenueChartInit);
docReady(locationBySessionInit);
docReady(realTimeUsersChartInit);
docReady(linePaymentChartInit);
docReady(chartBubble);
docReady(chartLine);
docReady(treeviewInit);
docReady(scrollInit);
docReady(echartsUnresolvedTicketsInit);
docReady(echartsNumberOfTicketsInit);
docReady(echartsCustomerSatisfactionInit);
docReady(echartsDistributionOfPerformanceInit);
docReady(echartsSatisfactionSurveyInit);
docReady(echartsReceivedTicketsInit);
docReady(topCustomersChartInit);
docReady(ticketVolumeChartInit);
docReady(echartTicketPriority);
docReady(userByLocationInit);
docReady(courseEnrollmentsInit);
docReady(weeklyGoalsInit);
docReady(assignmentScoresInit);
docReady(browsedCoursesInit);
docReady(courseStatusInit);
docReady(bottomBarInit);
docReady(marketingExpensesInit);
docReady(chartHalfDoughnutInit);
docReady(trendingKeywordsInit);
docReady(D3PackedBubbleInit);
docReady(dataTablesInit);
docReady(select2Init);
docReady(hideOnCollapseInit);
docReady(unresolvedTicketsTabInit);
docReady(inputmaskInit);
docReady(picmoInit);
docReady(nouisliderInit);
docReady(bulkSelectInit);
docReady(advanceAjaxTableInit);
docReady(listInit);
//# sourceMappingURL=theme.js.map
