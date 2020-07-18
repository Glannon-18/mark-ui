<template>
  <div class="app-container">
    <el-row type="flex" justify="space-between">
      <el-col :span="8">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="search" placeholder="请输入账户名或者用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="dialogVisible=true">新建用户</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="start">
      <el-col :span="20">
        <el-table :data="userData" border>
          <el-table-column prop="account" label="账号">
          </el-table-column>
          <el-table-column prop="username" label="用户名">
          </el-table-column>
          <el-table-column prop="role" label="角色">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination style="margin-top: 20px"
                       background
                       layout="prev, pager, next"
                       :total="1000">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
      <el-row type="flex" justify="center">
        <el-col :span="18">
          <el-form label-width="80px">
            <el-form-item label="账户名">
              <el-input v-model="showUser.account"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="showUser.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="showUser.password"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="showUser.phone"></el-input>
            </el-form-item>
            <el-form-item label="是否可用">
              <el-radio-group v-model="showUser.available">
                <el-radio :label="true">可用</el-radio>
                <el-radio :label="false">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="角色">
              <el-checkbox-group v-model="showUser.rolesList">
                <el-checkbox v-for="r in rolesList" :key="r.id" :label="r.id">{{r.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>

        </el-col>

      </el-row>

      <div slot="footer">
        <el-button type="primary">确 定</el-button>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: 'SystemUser',
    data() {
      return {
        search: "",
        dialogVisible: false,
        showUser: {
          account: "",
          username: "",
          password:"",
          phone: "",
          available: true,
          rolesList: []
        },
        userData: [
          {
            id: 1,
            account: "aaaa",
            username: "eeee",
            role: "管理员"
          }, {
            id: 2,
            account: "aaaa",
            username: "eeee",
            role: "管理员"
          }, {
            id: 3,
            account: "aaaa",
            username: "eeee",
            role: "管理员"
          }
        ],
        rolesList: [
          {
            id: 1,
            name: "dsd"
          },
          {
            id: 2,
            name: "rr"
          },
          {
            id: 3,
            name: "tt"
          },
        ]
      }
    },
    methods: {
      edit(user) {
        console.log(user)
      }
    }
  }
</script>

<style scoped>

</style>
