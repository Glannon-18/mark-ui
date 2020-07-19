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
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%" @open="info">
      <el-row type="flex" justify="center">
        <el-col :span="18">
          <el-form label-width="80px" :rules="rules" ref="form" :model="showUser">
            <el-form-item label="账户名" prop="account">
              <el-input v-model="showUser.account"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="showUser.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="showUser.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
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
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  import {getAllRole} from "@/api/role";
  import {checkAccount, add} from "@/api/user";

  export default {
    name: 'SystemUser',
    data() {
      return {
        search: "",
        dialogVisible: false,
        rules: {
          account: [{required: true, message: '请输入账户名', trigger: 'blur'}
            , {
              validator: (rule, value, callback) => {
                checkAccount({account: value, userId: this.showUser.userId}).then(data => {
                  if (data.object == 0) {
                    callback()
                  } else {
                    callback(new Error("该账户名已经存在"))
                  }
                })
              }, trigger: 'blur'
            }
          ],
          username: [{required: true, message: '请输用户名', trigger: 'blur'}],
          phone: [{required: true, message: '请输入联系电话', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        showUser: {
          userId: "",
          account: "",
          username: "",
          password: "",
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
        rolesList: []
      }
    },
    methods: {
      edit(user) {
        console.log(user)
      },
      info() {
        if (this.showUser.userId == "") {
          this.loadUserInfo(this.showUser.userId)
        }

      },
      loadUserInfo(userId) {
        getAllRole().then(data => {
          let roleList = []
          data.object.forEach(r => {
            roleList.push({id: r.id, name: r.nameZh})
          })
          this.rolesList = roleList
        })
      },
      submit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            add(this.showUser)
          }
        })
      }

    }
  }
</script>

<style scoped>

</style>
