<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
<!--      <el-form-item label="成分1ID" prop="drugId1">-->
<!--        <el-input-->
<!--          v-model="queryParams.drugId1"-->
<!--          placeholder="请输入成分1ID"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="成分2ID" prop="drugId2">-->
<!--        <el-input-->
<!--          v-model="queryParams.drugId2"-->
<!--          placeholder="请输入成分2ID"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="成分1名称" prop="drugName1">-->
<!--        <el-select v-model="queryParams.drugName1" placeholder="请选择成分1名称" clearable size="small">-->
<!--          <el-option label="请选择字典生成" value="" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="成分2名称" prop="drugName2">-->
<!--        <el-select v-model="queryParams.drugName2" placeholder="请选择成分2名称" clearable size="small">-->
<!--          <el-option label="请选择字典生成" value="" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="成分1名称" prop="drugName1">
        <el-select v-model="queryParams.drugName1" filterable placeholder="请选择成分1名称" clearable size="small">
          <el-option
            v-for="dict in interactionLabelList"
            :key="dict.id"
            :label="dict.componentName"
            :value="dict.componentName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="成分2名称" prop="drugName2">
        <el-select v-model="queryParams.drugName2" filterable placeholder="请选择成分2名称" clearable size="small">
          <el-option
            v-for="dict in interactionLabelList"
            :key="dict.id"
            :label="dict.componentName"
            :value="dict.componentName"
          ></el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="成分1类别" prop="class1">-->
<!--        <el-input-->
<!--          v-model="queryParams.class1"-->
<!--          placeholder="请输入成分1类别"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="成分2类别" prop="class2">-->
<!--        <el-input-->
<!--          v-model="queryParams.class2"-->
<!--          placeholder="请输入成分2类别"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="风险等级代码" prop="levelType">-->
<!--        <el-select v-model="queryParams.levelType" placeholder="请选择风险等级代码" clearable size="small">-->
<!--          <el-option label="请选择字典生成" value="" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="风险等级名称" prop="level">
        <el-input
          v-model="queryParams.level"
          placeholder="请输入风险等级名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="状态" prop="isDel">-->
