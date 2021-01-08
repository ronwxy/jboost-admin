import {address} from '@/api/listAddress';

export default {
    data() {
        return {
            serviceCityValue: ['湖北省', '武汉市'],
            serviceKeyValue: {
                value: 'name',
                label: 'name',
                lazy: true,
                lazyLoad(node, resolve) {
                    const data = node.data || {};
                    const code = data.code;
                    const level = node.level;
                    address(code).then((result) => {
                      let data= result.data;
                        data.forEach((item) => {
                            item.leaf = level >= 2;
                        });
                        resolve(data);
                    });
                }
            },
            serviceCityData: [],
            form: {region: ''}
        }
    },
    mixins: [],
    watch: {
        serviceCityValue: function (to) {
            try {
                this.form.serviceProvince = to[0];
                this.form.serviceCity = to[1];
                this.form.serviceArea = to[2];
            } catch (e) {}
        }
    },
    methods: {
        addAreaChange(value) {},
    }
}


