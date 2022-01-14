<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="药品通用名" prop="genericName">
        <el-input
          v-model="queryParams.genericName"
          placeholder="请输入药品通用名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="年龄段" prop="generation">
        <el-input
          v-model="queryParams.generation"
          placeholder="请输入年龄段"
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
          v-hasPermi="['knowledgeWarehouse:chineseDrugAge:add']"
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
          v-hasPermi="['knowledgeWarehouse:chineseDrugAge:edit']"
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
          v-hasPermi="['knowledgeWarehouse:chineseDrugAge:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['knowledgeWarehouse:chineseDrugAge:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="chineseDrugAgeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="自增主键" align="center" prop="id" />
      <el-table-column label="药品通用名" align="center" prop="genericName" />
      <el-table-column label="年龄段" align="center" prop="generation" />
      <el-table-column label="年龄段下限" align="center" prop="miniAge" />
      <el-table-column label="年龄段上限" align="center" prop="maxAge" />
      <el-table-column label="年龄计量单位，例如年" align="center" prop="ageUnit" />
      <el-table-column label="风险等级" align="center" prop="riskScore" />
      <el-table-column label="循证内容" align="center" prop="evidenceContent" />
      <el-table-column label="循证来源" align="center" prop="evidenceSource" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新者" align="center" prop="updateUser" />
      <el-table-column label="更新时间" align="center" prop="updaeTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updaeTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建者" align="center" prop="createUser" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['knowledgeWarehouse:chineseDrugAge:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['knowledgeWarehouse:chineseDrugAge:remove']"
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

    <!-- 添加或修改中药年龄规则对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="药品通用名" prop="genericName">
          <el-input v-model="form.genericName" placeholder="请输入药品通用名" />
        </el-form-item>
        <el-form-item label="年龄段" prop="generation">
          <el-input v-model="form.generation" placeholder="请输入年龄段" />
        </el-form-item>
        <el-form-item label="年龄段下限" prop="miniAge">
          <el-input v-model="form.miniAge" placeholder="请输入年龄段下限" />
        </el-form-item>
        <el-form-item label="年龄段上限" prop="maxAge">
          <el-input v-model="form.maxAge" placeholder="请输入年龄段上限" />
        </el-form-item>
        <el-form-item label="年龄计量单位，例如年" prop="ageUnit">
          <el-input v-model="form.ageUnit" placeholder="请输入年龄计量单位，例如年" />
        </el-form-item>
        <el-form-item label="风险等级" prop="riskScore">
          <el-input v-model="form.riskScore" placeholder="请输入风险等级" />
        </el-form-item>
        <el-form-item label="循证内容">
          <editor v-model="form.evidenceContent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="循证来源" prop="evidenceSource">
          <el-input v-model="form.evidenceSource" placeholder="请输入循证来源" />
        </el-form-item>
        <el-form-item label="更新者" prop="updateUser">
          <el-input v-model="form.updateUser" placeholder="请输入更新者" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updaeTime">
          <el-date-picker clearable size="small"
            v-model="form.updaeTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择更新时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建者" prop="createUser">
          <el-input v-model="form.createUser" placeholder="请输入创建者" />
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
import { listChineseDrugAge, getChineseDrugAge, delChineseDrugAge, addChineseDrugAge, updateChineseDrugAge } from "@/api/knowledgeWarehouse/rud/rules/chineseDrugAge";

export default {
  name: "ChineseDrugAge",
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
      // 中药年龄规则表格数据
      chineseDrugAgeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        genericName: null,
        generation: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        genericName: [
          { required: true, message: "药品通用名不能为空", trigger: "blur" }
        ],
        generation: [
          { required: true, message: "年龄段不能为空", trigger: "blur" }
        ],
        miniAge: [
          { required: true, message: "年龄段下限不能为空", trigger: "blur" }
        ],
        maxAge: [
          { required: true, message: "年龄段上限不能为空", trigger: "blur" }
        ],
        riskScore: [
          { required: true, message: "风险等级不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询中药年龄规则列表 */
    getList() {
      this.loading = true;
      listChineseDrugAge(this.queryParams).then(response => {
        this.chineseDrugAgeList = response.rows;
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
        genericName: null,
        generation: null,
        miniAge: null,
        maxAge: null,
        ageUnit: null,
        riskScore: null,
        evidenceContent: null,
        evidenceSource: null,
        createTime: null,
        updateUser: null,
        updaeTime: null,
        createUser: null
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
      this.title = "添加中药年龄规则";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getChineseDrugAge(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改中药年龄规则";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateChineseDrugAge(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addChineseDrugAge(this.form).then(response => {
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
      this.$confirm('是否确认删除中药年龄规则编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delChineseDrugAge(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('knowledgeWarehouse/chineseDrugAge/export', {
        ...this.queryParams
      }, `knowledgeWarehouse_chineseDrugAge.xlsx`)
    }
  }
};
</script>
