<template>
    <div class="minW">
        <div style="width:100%;height:4%;"></div>
        <div class="center">
            <div class="i_left">
                <div class="i_top">
                    <div style="width:100%;height:15%;"></div>
                    <div class="i_box">
                        <div class="i_lii">
                            <ul class="i_list">
                                  <li class="a_item">
                                    <Input class='classname' v-model="staffName" size="large" placeholder="员工姓名"></Input>
                                </li>
                                 <li class="a_item">
                                    <Select size="small" v-model="departmentName" style="border-bottom:2px solid #01C675;" placeholder="部门名称">
                                        <Option v-for="item in departmentList" :value="item.name" :key="item.id">{{ item.name}}</Option>
                                    </Select>
                                </li>
                                <li class="i_item">
                                    <Input class="class" v-model="LIKE_corporateName" size="large" placeholder="公司名称"></Input>
                                </li>
                                <li class="i_item">
                                    <Input class="class" v-model="LIKE_entryName" size="large" placeholder="项目名称"></Input>
                                </li>
                                <li class="i_item">
                                    <Select size="small" v-model="EQ_mediaForm" style="border-bottom:2px solid #01C675;" placeholder="媒体形式">
                                        <Option v-for="item in mediaForm" :value="item.name" :key="item.code">{{ item.message }}</Option>
                                    </Select>
                                </li>
                                <li class="i_item">
                                    <Select size="small" class="iveInput" v-model="EQ_recordStatus" style="border-bottom:2px solid #01C675;" placeholder="状态">
                                        <Option v-for="item in statusList" :value="item.name" :key="item.code">{{ item.message }}</Option>
                                    </Select>
                                </li>
                                <li class="i_item">
                                    <Button type="primary" icon="ios-search" @click="condition(1)">Search</Button>
                                </li>
                            </ul>
                        </div>
                        <div style="width:100%;height:12%;"></div>
                        <div class="i_bb">
                            <ul class="i_list1">
                                <li>
                                    <div class="wrapper">
                                        <div class="w_left">
                                            <img :src="imgTou">
                                        </div>
                                        <div class="w_right">
                                            <div style="font-size: 18px;text-align:center;">
                                                {{name}}
                                            </div>
                                            <div>
                                                {{roleName}}
                                            </div>
                                            <div>
                                                部门:
                                                <label>{{dtoName}}</label>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="i_item1">
                                    <label>
                                        备案数量
                                    </label>
                                    <div class="g_box">
                                        {{countNumber}}
                                    </div>
                                </li>
                                <li class="i_item1">
                                    <label>
                                        成交数量
                                    </label>

                                    <div class="g_box">
                                        {{countDeal}}
                                    </div>
                                </li>
                                <li class="i_item1">
                                    <label>
                                        未审批备案数量
                                    </label>

                                    <div class="g_box">
                                        {{countAreview}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="i_button">
                        <div class="i_but" @click="modifyHide = true">
                            <img src="/static/img/button_03.png">
                            <span>
                                修改密码
                            </span>
                        </div>
                        <router-link to="/journalList">
                            <div class="i_but">
                                <img src="/static/img/button_03.png">
                                <span>
                                    日志
                                </span>
                            </div>
                        </router-link>
                        <router-link to="/chiefsee">
                            <div class="i_but">
                                <img src="/static/img/button_03.png">
                                <span>
                                    数据统计
                                </span>
                            </div>
                        </router-link>
                        <router-link to="/pooladmin">
                            <div class="i_but">
                                <img src="/static/img/button_03.png">
                                <span>
                                    公共信息
                                </span>
                            </div>
                        </router-link>
                         <div class="a_but" @click="condition(1)">
                            <img src="/static/img/button_03.png">
                            <span>
                               Search
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            <div class="i_center">
                <img src="/static/img/pencil_03.png">
            </div>
            <div class="i_right">
                <img src="/static/img/bookBig_02.png">
                <div style="position: absolute;top: 0px;width: 100%;height:90%;">
                    <div class="logo">
                        <img src="/static/img/logo.jpg">
                    </div>
                    <div class="tab">
                        <Table border width="576" border :row-class-name="rowClassName" height="473" :loading="loading" :columns="columns1" :data="data1" @on-row-dblclick="findById"></Table>
                    </div>
                    <div class="page">
                        <Page :total="total" :page-size="9" @on-change="condition"></Page>
                    </div>
                </div>
            </div>
        </div>

        <div class="v-transfer-dom" v-show="modifyHide">
            <div class="ivu-modal-mask">
                <Card dis-hover class="hide_div">
                    <p slot="title">
                        修改密码
                    </p>
                    <a href="#" slot="extra" title="关闭" @click.prevent="modifyHide = false">
                        <Icon type="android-close"></Icon>
                    </a>
                    <Input type="password" placeholder="原密码" v-model="usedPassword"></Input>
                    <div style="height:20px;">

                    </div>

                    <Input type="password" placeholder="新密码" v-model="usedPassword2" @on-blur="passwordNew"></Input>
                    <div style="height:20px;">
                        <p style="color:#FA150A;" v-show="isPassword2">
                            新密码最小6位最大11位
                        </p>
                    </div>

                    <Input type="password" placeholder="再次输入新密码" v-model="newPassword" @on-blur="passwordChange"></Input>
                    <div style="height:20px;">
                        <p style="color:#FA150A;" v-show="isPassword">
                            两次密码不一致
                        </p>
                    </div>
                    <Row class-name="excelRow">
                        <Col span="4" offset="14">
                        <Button type="ghost" @click="modifyHide = false">取消</Button>
                        </Col>
                        <Col span="6">
                        <Button type="primary" :loading="loading" @click="modifyPassword" :disabled="isModify">
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
            //员工姓名
            staffName:'',
            columns1: [
                {
                    title: '姓名',
                    key: 'name',
                    align: 'center',
                    width: 80,
                    fixed: 'left'
                },
                {
                    title: '公司名称',
                    key: 'corporateName',
                    align: 'center',
                    width: 300,
                    render: (h, params) => {
                        return (h, 'div', [
                            h('p', {
                                domProps: {
                                    title: params.row.corporateName
                                }
                            }, params.row.corporateName)
                        ])
                    }
                },
                {
                    title: '项目名称',
                    key: 'entryName',
                    align: 'center',
                    width: 500,
                    render: (h, params) => {
                        return (h, 'div', [
                            h('p', {
                                domProps: {
                                    title: params.row.entryName
                                }
                            }, params.row.entryName.split(",").join("，"))
                        ])
                    }
                },
                {
                    title: '媒体形式',
                    key: 'mediaForm',
                    align: 'center',
                    width: 90,
                    render: (h, params) => {
                        return params.row.mediaForm;
                    }
                },
                {
                    title: '部门名称',
                    key: 'departmentName',
                    align: 'center',
                    width: 110
                },

                {
                    title: '备案状态',
                    key: 'recordStatus',
                    align: 'center',
                    width: 88,
                    fixed: 'right',
                    render: (h, params) => {
                        return params.row.recordStatus.message;
                    }
                }
            ],
            data1: [],
            countAreview: '',
            countDeal: '',
            countNumber: '',
            name: '',
            roleName: '',
            dtoName: '',
            current: 1,
            total: 0,
            loading: true,
            LIKE_corporateName: '',
            LIKE_entryName: '',
            mediaForm: [],
            EQ_recordStatus: '',
            EQ_mediaForm: '',
            imgTou: '',
            statusList: [],
            usedPassword2: '',
            usedPassword: '',
            newPassword: '',
            isPassword: false,
            isModify: false,
            modifyHide: false,
            isPassword2: false
        }
    },
    methods: {
        rowClassName(row, index) {
            if (row.earlyWarning.name == "gules") {
                return 'demo-table-info-row';
            }
            return '';
        },

        login() {
             sessionStorage.getItem('staffName')=="null"?"":this.staffName=sessionStorage.getItem('staffName');
                sessionStorage.getItem('departmentName') == "null"?"":this.departmentName = sessionStorage.getItem('departmentName');
            sessionStorage.getItem('LIKE_corporateName') == "null" ? "" : this.LIKE_corporateName = sessionStorage.getItem('LIKE_corporateName');
            sessionStorage.getItem('LIKE_entryName') == "null" ? "" : this.LIKE_entryName = sessionStorage.getItem('LIKE_entryName');
            sessionStorage.getItem('EQ_mediaForm') == "null" ? "" : this.EQ_mediaForm = sessionStorage.getItem('EQ_mediaForm');
            sessionStorage.getItem('EQ_recordStatus') == "null" ? "" : this.EQ_recordStatus = sessionStorage.getItem('EQ_recordStatus');
            this.$axios.get('/api/front/member/findMemberIndex.json', {

            }).then(res => {
                this.name = res.data.data.name;
                this.roleName = res.data.data.roleDto.name;
                this.dtoName = res.data.data.departmentDto.name;
                sessionStorage.setItem('name', this.name);
                sessionStorage.setItem('dto', this.dtoName);
                sessionStorage.setItem('role', this.roleName);
            })
            var sex = sessionStorage.getItem("sex");
            if (sex == "Man") {
                this.imgTou = '/static/img/nan_03.png';
            }
            if (sex == 'WoMan') {
                this.imgTou = '/static/img/nv_03.png';
            }

        },
        condition(current) {
            this.loading = true;
            sessionStorage.setItem('staffName',this.staffName);
               sessionStorage.setItem('departmentName',this.departmentName);
            sessionStorage.setItem('LIKE_corporateName', this.LIKE_corporateName);
            sessionStorage.setItem('LIKE_entryName', this.LIKE_entryName);
            sessionStorage.setItem('EQ_mediaForm', this.EQ_mediaForm);
            sessionStorage.setItem('EQ_recordStatus', this.EQ_recordStatus);
            this.$axios.get('/api/metadata/getByEnumClassSimpleName.json', {
                params: {
                    enumClassSimpleName: 'RecordStatus'
                }
            }).then(response => {


            });
            this.$axios.get('/api/front/record/findByConditionAdminPage.json', {
                params: {
                    page: current,
                    size: 9,
                    LIKE_corporateName: this.LIKE_corporateName,
                    EQ_mediaForm: this.EQ_mediaForm == "whole" ? "" : this.EQ_mediaForm,
                    EQ_recordStatus: this.EQ_recordStatus == "unselected" ? "" : this.EQ_recordStatus,
                    LIKE_entryName: this.LIKE_entryName,
                    LIKE_name: this.staffName,
                     LIKE_departmentName: this.departmentName == "请选择" ? "" : this.departmentName,
                    IN_recordStatus: "E_deal,E_recordSuccess,A_review,A_shareReview,A_updateTime",
                    sort: 'recordStatus,asc'
                }
            }).then(res => {
                this.total = res.data.data.totalElements;
                this.data1 = res.data.data.content;
                this.id = res.data.data.content.id;
                this.loading = false;
            })
        },
        getMediaForm() {
            this.$axios.get('/api/metadata/getByEnumClassSimpleName.json', {
                params: {
                    enumClassSimpleName: "MediaForm"

                }
            }).then(res => {

                this.mediaForm = res.data.data;

                // console.log(this.mediaForm);
            })
        },
        getRecordStatus() {
            this.$axios.get('/api/metadata/getByEnumClassSimpleName.json', {
                params: {
                    enumClassSimpleName: "RecordStatus"
                }
            }).then(res => {
                this.statusList = res.data.data;
                this.statusList.splice(0, 1);
                this.statusList.splice(1, 1);
                this.statusList.splice(3, 2);
                this.statusList.splice(3, 1);
                this.statusList.splice(4, 1);
                this.statusList.unshift({
                    name: "unselected",
                    code: "unselected",
                    message: "请选择"
                })
            })
        },
        findById(index) {

            sessionStorage.setItem('id', index.id);
            this.$router.push({
                path: '/chiefadmin'

            })
        },
        find() {
            this.$axios.get('/api/front/record/getCountRecordNumber.json', {

            }).then(res => {
                this.countAreview = res.data.data.countAreview;
                this.countDeal = res.data.data.countDeal;
                this.countNumber = res.data.data.countNumber;
            })
        },
        modifyPassword() {
            if (this.newPassword != this.usedPassword2 || this.usedPassword == "" || this.usedPassword2 == "" || this.newPassword == "") {
                this.isPassword = true;
                this.isModify = true;
            } else {
                this.$axios.post("/api/front/member/updatePassWord.json", {
                    oldPassWord: this.usedPassword,
                    password: this.newPassword
                }).then(res => {
                    if (res.data.success) {
                        this.$Message.success("修改成功,请重新登陆");
                        this.$router.push({ path: '/' })
                    } else {
                        this.$Message.error(res.data.message);
                    }
                })
            }
        },
        passwordChange() {
            if (this.newPassword != this.usedPassword2) {
                this.isPassword = true;
                this.isModify = true;
            } else {
                this.isPassword = false;
                this.isModify = false;
            }
        },
        passwordNew() {
            var reg = /^[0-9a-zA-Z]{6,11}$/
            if (!reg.test(this.usedPassword2)) {
                this.isPassword2 = true;
                this.isModify = true;
            } else {
                this.isPassword2 = false;
                this.isModify = false;
            }
        }
    },
    mounted() {
        this.getMediaForm();
        this.getRecordStatus();
        this.login();
        this.condition(this.current);
        this.find();
    }
}
</script>
<style>
@import './index.css';
</style>
