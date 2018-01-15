<template>
    <div class="hello">
        <div class="h_head">
            <img src="/static/img/backLogin.png">
            <div class="login">
                <div>
                    <img src="/static/img/g_back.png">
                    <div class="l_input">
                        <div class="h_logo">
                            <img src="/static/img/logo.png">
                        </div>
                        <ul class="h_list">
                            <li class="h_item">
                                <input type="text" id="name" placeholder="Login Name" v-model="name" />
                            </li>
                            <li class="h_item">
                                <input type="password" id="name" placeholder="Password" v-model="password" />
                            </li>
                            <li class="h_item">
                                <div style="display:flex;">
                                    <div >
                                        <input type="text" id="code" placeholder="请输入验证码" v-model="code">
                                    </div>
                                    <div class="code">
                                        <img :src='src' @click="code1" style="cursor: pointer;">
                                    </div>
                                    <label @click="code1" style="cursor: pointer;height:1.8rem;line-height:1.8rem;">换一张</label>
                                </div>
                            </li>
                            <li class="h_item">
                                <div class="l_back" @click="login">
                                    <p>登陆</p>
                                </div>
                            </li>
                        </ul>
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
            name: '',
            password: '',
            arry: '',
            code: '',
            src: '/api/code/valicode.json'
        }
    },
    methods: {
        login() {
            if (this.name == "") {
                this.$Message.error("用户名不能为空");
            } else if (this.password == "") {
                this.$Message.error("密码不能为空");
            } else if (this.code == "") {
                this.$Message.error("验证码不能为空");
            } else {
                this.$axios.get('/api/front/member/login.json', {
                    params: {
                        account: this.name,
                        password: this.password,
                        code: this.code
                    }
                }, {
                    }).then(response => {
                        if (response.data.success) {
                    
                            sessionStorage.setItem('userInfo',this.name);
                            if(response.data.data=='客户管理员'){
                                this.$router.push({path: '/indexadmin'});
                            }else{
                                this.$router.push({path: '/index'});
                            }

                        } else {
                            this.src = '/api/code/valicode.json?id=' + Math.random() * 100000;
                            this.$Message.error(response.data.message);
                        }
                    }).catch(error => {
                        this.src = '/api/code/valicode.json?id=' + Math.random() * 100000;
                        this.$Message.error('内部错误');
                    })
            }
        },
        code1() {

            this.src = '/api/code/valicode.json?id=' + Math.random() * 100000;
        }
    }
    
}
</script>

<style>


@font-face{
    font-family: yayuan;
    src:url('/static/css/MFYAYUAN_NONCOMMERCIAL-REGULAR.OTF');
}

.h_list {
    padding-left: 70px;
}

.h_logo {
    width: 300px;
}

.h_item {
    height: 36px;
}

#name {
    width: 200px;
    height: 2.4em;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    text-decoration: none;
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 5px #999 inset;
    /* For Latest Opera */
    text-align: center;
    -moz-box-shadow: 0px 0px 5px #999 inset;
    -webkit-box-shadow: 0px 0px 5px #999 inset;
}

#name::-webkit-input-placeholder,
#password::-webkit-input-placeholder {
    color: #fff;
}

#code {
    width: 100px;
    height: 2.4em;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    text-decoration: none;
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 5px #999 inset;
    /* For Latest Opera */
    text-align: center;
    -moz-box-shadow: 0px 0px 5px #999 inset;
    -webkit-box-shadow: 0px 0px 5px #999 inset;
    
}
#code::-webkit-input-placeholder{
    color: #fff;
    font-family: yayuan;
}
#code::-moz-placeholder{
    color: #fff;
    font-family: yayuan;
}

.h_head {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    overflow: hidden;
    min-width: 1200px;
    
}

.h_head img {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: auto;
    max-height: auto;
}

.login {
    padding: 30px;
    width: 800px;
    height: 560px;
    position: relative;
    bottom: 100%;
    left: 20%;
    z-index: 0;
}

.l_input {
    width: 400px;
    position: relative;
    top: -520px;
    left: 30%;
}

.l_back {
    width: 200px;
    height: 2.1rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background: rgba(0, 0, 0, 0);
    text-align: center;
    line-height: 2.1rem;
    color: #fff;
    font-size: 13px;
    cursor: pointer;
    font-family: yayuan;
}

.code {
    background: #999;
    width: 70px;
    height: 1.8rem;
    text-align: center;
    line-height: 70px;
    color: #fff;
    margin-left: 20px;
    overflow: hidden;
    vertical-align: middle;
}

.code img {
    display: block;
}
</style>


