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
                    <router-link to="/journal">
                    <div class="i_but">
                        <img src="/static/img/button_03.png">
                        <span>
                            增加日志
                        </span>
                    </div>
                    </router-link>
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
                    <Table :loading="loading" :columns="columns1" :data="data1"></Table>
                </div>
                <div class="page">
                    <Page :total="total" @on-change="condition"></Page>
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
                    key:'corporateName'
                },
                {
                    title: '项目名称',
                    key:'entryName'
                },
                {
                    title: '联系人',
                   key:'contactName'
                },
                {
                    title: '日期',
                    key:'time'
                }
            ],
            data1: [
                { 
                    corporateName:'',  //公司名称
                    entryName:'', //项目名称
                    time:'',
                    contactName:'' //联系人
                }
            ],
            total: 0,
            loading: false,
            EQ_name:'',
            dtoName:'',
            roleName:''
        }
    },
    methods: {
        logByPage() {
              
            this.$axios.post('/api/front/member/findMemberLogByPage.json',{
                EQ_name:this.EQ_name
            }).then(res => {
               this.EQ_name = sessionStorage.getItem('name');
               this.dtoName = sessionStorage.getItem('dto');
               this.roleName = sessionStorage.getItem('role');
            })
        }
    },
    mounted(){
         this.logByPage();
    }
}
</script>

<style>
@import url('./journalList');
</style>


