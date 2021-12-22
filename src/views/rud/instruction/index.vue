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
      <el-form-item label="商品名" prop="spm">
        <el-input
          v-model="queryParams.spm"
          placeholder="请输入商品名"
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
          v-hasPermi="['instruction:instruction:add']"
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
          v-hasPermi="['instruction:instruction:edit']"
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
          v-hasPermi="['instruction:instruction:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['instruction:instruction:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="instructionList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="说明书ID" align="center" prop="id" />-->
<!--      <el-table-column label="成分ID" align="center" prop="componentIds" />-->
<!--      <el-table-column label="通用名ID" align="center" prop="tymId" />-->
<!--      <el-table-column label="通用名" align="center" prop="tym" />-->
      <el-table-column label="药品名称" align="center" prop="ypmc" />
      <el-table-column label="批准文号" align="center" prop="pzwh" />
      <el-table-column label="厂家" align="center" prop="cj" />
      <el-table-column label="剂型" align="center" prop="jx" />
      <el-table-column label="规格" align="center" prop="gg" />
      <el-table-column label="核准修订日期" align="center" prop="hzxdrq" />
      <el-table-column label="警告" align="center" prop="jg" />
      <el-table-column label="商品名" align="center" prop="spm" />
      <el-table-column label="英文名" align="center" prop="ywm" />
<!--      <el-table-column label="成分" align="center" prop="cf" />-->
      <el-table-column label="性状" align="center" prop="xz" />
