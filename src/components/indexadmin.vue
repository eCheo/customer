<template>
    <div class="minA">
        <div style="width:100%;height:4%;"></div>
        <div class="as_center">
            <div class="a_left">
                <div class="a_top">
                    <div style="width:100%;height:9%;"></div>
                    <div class="a_box">
                        <div class="a_lii">
                            <ul class="a_list">
                                <li class="a_item">
                                    <Input class='classname' v-model="staffName" size="large" placeholder="员工姓名"></Input>
                                </li>
                                <li class="a_item">
                                    <Select size="small" v-model="departmentName" style="border-bottom:2px solid #01C675;" placeholder="部门名称">
                                        <Option v-for="item in departmentList" :value="item.name" :key="item.id">{{ item.name}}</Option>
                                    </Select>
                                </li>
                                <li class="a_item">
                                    <Input class='classname' v-model="LIKE_corporateName" size="large" placeholder="公司名称"></Input>
                                </li>
                                <li class="a_item">
                                    <Input class='classname' v-model="LIKE_entryName" size="large" placeholder="项目名称"></Input>
                                </li>
                                <li class="a_item">
                                    <Select size="small"   v-model="EQ_mediaForm" style="border-bottom:2px solid #01C675;" placeholder="媒体形式">
                                        <Option v-for="item in mediaForm" :value="item.name" :key="item.code">{{ item.message }}</Option>
                                    </Select>
                                </li>
                                <li class="a_item">
                                    <Select size="small" v-model="EQ_recordStatus" style="border-bottom:2px solid #01C675;" placeholder="状态">
                                        <Option v-for="item in statusList" :value="item.name" :key="item.code">{{ item.message }}</Option>
                                    </Select>
                                </li>
                              

                            </ul>
                        </div>
                        <div style="width:100%;height:12%;"></div>
                        <div class="a_bb">
                            <ul class="a_list1">
                                <li>
                                    <div class="a_wrapper">
                                        <div class="aw_left">
                                            <img :src="imgTou">
                                        </div>
                                        <div class="aw_right">
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
                                <li class="ai_item1">
                                    <label>
                                        备案数量
                                    </label>
                                    <div class="ag_box">
                                        {{dataDto.recordCount}}
                                    </div>
                                </li>
                                <li class="ai_item1">
                                    <label>
                                        通过数量
                                    </label>

                                    <div class="ag_box">
                                        {{dataDto.recordSuccessCount}}
                                    </div>
                                </li>
                                <li class="ai_item1">
                                    <label>
                                        成交数量
                                    </label>

                                    <div class="ag_box">
                                        {{dataDto.dealCount}}
                                    </div>
                                </li>
                                <li class="ai_item1">
                                    <label>
                                        到期数量
                                    </label>

                                    <div class="ag_box">
                                        {{dataDto.isExpireCount}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="a_button">
                        <div class="a_but" @click="modifyHide = true">
                            <img src="/static/img/button_03.png">
                            <span>
                                修改密码
                            </span>
                        </div>
                        <router-link to="/pooladmin">
                            <div class="a_but">
                                <img src="/static/img/button_03.png">
                                <span>
                                    公共信息
                                </span>
                            </div>
                        </router-link>
                        <router-link to="/journalList">
                            <div class="a_but">
                                <img src="/static/img/button_03.png">
                                <span>
                                    日志
                                </span>
                            </div>
                        </router-link>
                        <div class="a_but" @click="isImportClick()">
                            <img src="/static/img/button_03.png">
                            <span>
                                导入Excel
                            </span>
                        </div>
                        <div class="a_but" @click="excel">
                            <img src="/static/img/button_03.png">
                            <span>
                                导出Excel
                            </span>
                        </div>
                        <div class="a_but" @click="condition(1)">
                            <img src="/static/img/button_03.png">
                            <span>
                               Search
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="a_center">
                <img src="/static/img/pencil_03.png">
            </div>
            <div class="a_right">
                <img src="/static/img/bookBig_02.png">
                <div style="position: absolute;top: 0px;width: 100%;height:90%;">
                    <div class="a_logo">
                        <img src="/static/img/logo.jpg">
                    </div>
                    <div class="a_tab">
                        <Table width="576" height="482" border :loading="loading" :columns="columns1" :data="data1" @on-row-dblclick="findById"></Table>
                    </div>
                    <div class="a_page">
                        <Page :total="total" :page-size="9" @on-change="condition"></Page>
                    </div>
                </div>
            </div>
        </div>

        <div class="v-transfer-dom" v-show="isImport">
            <div class="ivu-modal-mask">
                <Card dis-hover class="hide_div">
                    <p slot="title">
                        导入Excel
                    </p>
                    <a href="#" slot="extra" title="关闭" @click.prevent="isImport = false">
                        <Icon type="android-close"></Icon>
                    </a>
                    <Row>
                        <Col>
                        <Upload multiple action="/api/obs/upload.json" :on-progress="excleProgress" :show-upload-list="false" :format="['xls','xlsx']" :on-format-error="importFormatError" :on-success="importSuccess">
                            <Button type="ghost" icon="ios-cloud-upload-outline">导入Excel</Button>
                        </Upload>
                        <div v-if="file !== null">上传文件: {{ file.name }}
                            <Button type="text" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</Button>
                        </div>
                        </Col>
                    </Row>

                    <Row v-show="isRowhide" class-name="excelRow">
                        <Col span="15" style="margin-top:6px;">
                        <span style="color:red;">有错误的Excel文件是否需要下载</span>
                        </Col>
                        <Col span="4">
                        <Button type="ghost" @click="isRowhide = false">取消</Button>
                        </Col>
                        <Col span="4">
                        <Button type="primary" @click="importErrorDownload">下载</Button>
                        </Col>
                    </Row>
                </Card>
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
            columns1: [
                {
                    title: '姓名',
                    key: 'name',
                    fixed: 'left',
                    align:'center',
                    width:80,
                },
                {
                    title: '部门',
                    key: 'departmentName',
                    align:'center',
                    width:100
                },
                {
                    title: '公司名称',
                    key: 'corporateName',
                    align:'center',
                     width:300,
                    render: (h, params) => {
                        return (h, 'div', [
                            h('p', {
                                domProps: {
                                    title: params.row.corporateName
                                }
                            },  params.row.corporateName)
                        ])
                    }
                },
                {
                    title: '项目名称',
                    key: 'entryName',
                    align:'center',
                    width:500,
                    render: (h, params) => {
                        return (h, 'div', [
                            h('p', {
                                domProps: {
                                    title: params.row.entryName
                                }
                            },  params.row.entryName.split(",").join("，"))
                        ])
                    }
                },
                {
                    title: '媒体形式',
                    key: 'mediaForm',
                    align:'center',
                    width:100,
                    render: (h, params) => {
                        return params.row.mediaForm;
                    }
                },
                {
                    title: '备案状态',
                    key: 'recordStatus',
                    align:'center',
                     fixed: 'right',
                    width:100,
                    render: (h, params) => {
                        return params.row.recordStatus.message;
                    }
                },
                {
                    title: '操作',
                    key: 'caozuo',
                    fixed: 'right',
                    align:'center',
                      width:70,
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
                            }, '入池'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: '删除',
                                            content: '<p>是否删除该备案信息</p>',
                                            onOk: () => {
                                                this.remove(params.index, params.row.id)
                                            }

                                        });

                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data1: [{
                corporateName: '',
                mediaForm: '',
                recordStatus: '',
                earlyWarning: '',
                recordStatus: '',
                name: '',
                departmentName: '',
                entryName: ''
            }],
            dataDto: {
                recordCount: "",
                isExpireCount: "",
                recordSuccessCount: "",
                dealCount: "",
            },
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
            isImport: false,
            isRowhide: false,
            loadingStatus: false,
            file: null,
            statusList: [],
            usedPassword2: '',
            usedPassword: '',
            newPassword: '',
            isPassword: false,
            isModify: false,
            modifyHide: false,
            isPassword2: false,
            staffName: '',
            departmentName: '',
            departmentList: []
        }
    },
    methods: {
        login() {
         
            this.$axios.get('/api/front/member/findMemberIndex.json', {

            }).then(res => {
                this.name = res.data.data.name;

                this.roleName = res.data.data.roleDto.name;
                this.dtoName = res.data.data.departmentDto.name;

                sessionStorage.setItem('name', this.name);
                sessionStorage.setItem('dto', this.dtoName);
                sessionStorage.setItem('role', this.roleName);
            })
            this.$axios.get('/api/front/record/findCountRecordAdminDto.json', {

            }).then(res => {

                this.dataDto.recordCount = res.data.data.recordCount;
                this.dataDto.isExpireCount = res.data.data.isExpireCount;
                this.dataDto.recordSuccessCount = res.data.data.recordSuccessCount;
                this.dataDto.dealCount = res.data.data.dealCount;
            })
          
            var sex = sessionStorage.getItem("sex");
            if (sex == "Man") {
                this.imgTou = '/static/img/nan_03.png';
             
            }
            if (sex == 'WoMan') {
                this.imgTou = '/static/img/nv_03.png';
              
            }
            sessionStorage.getItem('staffName')=="null"?"":this.staffName=sessionStorage.getItem('staffName');
            sessionStorage.getItem('departmentName') == "null"?"":this.departmentName = sessionStorage.getItem('departmentName');
            sessionStorage.getItem('LIKE_corporateName') =="null"?"":this.LIKE_corporateName = sessionStorage.getItem('LIKE_corporateName');
            sessionStorage.getItem('LIKE_entryName') == "null" ? "" : this.LIKE_entryName = sessionStorage.getItem('LIKE_entryName');
            sessionStorage.getItem('EQ_mediaForm') == "null" ? "" :this.EQ_mediaForm = sessionStorage.getItem('EQ_mediaForm');
            sessionStorage.getItem('EQ_recordStatus')==""?"": this.EQ_recordStatus=sessionStorage.getItem('EQ_recordStatus')
           
        },
        condition(current) {
            this.loading = true;
            sessionStorage.setItem('staffName',this.staffName);
            sessionStorage.setItem('departmentName',this.departmentName);
            sessionStorage.setItem('LIKE_corporateName',this.LIKE_corporateName);
            sessionStorage.setItem('LIKE_entryName',this.LIKE_entryName);
            sessionStorage.setItem('EQ_mediaForm',this.EQ_mediaForm);
            sessionStorage.setItem('EQ_recordStatus',this.EQ_recordStatus);
            this.$axios.get('/api/metadata/getByEnumClassSimpleName.json', {
                params: {
                    enumClassSimpleName: 'RecordStatus'
                }
            }).then(response => {
                // console.log(response);

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
                    IN_recordStatus: "A_trial,E_deal,E_recordSuccess,A_shareTrial",
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
        getDepartment() {
            this.$axios.get('/api/front/member/findDepartmentList.json', {

            }).then(res => {
                this.departmentList = res.data.data;
                this.departmentList.unshift({
                    name: '请选择',
                    id: 'unselected'
                })
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
                this.statusList.splice(2, 1);
                this.statusList.splice(4, 1);
                this.statusList.splice(5, 2);
                this.statusList.splice(1, 1);
                this.statusList.splice(3, 1);
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
                path: '/recordadmin'

            })
        },
        remove(index, dId) {

            this.$axios.post('/api/front/record/deleteRecord.json', {
                id: dId
            }).then(res => {
                if (res.data.success == true) {
                    this.data1.splice(index, 1);
                    this.login();
                    this.$Message.success('删除成功');
                } else {
                    this.$Message.error(res.data.message);
                }

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
        },
        excel() {
            this.$axios.get('/api/front/record/excelExport.json', {
                responseType: 'arraybuffer', //下载必须设置请求头
                params: {
                    corporateName: this.LIKE_corporateName,
                    mediaForm: this.EQ_mediaForm,
                    recordStatus: this.EQ_recordStatus,
                    name: this.staffName,
                    departmentName: this.departmentName,
                    entryName:this.LIKE_entryName
                }
            }).then(res => {
                let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
                let objectUrl = URL.createObjectURL(blob);
                window.location.href = objectUrl;
            })
        },
        importSuccess(response, file, fileList) {

            if (response.success) {
                this.$axios.get('/api/front/record/excelImport.json', {
                    params: {
                        id: response.data.id
                    }
                }).then(res => {
                    this.file = null;
                    this.loadingStatus = false;
                    if (res.data.success == true) {
                        this.$Message.success("导入成功");
                        this.condition(1);
                    } else {
                        if (res.data.code == "60000") {
                            this.isRowhide = true;
                        }
                        this.$Message.error(res.data.message);
                    }
                })
            } else {
                this.$Message.error("文件上传错误");
            }

        },
        importFormatError(file) { //上传文件格式错误
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: file.name + ' 只能为xls,xlsx格式'
            });
        },
        importErrorDownload() { // 下载错误格式的excel
            this.$axios.get('/api/front/record/downloadErrorExcel.json', {
                responseType: 'arraybuffer'
            }).then(res => {

                let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
                let objectUrl = URL.createObjectURL(blob);
                window.location.href = objectUrl;
                this.isRowhide = false;
            })
        },
        excleProgress(event, file, fileList) {
            this.file = file;
            this.loadingStatus = true;
        },
        isImportClick() {  // 可以直接在事件里面写 this.isImport = true;或者用v-if
            this.isImport = true;

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
        this.getDepartment();
    }
}
</script>
<style>
@import './indexadmin.css';
</style>
