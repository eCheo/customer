<template>
    <div class="r_but">
        <div class="r_top2" >
            <div class="r_one1">
                <div class="one_left1">
                    <label>联系人</label>
                    <input type="text">
                </div>
            </div>
            <div class="r_one1">
                <div class="one_left1">
                    <label>备案时间</label>
                    <input type="text">
                </div>
            </div>
            <div class="r_one1">
                <div class="one_left1">
                    <label>备案时间</label>
                    <input type="text">
                </div>
            </div>
            <div class="r_one1">
                <div class="one_left1">
                    <label>备案时间</label>
                    <input type="text">
                </div>
            </div>
            <div class="r_one1">
                <div class="one_left1">
                    <label>备案时间</label>
                    <input type="text">
                </div>
            </div>
        </div>
          <div class="r_top2">
            <div class="r_one1">
                <div class="one_left1">
                    <label>联系人</label>
                    <input type="text">
                </div>
            </div>
            <div class="r_one1">
                <div class="one_left1">
                    <label>备案时间</label>
                    <input type="text">
                </div>
            </div>
            <div class="r_one1">
                <div class="one_left1">
                    <label>备案时间</label>
                    <input type="text">
                </div>
            </div>
            <div class="r_one1">
                <div class="one_left1">
                    <label>备案时间</label>
                    <input type="text">
                </div>
            </div>
            <div class="r_one1">
                <div class="one_left1">
                    <label>备案时间</label>
                    <input type="text">
                </div>
            </div>
        </div>
        <ul>
            <li class="r_item">
                <div class="item_img" @click="addList">
                </div>
            </li>
            <li class="r_item" v-for="(item,index) in navList" :key="index">
                <img src="/static/img/num_green_03.png">
                <label>{{index+1}}</label>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['item'],
    data() {
        return {
            isShow: false,
            navList: [
                {
                    index: 1
                }
            ]
        }
    },
    methods: {
        addList() {
            if (this.navList.length == 5) {
                this.$Message.error("不能再加了");
            } else {
                this.navList.push({
                    index: this.index + 1
                });
            }

        }
    },
    watch: {
        index: function() {
            
        }
    }
}
</script>

<style>

</style>


