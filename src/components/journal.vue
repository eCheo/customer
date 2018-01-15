<template>
    <div>
        <div class="minR">
            <Form ref="memberLog" :model="memberLog" :rules="ruleValidate">
                <div class="total">
                    <div class="r_left">
                        <img src="/static/img/i_book_02.png">
                        <div class="r_log">
                            <img src="/static/img/logo.png">
                        </div>
                        <div class="left_font">
                            <div style="width:20px;font-size: 16px;margin-left:30px;">
                                {{customerName}}
                            </div>
                            <div>
                                职位：{{roleName}}
                            </div>
                            <div>
                                部门：{{dtoName}}
                            </div>
                        </div>

                        <div class="box">
                            <div class="r_top r_top1">
                                <div class="r_one">
                                    <div class="one_left">
                                        <Input v-model="logTime" :readonly="true">
                                        <span slot="prepend">日期</span>
                                        </Input>
                                    </div>
                                    <div class="one_right">
                                        <label>提醒</label>
                                        <DatePicker :readonly="readonly" v-model="memberLog.remindDate" type="date" format="yyyy-MM-dd" style="float:left;width:126px;"></DatePicker>
                                    </div>
                                </div>
                            </div>
                            <!--        联系方式 add           -->
                            <div class="r_but">
                                <div class="r_top2">
                                    <div class="r_one1">
                                        <div class="one_left1">
                                            <FormItem  prop="industry">
                                                <Input v-model="memberLog.industry" :readonly="readonly">
                                                <span slot="prepend">行业</span>
                                                </Input>
                                            </FormItem>
                                        </div>
                                    </div>
                                    <div class="r_one1">
                                        <div class="one_left1">
                                            <FormItem  prop="customerType">
                                                <Input v-model="memberLog.customerType" :readonly="readonly">
                                                <span slot="prepend">客户分类</span>
                                                </Input>
                                            </FormItem>
                                        </div>
                                    </div>
                                    <div class="r_one1">
                                        <div class="one_left1">
                                            <Input v-model="memberLog.enterpriseName" :readonly="readonly">
                                            <span slot="prepend">公司名称</span>
                                            </Input>
                                        </div>
                                    </div>
                                    <div class="r_one1">
                                        <div class="one_left1">
                                            <Input v-model="memberLog.enterpriseAddress" :readonly="readonly">
                                            <span slot="prepend">公司地址</span>
                                            </Input>
                                        </div>
                                    </div>
                                    <div class="r_one1">
                                        <div class="one_left1">
                                            <Input v-model="memberLog.project" :readonly="readonly">
                                            <span slot="prepend">品牌项目名称</span>
                                            </Input>
                                        </div>
                                    </div>
                                    <div class="r_one1">
                                        <div class="one_left1">
                                            <Input v-model="memberLog.projectAddress" :readonly="readonly">
                                            <span slot="prepend">项目地址</span>
                                            </Input>
                                        </div>
                                    </div>
                                    <div class="r_one1">
                                        <div class="one_left1">
                                            <Input v-model="memberLog.contacts" :readonly="readonly">
                                            <span slot="prepend">联系人</span>
                                            </Input>
                                        </div>
                                    </div>
                                    <div class="r_one1">
                                        <div class="one_left1">
                                            <Input v-model="memberLog.position" :readonly="readonly">
                                            <span slot="prepend">职位</span>
                                            </Input>
                                        </div>
                                    </div>
                                    <div class="r_one1">
                                        <div class="one_left1">
                                            <Input v-model="memberLog.contactInformation" :readonly="readonly">
                                            <span slot="prepend">联系方式</span>
                                            </Input>
                                        </div>
                                    </div>
                                    <div class="r_one1">
                                        <div class="one_left1">
                                            <Input v-model="memberLog.visit" :readonly="readonly">
                                            <span slot="prepend">拜访方式</span>
                                            </Input>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <ul class="but_list">
                            <li>
                       
                                    <div class="div_but">
                                        <img src="/static/img/button_03.png">
                                        <span @click="createMemberLog">
                                            保存
                                        </span>
                                    </div>
                              
                            </li>
                        </ul>
                    </div>

                    <!--         右边内容     -->
                    <div>
                        <div class="textarea">
                            <Input :readonly="readonly" v-model="memberLog.remarks" style="width:460px;border-bottom:7px solid #2871A0;" type="textarea" :rows="12"></Input>
                        </div>
                        <div class="pens">
                            <div class="pen">
                                <img src="/static/img/pen_X_03.png">
                            </div>
                            <div class="clip">
                                <img src="/static/img/clip_03.png">
                            </div>
                        </div>
                    </div>

                </div>
            </Form>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            customerName: '',
            dtoName: '',
            roleName: '',
            memberLog:
            {
                remindDate: '',
                industry: '',
                customerType: '',
                enterpriseName: '',
                enterpriseAddress: '',
                project: '',
                projectAddress: '',
                contacts: '',
                position: '',
                contactInformation: '',
                visit: '',
                remarks: ''
            },
            logTime: '',
            readonly: false,
            ruleValidate: {
                industry: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        index() {
            this.customerName = sessionStorage.getItem('name');
            this.dtoName = sessionStorage.getItem('dto');
            this.roleName = sessionStorage.getItem('role');
        },
        createMemberLog() {
             alert(this.memberLog.industry);
            this.$axios.post('/api/front/member/createMemberLog.json',
                this.memberLog
            ).then(res => {
                if (res.data.success) {
                    this.$Message.info('保存成功');
                    alert(this.memberLog.industry);
                    this.$router.push({
                        path: '/journalList'
                    })
                }else{
                     this.$Message.error('保存失败');
                }
            })
        },
        findMemberLogTime() {
            this.$axios.get('/api/front/member/findMemberLogTime.json', {

            }).then(res => {
                this.logTime = res.data.data;
            })
        },
        logById() {
            var id = sessionStorage.getItem('jId');
            if (id) {
                this.readonly = true;
            }
            this.$axios.get('/api//front/member/findMemberLogById.json', {
                params: {
                    id: id
                }
            }).then(res => {
                this.memberLog = res.data.data;
            })
        }
    },
    mounted() {
        this.index();
        this.findMemberLogTime();
        this.logById();
    }
}
</script>

<style>
@import url('./journal');
</style>


