<template>
  <el-menu-item class="logo-menu-item" v-if="sidebarLogo" :class="{'submenu-title-noDropdown':isCollapse}" index="0"
                style="pointer-events: none;">
    <!-- 缩小时显示的logo，可以自定义，这里直接使用图标库中的 -->
    <!--    <svg-icon icon-class="run"/>-->
    <img class="small-logo" v-if="isCollapse" :src="logoSmallImg">
    <!--正常状态下显示的，可以使用本地的logoImg-->
    <div class="logo-con" v-else>
      <img :src="logoImg">
    </div>
  </el-menu-item>
</template>

<script>
  import logoImg from '@/assets/logo/logo.png'
  import logoSmallImg from '@/assets/logo/logo-small.png'
  import {mapState} from 'vuex'

  export default {
    name: 'Logo',
    props: {
      isCollapse: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        logoImg: logoImg,
        logoSmallImg: logoSmallImg
      }
    },
    computed: {
      ...mapState({
        sidebarLogo: state => state.settings.sidebarLogo
      })
    }
  }
</script>

<style lang="scss" scoped>
  .logo-menu-item {
    position: relative;
  }

  .small-logo {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 5px;
    top: 20px;
  }
</style>
