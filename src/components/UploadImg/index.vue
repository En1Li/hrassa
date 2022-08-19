<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :http-request="onUpload"
      :before-upload="beforeUpload"
      :limit="1"
      class="count-css"
      :class="fileList.length ? 'hide' : ''"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog title="提示" :visible.sync="dialogVisible">
      <img :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
//id:AKIDPhnfJhphJhrlPnxta3HIfpjPpzve9RVN
// key:jFYdVN3Us9BxTjjTyEF4ez5yby6yby6y
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDPhnfJhphJhrlPnxta3HIfpjPpzve9RVN',
  SecretKey: 'jFYdVN3Us9BxTjjTyEF4ez5yby6yby6y',
})
console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      imgUrl: '',
      loading: false,
    }
  },

  created() {},

  methods: {
    onUpload({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'hr-31-1313341618' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          this.loading = false // console.log(err || data)
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败,请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location,
          })
        },
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.dialogVisible = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error(`请选择${types.join('、')}类型的图片`)
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能超出2MB')
        return false
      }
    },
  },
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.count-css {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
