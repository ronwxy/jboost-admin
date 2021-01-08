import {initData} from '@/api/data'

export default {
  data() {
    return {
      loading: true, data: [], current: 1, size: 10, total: 0, url: '', params: {}, query: {}, time: 170, isAdd: false
    }
  },
  methods: {
    async init() {
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loading = true;
        initData(this.url, this.params).then(res => {
          if (res.data.total !== undefined) {
            this.total = res.data.total;
            this.data = res.data.records;
          } else if (res.totalElements !== undefined) {
            this.total = res.totalElements;
            this.data = res.content || res.data;
          } else {
            this.data = res.data;
            this.total = res.length;
          }
          setTimeout(() => {
            this.loading = false;
          }, this.time);
          resolve(res);
        }).catch(err => {
          this.loading = false;
          reject(err);
        })
      })
    },
    beforeInit() {
      return true;
    },
    currentChange(e) {
      this.current = e;
      this.init();
    },
    sizeChange(e) {
      this.current = 1;
      this.size = e;
      this.init();
    },
    // 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
    dleChangecurrent(size) {
      if (size === undefined) {
        size = 1;
      }
      if (this.data.length === size && this.current !== 1) {
        this.current = this.current - 1;
      }
    },
    toQuery() {
      this.current = 1;
      this.init();
    },
    clearQuery() {
      let query = this.query;
      Object.keys(query).forEach((key) => {
        query[key] = '';
      });
      this.current = 1;
      this.beforeClear && this.beforeClear();
      this.init();
    }
  }
}
