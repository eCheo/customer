<template>
    <div class="minR">
        <Row class="p_box">
            <Col span="3" offset="2">
                <div class="yinzhang"></div>
                <div class="wite">
                    <img src="/static/img/witePen.png"></img>
                </div>
            </Col>
            <Col span="10" offset="3">
            <img style="width:100%;height:100%;" src="../../static/img/pool_03.png">
            
            <div class="padd">
                <Row>
                    <Col span="5" offset="1">
                    <img style="width:100%;height:100%;margin-top:8px;" src="../../static/img/logo.jpg">
                    </Col>
                  
                    <div class="homes_img" @click="homeBack">
                        <img src="../../static/img/homeRed.png">
                    </div>
               
                </Row>
                <Row>
                    <Col span="16" offset="1">
                    <Input v-model="condition" icon="android-search" placeholder="搜索" @on-change="condit(1)"></Input>
                    </Col>
                    <Col span="7">
                    <Select v-model="EQ_mediaForm" @on-change="condit(1)">
                        <Option :value="item.name" v-for="item in mediaForm" :key="item.name">{{item.message}}</Option>
                    </Select>
                    </Col>
                </Row>
                <br>
                <Row class-name="p_table">
                    <Col span="23" offset="1">
                    <Table :loading="loading" :columns="columns1" :data="data1"></Table>
                    </Col>
                </Row>
                <br>
                <Row>
                    <Col offset="5">
                    <Page :total="total" :page-size="10" @on-change="condit"></Page>
                    </Col>
                </Row>
            </div>
            </Col>
            <Col offset="21">
                <div class="bookTab"></div>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns1: [
                {
                    type: "index",
                    title: '序号',
                    align: 'center',
                    width: 70
                },
                {
                    title: '公司名称',
                    key: 'corporateName',
                    align: 'center',

                },
                {
                    title: '媒体形式',
                    key: 'mediaForm',
                    align: 'center',
                    render: (h, params) => {
                        return params.row.mediaForm;
                    },
                    width: 120
                }, {
                    title: '申请',
                    key: 'action',
                    width:80,
                     align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.row.id);
                                        
                                    }
                                }
                            }, '查看'),

                        ])
                    }
                }
            ],
            data1: [


            ],
            current: 1,
            total: 0,
            mediaForm: [],
            loading: false,
            EQ_mediaForm: '',
            condition: ''
        }
    },
    methods: {
        condit(current) {
            this.loading = true;
            var corporateName = this.condition,
                media = this.EQ_mediaForm;
            if ((corporateName == "" && media == "") || (corporateName != "" || media != "")) {
                this.$axios.get('/api/front/record/findByCondition.json', {
                    params: {
                        page: current,
                        size:10,
                        EQ_recordStatus: 'H_share',
                        EQ_mediaForm: this.EQ_mediaForm == "unselected" ? "" : this.EQ_mediaForm,
                        LIKE_corporateName: corporateName
                    }
                }).then(res => {
                    this.total = res.data.data.totalElements;
                    this.data1 = res.data.data.content;
                    this.loading = false;
                })
            }
        },
        JmediaForm() {
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
            })
        },
        show(id){
            this.$Modal.confirm({
                    title: '申请备案',
                    content: '<p>确定申请？</p>',
                    onOk: () => {
                        this.$axios.get('/api/front/record/snatchRecord.json',{
                            params:{
                                id:id
                            }
                        }).then(res =>{
                            if(res.data.success == true){
                                this.$Message.success("申请成功");
                                if(sessionStorage.getItem('admin') == 'network'){
                                     this.$router.push({
                                        path:'/network'
                                    })
                                }else{
                                    this.$router.push({
                                        path:'/index'
                                    })
                                }
                            }else{
                                this.$Message.error(res.data.message);
                            }
                        }).catch(error => {
                            this.$Message.error("内部错误");
                        })
                    }
                });
        },
        homeBack(){
           let admin =  sessionStorage.getItem('admin');
            if(admin == 'network'){
                this.$router.push({path:'/network'})
            }
            if(admin == 'ordinary'){
                 this.$router.push({path:'/index'})
            }
        }
    },
    mounted() {
        this.condit(this.current);
        this.JmediaForm();
    }
}
</script>

<style>
@import url('./pool.css');
</style>
