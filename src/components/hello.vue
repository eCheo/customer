<template>
    <div class="h_head">
        <img src="/static/img/backLogin.png" class="h_headimg">
        <div class="login">
            <div class="bodys">
                <div class="l_input">
                    <div class="h_logo">
                        <img src="/static/img/logo.jpg">
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
                                <div>
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
                            sessionStorage.setItem('userInfo', this.name);
                            sessionStorage.setItem('admin', response.data.data.roleDto.code)
                            if (response.data.data.roleDto.code == 'administrators') {
                                this.$router.push({ path: '/indexadmin' });
                            }
                            if (response.data.data.roleDto.code == 'ordinary') {
                                this.$router.push({ path: '/index' });
                            }
                            if (response.data.data.roleDto.code == 'examiner') {
                                this.$router.push({ path: '/chief' });
                            }
                            if(response.data.data.roleDto.code == 'network'){
                                this.$router.push({path:'/network'})
                            }
                            this.$Message.success('登录成功');
                            sessionStorage.setItem('sex',response.data.data.sex.code);
                        } else {
                            this.src = '/api/code/valicode.json?id=' + Math.random() * 100000;
                            this.$Message.error(response.data.message);
                        }
                 
                    })
            }
        },
        code1() {

            this.src = '/api/code/valicode.json?id=' + Math.random() * 100000;
        }
    },
    mounted() {
        this.code1();
    }

}
</script>

<style>

.h_list {
    padding-left: 70px;
}

.h_logo {
    width: 300px;
    height: 117px;
}

.h_logo img {
    width: 100%;
    height: 60%;
    margin-top: 20px;
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

#code::-webkit-input-placeholder {
    color: #fff;
  
}

#code::-moz-placeholder {
    color: #fff;

}

.h_head {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    overflow: hidden;
    min-width: 1300px;
    min-height: 700px;
}

.h_headimg {
    width: 100%;
    height: 100%;
    max-width: auto;
    max-height: auto;
}


.bodys {
    background: url('/static/img/g_back.png') no-repeat;
    background-position: center -10px;
    background-size: 100% 100%;
    width: 703px;
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}



.l_input {
    width: 400px;
    position: relative;
    top: 83px;
    left: 6%;
    margin: 0 auto;
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


