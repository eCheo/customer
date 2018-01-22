<template>
    <div class="minW">
        <div class="jenter">
            <div class="j_left">
                <div class="j_top">
                    <img src="/static/img/left_03.png">
                    <div class="j_list">
                        <ul class="list_j">
                            <li class="item_j">
                                <Input size="large" placeholder="公司名称"></Input>
                            </li>
                            <li class="item_j">
                                <Input size="large" placeholder="项目名称"></Input>
                            </li>
                            <li class="item_j">
                                <Button type="primary" icon="ios-search">Search</Button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul class="j_list1">
                            <li>
                                <div class="j_wrapper">
                                    <div class="jw_left">
                                        <img src="/static/img/fc.png">
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
                    <div class="j_but" @click="to">
                        <img src="/static/img/button_03.png">
                        <span>
                            增加日志
                        </span>
                    </div>
                    <div class="j_but">
                        <img src="/static/img/button_03.png">
                        <span>
                            公共信息
                        </span>
                    </div>
                    <router-link to="/index">
                        <div class="j_but">
                            <img src="/static/img/button_03.png">
                            <span>
                                主页
                            </span>
                        </div>
                    </router-link>
                </div>
            </div>

            <div class="j_center">
                <img src="/static/img/pencil_03.png">
            </div>
            <div class="j_right">
                <img src="/static/img/bookBig_02.png">
                <div style="position: absolute;top: 0px;width: 100%;height:90%;">
                    <div class="j_logo">
                        <img src="/static/img/logo.png">
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


