<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="120px">
<!--      <el-form-item label="药品目录ID" prop="drugId">-->
<!--        <el-input-->
<!--          v-model="queryParams.drugId"-->
<!--          placeholder="请输入药品目录ID"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="关联说明书ID" prop="insId">-->
<!--        <el-input-->
<!--          v-model="queryParams.insId"-->
<!--          placeholder="请输入关联说明书ID"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="成分ID" prop="componentId">-->
<!--        <el-input-->
<!--          v-model="queryParams.componentId"-->
<!--          placeholder="请输入成分ID"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="医院药品编码" prop="drugCode">-->
<!--        <el-input-->
<!--          v-model="queryParams.drugCode"-->
<!--          placeholder="请输入医院药品编码"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="医院" prop="hospital">
        <el-input
          v-model="queryParams.hospital"
          placeholder="请输入医院"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="对码评分" prop="hospital">
        <el-input
          v-model="queryParams.score"
          placeholder="请输入医院"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医院药品名称" prop="hospitalDrugName">
        <el-input
          v-model="queryParams.hospitalDrugName"
          placeholder="请输入医院药品名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="医院药品批准文号" prop="hospitalDrugPzwh">-->
<!--        <el-input-->
<!--          v-model="queryParams.hospitalDrugPzwh"-->
<!--          placeholder="请输入医院药品批准文号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="医院药品厂家" prop="hospitalDrugCj">-->
<!--        <el-input-->
<!--          v-model="queryParams.hospitalDrugCj"-->
<!--          placeholder="请输入医院药品厂家"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="医院药品规格" prop="hospitalDrugGg">-->
<!--        <el-input-->
<!--          v-model="queryParams.hospitalDrugGg"-->
<!--          placeholder="请输入医院药品规格"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="通用药品名称" prop="drugName">-->
<!--        <el-input-->
<!--          v-model="queryParams.drugName"-->
<!--          placeholder="请输入通用药品名称"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="通用药品规格" prop="drugPzwh">-->
<!--        <el-input-->
<!--          v-model="queryParams.drugPzwh"-->
<!--          placeholder="请输入通用药品规格"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="通用药品厂家" prop="drugCj">-->
<!--        <el-input-->
<!--          v-model="queryParams.drugCj"-->
<!--          placeholder="请输入通用药品厂家"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="通用药品规格" prop="drugGg">-->
<!--        <el-input-->
<!--          v-model="queryParams.drugGg"-->
<!--          placeholder="请输入通用药品规格"-->
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
          v-hasPermi="['domain:datamatching:add']"
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
          v-hasPermi="['domain:datamatching:edit']"
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
          v-hasPermi="['domain:datamatching:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['domain:datamatching:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="datamatchingList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="主键ID" align="center" prop="id" />-->
