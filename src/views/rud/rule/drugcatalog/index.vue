<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
<!--      <el-form-item label="批准文号" prop="pzwh">-->
<!--        <el-input-->
<!--          v-model="queryParams.pzwh"-->
<!--          placeholder="请输入批准文号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="本位码" prop="bwm">-->
<!--        <el-input-->
<!--          v-model="queryParams.bwm"-->
<!--          placeholder="请输入本位码"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="药品名称" prop="ypmc">
        <el-input
          v-model="queryParams.ypmc"
          placeholder="请输入药品名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="商品名" prop="spm">-->
<!--        <el-input-->
<!--          v-model="queryParams.spm"-->
<!--          placeholder="请输入商品名"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="厂家" prop="cj">-->
<!--        <el-input-->
<!--          v-model="queryParams.cj"-->
<!--          placeholder="请输入厂家"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="剂型" prop="jx">-->
<!--        <el-input-->
<!--          v-model="queryParams.jx"-->
<!--          placeholder="请输入剂型"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="创建时间">-->
<!--        <el-date-picker-->
<!--          v-model="daterangeCreateTime"-->
<!--          size="small"-->
<!--          style="width: 240px"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          type="daterange"-->
<!--          range-separator="-"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--        ></el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="更新时间">-->
<!--        <el-date-picker-->
<!--          v-model="daterangeUpdateTime"-->
<!--          size="small"-->
<!--          style="width: 240px"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          type="daterange"-->
<!--          range-separator="-"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--        ></el-date-picker>-->
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
          v-hasPermi="['rud:drugcatalog:add']"
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
          v-hasPermi="['rud:drugcatalog:edit']"
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
          v-hasPermi="['rud:drugcatalog:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['rud:drugcatalog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="drugcatalogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="成分id" align="center" prop="componentIds" />
      <el-table-column label="关联说明书id" align="center" prop="insId" />
      <el-table-column label="通用名ID" align="center" prop="tymId" />
      <el-table-column label="通用名" align="center" prop="tym" />
      <el-table-column label="批准文号" align="center" prop="pzwh" />
<!--      <el-table-column label="本位码" align="center" prop="bwm" />-->
      <el-table-column label="药品名称" align="center" prop="ypmc" />
<!--      <el-table-column label="商品名" align="center" prop="spm" />-->
      <el-table-column label="厂家" align="center" prop="cj" />
<!--      <el-table-column label="剂型" align="center" prop="jx" />-->
<!--      <el-table-column label="剂型单位" align="center" prop="jxdw" />-->
<!--      <el-table-column label="剂型系数  1支5ml 系数为5" align="center" prop="jxxs" />-->
<!--      <el-table-column label="剂量单位  1支5ml 单位为ml" align="center" prop="jldw" />-->
      <el-table-column label="规格  5ml/支" align="center" prop="gg" />
<!--      <el-table-column label="包装单位" align="center" prop="bzdw" />-->
<!--      <el-table-column label="包装系数 1盒*10支  10" align="center" prop="bzxs" />-->
<!--      <el-table-column label="包装规格 1盒*10支" align="center" prop="bzgg" />-->
      <el-table-column label="是否精神药品 0否 1一类2二类" align="center" prop="isPsychotropic" />
      <el-table-column label="是否血液类药物" align="center" prop="isBlood" />
      <el-table-column label="是否基药" align="center" prop="isBase" />
      <el-table-column label="是否毒性药" align="center" prop="isTox" />
      <el-table-column label="是否激素" align="center" prop="isHormone" />
      <el-table-column label="是否终止妊娠药物" align="center" prop="isStopGestation" />
      <el-table-column label="是否抗肿瘤药" align="center" prop="isAntitumor" />
      <el-table-column label="抗菌药物等级 0非抗菌药物 1非限制2限制3特殊" align="center" prop="isAntibacterial" />
      <el-table-column label="是否麻醉药品" align="center" prop="isNarcotic" />