<!--        <el-input-->
<!--          v-model="queryParams.isDel"-->
<!--          placeholder="请输入状态"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="更新人ID" prop="updaterId">-->
<!--        <el-input-->
<!--          v-model="queryParams.updaterId"-->
<!--          placeholder="请输入更新人ID"-->
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
          v-hasPermi="['rud:interaction:add']"
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
<!--          v-hasPermi="['rud:interaction:edit']"-->
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
<!--          v-hasPermi="['rud:interaction:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['rud:interaction:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="interactionList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="更新人" align="center" prop="id" />
      <el-table-column label="成分1ID" align="center" prop="drugId1" />
      <el-table-column label="成分2ID" align="center" prop="drugId2" />
      <el-table-column label="成分1名称" align="center" prop="drugName1" />
      <el-table-column label="成分2名称" align="center" prop="drugName2" />
      <el-table-column label="成分1类别" align="center" prop="class1" />
      <el-table-column label="成分2类别" align="center" prop="class2" />
      <el-table-column label="风险等级代码" align="center" prop="levelType" />
      <el-table-column label="风险等级名称" align="center" prop="level" />
      <el-table-column label="循证内容" align="center" prop="notice" />
      <el-table-column label="循证内容代码" align="center" prop="evidence" />
      <el-table-column label="状态" align="center" prop="isDel" />
      <el-table-column label="更新人ID" align="center" prop="updaterId" />
      <el-table-column label="创建人" align="center" prop="createUser" />
      <el-table-column label="更新人" align="center" prop="updateUser" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['rud:interaction:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['rud:interaction:remove']"
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

    <!-- 添加或修改西药相互作用对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
<!--        <el-form-item label="成分1ID" prop="drugId1">-->
<!--          <el-input v-model="form.drugId1" placeholder="请输入成分1ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="成分2ID" prop="drugId2">-->
<!--          <el-input v-model="form.drugId2" placeholder="请输入成分2ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="成分1名称" prop="drugName1">-->
<!--          <el-select v-model="form.drugName1" placeholder="请选择成分1名称">-->
<!--            <el-option label="请选择字典生成" value="" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="成分2名称" prop="drugName2">-->
<!--          <el-select v-model="form.drugName2" placeholder="请选择成分2名称">-->
<!--            <el-option label="请选择字典生成" value="" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->

        <el-form-item label="成分1名称" prop="drugName1">
          <el-select v-model="form.drugName1" filterable placeholder="请输入成分1名称" >
            <el-option
              v-for="dict in interactionLabelList"
              :key="dict.id"
              :label="dict.componentName"
              :value="dict.componentName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成分2名称" prop="drugName2">
          <el-select v-model="form.drugName2" filterable placeholder="请输入成分2名称" >
            <el-option
              v-for="dict in interactionLabelList"
              :key="dict.id"
              :label="dict.componentName"
              :value="dict.componentName"
            ></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="成分1类别" prop="class1">-->
<!--          <el-input v-model="form.class1" placeholder="请输入成分1类别" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="成分2类别" prop="class2">-->
<!--          <el-input v-model="form.class2" placeholder="请输入成分2类别" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="风险等级代码" prop="levelType">-->
<!--          <el-select v-model="form.levelType" placeholder="请选择风险等级代码">-->
<!--            <el-option label="请选择字典生成" value="" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="风险等级代码" prop="levelType">
          <el-input v-model="form.levelType" placeholder="请选择风险等级代码" />
        </el-form-item>
        <el-form-item label="风险等级名称" prop="level">
          <el-input v-model="form.level" placeholder="请输入风险等级名称" />
        </el-form-item>
        <el-form-item label="循证内容" prop="notice">
          <el-input v-model="form.notice" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="循证内容代码" prop="evidence">
          <el-input v-model="form.evidence" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="状态" prop="isDel">
          <el-input v-model="form.isDel" placeholder="请输入状态" />
        </el-form-item>
<!--        <el-form-item label="更新人ID" prop="updaterId">-->
<!--          <el-input v-model="form.updaterId" placeholder="请输入更新人ID" />-->
<!--        </el-form-item>-->
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
import { listInteraction, getInteraction, delInteraction, addInteraction, updateInteraction,getLabelList} from "@/api/rud/interaction/interaction";

export default {
  name: "Interaction",
  data() {
    return {
      interactionLabelList : [],
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
      // 西药相互作用表格数据
      interactionList: [],
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
        drugName1: null,
        drugName2: null,
        class1: null,
        class2: null,
        levelType: null,
        level: null,
        notice: null,
        evidence: null,
        isDel: null,
        updaterId: null,
        createUser: null,
        updateUser: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        drugId1: [
          { required: true, message: "成分1ID不能为空", trigger: "blur" }
        ],
        drugId2: [
          { required: true, message: "成分2ID不能为空", trigger: "blur" }
        ],
        drugName1: [
          { required: true, message: "成分1名称不能为空", trigger: "change" }
        ],
        drugName2: [
          { required: true, message: "成分2名称不能为空", trigger: "change" }
        ],
        class1: [
          { required: true, message: "成分1类别不能为空", trigger: "blur" }
        ],
        class2: [
          { required: true, message: "成分2类别不能为空", trigger: "blur" }
        ],
        levelType: [
          { required: true, message: "风险等级代码不能为空", trigger: "change" }
        ],
        level: [
          { required: true, message: "风险等级名称不能为空", trigger: "blur" }
        ],
        notice: [
          { required: true, message: "循证内容不能为空", trigger: "blur" }
        ],
        evidence: [
          { required: true, message: "循证内容代码不能为空", trigger: "blur" }
        ],
        isDel: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        updaterId: [
          { required: true, message: "更新人ID不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        createUser: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        updateUser: [
          { required: true, message: "更新人不能为空", trigger: "blur" }
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
        this.interactionLabelList = response.data;
      });
    },
    /** 查询西药相互作用列表 */
    getList() {
      this.loading = true;
      listInteraction(this.queryParams).then(response => {
        this.interactionList = response.rows;
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
        drugName1: null,
        drugName2: null,
        class1: null,
        class2: null,
        levelType: null,
        level: null,
        notice: null,
        evidence: null,
        isDel: null,
        updaterId: null,
        createTime: null,
        updateTime: null,
        createUser: null,
        updateUser: null
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
      this.title = "添加西药相互作用";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getInteraction(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改西药相互作用";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateInteraction(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInteraction(this.form).then(response => {
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
      this.$confirm('是否确认删除西药相互作用编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delInteraction(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('lkai-rud/interaction/export', {
        ...this.queryParams
      }, `rud_interaction.xlsx`)
    }
  }
};
</script>
