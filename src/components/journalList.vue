<template>
    <div class="minW">
        <div class="center">
            <div class="i_left">
                <div class="i_top">
                    <img src="/static/img/left_03.png">
                    <div class="j_list">
                        <ul class="i_list">
                            <li class="i_item">
                                <Input size="large" placeholder="公司名称"></Input>
                            </li>
                            <li class="i_item">
                                <Input size="large" placeholder="项目名称"></Input>
                            </li>
                            <li class="i_item">
                                <Button type="primary" icon="ios-search">Search</Button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul class="i_list1">
                            <li>
                                <div class="wrapper">
                                    <div class="w_left">
                                        <img src="/static/img/fc.png">
                                    </div>
                                    <div class="w_right">
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
                <div class="i_button">
                    <div class="i_but" @click="to">
                        <img src="/static/img/button_03.png">
                        <span>
                            增加日志
                        </span>
                    </div>
                    <div class="i_but">
                        <img src="/static/img/button_03.png">
                        <span>
                            公共信息
                        </span>
                    </div>
                    <router-link to="/index">
                        <div class="i_but">
                            <img src="/static/img/button_03.png">
                            <span>
                                主页
                            </span>
                        </div>
                    </router-link>
                </div>
            </div>

            <div class="i_center">
                <img src="/static/img/pencil_03.png">
            </div>
            <div class="i_right">
                <img src="/static/img/bookBig_02.png">
                <div class="logo">
                    <img src="/static/img/logo.png">
                </div>
                <div class="tab">
                    <Table :loading="loading" :columns="columns1" :data="data1" @on-row-dblclick="findByList"></Table>
                </div>
                <div class="page">
                    <Page :total="total" @on-change="logByPage"></Page>
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
                    key: 'enterpriseName'
                },
                {
                    title: '项目名称',
                    key: 'project'
                },
                {
                    title: '联系人',
                    key: 'contacts'
                },
                {
                    title: '日期',
                    key: 'remindDate',
                    render: (h, params) => {
                           var date = params.row.remindDate;
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
                {
                    enterpriseName: '',  //公司名称
                    project: '', //项目名称
                    remindDate: '', // 提醒时间
                    contacts: '' //联系人
                }
            ],
            total: 0,
            loading: false,
            EQ_name: '',
            dtoName: '',
            roleName: '',
            current: 1,
            EQ_enterpriseName: ''
        }
    },
    methods: {
        login() {
            this.EQ_name = sessionStorage.getItem('name');
            this.dtoName = sessionStorage.getItem('dto');
            this.roleName = sessionStorage.getItem('role');
        },
        logByPage(current) {
            this.loading = true;
            this.$axios.get('/api/front/member/findMemberLogByPage.json', {
                params: {
                    EQ_enterpriseName: "",
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
        }
    },
    mounted() {
        this.login();
        this.logByPage();
    }
}
</script>

<style>
@import url('./journalList');
</style>


