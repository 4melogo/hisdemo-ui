<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="药品通用名" prop="drugName">
        <el-input
          v-model="queryParams.drugName"
          placeholder="请输入药品通用名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否区分疾病严重等级 1是0否  暂不启用" prop="isSubdivide">
        <el-input
          v-model="queryParams.isSubdivide"
          placeholder="请输入是否区分疾病严重等级 1是0否  暂不启用"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="规则所有者信息" prop="createUser">
        <el-input
          v-model="queryParams.createUser"
          placeholder="请输入规则所有者信息"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="更新人" prop="updateUser">
        <el-input
          v-model="queryParams.updateUser"
          placeholder="请输入更新人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.updateTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择更新时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="分值" prop="score">
        <el-input
          v-model="queryParams.score"
          placeholder="请输入分值"
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
          v-hasPermi="['drug:nephropathy:add']"
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
          v-hasPermi="['drug:nephropathy:edit']"
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
          v-hasPermi="['drug:nephropathy:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['drug:nephropathy:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="nephropathyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="分值" align="center" prop="id" />
      <el-table-column label="药品通用名" align="center" prop="drugName" />
      <el-table-column label="是否区分疾病严重等级 1是0否  暂不启用" align="center" prop="isSubdivide" />
      <el-table-column label="更新人" align="center" prop="updateUser" />
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="询证" align="center" prop="evidence" />
      <el-table-column label="询证来源" align="center" prop="source" />
      <el-table-column label="分值" align="center" prop="score">
        <template slot-scope="scope">
          <dict-tag :options="scoreOptions" :value="scope.row.score"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['drug:nephropathy:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['drug:nephropathy:remove']"
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

    <!-- 添加或修改肾损用药对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="药品通用名" prop="drugName">
          <el-input v-model="form.drugName" placeholder="请输入药品通用名" />
        </el-form-item>
        <el-form-item label="是否区分疾病严重等级 1是0否  暂不启用" prop="isSubdivide">
          <el-input v-model="form.isSubdivide" placeholder="请输入是否区分疾病严重等级 1是0否  暂不启用" />
        </el-form-item>
        <el-form-item label="询证" prop="evidence">
          <el-input v-model="form.evidence" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="询证来源" prop="source">
          <el-input v-model="form.source" placeholder="请输入询证来源" />
        </el-form-item>
        <el-form-item label="分值" prop="score">
          <el-input v-model="form.score" placeholder="请输入分值" />
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
import { listNephropathy, getNephropathy, delNephropathy, addNephropathy, updateNephropathy } from "@/api/rud/rule/rulenephropathy";

export default {
  name: "Nephropathy",
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
      // 肾损用药表格数据
      nephropathyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 分值字典
      scoreOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        drugName: null,
        isSubdivide: null,
        createUser: null,
        updateUser: null,
        updateTime: null,
        score: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        drugName: [
          { required: true, message: "药品通用名不能为空", trigger: "blur" }
        ],
        kidney: [
          { required: true, message: "肾损描述不能为空", trigger: "blur" }
        ],
        isSubdivide: [
          { required: true, message: "是否区分疾病严重等级 1是0否  暂不启用不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        createUser: [
          { required: true, message: "规则所有者信息不能为空", trigger: "blur" }
        ],
        updateUser: [
          { required: true, message: "更新人不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        evidence: [
          { required: true, message: "询证不能为空", trigger: "blur" }
        ],
        source: [
          { required: true, message: "询证来源不能为空", trigger: "blur" }
        ],
        score: [
          { required: true, message: "分值不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("risk_score").then(response => {
      this.scoreOptions = response.data;
    });
  },
  methods: {
    /** 查询肾损用药列表 */
    getList() {
      this.loading = true;
      listNephropathy(this.queryParams).then(response => {
        this.nephropathyList = response.rows;
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
        drugName: null,
        kidney: null,
        isSubdivide: null,
        createTime: null,
        createUser: null,
        updateUser: null,
        updateTime: null,
        evidence: null,
        source: null,
        score: null
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
      this.title = "添加肾损用药";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getNephropathy(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改肾损用药";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateNephropathy(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addNephropathy(this.form).then(response => {
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
      this.$confirm('是否确认删除肾损用药编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delNephropathy(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('drug/nephropathy/export', {
        ...this.queryParams
      }, `drug_nephropathy.xlsx`)
    }
  }
};
</script>
