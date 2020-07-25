<template>
  <div class="app-container">
    <el-row type="flex" justify="space-between">
      <div>
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="search" placeholder="请输入账户名或者用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button type="primary" @click="add">新建用户</el-button>
      </div>
    </el-row>
    <el-row type="flex" justify="start">
      <el-col :span="24">
        <el-table :data="userData" border v-loading="tableLoading">
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
                       :page-size="pageSize"
                       :current-page.sync="currentPage"
                       @current-change="toPage"
                       :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%" @close="resetForm">
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
  import {checkAccount, add, page, getByUserId, update, getAllRole} from "@/api/user";
  import axios from 'axios'

  export default {
    name: 'SystemUser',
    created() {
      this.page(1, "")
    },
    data() {
      return {
        search: "",
        currentPage: 1,
        total: 0,
        pageSize: 0,

        dialogVisible: false,
        tableLoading: false,
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
          password: [{
            validator: (rule, value, callback) => {
              if (this.showUser.userId == '') {
                if (/[a-zA-Z1-9]{6,10}/.test(value) == false) {
                  callback(new Error("密码必须是6至10位字符或者数字"));
                } else {
                  callback()
                }
              } else {
                if (value.trim() != '') {
                  if (/[a-zA-Z1-9]{6,10}/.test(value) == false) {
                    callback(new Error("密码必须是6至10位字符或者数字"));
                  } else {
                    callback()
                  }
                } else {
                  callback()
                }
              }
            }, trigger: 'blur'

          }]
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
        userData: [],
        rolesList: []
      }
    },
    methods: {
      add() {
        this.showUser.userId = ""
        getAllRole().then(data => {
          let roleList = []
          data.object.forEach(r => {
            roleList.push({id: r.id, name: r.nameZh})
          })
          this.rolesList = roleList
          this.dialogVisible = true
        })

      },
      edit(user) {
        this.showUser.userId = user.id
        axios.all([getAllRole(), getByUserId(this.showUser.userId)]).then(axios.spread((v1, v2) => {
          let roleList = []
          v1.object.forEach(r => {
            roleList.push({id: r.id, name: r.nameZh})
          })
          this.rolesList = roleList
          this.dialogVisible = true

          let user = v2.object
          this.showUser.userId = user.id
          this.showUser.account = user.account
          this.showUser.username = user.username
          this.showUser.password = ''
          this.showUser.phone = user.telephone
          this.showUser.available = user.usable
          let userRoleList = []
          user.roleList.forEach(r => {
            userRoleList.push(r.id)
          })
          this.showUser.rolesList = userRoleList

          this.dialogVisible = true
        }))

      },
      resetForm() {
        this.$refs.form.resetFields()
        this.showUser.rolesList = []
      },
      submit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.showUser.userId == "") {
              add(this.showUser).then((data) => {
                this.$message.success(data.msg)
                this.dialogVisible = false
                this.page(1, "")
              })
            } else {
              update(this.showUser.userId, this.showUser).then(data => {
                this.$message.success(data.msg)
                this.dialogVisible = false
                this.page(1, "")
              })
            }
          }
        })
      },
      page(currentPage, search) {
        this.tableLoading = true
        page({name: search, currentPage: currentPage}).then(data => {
          let tableData = []
          data.data.forEach(u => {
            let roles = ""
            u.roleList.forEach(r => {
              roles += r.nameZh + " "
            })
            tableData.push({
              id: u.id,
              account: u.account,
              username: u.username,
              role: roles
            })
          })
          this.userData = tableData
          this.currentPage = currentPage
          this.search = search
          this.total = data.total
          this.pageSize = data.pageSize
          this.tableLoading = false
        })
      },
      toPage(currentPage) {
        this.page(currentPage, this.search)
      },
      find() {
        this.page(1, this.search)
      }

    }
  }
</script>

<style scoped>

</style>
