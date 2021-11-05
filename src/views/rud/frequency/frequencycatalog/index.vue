<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="频次描述" prop="frequencyDesc">
        <el-input
          v-model="queryParams.frequencyDesc"
          placeholder="请输入频次描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="频次时长" prop="frequencyTime">
        <el-input
          v-model="queryParams.frequencyTime"
          placeholder="请输入频次时长"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="时长单位" prop="frequencyTimeUnit">
        <el-select v-model="queryParams.frequencyTimeUnit" placeholder="请选择时长单位" clearable size="small">
          <el-option
            v-for="dict in frequencyTimeUnitOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="频次次数" prop="standardFrequency">
        <el-input
          v-model="queryParams.standardFrequency"
          placeholder="请输入频次次数"
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
          v-hasPermi="['frequency:frequencycatalog:add']"
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
          v-hasPermi="['frequency:frequencycatalog:edit']"
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
          v-hasPermi="['frequency:frequencycatalog:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['frequency:frequencycatalog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="frequencycatalogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="频次描述" align="center" prop="frequencyDesc" />
      <el-table-column label="频次时长" align="center" prop="frequencyTime" />
      <el-table-column label="时长单位" align="center" prop="frequencyTimeUnit">
        <template slot-scope="scope">
          <dict-tag :options="frequencyTimeUnitOptions" :value="scope.row.frequencyTimeUnit"/>
        </template>
      </el-table-column>
      <el-table-column label="频次次数" align="center" prop="standardFrequency" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['frequency:frequencycatalog:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['frequency:frequencycatalog:remove']"
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

    <!-- 添加或修改标准频次目录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="频次描述" prop="frequencyDesc">
          <el-input v-model="form.frequencyDesc" placeholder="请输入频次描述，例每日三次" />
        </el-form-item>
        <el-form-item label="频次时长" prop="frequencyTime">
          <el-input v-model="form.frequencyTime" placeholder="请输入频次时长，例1天3次，填1" />
        </el-form-item>
        <el-form-item label="时长单位" prop="frequencyTimeUnit">
          <el-select v-model="form.frequencyTimeUnit" placeholder="请选择时长单位">
            <el-option
              v-for="dict in frequencyTimeUnitOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="频次次数" prop="standardFrequency">
          <el-input v-model="form.standardFrequency" placeholder="请输入频次次数，例1天3次填3" />
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
import { listFrequencycatalog, getFrequencycatalog, delFrequencycatalog, addFrequencycatalog, updateFrequencycatalog } from "@/api/rud/frequency/frequencycatalog";

export default {
  name: "Frequencycatalog",
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
      // 标准频次目录表格数据
      frequencycatalogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 1天3次 该字段值为   天/d字典
      frequencyTimeUnitOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        frequencyDesc: null,
        frequencyTime: null,
        frequencyTimeUnit: null,
        standardFrequency: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        frequencyDesc: [
          { required: true, message: "频次描述不能为空", trigger: "blur" }
        ],
        frequencyTime: [
          { required: true, message: "频次时长不能为空", trigger: "blur" }
        ],
        frequencyTimeUnit: [
          { required: true, message: "时长单位不能为空", trigger: "change" }
        ],
        standardFrequency: [
          { required: true, message: "频次次数不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_frequencytime_unit").then(response => {
      this.frequencyTimeUnitOptions = response.data;
    });
  },
  methods: {
    /** 查询标准频次目录列表 */
    getList() {
      this.loading = true;
      listFrequencycatalog(this.queryParams).then(response => {
        this.frequencycatalogList = response.rows;
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
        frequencyDesc: null,
        frequencyTime: null,
        frequencyTimeUnit: null,
        standardFrequency: null,
        createTime: null
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
      this.title = "添加标准频次目录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFrequencycatalog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改标准频次目录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFrequencycatalog(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFrequencycatalog(this.form).then(response => {
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
      this.$confirm('是否确认删除标准频次目录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFrequencycatalog(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('frequency/frequencycatalog/export', {
        ...this.queryParams
      }, `frequency_frequencycatalog.xlsx`)
    }
  }
};
</script>
