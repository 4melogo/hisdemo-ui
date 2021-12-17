<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="药品名称" prop="drugName">
        <el-input
          v-model="queryParams.drugName"
          placeholder="请输入药品名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="药品给药途径" prop="drugRoute">
        <el-select v-model="queryParams.drugRoute" placeholder="请选择药品给药途径" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="规则类型   口服/注射/外用" prop="routeType">
        <el-select v-model="queryParams.routeType" placeholder="请选择规则类型   口服/注射/外用" clearable size="small">
          <el-option
            v-for="dict in routeTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
          v-hasPermi="['lkai-rud:ruleusage:add']"
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
          v-hasPermi="['lkai-rud:ruleusage:edit']"
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
          v-hasPermi="['lkai-rud:ruleusage:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['lkai-rud:ruleusage:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="ruleusageList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="主键ID" align="center" prop="id" />-->
<!--      <el-table-column label="药品目录ID" align="center" prop="drugId" />-->
      <el-table-column label="药品名称" align="center" prop="drugName" />
<!--      <el-table-column label="通用名ID" align="center" prop="tymId" />-->
<!--      <el-table-column label="通用名" align="center" prop="tym" />-->
      <el-table-column label="药品给药途径" align="center" prop="drugRoute" />
      <el-table-column label="规则类型   口服/注射/外用" align="center" prop="routeType">
        <template slot-scope="scope">
          <dict-tag :options="routeTypeOptions" :value="scope.row.routeType"/>
        </template>
      </el-table-column>
      <el-table-column label="说明书记要(循证)" align="center" prop="evidence" />
