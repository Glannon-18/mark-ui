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
              <!--              <a href="javascript:void(0)">-->
              <el-image fit="cover"
                        src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/100/h/100"
                        @click.native="showDialog"></el-image>
              <!--              </a>-->
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

    <el-dialog title="修改头像" :visible.sync="dialogVisible">

      <el-upload action="aa" name="file"
                 accept=".jpeg,.png,.jpg"
                 :limit="1"
                 :show-file-list="false"
                 :http-request="upload_img"
      >
        <el-button size="small" type="primary">选择图片</el-button>
      </el-upload>

      <div style="width: 100%;height:300px">
        <vue-cropper autoCrop :img="img_url" ref="cropper" centerBox/>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  import {VueCropper} from 'vue-cropper'
  import {upload_img} from "@/api/profile"

  export default {
    name: "Profile",
    components: {
      VueCropper
    },
    data() {
      return {
        dialogVisible: false,
        img_url: ""
      }
    },
    methods: {
      showDialog() {
        this.dialogVisible = true
      },
      upload_img(param) {
        let file = param.file
        let form = new FormData()
        form.append("file", file)
        upload_img(form).then(response => {
          this.img_url="http://localhost:9528/dev-api/"+response.msg
          console.log(this.img_url)
        })
      }
    }
  }
</script>

<style scoped>

</style>
