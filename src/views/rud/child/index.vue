<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="70px">
      <el-form-item label="药品通用名" prop="drugName">
        <el-input
          v-model="queryParams.drugName"
          placeholder="请输入药品通用名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="年龄组类型" prop="ageType">-->
<!--        <el-select v-model="queryParams.ageType" placeholder="请选择年龄组类型" clearable size="small">-->
<!--          <el-option label="请选择字典生成" value="" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="年龄组" prop="ageGroup">-->
<!--        <el-input-->
<!--          v-model="queryParams.ageGroup"-->
<!--          placeholder="请输入年龄组"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="开始时间" prop="ageMin">
        <el-input
          v-model="queryParams.ageMin"
          placeholder="请输入开始时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="ageMax">
        <el-input
          v-model="queryParams.ageMax"
          placeholder="请输入结束时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="时间单位" prop="ageUnit">-->
<!--        <el-input-->
<!--          v-model="queryParams.ageUnit"-->
<!--          placeholder="请输入时间单位"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="询证来源" prop="source">-->
<!--        <el-input-->
<!--          v-model="queryParams.source"-->
<!--          placeholder="请输入询证来源"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="分数" prop="score">-->
<!--        <el-input-->
<!--          v-model="queryParams.score"-->
<!--          placeholder="请输入分数"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
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
          v-hasPermi="['rud:child:add']"
        >新增</el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          plain-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['rud:child:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['rud:child:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['rud:child:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="childList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="更新人" align="center" prop="id" />
      <el-table-column label="药品通用名" align="center" prop="drugName" />
      <el-table-column label="年龄组类型" align="center" prop="ageType" />
      <el-table-column label="年龄组" align="center" prop="ageGroup" />
      <el-table-column label="开始时间" align="center" prop="ageMin" />
      <el-table-column label="结束时间" align="center" prop="ageMax" />
      <el-table-column label="时间单位" align="center" prop="ageUnit" />
      <el-table-column label="询证" align="center" prop="evidence" />
      <el-table-column label="询证来源" align="center" prop="source" />
      <el-table-column label="分数" align="center" prop="score" />
      <el-table-column label="创建人" align="center" prop="createUser" />
      <el-table-column label="更新人" align="center" prop="updateUser" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['rud:child:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['rud:child:remove']"
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

    <!-- 添加或修改儿童用药规则对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="药品通用名" prop="drugName">
          <el-input v-model="form.drugName" placeholder="请输入药品通用名" />
        </el-form-item>
        <el-form-item label="年龄组类型" prop="ageType">
          <el-select v-model="form.ageType" placeholder="请选择年龄组类型">
            <el-option label="儿童" value="儿童" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄组" prop="ageGroup">
          <el-input v-model="form.ageGroup" placeholder="请输入年龄组" />
        </el-form-item>
        <el-form-item label="开始时间" prop="ageMin">
          <el-input v-model="form.ageMin" placeholder="请输入开始时间" />
        </el-form-item>
        <el-form-item label="结束时间" prop="ageMax">
          <el-input v-model="form.ageMax" placeholder="请输入结束时间" />
        </el-form-item>
        <el-form-item label="时间单位" prop="ageUnit">
          <el-input v-model="form.ageUnit" placeholder="请输入时间单位" />
        </el-form-item>
        <el-form-item label="询证" prop="evidence">
          <el-input v-model="form.evidence" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="询证来源" prop="source">
          <el-input v-model="form.source" placeholder="请输入询证来源" />
        </el-form-item>
        <el-form-item label="分数" prop="score">
          <el-input v-model="form.score" placeholder="请输入分数" />
        </el-form-item>
        <el-form-item label="创建人" prop="createUser">
          <el-input v-model="form.createUser" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="更新人" prop="updateUser">
          <el-input v-model="form.updateUser" placeholder="请输入更新人" />
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
import { listChild, getChild, delChild, addChild, updateChild } from "@/api/rud/rule/child";

export default {
  name: "Child",
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
      // 儿童用药规则表格数据
      childList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        drugName: null,
        ageType: null,
        ageGroup: null,
        ageMin: null,
        ageMax: null,
        ageUnit: null,
        evidence: null,
        source: null,
        score: null,
        createUser: null,
        updateUser: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        drugName: [
          { required: true, message: "药品通用名不能为空", trigger: "blur" }
        ],
        ageType: [
          { required: true, message: "年龄组类型不能为空", trigger: "change" }
        ],
        ageGroup: [
          { required: true, message: "年龄组不能为空", trigger: "blur" }
        ],
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
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询儿童用药规则列表 */
    getList() {
      this.loading = true;
      listChild(this.queryParams).then(response => {
        this.childList = response.rows;
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
        ageType: null,
        ageGroup: null,
        ageMin: null,
        ageMax: null,
        ageUnit: null,
        evidence: null,
        source: null,
        score: null,
        createUser: null,
        createTime: null,
        updateUser: null,
        updateTime: null
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
      this.title = "添加儿童用药规则";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getChild(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改儿童用药规则";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateChild(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addChild(this.form).then(response => {
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
      this.$confirm('是否确认删除儿童用药规则编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delChild(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('lkai-rud/child/export', {
        ...this.queryParams
      }, `rud_child.xlsx`)
    }
  }
};
</script>
