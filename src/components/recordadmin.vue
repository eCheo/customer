<template>
    <div class="minR">
        <div class="total">
            <div class="r_left">
                <img src="/static/img/i_book_02.png">
                <router-link to="/indexadmin">
                    <div class="home_img">
                        <img src="../../static/img/home.png">
                    </div>
                </router-link>
                <!--<div style="color:blur>备案人:</div>-->
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
                                <Input v-model="time" >
                                <span slot="prepend">{{timeType===2?'合同生效':'备案'}}时间</span>
                                </Input>
                            </div>
                            <div class="one_right">
                                <label>{{timeType===2?'合同到期':'到期'}}时间</label>
                                <DatePicker    v-model="overdueTime" :options="options3" type="datetime" format="yyyy-MM-dd" style="float:left;width:58%;"></DatePicker>
                            </div>
                        </div>
                    </div>
                    <div class="r_top1">
                        <div class="r_one1">
                            <div class="one_left1">
                                <Input v-model="recordDto.corporateName" @on-blur="addContract('corporateName')" >
                                <span slot="prepend">公司名称</span>
                                </Input>
                            </div>
                            <div class="span_da" v-show="span1">
                                <div class="arrow"></div>
                                <span>{{spanText1}}</span>
                            </div>
                        </div>
                        <div style="position:absolute;left:390px;color:#FA150A;" v-show="isShow">
                            该公司已备案
                        </div>
                        <div class="r_one1">
                            <div class="one_left1">
                                <Input v-model="recordDto.entryName" @on-focus="hides3 = true" @on-blur="addContract('entryName')" >
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
                                <Select size="small" @on-change="addContract('mediaForm')" multiple v-model="mediaFormRecord" style="width:83.5%;height:28px;margin-bottom:5px;border:1px solid #01C675;border-radius:5px;margin-left:-5px;">
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
                                <Input v-model="recordDto.corporateAddress" @on-blur="addContract('corporateAddress')" >
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
                                <Input v-model="recordDto.projectAddress" @on-focus="hides2 = true" @on-blur="addContract('projectAddress')" >
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
                                    <Input v-model="contract.contactName" @on-blur='addContract("contactName")' >
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
                                    <Input v-model="contract.position" @on-blur='addContract("position")' >
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
                                    <Input v-model="contract.phone" @on-blur='addContract("phone")' >
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
                                    <Input v-model="contract.qq" @on-blur='addContract("QQ")' >
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
                                    <Input v-model="contract.weiXin" @on-blur='addContract("weiXin")' >
                                    <span slot="prepend">微信</span>
                                    </Input>
                                </div>
                            </div>
                            <div class="r_one1">
                                <div class="one_left1">
                                    <Input v-model="contract.landLine" @on-blur='addContract("landLine")'>
                                    <span slot="prepend">座机</span>
                                    </Input>
                                </div>

                            </div>
                        </div>
                        <ul class="r_list">
                            <li class="r_item">
                                <div class="item_img1" @click="delect" v-show="buttonShow">
                                </div>
                            </li>
                            <li class="r_item">
                                <div class="item_img" @click="addList" v-show="buttonShow">
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
                                <Select v-model="recordDto.pickUp" filterable :loading="loading1"  >
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
                                <Select v-model="recordDto.docking" filterable :loading="loading2">
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
                    <li v-if="recordStatus.code==='trial' || recordStatus.code==='shareTrial'">
                        <div class="div_but" @click="transfer">
                            <img src="/static/img/button_03.png">
                            <span>
                                转交
                            </span>
                        </div>
                    </li>
                    <li v-if="recordStatus.code==='trial' || recordStatus.code==='shareTrial'">
                        <div class="div_but" @click="hides=true">
                            <img src="/static/img/button_03.png">
                            <span>
                                驳回
                            </span>
                        </div>
                    </li>
                    <li v-if="recordStatus.code==='deal'||recordStatus.code==='recordSuccess' || recordStatus.code==='shareTrial'">
                        <div class="div_but" @click="deal">
                            <img src="/static/img/button_03.png">
                            <span>
                                成交
                            </span>
                        </div>
                    </li>
                    <li v-if="recordStatus.code==='trial' || recordStatus.code==='shareTrial'">
                        <div class="div_but" @click="pass">
                            <img src="/static/img/button_03.png">
                            <span>
                                通过
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="div_but" @click="update">
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
                    <div class="album">
                        <div class="demo-upload-list" v-for="item in uploadList" :key="item.name">
                            <template v-if="item.status=='finished'">
                                <img :src="'/api/obs/view.json?id='+item.response.data.id">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item.response.data.id)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)" v-show="buttonShow"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload ref="upload" v-show="buttonShow" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png','gif']" :max-size="4800000" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="/api/obs/upload.json" style="display: inline-block;width:58px;">
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
                    <Input v-model="recordDto.remarks" maxLength="500" style="width:360px;" type="textarea"  :rows="8"></Input>
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
                    <div v-else style="height:185px;">
                        暂无驳回信息
                    </div>
                    <Row class-name="r_box1">
                        <Col>
                        <Input v-model="reject" type="textarea" placeholder="驳回信息"></Input>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="4" offset="14">
                        <Button type="ghost">取消</Button>
                        </Col>
                        <Col span="6">
                        <Button type="primary" :loading="loading" @click="toLoading">
                            <span v-if="!loading">提交</span>
                            <span v-else>提交中...</span>
                        </Button>
                        </Col>
                    </Row>
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

                    <Input type="text" placeholder="项目名称1" v-model="entryName1" @on-change="entryNameSelect(entryName1)" ></Input>
                    <div style="height:20px;">
                        <p style="color:#FA150A;" v-show="isHides">
                            该项目已备案
                        </p>
                    </div>

                    <Input type="text" placeholder="项目名称2" v-model="entryName2" @on-change="entryNameSelect1(entryName2)" ></Input>
                    <div style="height:20px;">
                        <p style="color:#FA150A;" v-show="isHides1">
                            该项目已备案
                        </p>
                    </div>
                    <Input type="text" placeholder="项目名称3" v-model="entryName3" @on-change="entryNameSelect2(entryName3)" ></Input>
                    <div style="height:20px;">
                        <p style="color:#FA150A;" v-show="isHides2">
                            该项目已备案
                        </p>
                    </div>

                    <Row>
                        <Col span="4" offset="14">
                        <Button type="ghost" @click="hide">取消</Button>
                        </Col>
                        <Col span="6">
                        <Button type="primary" :loading="loading" @click="entryNameSubmit" >
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

                    <Input type="text" placeholder="项目地址1" v-model="corporateAddress1" ></Input>
                    <br> <br>

                    <Input type="text" placeholder="项目地址2" v-model="corporateAddress2" ></Input>
                    <br> <br>
                    <Input type="text" placeholder="项目地址3" v-model="corporateAddress3" ></Input>
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
    </div>
