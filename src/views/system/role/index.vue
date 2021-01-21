<template>
  <div class="app-container">
    <!--表单组件-->
    <eForm ref="form" :is-add="isAdd"/>
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-input v-model="query.value" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">{{$t('op.query')}}</el-button>
      <!-- 新增 -->
      <div style="display: inline-block;margin: 0px 2px;">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="add">{{$t('op.add')}}</el-button>
      </div>
    </div>
    <el-row :gutter="15">
      <!--角色管理-->
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">{{$t('role.list')}}</span>
          </div>
          <el-table v-loading="loading" :data="data" highlight-current-row size="small" style="width: 100%;" @current-change="handleCurrentChange">
            <el-table-column prop="name" :label="$t('role.name')"/>
            <el-table-column :show-overflow-tooltip="true" prop="remark" :label="$t('role.desc')"/>
            <el-table-column :show-overflow-tooltip="true" prop="createTime" :label="$t('common.create_time')">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('op.op')" width="250px" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)">{{$t('op.edit')}}</el-button>
                <el-popover
                  :ref="scope.row.id"
                  placement="top"
                  width="180">
                  <p>{{$t("isDelData")}}</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">{{$t('cancel')}}</el-button>
                    <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                  </div>
                  <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">{{$t('op.delete')}}</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <el-pagination
            :total="total"
            :current-page="current"
            style="margin-top: 8px;"
            layout="total, prev, pager, next, sizes"
            @size-change="sizeChange"
            @current-change="currentChange"/>
        </el-card>
      </el-col>
      <!-- 授权 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">{{$t('role.menus')}}</span>
            <el-button
              :disabled="!showButton"
              :loading="menuLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="saveMenu">{{$t('op.save')}}</el-button>
          </div>
          <el-tree
            ref="menu"
            :data="menus"
            :default-checked-keys="menuIds"
            :props="defaultProps"
            accordion
            show-checkbox
            node-key="id"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/role'
import { getPermissionTree } from '@/api/permission'
import { getMenusTree } from '@/api/menu'
import { parseTime } from '@/utils/index'
import eForm from './form'
import { editPermission, editMenu, get } from '@/api/role'


export default {
  components: { eForm },
  mixins: [initData],
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      currentId: 0, permissionLoading: false, menuLoading: false, showButton: false, opt: '菜单分配',
      delLoading: false, permissions: [], permissionIds: [], menus: [], menuIds: []
    }
  },
  created() {
    // this.getPermissions()
    this.getMenus()
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.$refs.menu.setCheckedKeys([]);
      this.showButton = false;
      this.url = 'role';
      const sort = 'level,asc';
      const query = this.query;
      const value = query.value;
      this.params = { current: this.current, size: this.size, sort: sort }
      if (value) { this.params['name'] = value }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
          this.dleChangecurrent();
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    // getPermissions() {
    //   getPermissionTree().then(res => {
    //     this.permissions = res
    //   })
    // },
    getMenus() {
      getMenusTree().then(res => {
        this.menus = res.data.records;
      })
    },
    handleCurrentChange(val) {
        get(val.id).then(res => {
           let resources = res.data.resources;
            // 清空权限与菜单的选中
            this.$refs.menu.setCheckedKeys([]);
            // 保存当前的角色id
            this.currentId = val.id;
            // 点击后显示按钮
            this.showButton = true;
            // 初始化
            this.menuIds = [];
            this.permissionIds = [];
            if(resources){
                // 菜单数据需要特殊处理
                resources.forEach((data, index)=> {
                    let add = true;
                    for (let i = 0; i < resources.length; i++) {
                        if (data.id === resources[i].parentId) {
                            add = false;
                            break
                        }
                    }
                    if (add) {
                        this.menuIds.push(data.id)
                    }
                });
            }

            // 处理权限数据
            // val.permissions.forEach(function(data, index) {
            //     _this.permissionIds.push(data.id)
            // })
        });
    },
    savePermission() {
      this.permissionLoading = true
      const role = { id: this.currentId, permissions: [] }
      this.$refs.permission.getCheckedKeys().forEach(function(data, index) {
        const permission = { id: data }
        role.permissions.push(permission)
      })
      editPermission(role).then(res => {
        this.$notify({
          title: '保存成功',
          type: 'success',
          duration: 2500
        })
        this.permissionLoading = false
        this.update()
      }).catch(err => {
        this.permissionLoading = false
        console.log(err.response.data.message)
      })
    },
    saveMenu() {
      this.menuLoading = true;
      const role = {resourceIds: [] ,roleId:this.currentId};
      // 得到半选的父节点数据，保存起来
      this.$refs.menu.getHalfCheckedNodes().forEach(function(data, index) {
        // const permission = { id: data.id };
        role.resourceIds.push( data.id)
      });
      // 得到已选中的 key 值
      this.$refs.menu.getCheckedKeys().forEach(function(data, index) {
        // const permission = { id: data };
        role.resourceIds.push(data)
      });
      editMenu(role).then(res => {
        this.$notify({
          title: '保存成功',
          type: 'success',
          duration: 2500
        });
        this.menuLoading = false
        this.update()
      }).catch(err => {
        this.menuLoading = false
        console.log(err.response.data.message)
      })
    },
    update() {
      // 无刷新更新 表格数据
      get(this.currentId).then(res => {
        for (let i = 0; i < this.data.length; i++) {
          if (res.id === this.data[i].id) {
            this.data[i] = res
            break
          }
        }
      })
    },
    add() {
      this.isAdd = true
      this.$refs.form.dialog = true
    },
    edit(data) {
      this.isAdd = false;
      const _this = this.$refs.form;
      _this.form = {
          name:data.name,
          remark:data.remark,
          id:data.id
      };
      _this.dialog = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .role-span {
    font-weight: bold;color: #303133;
    font-size: 15px;
  }
</style>
