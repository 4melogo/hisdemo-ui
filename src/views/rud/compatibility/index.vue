<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="成分A id" prop="drugId1">
        <el-input
          v-model="queryParams.drugId1"
          placeholder="请输入成分A id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="成分B id" prop="drugId2">
        <el-input
          v-model="queryParams.drugId2"
          placeholder="请输入成分B id"
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
      <el-form-item label="成分名称A" prop="drugName1">
        <el-select v-model="queryParams.drugName1" filterable placeholder="请选择成分名称A" clearable size="small">
          <el-option
            v-for="dict in componentsList"
            :key="dict.id"
            :label="dict.componentName"
            :value="dict.componentName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="成分名称B" prop="drugName2">
        <el-select v-model="queryParams.drugName2" filterable placeholder="请选择成分名称B" clearable size="small">
          <el-option
            v-for="dict in componentsList"
            :key="dict.id"
            :label="dict.componentName"
            :value="dict.componentName"
          ></el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="配伍等级类型" prop="levelType">-->
<!--        <el-select v-model="queryParams.levelType" placeholder="请选择配伍等级类型" clearable size="small">-->
<!--          <el-option label="请选择字典生成" value="" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="配伍风险等级" prop="level">-->
<!--        <el-input-->
<!--          v-model="queryParams.level"-->
<!--          placeholder="请输入配伍风险等级"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="软删除标识" prop="isDel">-->
<!--        <el-input-->
<!--          v-model="queryParams.isDel"-->
<!--          placeholder="请输入软删除标识"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="数据更新人id" prop="updaterId">-->
<!--        <el-input-->
<!--          v-model="queryParams.updaterId"-->
<!--          placeholder="请输入数据更新人id"-->
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
          v-hasPermi="['rud:compatibility:add']"
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
          v-hasPermi="['rud:compatibility:edit']"
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
          v-hasPermi="['rud:compatibility:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['rud:compatibility:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="compatibilityList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="成分A id" align="center" prop="drugId1" />
      <el-table-column label="成分B id" align="center" prop="drugId2" />
      <el-table-column label="创建人" align="center" prop="createUser" />
      <el-table-column label="更新人" align="center" prop="updateUser" />
      <el-table-column label="成分名称A" align="center" prop="drugName1" />
      <el-table-column label="成分名称B" align="center" prop="drugName2" />
      <el-table-column label="配伍等级类型" align="center" prop="levelType" />
      <el-table-column label="配伍风险等级" align="center" prop="level" />
      <el-table-column label="提示信息" align="center" prop="notice" />
      <el-table-column label="循证内容" align="center" prop="evidence" />
      <el-table-column label="软删除标识" align="center" prop="isDel" />
<!--      <el-table-column label="数据更新人id" align="center" prop="updaterId" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['rud:compatibility:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['rud:compatibility:remove']"
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

    <!-- 添加或修改配伍禁忌数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="成分A id" prop="drugId1">
          <el-input v-model="form.drugId1" placeholder="请输入成分A id" />
        </el-form-item>
        <el-form-item label="成分B id" prop="drugId2">
          <el-input v-model="form.drugId2" placeholder="请输入成分B id" />
        </el-form-item>
        <el-form-item label="创建人" prop="createUser">
          <el-input v-model="form.createUser" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="更新人" prop="updateUser">
          <el-input v-model="form.updateUser" placeholder="请输入更新人" />
        </el-form-item>
        <el-form-item label="成分名称A" prop="drugName1">
          <el-select v-model="form.drugName1" filterable placeholder="请选择成分名称A">
            <el-option
              v-for="dict in componentsList"
              :key="dict.id"
              :label="dict.componentName"
              :value="dict.componentName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成分名称B" prop="drugName2">
          <el-select v-model="form.drugName2" filterable placeholder="请选择成分名称B">
            <el-option
              v-for="dict in componentsList"
              :key="dict.id"
              :label="dict.componentName"
              :value="dict.componentName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配伍等级类型" prop="levelType">
          <el-select v-model="form.levelType" placeholder="请选择配伍等级类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="配伍风险等级" prop="level">
          <el-input v-model="form.level" placeholder="请输入配伍风险等级" />
        </el-form-item>
        <el-form-item label="提示信息" prop="notice">
          <el-input v-model="form.notice" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="循证内容" prop="evidence">
          <el-input v-model="form.evidence" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="软删除标识" prop="isDel">
          <el-input v-model="form.isDel" placeholder="请输入软删除标识" />
        </el-form-item>
        <el-form-item label="数据更新人id" prop="updaterId">
          <el-input v-model="form.updaterId" placeholder="请输入数据更新人id" />
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
import { listCompatibility, getCompatibility, delCompatibility, addCompatibility, updateCompatibility,getComponents } from "@/api/rud/rule/compatibility/compatibility";

export default {
  name: "Compatibility",
  data() {
    return {
      componentsList: [],
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
      // 配伍禁忌数据表格数据
      compatibilityList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        drugId1: null,
        drugId2: null,
        createUser: null,
        updateUser: null,
        drugName1: null,
        drugName2: null,
        levelType: null,
        level: null,
        notice: null,
        evidence: null,
        isDel: null,
        updaterId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        drugId1: [
          { required: true, message: "成分A id不能为空", trigger: "blur" }
        ],
        drugId2: [
          { required: true, message: "成分B id不能为空", trigger: "blur" }
        ],
        createUser: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        updateUser: [
          { required: true, message: "更新人不能为空", trigger: "blur" }
        ],
        drugName1: [
          { required: true, message: "成分名称A不能为空", trigger: "change" }
        ],
        drugName2: [
          { required: true, message: "成分名称B不能为空", trigger: "change" }
        ],
        levelType: [
          { required: true, message: "配伍等级类型不能为空", trigger: "change" }
        ],
        level: [
          { required: true, message: "配伍风险等级不能为空", trigger: "blur" }
        ],
        notice: [
          { required: true, message: "提示信息不能为空", trigger: "blur" }
        ],
        evidence: [
          { required: true, message: "循证内容不能为空", trigger: "blur" }
        ],
        isDel: [
          { required: true, message: "软删除标识不能为空", trigger: "blur" }
        ],
        updaterId: [
          { required: true, message: "数据更新人id不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getComponentsList();
  },
  methods: {
    getComponentsList() {
      getComponents().then(response => {
        this.componentsList = response.data;
      });
    },
    /** 查询配伍禁忌数据列表 */
    getList() {
      this.loading = true;
      listCompatibility(this.queryParams).then(response => {
        this.compatibilityList = response.rows;
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
        drugId1: null,
        drugId2: null,
        createUser: null,
        updateUser: null,
        drugName1: null,
        drugName2: null,
        levelType: null,
        level: null,
        notice: null,
        evidence: null,
        isDel: null,
        updaterId: null,
        createTime: null,
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
      this.title = "添加配伍禁忌数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCompatibility(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改配伍禁忌数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCompatibility(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCompatibility(this.form).then(response => {
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
      this.$confirm('是否确认删除配伍禁忌数据编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCompatibility(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('lkai-rud/compatibility/export', {
        ...this.queryParams
      }, `rud_compatibility.xlsx`)
    }
  }
};
</script>
