<template>
    <div class="minW">
        <div style="width:100%;height:4%;"></div>
        <div class="center">
            <div class="i_left">
                <div class="i_top">
                    <div style="width:100%;height:9%;"></div>
                    <div class="i_box">
                        <div class="i_lii">
                            <ul class="i_list">
                                <li class="i_item">
                                    <Input class="class" v-model="staffName" size="large" placeholder="员工姓名"></Input>
                                </li>
                                <li class="i_item">
                                    <Input class="class" v-model="LIKE_corporateName" size="large" placeholder="公司名称"></Input>
                                </li>
                                <li class="i_item">
                                    <Input class="class" v-model="LIKE_entryName" size="large" placeholder="项目名称"></Input>
                                </li>
                                <li class="i_item">
                                    <Select size="small" v-model="EQ_mediaForm"   style="border-bottom:2px solid #01C675;" placeholder="媒体形式">
                                        <Option v-for="item in mediaForm" :value="item.name" :key="item.code">{{ item.message }}</Option>
                                    </Select>
                                </li>
                                <li class="i_item">
                                    <Select size="small" v-model="EQ_recordStatus" style="border-bottom:2px solid #01C675;" placeholder="状态">
                                        <Option v-for="item in statusList" :value="item.name" :key="item.code">{{ item.message }}</Option>
                                    </Select>
                                </li>
                                <li class="i_item">
                                    <Button type="primary" icon="ios-search" @click="condition(1)">Search</Button>
                                </li>
                            </ul>
                        </div>
                        <div style="width:100%;height:11%;"></div>
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
                                        {{dataDto.recordCount}}
                                    </div>
                                </li>
                                <li class="i_item1">
                                    <label>
                                        通过数量
                                    </label>

                                    <div class="g_box">
                                        {{dataDto.recordSuccessCount}}
                                    </div>
                                </li>
                                <li class="i_item1">
                                    <label>
                                        成交数量
                                    </label>

                                    <div class="g_box">
                                        {{dataDto.dealCount}}
                                    </div>
                                </li>
                                <li class="i_item1">
                                    <label>
                                        到期数量
                                    </label>

                                    <div class="g_box">
                                        {{dataDto.isExpireCount}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="i_button">
                        <div class="i_but" @click="queryHide = true">
                            <img src="/static/img/button_03.png">
                            <span>
                                查询
                            </span>
                        </div>
                        <div class="i_but" @click="modifyHide = true">
                            <img src="/static/img/button_03.png">
                            <span>
                                修改密码
                            </span>
                        </div>
                        <div class="i_but" @click="to">
                            <img src="/static/img/button_03.png">
                            <span>
                                增加备案
                            </span>
                        </div>
                        <router-link to="/pool">
                            <div class="i_but">
                                <img src="/static/img/button_03.png">
                                <span>
                                    公共信息
                                </span>
                            </div>
                        </router-link>
                        <router-link to="/journalList">
                            <div class="i_but">
                                <img src="/static/img/button_03.png">
                                <span>
                                    日志
                                </span>
                            </div>
                        </router-link>
                    </div>
                </div>

            </div>

            <div class="i_center">
                <img src="/static/img/pencil_03.png">
            </div>
            <div class="i_right">
                <img src="/static/img/bookBig_02.png">
                <div style="position: absolute;top: 0px;width:100%;height:90%;">
                    <div class="logo">
                        <img src="/static/img/logo.jpg">
                    </div>
                    <div class="tab">
                        <Table width="576" height="473" border :row-class-name="rowClassName" :loading="loading" :columns="columns1" :data="data1" @on-row-dblclick="findById"></Table>
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

        <div class="v-transfer-dom" v-show="queryHide">
            <div class="ivu-modal-mask">
                <Card dis-hover class="hide_div2">
                    <p slot="title">
                        查询
                    </p>
                    <a href="#" slot="extra" title="关闭" @click.prevent="queryHide = false">
                        <Icon type="android-close"></Icon>
                    </a>
                    <div style="display:flex;width:70%;">
                        <Input style="width:30%;margin-right:10px;border-bottom:2px solid #01C675;" type="text" placeholder="公司名称" v-model="corporate"></Input>
                        <Input style="width:30%;margin-right:10px;border-bottom:2px solid #01C675;" type="text" placeholder="项目名称" v-model="project"></Input>
                        <Select v-model="EQ_mediaForm2"   style="border-bottom:2px solid #01C675;width:30%;margin-right:10px;" placeholder="媒体形式">
                            <Option v-for="item in mediaList" :value="item.name" :key="item.code">{{ item.message }}</Option>
                        </Select>
                        <Button type="primary" icon="ios-search" @click="searchs(1)">Search</Button>
                    </div>
                    <br>
                    <Table :loading="loading" height="425" border :columns="columns2" :data="data4"></Table>

                    <Page style="margin-top:5px;" :total="totalSearch" :page-size="8" @on-change="searchs"></Page>
                </Card>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
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
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return params.row.mediaForm;
                    }
                },
                {
                    title: '备案状态',
                    key: 'recordStatus',
                    align: 'center',
                    width: 90,
                    fixed: 'right',
                    render: (h, params) => {
                        return params.row.recordStatus.message;
                    }
                },
                {
                    title: '操作',
                    key: 'caozuo',
                    fixed: 'right',
                    align: 'center',
                    width: 70,
                    render: (h, params) => {
                        return (h, "div", [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: '纳入公共池',
                                            content: '<p>是否纳入公共次</p>',
                                            onOk: () => {
                                                this.into(params.index, params.row.id)
                                            }

                                        });

                                    }
                                }
                            }, '入池')
                        ]);
                    }
                }
            ],
            data1: [{
                corporateName: '',
                mediaForm: '',
                recordStatus: '',
                earlyWarning: '',
                name: '',
                entryName: ''
            }],
            dataDto: '',
            name: '',
            roleName: '',
            dtoName: '',
            current: 1,
            total: 0,
            totalSearch: 0,
            loading: true,
            LIKE_corporateName: '',
            LIKE_entryName: '',
            mediaForm: [],
            mediaList:[],
            EQ_recordStatus: '',
            EQ_mediaForm: '',
            EQ_mediaForm2: '',
            statusName: '',
            imgTou: '',
            statusList: [],
            usedPassword2: '',
            usedPassword: '',
            newPassword: '',
            isPassword: false,
            isModify: false,
            modifyHide: false,
            isPassword2: false,
            queryHide: false,
            corporate: '',
            onRecord: [],
            project: '',
            onProject: [],
            columns2: [
                {
                    title: '公司名称',
                    key: 'corporateName',
                    width: 300
                },

                {
                    title: '项目名称',
                    key: 'entryName'

                },
                {
                    title: '媒体形式',
                    key: 'mediaForm',
                    width: 90,
                    render: (h, params) => {
                        return params.row.mediaForm;
                    }
                }
            ],
            data4: [],
            staffName: ''
        }
    },
    methods: {
        login() {
            this.$axios.get('/api/front/member/findMemberIndex.json', {

            }).then(res => {
                this.name = res.data.data.name;
                this.dataDto = res.data.data.countRecordDto;
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
            this.$axios.get('/api/front/record/findByConditionPage.json', {
                params: {
                    page: current,
                    size: 9,
                    LIKE_corporateName: this.LIKE_corporateName,
                    LIKE_name: this.staffName,
                    EQ_mediaForm: this.EQ_mediaForm == "whole" ? "" : this.EQ_mediaForm,
                    LIKE_entryName: this.LIKE_entryName,
                    EQ_recordStatus: this.EQ_recordStatus == "unselected" ? "" : this.EQ_recordStatus,
                    NEQ_recordStatus: 'H_share',
                    sort: "recordStatus,desc"

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
               
            
                this.mediaList = res.data.data;
               
                // this.mediaList.unshift({
                //     name: "unselected",
                //     code: "unselected",
                //     message: "请选择"
                // })
                //  console.log(this.mediaList);
            })
        },
        getRecordStatus() {
            this.$axios.get('/api/metadata/getByEnumClassSimpleName.json', {
                params: {
                    enumClassSimpleName: "RecordStatus"
                }
            }).then(res => {
                this.statusList = res.data.data;
                this.statusList.splice(6, 1);
                this.statusList.unshift({
                    name: "unselected",
                    code: "unselected",
                    message: "请选择"
                })
            })
        },
        findById(index) {
            sessionStorage.setItem('id', index.id);
            sessionStorage.setItem('isUpdate', index.isUpdate);
            sessionStorage.setItem('recordStatus', index.recordStatus.name);


            this.$router.push({
                path: '/record'
            })

        },
        to() {
            sessionStorage.removeItem('id');
            sessionStorage.removeItem('recordStatus');
            this.$router.push({
                path: '/record'
            })
        },
        rowClassName(row, index) {
            sessionStorage.setItem('state', row.recordStatus.name)

            if (row.earlyWarning.name == "gules") {
                return 'demo-table-info-row';
            }
            return '';
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
        },
        searchs(value) {
            this.loading = true;
            this.$axios.get('/api/front/record/findByRecordPageAll.json', {
                params: {
                    page: value,
                    size: 8,
                    LIKE_corporateName: this.corporate,
                    EQ_mediaForm: this.EQ_mediaForm2 === "whole" ? "" : this.EQ_mediaForm2,
                    LIKE_entryName: this.project
                }
            }).then(res => {
                this.loading = false;
                this.data4 = res.data.data.content;
                this.totalSearch = res.data.data.totalElements;
            })
        },
        into(index, tId) {
            this.$axios.post('/api/front/record/shareRecord.json', {
                id: tId
            }).then(res => {
                if (res.data.success == true) {
                    this.data1.splice(index, 1);
                    this.login();
                    this.condition(1);
                    this.$Message.success("纳入公共次成功");
                } else {
                    this.$Message.error(res.data.message);
                }
            })
        }
    },
    mounted() {
        this.getMediaForm();
        this.getRecordStatus();
        this.login();
        this.condition(this.current);
    }
}
</script>
<style>
@import './index.css';
</style>
