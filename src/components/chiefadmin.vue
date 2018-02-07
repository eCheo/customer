<template>
    <div class="minR">
        <div class="total">
            <div class="r_left">
                <img src="/static/img/i_book_02.png">
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
                <div style="position:absolute;top:0;left:10%;width:30%;height:93%;margin-top:1%;">
                    <div class="r_log">
                        <img src="/static/img/logo.png">
                    </div>
                    <div class="r_top1">
                        <div class="r_one">
                            <div class="one_left">
                                <Input v-model="time" readonly>
                                <span slot="prepend">{{timeType===2?'合同生效':'备案'}}时间</span>
                                </Input>
                            </div>
                            <div class="one_right">
                                <label>{{timeType===2?'合同到期':'到期'}}时间</label>
                                <DatePicker readonly v-model="overdueTime" type="date" format="yyyy-MM-dd" style="float:left;width:58%;"></DatePicker>
                            </div>
                        </div>
                    </div>
                    <div class="r_top1">
                        <div class="r_one1">
                            <div class="one_left1">
                                <Input v-model="recordDto.corporateName" readonly>
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
                                <Input v-model="recordDto.entryName" readonly>
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
                                <Select size="small" disabled v-model="recordDto.mediaForm" style="width:83.5%;height:28px;margin-bottom:5px;border:1px solid #01C675;border-radius:5px;margin-left:-5px;">
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
                                <Input v-model="recordDto.corporateAddress" readonly>
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
                                <Input v-model="recordDto.projectAddress" readonly>
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
                                    <Input v-model="contract.contactName" @on-blur='addContract()' :readonly="readonly1">
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
                                    <Input v-model="contract.position" @on-blur='addContract()' :readonly="readonly1">
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
                                    <Input v-model="contract.phone" @on-blur='addContract()' :readonly="readonly1">
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
                                    <Input v-model="contract.qq" @on-blur='addContract()' :readonly="readonly1">
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
                                    <Input v-model="contract.weiXin" @on-blur='addContract()' :readonly="readonly1">
                                    <span slot="prepend">微信</span>
                                    </Input>
                                </div>
                            </div>
                            <div class="r_one1">
                                <div class="one_left1">
                                    <Input v-model="contract.landLine" @on-blur='addContract()' :readonly="readonly1">
                                    <span slot="prepend">座机</span>
                                    </Input>
                                </div>
                            </div>
                        </div>
                        <ul class="r_list">
                            <li class="r_item">
                                <div class="item_img1" @click="delect" v-show="buttonView">
                                </div>
                            </li>
                            <li class="r_item">
                                <div class="item_img" @click="addList" v-show="buttonView">
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
                            <div class="one_left1">
                                <Input v-model="recordDto.pickUp" readonly>
                                <span slot="prepend">网络对接人</span>
                                </Input>
                            </div>
                            <div class="span_da" v-show="span11">
                                <div class="arrow"></div>
                                <span>{{spanText11}}</span>
                            </div>
                        </div>
                        <div class="r_one1">
                            <div class="one_left1">
                                <Input v-model="recordDto.docking" readonly>
                                <span slot="prepend">网络对接部门</span>
                                </Input>
                            </div>
                            <div class="span_da" v-show="span12">
                                <div class="arrow"></div>
                                <span>{{spanText12}}</span>
                            </div>
                        </div>
                    </div>

                </div>

                <ul class="but_list">

                    <li v-if="recordStatus.code==='review'">
                        <div class="div_but" @click="hides=true">
                            <img src="/static/img/button_03.png">
                            <span>
                                驳回
                            </span>
                        </div>
                    </li>

                    <li v-if="recordStatus.code==='review'">
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
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)" v-show="buttonView"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload v-show="buttonView" ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png','gif']" :max-size="4800000" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="/api/obs/upload.json" style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <Modal title="View Image" v-model="visible">
                            <img :src="'/api/obs/view.json?id=' + imgName" v-if="visible" style="width: 100%">
                        </Modal>
                    </div>
                </div>

                <div class="textarea">
                    <Input v-model="recordDto.remarks" style="width:360px;" type="textarea" :rows="8" readonly></Input>
                </div>
                <div class="pen">
                    <img src="/static/img/pen_X_03.png">
                </div>
                <div class="clip">
                    <img src="/static/img/jiazi_03.png">
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
                    <br>
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
            loading: false,
            reject: '',
            rejectList: [],
            readonly: false,
            buttonView: true,
            readonly1: false,
            disabled: true,
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
                remarks: '',
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
            spanText12: ''
        };
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
        vail(values) {
            var isvalilPass = true;
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                var phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                var position = /^[\u0391-\uFFE5]+$/;
                var QQ = /^[0-9]&/
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

                if (value == "docking") {
                    if (this.recordDto.docking == "") {
                        this.span12 = true;
                        this.spanText12 = "对接人不能为空";
                        isvalilPass = false;
                    } else {
                        this.span12 = false;
                    }
                }

                if (value == "pickUp") {
                    if (this.recordDto.pickUp == "") {
                        this.span11 = true;
                        this.spanText11 = "对接部门不能为空";
                        isvalilPass = false;
                    } else {
                        this.span11 = false;
                    }
                }
                if (value == "mediaForm") {
                    if (this.recordDto.mediaForm == "") {
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
                    // console.log(this.mediaForm);
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
        update() {
             this.handleSpinCustom();
            // this.dtoDetailDtoList = this.recordDto;
            let arry = ["pickUp", "docking", "corporateAddress", "entryName", "mediaForm", "projectAddress", "contactName", "position", "corporateName", "phone","QQ"];
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
            this.dtoDetailDtoList.corporateName = this.recordDto.corporateName;
            this.dtoDetailDtoList.corporateAddress = this.recordDto.corporateAddress;
            this.dtoDetailDtoList.entryName = this.recordDto.entryName;
            this.dtoDetailDtoList.projectAddress = this.recordDto.projectAddress;
            this.dtoDetailDtoList.mediaForm = this.recordDto.mediaForm;
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
                }
            }
           
            this.$axios.post('/api/front/record/update.json',
                this.dtoDetailDtoList
            ).then(res => {
                if (res.data.success == false) {
                    this.$Spin.hide();
                    this.$Message.error(res.data.message);
                } else {
                    this.$Spin.hide();
                    this.$Message.success("保存成功");
                    this.$router.push({
                        path: '/chief'
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


                    this.contract.contactName = res.data.data.contactNumberDtos[0].contactName;
                    this.contract.position = res.data.data.contactNumberDtos[0].position;
                    this.contract.phone = res.data.data.contactNumberDtos[0].phone;
                    this.contract.qq = res.data.data.contactNumberDtos[0].qq;
                    this.contract.id = res.data.data.contactNumberDtos[0].id;
                    this.contract.weiXin = res.data.data.contactNumberDtos[0].weiXin;
                    this.contract.landLine = res.data.data.contactNumberDtos[0].landLine;
                    this.contractList = res.data.data.contactNumberDtos;
                    this.recordDto = res.data.data;
                    this.recordDto.mediaForm = res.data.data.mediaForm.name;
                    this.overdueTime = res.data.data.expireTime;
                    this.recordStatus = res.data.data.recordStatus;
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
        // rejectinfo() {
        //     this.$Modal.confirm({
        //         title: '驳回信息',
        //         content: '<p>666666</p><p>666666</p><p>666666</p>',
        //         width: 70,
        //     });
        // },
        transfer() {
            var id = JSON.parse(sessionStorage.getItem("id"));
            this.$axios.post('/api/front/record/transfer.json', {
                id: id
            }).then(res => {
                this.$Message.success("转交成功");
                history.go(-1);
            })
        },
        pass() {
            var id = JSON.parse(sessionStorage.getItem("id"));
            this.$axios.post('/api/front/record/adopt.json', {
                id: id
            }).then(res => {
                this.$Message.success("通过请求");
                history.go(-1);
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
                    this.chenge(this.contractList.length - 2);
                    this.navList.pop();
                    this.contractList.pop();
                    this.dtoDetailDtoList.dtoDetailDto.deleteList.push(this.contractList[this.contractList.length - 1].id);
                }
            });
        },
        transfer() {
            var id = JSON.parse(sessionStorage.getItem("id"));
            this.$axios.post('/api/front/record/transfer.json', {
                id: id
            }).then(res => {
                this.$Message.success("转交成功");
                history.go(-1);
            })
        },
        pass() {
            var id = JSON.parse(sessionStorage.getItem("id"));
            this.$axios.post('/api/front/record/adopt.json', {
                id: id
            }).then(res => {
                this.$Message.success("通过请求");
                history.go(-1);
            })
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
                                placeholder: '合同生效时间'
                            },

                            on: {
                                input: val => {
                                    effectTime = val;

                                }
                            }
                        }),
                        h('DatePicker', {
                            props: {
                                type: 'date',
                                value: this.terminationTime,
                                placeholder: '合同生效时间'
                            },
                            on: {
                                input: val => {
                                    terminationTime = val;
                                }
                            }
                        })
                    ])
                },
                onOk() {
                    var id = JSON.parse(sessionStorage.getItem("id"));
                    this.$axios.post('/api/front/record/deal.json', {
                        contractEffectTime: effectTime,
                        expireTime: terminationTime,
                        id: id
                    }).then(res => {
                        this.$Message.success("通过成交请求");
                        history.go(-1);
                    })
                }
            })
        },
        hide() {
            this.hides = false;
            this.loading = false;
        },
        toLoading() {
            this.loading = true;
            let id = JSON.parse(sessionStorage.getItem('id'));
            this.$axios.post('/api/front/record/reject.json', {
                id: id,
                reject: this.reject
            }).then(res => {
                if (res.data.success == false) {
                    this.$Message.error("驳回失败");
                    this.loading = false;
                } else {
                    this.$Message.success("驳回成功");
                    this.loading = false;
                    this.hides = false;
                    this.$router.push({
                        path: '/chief'
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


