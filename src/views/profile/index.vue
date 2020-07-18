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
              <a href="javascript:void(0)">
                <el-image fit="cover"
                          :src="avatar"
                          @click.native="showDialog"></el-image>
              </a>
            </el-col>

          </el-row>
          <el-row type="flex" justify="center" style="margin-top: 15px">
            <el-col :span="6" style="text-align: center">
              <span>{{name}}</span>
            </el-col>
          </el-row>

          <el-divider content-position="left">角色</el-divider>
          <el-row>
            <el-col :span="6">
              {{roles}}
            </el-col>
          </el-row>


        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="修改头像" :visible.sync="dialogVisible">

      <el-upload action="no" name="file" style="margin-bottom: 20px"
                 accept=".jpeg,.png,.jpg"
                 :limit="1"
                 :show-file-list="false"
                 :http-request="upload_img"
      >
        <el-button size="small" type="primary">选择图片</el-button>
      </el-upload>

      <div style="width: 100%;height:300px">
        <vue-cropper autoCrop :img="img_url" ref="cropper" centerBox fixed/>
      </div>
      <el-button type="primary" @click="resetAvatar" style="margin-top: 20px">确定</el-button>
    </el-dialog>

  </div>

</template>

<script>
  import {VueCropper} from 'vue-cropper'
  import {upload_img, setAvatar} from "@/api/profile"
  import {mapGetters} from 'vuex'


  export default {
    name: "Profile",
    components: {
      VueCropper
    },
    computed: {
      ...mapGetters(["avatar", "name"]),
      roles() {
        let roles = ""
        this.$store.getters.roles.forEach(r => {
          roles += r + " "
        })
        return roles
      }
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
          this.img_url = "http://localhost:9528/dev-api/" + response.msg
        })
      },
      resetAvatar() {
        if (Math.floor(this.$refs.cropper.cropW) < 100) {
          this.$message.warning("截图宽高不能小于100像素！")
          return
        }
        this.$refs.cropper.getCropData(data => {
          setAvatar({base64: data.replace("data:image/jpeg;base64,", "")}).then(data => {
            this.$store.commit("user/SET_AVATAR", "http://localhost:9528/dev-api/" + data.object.name)
            this.dialogVisible = false
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
