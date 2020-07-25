<template>
  <div class="app-container">
    <el-row type="flex" justify="space-between">
      <div>
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="search" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="find">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button type="primary" @click="open">新建角色</el-button>
      </div>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" border>
          <el-table-column prop="name" label="角色名称"></el-table-column>
          <el-table-column prop="nameZh" label="角色中文名称"></el-table-column>
          <el-table-column label="操作" width="170">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>

              <el-popconfirm
                confirmButtonText='删除'
                cancelButtonText='取消'
                icon="el-icon-info"
                iconColor="red"
                title="你确定删除这个角色？"
                @onConfirm="deleteRole(scope.row)">
                <el-button slot="reference" type="danger" size="small">删除</el-button>
              </el-popconfirm>


            </template>
          </el-table-column>
        </el-table>

        <el-pagination style="margin-top: 20px"
                       background
                       layout="prev, pager, next"
                       :page-size="pageSize"
                       :current-page.sync="currentPage"
                       @current-change="numPage"
                       :total="total">
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="角色信息" :visible.sync="dialogVisible" width="30%" @open="loadInfo" @close="reset">

      <el-row type="flex" justify="center">
        <el-col :span="18">
          <el-form label-width="100px" :rules="rules" ref="form" :model="showRole">
            <el-form-item label="角色英文名" prop="name">
              <el-input v-model="showRole.name"></el-input>
            </el-form-item>

            <el-form-item label="角色中文名" prop="nameZh">
              <el-input v-model="showRole.nameZh"></el-input>
            </el-form-item>

            <el-form-item label="角色权限">
              <el-tree :data="treeData" ref="tree" show-checkbox node-key="id" :props="pro"
                       :default-checked-keys="showRole.mid"></el-tree>
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
  import {page, getMenuTree, add, getRoleWithMenu, deleteRole} from "@/api/role";

  export default {
    name: 'SystemPermission',
    created() {
      this.toPage(1, "")
    },
    data() {
      return {
        search: "",
        pageSize: 1,
        currentPage: 1,
        total: 1,

        dialogVisible: false,
        tableData: [],
        rules: {
          name: [{required: true, message: '请输入角色英文名', trigger: 'blur'}
            ,
            {
              validator: (rule, value, callback) => {
                if (/^[a-zA-Z1-9]{3,6}$/.test(value) == false) {
                  callback(new Error("只能输入3-6位英文或者数字"))
                } else {
                  callback()
                }
              }, trigger: 'blur'
            }
          ],
          nameZh: [{required: true, message: '请输入角色名', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (/^[\u4e00-\u9fa5]{3,6}$/.test(value) == false) {
                  callback(new Error("只能输入3-6位汉字"))
                } else {
                  callback()
                }
              }, trigger: 'blur'
            }],
        },
        showRole: {
          id: "",
          name: "",
          nameZh: "",
          mid: []
        },
        treeData: [],
        pro: {
          label: "title",
          children: "children"
        }
      }
    },
    methods: {
      reset() {
        this.$refs.form.resetFields()
        this.$refs.tree.setCheckedKeys([])
      },
      find() {
        this.toPage(1, this.search)
      },
      edit(role) {
        this.showRole.id = role.id
        this.dialogVisible = true
      },
      deleteRole(role) {
        deleteRole(role.id).then(data => {
          this.$message.success(data.msg)
          this.toPage(1, "")
        })

      },
      toPage(pageNum, search) {
        page({currentPage: pageNum, name: search}).then(data => {
          this.tableData = data.data
          this.currentPage = pageNum
          this.pageSize = data.pageSize
          this.total = data.total
          this.search = search
        })
      },
      numPage(pageNum) {
        this.toPage(pageNum, this.search)
      }
      ,
      open() {
        this.showRole.id = ""
        this.dialogVisible = true
      },
      submit() {
        let list = this.$refs.tree.getCheckedKeys(true)
        add({
          id: this.showRole.id,
          name: this.showRole.name,
          nameZh: this.showRole.nameZh,
          menus: list
        }).then(data => {
          this.$message.success(data.msg)
          this.toPage(1, "")
          this.dialogVisible = false
        })
      },
      loadInfo() {
        getMenuTree().then(data => {
          this.treeData = this.menu2tree(data.object)
        })
        if (this.showRole.id != "") {
          getRoleWithMenu(this.showRole.id).then(data => {
            let {object} = data
            this.showRole.name = object.name
            this.showRole.nameZh = object.nameZh
            let {menuList} = object
            let ms = []
            menuList.forEach(m => {
              ms.push(m.id)
            })
            this.showRole.mid = ms
          })
        }

      },
      menu2tree(data) {
        let list = []
        data.forEach(d => {
          let o = {}
          o.id = d.id
          o.title = d.title
          if (d.children) {
            o.children = this.menu2tree(d.children)
          }
          list.push(o)
        })
        return list
      }
    }
  }
</script>

<style scoped>

</style>
