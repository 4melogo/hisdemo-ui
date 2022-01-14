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
      <el-form-item label="病生状态" prop="illState">
        <el-input
          v-model="queryParams.illState"
          placeholder="请输入病生状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="风险等级" prop="riskScore">
        <el-input
          v-model="queryParams.riskScore"
          placeholder="请输入风险等级"
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
          v-hasPermi="['knowledgeWarehouse:chineseDrugSickness:add']"
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
          v-hasPermi="['knowledgeWarehouse:chineseDrugSickness:edit']"
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
          v-hasPermi="['knowledgeWarehouse:chineseDrugSickness:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['knowledgeWarehouse:chineseDrugSickness:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="chineseDrugSicknessList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="Id" align="center" prop="id" />
      <el-table-column label="药品通用名" align="center" prop="genericName" />
      <el-table-column label="病生状态" align="center" prop="illState" />
      <el-table-column label="风险等级" align="center" prop="riskScore">
        <template slot-scope="scope">
          <dict-tag :options="riskScoreOptions" :value="scope.row.riskScore"/>
        </template>
      </el-table-column>
      <el-table-column label="询证内容" align="center" prop="evidenceContent" />
      <el-table-column label="询证来源" align="center" prop="evidenceSource" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新者" align="center" prop="updateUser" />
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
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
            v-hasPermi="['knowledgeWarehouse:chineseDrugSickness:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['knowledgeWarehouse:chineseDrugSickness:remove']"
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

    <!-- 添加或修改中药病生规则对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="药品通用名" prop="genericName">
          <el-input v-model="form.genericName" placeholder="请输入药品通用名" />
        </el-form-item>
        <el-form-item label="病生状态" prop="illState">
          <el-input v-model="form.illState" placeholder="请输入病生状态" />
        </el-form-item>
        <el-form-item label="风险等级" prop="riskScore">
          <el-input v-model="form.riskScore" placeholder="请输入风险等级" />
        </el-form-item>
        <el-form-item label="询证内容">
          <editor v-model="form.evidenceContent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="询证来源" prop="evidenceSource">
          <el-input v-model="form.evidenceSource" placeholder="请输入询证来源" />
        </el-form-item>
        <el-form-item label="更新者" prop="updateUser">
          <el-input v-model="form.updateUser" placeholder="请输入更新者" />
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
import { listChineseDrugSickness, getChineseDrugSickness, delChineseDrugSickness, addChineseDrugSickness, updateChineseDrugSickness } from "@/api/knowledgeWarehouse/rud/rules/chineseDrugSickness";

export default {
  name: "ChineseDrugSickness",
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
      // 中药病生规则表格数据
      chineseDrugSicknessList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 风险等级字典
      riskScoreOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        genericName: null,
        illState: null,
        riskScore: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        genericName: [
          { required: true, message: "药品通用名不能为空", trigger: "blur" }
        ],
        illState: [
          { required: true, message: "病生状态不能为空", trigger: "blur" }
        ],
        riskScore: [
          { required: true, message: "风险等级不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("risk_score").then(response => {
      this.riskScoreOptions = response.data;
    });
  },
  methods: {
    /** 查询中药病生规则列表 */
    getList() {
      this.loading = true;
      listChineseDrugSickness(this.queryParams).then(response => {
        this.chineseDrugSicknessList = response.rows;
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
        idBackup: null,
        genericName: null,
        illState: null,
        riskScore: null,
        evidenceContent: null,
        evidenceSource: null,
        createTime: null,
        updateUser: null,
        updateTime: null,
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
      this.title = "添加中药病生规则";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getChineseDrugSickness(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改中药病生规则";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateChineseDrugSickness(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addChineseDrugSickness(this.form).then(response => {
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
      this.$confirm('是否确认删除中药病生规则编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delChineseDrugSickness(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('knowledgeWarehouse/chineseDrugSickness/export', {
        ...this.queryParams
      }, `knowledgeWarehouse_chineseDrugSickness.xlsx`)
    }
  }
};
</script>