</template>

<script>
export default {

    data() {
        return {
            rejectvalue: "",
            value: "",
            svalue: "",
            navList: [
                {
                    img1: "/static/img/numGreen.png",
                    img2: "/static/img/numBack.png"
                }
            ],
            uploadList: [], //接收名片的集合
            index: 0,
            contractList: [], //存放联系方式的集合
            contract: {
                //接收联系方式的对象
                phone: "",
                weiXin: "",
                qq: "",
                position: "",
                contactName: "",
                landLine: ""
            },
            mediaFormList: [],
            recordDto: {
                //接收表单的数据
                corporateName: "", //公司名称
                corporateAddress: "", // 公司地址
                entryName: "", //项目名称
                projectAddress: "", //项目地址
                customerCard: "", //名片
                mediaForm: "", //媒体形式
                docking: "", //对接部门
                pickUp: "", //对接人
                remarks: "", //备注
                contactNumberDtos: [] //联系方式集合
            },
            mediaFormRecord: [],
            customerCardList: [],
            time: "", //备案时间
            overdueTime: "", //到期时间
            imgName: "",
            visible: false,
            isShow: false,
            customerName: "",
            dtoName: "",
            roleName: "",
            recordStatus: {
                code: "",
                message: "",
                name: ""
            },
            effectTime: '',
            terminationTime: '',
            timeType: 0,
            hides: false,
              isHides: false,
            isHides1: false,
            isHides2: false,
            loading: false,
            reject: '',
            rejectList: [],
            readonly: false,
            buttonShow: true,
            readonly1: false,
            disabled: false,
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
            entryName1: '',
            entryName2: '',
            entryName3: '',
            corporateAddress1: '',
            corporateAddress2: '',
            corporateAddress3: '',
            loading2:false,
            loading1:false,
            hides3: false,
            hides2: false,
              options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
              networkList:[],
              networkList2:[]  
        };
    },
    mounted() {
        /**
             * 接收客户代表名
             * 职位
             * 部门
             */
            this.remoteMethod1();
        this.remoteMethod2();
        this.customerName = sessionStorage.getItem("name");
        this.roleName = sessionStorage.getItem("role");
        this.dtoName = sessionStorage.getItem("dto");

        this.getMediaForm();
        this.uploadList = this.$refs.upload.fileList;
        let id = sessionStorage.getItem("id");
        if (id) {
            this.findByIdView();
        }
    },
    
    beforeUpdate() {
        let id = sessionStorage.getItem("id");
        if (id) {
            this.isShow = false;
        }


    },

    methods: {
        addList() {
            if (
                this.contractList[this.contractList.length - 1] != null &&
                (this.contractList[this.contractList.length - 1].phone == null ||
                    this.contractList[this.contractList.length - 1].phone == "")
            ) {
                this.chenge(this.contractList.length - 1);
            }

            var lists = ["contactName", "QQ", "position", "phone"]
            if (this.vail(lists)) {
                if (this.navList.length == 5) {
                    this.$Message.error("臣妾只能添加5个哦！ _(:3」∠)_");
                    return
                } else {
                    this.navList.push({
                        img1: '/static/img/numGreen.png',
                        img2: '/static/img/numBack.png'
                    });
                    this.index = this.navList.length - 1;
                    this.contractList.push({});
                    this.clearValue();//清空數據
                }
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
             
            } else {
                this.isShow = false;
                this.buttonShow1 = false;
                this.buttonShowAdd = false;
                this.disabled = true;
            
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
                entryNameSelect(value) {

            this.isTrue = true;
            var corporateName = this.recordDto.corporateName;
            this.$axios.get('/api/front/record/findRepeat.json', {
                params: {
                    entryName: value,//项目名称
                    corporateName: corporateName //公司名称
                }
            }).then(res => {
                if (this.entryName1 != "" && res.data.data > 0) { //项目名称1如果不为空和有数据就出现已备案
                    this.isHides = true;


                } else {
                    this.isHides = false;
                }
                this.buttonIsShow();
            })
        },
        entryNameSelect1(value) {
            this.isTrue = true;
            var corporateName = this.recordDto.corporateName;
            this.$axios.get('/api/front/record/findRepeat.json', {
                params: {
                    entryName: value,//项目名称
                    corporateName: corporateName //公司名称
                }
            }).then(res => {

                if (this.entryName2 != "" && res.data.data > 0) { //项目名称1如果不为空和有数据就出现已备案
                    this.isHides1 = true;

                } else {
                    this.isHides1 = false;

                }
                this.buttonIsShow();
            })
        },
        entryNameSelect2(value) {
            this.isTrue = true;
            var corporateName = this.recordDto.corporateName;
            this.$axios.get('/api/front/record/findRepeat.json', {
                params: {
                    entryName: value,//项目名称
                    corporateName: corporateName //公司名称
                }
            }).then(res => {

                if (this.entryName3 != "" && res.data.data > 0) { //项目名称1如果不为空和有数据就出现已备案
                    this.isHides2 = true;
                } else {
                    this.isHides2 = false;
                }
                this.buttonIsShow();

            })
        },
        buttonIsShow() {
            if (this.isHides == true || this.isHides1 == true || this.isHides2 == true) {
                this.isTrue = true;
            } else if (this.entryName1 == "" && this.entryName2 == "" && this.entryName3 == "") {
                this.isTrue = true;
            } else {
                this.isTrue = false;
            }
        },
        vail(values) {
            var isvalilPass = true;
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                var phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                var position = /^[\u0391-\uFFE5]+$/;
                var QQ = /^[0-9]*$/
                if (value == "phone") {
                    if (!phone.test(this.contract.phone)) {
                        this.span = true;
                        this.spanText = "电话号码不正确";
                        isvalilPass = false;
                    } else {
                        this.span = false;
                    }

                }
                if (value == "corporateName") {
                    if (this.recordDto.corporateName == "") {
                        this.span1 = true;
                        this.spanText1 = "公司名称不能为空";
                        isvalilPass = false;
                    } else {
                        this.span1 = false;
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

                if (value == "QQ") {
                    if ((this.contract.qq != "" && this.contract.qq != undefined) && !QQ.test(this.contract.qq)) {
                        this.span8 = true;
                        this.spanText8 = "QQ只能为数字";
                        isvalilPass = false;
                    } else {
                        this.span8 = false;
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
            }
        },
        getMediaForm() {
            this.$axios
                .get("/api/metadata/getByEnumClassSimpleName.json", {
                    params: {
                        enumClassSimpleName: "MediaForm"
                    }
                })
                .then(res => {
                    this.mediaFormList = res.data.data;
                });
        },
        handleSuccess(res) {
            this.customerCardList.push({
                id: res.data.id
            });
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
        inputChange() {
            var corporateName = this.recordDto.corporateName,
                mediaForm = this.recordDto.mediaForm;
            if (corporateName != "" && mediaForm != "") {
                this.$axios
                    .get("/api/front/record/findByConditionList.json", {
                        params: {
                            EQ_corporateName: corporateName,
                            EQ_mediaForm: mediaForm
                        }
                    })
                    .then(res => {
                        if (res.data.data.length > 0) {
                            this.isShow = true;
                        } else {
                            this.isShow = false;
                        }
                    });
            }
        },
        //最大上传单个文件多大
        handleMaxSize(file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
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

        },
        findByIdView() {
            //详情
            var id = sessionStorage.getItem("id");
            this.$axios
                .get("/api/front/record/findById.json", {
                    params: {
                        id: id
                    }
                })
                .then(res => {
                    //接收驳回信息
                    for (let i = 0; i < res.data.data.rejectList.length; i++) {
                        this.rejectList.push({
                            name: "驳回原因" + (i + 1),
                            message: res.data.data.rejectList[i]
                        })
                    }
                    
                    this.mediaFormRecord = res.data.data.mediaForm.split(',');


                    this.contract.contactName = res.data.data.contactNumberDtos[0].contactName;
                    this.contract.position = res.data.data.contactNumberDtos[0].position;
                    this.contract.phone = res.data.data.contactNumberDtos[0].phone;
                    this.contract.qq = res.data.data.contactNumberDtos[0].qq;
                    this.contract.id = res.data.data.contactNumberDtos[0].id;
                    this.contract.weiXin = res.data.data.contactNumberDtos[0].weiXin;
                    this.contract.landLine = res.data.data.contactNumberDtos[0].landLine;
                    this.contractList = res.data.data.contactNumberDtos;
                    this.recordDto = res.data.data;

                    this.overdueTime = res.data.data.expireTime;
                    this.recordStatus = res.data.data.recordStatus;


                    var relut = res.data.data.projectAddress.split(",");
                    this.corporateAddress1 = relut[0];
                    this.corporateAddress2 = relut[1];
                    this.corporateAddress3 = relut[2];

                    var relut2 = res.data.data.entryName.split(',');
                    this.entryName1 = relut2[0];
                    this.entryName2 = relut2[1];
                    this.entryName3 = relut2[2];

                    var arry = res.data.data.customerCard;

                    if (this.recordStatus.name == "E_deal") {
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
                        var time = y + '-' + m + '-' + d;
                        this.time = time;
                    }

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
                            img1: "/static/img/numGreen.png",
                            img2: "/static/img/numBack.png"
                        });
                    }
                });
        },
        update() {
            // this.dtoDetailDtoList = this.recordDto;
            this.handleSpinCustom();
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

            if (this.contractList[this.contractList.length - 1].phone == "" || this.contractList[this.contractList.length - 1].phone == undefined) {
                this.$Message.error("联系电话不能空！ _(:3」∠)_");
                this.chenge(this.contractList.length - 1);
                return;
            }
            this.dtoDetailDtoList.mediaForm = "";
            for (let i = 0; i < this.mediaFormRecord.length; i++) {
                if (i < (this.mediaFormRecord.length - 1)) {
                    this.dtoDetailDtoList.mediaForm += this.mediaFormRecord[i] +',';
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
            for (var i = 0; i < this.contractList.length; i++) {
                //如果是空就是insert
                if (this.contractList[i].id == undefined) {
                    this.dtoDetailDtoList.dtoDetailDto.insertList.push(this.contractList[i]);
                } else {//否则就是updae
                    this.dtoDetailDtoList.dtoDetailDto.updateList.push(this.contractList[i]);
                    this.dtoDetailDtoList.expireTime =  this.overdueTime;
                    console.log(this.overdueTime);
                }
            }

            this.$axios.post('/api/front/record/adminUpdate.json',
                this.dtoDetailDtoList
            ).then(res => {
                if (res.data.success == false) {
                    this.$Spin.hide();
                    this.$Message.error(res.data.message);
                } else {
                    this.$Spin.hide();
                    this.$Message.success("保存成功");
                    this.$router.push({
                        path: '/indexadmin'
                    })
                }
            })
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

        transfer() {
            var id = JSON.parse(sessionStorage.getItem("id"));
            this.$axios.post('/api/front/record/transfer.json', {
                id: id
            }).then(res => {
                if (res.data.success == true) {
                    this.$Message.success("转交成功");
                    sessionStorage.removeItem('current');
                     this.$router.push({path:'/indexadmin'});
                } else {
                    this.$Message.error(res.data.message);
                }

            })
        },
        pass() {
            var id = JSON.parse(sessionStorage.getItem("id"));
            this.$axios.post('/api/front/record/adopt.json', {
                id: id
            }).then(res => {
                if (res.data.success == true) {
                    this.$Message.success("通过请求");
                   this.$router.push({path:'/indexadmin'});
                } else {
                    this.$Message.error(res.data.message);
                }

            })
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
                    this.contractList.pop();
                    this.dtoDetailDtoList.dtoDetailDto.deleteList.push(this.contractList[this.contractList.length - 1].id);
                }
            });
        },
        deal() {
            let effectTime = '';
            let terminationTime = '';
            this.$Modal.confirm({
                title: '选择成交日期',
                width: 33,
                render: h => {
                    return h('div', {}, [
                        h('DatePicker', {
                            props: {
                                type: 'date',
                                value: this.effectTime,
                                placeholder: '合同生效时间',
                            },
                            on: {
                                input: val => {
                                    effectTime = val;
                                }
                            },
                            style: {
                                marginRight: '10px'
                            }
                        }),
                        h('DatePicker', {
                            props: {
                                type: 'date',
                                value: this.terminationTime,
                                placeholder: '合同到期时间'
                            },
                            on: {
                                input: val => {
                                    terminationTime = val;
                                }
                            }
                        })
                    ])
                },
                onOk:()=> {
                    var id = JSON.parse(sessionStorage.getItem("id"));
                    this.$axios.post('/api/front/record/deal.json', {
                        contractEffectTime: effectTime,
                        expireTime: terminationTime,
                        id: id
                    }).then(res => {
                        if (res.data.success == true) {
                            this.$router.push({path:'/indexadmin'});
                            this.$Message.success("通过成交请求");
                        } else {
                            this.$Message.error(res.data.message);
                        }

                    })
                }
            })
        },
        hide() {
            this.hides = false;
            this.loading = false;
            this.hides3 = false;
            this.hides2 = false;
        },
        toLoading() {
            this.loading = true;
            sessionStorage.removeItem('current');
            let id = JSON.parse(sessionStorage.getItem('id'));
            this.$axios.post('/api/front/record/reject.json', {
                id: id,
                reject: this.reject
            }).then(res => {
                if (res.data.success == false) {
                    this.$Message.error(res.data.message);
                    this.loading = false;
                } else {
                    this.$Message.success("驳回成功");
                    this.loading = false;
                    this.hides = false;
                    this.$router.push({
                        path: '/indexadmin'
                    })
                }
            })
        }
    }
}


</script>

<style>
@import url("./record.css");
</style>