<!--      <el-table-column label="最小次数" align="center" prop="frequencyMin" />-->
<!--      <el-table-column label="最大次数" align="center" prop="frequencyMax" />-->
<!--      <el-table-column label="频次时间周期下限" align="center" prop="frequencyTimeMin" />-->
<!--      <el-table-column label="频次时间周期上限" align="center" prop="frequencyTimeMax" />-->
<!--      <el-table-column label="频次时间单位" align="center" prop="frequencyUnit" />-->
<!--      <el-table-column label="单次最小剂量" align="center" prop="onceMin" />-->
<!--      <el-table-column label="单次最大剂量" align="center" prop="onceMax" />-->
<!--      <el-table-column label="单次常规单位" align="center" prop="onceUnit" />-->
<!--      <el-table-column label="单次极量" align="center" prop="onceTop" />-->
<!--      <el-table-column label="单日最小剂量" align="center" prop="dayMin" />-->
<!--      <el-table-column label="单日最大剂量" align="center" prop="dayMax" />-->
<!--      <el-table-column label="单日剂量单位" align="center" prop="dayUnit" />-->
<!--      <el-table-column label="单日极量" align="center" prop="dayTop" />-->
<!--      <el-table-column label="单次单日极量单位" align="center" prop="topUnit" />-->
<!--      <el-table-column label="疗程下限" align="center" prop="courseMin" />-->
<!--      <el-table-column label="疗程上限" align="center" prop="courseMax" />-->
<!--      <el-table-column label="疗程单位" align="center" prop="courseUnit" />-->
<!--      <el-table-column label="年龄下限" align="center" prop="ageMin" />-->
<!--      <el-table-column label="年龄上限" align="center" prop="ageMax" />-->
<!--      <el-table-column label="年龄单位" align="center" prop="ageUnit" />-->
      <el-table-column label="年龄范围" align="center" prop="ageGroup" />
      <el-table-column label="年龄类型" align="center" prop="ageType" />
      <el-table-column label="风险分值" align="center" prop="score" />
      <el-table-column label="询证来源" align="center" prop="source" />
      <el-table-column label="创建时间" align="center" prop="caeateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.caeateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="createUser" />
      <el-table-column label="更新时间" align="center" prop="updateTime" />
      <el-table-column label="更新人" align="center" prop="updateUser" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['lkai-rud:ruleusage:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['lkai-rud:ruleusage:remove']"
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

    <!-- 添加或修改用法用量对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" fullscreen="true"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
<!--        <el-form-item label="药品目录ID" prop="drugId">-->
<!--          <el-input v-model="form.drugId" placeholder="请输入药品目录ID" />-->
<!--        </el-form-item>-->
        <el-form-item label="药品名称" prop="drugName">
          <el-input v-model="form.drugName" placeholder="请输入药品名称" />
        </el-form-item>
<!--        <el-form-item label="通用名ID" prop="tymId">-->
<!--          <el-input v-model="form.tymId" placeholder="请输入通用名ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="通用名" prop="tym">-->
<!--          <el-input v-model="form.tym" placeholder="请输入通用名" />-->
<!--        </el-form-item>-->
        <el-form-item label="药品给药途径" prop="drugRoute">
          <el-select v-model="form.drugRoute" placeholder="请选择药品给药途径">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="规则类型" prop="routeType">
          <el-select v-model="form.routeType" placeholder="请选择规则类型">
            <el-option
              v-for="dict in routeTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明书记要(循证)" prop="evidence">
          <el-input v-model="form.evidence" type="textarea" placeholder="请输入内容" />
        </el-form-item>

        <el-form-item label="频次时间周期上限" prop="frequencyTimeMax">
          <el-input v-model="form.frequencyTimeMax" placeholder="请输入频次时间周期上限" />
        </el-form-item>
        <el-form-item label="频次时间周期下限" prop="frequencyTimeMin">
          <el-input v-model="form.frequencyTimeMin" placeholder="请输入频次时间周期下限" />
        </el-form-item>
        <el-form-item label="频次时间单位" prop="frequencyUnit">
          <el-input v-model="form.frequencyUnit" placeholder="请输入频次时间单位" />
        </el-form-item>
        <el-form-item label="最小次数" prop="frequencyMin">
          <el-input v-model="form.frequencyMin" placeholder="请输入最小次数" />
        </el-form-item>
        <el-form-item label="最大次数" prop="frequencyMax">
          <el-input v-model="form.frequencyMax" placeholder="请输入最大次数" />
        </el-form-item>
        <el-form-item label="单次最小剂量" prop="onceMin">
          <el-input v-model="form.onceMin" placeholder="请输入单次最小剂量" />
        </el-form-item>
        <el-form-item label="单次最大剂量" prop="onceMax">
          <el-input v-model="form.onceMax" placeholder="请输入单次最大剂量" />
        </el-form-item>
        <el-form-item label="单次常规单位" prop="onceUnit">
          <el-input v-model="form.onceUnit" placeholder="请输入单次常规单位" />
        </el-form-item>

        <el-form-item label="单日最小剂量" prop="dayMin">
          <el-input v-model="form.dayMin" placeholder="请输入单日最小剂量" />
        </el-form-item>
        <el-form-item label="单日最大剂量" prop="dayMax">
          <el-input v-model="form.dayMax" placeholder="请输入单日最大剂量" />
        </el-form-item>
        <el-form-item label="单日剂量单位" prop="dayUnit">
          <el-input v-model="form.dayUnit" placeholder="请输入单日剂量单位" />
        </el-form-item>
        <el-form-item label="单次极量" prop="onceTop">
          <el-input v-model="form.onceTop" placeholder="请输入单次极量" />
        </el-form-item>
        <el-form-item label="单日极量" prop="dayTop">
          <el-input v-model="form.dayTop" placeholder="请输入单日极量" />
        </el-form-item>
        <el-form-item label="单次单日极量单位" prop="topUnit">
          <el-input v-model="form.topUnit" placeholder="请输入单次单日极量单位" />
        </el-form-item>
        <el-form-item label="疗程下限" prop="courseMin">
          <el-input v-model="form.courseMin" placeholder="请输入疗程下限" />
        </el-form-item>
        <el-form-item label="疗程上限" prop="courseMax">
          <el-input v-model="form.courseMax" placeholder="请输入疗程上限" />
        </el-form-item>
        <el-form-item label="疗程单位" prop="courseUnit">
          <el-input v-model="form.courseUnit" placeholder="请输入疗程单位" />
        </el-form-item>
        <el-form-item label="年龄下限" prop="ageMin">
          <el-input v-model="form.ageMin" placeholder="请输入年龄下限" />
        </el-form-item>
        <el-form-item label="年龄上限" prop="ageMax">
          <el-input v-model="form.ageMax" placeholder="请输入年龄上限" />
        </el-form-item>
        <el-form-item label="年龄单位" prop="ageUnit">
          <el-input v-model="form.ageUnit" placeholder="请输入年龄单位" />
        </el-form-item>
        <el-form-item label="年龄类型" prop="ageType">
          <el-select v-model="form.ageType" placeholder="请选择年龄类型： 儿童、成人、老人">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="风险分值" prop="score">
          <el-input v-model="form.score" placeholder="请输入风险分值" />
        </el-form-item>
        <el-form-item label="询证来源" prop="source">
          <el-input v-model="form.source" placeholder="请输入询证来源" />
        </el-form-item>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { listRuleusage, getRuleusage, delRuleusage, addRuleusage, updateRuleusage } from "@/api/rud/rule/ruleusage";

export default {
  name: "Ruleusage",
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
      // 用法用量表格数据
      ruleusageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 规则类型   口服/注射/外用字典
      routeTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        drugName: null,
        drugRoute: null,
        routeType: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_route_type").then(response => {
      this.routeTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询用法用量列表 */
    getList() {
      this.loading = true;
      listRuleusage(this.queryParams).then(response => {
        this.ruleusageList = response.rows;
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
        drugId: null,
        drugName: null,
        tymId: null,
        tym: null,
        drugRoute: null,
        routeType: null,
        evidence: null,
        frequencyMin: null,
        frequencyMax: null,
        frequencyTimeMin: null,
        frequencyTimeMax: null,
        frequencyUnit: null,
        onceMin: null,
        onceMax: null,
        onceUnit: null,
        onceTop: null,
        dayMin: null,
        dayMax: null,
        dayUnit: null,
        dayTop: null,
        topUnit: null,
        courseMin: null,
        courseMax: null,
        courseUnit: null,
        ageMin: null,
        ageMax: null,
        ageUnit: null,
        ageGroup: null,
        ageType: null,
        score: null,
        source: null,
        caeateTime: null,
        createUser: null,
        updateTime: null,
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
      this.title = "添加用法用量";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRuleusage(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用法用量";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRuleusage(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRuleusage(this.form).then(response => {
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
      this.$confirm('是否确认删除用法用量编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delRuleusage(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('lkai-rud/ruleusage/export', {
        ...this.queryParams
      }, `lkai-rud_ruleusage.xlsx`)
    }
  }
};
</script>
