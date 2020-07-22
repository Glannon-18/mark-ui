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
              <el-button @click="delete(scope.row)" type="danger" size="small">删除</el-button>
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

    <el-dialog title="角色信息" :visible.sync="dialogVisible" width="30%">

      <el-row type="flex" justify="center">
        <el-col :span="18">
          <el-form label-width="100px" :rules="rules" ref="form" :model="showRole">
            <el-form-item label="角色英文名" prop="name">
              <el-input v-model="showRole.name"></el-input>
            </el-form-item>

            <el-form-item label="角色中文名" prop="nameZh">
              <el-input v-model="showRole.nameZh"></el-input>
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
  import {page} from "@/api/role";

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
          name: [{required: true, message: '请输入角色英文名', trigger: 'blur'}],
          nameZh: [{required: true, message: '请输入角色名', trigger: 'blur'}],
        },
        showRole: {
          id: "",
          name: "",
          nameZh: ""
        }
      }
    },
    methods: {
      find() {
        this.toPage(1, this.search)
      },
      add() {

      },
      edit(role) {

      },
      delete(role) {

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
      open(){
        this.dialogVisible=true
      },
      submit(){
          this.dialogVisible=false
      }
    }
  }
</script>

<style scoped>

</style>
