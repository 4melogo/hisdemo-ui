<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="批准文号" prop="pzwh">
        <el-input
          v-model="queryParams.pzwh"
          placeholder="请输入批准文号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="本位码" prop="bwm">
        <el-input
          v-model="queryParams.bwm"
          placeholder="请输入本位码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="药品名称" prop="ypmc">
        <el-input
          v-model="queryParams.ypmc"
          placeholder="请输入药品名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品名" prop="spm">
        <el-input
          v-model="queryParams.spm"
          placeholder="请输入商品名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="厂家" prop="cj">
        <el-input
          v-model="queryParams.cj"
          placeholder="请输入厂家"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="剂型" prop="jx">
        <el-input
          v-model="queryParams.jx"
          placeholder="请输入剂型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="剂型单位" prop="jxdw">
        <el-input
          v-model="queryParams.jxdw"
          placeholder="请输入剂型单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="规格" prop="gg">
        <el-input
          v-model="queryParams.gg"
          placeholder="请输入规格"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="包装单位" prop="bzdw">
        <el-input
          v-model="queryParams.bzdw"
          placeholder="请输入包装单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="包装规格" prop="bzgg">
        <el-input
          v-model="queryParams.bzgg"
          placeholder="请输入包装规格"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否基药" prop="isBase">
        <el-input
          v-model="queryParams.isBase"
          placeholder="请输入是否基药"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否毒性药" prop="isTox">
        <el-input
          v-model="queryParams.isTox"
          placeholder="请输入是否毒性药"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否麻醉药" prop="isNarcotic">
        <el-input
          v-model="queryParams.isNarcotic"
          placeholder="请输入是否麻醉药"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否精神药" prop="isPsychotropic">
        <el-input
          v-model="queryParams.isPsychotropic"
          placeholder="请输入是否精神药"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否抗肿瘤药" prop="isAntitumor">
        <el-input
          v-model="queryParams.isAntitumor"
          placeholder="请输入是否抗肿瘤药"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="兴奋剂成分" prop="stimulantComponent">
        <el-input
          v-model="queryParams.stimulantComponent"
          placeholder="请输入兴奋剂成分"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医保类型" prop="medicareType">
        <el-input
          v-model="queryParams.medicareType"
          placeholder="请输入医保类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处方药类型" prop="otcType">
        <el-input
          v-model="queryParams.otcType"
          placeholder="请输入处方药类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="成分id" prop="componentIds">
        <el-input
          v-model="queryParams.componentIds"
          placeholder="请输入成分id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联说明书id" prop="insId">
        <el-input
          v-model="queryParams.insId"
          placeholder="请输入关联说明书id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="近似说明书id" prop="similarInsId">
        <el-input
          v-model="queryParams.similarInsId"
          placeholder="请输入近似说明书id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="保留字，无意义" prop="secretCode">
        <el-input
          v-model="queryParams.secretCode"
          placeholder="请输入保留字，无意义"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数据更新人id" prop="updaterId">
        <el-input
          v-model="queryParams.updaterId"
          placeholder="请输入数据更新人id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数据版本号" prop="versionNum">
        <el-input
          v-model="queryParams.versionNum"
          placeholder="请输入数据版本号"
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
          v-hasPermi="['drug:catalog:add']"
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
          v-hasPermi="['drug:catalog:edit']"
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
          v-hasPermi="['drug:catalog:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['drug:catalog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="catalogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="数据版本号" align="center" prop="id" />
      <el-table-column label="批准文号" align="center" prop="pzwh" />
      <el-table-column label="本位码" align="center" prop="bwm" />
      <el-table-column label="药品名称" align="center" prop="ypmc" />
      <el-table-column label="商品名" align="center" prop="spm" />
      <el-table-column label="厂家" align="center" prop="cj" />
      <el-table-column label="剂型" align="center" prop="jx" />
      <el-table-column label="剂型单位" align="center" prop="jxdw" />
      <el-table-column label="规格" align="center" prop="gg" />
      <el-table-column label="包装单位" align="center" prop="bzdw" />
      <el-table-column label="包装规格" align="center" prop="bzgg" />
      <el-table-column label="是否基药" align="center" prop="isBase" />
      <el-table-column label="是否毒性药" align="center" prop="isTox" />
      <el-table-column label="是否麻醉药" align="center" prop="isNarcotic" />
      <el-table-column label="是否精神药" align="center" prop="isPsychotropic" />
      <el-table-column label="是否抗肿瘤药" align="center" prop="isAntitumor" />
      <el-table-column label="兴奋剂成分" align="center" prop="stimulantComponent" />
      <el-table-column label="医保类型" align="center" prop="medicareType" />
      <el-table-column label="处方药类型" align="center" prop="otcType" />
      <el-table-column label="成分id" align="center" prop="componentIds" />
      <el-table-column label="关联说明书id" align="center" prop="insId" />
      <el-table-column label="近似说明书id" align="center" prop="similarInsId" />
      <el-table-column label="保留字，无意义" align="center" prop="secretCode" />
      <el-table-column label="数据更新人id" align="center" prop="updaterId" />
      <el-table-column label="数据版本号" align="center" prop="versionNum" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['drug:catalog:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['drug:catalog:remove']"
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

    <!-- 添加或修改药品目录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="批准文号" prop="pzwh">
          <el-input v-model="form.pzwh" placeholder="请输入批准文号" />
        </el-form-item>
        <el-form-item label="本位码" prop="bwm">
          <el-input v-model="form.bwm" placeholder="请输入本位码" />
        </el-form-item>
        <el-form-item label="药品名称" prop="ypmc">
          <el-input v-model="form.ypmc" placeholder="请输入药品名称" />
        </el-form-item>
        <el-form-item label="商品名" prop="spm">
          <el-input v-model="form.spm" placeholder="请输入商品名" />
        </el-form-item>
        <el-form-item label="厂家" prop="cj">
          <el-input v-model="form.cj" placeholder="请输入厂家" />
        </el-form-item>
        <el-form-item label="剂型" prop="jx">
          <el-input v-model="form.jx" placeholder="请输入剂型" />
        </el-form-item>
        <el-form-item label="剂型单位" prop="jxdw">
          <el-input v-model="form.jxdw" placeholder="请输入剂型单位" />
        </el-form-item>
        <el-form-item label="规格" prop="gg">
          <el-input v-model="form.gg" placeholder="请输入规格" />
        </el-form-item>
        <el-form-item label="包装单位" prop="bzdw">
          <el-input v-model="form.bzdw" placeholder="请输入包装单位" />
        </el-form-item>
        <el-form-item label="包装规格" prop="bzgg">
          <el-input v-model="form.bzgg" placeholder="请输入包装规格" />
        </el-form-item>
        <el-form-item label="是否基药" prop="isBase">
          <el-input v-model="form.isBase" placeholder="请输入是否基药" />
        </el-form-item>
        <el-form-item label="是否毒性药" prop="isTox">
          <el-input v-model="form.isTox" placeholder="请输入是否毒性药" />
        </el-form-item>
        <el-form-item label="是否精神药" prop="isPsychotropic">
          <el-input v-model="form.isPsychotropic" placeholder="请输入是否精神药" />
        </el-form-item>
        <el-form-item label="是否抗肿瘤药" prop="isAntitumor">
          <el-input v-model="form.isAntitumor" placeholder="请输入是否抗肿瘤药" />
        </el-form-item>
        <el-form-item label="兴奋剂成分" prop="stimulantComponent">
          <el-input v-model="form.stimulantComponent" placeholder="请输入兴奋剂成分" />
        </el-form-item>
        <el-form-item label="医保类型" prop="medicareType">
          <el-input v-model="form.medicareType" placeholder="请输入医保类型"/>
        </el-form-item>
        <el-form-item label="处方药类型" prop="otcType">
          <el-input v-model="form.otcType" placeholder="请输入处方药类型"/>
        </el-form-item>
        <el-form-item label="成分id" prop="componentIds">
          <el-input v-model="form.componentIds" placeholder="请输入成分id" />
        </el-form-item>
        <el-form-item label="关联说明书id" prop="insId">
          <el-input v-model="form.insId" placeholder="请输入关联说明书id" />
        </el-form-item>
        <el-form-item label="近似说明书id" prop="similarInsId">
          <el-input v-model="form.similarInsId" placeholder="请输入近似说明书id" />
        </el-form-item>
        <el-form-item label="保留字，无意义" prop="secretCode">
          <el-input v-model="form.secretCode" placeholder="请输入保留字，无意义" />
        </el-form-item>
        <el-form-item label="数据更新人id" prop="updaterId">
          <el-input v-model="form.updaterId" placeholder="请输入数据更新人id" />
        </el-form-item>
        <el-form-item label="数据版本号" prop="versionNum">
          <el-input v-model="form.versionNum" placeholder="请输入数据版本号" />
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
import { listCatalog, getCatalog, delCatalog, addCatalog, updateCatalog } from "@/api/drug/catalog";

export default {
  name: "Catalog",
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
      // 药品目录表格数据
      catalogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        pzwh: null,
        bwm: null,
        ypmc: null,
        spm: null,
        cj: null,
        jx: null,
        jxdw: null,
        gg: null,
        bzdw: null,
        bzgg: null,
        isBase: null,
        isTox: null,
        isNarcotic: null,
        isPsychotropic: null,
        isAntitumor: null,
        stimulantComponent: null,
        medicareType: null,
        otcType: null,
        componentIds: null,
        insId: null,
        similarInsId: null,
        secretCode: null,
        updaterId: null,
        versionNum: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        pzwh: [
          { required: true, message: "批准文号不能为空", trigger: "blur" }
        ],
        bwm: [
          { required: true, message: "本位码不能为空", trigger: "blur" }
        ],
        ypmc: [
          { required: true, message: "药品名称不能为空", trigger: "blur" }
        ],
        spm: [
          { required: true, message: "商品名不能为空", trigger: "blur" }
        ],
        cj: [
          { required: true, message: "厂家不能为空", trigger: "blur" }
        ],
        jx: [
          { required: true, message: "剂型不能为空", trigger: "blur" }
        ],
        jxdw: [
          { required: true, message: "剂型单位不能为空", trigger: "blur" }
        ],
        gg: [
          { required: true, message: "规格不能为空", trigger: "blur" }
        ],
        bzdw: [
          { required: true, message: "包装单位不能为空", trigger: "blur" }
        ],
        bzgg: [
          { required: true, message: "包装规格不能为空", trigger: "blur" }
        ],
        isBase: [
          { required: true, message: "是否基药不能为空", trigger: "blur" }
        ],
        isTox: [
          { required: true, message: "是否毒性药不能为空", trigger: "blur" }
        ],
        isNarcotic: [
          { required: true, message: "是否麻醉药不能为空", trigger: "blur" }
        ],
        isPsychotropic: [
          { required: true, message: "是否精神药不能为空", trigger: "blur" }
        ],
        isAntitumor: [
          { required: true, message: "是否抗肿瘤药不能为空", trigger: "blur" }
        ],
        stimulantComponent: [
          { required: true, message: "兴奋剂成分不能为空", trigger: "blur" }
        ],
        medicareType: [
          { required: true, message: "医保类型不能为空", trigger: "change" }
        ],
        otcType: [
          { required: true, message: "处方药类型不能为空", trigger: "change" }
        ],
        componentIds: [
          { required: true, message: "成分id不能为空", trigger: "blur" }
        ],
        insId: [
          { required: true, message: "关联说明书id不能为空", trigger: "blur" }
        ],
        similarInsId: [
          { required: true, message: "近似说明书id不能为空", trigger: "blur" }
        ],
        secretCode: [
          { required: true, message: "保留字，无意义不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updaterId: [
          { required: true, message: "数据更新人id不能为空", trigger: "blur" }
        ],
        versionNum: [
          { required: true, message: "数据版本号不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询药品目录列表 */
    getList() {
      this.loading = true;
      listCatalog(this.queryParams).then(response => {
        this.catalogList = response.rows;
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
        pzwh: null,
        bwm: null,
        ypmc: null,
        spm: null,
        cj: null,
        jx: null,
        jxdw: null,
        gg: null,
        bzdw: null,
        bzgg: null,
        isBase: null,
        isTox: null,
        isNarcotic: null,
        isPsychotropic: null,
        isAntitumor: null,
        stimulantComponent: null,
        medicareType: null,
        otcType: null,
        componentIds: null,
        insId: null,
        similarInsId: null,
        secretCode: null,
        createTime: null,
        updateTime: null,
        updaterId: null,
        versionNum: null
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
      this.title = "添加药品目录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCatalog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改药品目录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCatalog(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCatalog(this.form).then(response => {
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
      this.$confirm('是否确认删除药品目录编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCatalog(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('/drug/catalog/export', {
        ...this.queryParams
      }, `drug_catalog.xlsx`)
    }
  }
};
</script>
