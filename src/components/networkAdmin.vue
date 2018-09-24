<template>
    <div class="minR">
        <div class="total">
            <div class="r_left">
                <img src="/static/img/i_book_02.png">
                <router-link to="/network">
                    <div class="home_img">
                        <img src="../../static/img/home.png">
                    </div>
                </router-link>
                <div class="left_font">
                    <div style="width:20px;font-size: 16px;margin-left:30px;">
                        {{customerName}}
                    </div>
                    <div>
                        职位：{{roleName}}
                    </div>
                    <div>
                        部门：{{dtoName}}
                    </div>
                </div>
                <div style="position:absolute;top:0;left:12%;width:30%;height:93%;margin-top:1%;">
                    <div class="r_log">
                        <img src="/static/img/logo.jpg">
                    </div>
                    <div class="r_top1">
                        <div class="r_one">
                            <div class="one_left">
                                <Input v-model="time" :readonly="readonly">
                                <span slot="prepend">{{timeType===2?'合同生效':'备案'}}时间</span>
                                </Input>
                            </div>
                            <div class="one_right">
                                <label>{{timeType===2?'合同到期':'到期'}}时间</label>
                                <DatePicker v-model="overdueTime"  type="date" format="yyyy-MM-dd" style="float:left;width:58%;" :readonly="true"></DatePicker>
                            </div>
                        </div>

                    </div>
                    <div class="r_top1">
                        <div class="r_one1">
                            <div class="one_left1">
                                <Input v-model="recordDto.corporateName" @on-change="onChange" @on-blur="addContract('corporateName')" :readonly="readonly3">
                                <span slot="prepend">公司名称</span>
                                </Input>
                            </div>
                            <div class="span_da" v-show="span1">
                                <div class="arrow"></div>
                                <span>{{spanText1}}</span>
                            </div>
                        </div>

                        <div style="position:absolute;left:103%;color:#FA150A;" v-show="isShow">
                            该公司已备案
                        </div>
                        <div class="r_one1">
                            <div class="one_left1">
                                <Input v-model="recordDto.entryName" @on-focus="hides3 = true" @on-blur="addContract('entryName')" :readonly="true" :disabled="disabledEn">
                                <span slot="prepend">品牌或项目名</span>
                                </Input>
                            </div>
                            <div class="span_da" v-show="span2">
                                <div class="arrow"></div>
                                <span>{{spanText2}}</span>
                            </div>
                        </div>
                        <div class="r_one1">
                            <div class="one_left1">
                                <label>媒体形式</label>
                                <Select :disabled="disabled1" multiple size="small" @on-change="addContract('mediaForm')" v-model="mediaFormRecord" style="width:83.5%;height:28px;margin-bottom:5px;border:1px solid #01C675;border-radius:5px;margin-left:-5px;">
                                    <Option v-for="item in mediaFormList" :value="item.name" :key="item.code">{{ item.message }}</Option>
                                </Select>
                            </div>
                            <div class="span_da" v-show="span3">
                                <div class="arrow"></div>
                                <span>{{spanText3}}</span>
                            </div>
                        </div>
                        <div class="r_one1">
                            <div class="one_left1">
                                <Input v-model="recordDto.corporateAddress" :disabled="disabled" :readonly="readonly">
                                <span slot="prepend">公司地址</span>
                                </Input>
                            </div>
                            <div class="span_da" v-show="span4">
                                <div class="arrow"></div>
                                <span>{{spanText4}}</span>
                            </div>
                        </div>

                        <div class="r_one1">
                            <div class="one_left1">
                                <Input v-model="recordDto.projectAddress" :disabled="disabled" @on-focus="hides2 = true" @on-blur='addContract("projectAddress")' :readonly="true">
                                <span slot="prepend">项目地址</span>
                                </Input>
                            </div>
                            <div class="span_da" v-show="span5">
                                <div class="arrow"></div>
                                <span>{{spanText5}}</span>
                            </div>
                        </div>
                    </div>
                    <!--        联系方式 add           -->
                    <div class="r_but">
                        <div class="r_top2">
                            <div class="r_one1">
                                <div class="one_left1">
                                    <Input v-model="contract.contactName" :disabled="disabled" @on-blur='addContract("contactName")' :readonly="readonlyCon">
                                    <span slot="prepend">联系人</span>
                                    </Input>
                                </div>
                                <div class="span_da" v-show="span6">
                                    <div class="arrow"></div>
                                    <span>{{spanText6}}</span>
                                </div>
                            </div>
                            <div class="r_one1">
                                <div class="one_left1">
                                    <Input v-model="contract.position" :disabled="disabled" @on-blur='addContract("position")' :readonly="readonlyCon">
                                    <span slot="prepend">职位</span>
                                    </Input>
                                </div>
                                <div class="span_da" v-show="span7">
                                    <div class="arrow"></div>
                                    <span>{{spanText7}}</span>
                                </div>
                            </div>

                            <div class="r_one1">
                                <div class="one_left1">
                                    <Input v-model="contract.phone" :disabled="disabled" @on-blur="addContract('phone')" :readonly="readonlyCon">
                                    <span slot="prepend">手机</span>
                                    </Input>
                                </div>

                                <div class="span_da" v-show="span">
                                    <div class="arrow"></div>
                                    <span>{{spanText}}</span>
                                </div>

                            </div>

                            <div class="r_one1">
                                <div class="one_left1">
                                    <Input v-model="contract.qq" :disabled="disabled" @on-blur='addContract("QQ")' :readonly="readonlyCon">
                                    <span slot="prepend">QQ</span>
                                    </Input>
                                </div>
                                <div class="span_da" v-show="span8">
                                    <div class="arrow"></div>
                                    <span>{{spanText8}}</span>
                                </div>
                            </div>
                            <div class="r_one1">
                                <div class="one_left1">
                                    <Input v-model="contract.weiXin" :disabled="disabled" @on-blur='addContract("weiXin")' :readonly="readonlyCon">
                                    <span slot="prepend">微信</span>
                                    </Input>
                                </div>
                                <div class="span_da" v-show="span9">
                                    <div class="arrow"></div>
                                    <span>{{spanText9}}</span>
                                </div>

                            </div>
                            <div class="r_one1">
                                <div class="one_left1">
                                    <Input v-model="contract.landLine" :disabled="disabled" @on-blur='addContract("landLine")' :readonly="readonlyCon">
                                    <span slot="prepend">座机</span>
                                    </Input>
                                </div>
                                <div class="span_da" v-show="span10">
                                    <div class="arrow"></div>
                                    <span>{{spanText10}}</span>
                                </div>
                            </div>
                        </div>
                        <ul class="r_list">
                            <li class="r_item">
                                <div class="item_img1" @click="delect" v-show="buttonShow1">
                                </div>
                            </li>
                            <li class="r_item">
                                <div class="item_img" @click="addList" v-show="buttonShowAdd">
                                </div>
                            </li>
                            <li class="r_item1" v-for="(item,i) in navList" :key="i">
                                <div @click="chenge(i)" style="width:45px;height:40px;margin-top:-2px;">
                                    <img :src='i==index?item.img1:item.img2'>
                                    <label style="cursor: pointer;">{{i+1}}</label>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <!--            对接部门                  -->
                    <div class="r_top1">
                        <div class="r_one1">
                            <div class="one_left2">
                                <label>网络对接人</label>
                                <Select v-model="recordDto.pickUp"  filterable :loading="loading1"  @on-change='addContract("pickUp")'>
                                    <Option v-for="(option, index) in networkList" :value="option.name" :key="index">{{option.name}}</Option>
                                </Select>
                            </div>
                            <div class="span_da" v-show="span11">
                                <div class="arrow"></div>
                                <span>{{spanText11}}</span>
                            </div>
                        </div>
                        <div class="r_one1">
                            <div class="one_left2">
                                <label>网络对接部门</label>
                                <Select v-model="recordDto.docking"  filterable :loading="loading2"  @on-change='addContract("docking")'>
                                    <Option v-for="(option, index) in networkList2" :value="option.name" :key="index">{{option.name}}</Option>
                                </Select>
                            </div>
                            <div class="span_da" v-show="span12">
                                <div class="arrow"></div>
                                <span>{{spanText12}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="but_list">
                    <li>
                        <div class="div_but" @click="hides=true" v-show="buttonShow">
                            <img src="/static/img/button_03.png">
                            <span>
                                驳回原因
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="div_but" @click="hidesUpdate = true" v-if="recordStatus === 'E_recordSuccess' || recordStatus === 'A_updateTime' || isApply">
                            <img src="/static/img/button_03.png">
                            <span>
                                延期申请
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="div_but" @click="state" v-show="buttonShowSubmit">
                            <img src="/static/img/button_03.png">
                            <span>
                                提交Filling
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="div_but" @click="giveUp" v-show="buttonShow3">
                            <img src="/static/img/button_03.png">
                            <span>
                                放弃
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="div_but" @click="update" v-show="buttonShowUpdate">
                            <img src="/static/img/button_03.png">
                            <span>
                                保存
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <!--         右边内容     -->
            <div style="padding-top:3%">
                <div class="cord">
                    <div :class="isCord?'album2':'album'">
                        <div class="demo-upload-list" v-for="item in uploadList" :key="item.name">
                            <template v-if="item.status=='finished'">
                                <img :src="'/api/obs/view.json?id='+item.response.data.id">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item.response.data.id)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)" v-show="buttonShow1"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload v-show="buttonShow1" ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png','gif']" :max-size="4800000" :before-upload="handleBeforeUpload" multiple type="drag" action="/api/obs/upload.json" style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <Modal title="名片" v-model="visible">
                            <img :src="'/api/obs/view.json?id=' + imgName" v-if="visible" style="width: 100%">
                        </Modal>
                    </div>
                </div>

                <div class="textarea">
                    <Input v-model="recordDto.remarks" placeholder="备注" style="width:360px;" type="textarea" :rows="8" :disabled="disabled" :readonly="readonly"></Input>
                </div>
                <div class="pen">
                    <img src="/static/img/pen_X_03.png">
                </div>
            </div>
        </div>
        <div class="v-transfer-dom" v-show="hides">
            <div class="ivu-modal-mask">
                <Card dis-hover class="hide_div">
                    <a href="#" slot="extra" title="关闭" @click.prevent="hide">
                        <Icon type="android-close"></Icon>
                    </a>
                    <br>
                    <Tabs value="name1" v-if="rejectList.length > 0" style="height:185px;">
                        <TabPane v-for="item in rejectList" :key="item.index" :label="item.name" :name="item.name">{{item.message}}</TabPane>
                    </Tabs>
                    <div v-else>
                        暂无驳回原因
                    </div>
                </Card>
            </div>
        </div>

        <!-- 项目名称名称弹出框  -->
        <div class="v-transfer-dom" v-show="hides3">
            <div class="ivu-modal-mask">
                <Card dis-hover class="hide_div">
                    <p slot="title">
                        项目名称
                    </p>
                    <a href="#" slot="extra" title="关闭" @click.prevent="hide">
                        <Icon type="android-close"></Icon>
                    </a>
                    <div style="height:53px;">
                        <Input type="text" :readonly="readonly" @on-blur="onChange(entryName1,1)" placeholder="项目名称1" v-model="entryName1"></Input>
                        <p v-if="textHide1==1" style="color:red">该公司已备案</p>
                    </div>

                    <div style="height:53px;">
                        <Input type="text" :readonly="readonly" @on-blur="onChange(entryName2,2)" placeholder="项目名称2" v-model="entryName2"></Input>
                        <p v-if="textHide2==2" style="color:red">该公司已备案</p>
                    </div>

                    <div style="height:53px;">
                        <Input type="text" :readonly="readonly" @on-blur="onChange(entryName3,3)" placeholder="项目名称3" v-model="entryName3"></Input>
                        <p v-if="textHide3==3" style="color:red">该公司已备案</p>
                    </div>

                    <Row>
                        <Col span="4" offset="14">
                        <Button type="ghost" @click="hide">取消</Button>
                        </Col>
                        <Col span="6">
                        <Button type="primary" :loading="loading" @click="entryNameSubmit" :disabled="textDisabled">
                            <span v-if="!loading">提交</span>
                            <span v-else>提交中...</span>
                        </Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>

        <!-- 项目地址弹出框  -->
        <div class="v-transfer-dom" v-show="hides2">
            <div class="ivu-modal-mask">
                <Card dis-hover class="hide_div">
                    <p slot="title">
                        项目地址
                    </p>
                    <a href="#" slot="extra" title="关闭" @click.prevent="hide">
                        <Icon type="android-close"></Icon>
                    </a>

                    <Input type="text" :readonly="readonly" placeholder="项目地址1" v-model="corporateAddress1"></Input>
                    <br> <br>

                    <Input type="text" :readonly="readonly" placeholder="项目地址2" v-model="corporateAddress2"></Input>
                    <br> <br>
                    <Input type="text" :readonly="readonly" placeholder="项目地址3" v-model="corporateAddress3"></Input>
                    <br><br>
                    <Row>
                        <Col span="4" offset="14">
                        <Button type="ghost" @click="hide">取消</Button>
                        </Col>
                        <Col span="6">
                        <Button type="primary" :loading="loading" @click="corporateAddressSubmit">
                            <span v-if="!loading">提交</span>
                            <span v-else>提交中...</span>
                        </Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>

        <!-- 更新备案时间弹出框  -->
        <div class="v-transfer-dom" v-show="hidesUpdate">

            <div class="ivu-modal-mask">
                <Card dis-hover class="hide_div">
                    <p slot="title">
                        更新备案时间
                    </p>
                    <a href="#" slot="extra" title="关闭" @click.prevent="hidesUpdate = fasle">
                        <Icon type="android-close"></Icon>
                    </a>

                    <Row>
                        <Col>
                        <Input v-model="timeReason" :readonly="timeDis" placeholder="更新原因" style="width:100%;" type="textarea" :rows="5"></Input>
                        </Col>
                    </Row>
                    <br>
                    <Row>
                        <Col span="4" offset="14">
                        <Button type="ghost" @click="hidesUpdate = fasle">取消</Button>
                        </Col>
                        <Col span="6">
                        <Button type="primary" @click="updateTime" :disabled="timeDis">
                            <span>提交</span>
                        </Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            textHide1: 0,//隐藏公司是否备案文字
            textHide2: 0,//隐藏公司是否备案文字
            textHide3: 0,//隐藏公司是否备案文字
            textDisabled:false,//是否禁用项目名称提交按钮
            timeReason: '',//更新备案原因
            timeDis: false,//更新备案为更新时禁用
            loading: false,
            loading1: false,
            loading2: false,
            value: '',
            svalue: '',
            buttonShowUpdate: false,
            isHides: false,
            isHides1: false,
            isHides2: false,
            disabledEn: true,
            hidesUpdate: false,
            corporateAddress1: '',
            corporateAddress2: '',
            corporateAddress3: '',
            readonlyCon: false,
            navList: [{
                img1: '/static/img/numGreen.png',
                img2: '/static/img/numBack.png'
            }],
            uploadList: [],//接收名片的集合
            index: 0,
            contractList: [],   //存放联系方式的集合
            contract: { //接收联系方式的对象
                phone: "",
                weiXin: "",
                qq: "",
                position: "",
                contactName: "",
                landLine: "",
                id: "",
                isTrue: true
            },
            mediaFormList: [],
            recordDto: {    //接收表单的数据
                id: '',
                corporateName: '',  //公司名称
                corporateAddress: '',   // 公司地址
                entryName: '',          //项目名称
                projectAddress: '',     //项目地址
                customerCard: '',       //名片
                mediaForm: '',          //媒体形式
                docking: '',            //对接部门
                pickUp: "",             //对接人
                remarks: '',            //备注
                contactNumberDtos: []   //联系方式集合
            },
            mediaFormRecord: [],
            customerCardList: [],
            time: '',       //备案时间
            overdueTime: '',    //到期时间
            imgName: '',
            visible: false,
            isShow: true,
            customerName: '',
            entryName1: '',
            entryName2: '',
            entryName3: '',
            dtoName: '',
            roleName: '',
            dtoDetailDtoList: {
                dtoDetailDto: {
                    updateList: [],
                    deleteList: [],
                    insertList: []
                },
                id: '',
                corporateName: "",
                corporateAddress: '',
                entryName: '',
                projectAddress: '',
                customerCard: '',
                mediaForm: '',
                docking: '',
                pickUp: '',
                remarks: ''
            },
            recordStatus: "",
            readonly: false,
            buttonShow: true,
            buttonShow1: true,
            buttonShowAdd: true,
            rejectList: [],
            hides: false,
            hides2: false,
            hides3: false,
            disabled: false,
            disabled1: false,
            readonly3: false,
            span: false,
            span1: false,
            span2: false,
            span3: false,
            span4: false,
            span5: false,
            span6: false,
            span7: false,
            span8: false,
            span9: false,
            span10: false,
            span11: false,
            span12: false,
            spanText: '',
            spanText1: '',
            spanText2: '',
            spanText3: '',
            spanText4: '',
            spanText5: '',
            spanText6: '',
            spanText7: '',
            spanText8: '',
            spanText9: '',
            spanText10: '',
            spanText11: '',
            spanText12: '',
            timeType: 0,
            buttonShow3: false,
            networkList: [],
            networkList2: [],
            buttonShowSubmit: false,
            isCord: false,
            isApply:false
        }
    },
    mounted() {
        /**
         * 接收客户代表名
         * 职位
         * 部门
         */
        this.customerName = sessionStorage.getItem("name");
        this.roleName = sessionStorage.getItem("role");
        this.dtoName = sessionStorage.getItem("dto");

        this.getMediaForm();
        this.remoteMethod1();
        this.remoteMethod2();
        let recordStatus = sessionStorage.getItem('recordStatus');

        if (recordStatus === "E_recordSuccess") {

            this.readonlyCon = true;
        } else {

            this.readonlyCon = false;
        }

        this.uploadList = this.$refs.upload.fileList;
        let id = sessionStorage.getItem("id");
        if (id) {
            this.findByIdView();
        }
        if (id == null) {

            this.getTime();
            this.buttonShow1 = false;
            this.buttonShowAdd = false;
            this.buttonShowSubmit = false;
            this.disabled = true;
            this.disabled1 = true;
            this.isShow = false;
            return;
        }



    },
    beforeUpdate() {
        let id = sessionStorage.getItem("id");

        let isUpdate = sessionStorage.getItem('isUpdate');
        if (id) {
            this.isShow = false;
            this.disabledEn = false;
        } else {
            sessionStorage.removeItem('isUpdate');
            this.buttonShow = false;
            return;
        }
        if (isUpdate == 'false') {

            this.buttonShow1 = false;

            this.buttonShowAdd = false;
            this.readonly = true;
            this.readonlyCon = true;
            this.readonly3 = true;
            this.disabled1 = true;
            this.buttonShow = false;
            this.buttonShowSubmit = false;
            this.isCord = true;
        } else if (this.recordStatus == "A_trial" || this.recordStatus == "A_review") {
            this.readonly = true;
            this.readonlyCon = true;
            this.buttonShowAdd = false;
            this.buttonShow = false;
            this.buttonShow1 = false;
            this.buttonShowSubmit = false;
            this.disabledEn = false;
            this.disabled1 = true;
            this.readonly3 = true;
            this.buttonShow3 = false;


        } else if (this.recordStatus == "G_onRecord") {
            this.buttonShow1 = false;
            this.buttonShowAdd = false;
            this.readonly = true;
            this.readonlyCon = true;
            this.readonly3 = true;
            this.disabled1 = true;
            this.buttonShow = false;
            this.buttonShow3 = true;
            this.buttonShowSubmit = true;
            this.isCord = true;
        } else if (this.recordStatus == "E_recordSuccess" || this.recordStatus == "E_deal") {
            this.readonly = true;


            this.buttonShowUpdate = true;
            this.buttonShow1 = false;
            this.buttonShowSubmit = false;
            this.disabled1 = true;
            this.readonly3 = true;

        } else if (this.recordStatus == "") {
            this.readonly = false;
            this.readonly3 = false;
        } else if (this.recordStatus == "C_reject") {
            this.buttonShowSubmit = true;
        } else if (this.recordStatus == "C_shareReject") {
            this.buttonShowSubmit = true;
            this.buttonShow3 = true;
            this.readonly3 = true;
            this.readonly = true;
            this.readonlyCon = true;
            this.disabled1 = true;
            this.buttonShow1 = false;
            this.buttonShowAdd = false;
            this.isCord = true;
        } else if (this.recordStatus == "A_shareTrial" || this.recordStatus == "A_shareReview") {
            this.readonly = true;
            this.readonlyCon = true;
            this.buttonShow = false;
            this.buttonShow1 = false;
            this.buttonShowAdd = false;
            this.buttonShowSubmit = false;
            this.disabledEn = false;
            this.disabled1 = true;
            this.readonly3 = true;
            this.buttonShow3 = false;
            this.isCord = true;
        } else if (this.recordStatus == "A_updateTime") {
            this.timeDis = true;
            this.readonly = true;
            this.readonlyCon = true;
            this.buttonShowAdd = false;
            this.buttonShow = false;
            this.buttonShow1 = false;
            this.buttonShowSubmit = false;
            this.disabledEn = false;
            this.disabled1 = true;
            this.readonly3 = true;
            this.buttonShow3 = false;
        }


    },
    methods: {
        addList() {
            if (this.contractList[this.contractList.length - 1] != null) {
                this.chenge(this.contractList.length - 1);

            }
            var lists = ["contactName", "QQ", "position", "phone"]
            if (this.vail(lists)) {
                if (this.navList.length == 5) {
                    this.$Message.error("臣妾只能添加5个哦！ _(:3」∠)_");
                    return;
                } else {
                    this.navList.push({
                        img1: '/static/img/numGreen.png',
                        img2: '/static/img/numBack.png'
                    });
                    this.index = this.navList.length - 1;
                    this.readonlyCon = false;
                    this.contractList.push({});
                    this.clearValue();//清空數據
                }

            }
        },
        vail(values) {
            var isvalilPass = true;
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                var phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                var QQ = /^[0-9]*$/

                if (value == "corporateName") {
                    if (this.recordDto.corporateName == "") {
                        this.span1 = true;
                        this.spanText1 = "公司名称不能为空";
                        isvalilPass = false;
                    } else {
                        this.span1 = false;
                    }
                }

                let isUpdate = sessionStorage.getItem("isUpdate");
                if (isUpdate != 'false' && this.recordStatus != "G_onRecord" && this.recordStatus != "A_shareTrial" && this.recordStatus != "C_shareReject" && this.recordStatus != "A_shareReview") {
                    if (value == "QQ") {
                        if ((this.contract.qq != "" && this.contract.qq != undefined) && !QQ.test(this.contract.qq)) {
                            this.span8 = true;
                            this.spanText8 = "QQ只能为数字";
                            isvalilPass = false;
                        } else {
                            this.span8 = false;
                        }
                    }
                    if (value == "position") {
                        if (this.contract.position == "" || this.contract.position == undefined) {
                            this.span7 = true;
                            this.spanText7 = "职位不能为空";
                            isvalilPass = false;
                        } else {
                            this.span7 = false;
                        }
                    }
                    if (value == "contactName") {
                        if (this.contract.contactName == "" || this.contract.contactName == undefined) {
                            this.span6 = true;
                            this.spanText6 = "联系人不能为空";
                            isvalilPass = false;
                        } else {
                            this.span6 = false;
                        }

                    }
                    if (value == "phone") {
                        if (!phone.test(this.contract.phone)) {
                            this.span = true;
                            this.spanText = "电话号码不正确";
                            isvalilPass = false;
                        } else {
                            this.span = false;
                        }

                    }

                }

                if (value == "projectAddress") {
                    if (this.recordDto.projectAddress == "") {
                        this.span5 = true;
                        this.spanText5 = "项目地址不能为空";
                        isvalilPass = false;
                    } else {
                        this.span5 = false;
                    }
                }

                if (value == "entryName") {
                    if (this.recordDto.entryName == "") {
                        this.span2 = true;
                        this.spanText2 = "品牌或项目名不能为空";
                        isvalilPass = false;
                    } else {
                        this.span2 = false;
                    }

                }
                if (value == "corporateAddress") {
                    if (this.recordDto.corporateAddress == "") {
                        this.span4 = true;
                        this.spanText4 = "公司地址不能为空";
                        isvalilPass = false;
                    } else {
                        this.span4 = false;
                    }

                }
               
                
                                if (value == "docking") {
                                    if (this.recordDto.docking == "") {
                                        this.span12 = true;
                                        this.spanText12 = "对接部门不能为空";
                                        isvalilPass = false;
                                    } else {
                                        this.span12 = false;
                                    }
                                }

                                if (value == "pickUp") {
                                    if (this.recordDto.pickUp == "") {
                                        this.span11 = true;
                                        this.spanText11 = "对接人不能为空";
                                        isvalilPass = false;
                                    } else {
                                        this.span11 = false;
                                    }
                                }
                            

                if (value == "mediaForm") {
                    if (this.mediaFormRecord != undefined && this.mediaFormRecord.length == 0) {
                        this.span3 = true;
                        this.spanText3 = "媒体形式不能为空";
                        isvalilPass = false;
                    } else {
                        this.span3 = false;
                    }
                }
            }
            return isvalilPass;
        },
        addContract(value) {
            let arry = [value];
            this.vail(arry);
            this.contractList[this.index] = this.contract;
        },
        clearValue() {
            this.contract = {};
        },
        chenge(index) {
            var lists = ["contactName", "QQ", "position", "phone"];
            if (this.vail(lists)) {
                this.index = index;

                this.contract = this.contractList[index];

                if (this.recordStatus === 'E_recordSuccess') {


                    if (this.contractList[index].isTrue === undefined || this.contractList[index].isTrue === "undefined") {
                        this.readonlyCon = false;
                    } else {
                        this.readonlyCon = true;
                    }
                }
            }
        },
        getTime() {
            this.$axios.get('/api/front/record/getTime.json', {

            }).then(res => {
                this.time = res.data.data.time;
                this.overdueTime = res.data.data.overdueTime;

            })
        },
        create() {
            var admin = sessionStorage.getItem("admin");
            let arry = ["pickUp", "docking", "corporateAddress", "entryName", "mediaForm", "projectAddress", "contactName", "position", "corporateName", "phone", "QQ"];
            var isvali = this.vail(arry);

            if (!isvali) {
                this.$Spin.hide();
                return;
            }
            if (this.customerCardList.length <= 0 && this.recordDto.remarks == '') {

                this.$Message.error("名片和备注不能同时为空！ _(:3」∠)_");
                return;
            }

            var customerCard = "";
            for (var i = 0; i < this.customerCardList.length; i++) {
                if (i == this.customerCardList.length - 1) {
                    customerCard += this.customerCardList[i].id;
                } else {
                    customerCard += this.customerCardList[i].id + ",";
                }

            }
            this.recordDto.mediaForm = "";
            for (let i = 0; i < this.mediaFormRecord.length; i++) {
                if (i < (this.mediaFormRecord.length - 1)) {
                    this.recordDto.mediaForm += this.mediaFormRecord[i] + ',';
                } else {
                    this.recordDto.mediaForm += this.mediaFormRecord[i];
                }
                if (this.mediaFormRecord[i] == undefined) {
                    this.mediaFormRecord.splice(i, 1);
                    i = i - 1;
                }
            }

            this.recordDto.customerCard = customerCard;
            this.recordDto.contactNumberDtos = this.contractList;

            this.handleSpinCustom();
            this.$axios.post('/api/front/record/create.json',
                this.recordDto
            ).then(res => {

                if (!res.data.success) {
                    this.$Spin.hide();
                    this.$Message.error(res.data.message + "_(:3」∠)_");
                } else if (res.data.success) {
                    this.$Spin.hide();
                    this.$Message.success('提交成功');
                        this.$router.push({
                            path: '/network'
                        })
                } else {
                    this.$Message.error(res.data.message);
                }

            }).catch(error => {
                this.$Message.error('系统异常，请联系管理员');
            })
        },
        getMediaForm() {
            this.$axios.get('/api/metadata/getByEnumClassSimpleName.json', {
                params: {
                    enumClassSimpleName: "MediaForm"
                }
            }).then(res => {
                this.mediaFormList = res.data.data;
            })
        },
        handleSuccess(res) {

            this.customerCardList.push({
                id: res.data.id
            }
            );
        },
        handleView(id) {
            this.imgName = id;
            this.visible = true;
        },
        //删除上传照片
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.customerCardList.splice(this.customerCardList.indexOf(file.response.data.id), 1);
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: '最多只能上传5张名片哦   ˊ_>ˋ'
                });
            }
            return check;
        },
        inputChange(entryNameS, number) {
            var corporateName = this.recordDto.corporateName,
                entryName = this.recordDto.entryName;
            if ((corporateName == "" || entryName == "") || (corporateName != "" || entryName != "")) {// 公司名字和项目名字空不空都要调接口
                this.$axios.get('/api/front/record/findRepeatAll.json', {
                    params: {
                        corporateName: corporateName,
                        entryName: entryNameS
                    }
                }).then(res => {
                    if (res.data.data == 0 || res.data.data == null) {
                        if (number == 1)
                            this.textHide1 = 0;
                        if (number == 2)
                            this.textHide2 = 0;
                        if (number == 3)
                            this.textHide3 = 0;
                         if(this.textHide2 ==0 && this.textHide1 ==0 && this.textHide3 ==0){
                              this.textDisabled = false; 
                         } 
                    } else {
                        if (number == 1)
                            this.textHide1 = 1;
                        if (number == 2)
                            this.textHide2 = 2;
                        if (number == 3)
                            this.textHide3 = 3;
                            this.textDisabled = true;
                    }
                    //    alert(this.recordDto.corporateName + "......" +res.data.data.content[0].corporateName );自己写的傻逼代码，输入的值传过去没有相匹配的肯定是没有corporateName的撒
                    if (this.recordDto.corporateName == "") {//公司名字和项目名称有一个为空都等于false
                        this.isShow = false;
                        this.disabledEn = false;
                    } else { //什么时候都是false和除了两个能填的其他都不能填

                        this.isShow = false;
                        this.disabledEn = false;
                    }
                })
            }
        },
        inputBlur(entryNameS, number) {
            var corporateName = this.recordDto.corporateName,
                entryName = this.recordDto.entryName;
            if ((corporateName == "" || entryName == "") || (corporateName != "" || entryName != "")) {// 公司名字和项目名字空不空都要调接口
                this.$axios.get('/api/front/record/findRepeat.json', {
                    params: {
                        corporateName: corporateName,
                        entryName: entryNameS
                    }
                }).then(res => {
                     if (res.data.data == 0 || res.data.data == null) {
                        if (number == 1)
                            this.textHide1 = 0;
                        if (number == 2)
                            this.textHide2 = 0;
                        if (number == 3)
                            this.textHide3 = 0;
                             if(this.textHide2 ==0 && this.textHide1 ==0 && this.textHide3 ==0){
                              this.textDisabled = false; 
                         } 
                    } else {
                        if (number == 1)
                            this.textHide1 = 1;
                        if (number == 2)
                            this.textHide2 = 2;
                        if (number == 3)
                            this.textHide3 = 3;
                    }
                    //    alert(this.recordDto.corporateName + "......" +res.data.data.content[0].corporateName );自己写的傻逼代码，输入的值传过去没有相匹配的肯定是没有corporateName的撒
                    if (this.recordDto.corporateName == "") {//公司名字和项目名称有一个为空都等于false
                        this.isShow = false;
                        this.disabledEn = false;
                    } else { //什么时候都是false和除了两个能填的其他都不能填

                        this.isShow = false;
                        this.disabledEn = false;
                    }
                })
            }
        },
        onChange(entryNameS, number) {
            let state = sessionStorage.getItem('state');
            if (state == undefined || state == 'A_trial' || state == 'undefined') {
                this.inputChange(entryNameS, number);
            } else {
                this.inputBlur(entryNameS, number);
            }
        },
    
        entryNameSubmit() { // 验证项目名字是否有重复
            var corporateName = this.recordDto.corporateName,
                entryName = this.recordDto.entryName;
            let name = "";
            if (this.isHides == true || this.isHides1 == true || this.isHides2 == true) {
                return;
            }
            let entryNames = (this.entryName1 + ',' + this.entryName2 + "," + this.entryName3).split(",");
            // console.log(entryNames);
            for (var i = 0; i < entryNames.length; i++) {
                if (entryNames[i] != "" && entryNames[i] != "undefined" && entryNames[i] != undefined) {
                    name += entryNames[i] + ",";
                }
            }
            if (name != "") {
                name = (name.substring(name.length - 1) == ',') ? name.substring(0, name.length - 1) : name
            }

            this.recordDto.entryName = name;
            let arrvail = ["entryName"];
            this.vail(arrvail);
            if (corporateName != "" && this.recordDto.entryName != "") {
                this.isShow = false;
                this.buttonShow1 = true;
                this.buttonShowAdd = true;
                this.buttonShowSubmit = true;
                this.disabled = false;
                this.disabled1 = false;
            } else {
                this.isShow = false;
                this.buttonShow1 = false;
                this.buttonShowAdd = false;
                this.disabled = true;
                this.disabled1 = true;
            }
            this.hides3 = false;
        },
        corporateAddressSubmit() {
            let name = "";
            let addressName = (this.corporateAddress1 + ',' + this.corporateAddress2 + ',' + this.corporateAddress3).split(",");
            for (let i = 0; i < addressName.length; i++) {
                if (addressName[i] != "" && addressName[i] != 'undefined' && addressName[i] != undefined) {
                    name += addressName[i] + ',';
                }
            }
            if (name != "") {
                name = (name.substring(name.length - 1) == ',') ? name.substring(0, name.length - 1) : name
            }
            this.recordDto.projectAddress = name;
            let arrvail = ["projectAddress"];
            this.vail(arrvail);
            this.hides2 = false;
        },
        findByIdView() {//详情
            var id = sessionStorage.getItem('id');
            this.$axios.get('/api/front/record/findById.json', {
                params: {
                    id: id
                }
            }).then(res => {
                // if(this.rejectList.length ==0){
                //     this.hides = false;
                // }
                //接收驳回信息

                for (let i = 0; i < res.data.data.rejectList.length; i++) {
                    this.rejectList.push({
                        name: "驳回原因" + (i + 1),
                        message: res.data.data.rejectList[i]
                    })
                }


                this.recordStatus = res.data.data.recordStatus.name;

                //复制联系人集合


                this.recordDto = res.data.data;

                this.mediaFormRecord = res.data.data.mediaForm.split(',');

                this.contractList = res.data.data.contactNumberDtos;
                this.overdueTime = res.data.data.expireTime;

                this.timeReason = res.data.data.timeRemarks;

                var relut = res.data.data.projectAddress.split(",");
                this.corporateAddress1 = relut[0];
                this.corporateAddress2 = relut[1];
                this.corporateAddress3 = relut[2];
                    this.isApply = res.data.data.isApply;
                    console.log(this.isApply);
                var relut2 = res.data.data.entryName.split(',');
                this.entryName1 = relut2[0];
                this.entryName2 = relut2[1];
                this.entryName3 = relut2[2];
                let isUpdate = sessionStorage.getItem("isUpdate");
                if (isUpdate == 'false' || this.recordStatus == "G_onRecord" || this.recordStatus == "A_shareTrial" || this.recordStatus == "C_shareReject" || this.recordStatus == "A_shareReview") {
                    this.contract = {};
                    this.contractList = undefined;
                } else {
                    if (this.recordStatus === "E_recordSuccess") {
                        this.contract.contactName =
                            res.data.data.contactNumberDtos[0].contactName;
                        this.contract.position = res.data.data.contactNumberDtos[0].position;
                        this.contract.phone = res.data.data.contactNumberDtos[0].phone;
                        this.contract.qq = res.data.data.contactNumberDtos[0].qq;
                        this.contract.id = res.data.data.contactNumberDtos[0].id;
                        this.contract.weiXin = res.data.data.contactNumberDtos[0].weiXin;
                        this.contract.landLine = res.data.data.contactNumberDtos[0].landLine;
                        for (let i = 0; i < res.data.data.contactNumberDtos.length; i++) {
                            res.data.data.contactNumberDtos[i].isTrue = true;
                        }
                    } else {
                        this.contract.contactName =
                            res.data.data.contactNumberDtos[0].contactName;
                        this.contract.position = res.data.data.contactNumberDtos[0].position;
                        this.contract.phone = res.data.data.contactNumberDtos[0].phone;
                        this.contract.qq = res.data.data.contactNumberDtos[0].qq;
                        this.contract.id = res.data.data.contactNumberDtos[0].id;
                        this.contract.weiXin = res.data.data.contactNumberDtos[0].weiXin;
                        this.contract.landLine = res.data.data.contactNumberDtos[0].landLine;
                    }
                }
                if (this.recordStatus == "E_deal") {
                    this.timeType = 2;
                    var date = res.data.data.contractEffectTime;
                    date = new Date(date);
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    m = m < 10 ? '0' + m : m;
                    var d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    var h = date.getHours();
                    var time = y + '-' + m + '-' + d
                    this.time = time;

                } else {
                    this.timeType = 1;
                    var date = res.data.data.time;
                    date = new Date(date);
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    m = m < 10 ? '0' + m : m;
                    var d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    var h = date.getHours();
                    var time = y + '-' + m + '-' + d
                    this.time = time;

                }
                var arry = res.data.data.customerCard;
                if (arry != null && arry.length > 0) {
                    var car = arry.split(",");
                    for (var i = 0; i < car.length; i++) {
                        this.uploadList.push({
                            response: {
                                data: {
                                    id: car[i]
                                }
                            },
                            status: "finished"
                        });
                        this.customerCardList.push({
                            id: car[i]
                        });
                    }
                }
                var contactNumberLength = res.data.data.contactNumberDtos.length;
                for (var j = 0; j < contactNumberLength - 1; j++) {
                    this.navList.push({
                        img1: '/static/img/numGreen.png',
                        img2: '/static/img/numBack.png'
                    })
                }
            })
        },
        update() {
            // this.dtoDetailDtoList = this.recordDto;
            let arry = ["pickUp", "docking", "corporateAddress", "entryName", "mediaForm", "projectAddress", "contactName", "position", "corporateName", "phone"];
            var isvali = this.vail(arry);
            if (!isvali) {
                this.$Spin.hide();
                return;
            }
            if (this.customerCardList.length <= 0 && this.recordDto.remarks == '') {
                this.$Message.error("名片和备注不能同时为空！ _(:3」∠)_");
                return;
            }
            if (this.recordStatus === "E_recordSuccess") {
                for (let i = 0; i < this.contractList.length; i++) {

                    this.contractList[i].isTrue = true;

                }

            }
            this.dtoDetailDtoList.mediaForm = "";
            for (let i = 0; i < this.mediaFormRecord.length; i++) {
                if (i < (this.mediaFormRecord.length - 1)) {
                    this.dtoDetailDtoList.mediaForm += this.mediaFormRecord[i] + ',';
                } else {
                    this.dtoDetailDtoList.mediaForm += this.mediaFormRecord[i];
                }
                if (this.mediaFormRecord[i] == undefined) {
                    this.mediaFormRecord.splice(i, 1);
                    i = i - 1;
                }
            }

            this.dtoDetailDtoList.corporateName = this.recordDto.corporateName;
            this.dtoDetailDtoList.corporateAddress = this.recordDto.corporateAddress;
            this.dtoDetailDtoList.entryName = this.recordDto.entryName;
            this.dtoDetailDtoList.projectAddress = this.recordDto.projectAddress;

            this.dtoDetailDtoList.docking = this.recordDto.docking;
            this.dtoDetailDtoList.pickUp = this.recordDto.pickUp;
            this.dtoDetailDtoList.remarks = this.recordDto.remarks;
            this.dtoDetailDtoList.id = this.recordDto.id;
            var customerCard = "";
            for (var i = 0; i < this.customerCardList.length; i++) {
                if (i == this.customerCardList.length - 1) {
                    customerCard += this.customerCardList[i].id;
                } else {
                    customerCard += this.customerCardList[i].id + ",";
                }

            }
            this.dtoDetailDtoList.customerCard = customerCard;
            if (this.contractList != undefined) {
                for (var i = 0; i < this.contractList.length; i++) {
                    //如果是空就是insert
                    if (this.contractList != undefined && this.contractList[i].id == undefined) {
                        this.dtoDetailDtoList.dtoDetailDto.insertList.push(this.contractList[i]);
                    } else if (this.contractList != undefined && this.contractList[i].id != undefined) {//否则就是updae
                        this.dtoDetailDtoList.dtoDetailDto.updateList.push(this.contractList[i]);
                    }
                }
            }
            this.handleSpinCustom();
            this.$axios.post('/api/front/record/update.json',
                this.dtoDetailDtoList
            ).then(res => {
                if (res.data.success == false) {
                    this.$Spin.hide();
                    this.$Message.error(res.data.message);
                } else {
                    this.$Spin.hide();
                    this.$Message.success("提交成功");
                    this.$router.push({
                        path: '/network'
                    })
                }
            })
        },
        state() {
            if (this.recordStatus == "C_reject" || this.recordStatus == "G_onRecord" || this.recordStatus == "C_shareReject") {
                this.update();
            } else {
                this.create();
            }
        },
        delect() {
            if (this.navList.length == 1) {
                this.$Message.error("还是留一个吧");
                return;
            }
            this.$Modal.confirm({
                title: '删除操作',
                content: '确定要删除吗？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    this.contract = this.contractList[this.contractList.length - 2];
                    this.chenge(this.contractList.length - 2);
                    this.navList.pop();
                    this.dtoDetailDtoList.dtoDetailDto.deleteList.push(this.contractList[this.contractList.length - 1].id);
                    this.contractList.pop();
                }
            });
        },
        handleSpinCustom() {
            this.$Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'load-c',
                                size: 18
                            }
                        }),
                        h('div', '提交中')
                    ])
                }
            });
        },
        hide() {
            this.hides = false;
            this.hides3 = false;
            this.hides2 = false;
        },
        toLoading() {
            this.loading = true;
            this.$Modal.confirm({
                title: '删除操作',
                content: '确定要删除吗？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {

                }
            });
        },
        updateTime() {
            let updateTimeID = sessionStorage.getItem("id");
            this.$axios.post('/api/front/record/updateTimeApply.json', {
                id: updateTimeID,
                timeRemarks: this.timeReason
            }).then(res => {
                if (res.data.success) {
                    this.$Message.success("提交更新申请成功");
                    this.hidesUpdate = false;

                } else {
                    this.$Message.error(res.data.message);
                    this.hidesUpdate = false;
                }
            })
        },
        giveUp() {
            this.$Modal.confirm({
                title: '放弃',
                content: '<p>是否放弃该备案信息</p>',
                onOk: () => {
                    let gId = sessionStorage.getItem("id");
                    this.$axios.post('/api/front/record/shareRecord.json', {
                        id: gId
                    }).then(res => {
                        if (res.data.success == true) {
                            this.$Message.success("您已成功放弃该备案");
                            this.$router.push({
                                path: '/network'
                            })
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    })
                }
            });
        },
        remoteMethod1(query) {
            this.loading1 = true;
            this.$axios.get('/api/front/member/findByMemberList.json',
                {
                    params: {
                        LIKE_name: query,
                        NEQ_name: 'admin'
                    }

                }).then(res => {
                    if (res.data.success) {
                        let netList = res.data.data;
                        setTimeout(() => {
                            const list = netList.map(item => {
                                return {
                                    name: item.name,

                                };
                            });
                            this.networkList = list;
                            this.loading1 = false;
                        }, 200);
                    }

                })

        },
        remoteMethod2(query) {
            this.loading2 = true;
            this.$axios.get('/api/front/member/findDepartmentList.json',
                {
                    params: {
                        LIKE_name: query
                    }
                }).then(res => {
                    if (res.data.success) {
                        let netList = res.data.data;
                        setTimeout(() => {
                            const list2 = netList.map(item => {
                                return {
                                    name: item.name,
                                };
                            });

                            this.networkList2 = list2;
                            this.loading2 = false;
                        }, 200);
                    }
                })

        }

    }

}
</script>

<style>
@import url('./record.css');
</style>


