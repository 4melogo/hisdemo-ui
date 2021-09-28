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
      <el-form-item label="药品名称" prop="ypmc">
        <el-input
          v-model="queryParams.ypmc"
          placeholder="请输入药品名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="厂家" prop="cj">
        <el-select v-model="queryParams.cj" placeholder="请选择厂家" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
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
      <el-form-item label="规格" prop="gg">
        <el-input
          v-model="queryParams.gg"
          placeholder="请输入规格"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="核准修订日期" prop="hzxdrq">
        <el-input
          v-model="queryParams.hzxdrq"
          placeholder="请输入核准修订日期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="警告" prop="jg">
        <el-input
          v-model="queryParams.jg"
          placeholder="请输入警告"
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
      <el-form-item label="英文名" prop="ywm">
        <el-input
          v-model="queryParams.ywm"
          placeholder="请输入英文名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="成分" prop="cf">
        <el-input
          v-model="queryParams.cf"
          placeholder="请输入成分"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="性状" prop="xz">
        <el-input
          v-model="queryParams.xz"
          placeholder="请输入性状"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="作用类别" prop="zylb">
        <el-input
          v-model="queryParams.zylb"
          placeholder="请输入作用类别"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="放射性核素半衰期" prop="fsxhsbsq">
        <el-input
          v-model="queryParams.fsxhsbsq"
          placeholder="请输入放射性核素半衰期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="放射性活度和标示时间" prop="fsxhdhbssj">
        <el-input
          v-model="queryParams.fsxhdhbssj"
          placeholder="请输入放射性活度和标示时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="适应症" prop="syz">
        <el-input
          v-model="queryParams.syz"
          placeholder="请输入适应症"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用法用量" prop="yfyl">
        <el-select v-model="queryParams.yfyl" placeholder="请选择用法用量" clearable size="small">
          <el-option
            v-for="dict in yfylOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="禁忌" prop="jj">
        <el-input
          v-model="queryParams.jj"
          placeholder="请输入禁忌"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="注意事项" prop="zysx">
        <el-input
          v-model="queryParams.zysx"
          placeholder="请输入注意事项"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="妊娠及哺乳" prop="rsjbr">
        <el-input
          v-model="queryParams.rsjbr"
          placeholder="请输入妊娠及哺乳"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="儿童用药" prop="etyy">
        <el-input
          v-model="queryParams.etyy"
          placeholder="请输入儿童用药"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="老年用药" prop="lnyy">
        <el-input
          v-model="queryParams.lnyy"
          placeholder="请输入老年用药"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="肝损伤患者" prop="gsshz">
        <el-input
          v-model="queryParams.gsshz"
          placeholder="请输入肝损伤患者"
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
          v-hasPermi="['drug:instruction:add']"
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
          v-hasPermi="['drug:instruction:edit']"
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
          v-hasPermi="['drug:instruction:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['drug:instruction:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="instructionList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="肝损伤患者" align="center" prop="id" />
      <el-table-column label="批准文号" align="center" prop="pzwh" />
      <el-table-column label="药品名称" align="center" prop="ypmc" />
      <el-table-column label="厂家" align="center" prop="cj" />
      <el-table-column label="剂型" align="center" prop="jx" />
      <el-table-column label="规格" align="center" prop="gg" />
      <el-table-column label="核准修订日期" align="center" prop="hzxdrq" />
      <el-table-column label="警告" align="center" prop="jg" />
      <el-table-column label="商品名" align="center" prop="spm" />
      <el-table-column label="英文名" align="center" prop="ywm" />
      <el-table-column label="成分" align="center" prop="cf" />
      <el-table-column label="性状" align="center" prop="xz" />
      <el-table-column label="作用类别" align="center" prop="zylb" />
      <el-table-column label="放射性核素半衰期" align="center" prop="fsxhsbsq" />
      <el-table-column label="放射性活度和标示时间" align="center" prop="fsxhdhbssj" />
      <el-table-column label="适应症" align="center" prop="syz" />
      <el-table-column label="用法用量" align="center" prop="yfyl">
        <template slot-scope="scope">
          <dict-tag :options="yfylOptions" :value="scope.row.yfyl"/>
        </template>
      </el-table-column>
      <el-table-column label="禁忌" align="center" prop="jj" />
      <el-table-column label="注意事项" align="center" prop="zysx" />
      <el-table-column label="妊娠及哺乳" align="center" prop="rsjbr" />
      <el-table-column label="儿童用药" align="center" prop="etyy" />
      <el-table-column label="老年用药" align="center" prop="lnyy" />
      <el-table-column label="肝损伤患者" align="center" prop="gsshz" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['drug:instruction:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['drug:instruction:remove']"
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

    <!-- 添加或修改说明书数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="批准文号" prop="pzwh">
          <el-input v-model="form.pzwh" placeholder="请输入批准文号" />
        </el-form-item>
        <el-form-item label="药品名称" prop="ypmc">
          <el-input v-model="form.ypmc" placeholder="请输入药品名称" />
        </el-form-item>
        <el-form-item label="厂家" prop="cj">
          <el-select v-model="form.cj" placeholder="请选择厂家">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="剂型" prop="jx">
          <el-input v-model="form.jx" placeholder="请输入剂型" />
        </el-form-item>
        <el-form-item label="规格" prop="gg">
          <el-input v-model="form.gg" placeholder="请输入规格" />
        </el-form-item>
        <el-form-item label="核准修订日期" prop="hzxdrq">
          <el-input v-model="form.hzxdrq" placeholder="请输入核准修订日期" />
        </el-form-item>
        <el-form-item label="警告" prop="jg">
          <el-input v-model="form.jg" placeholder="请输入警告" />
        </el-form-item>
        <el-form-item label="商品名" prop="spm">
          <el-input v-model="form.spm" placeholder="请输入商品名" />
        </el-form-item>
        <el-form-item label="英文名" prop="ywm">
          <el-input v-model="form.ywm" placeholder="请输入英文名" />
        </el-form-item>
        <el-form-item label="成分" prop="cf">
          <el-input v-model="form.cf" placeholder="请输入成分" />
        </el-form-item>
        <el-form-item label="性状" prop="xz">
          <el-input v-model="form.xz" placeholder="请输入性状" />
        </el-form-item>
        <el-form-item label="作用类别" prop="zylb">
          <el-input v-model="form.zylb" placeholder="请输入作用类别" />
        </el-form-item>
        <el-form-item label="放射性核素半衰期" prop="fsxhsbsq">
          <el-input v-model="form.fsxhsbsq" placeholder="请输入放射性核素半衰期" />
        </el-form-item>
        <el-form-item label="放射性活度和标示时间" prop="fsxhdhbssj">
          <el-input v-model="form.fsxhdhbssj" placeholder="请输入放射性活度和标示时间" />
        </el-form-item>
        <el-form-item label="适应症" prop="syz">
          <el-input v-model="form.syz" placeholder="请输入适应症" />
        </el-form-item>
        <el-form-item label="用法用量" prop="yfyl">
          <el-select v-model="form.yfyl" placeholder="请选择用法用量">
            <el-option
              v-for="dict in yfylOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="禁忌" prop="jj">
          <el-input v-model="form.jj" placeholder="请输入禁忌" />
        </el-form-item>
        <el-form-item label="注意事项" prop="zysx">
          <el-input v-model="form.zysx" placeholder="请输入注意事项" />
        </el-form-item>
        <el-form-item label="妊娠及哺乳" prop="rsjbr">
          <el-input v-model="form.rsjbr" placeholder="请输入妊娠及哺乳" />
        </el-form-item>
        <el-form-item label="儿童用药" prop="etyy">
          <el-input v-model="form.etyy" placeholder="请输入儿童用药" />
        </el-form-item>
        <el-form-item label="老年用药" prop="lnyy">
          <el-input v-model="form.lnyy" placeholder="请输入老年用药" />
        </el-form-item>
        <el-form-item label="肝损伤患者" prop="gsshz">
          <el-input v-model="form.gsshz" placeholder="请输入肝损伤患者" />
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
import { listInstruction, getInstruction, delInstruction, addInstruction, updateInstruction } from "@/api/drug/instruction";

export default {
  name: "Instruction",
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
      // 说明书数据表格数据
      instructionList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 用法用量字典
      yfylOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        pzwh: null,
        ypmc: null,
        cj: null,
        jx: null,
        gg: null,
        hzxdrq: null,
        jg: null,
        spm: null,
        ywm: null,
        cf: null,
        xz: null,
        zylb: null,
        fsxhsbsq: null,
        fsxhdhbssj: null,
        syz: null,
        yfyl: null,
        jj: null,
        zysx: null,
        rsjbr: null,
        etyy: null,
        lnyy: null,
        gsshz: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        pzwh: [
          { required: true, message: "批准文号不能为空", trigger: "blur" }
        ],
        ypmc: [
          { required: true, message: "药品名称不能为空", trigger: "blur" }
        ],
        cj: [
          { required: true, message: "厂家不能为空", trigger: "change" }
        ],
        jx: [
          { required: true, message: "剂型不能为空", trigger: "blur" }
        ],
        gg: [
          { required: true, message: "规格不能为空", trigger: "blur" }
        ],
        hzxdrq: [
          { required: true, message: "核准修订日期不能为空", trigger: "blur" }
        ],
        jg: [
          { required: true, message: "警告不能为空", trigger: "blur" }
        ],
        spm: [
          { required: true, message: "商品名不能为空", trigger: "blur" }
        ],
        ywm: [
          { required: true, message: "英文名不能为空", trigger: "blur" }
        ],
        cf: [
          { required: true, message: "成分不能为空", trigger: "blur" }
        ],
        xz: [
          { required: true, message: "性状不能为空", trigger: "blur" }
        ],
        zylb: [
          { required: true, message: "作用类别不能为空", trigger: "blur" }
        ],
        fsxhsbsq: [
          { required: true, message: "放射性核素半衰期不能为空", trigger: "blur" }
        ],
        fsxhdhbssj: [
          { required: true, message: "放射性活度和标示时间不能为空", trigger: "blur" }
        ],
        syz: [
          { required: true, message: "适应症不能为空", trigger: "blur" }
        ],
        yfyl: [
          { required: true, message: "用法用量不能为空", trigger: "change" }
        ],
        jj: [
          { required: true, message: "禁忌不能为空", trigger: "blur" }
        ],
        zysx: [
          { required: true, message: "注意事项不能为空", trigger: "blur" }
        ],
        rsjbr: [
          { required: true, message: "妊娠及哺乳不能为空", trigger: "blur" }
        ],
        etyy: [
          { required: true, message: "儿童用药不能为空", trigger: "blur" }
        ],
        lnyy: [
          { required: true, message: "老年用药不能为空", trigger: "blur" }
        ],
        gsshz: [
          { required: true, message: "肝损伤患者不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_job_group").then(response => {
      this.yfylOptions = response.data;
    });
  },
  methods: {
    /** 查询说明书数据列表 */
    getList() {
      this.loading = true;
      listInstruction(this.queryParams).then(response => {
        this.instructionList = response.rows;
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
        ypmc: null,
        cj: null,
        jx: null,
        gg: null,
        hzxdrq: null,
        jg: null,
        spm: null,
        ywm: null,
        cf: null,
        xz: null,
        zylb: null,
        fsxhsbsq: null,
        fsxhdhbssj: null,
        syz: null,
        yfyl: null,
        jj: null,
        zysx: null,
        rsjbr: null,
        etyy: null,
        lnyy: null,
        gsshz: null
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
      this.title = "添加说明书数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getInstruction(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改说明书数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateInstruction(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInstruction(this.form).then(response => {
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
      this.$confirm('是否确认删除说明书数据编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delInstruction(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('drug/instruction/export', {
        ...this.queryParams
      }, `drug_instruction.xlsx`)
    }
  }
};
</script>