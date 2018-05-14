<template>
    <div class="minW">
        <div style="width:100%;height:4%;"></div>
        <div class="jenter">
            <div class="j_left">
                <div class="j_top">
                    <img src="/static/img/left_03.png">
                    <div class="j_list">
                        <div class="j_box">
                            <ul class="list_j">
                                <li class="item_j">
                                    <Input v-model="enterpriseName" size="large" icon="android-search" placeholder="搜索企业名称"></Input>
                                </li>
                                <li class="item_j">
                                    <Button @click="logByPage(1)" type="primary" icon="ios-search">Search</Button>
                                </li>

                            </ul>
                        </div>

                        <div class="j_bb">
                            <ul class="j_list1">
                                <li>
                                    <div class="j_wrapper">
                                        <div class="jw_left">
                                            <img :src="imgTou">
                                        </div>
                                        <div class="jw_right">
                                            <div style="font-size: 18px;">
                                                {{EQ_name}}
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
                            </ul>
                        </div>
                    </div>
                    <div class="j_button">
                        <div class="j_but" @click="to" v-show="isHide">
                            <img src="/static/img/button_03.png">
                            <span>
                                增加日志
                            </span>
                        </div>

                        <div class="j_but" @click="pool">
                            <img src="/static/img/button_03.png">
                            <span>
                                公共信息
                            </span>
                        </div>

                        <div class="j_but" @click="goIndex">
                            <img src="/static/img/button_03.png">
                            <span>
                                主页
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="j_center">
                <img src="/static/img/pencil_03.png">
            </div>
            <div class="j_right">
                <img src="/static/img/bookBig_02.png">
                <div style="position: absolute;top: 0px;width: 100%;height:90%;">
                    <div class="j_logo">
                        <img src="/static/img/logo.jpg">
                    </div>
                    <div class="j_tab">
                        <Table :loading="loading" :columns="columns1" :data="data1" @on-row-dblclick="findByList"></Table>
                    </div>
                    <div class="j_page">
                        <Page :total="total" @on-change="logByPage"></Page>
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
                    title: '序号',
                    type: 'index',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '企业名称1',
                    key: 'enterpriseOne',
                    align: 'center',
                    render: (h, params) => {
                        return params.row.enterpriseOne.length > 6 ? params.row.enterpriseOne.substring(0, 6) + "..." : params.row.enterpriseOne;
                    }
                },
                {
                    title: '企业名称2',
                    key: 'enterpriseTwo',
                    align: 'center',
                      render: (h, params) => {
                        return params.row.enterpriseTwo.length > 6 ? params.row.enterpriseTwo.substring(0, 6) + "..." : params.row.enterpriseTwo;
                    }
                },
                {
                    title: '企业名称3',
                    key: 'enterpriseThree',
                    align: 'center',
                       render: (h, params) => {
                        return params.row.enterpriseThree.length > 6 ? params.row.enterpriseThree.substring(0, 6) + "..." : params.row.enterpriseThree;
                    }
                },
                {
                    title: '日期',
                    key: 'recordDate',
                    align: 'center',
                    width: 120,
                    render: (h, params) => {
                        var date = params.row.recordDate;
                        date = new Date(date);
                        var y = date.getFullYear();
                        var m = date.getMonth() + 1;
                        m = m < 10 ? '0' + m : m;
                        var d = date.getDate();
                        d = d < 10 ? ('0' + d) : d;
                        var time = y + '-' + m + '-' + d;
                        return time;
                    }
                }
            ],
            data1: [
            ],
            total: 0,
            loading: false,
            EQ_name: '',
            dtoName: '',
            roleName: '',
            current: 1,
            enterpriseName: '',
            search: '',
            isHide: true,
            imgTou: ''
        }
    },
    methods: {
        login() {
            this.EQ_name = sessionStorage.getItem('name');
            this.dtoName = sessionStorage.getItem('dto');
            this.roleName = sessionStorage.getItem('role');

            var sex = sessionStorage.getItem("sex");
            if (sex == "Man") {
                this.imgTou = '/static/img/nan_03.png';
                return;
            }
            if (sex == 'WoMan') {
                this.imgTou = '/static/img/nv_03.png';
                return;
            }



        },
        logByPage(current) {
            this.loading = true;

            this.$axios.get('/api/front/member/findMemberLogByPage.json', {
                params: {
                    enterpriseName: this.enterpriseName,
                    page: this.current,
                    size: 9,
                    sort: 'enterpriseRemindDate,asc'
                }
            }).then(res => {
                this.data1 = res.data.data.content;
                this.loading = false;
            })
        },
        logPageAdmin(current) {
            this.loading = true;
            var admin = sessionStorage.getItem('admin');
            if (admin == "administrators") {
                this.isHide = false;
            }
            if (admin == "examiner") {
                this.isHide = false;
            }

            this.$axios.get('/api/front/member/findAdminMemberLogByPage.json', {
                params: {
                    enterpriseName: this.enterpriseName,
                    page: this.current,
                    size: 9,
                }
            }).then(res => {
                this.data1 = res.data.data.content;
                this.loading = false;
            })
        },
        findByList(index) {
            sessionStorage.setItem('jId', index.id);
            this.$router.push({
                path: '/journal'
            })
        },
        to() {
            sessionStorage.removeItem('jId');
            this.$router.push({
                path: '/journal'
            })
        },
        goIndex() {
            var admin = sessionStorage.getItem('admin');
            if (admin == "administrators") {
                this.$router.push({
                    path: '/indexadmin'
                })
            } else if (admin == "examiner") {
                this.$router.push({
                    path: '/chief'
                })
            } else if (admin == "network") {
                this.$router.push({
                    path: '/network'
                })
            } else {
                this.$router.push({
                    path: '/index'
                })
            }
        },
        pool() {
            var admin = sessionStorage.getItem('admin');
            if (admin == "administrators" || admin == "examiner") {
                this.$router.push({
                    path: "/pooladmin"
                })
                return;
            }
            if (admin == "ordinary" || admin == "network") {
                this.$router.push({
                    path: "/pool"
                })
                return;
            }
        }
    },
    mounted() {
        this.login();
        var admin = sessionStorage.getItem('admin');
        if (admin == "administrators" || admin == "examiner") {
            this.logPageAdmin()
        } else {
            this.logByPage();
        }

    }
}
</script>

<style>
@import url('./journalList');
</style>


