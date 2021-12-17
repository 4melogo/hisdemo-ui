<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
<!--      <el-form-item label="附加编码,保留字段，已经合并至code字段" prop="icd10CodeAdd">-->
<!--        <el-input-->
<!--          v-model="queryParams.icd10CodeAdd"-->
<!--          placeholder="请输入附加编码,保留字段，已经合并至code字段"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="名称" prop="icd10Name">
        <el-input
          v-model="queryParams.icd10Name"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="创建人" prop="createUser">-->
<!--        <el-input-->
<!--          v-model="queryParams.createUser"-->
<!--          placeholder="请输入创建人"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="更新人" prop="updateUser">-->
<!--        <el-input-->
<!--          v-model="queryParams.updateUser"-->
<!--          placeholder="请输入更新人"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="诊断标签" prop="diagnosisLabel">
        <el-input
          v-model="queryParams.diagnosisLabel"
          placeholder="请输入诊断标签"
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
          v-hasPermi="['rud:diagnosticCatalog:add']"
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
          v-hasPermi="['rud:diagnosticCatalog:edit']"
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
          v-hasPermi="['rud:diagnosticCatalog:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['rud:diagnosticCatalog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="diagnosticCatalogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
<!--      <el-table-column label="附加编码,保留字段，已经合并至code字段" align="center" prop="icd10CodeAdd" />-->
      <el-table-column label="名称" align="center" prop="icd10Name" />
      <el-table-column label="创建人" align="center" prop="createUser" />
      <el-table-column label="更新人" align="center" prop="updateUser" />
      <el-table-column label="诊断标签" align="center" prop="diagnosisLabel" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['rud:diagnosticCatalog:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['rud:diagnosticCatalog:remove']"
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

    <!-- 添加或修改标准ICD10诊断目录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
<!--        <el-form-item label="附加编码,保留字段，已经合并至code字段" prop="icd10CodeAdd">-->
<!--          <el-input v-model="form.icd10CodeAdd" placeholder="请输入附加编码,保留字段，已经合并至code字段" />-->
<!--        </el-form-item>-->
        <el-form-item label="名称" prop="icd10Name">
          <el-input v-model="form.icd10Name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="创建人" prop="createUser">
          <el-input v-model="form.createUser" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="更新人" prop="updateUser">
          <el-input v-model="form.updateUser" placeholder="请输入更新人" />
        </el-form-item>
        <el-form-item label="诊断标签" prop="diagnosisLabel">
          <el-select v-model="form.diagnosisLabel" placeholder="请输入诊断标签" >
            <el-option
              v-for="dict in diagnosisLabelList"
              :key="dict.id"
              :label="dict.diagnosisLabel"
              :value="dict.diagnosisLabel"
            ></el-option>
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
import { listDiagnosticCatalog, getDiagnosticCatalog, delDiagnosticCatalog, addDiagnosticCatalog, updateDiagnosticCatalog ,getLabelList} from "@/api/rud/diagnosticCatelog/diagnosticCatalog";

export default {
  name: "DiagnosticCatalog",
  data() {
    return {
      diagnosisLabelList : [],
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
      // 标准ICD10诊断目录表格数据
      diagnosticCatalogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        icd10CodeAdd: null,
        icd10Name: null,
        createUser: null,
        updateUser: null,
        diagnosisLabel: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        createUser: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateUser: [
          { required: true, message: "更新人不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        diagnosisLabel: [
          { required: true, message: "诊断标签不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getLabels();
  },
  methods: {
    getLabels() {
      getLabelList().then(response => {
        this.diagnosisLabelList = response.data;
      });
    },
    /** 查询标准ICD10诊断目录列表 */
    getList() {
      this.loading = true;
      listDiagnosticCatalog(this.queryParams).then(response => {
        this.diagnosticCatalogList = response.rows;
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
        icd10Code: null,
        icd10CodeAdd: null,
        icd10Name: null,
        createUser: null,
        createTime: null,
        updateUser: null,
        updateTime: null,
        diagnosisLabel: null
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
      this.title = "添加标准ICD10诊断目录";

    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDiagnosticCatalog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改标准ICD10诊断目录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDiagnosticCatalog(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDiagnosticCatalog(this.form).then(response => {
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
      this.$confirm('是否确认删除标准ICD10诊断目录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDiagnosticCatalog(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('lkai-rud/diagnosticCatalog/export', {
        ...this.queryParams
      }, `rud_diagnosticCatalog.xlsx`)
    }
  }
};
</script>
