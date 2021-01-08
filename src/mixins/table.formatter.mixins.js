import initDict from '@/mixins/initDict';
import {parseTime} from '@/utils/index';

export default {
  mixins: [initDict],
  created: async function () {
    await this.getDictMap('sex,patient_type,news_type,job_title,servant_type');
  },
  methods: {
    _getLabel: function (mapKey, value, defaults = '') {
      let item = this.dictMap[mapKey].find((item) => {
        return item.value === value;
      });
      return item ? item.label : defaults;
    },
    indexFormatter: function (row, column, cellValue, index) {
      return index + 1;
    },
    timestampFormatter: function (row, column, cellValue, index) {
      return parseTime(cellValue);
    },
    sexFormatter: function (row, column, cellValue, index) {
      return this._getLabel('sex', cellValue);
    },
    htmlFormatter: function (row, column, cellValue, index) {
      let div = document.createElement('div');
      div.innerHTML = cellValue;
      let text = div.innerText.trim();
      return (text.length > 30 ? text.slice(0, 40) + '...' : text);
    },
    patientTypeFormatter: function (row, column, cellValue, index) {
      return this._getLabel('patient_type', cellValue);
    },
    jobTitleFormatter: function (row, column, cellValue, index) {
      return this._getLabel('job_title', cellValue);
    },
    deptFormatter: function (row, column, cellValue, index) {
      return row.deptSecond ? [row.deptFirst, row.deptSecond].join(' / ') : (row.deptFirst || '');
    },
    newsTypeFormatter: function (row, column, cellValue, index) {
      return this._getLabel('news_type', cellValue);
    },
    serviceFormatter: function (row, column, cellValue, index) {
      return this._getLabel('servant_type', cellValue);
    },
    birthdayFormatter: function (row, column, cellValue, index) {
      return cellValue;
    },
    regionFormatter: function (row, column, cellValue, index) {
      return (cellValue || '').split(',').join('');
    }
  }
}
