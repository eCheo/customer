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
                                    转交
                                </span>
                            </div>
                        </li>
                        <li>
                            <div class="div_but" @click="reject">
                                <img src="/static/img/button_03.png">
                                <span>
                                    驳回
                                </span>
                            </div>
                        </li>
                        <li>
                            <div class="div_but" @click="create">
                                <img src="/static/img/button_03.png">
                                <span>
                                    成交
                                </span>
                            </div>
                        </li>
                        <li>
                            <div class="div_but" @click="pass">
                                <img src="/static/img/button_03.png">
                                <span>
                                    通过
                                </span>
                            </div>
                        </li>
                        <li>
                            <div class="div_but" @click="create">
                                <img src="/static/img/button_03.png">
                                <span>
                                    保存
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
</template>

<script>
export default {
  data() {
    return {
      rejectvalue: "",
      value: "",
      svalue: "",
      navList: [
        {
          img1: "/static/img/numGreen.jpg",
          img2: "/static/img/numBack.jpg"
        }
      ],
      uploadList: [], //接收名片的集合
      index: 0,
      contractList: [], //存放联系方式的集合
      contract: {
        //接收联系方式的对象
        phone: "",
        weixin: "",
        QQ: "",
        position: "",
        contactName: "",
        landLine: ""
      },
      mediaFormList: [],
      recordDto: {
        //接收表单的数据
        corporateName: "", //公司名称
        corporateAddress: "", // 公司地址
        entryName: "", //项目名称
        projectAddress: "", //项目地址
        customerCard: "", //名片
        mediaForm: "", //媒体形式
        docking: "", //对接部门
        pickUp: "", //对接人
        remarks: "", //备注
        contactNumberDtos: [] //联系方式集合
      },
      customerCardList: [],
      time: "", //备案时间
      overdueTime: "", //到期时间
      imgName: "",
      visible: false,
      isShow: false,
      customerName: "",
      dtoName: "",
      roleName: ""
    };
  },
  mounted() {
    /**
         * 接收客户代表名
         * 职位
         * 部门
         */
    this.customerName = sessionStorage.getItem("name");
    this.roleName = sessionStorage.getItem("role");
    this.dtoName = sessionStorage.getItem("dto");

    this.getMediaForm();
    this.getTime();
    this.uploadList = this.$refs.upload.fileList;
    let id = sessionStorage.getItem("id");
    if (id) {
      this.findByIdView();
    }
  },
  beforeUpdate() {
    let id = sessionStorage.getItem("id");
    if (id) {
      this.isShow = false;
    }
  },
  methods: {
    addList() {
      if (
        this.contractList[this.contractList.length - 1] != null &&
        (this.contractList[this.contractList.length - 1].phone == null ||
          this.contractList[this.contractList.length - 1].phone == "")
      ) {
        this.chenge(this.contractList.length - 1);
      }
      if (this.contract.phone == null || this.contract.phone == "") {
        this.$Message.error("臣妾需要你留个联系方式，才能添加哦！ ˊ_>ˋ");
        return;
      }
      if (this.navList.length == 5) {
        this.$Message.error("臣妾只能添加5个哦！ _(:3」∠)_");
        return;
      } else {
        this.index++;
        this.navList.push({
          img1: "/static/img/numGreen.jpg",
          img2: "/static/img/numBack.jpg"
        });
        this.clearValue(); //清空數據
      }
    },
    addContract(type) {
      this.contractList[this.index] = this.contract;
    },
    clearValue() {
      this.contract = {};
    },
    chenge(index) {
      if (this.contractList.length == this.index) {
        this.contractList.push({});
      }
      this.index = index;
      this.contract = this.contractList[index];
    },
    create() {
      if (this.customerCardList.length <= 0 && this.recordDto.remarks == "") {
        this.$Message.error("名片和备注不能同时为空！ _(:3」∠)_");
        return;
      }
      if (this.contractList <= 0) {
        this.$Message.error("联系方式不能空！ _(:3」∠)_");
        return;
      }
      if (this.contractList[this.contractList.length - 1].phone == "") {
        this.$Message.error("联系方式不能空！ _(:3」∠)_");
        this.chenge(this.contractList.length - 1);
        return;
      }
      var customerCard = this.recordDto.customerCard.substring(
        0,
        this.recordDto.customerCard.lastIndexOf(",")
      );
      this.recordDto.customerCard = customerCard;
      this.recordDto.contactNumberDtos = this.contractList;
      this.$axios
        .post("/api/front/record/create.json", this.recordDto)
        .then(res => {
          if (!res.data.success)
            this.$Message.error(res.data.message + "_(:3」∠)_");
          else if (res.data.success)
            this.$router.push({
              path: "/index"
            });
          else this.$Message.error("系统异常，请联系管理员");
        });
    },
    getMediaForm() {
      this.$axios
        .get("/api/metadata/getByEnumClassSimpleName.json", {
          params: {
            enumClassSimpleName: "MediaForm"
          }
        })
        .then(res => {
          this.mediaFormList = res.data.data;
          // console.log(this.mediaForm);
        });
    },
    getTime() {
      this.$axios.get("/api/front/record/getTime.json", {}).then(res => {
        this.time = res.data.data.time;
        this.overdueTime = res.data.data.overdueTime;
      });
    },
    handleSuccess(res) {
      this.customerCardList.push({
        id: res.data.id
      });
    },
    handleView(id) {
      this.imgName = id;
      this.visible = true;
    },
    //删除上传照片
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.customerCardList.splice(
        this.customerCardList.indexOf(file.response.data.id),
        1
      );
    },
    //最大上传单个文件多大
    // handleMaxSize(file) {
    //     this.$Notice.warning({
    //         title: 'Exceeding file size limit',
    //         desc: 'File  ' + file.name + ' is too large, no more than 2M.'
    //     });
    // },
    // handleBeforeUpload() {
    //     const check = this.uploadList.length < 5;
    //     if (!check) {
    //         this.$Notice.warning({
    //             title: '最多只能上传5张名片哦   ˊ_>ˋ'
    //         });
    //     }
    //     return check;
    // },
    inputChange() {
      var corporateName = this.recordDto.corporateName,
        mediaForm = this.recordDto.mediaForm;
      if (corporateName != "" && mediaForm != "") {
        this.$axios
          .get("/api/front/record/findByConditionList.json", {
            params: {
              EQ_corporateName: corporateName,
              EQ_mediaForm: mediaForm
            }
          })
          .then(res => {
            if (res.data.data.length > 0) {
              this.isShow = true;
            } else {
              this.isShow = false;
            }
          });
      }
    },
    findByIdView() {
      //详情
      var id = sessionStorage.getItem("id");
      this.$axios
        .get("/api/front/record/findById.json", {
          params: {
            id: id
          }
        })
        .then(res => {
          this.contract.contactName =
            res.data.data.contactNumberDtos[0].contactName;
          this.contract.position = res.data.data.contactNumberDtos[0].position;
          this.contract.phone = res.data.data.contactNumberDtos[0].phone;
          this.contract.QQ = res.data.data.contactNumberDtos[0].qq;
          this.contract.weixin = res.data.data.contactNumberDtos[0].weixin;
          this.contract.landLine = res.data.data.contactNumberDtos[0].landLine;
          this.contractList = res.data.data.contactNumberDtos;
          this.recordDto = res.data.data;
          this.recordDto.mediaForm = res.data.data.mediaForm.name;
          if (
            res.data.data.customerCard != null &&
            res.data.data.customerCard.length > 0
          ) {
            var car = arry.split(",");
            for (var i = 0; i < car.length; i++) {
              this.uploadList.push({
                response: {
                  data: {
                    id: car[i]
                  }
                },
                status: "finished"
              });
            }
          }

          var contactNumberLength = res.data.data.contactNumberDtos.length;
          for (var j = 0; j < contactNumberLength; j++) {
            this.navList.push({
              img1: "/static/img/numGreen.jpg",
              img2: "/static/img/numBack.jpg"
            });
          }
        });
    },
    rejectinfo(){
        this.$Modal.confirm({
            title:'驳回信息',
            content:'<p>666666</p><p>666666</p><p>666666</p>',
            width: 70,
        });
    },
    pass(){
        var id = JSON.parse(sessionStorage.getItem("id"));
        this.$axios.post('/api/front/record/adopt.json',{
            id:id
        }).then(res=>{
            this.$Message.error("通过请求");
        })
    },
    reject() {
      var id = JSON.parse(sessionStorage.getItem("id"));
      let reject = "";
      this.$Modal.confirm({
        title: "驳回",
        width: 70,
        render: h => {
          return h("Input", {
            props: {
              type: "textarea",
              rows: 10,
              value: this.rejectvalue,
              autofocus: true,
              placeholder: "请输入驳回原因"
            },
            on: {
              input: val => {
                this.rejectvalue = val;
                reject = this.rejectvalue;
              }
            }
          });
        },
        onOk() {
          this.$axios
            .post("/api/front/record/reject.json", {
              id: id,
              reject: reject
            })
            .then(res => {
              console.log(res.data.data);
              this.$Message.error("驳回成功");
            });
        }
      });
    }
  }
};
</script>

<style>
@import url("./record.css");
</style>