<!--      <el-table-column label="兴奋剂成分" align="center" prop="stimulantComponent" />-->
<!--      <el-table-column label="医保类型" align="center" prop="medicareType" />-->
<!--      <el-table-column label="处方药类型" align="center" prop="otcType" />-->
<!--      <el-table-column label="近似说明书id" align="center" prop="similarInsId" />-->
<!--      <el-table-column label="保留字，无意义" align="center" prop="secretCode" />-->
<!--      <el-table-column label="数据创建人" align="center" prop="createUser" />-->
<!--      <el-table-column label="创建时间" align="center" prop="createTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="数据更新人" align="center" prop="updateUser" />-->
<!--      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="数据版本号" align="center" prop="versionNum" />-->
<!--      <el-table-column label="对码次数" align="center" prop="useTimes" />-->
<!--      <el-table-column label="是否人工核准" align="center" prop="isConfirm">-->
<!--        <template slot-scope="scope">-->
<!--          <dict-tag :options="isConfirmOptions" :value="scope.row.isConfirm"/>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="instructionEdit(scope.row)"
            v-hasPermi="['lkai-rud:instruction:edit']"
          >说明书</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['rud:drugcatalog:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['rud:drugcatalog:remove']"
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

    <!-- 添加或修改说明书维护对话框 -->
    <el-dialog :title="title" :visible.sync="openInstrution" width="500px"  fullscreen="true" append-to-body>
      <el-form ref="formInstrution" :model="formInstrution" :rules="rules" label-width="80px">
        <!--        <el-form-item label="成分ID" prop="componentIds">-->
        <!--          <el-input v-model="form.componentIds" placeholder="请输入成分ID" />-->
        <!--        </el-form-item>-->
        <el-form-item label="批准文号" prop="pzwh">
          <el-input v-model="formInstrution.pzwh" placeholder="请输入批准文号" />
        </el-form-item>
        <el-form-item label="药品名称" prop="ypmc">
          <el-input v-model="formInstrution.ypmc" placeholder="请输入药品名称" />
        </el-form-item>
        <el-form-item label="厂家" prop="cj">
          <el-input v-model="formInstrution.cj" placeholder="请输入厂家" />
        </el-form-item>
        <el-form-item label="剂型" prop="jx">
          <el-input v-model="formInstrution.jx" placeholder="请输入剂型" />
        </el-form-item>
        <el-form-item label="规格" prop="gg">
          <el-input v-model="formInstrution.gg" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="核准修订日期" prop="hzxdrq">
          <el-input v-model="formInstrution.hzxdrq" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="警告" prop="jg">
          <el-input v-model="formInstrution.jg" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="商品名" prop="spm">
          <el-input v-model="formInstrution.spm" placeholder="请输入商品名" />
        </el-form-item>
        <el-form-item label="英文名" prop="ywm">
          <el-input v-model="formInstrution.ywm" placeholder="请输入英文名" />
        </el-form-item>
        <el-form-item label="成分" prop="cf">
          <el-input v-model="formInstrution.cf" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="性状" prop="xz">
          <el-input v-model="formInstrution.xz" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="作用类别" prop="zylb">
          <el-input v-model="formInstrution.zylb" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="放射性核素半衰期" prop="fsxhsbsq">
          <el-input v-model="formInstrution.fsxhsbsq" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="放射性活度和标示时间" prop="fsxhdhbssj">
          <el-input v-model="formInstrution.fsxhdhbssj" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="适应症" prop="syz">
          <el-input v-model="formInstrution.syz" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="用法用量" prop="yfyl">
          <el-input v-model="formInstrution.yfyl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="不良反应" prop="blfy">
          <el-input v-model="formInstrution.blfy" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="禁忌" prop="jj">
          <el-input v-model="formInstrution.jj" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="注意事项" prop="zysx">
          <el-input v-model="formInstrution.zysx" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="妊娠及哺乳" prop="rsjbr">
          <el-input v-model="formInstrution.rsjbr" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="儿童用药" prop="etyy">
          <el-input v-model="formInstrution.etyy" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="老年用药" prop="lnyy">
          <el-input v-model="formInstrution.lnyy" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="肝损伤患者" prop="gsshz">
          <el-input v-model="formInstrution.gsshz" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="肾损伤患者" prop="ssshz">
          <el-input v-model="formInstrution.ssshz" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="药物相互作用" prop="ywxhzy">
          <el-input v-model="formInstrution.ywxhzy" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="药物过量" prop="ywgl">
          <el-input v-model="formInstrution.ywgl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="临床试验" prop="lcsy">
          <el-input v-model="formInstrution.lcsy" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="药理毒理" prop="yldl">
          <el-input v-model="formInstrution.yldl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="药代动力学" prop="yddlx">
          <el-input v-model="formInstrution.yddlx" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="贮藏" prop="zc">
          <el-input v-model="formInstrution.zc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="包装" prop="bz">
          <el-input v-model="formInstrution.bz" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="执行标准" prop="zxbz">
          <el-input v-model="formInstrution.zxbz" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="有效期" prop="yxq">
          <el-input v-model="formInstrution.yxq" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="生产企业信息" prop="scqyxx">
          <el-input v-model="formInstrution.scqyxx" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="附件勘误" prop="fjkw">
          <el-input v-model="formInstrution.fjkw" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <!--        <el-form-item label="保留字，无意义" prop="secretCode">-->
        <!--          <el-input v-model="form.secretCode" placeholder="请输入保留字，无意义" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="数据版本号" prop="versionNum">-->
        <!--          <el-input v-model="form.versionNum" placeholder="请输入数据版本号" />-->
        <!--        </el-form-item>-->
        <el-form-item label="备注" prop="comment">
          <el-input v-model="formInstrution.comment" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <!--        <el-form-item label="对码次数" prop="useTimes">-->
        <!--          <el-input v-model="form.useTimes" placeholder="请输入对码次数" />-->
        <!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormInstruction">确 定</el-button>
        <el-button @click="cancel1">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改药品目录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="成分id" prop="componentIds">
          <el-input v-model="form.componentIds" placeholder="请输入成分id" />
        </el-form-item>
        <el-form-item label="关联说明书id" prop="insId">
          <el-input v-model="form.insId" placeholder="请输入关联说明书id" />
        </el-form-item>
        <el-form-item label="通用名ID" prop="tymId">
          <el-input v-model="form.tymId" placeholder="请输入通用名ID" />
        </el-form-item>
        <el-form-item label="通用名" prop="tym">
          <el-input v-model="form.tym" placeholder="请输入通用名" />
        </el-form-item>
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
        <el-form-item label="剂型系数  1支5ml 系数为5" prop="jxxs">
          <el-input v-model="form.jxxs" placeholder="请输入剂型系数  1支5ml 系数为5" />
        </el-form-item>
        <el-form-item label="剂量单位  1支5ml 单位为ml" prop="jldw">
          <el-input v-model="form.jldw" placeholder="请输入剂量单位  1支5ml 单位为ml" />
        </el-form-item>
        <el-form-item label="规格  5ml/支" prop="gg">
          <el-input v-model="form.gg" placeholder="请输入规格  5ml/支" />
        </el-form-item>
        <el-form-item label="包装单位" prop="bzdw">
          <el-input v-model="form.bzdw" placeholder="请输入包装单位" />
        </el-form-item>
        <el-form-item label="包装系数 1盒*10支  10" prop="bzxs">
          <el-input v-model="form.bzxs" placeholder="请输入包装系数 1盒*10支  10" />
        </el-form-item>
        <el-form-item label="包装规格 1盒*10支" prop="bzgg">
          <el-input v-model="form.bzgg" placeholder="请输入包装规格 1盒*10支" />
        </el-form-item>
        <el-form-item label="是否精神药品 0否 1一类2二类" prop="isPsychotropic">
          <el-input v-model="form.isPsychotropic" placeholder="请输入是否精神药品 0否 1一类2二类" />
        </el-form-item>
        <el-form-item label="是否血液类药物" prop="isBlood">
          <el-input v-model="form.isBlood" placeholder="请输入是否血液类药物" />
        </el-form-item>
        <el-form-item label="是否基药" prop="isBase">
          <el-input v-model="form.isBase" placeholder="请输入是否基药" />
        </el-form-item>
        <el-form-item label="是否毒性药" prop="isTox">
          <el-input v-model="form.isTox" placeholder="请输入是否毒性药" />
        </el-form-item>
        <el-form-item label="是否激素" prop="isHormone">
          <el-input v-model="form.isHormone" placeholder="请输入是否激素" />
        </el-form-item>
        <el-form-item label="是否终止妊娠药物" prop="isStopGestation">
          <el-input v-model="form.isStopGestation" placeholder="请输入是否终止妊娠药物" />
        </el-form-item>
        <el-form-item label="是否抗肿瘤药" prop="isAntitumor">
          <el-input v-model="form.isAntitumor" placeholder="请输入是否抗肿瘤药" />
        </el-form-item>
        <el-form-item label="抗菌药物等级 0非抗菌药物 1非限制2限制3特殊" prop="isAntibacterial">
          <el-input v-model="form.isAntibacterial" placeholder="请输入抗菌药物等级 0非抗菌药物 1非限制2限制3特殊" />
        </el-form-item>
        <el-form-item label="是否麻醉药品" prop="isNarcotic">
          <el-input v-model="form.isNarcotic" placeholder="请输入是否麻醉药品" />
        </el-form-item>
        <el-form-item label="兴奋剂成分" prop="stimulantComponent">
          <el-input v-model="form.stimulantComponent" placeholder="请输入兴奋剂成分" />
        </el-form-item>
        <el-form-item label="医保类型" prop="medicareType">
          <el-select v-model="form.medicareType" placeholder="请选择医保类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="处方药类型" prop="otcType">
          <el-select v-model="form.otcType" placeholder="请选择处方药类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="近似说明书id" prop="similarInsId">
          <el-input v-model="form.similarInsId" placeholder="请输入近似说明书id" />
        </el-form-item>
        <el-form-item label="保留字，无意义" prop="secretCode">
          <el-input v-model="form.secretCode" placeholder="请输入保留字，无意义" />
        </el-form-item>
        <el-form-item label="数据创建人" prop="createUser">
          <el-input v-model="form.createUser" placeholder="请输入数据创建人" />
        </el-form-item>
        <el-form-item label="数据更新人" prop="updateUser">
          <el-input v-model="form.updateUser" placeholder="请输入数据更新人" />
        </el-form-item>
        <el-form-item label="数据版本号" prop="versionNum">
          <el-input v-model="form.versionNum" placeholder="请输入数据版本号" />
        </el-form-item>
        <el-form-item label="对码次数" prop="useTimes">
          <el-input v-model="form.useTimes" placeholder="请输入对码次数" />
        </el-form-item>
        <el-form-item label="是否人工核准" prop="isConfirm">
          <el-select v-model="form.isConfirm" placeholder="请选择是否人工核准">
            <el-option
              v-for="dict in isConfirmOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
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
import { listDrugcatalog, getDrugcatalog, delDrugcatalog, addDrugcatalog, updateDrugcatalog } from "@/api/rud/rule/drugcatalog";
import { listInstruction,getInstruction, delInstruction, addInstruction, updateInstruction} from "@/api/rud/instruction/instruction";

export default {
  name: "Drugcatalog",
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
      drugcatalogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      openInstrution: false,
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 更新时间时间范围
      daterangeUpdateTime: [],
      // 是否人工核准字典
      isConfirmOptions: [],
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
        createTime: null,
        updateTime: null,
      },
      // 表单参数
      form: {},
      formInstrution: {},
      // 表单校验
      rules: {
        componentIds: [
          { required: true, message: "成分id不能为空", trigger: "blur" }
        ],
        insId: [
          { required: true, message: "关联说明书id不能为空", trigger: "blur" }
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
        jxxs: [
          { required: true, message: "剂型系数  1支5ml 系数为5不能为空", trigger: "blur" }
        ],
        jldw: [
          { required: true, message: "剂量单位  1支5ml 单位为ml不能为空", trigger: "blur" }
        ],
        gg: [
          { required: true, message: "规格  5ml/支不能为空", trigger: "blur" }
        ],
        bzdw: [
          { required: true, message: "包装单位不能为空", trigger: "blur" }
        ],
        bzxs: [
          { required: true, message: "包装系数 1盒*10支  10不能为空", trigger: "blur" }
        ],
        bzgg: [
          { required: true, message: "包装规格 1盒*10支不能为空", trigger: "blur" }
        ],
        isPsychotropic: [
          { required: true, message: "是否精神药品 0否 1一类2二类不能为空", trigger: "blur" }
        ],
        isBlood: [
          { required: true, message: "是否血液类药物不能为空", trigger: "blur" }
        ],
        isBase: [
          { required: true, message: "是否基药不能为空", trigger: "blur" }
        ],
        isTox: [
          { required: true, message: "是否毒性药不能为空", trigger: "blur" }
        ],
        isHormone: [
          { required: true, message: "是否激素不能为空", trigger: "blur" }
        ],
        isStopGestation: [
          { required: true, message: "是否终止妊娠药物不能为空", trigger: "blur" }
        ],
        isAntitumor: [
          { required: true, message: "是否抗肿瘤药不能为空", trigger: "blur" }
        ],
        isAntibacterial: [
          { required: true, message: "抗菌药物等级 0非抗菌药物 1非限制2限制3特殊不能为空", trigger: "blur" }
        ],
        isNarcotic: [
          { required: true, message: "是否麻醉药品不能为空", trigger: "blur" }
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
        similarInsId: [
          { required: true, message: "近似说明书id不能为空", trigger: "blur" }
        ],
        secretCode: [
          { required: true, message: "保留字，无意义不能为空", trigger: "blur" }
        ],
        createUser: [
          { required: true, message: "数据创建人不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateUser: [
          { required: true, message: "数据更新人不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        versionNum: [
          { required: true, message: "数据版本号不能为空", trigger: "blur" }
        ],
        useTimes: [
          { required: true, message: "对码次数不能为空", trigger: "blur" }
        ],
        isConfirm: [
          { required: true, message: "是否人工核准不能为空", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_is_no").then(response => {
      this.isConfirmOptions = response.data;
    });
  },
  methods: {
    /** 查询药品目录列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] = this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      if (null != this.daterangeUpdateTime && '' != this.daterangeUpdateTime) {
        this.queryParams.params["beginUpdateTime"] = this.daterangeUpdateTime[0];
        this.queryParams.params["endUpdateTime"] = this.daterangeUpdateTime[1];
      }
      listDrugcatalog(this.queryParams).then(response => {
        this.drugcatalogList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    getList1() {
      this.loading = true;
      listInstruction(this.queryParams).then(response => {
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

    // 取消按钮
    cancel1() {
      this.openInstrution = false;
      this.reset1();
    },

    reset1() {
      this.formInstrution = {
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
    // 表单重置
    reset() {
      this.form = {
        id: null,
        componentIds: null,
        insId: null,
        tymId: null,
        tym: null,
        pzwh: null,
        bwm: null,
        ypmc: null,
        spm: null,
        cj: null,
        jx: null,
        jxdw: null,
        jxxs: null,
        jldw: null,
        gg: null,
        bzdw: null,
        bzxs: null,
        bzgg: null,
        isPsychotropic: null,
        isBlood: null,
        isBase: null,
        isTox: null,
        isHormone: null,
        isStopGestation: null,
        isAntitumor: null,
        isAntibacterial: null,
        isNarcotic: null,
        stimulantComponent: null,
        medicareType: null,
        otcType: null,
        similarInsId: null,
        secretCode: null,
        createUser: null,
        createTime: null,
        updateUser: null,
        updateTime: null,
        versionNum: null,
        useTimes: null,
        isConfirm: null
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
      this.daterangeCreateTime = [];
      this.daterangeUpdateTime = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },

    /** 说明书按钮操作 */
    instructionEdit(row) {
      this.reset1();
      const id = row.insId || this.ids
      getInstruction(id).then(response => {
        this.formInstrution = response.data;
        this.openInstrution = true;
        this.title = "说明书维护";
      });
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
      getDrugcatalog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改药品目录";
      });
    },

    /** 说明书提交按钮 */
    submitFormInstruction() {
      this.$refs["formInstrution"].validate(valid => {
        if (valid) {
          if (this.formInstrution.id != null) {
            updateInstruction(this.formInstrution).then(response => {
              this.msgSuccess("修改成功");
              this.openInstrution = false;
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
            updateDrugcatalog(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDrugcatalog(this.form).then(response => {
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
          return delDrugcatalog(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('lkai-rud/drugcatalog/export', {
        ...this.queryParams
      }, `rud_drugcatalog.xlsx`)
    }
  }
};
</script>
