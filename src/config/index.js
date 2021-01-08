/**
 * @description 系统全局配置
 */
export default {
    /**
     * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
     */
    tokenCookieExpires: 3,
    /**
     * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天
     */
    passCookieExpires: 3,
    /**
     * @description 此处修改网站名称
     */
    webName: 'Jboost后台管理系统',
    /**
     * @description 是否只保持一个子菜单的展开
     */
    uniqueOpened: true,
    /**
     * @description token key
     */
    TokenKey: 'EL-ADMIN-TOEKN',
    
    /**
     * @description 请求超时时间，毫秒（默认2分钟）
     */
    timeout: 1200000,
    
    /**
     * @description 是否显示 tagsView
     */
    tagsView: true,
    
    /**
     * @description 固定头部
     */
    fixedHeader: false,
    
    /**
     * @description 是否显示logo
     */
    sidebarLogo: true,
    
    /**
     * 是否显示设置的悬浮按钮
     */
    settingBtn: true,
    
    /**
     * 是否显示设置的底部信息
     */
    showFooter: false,
    
    /**
     * 底部文字，支持html语法
     */
    footerTxt: '<div>\n' +
    '      <p>@版权所有v_1.0.0</p>\n' +
    '      <p>地址：湖南省长沙市 <br class="br"> blog.jboost.cn </p>\n' +
    '    </div>',
    
    /**
     * 备案号
     */
    caseNumber: '湘ICP备xxxx号'
}
