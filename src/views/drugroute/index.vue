<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item label="对码记录ID" prop="checkcodeId">
        <el-input
          v-model="queryParams.checkcodeId"
          placeholder="请输入对码记录ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医院名称" prop="hospital">
        <el-input
          v-model="queryParams.hospital"
          placeholder="请输入医院名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医院给药途径" prop="hospitalRoute">
        <el-input
          v-model="queryParams.hospitalRoute"
          placeholder="请输入医院给药途径"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标准给药途径ID" prop="standardRouteId">
        <el-input
          v-model="queryParams.standardRouteId"
          placeholder="请输入标准给药途径ID"
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
          v-hasPermi="['drugroute:drugroute:add']"
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
          v-hasPermi="['drugroute:drugroute:edit']"
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
          v-hasPermi="['drugroute:drugroute:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['drugroute:drugroute:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="drugrouteList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="对码记录ID" align="center" prop="checkcodeId" />
      <el-table-column label="医院名称" align="center" prop="hospital" />
      <el-table-column label="医院给药途径" align="center" prop="hospitalRoute" />
      <el-table-column label="标准给药途径" align="center" prop="standardRoute" />
      <el-table-column label="给药途径分类" align="center" prop="routeType" />
      <el-table-column label="修改时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['drugroute:drugroute:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['drugroute:drugroute:remove']"
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

    <!-- 添加或修改医院给药途径标准化结果对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="对码记录ID" prop="checkcodeId">
          <el-input v-model="form.checkcodeId" placeholder="请输入对码记录ID" />
        </el-form-item>
        <el-form-item label="医院名称" prop="hospital">
          <el-input v-model="form.hospital" placeholder="请输入医院名称" />
        </el-form-item>
        <el-form-item label="真实世界医院给药途径" prop="hospitalRoute">
          <el-input v-model="form.hospitalRoute" placeholder="请输入真实世界医院给药途径" />
        </el-form-item>
        <el-form-item label="标准给药途径" prop="standardRouteId">
          <el-select v-model="form.standardRouteId"
                     filterable
                     remote
                     reserve-keyword
                     :remote-method="getDrugrouteList"
                     :loading="loadingSelect"
                     placeholder="标准给药途径">
            <el-option
              v-for="item in standardRoute"
              :key="item.id"
              :label="item.standardRoute"
              :value="item.id">
            </el-option>
          </el-select>
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
import { listDrugroute, getDrugroute, delDrugroute, addDrugroute, updateDrugroute, getRouteCatelogList } from "@/api/datamatching/drugroute";

export default {
  name: "Drugroute",
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

      loadingSelect:false,
      // 总条数
      total: 0,
      // 医院给药途径标准化结果表格数据
      drugrouteList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        checkcodeId: null,
        hospital: null,
        hospitalRoute: null,
        standardRouteId: null
      },
      // 表单参数
      form: {},
      standardRoute:[{
        standardRouteName:'',
        standardRouteId:'',
      }],
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询医院给药途径标准化结果列表 */
    getList() {
      this.loading = true;
      console.log(this.$route.query.checkcodeId)
      if(this.$route.query.checkcodeId != undefined){
        this.queryParams.checkcodeId = this.$route.query.checkcodeId
      }
      listDrugroute(this.queryParams).then(response => {
        this.drugrouteList = response.rows;
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
        checkcodeId: null,
        hospital: null,
        hospitalRoute: null,
        standardRouteId: null
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
      this.title = "添加医院给药途径标准化结果";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDrugroute(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改医院给药途径标准化结果";
      });
    },
    /** 查询修改页面的所有标准给药途径，填充下拉选 */
    getDrugrouteList(query){
      getRouteCatelogList(query).then(res=>{
        this.standardRoute = res.rows
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDrugroute(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDrugroute(this.form).then(response => {
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
      this.$confirm('是否确认删除医院给药途径标准化结果编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDrugroute(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('drugroute/drugroute/export', {
        ...this.queryParams
      }, `drugroute_drugroute.xlsx`)
    }
  }
};
</script>
