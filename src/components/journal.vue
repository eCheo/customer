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
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">

                                        <Input v-model="memberLog.customerType" :readonly="readonly" @on-blur="addContract('customerType')">
                                        <span slot="prepend">客户分类</span>
                                        </Input>

                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.enterpriseName" :readonly="readonly" @on-blur="addContract('enterpriseName')">
                                        <span slot="prepend">公司名称</span>
                                        </Input>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.enterpriseAddress" :readonly="readonly" @on-blur="addContract('enterpriseAddress')">
                                        <span slot="prepend">公司地址</span>
                                        </Input>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.project" :readonly="readonly" @on-blur="addContract('project')">
                                        <span slot="prepend">品牌项目名称</span>
                                        </Input>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.projectAddress" :readonly="readonly" @on-blur="addContract('projectAddress')">
                                        <span slot="prepend">项目地址</span>
                                        </Input>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.contacts" :readonly="readonly" @on-blur="addContract('contacts')">
                                        <span slot="prepend">联系人</span>
                                        </Input>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.position" :readonly="readonly" @on-blur="addContract('position')">
                                        <span slot="prepend">职位</span>
                                        </Input>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.contactInformation" :readonly="readonly" @on-blur="addContract('contactInformation')">
                                        <span slot="prepend">联系方式</span>
                                        </Input>
                                    </div>
                                </div>
                                <div class="n_one1">
                                    <div class="one_left1">
                                        <Input v-model="memberLog.visit" :readonly="readonly" @on-blur="addContract('visit')">
                                        <span slot="prepend">拜访方式</span>
                                        </Input>
                                    </div>
                                </div>
                                <ul class="n_list">
                                    <li class="n_item">
                                        <div class="item_img1" @click="delect">
                                        </div>
                                    </li>
                                    <li class="n_item">
                                        <div class="item_img" @click="addList">
                                        </div>
                                    </li>
                                    <li class="n_item" v-for="(item,i) in navList" :key="i">
                                        <div @click="chenge(i)" style="height:30px;margin-top:-2px;">
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
                        <div class="clip">
                            <img src="/static/img/jiazi_03.png">
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
            navList: [{
                img1: '/static/img/numGreen.jpg',
                img2: '/static/img/numBack.jpg'
            }],
            index: 0,
            enterpriseRemindDate: '',
            isButton: true
        }
    },
    methods: {
        addContract(value) {
            var phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            var position = /^[\u0391-\uFFE5]+$/;
            var QQ = /^[0-9]&/
            if (value == "industry") {
                console.log(this.memberLog);
                if (this.memberLog.industry == "") {
                    this.$Message.error("行业不能为空");
                    return;
                } else if (!position.test(this.memberLog.industry)) {
                    this.$Message.error("行业只能输入汉字");
                }

            }
            if (value == "customerType") {
                if (this.memberLog.customerType == "") {
                    this.$Message.error("客户分类不能为空");
                    return;
                } else if (!position.test(this.memberLog.customerType)) {
                    this.$Message.error("客户分类只能输入汉字");
                }

            }

            if (value == "enterpriseName") {
                if (this.memberLog.enterpriseName == "") {
                    this.$Message.error("公司名称不能为空");
                    return;
                } else if (!position.test(this.memberLog.enterpriseName)) {
                    this.$Message.error("公司名称只能输入汉字");
                }

            }

            if (value == "enterpriseAddress") {
                if (this.memberLog.enterpriseAddress == "") {
                    this.$Message.error("公司地址不能为空");
                    return;
                } else if (!position.test(this.memberLog.enterpriseAddress)) {
                    this.$Message.error("公司地址只能输入汉字");
                }

            }

            if (value == "project") {
                if (this.memberLog.project == "") {
                    this.$Message.error("品牌项目不能为空");
                    return;
                } else if (!position.test(this.memberLog.project)) {
                    this.$Message.error("品牌项目只能输入汉字");
                }

            }

            if (value == "projectAddress") {
                if (this.memberLog.projectAddress == "") {
                    this.$Message.error("项目地址不能为空");
                    return;
                } else if (!position.test(this.memberLog.projectAddress)) {
                    this.$Message.error("项目地址只能输入汉字");
                }

            }

            if (value == "contacts") {
                if (this.memberLog.contacts == "") {
                    this.$Message.error("联系人不能为空");
                    return;
                } else if (!position.test(this.memberLog.contacts)) {
                    this.$Message.error("联系人只能输入汉字");
                }

            }

            if (value == "position") {
                if (this.memberLog.position == "") {
                    this.$Message.error("职位不能为空");
                    return;
                } else if (!position.test(this.memberLog.position)) {
                    this.$Message.error("职位只能输入汉字");
                }

            }

            if (value == "contactInformation") {
                if (this.memberLog.contactInformation == "") {
                    this.$Message.error("联系方式不能为空");
                    return;
                } else if (!position.test(this.memberLog.contactInformation)) {
                    this.$Message.error("联系方式只能输入汉字");
                }

            }

            if (value == "visit") {
                if (this.memberLog.visit == "") {
                    this.$Message.error("拜访不能为空");
                    return;
                } else if (!position.test(this.memberLog.visit)) {
                    this.$Message.error("拜访方式只能输入汉字");
                }

            }

            this.memberLogList[this.index] = this.memberLog;
        },
        indexs() {
            this.customerName = sessionStorage.getItem('name');
            this.dtoName = sessionStorage.getItem('dto');
            this.roleName = sessionStorage.getItem('role');
        },
        createMemberLog() {

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
            if (this.memberLog == "") {
                this.$Message.error("请输入完整的信息")
            } else {
                this.$axios.post('/api/front/member/createMemberLog.json', {
                    memberLogDto: this.memberLogList,
                    enterpriseRemindDate: time
                }
                ).then(res => {
                    if (res.data.success) {
                        this.$Message.success('保存成功');
                        this.$router.push({
                            path: '/journalList'
                        })
                    } else {
                        this.$Message.error(res.data.success);
                    }
                })
            }




        },
        findMemberLogTime() {
            this.$axios.get('/api/front/member/findMemberLogTime.json', {

            }).then(res => {
                this.logTime = res.data.data;
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
                    this.enterpriseRemindDate=res.data.data.enterpriseRemindDate;
                    for (var j = 0; j < this.memberLogList.length - 1; j++) {
                        this.navList.push({
                            img1: '/static/img/numGreen.jpg',
                            img2: '/static/img/numBack.jpg'
                        })
                    }
                }
            })
        },
        addList() {
            var phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

            if (this.memberLogList[this.memberLogList.length - 1] != null && (this.memberLogList[this.memberLogList.length - 1].phone == null || this.memberLogList[this.memberLogList.length - 1].phone == "")) {
                this.chenge(this.memberLogList.length - 1);
            }
            if (this.navList.length == 3) {
                this.$Message.error("臣妾只能添加3个哦！ _(:3」∠)_");
                return;
            } else {
                this.navList.push({
                    img1: '/static/img/numGreen.jpg',
                    img2: '/static/img/numBack.jpg'
                });
                this.memberLogList[this.index] = this.memberLog;
                this.index = this.navList.length - 1;
                this.memberLogList.push({});
                this.clearValue();//清空數據
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
                    this.chenge(this.memberLogList.length - 2);
                    this.navList.pop();
                    this.dtoDetailDtoList.dtoDetailDto.deleteList.push(this.contractList[this.contractList.length - 1].id);
                    this.memberLogList.pop();
                }
            });
        },
        chenge(index) {  //切换方法
            this.index = index;
            this.memberLog = this.memberLogList[index];
        },
    },
    mounted() {
        this.indexs();
        this.findMemberLogTime();
        if (sessionStorage.getItem('jId') == null) {
            return;
        } else {
            this.logById();
        }
    }
}
</script>

<style>
@import url('./journal.css');
</style>


