module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    // 'plugin:vue/recommended',
  ],
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'vue/no-unused-vars': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  globals: {
    "console": true,
    "Vue": true,
    "document": true,
    "navigator": true,
    "location": true,
    "window": true,
    "WeixinJSBridge": true,
    "AlipayJSBridge": true,
    "wx": true,
    "_czc": true,
    "node": true
  }
};
