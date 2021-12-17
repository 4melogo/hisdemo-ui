<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="上传者" prop="uploader">
        <el-input
          v-model="queryParams.uploader"
          placeholder="请输入上传者"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="上传时间" prop="uploadTime">-->
<!--        <el-date-picker clearable size="small"-->
<!--          v-model="queryParams.uploadTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择上传时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
      <el-form-item label="医院等级" prop="hospitalLevel">
        <el-input
          v-model="queryParams.hospitalLevel"
          placeholder="请输入医院等级"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医院名称" prop="hospitalname">
        <el-input
          v-model="queryParams.hospitalname"
          placeholder="请输入医院名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="对码药品总数" prop="drugSum">-->
<!--        <el-input-->
<!--          v-model="queryParams.drugSum"-->
<!--          placeholder="请输入对码药品总数"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="错误药品总数" prop="successSum">-->
<!--        <el-input-->
<!--          v-model="queryParams.successSum"-->
<!--          placeholder="请输入错误药品总数"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="对码成功率" prop="successRate">-->
<!--        <el-input-->
<!--          v-model="queryParams.successRate"-->
<!--          placeholder="请输入对码成功率"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['drug:info:add']"
        >新增</el-button>
      </el-col>
      <!--<el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['drug:info:edit']"
        >修改</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['drug:info:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['drug:info:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="对码记录ID" align="center" prop="id" />
      <el-table-column label="上传者" align="center" prop="uploader" />
      <el-table-column label="上传时间" align="center" prop="uploadTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.uploadTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院等级" align="center" prop="hospitalLevel" />
      <el-table-column label="医院名称" align="center" prop="hospitalname" />
      <el-table-column label="对码药品总数" align="center" prop="drugSum" />
      <el-table-column label="覆盖药品总数" align="center" prop="successSum" />
      <el-table-column label="药品对码覆盖率" align="center">
        <template scope="scope">
          <span @click="goDetail(scope.row.id)">{{scope.row.successRate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="对码频次总数" align="center" prop="frequencySum" />
      <el-table-column label="覆盖频次总数" align="center" prop="frequencySuccessSum" />
      <el-table-column label="频次对码覆盖率" align="center">
        <template scope="scope">
          <span @click="goFrequency(scope.row.id)">{{scope.row.frequencyRate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="对码途径总数" align="center" prop="routeSum" />
      <el-table-column label="覆盖途径总数" align="center" prop="routeSuccessSum" />
      <el-table-column label="途径对码覆盖率" align="center">
        <template scope="scope">
          <span @click="goRoute(scope.row.id)">{{scope.row.routeRate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['drug:info:edit']"
          >下载</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['drug:info:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
<!--        <el-form-item label="对码成功率" prop="id">-->
<!--          <el-input v-model="form.id" placeholder="请输入对码成功率" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="上传者" prop="uploader">-->
<!--          <el-input v-model="form.uploader" placeholder="请输入上传者" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="上传时间" prop="uploadTime">-->
<!--          <el-date-picker clearable size="small"-->
<!--            v-model="form.uploadTime"-->
<!--            type="date"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            placeholder="选择上传时间">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
        <el-form-item label="医院等级" prop="hospitalLevel">
          <el-input v-model="form.hospitalLevel" placeholder="请输入医院等级" />
        </el-form-item>
        <el-form-item label="医院名称" prop="hospitalname">
          <el-input v-model="form.hospitalname" placeholder="请输入医院名称" />
        </el-form-item>
<!--        <el-form-item label="对码药品总数" prop="drugSum">-->
<!--          <el-input v-model="form.drugSum" placeholder="请输入对码药品总数" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="错误药品总数" prop="successSum">-->
<!--          <el-input v-model="form.successSum" placeholder="请输入错误药品总数" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="对码成功率" prop="successRate">-->
<!--          <el-input v-model="form.successRate" placeholder="请输入对码成功率" />-->
<!--        </el-form-item>-->
        <el-form-item label="文件上传" prop="fileList">
          <el-upload
            class="upload-demo"
            ref="upload"
            :auto-upload="false"
            name="file"
            action=""
            :data="form"
            :http-request="uploadFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="form.fileList">
            <el-button size="small" type="primary">点击上传</el-button>
<!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>


export default {
  name: "Info",
  data() {
    return {
      //上传文件list
      fileList: [],
      fileListUpload: [],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      infoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        uploader: null,
        uploadTime: null,
        hospitalLevel: null,
        hospitalname: null,
        drugSum: null,
        successSum: null,
        successRate: null
      },
      //上传的表单的参数
      formData:{
        hospitalLevel: '',
        hospitalname: '',
      },
      // 表单参数
      form: {
        fileList: []
      },
      // 表单校验
      rules: {
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      listInfo(this.queryParams).then(response => {
        this.infoList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        uploader: null,
        uploadTime: null,
        hospitalLevel: null,
        hospitalname: null,
        drugSum: null,
        successSum: null,
        successRate: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "文件上传";
    },
    /** 下载按钮操作 */
    handleUpdate(row) {
      const id = row.id
      downLoadZip("lkai-datamatching/info/download?fileId="+id, "data.zip");
      // console.log(id)
      // window.location.href = '/lkai-datamatching/info/download?fileId='+id;
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            //this.$refs.upload.submit();
            updateInfo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              //this.getList();
            });
          } else {
            this.$refs.upload.submit();
            // addInfo(this.form).then(response => {
            //   this.msgSuccess("新增成功");
            //   this.open = false;
            //   //this.getList();
            // });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delInfo(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('drug/info/export', {
        ...this.queryParams
      }, `drug_info.xlsx`)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    uploadFile(param){
      this.open = false;
      this.loading = true;
      var formData = new FormData();
      formData.append("file",param.file);
      formData.append("checkcodeInfo",JSON.stringify(param.data))
      fileUpload(formData).then(res=>{
          this.msgSuccess("新增成功");
          this.getList();
        this.loading = false;
      })
    },
    goDetail(id){
      this.$router.push({ path: 'checkcodedetail',query:{checkcodeId:id}})
      //this.$router.push({ path: 'drugroute',query:{checkcodeId:checkcodeId}})
      //this.$router.push({ path: 'frequency',query:{checkcodeId:checkcodeId}})
    },
    goRoute(id){
      this.$router.push({ path: 'drugroute',query:{checkcodeId:id}})
    },
    goFrequency(id){
      this.$router.push({ path: 'frequency',query:{checkcodeId:id}})
    }
  }
};
</script>
