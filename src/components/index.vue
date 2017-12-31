<template>
     <div class="minW">
        <div class="i_head">
            
            <ul class="i_list">
                <li class="i_item">
                    <Icon type="person"></Icon>
                    <label>客服</label>
                </li>
                <li class="i_item">
                    <Icon type="chatbox-working"></Icon>
                    <label>消息</label>
                </li>
                <li class="i_item">
                    <Icon type="ios-gear"></Icon>
                    <label>设置</label>
                </li>
                <li class="i_item">
                    <label>你好,{{this.name}}</label>
                </li>
            </ul>
        </div>
        <Row style="position:fiexd;bottom:0;">
            <Col span="8" style="position:fiexd;bottom:0;">
            <Menu name="1-1" :theme="theme2">
                <router-link to="/index" style="color: #495060;">
                    <MenuItem style="padding-left:28px;">
                    <Icon type="ios-paper"></Icon>
                    系统首页
                    </MenuItem>
                </router-link>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-people"></Icon>
                        供应商
                    </template>
                    <router-link to="/Supply">
                        <MenuItem name="2-1">送货订单</MenuItem>
                    </router-link>
                    <router-link to="/Lists">
                        <MenuItem name="2-2">供应商列表</MenuItem>
                    </router-link>
                </Submenu>
                <MenuItem style="padding-left:28px;">
                <Icon type="ios-arrow-back"></Icon>
                系统首页
                </MenuItem>
            </Menu>
            </Col>
        </Row>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
  
}
</script>
<style>
    .minW {
    min-width: 1260px;
}

.i_head {
    width: 100%;
    height: 60px;
    background-color: #4876FF;
    position: relative;
    top: 0;
}

.i_head img {
    width: 241px;
}

.i_list {
    position: absolute;
    top: 0;
    right: 0;
}

.i_item {
    float: left;
    height: 60px;
    line-height: 60px;
    margin-right: 36px;
    color: #fff;
}

.content {
    position: absolute;
    top: 60px;
    margin-left: 250px;
    width: 80%;
}
</style>
