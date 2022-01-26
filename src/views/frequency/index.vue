<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item label="对码记录ID" prop="checkcodeId">
        <el-input
          v-model="queryParams.checkcodeId"
          placeholder="请输入对码记录ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医院名称" prop="hospital">
        <el-input
          v-model="queryParams.hospital"
          placeholder="请输入医院名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医药给药频次" prop="hospitalFrequency">
        <el-input
          v-model="queryParams.hospitalFrequency"
          placeholder="请输入医药给药频次"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标准频次ID" prop="standardFrequencyId">
        <el-input
          v-model="queryParams.standardFrequencyId"
          placeholder="请输入标准频次ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
          v-hasPermi="['frequency:frequency:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['frequency:frequency:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['frequency:frequency:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['frequency:frequency:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="frequencyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="对码记录ID" align="center" prop="checkcodeId" />
      <el-table-column label="医院名称" align="center" prop="hospital" />
      <el-table-column label="医药给药频次" align="center" prop="hospitalFrequency" />
      <el-table-column label="标准频率" align="center" prop="frequencyTime" />
      <el-table-column label="标准频次单位" align="center" prop="frequencyTimeUnit" />
      <el-table-column label="标准频次数" align="center" prop="standardFrequency" />
      <el-table-column label="标准频次描述" align="center" prop="frequencyDesc" />
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['frequency:frequency:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['frequency:frequency:remove']"
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

    <!-- 添加或修改医院频次标准化对码结果对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
<!--        <el-form-item label="对码记录ID" prop="checkcodeId">-->
<!--          <el-input v-model="form.checkcodeId" placeholder="请输入对码记录ID" />-->
<!--        </el-form-item>-->
        <el-form-item label="医院名称" prop="hospital">
          <el-input v-model="form.hospital" placeholder="请输入医院名称" />
        </el-form-item>
        <el-form-item label="医药给药频次" prop="hospitalFrequency">
          <el-input v-model="form.hospitalFrequency" placeholder="请输入医药给药频次" />
        </el-form-item>
        <el-form-item label="标准给药频次" prop="frequencyDesc">
          <el-select v-model="form.frequencyDesc"
                     filterable
                     remote
                     reserve-keyword
                     :remote-method="getDrugFrequencyList"
                     :loading="loadingSelect"
                     placeholder="输入标准给药频次">
            <el-option
              v-for="item in standardFrequency"
              :key="item.id"
              :label="item.frequencyDesc"
              :value="item.frequencyDesc">
            </el-option>
          </el-select>
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
import { listFrequency, getFrequency, delFrequency, addFrequency, updateFrequency, getFrequencyCatelogList} from "@/api/datamatching/frequency";

export default {
  name: "Frequency",
  data() {
    return {
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
      // 医院频次标准化对码结果表格数据
      frequencyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      loadingSelect:false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        checkcodeId: null,
        hospital: null,
        hospitalFrequency: null,
        standardFrequencyId: null,
        frequencyDesc: null
      },
      standardFrequency:{},
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询医院频次标准化对码结果列表 */
    getList() {
      this.loading = true;
      console.log(this.$route.query.checkcodeId)
      if(this.$route.query.checkcodeId != undefined){
        this.queryParams.checkcodeId = this.$route.query.checkcodeId
      }
      listFrequency(this.queryParams).then(response => {
        this.frequencyList = response.rows;
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
        checkcodeId: null,
        hospital: null,
        hospitalFrequency: null,
        standardFrequencyId: null,
        frequencyDesc: null
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
      this.title = "添加医院频次标准化对码结果";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFrequency(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改频次对码结果";
      });
    },
    getDrugFrequencyList(query){
      getFrequencyCatelogList(query)
      .then(res=>{
        this.standardFrequency = res.rows;
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFrequency(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFrequency(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除医院频次标准化对码结果编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFrequency(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('frequency/frequency/export', {
        ...this.queryParams
      }, `frequency_frequency.xlsx`)
    }
  }
};
</script>
