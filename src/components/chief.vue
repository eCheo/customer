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
                                <li class="i_item">
                                    <Input v-model="LIKE_corporateName" size="large" placeholder="公司名称"></Input>
                                </li>
                                <li class="i_item">
                                    <Select v-model="EQ_mediaForm" style="border-bottom:2px solid #01C675;" placeholder="媒体形式">
                                        <Option v-for="item in mediaForm" :value="item.name" :key="item.code">{{ item.message }}</Option>
                                    </Select>
                                </li>
                                <li class="i_item">
                                    <Input v-model="LIKE_entryName" size="large" placeholder="项目名称"></Input>
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
                                            <img src="/static/img/fc.png">
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
                    </div>
                </div>

            </div>

            <div class="i_center">
                <img src="/static/img/pencil_03.png">
            </div>
            <div class="i_right">
                <img src="/static/img/bookBig_02.png">
                <div style="position: absolute;top: 0px;width: 90%;height:90%;">
                    <div class="logo">
                        <img src="/static/img/logo.png">
                    </div>
                    <div class="tab">
                        <Table :loading="loading" :columns="columns1" :data="data1" @on-row-dblclick="findById"></Table>
                    </div>
                    <div class="page">
                        <Page :total="total" :page-size="9" @on-change="condition"></Page>
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
            columns1: [
                {
                    title: '公司名称',
                    key: 'corporateName',
                },
                {
                    title: '媒体形式',
                    key: 'mediaForm',
                    render: (h, params) => {
                        return params.row.mediaForm.message;
                    }
                },
                {
                    title: '部门名称',
                    key: 'departmentName'
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '备案状态',
                    key: 'recordStatus',
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
            mediaForm: [],
            LIKE_entryName: '',
            EQ_mediaForm: ''
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

        },
        condition(current) {
            this.loading = true;

            this.$axios.get('/api/metadata/getByEnumClassSimpleName.json', {
                params: {
                    enumClassSimpleName: 'RecordStatus'
                }
            }).then(response => {
                console.log(response);

            });
            this.$axios.get('/api/front/record/findByConditionAdminPage.json', {
                params: {
                    page: current,
                    size: 9,
                    LIKE_corporateName: this.LIKE_corporateName,
                    EQ_mediaForm: this.EQ_mediaForm == "unselected" ? "" : this.EQ_mediaForm,
                    LIKE_entryName: this.LIKE_entryName,
                    IN_recordStatus: "E_deal,E_recordSuccess,A_review",
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
                this.mediaForm.unshift({
                    name: "unselected",
                    code: "unselected",
                    message: "请选择"
                })
                // console.log(this.mediaForm);
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
        }
    },
    mounted() {
        this.getMediaForm();
        this.login();
        this.condition(this.current);
        this.find();
    }
}
</script>
<style>
@import './index.css';
</style>
