<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <span>关于我</span>
          </div>

          <el-row type="flex" justify="center">
            <el-col :span="6">
              <el-image fit="cover"
                src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/100/h/100"></el-image>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="6" style="text-align: center">
              <span>账号</span>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="6" style="text-align: center">
              <span>名字</span>
            </el-col>
          </el-row>


          <el-divider content-position="left">角色</el-divider>
          <el-row>
            <el-col :span="6">
              管理员
            </el-col>
          </el-row>


        </el-card>
      </el-col>
    </el-row>

  </div>

</template>

<script>
  export default {
    name: "Profile"
  }
</script>

<style scoped>

</style>