<!--      <el-table-column label="作用类别" align="center" prop="zylb" />-->
<!--      <el-table-column label="放射性核素半衰期" align="center" prop="fsxhsbsq" />-->
<!--      <el-table-column label="放射性活度和标示时间" align="center" prop="fsxhdhbssj" />-->
<!--      <el-table-column label="适应症" align="center" prop="syz" />-->
<!--      <el-table-column label="用法用量" align="center" prop="yfyl" />-->
<!--      <el-table-column label="不良反应" align="center" prop="blfy" />-->
<!--      <el-table-column label="禁忌" align="center" prop="jj" />-->
<!--      <el-table-column label="注意事项" align="center" prop="zysx" />-->
<!--      <el-table-column label="妊娠及哺乳" align="center" prop="rsjbr" />-->
<!--      <el-table-column label="儿童用药" align="center" prop="etyy" />-->
<!--      <el-table-column label="老年用药" align="center" prop="lnyy" />-->
<!--      <el-table-column label="肝损伤患者" align="center" prop="gsshz" />-->
<!--      <el-table-column label="肾损伤患者" align="center" prop="ssshz" />-->
<!--      <el-table-column label="药物相互作用" align="center" prop="ywxhzy" />-->
<!--      <el-table-column label="药物过量" align="center" prop="ywgl" />-->
<!--      <el-table-column label="临床试验" align="center" prop="lcsy" />-->
<!--      <el-table-column label="药理毒理" align="center" prop="yldl" />-->
<!--      <el-table-column label="药代动力学" align="center" prop="yddlx" />-->
<!--      <el-table-column label="贮藏" align="center" prop="zc" />-->
<!--      <el-table-column label="包装" align="center" prop="bz" />-->
<!--      <el-table-column label="执行标准" align="center" prop="zxbz" />-->
<!--      <el-table-column label="有效期" align="center" prop="yxq" />-->
<!--      <el-table-column label="生产企业信息" align="center" prop="scqyxx" />-->
<!--      <el-table-column label="附件勘误" align="center" prop="fjkw" />-->
<!--      <el-table-column label="保留字，无意义" align="center" prop="secretCode" />-->
      <el-table-column label="创建人" align="center" prop="createUser" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新人" align="center" prop="updateUser" />
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="useagedEdit(scope.row)"
            v-hasPermi="['lkai-rud:ruleusage:edit']"
          >用法用量</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['instruction:instruction:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['instruction:instruction:remove']"
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

    <!--用法用量修改-->
    <el-dialog :title="title" :visible.sync="openUsage" width="500px" fullscreen="true"  append-to-body>
      <el-form ref="formUsage" :model="formUsage" :rules="rules" label-width="80px">
        <el-form-item label="药品名称" prop="drugName">
          <el-input v-model="formUsage.drugName" placeholder="请输入药品名称" />
        </el-form-item>
        <el-form-item label="药品给药途径" prop="drugRoute">
          <el-select v-model="formUsage.drugRoute" placeholder="请选择药品给药途径">
            <el-option
              v-for="dict in drugRouteOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则类型" prop="routeType">
          <el-select v-model="formUsage.routeType" placeholder="请选择规则类型">
            <el-option
              v-for="dict in routeTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明书记要(循证)" prop="evidence">
          <el-input v-model="formUsage.evidence" type="textarea" placeholder="请输入内容" />
        </el-form-item>

        <el-form-item label="频次时间周期上限" prop="frequencyTimeMax">
          <el-input v-model="formUsage.frequencyTimeMax" placeholder="请输入频次时间周期上限" />
        </el-form-item>
        <el-form-item label="频次时间周期下限" prop="frequencyTimeMin">
          <el-input v-model="formUsage.frequencyTimeMin" placeholder="请输入频次时间周期下限" />
        </el-form-item>
        <el-form-item label="频次时间单位" prop="frequencyUnit">
          <el-input v-model="formUsage.frequencyUnit" placeholder="请输入频次时间单位" />
        </el-form-item>
        <el-form-item label="最小次数" prop="frequencyMin">
          <el-input v-model="formUsage.frequencyMin" placeholder="请输入最小次数" />
        </el-form-item>
        <el-form-item label="最大次数" prop="frequencyMax">
          <el-input v-model="formUsage.frequencyMax" placeholder="请输入最大次数" />
        </el-form-item>
        <el-form-item label="单次最小剂量" prop="onceMin">
          <el-input v-model="formUsage.onceMin" placeholder="请输入单次最小剂量" />
        </el-form-item>
        <el-form-item label="单次最大剂量" prop="onceMax">
          <el-input v-model="formUsage.onceMax" placeholder="请输入单次最大剂量" />
        </el-form-item>
        <el-form-item label="单次常规单位" prop="onceUnit">
          <el-input v-model="formUsage.onceUnit" placeholder="请输入单次常规单位" />
        </el-form-item>

        <el-form-item label="单日最小剂量" prop="dayMin">
          <el-input v-model="formUsage.dayMin" placeholder="请输入单日最小剂量" />
        </el-form-item>
        <el-form-item label="单日最大剂量" prop="dayMax">
          <el-input v-model="formUsage.dayMax" placeholder="请输入单日最大剂量" />
        </el-form-item>
        <el-form-item label="单日剂量单位" prop="dayUnit">
          <el-input v-model="formUsage.dayUnit" placeholder="请输入单日剂量单位" />
        </el-form-item>
        <el-form-item label="单次极量" prop="onceTop">
          <el-input v-model="formUsage.onceTop" placeholder="请输入单次极量" />
        </el-form-item>
        <el-form-item label="单日极量" prop="dayTop">
          <el-input v-model="formUsage.dayTop" placeholder="请输入单日极量" />
        </el-form-item>
        <el-form-item label="单次单日极量单位" prop="topUnit">
          <el-input v-model="formUsage.topUnit" placeholder="请输入单次单日极量单位" />
        </el-form-item>
        <el-form-item label="疗程下限" prop="courseMin">
          <el-input v-model="formUsage.courseMin" placeholder="请输入疗程下限" />
        </el-form-item>
        <el-form-item label="疗程上限" prop="courseMax">
          <el-input v-model="formUsage.courseMax" placeholder="请输入疗程上限" />
        </el-form-item>
        <el-form-item label="疗程单位" prop="courseUnit">
          <el-input v-model="formUsage.courseUnit" placeholder="请输入疗程单位" />
        </el-form-item>
        <el-form-item label="年龄下限" prop="ageMin">
          <el-input v-model="formUsage.ageMin" placeholder="请输入年龄下限" />
        </el-form-item>
        <el-form-item label="年龄上限" prop="ageMax">
          <el-input v-model="formUsage.ageMax" placeholder="请输入年龄上限" />
        </el-form-item>
        <el-form-item label="年龄单位" prop="ageUnit">
          <el-input v-model="formUsage.ageUnit" placeholder="请输入年龄单位" />
        </el-form-item>
        <el-form-item label="年龄类型" prop="ageType">
          <el-select v-model="formUsage.ageType" placeholder="请选择年龄类型： 儿童、成人、老人">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="风险分值" prop="score">
          <el-input v-model="formUsage.score" placeholder="请输入风险分值" />
        </el-form-item>
        <el-form-item label="询证来源" prop="source">
          <el-input v-model="formUsage.source" placeholder="请输入询证来源" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormUsage">确 定</el-button>
        <el-button @click="cancel1">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改说明书维护对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px"  fullscreen="true" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
<!--        <el-form-item label="成分ID" prop="componentIds">-->
<!--          <el-input v-model="form.componentIds" placeholder="请输入成分ID" />-->
<!--        </el-form-item>-->
        <el-form-item label="批准文号" prop="pzwh">
          <el-input v-model="form.pzwh" placeholder="请输入批准文号" />
        </el-form-item>
        <el-form-item label="药品名称" prop="ypmc">
          <el-input v-model="form.ypmc" placeholder="请输入药品名称" />
        </el-form-item>
        <el-form-item label="厂家" prop="cj">
          <el-input v-model="form.cj" placeholder="请输入厂家" />
        </el-form-item>
        <el-form-item label="剂型" prop="jx">
          <el-input v-model="form.jx" placeholder="请输入剂型" />
        </el-form-item>
        <el-form-item label="规格" prop="gg">
          <el-input v-model="form.gg" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="核准修订日期" prop="hzxdrq">
          <el-input v-model="form.hzxdrq" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="警告" prop="jg">
          <el-input v-model="form.jg" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="商品名" prop="spm">
          <el-input v-model="form.spm" placeholder="请输入商品名" />
        </el-form-item>
        <el-form-item label="英文名" prop="ywm">
          <el-input v-model="form.ywm" placeholder="请输入英文名" />
        </el-form-item>
        <el-form-item label="成分" prop="cf">
          <el-input v-model="form.cf" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="性状" prop="xz">
          <el-input v-model="form.xz" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="作用类别" prop="zylb">
          <el-input v-model="form.zylb" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="放射性核素半衰期" prop="fsxhsbsq">
          <el-input v-model="form.fsxhsbsq" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="放射性活度和标示时间" prop="fsxhdhbssj">
          <el-input v-model="form.fsxhdhbssj" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="适应症" prop="syz">
          <el-input v-model="form.syz" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="用法用量" prop="yfyl">
          <el-input v-model="form.yfyl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="不良反应" prop="blfy">
          <el-input v-model="form.blfy" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="禁忌" prop="jj">
          <el-input v-model="form.jj" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="注意事项" prop="zysx">
          <el-input v-model="form.zysx" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="妊娠及哺乳" prop="rsjbr">
          <el-input v-model="form.rsjbr" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="儿童用药" prop="etyy">
          <el-input v-model="form.etyy" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="老年用药" prop="lnyy">
          <el-input v-model="form.lnyy" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="肝损伤患者" prop="gsshz">
          <el-input v-model="form.gsshz" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="肾损伤患者" prop="ssshz">
          <el-input v-model="form.ssshz" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="药物相互作用" prop="ywxhzy">
          <el-input v-model="form.ywxhzy" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="药物过量" prop="ywgl">
          <el-input v-model="form.ywgl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="临床试验" prop="lcsy">
          <el-input v-model="form.lcsy" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="药理毒理" prop="yldl">
          <el-input v-model="form.yldl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="药代动力学" prop="yddlx">
          <el-input v-model="form.yddlx" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="贮藏" prop="zc">
          <el-input v-model="form.zc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="包装" prop="bz">
          <el-input v-model="form.bz" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="执行标准" prop="zxbz">
          <el-input v-model="form.zxbz" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="有效期" prop="yxq">
          <el-input v-model="form.yxq" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="生产企业信息" prop="scqyxx">
          <el-input v-model="form.scqyxx" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="附件勘误" prop="fjkw">
          <el-input v-model="form.fjkw" type="textarea" placeholder="请输入内容" />
        </el-form-item>
<!--        <el-form-item label="保留字，无意义" prop="secretCode">-->
<!--          <el-input v-model="form.secretCode" placeholder="请输入保留字，无意义" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="数据版本号" prop="versionNum">-->
<!--          <el-input v-model="form.versionNum" placeholder="请输入数据版本号" />-->
<!--        </el-form-item>-->
        <el-form-item label="备注" prop="comment">
          <el-input v-model="form.comment" type="textarea" placeholder="请输入内容" />
        </el-form-item>
<!--        <el-form-item label="对码次数" prop="useTimes">-->
<!--          <el-input v-model="form.useTimes" placeholder="请输入对码次数" />-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listInstruction,getInstruction, delInstruction, addInstruction, updateInstruction} from "@/api/rud/instruction/instruction";
import { listRuleusage, getRuleusage, delRuleusage, addRuleusage, updateRuleusage,getRuleusage1 } from "@/api/rud/rule/ruleusage";

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
      // 说明书维护表格数据
      instructionList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      openUsage: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        pzwh: null,
        ypmc: null,
        spm: null,
        versionNum: null,
        comment: null,
        useTimes: null
      },
      // 表单参数
      form: {},
      formUsage: {},
      // 药品给药途径字典
      drugRouteOptions: [],
      // 规则类型   口服/注射/外用字典
      routeTypeOptions: [],
      // 表单校验
      rules: {
        componentIds: [
          { required: true, message: "成分ID不能为空", trigger: "blur" }
        ],
        tymId: [
          { required: true, message: "通用名ID不能为空", trigger: "blur" }
        ],
        tym: [
          { required: true, message: "通用名不能为空", trigger: "blur" }
        ],
        pzwh: [
          { required: true, message: "批准文号不能为空", trigger: "blur" }
        ],
        ypmc: [
          { required: true, message: "药品名称不能为空", trigger: "blur" }
        ],
        cj: [
          { required: true, message: "厂家不能为空", trigger: "blur" }
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
          { required: true, message: "用法用量不能为空", trigger: "blur" }
        ],
        blfy: [
          { required: true, message: "不良反应不能为空", trigger: "blur" }
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
        ],
        ssshz: [
          { required: true, message: "肾损伤患者不能为空", trigger: "blur" }
        ],
        ywxhzy: [
          { required: true, message: "药物相互作用不能为空", trigger: "blur" }
        ],
        ywgl: [
          { required: true, message: "药物过量不能为空", trigger: "blur" }
        ],
        lcsy: [
          { required: true, message: "临床试验不能为空", trigger: "blur" }
        ],
        yldl: [
          { required: true, message: "药理毒理不能为空", trigger: "blur" }
        ],
        yddlx: [
          { required: true, message: "药代动力学不能为空", trigger: "blur" }
        ],
        zc: [
          { required: true, message: "贮藏不能为空", trigger: "blur" }
        ],
        bz: [
          { required: true, message: "包装不能为空", trigger: "blur" }
        ],
        zxbz: [
          { required: true, message: "执行标准不能为空", trigger: "blur" }
        ],
        yxq: [
          { required: true, message: "有效期不能为空", trigger: "blur" }
        ],
        scqyxx: [
          { required: true, message: "生产企业信息不能为空", trigger: "blur" }
        ],
        fjkw: [
          { required: true, message: "附件勘误不能为空", trigger: "blur" }
        ],
        secretCode: [
          { required: true, message: "保留字，无意义不能为空", trigger: "blur" }
        ],
        createUser: [
          { required: true, message: "数据创建人人不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateUser: [
          { required: true, message: "数据更新人id不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        versionNum: [
          { required: true, message: "数据版本号不能为空", trigger: "blur" }
        ],
        comment: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        useTimes: [
          { required: true, message: "对码次数不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_drugRoute_type").then(response => {
      this.drugRouteOptions = response.data;
    });
    this.getDicts("sys_route_type").then(response => {
      this.routeTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询说明书维护列表 */
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

    // 取消按钮
    cancel1() {
      this.openUsage = false;
      this.reset1();
    },

    reset1() {
      this.formUsage = {
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
    // 表单重置
    reset() {
      this.form = {
        id: null,
        componentIds: null,
        tymId: null,
        tym: null,
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
        blfy: null,
        jj: null,
        zysx: null,
        rsjbr: null,
        etyy: null,
        lnyy: null,
        gsshz: null,
        ssshz: null,
        ywxhzy: null,
        ywgl: null,
        lcsy: null,
        yldl: null,
        yddlx: null,
        zc: null,
        bz: null,
        zxbz: null,
        yxq: null,
        scqyxx: null,
        fjkw: null,
        secretCode: null,
        createUser: null,
        createTime: null,
        updateUser: null,
        updateTime: null,
        versionNum: null,
        comment: null,
        useTimes: null
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

    /** 用法用量按钮操作 */
    useagedEdit(row) {
      this.reset1();
      const id = row.id || this.ids
      getRuleusage1(id).then(response => {
        this.formUsage = response.data;
        this.openUsage = true;
        this.title = "修改用法用量";
      });
    },

    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加说明书维护";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getInstruction(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改说明书维护";
      });
    },

    /** 用法用量提交按钮 */
    submitFormUsage() {
      this.$refs["formUsage"].validate(valid => {
        if (valid) {
          if (this.formUsage.id != null) {
            updateRuleusage(this.formUsage).then(response => {
              this.msgSuccess("修改成功");
              this.openUsage = false;
              this.getList();
            });
          }
        }
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
      this.$confirm('是否确认删除说明书维护编号为"' + ids + '"的数据项?', "警告", {
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
      this.download('lkai-rud/instruction/export', {
        ...this.queryParams
      }, `instruction_instruction.xlsx`)
    }
  }
};
</script>
