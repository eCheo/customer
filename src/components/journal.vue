<template>
    <div>
        <div class="minR">

            <div class="total">
                <div class="n_left">
                    <img src="/static/img/i_book_02.png">

                    <div class="neft_font">
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

                    <div class="box">
                        <div class="n_log">
                            <img src="/static/img/logo.png">
                        </div>
                        <div class="n_top1">
                            <div class="n_one">
                                <div class="one_left">
                                    <Input v-model="logTime" :readonly="true">
                                    <span slot="prepend">日期</span>
                                    </Input>
                                </div>
                                <div class="one_right">
                                    <label>提醒</label>
                                    <DatePicker :readonly="readonly" v-model="enterpriseRemindDate" type="date" format="yyyy-MM-dd" style="float:left;width:126px;"></DatePicker>
                                </div>
                            </div>
                        </div>
                        <!--        联系方式 add           -->
                        <div class="n_but">
                            <div class="n_top1">
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.industry" :readonly="readonly" @on-blur="addContract('industry')">
                                        <span slot="prepend">行业</span>
                                        </Input>
                                    </div>
                                    <div class="span_da" v-show="span1">
                                        <div class="arrow"></div>
                                        <span>{{spanText1}}</span>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.customerType" :readonly="readonly" @on-blur="addContract('customerType')">
                                        <span slot="prepend">客户分类</span>
                                        </Input>
                                    </div>
                                    <div class="span_da" v-show="span2">
                                        <div class="arrow"></div>
                                        <span>{{spanText2}}</span>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.enterpriseName" :readonly="readonly" @on-blur="addContract('enterpriseName')">
                                        <span slot="prepend">公司名称</span>
                                        </Input>
                                    </div>
                                    <div class="span_da" v-show="span3">
                                        <div class="arrow"></div>
                                        <span>{{spanText3}}</span>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.enterpriseAddress" :readonly="readonly" @on-blur="addContract('enterpriseAddress')">
                                        <span slot="prepend">公司地址</span>
                                        </Input>
                                    </div>
                                    <div class="span_da" v-show="span4">
                                        <div class="arrow"></div>
                                        <span>{{spanText4}}</span>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.project" :readonly="readonly" @on-blur="addContract('project')">
                                        <span slot="prepend">品牌项目名称</span>
                                        </Input>
                                    </div>
                                    <div class="span_da" v-show="span5">
                                        <div class="arrow"></div>
                                        <span>{{spanText5}}</span>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.projectAddress" :readonly="readonly" @on-blur="addContract('projectAddress')">
                                        <span slot="prepend">项目地址</span>
                                        </Input>
                                    </div>
                                    <div class="span_da" v-show="span6">
                                        <div class="arrow"></div>
                                        <span>{{spanText6}}</span>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.contacts" :readonly="readonly" @on-blur="addContract('contacts')">
                                        <span slot="prepend">联系人</span>
                                        </Input>
                                    </div>
                                    <div class="span_da" v-show="span7">
                                        <div class="arrow"></div>
                                        <span>{{spanText7}}</span>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.position" :readonly="readonly" @on-blur="addContract('position')">
                                        <span slot="prepend">职位</span>
                                        </Input>
                                    </div>
                                    <div class="span_da" v-show="span8">
                                        <div class="arrow"></div>
                                        <span>{{spanText8}}</span>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.contactInformation" :readonly="readonly" @on-blur="addContract('contactInformation')">
                                        <span slot="prepend">联系方式</span>
                                        </Input>
                                    </div>
                                    <div class="span_da" v-show="span9">
                                        <div class="arrow"></div>
                                        <span>{{spanText9}}</span>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.visit" :readonly="readonly" @on-blur="addContract('visit')">
                                        <span slot="prepend">拜访方式</span>
                                        </Input>
                                    </div>
                                    <div class="span_da" v-show="span10">
                                        <div class="arrow"></div>
                                        <span>{{spanText10}}</span>
                                    </div>
                                </div>
                                <ul class="n_list">
                                    <li class="n_item">
                                        <div class="ntem_img1" @click="delect" v-show="isHide">
                                        </div>
                                    </li>
                                    <li class="n_item">
                                        <div class="ntem_img" @click="addList" v-show="isHide">
                                        </div>
                                    </li>
                                    <li class="n_item1" v-for="(item,i) in navList" :key="i">
                                        <div @click="chenge(i)" style="width:45px;height:40px;margin-top:-2px;">
                                            <img :src='i==index?item.img1:item.img2'>
                                            <label style="cursor: pointer;">{{i+1}}</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <ul class="but_list">
                        <li>
                            <div class="div_but" v-show="isButton">
                                <img src="/static/img/button_03.png">
                                <span @click="createMemberLog">
                                    保存
                                </span>
                            </div>

                        </li>
                    </ul>
                </div>

                <!--         右边内容     -->
                <div>
                    <div class="textarea">
                        <Input :readonly="readonly" v-model="memberLog.remarks" style="width:460px;border-bottom:7px solid #2871A0;" type="textarea" :rows="12"></Input>
                    </div>
                    <div class="pens">
                        <div class="pen">
                            <img src="/static/img/pen_X_03.png">
                        </div>
                      
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            customerName: '',
            dtoName: '',
            roleName: '',
            memberLogList: [],
            memberLog: {
                industry: '',
                customerType: '',
                enterpriseName: '',
                enterpriseAddress: '',
                project: '',
                projectAddress: '',
                contacts: '',
                position: '',
                contactInformation: '',
                visit: '',
                remarks: '',
                id: ''
            },
            logTime: '',
            readonly: false,
            isHide: true,
            navList: [{
                img1: '/static/img/numGreen.png',
                img2: '/static/img/numBack.png'
            }],
            index: 0,
            enterpriseRemindDate: '',
            isButton: true,
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
        }
    },
    methods: {
        vali(values) {
            var isvaliPass = true;
            for (let i = 0; i < values.length; i++) {
                var value = values[i];
                var phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                var position = /^[\u0391-\uFFE5]+$/;
                var QQ = /^[0-9]*$/
                if (value == "industry") {
                    console.log(this.memberLog);
                    if (this.memberLog.industry == "" || this.memberLog.industry == undefined) {
                        this.span1 = true;
                        this.spanText1 = "行业不能为空";
                        isvaliPass = false;
                    } else {
                        this.span1 = false;
                    }

                }
                if (value == "customerType") {
                    if (this.memberLog.customerType == "" || this.memberLog.customerType == undefined) {
                        this.span2 = true;
                        this.spanText2 = "客户分类不能为空";
                        isvaliPass = false;
                    } else {
                        this.span2 = false;
                    }

                }

                if (value == "enterpriseName") {
                    if (this.memberLog.enterpriseName == "" || this.memberLog.enterpriseName == undefined) {
                        this.span3 = true;
                        this.spanText3 = "公司名称不能为空";
                        isvaliPass = false;
                    } else {
                        this.span3 = false;
                    }

                }

                if (value == "enterpriseAddress") {
                    if (this.memberLog.enterpriseAddress == "" || this.memberLog.enterpriseAddress == undefined) {
                        this.span4 = true;
                        this.spanText4 = "公司地址不能为空";
                        isvaliPass = false;
                    } else {
                        this.span4 = false;
                    }

                }

                if (value == "project") {
                    if (this.memberLog.project == "" || this.memberLog.project == undefined) {
                        this.span5 = true;
                        this.spanText5 = "品牌项目不能为空";
                        isvaliPass = false;
                    } else {
                        this.span5 = false;
                    }
                }

                if (value == "projectAddress") {
                    if (this.memberLog.projectAddress == "" || this.memberLog.projectAddress == undefined) {
                        this.span6 = true;
                        this.spanText6 = "项目地址不能为空";
                        isvaliPass = false;
                    } else {
                        this.span6 = false;
                    }

                }

                if (value == "contacts") {
                    if (this.memberLog.contacts == "" || this.memberLog.contacts == undefined) {
                        this.span7 = true;
                        this.spanText7 = "联系人不能为空";
                        isvaliPass = false;
                    } else {
                        this.span7 = false;
                    }

                }

                if (value == "position") {
                    if (this.memberLog.position == "" || this.memberLog.position == undefined) {
                        this.span8 = true;
                        this.spanText8 = "职位不能为空";
                        isvaliPass = false;
                    } else {
                        this.span8 = false;
                    }
                }

                if (value == "contactInformation") {
                    if (this.memberLog.contactInformation == "" || this.memberLog.contactInformation == undefined) {
                        this.span9 = true;
                        this.spanText9 = "联系方式不能为空";
                        isvaliPass = false;
                    } else {
                        this.span9 = false;
                    }

                }

                if (value == "visit") {
                    if (this.memberLog.visit == "" || this.memberLog.visit == undefined) {
                        this.span10 = true;
                        this.spanText10 = "拜访不能为空";
                        isvaliPass = false;
                    } else {
                        this.span10 = false;
                    }
                }
            }
            return isvaliPass;
        },
        addContract(value) {
            let arry = [value];
            this.vali(arry);
            this.memberLogList[this.index] = this.memberLog;
        },
        indexs() {
            this.customerName = sessionStorage.getItem('name');
            this.dtoName = sessionStorage.getItem('dto');
            this.roleName = sessionStorage.getItem('role');
        },
        createMemberLog() {

            let arry = ["visit", "contactInformation", "position", "contacts", "projectAddress", "project", "enterpriseAddress", "enterpriseName", "customerType", "industry"];
            var isvali = this.vali(arry);
            if (!isvali) {
                return;
            }

            var date = this.enterpriseRemindDate;
            date = new Date(date);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            var s = date.getSeconds();
            var S = date.getMilliseconds();
            var time = y + '-' + m + '-' + d + " 00:00:00";
            this.handleSpinCustom();
            if (this.memberLog.industry == "" && this.memberLog.customerType == "" && this.memberLog.enterpriseName == "" && this.memberLog.enterpriseAddress == ""
                && this.memberLog.project == "" && this.memberLog.projectAddress == "" && this.memberLog.contacts == "" && this.memberLog.position == "" && this.memberLog.contactInformation == ""
                && this.memberLog.visit == "") {
                this.$Message.error("请输入完整的信息")
            } else {
                this.$axios.post('/api/front/member/createMemberLog.json', {
                    memberLogDto: this.memberLogList,
                    enterpriseRemindDate: time
                }
                ).then(res => {
                    if (res.data.success) {
                        this.$Spin.hide();
                        this.$Message.success('保存成功');
                        this.$router.push({
                            path: '/journalList'
                        })
                    } else {
                        this.$Spin.hide();
                        this.$Message.error(res.data.message);
                    }
                })
            }
        },
        findMemberLogTime() {
            this.$axios.get('/api/front/member/findMemberLogTime.json', {

            }).then(res => {
                  var date = res.data.data;
                        date = new Date(date);
                        var y = date.getFullYear();
                        var m = date.getMonth() + 1;
                        m = m < 10 ? '0' + m : m;
                        var d = date.getDate();
                        d = d < 10 ? ('0' + d) : d;
                        var h = date.getHours();
                        var time = y + '-' + m + '-' + d
                       this.logTime = time;
            })
        },
        logById() {
            var id = sessionStorage.getItem('jId');
            if (id) {
                this.readonly = true;
                this.isButton = false;
            }
            this.$axios.get('/api/front/member/findMemberLogByList.json', {
                params: {
                    id: id
                }
            }).then(res => {
                if (res.data.success) {
                    this.memberLogList = res.data.data.logList;
                    this.memberLog = res.data.data.logList[0];
                    this.enterpriseRemindDate = res.data.data.enterpriseRemindDate;
                    for (var j = 0; j < this.memberLogList.length - 1; j++) {
                        this.navList.push({
                            img1: '/static/img/numGreen.png',
                            img2: '/static/img/numBack.png'
                        })
                    }
                }
            })
        },
        addList() {
            if (this.memberLogList[this.memberLogList.length - 1] != null) {
                this.chenge(this.memberLogList.length - 1);
            }
            var lists = ["visit", "contactInformation", "position", "contacts", "projectAddress", "project", "enterpriseAddress", "enterpriseName", "customerType", "industry"];
            if (this.vali(lists)) {
                if (this.navList.length == 3) {
                    this.$Message.error("臣妾只能添加3个哦！ _(:3」∠)_");
                    return;
                } else {
                    this.navList.push({
                        img1: '/static/img/numGreen.png',
                        img2: '/static/img/numBack.png'
                    });
                    this.memberLogList[this.index] = this.memberLog;
                    this.index = this.navList.length - 1;
                    this.memberLogList.push({});
                    this.clearValue();//清空數據
                }
            }
        },
        clearValue() {
            this.memberLog = {};
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
                    this.memberLog = this.memberLogList[this.memberLogList.length - 2];
                    this.chenge(this.memberLogList.length - 2);
                    this.navList.pop();
                    // this.dtoDetailDtoList.dtoDetailDto.deleteList.push(this.contractList[this.contractList.length - 1].id);
                    this.memberLogList.pop();
                }
            });
        },
        chenge(index) {  //切换方法

            var lists = ["visit", "contactInformation", "position", "contacts", "projectAddress", "project", "enterpriseAddress", "enterpriseName", "customerType", "industry"];
            if (this.vali(lists)) {
                this.index = index;
                this.memberLog = this.memberLogList[index];
            }
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
        }
    },
    mounted() {
        this.indexs();
        this.findMemberLogTime();
        if (sessionStorage.getItem('jId') == null) {
            this.isHide = true;
        } else {
            this.isHide = false;
            this.logById();
        }
    }
}
</script>

<style>
@import url('./journal.css');
</style>


