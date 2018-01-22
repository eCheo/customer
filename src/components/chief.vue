<template>
    <div class="minW">
        <div class="center">
            <div class="i_left">
                <div class="i_top">
                    <img src="/static/img/left_03.png">
                    <div>
                        <ul class="i_list">
                            <li class="i_item">
                                <Input v-model="LIKE_corporateName" size="large" placeholder="公司名称"></Input>
                            </li>
                            <li class="i_item">
                                <Select v-model="EQ_mediaForm" style="width:200px;border-bottom:2px solid #01C675;" placeholder="媒体形式">
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
                    <div>
                        <ul class="i_list1">
                            <li>
                                <div class="wrapper">
                                    <div class="w_left">
                                        <img src="/static/img/fc.png">
                                    </div>
                                    <div class="w_right">
                                        <div style="font-size: 18px;">
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
                                通过数量
                                <div class="g_box">
                                    {{dataDto.recordSuccessCount}}
                                </div>
                            </li>
                            <li class="i_item1">
                                成交数量
                                <div class="g_box">
                                    {{dataDto.dealCount}}
                                </div>
                            </li>
                            <li class="i_item1">
                                到期数量
                                <div class="g_box">
                                    {{dataDto.isExpireCount}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="i_button">
                    <div class="i_but" @click="to">
                        <img src="/static/img/button_03.png">
                        <span>
                            增加备案
                        </span>
                    </div>
                    <div class="i_but">
                        <img src="/static/img/button_03.png">
                        <span>
                            公共信息
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
                </div>
            </div>

            <div class="i_center">
                <img src="/static/img/pencil_03.png">
            </div>

            <div class="i_right">
                <img src="/static/img/bookBig_02.png">
                <div style="position: absolute;top: 0px;width: 90%;">
                    <div class="logo">
                        <img src="/static/img/logo.png">
                    </div>
                    <div class="tab">
                        <Table :row-class-name="rowClassName" :loading="loading" :columns="columns1" :data="data1" @on-row-dblclick="findById"></Table>
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
                    title: '项目名称',
                    key: 'entryName'
                },
                {
                    title: '媒体形式',
                    key: 'mediaForm',
                    render: (h, params) => {
                        return params.row.mediaForm.message;
                    }
                },
                {
                    title: '备案状态',
                    key: 'recordStatus',
                    render: (h, params) => {
                        return params.row.recordStatus.message;
                    }
                }
            ],
            data1: [{
                corporateName: '',
                mediaForm: '',
                recordStatus: '',
                earlyWarning: '',
                entryName: ''
            }],
        }
    }
}
</script>
<style>
@import './index.css';
</style>
