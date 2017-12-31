<template>
    <div class="hello">
        <div class="h_head">
            <img src="/static/img/backLogin.png">
            <div class="login">
                <div>
                    <img src="/static/img/g_back.png">
                    <div class="l_input">
                        <input type="text" id="name" placeholder="Login Name" />
                        <input type="text" id="password" placeholder="Password" />
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

        }
    },
    methods: {
        login() {
            this.$axios.post('../../static/js/keep.json', {
            }).then(res => {
                if (this.name == res.data.user.name) {
                    this.$router.push({
                        path: '/index'
                    })
                }
            })
        }
    }
}
</script>

<style>
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
    -moz-box-shadow: 0px 0px 5px #999 inset;
    -webkit-box-shadow: 0px 0px 5px #999 inset;
}

#name,
#password,
#cc::-webkit-input-placeholder {
    color: #fff;
    text-align: center;
}

#password {
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
    -moz-box-shadow: 0px 0px 5px #999 inset;
    -webkit-box-shadow: 0px 0px 5px #999 inset;
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
    bottom: 670px;
    left: 20%;
    z-index: 0;
}

.l_input {
    width: 400px;
    position: relative;
    top:-400px;
    left: 35%;
}
</style>


