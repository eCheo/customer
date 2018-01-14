<template>
    <div>
        <div class="minR">
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
                    <div class="r_top r_top1">
                        <div class="r_one">
                            <div class="one_left">
                                <Input v-model="time" disabled>
                                <span slot="prepend">备案时间</span>
                                </Input>
                            </div>
                            <div class="one_right">
                                <label>到期时间</label>
                                <DatePicker v-model="overdueTime" type="datetime" format="yyyy-MM-dd" style="float:left;width:126px;"></DatePicker>
                            </div>
                        </div>
                    </div>
                    <div class="r_top1 r_top">
                        <div class="r_one1">
                            <div class="one_left1">
                                <Input v-model="recordDto.corporateName" @on-change="inputChange">
                                <span slot="prepend">公司名称</span>
                                </Input>
                            </div>

                        </div>
                        <div style="position:absolute;left:390px;color:#FA150A;" v-show="isShow">
                            该公司已备案
                        </div>
                        <div class="r_one1">
                            <div class="one_left1">
                                <label>媒体形式</label>
                                <Select v-model="recordDto.mediaForm" @on-change="inputChange" style="width:82.3%;height:28px;margin-bottom:5px;border:1px solid #01C675;border-radius:5px;">
                                    <Option v-for="item in mediaFormList" :value="item.name" :key="item.code">{{ item.message }}</Option>
                                </Select>
                            </div>
                        </div>
                        <div class="r_one1">
                            <div class="one_left1">
                                <Input v-model="recordDto.corporateAddress">
                                <span slot="prepend">公司地址</span>
                                </Input>
                            </div>
                        </div>
                        <div class="r_one1">
                            <div class="one_left1">
                                <Input v-model="recordDto.entryName">
                                <span slot="prepend">品牌或项目名</span>
                                </Input>
                            </div>
                        </div>
                        <div class="r_one1">
                            <div class="one_left1">
                                <Input v-model="recordDto.projectAddress">
                                <span slot="prepend">项目地址</span>
                                </Input>
                            </div>
                        </div>
                    </div>
                    <!--        联系方式 add           -->
                    <div class="r_but">
                        <div class="r_top2">
                            <div class="r_one1">
                                <div class="one_left1">
                                    <Input v-model="contract.contactName" @on-blur='addContract("phone")'>
                                    <span slot="prepend">联系人</span>
                                    </Input>
                                </div>
                            </div>
                            <div class="r_one1">
                                <div class="one_left1">
                                    <Input v-model="contract.position" @on-blur='addContract("phone")'>
                                    <span slot="prepend">职位</span>
                                    </Input>
                                </div>
                            </div>
                            <div class="r_one1">
                                <div class="one_left1">
                                    <Input v-model="contract.phone" @on-blur='addContract("phone")'>
                                    <span slot="prepend">手机</span>
                                    </Input>
                                </div>
                            </div>
                            <div class="r_one1">
                                <div class="one_left1">
                                    <Input v-model="contract.QQ" @on-blur='addContract("phone")'>
                                    <span slot="prepend">QQ</span>
                                    </Input>
                                </div>
                            </div>
                            <div class="r_one1">
                                <div class="one_left1">
                                    <Input v-model="contract.weixin" @on-blur='addContract("phone")'>
                                    <span slot="prepend">微信</span>
                                    </Input>
                                </div>
                            </div>
                            <div class="r_one1">
                                <div class="one_left1">
                                    <Input v-model="contract.landLine" @on-blur='addContract("phone")'>
                                    <span slot="prepend">座机</span>
                                    </Input>
                                </div>
                            </div>
                        </div>
                        <ul class="r_list">
                            <li class="r_item">
                                <div class="item_img" @click="addList">
                                </div>
                            </li>
                            <li class="r_item" v-for="(item,i) in navList" :key="i">
                                <div @click="chenge(i)" style="height:30px;margin-top:-2px;">
                                    <img :src='i==index?item.img1:item.img2'>
                                    <label style="cursor: pointer;">{{i+1}}</label>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <!--            对接部门                  -->
                    <div class="r_top1 r_top">
                        <div class="r_one1">
                            <div class="one_left1">
                                <Input v-model="recordDto.pickUp">
                                <span slot="prepend">网络对接人</span>
                                </Input>
                            </div>
                        </div>
                        <div class="r_one1">
                            <div class="one_left1">
                                <Input v-model="recordDto.docking">
                                <span slot="prepend">网络对接部门</span>
                                </Input>
                            </div>
                        </div>
                    </div>
                    <ul class="but_list">
                        <li>
                            <div class="div_but">
                                <img src="/static/img/button_03.png">
                                <span>
                                    备案数量
                                </span>
                            </div>
                        </li>
                        <li>
                            <div class="div_but">
                                <img src="/static/img/button_03.png">
                                <span>
                                    备案数量
                                </span>
                            </div>
                        </li>
                        <li>
                            <div class="div_but" @click="create">
                                <img src="/static/img/button_03.png">
                                <span>
                                    提交Filling
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--         右边内容     -->
                <div>
                    <div class="cord">
                        <div class="album">
                            <div class="demo-upload-list" v-for="item in uploadList" :key="item.name">
                                <template v-if="item.status=='finished'">
                                    <img :src="'/api/obs/view.json?id='+item.response.data.id">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.response.data.id)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png','gif']" :max-size="4800000" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="/api/obs/upload.json" style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="camera" size="20"></Icon>
                                </div>
                            </Upload>
                            <Modal title="View Image" v-model="visible">
                                <img :src="'/api/obs/view.json?id=' + imgName" v-if="visible" style="width: 100%">
                            </Modal>
                        </div>
                    </div>

                    <div class="textarea">
                        <Input v-model="recordDto.remarks" style="width:360px;" type="textarea" :rows="8"></Input>
                    </div>
                    <div class="pen">
                        <img src="/static/img/pen_X_03.png">
                    </div>
                    <div class="clip">
                        <img src="/static/img/clip_03.png">
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    @import url('./record');
</style>