<!--      <el-table-column label="药品目录ID" align="center" prop="drugId" />-->
<!--      <el-table-column label="关联说明书ID" align="center" prop="insId" />-->
<!--      <el-table-column label="成分ID" align="center" prop="componentId" />-->
      <el-table-column label="医院药品编码" align="center" prop="hospitalDrugCode" />
      <el-table-column label="医院" align="center" prop="hospital" />
      <el-table-column label="医院药品名称" align="center" prop="hospitalDrugName" />
      <el-table-column label="医院药品批准文号" align="center" prop="hospitalDrugPzwh" />
      <el-table-column label="医院药品厂家" align="center" prop="hospitalDrugCj" />
      <el-table-column label="医院药品规格" align="center" prop="hospitalDrugGg" />
      <el-table-column label="通用药品名称" align="center" prop="ypmc" />
      <el-table-column label="通用药品规格" align="center" prop="pzwh" />
      <el-table-column label="通用药品厂家" align="center" prop="cj" />
      <el-table-column label="通用药品规格" align="center" prop="gg" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['domain:datamatching:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['domain:datamatching:remove']"
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

    <!-- 添加或修改标准化医院药品对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="mini" :inline="true">
<!--        <el-form-item label="药品目录ID" prop="drugId">-->
<!--          <el-input v-model="form.drugId" placeholder="请输入药品目录ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="关联说明书ID" prop="insId">-->
<!--          <el-input v-model="form.insId" placeholder="请输入关联说明书ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="成分ID" prop="componentId">-->
<!--          <el-input v-model="form.componentId" placeholder="请输入成分ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="医院药品编码" prop="hospitalDrugCode">-->
<!--          <el-input v-model="form.hospitalDrugCode" placeholder="请输入医院药品编码" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="医院" prop="hospital">-->
<!--          <el-input v-model="form.hospital" placeholder="请输入医院" />-->
<!--        </el-form-item>-->
        <el-descriptions title="医院药品信息">
          <el-descriptions-item label="药品名称">{{form.hospitalDrugName}}</el-descriptions-item>
          <el-descriptions-item label="批准文号">{{form.hospitalDrugPzwh}}</el-descriptions-item>
          <el-descriptions-item label="厂家">{{form.hospitalDrugCj}}</el-descriptions-item>
          <el-descriptions-item label="规格">{{form.hospitalDrugGg}}</el-descriptions-item>
        </el-descriptions>
<!--        <el-form-item label="医院药品名称" prop="hospitalDrugName">-->
<!--          <el-input v-model="form.hospitalDrugName" placeholder="请输入医院药品名称" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="药品批准文号" prop="hospitalDrugPzwh">-->
<!--          <el-input v-model="form.hospitalDrugPzwh" placeholder="请输入医院药品批准文号" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="医院药品厂家" prop="hospitalDrugCj">-->
<!--          <el-input v-model="form.hospitalDrugCj" placeholder="请输入医院药品厂家" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="医院药品规格" prop="hospitalDrugGg">-->
<!--          <el-input v-model="form.hospitalDrugGg" placeholder="请输入医院药品规格" />-->
<!--        </el-form-item>-->
        <el-form-item label="通用药品名称" prop="drugName">
          <el-input v-model="form.ypmc" placeholder="请输入通用药品名称" />
        </el-form-item>
        <el-form-item label="通用批准文号" prop="drugPzwh">
          <el-input v-model="form.pzwh" placeholder="请输入通用批准文号" />
        </el-form-item>
        <el-form-item label="通用药品厂家" prop="drugCj">
          <el-input v-model="form.cj" placeholder="请输入通用药品厂家" />
        </el-form-item>
        <el-form-item label="通用药品规格" prop="drugGg">
          <el-input v-model="form.gg" placeholder="请输入通用药品规格" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectDrug()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table max-height="250"
                highlight-current-row
                :data="drugInfo"
                @current-change="handleCurrentChange"
                style="width: 100%">
        <el-table-column
          prop="ypmc"
          label="药品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pzwh"
          label="批准文号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cj"
          label="厂家">
        </el-table-column>
        <el-table-column
          prop="gg"
          label="规格">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { selectDrugCatalog } from "@/api/drug/info";
import { listCheckCodeDetail, getCheckCodeDetail, delCheckCodeDetail, addCheckCodeDetail, updateCheckCodeDetail } from "@/api/datamatching/checkcodedetail";

export default {
  name: "checkcodedetail",
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
      // 标准化医院药品表格数据
      datamatchingList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      drugInfo:[],
      drugId:'',
      checkcodeId: '',
      // 查询参数
      queryParams: {
        checkcodeId: null,
        score: null,
        pageNum: 1,
        pageSize: 10,
        drugId: null,
        insId: null,
        componentId: null,
        hospitalDrugCode: null,
        hospital: null,
        hospitalDrugName: null,
        hospitalDrugPzwh: null,
        hospitalDrugCj: null,
        hospitalDrugGg: null,
        drugName: null,
        drugPzwh: null,
        drugCj: null,
        drugGg: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        drugId: [
          { required: true, message: "药品目录ID不能为空", trigger: "blur" }
        ],
        insId: [
          { required: true, message: "关联说明书ID不能为空", trigger: "blur" }
        ],
        componentId: [
          { required: true, message: "成分ID不能为空", trigger: "blur" }
        ],
        hospitalDrugCode: [
          { required: true, message: "医院药品编码不能为空", trigger: "blur" }
        ],
        hospital: [
          { required: true, message: "医院不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询标准化医院药品列表 */
    getList() {
      this.loading = true;
      console.log(this.$route.query.checkcodeId)
      if(this.$route.query.checkcodeId != undefined){
        this.queryParams.checkcodeId = this.$route.query.checkcodeId
      }
      listCheckCodeDetail(this.queryParams).then(response => {
        this.datamatchingList = response.rows;
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
        insId: null,
        componentId: null,
        hospitalDrugCode: null,
        hospital: null,
        createTime: null,
        hospitalDrugName: null,
        hospitalDrugPzwh: null,
        hospitalDrugCj: null,
        hospitalDrugGg: null,
        drugName: null,
        drugPzwh: null,
        drugCj: null,
        drugGg: null
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
      this.title = "添加标准化医院药品";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCheckCodeDetail(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改标准化医院药品";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCheckCodeDetail(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } /*else {
            addCheckCodeDetail(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }*/
        }
      });
    },
    selectDrug(){
      let param = {
        ypmc:this.form.ypmc,
        pzwh:this.form.pzwh,
        cj:this.form.cj,
        gg:this.form.gg,
      }
      selectDrugCatalog(param)
      .then(res=>{
          this.drugInfo = res.rows
      })
    },
    handleCurrentChange(currentRow,oldCurrentRow){
      console.log(currentRow)
      console.log(oldCurrentRow)
      this.form.drugId = currentRow.id
    },
    //修改医对码结果的时候，根据药品信息搜索出来相关药品
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除标准化医院药品编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCheckCodeDetail(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('domain/datamatching/export', {
        ...this.queryParams
      }, `domain_datamatching.xlsx`)
    }
  }
};
</script>
