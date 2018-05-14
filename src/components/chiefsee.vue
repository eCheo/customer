<template>
    <div class="minS">
        <Row class-name="row">
            <Col span="3" class-name="col">
            <div class="huapen">
                <img src="/static/img/huapen.png">
            </div>
            <div class="year">
                <div class="year_font" v-for="(item,index) in  yearList" :key="item.index" @click="countGet(item,index)">
                    <span :class="index==indexs?'year_number2':'year_number'">{{item}}</span>
                </div>
            </div>
            </Col>
           
            <router-link to="/chief">
             <div class="home_img" >
                <img src="../../static/img/home.png">
            </div>
            </router-link>
          
            <Col span="9" offset="6" class-name="col">
            <div style="width:100%;height:10%;"></div>
            <div class="c_total">
                <div class="total_top">
                    <div class="total_logo">
                        <img src="/static/img/logo.jpg">
                    </div>
                    <div class="total_year">
                        {{yearList[indexs]}}
                    </div>
                </div>
                <div class="total_center">
                    <div class="table1">
                        <div style="text-align:center;background-color:#01C676;height:26px;line-height:26px;">
                            项目统计
                        </div>
                        <div class="table1_item1">
                            备案
                        </div>
                        <div class="table1_item2">
                            {{countObj.countRecord}}
                        </div>
                        <div class="table1_item1">
                            成交
                        </div>
                        <div class="table1_item2">
                            {{countObj.countDeal}}
                        </div>
                        <div class="table1_item1">
                            公共信息
                        </div>
                        <div class="table1_item2">
                            {{countObj.countShare}}
                        </div>
                    </div>
                </div>
                <div class="total_center1">
                    <div class="table2">
                        <div style="text-align:center;background-color:#01C676;height:26px;line-height:26px;">
                            媒体形式
                        </div>
                        <div>
                            <div class="table2_item">
                                公交
                            </div>
                            <div class="table2_item">
                                {{countObj.countTransit}}
                            </div>
                        </div>
                        <div>
                            <div class="table2_item">
                                轻轨
                            </div>
                            <div class="table2_item">
                                {{countObj.countMetro}}
                            </div>
                        </div>
                        <div>
                            <div class="table2_item">
                                公交/轻轨
                            </div>
                            <div class="table2_item">
                                {{countObj.countTransitMetro}}
                            </div>
                        </div>
                        <div>
                            <div class="table2_item">
                                网络
                            </div>
                            <div class="table2_item">
                                {{countObj.countNetwork}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="total_center2">
                    <div class="table3">
                        <div class="table3_item">
                            项目统计
                        </div>
                        <div class="table3_item">
                            备案
                        </div>
                        <div class="table3_item">
                            成交
                        </div>
                        <div v-for="item in  departmentList" :key="item.index">
                            <div class="table3_item">
                                {{item.departmentName}}
                            </div>
                            <div class="table3_item">
                                {{item.countRecord}}
                            </div>
                            <div class="table3_item">
                                {{item.countDeal}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Col>
            <Col span="5" class-name="total_right">
            <div class="total_cao">
                <img src="/static/img/cao.png">
            </div>
            <div class="total_pen">
                <img src="/static/img/gPen_03.png">
            </div>
             
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            yearList: [],
            countObj: {},
            departmentList: [],
            indexs: 0
        }
    },
    methods: {
        getYear() {
            this.$axios.get('/api/front/record/getYearList.json', {

            }).then(res => {
                this.yearList = res.data.data;
                this.countGet(this.yearList[0]);
                this.indexs = 0;
            })

        },
        countGet(item, index) {
            this.$axios.get('/api/front/record/countRecordStatistics.json', {
                params: {
                    startYear: item
                }
            }).then(res => {
                this.countObj = res.data.data;
            })

            this.$axios.get('/api/front/record/countDepartmentList.json', {
                params: {
                    startYear: item
                }
            }).then(res => {
                this.departmentList = res.data.data;
            })

            this.indexs = index;
        }
    },
    mounted() {
        this.getYear();

    }
}
</script>

<style>
@import url('./chiefsee');
</style>
