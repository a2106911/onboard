<!-- 
	This is the sign in page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
  <!-- <button @click="log"></button> -->
<div class="signInBackground">
  <div class="sign-in">
    <a-row type="flex" :gutter="[24, 24]" justify="space-around">
      <!-- Sign In Form Column -->
      <!-- <a-col :span="24" :md="12" :lg="{ span: 12, offset: 0 }" :xl="{ span: 6, offset: 2 }" class="col-form"> -->
        <div class="containter-login-form">
        <h1 class="mb-15">Sign In</h1>
        <h5 class="font-regular text-muted">
          Enter your email and password to sign in
        </h5>

        <!-- Sign In Form -->
        <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit1"
          :hideRequiredMark="true">
          <div class="title">ONBOARD</div>
          <a-form-item class="container-login-item" label="Email" :colon="false">
          </a-form-item>
          <!-- <a-input 
            v-decorator="[ 'email', { rules: [ { required: true, message: 'Please input your email!' }, ], }, ]" 
            placeholder="Email" 
            v-model="emailInput"
            @change="change"/> -->
            <input class="ant-input" type="text" placeholder="Email" v-model="emailInput">
          <a-form-item class="container-login-item" label="Password" :colon="false">
          </a-form-item>
          <!-- <a-input v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please input your password!' },
                ],
              },
            ]" type="password" placeholder="Password" 
            v-model="passwordInput"/> -->
            <input class="ant-input" type="password" placeholder="Password" v-model="passwordInput">
          <a-form-item class="mb-10">
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button" @click="handleSubmit">
              SIGN IN
            </a-button>
          </a-form-item>
        </a-form>
        <!-- / Sign In Form -->
      <!-- </a-col> -->
    </div>
      <!-- Sign In Image Column -->
    </a-row>
  </div>
</div>
</template>

<script>
import axios from "axios"
import { MD5 } from 'crypto-js';

export default {
  components: [
    axios
  ],
  data() {
    return {
      // Binded model property for "Sign In Form" switch button for "Remember Me" .
      rememberMe: true,
      emailInput:null,
      passwordInput:null,
      // form: this.$form.createForm(this, { name: 'horizontal_login' }),
    };
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    // this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    // Handles input validation after submission.
    handleSubmit(e) {
      e.preventDefault();
      // console.log(this.passwordInput)
      // console.log(MD5(this.passwordInput).toString())
      axios({
        method:"PUT",
        // url:"http://onboard.daw.institutmontilivi.cat/api/login",
        url:"http://localhost/api/login",
        // url:"192.1681.67:8080/api/login",
        data: {
          "temporaryToken":localStorage.getItem("temporaryToken"),
          "email":this.emailInput,
          "password":MD5(this.passwordInput).toString() // Encrypting the password from user
        }
      }).then((response)=> {
        if (response.data != false) {
          this.$emit("loginRequest", response.data);
        }
      })

    }
    ,
    log() {
      // console.log(this.emailInput);
    },
    change() {

    }
  },
  watch: {
    emailInput() {
      // console.log(this.emailInput);
      
    }
  }
};
</script>

<style lang="scss">
// body, html {
//   position:relative;
//   height:100%;
//   width:100%;
// }
.signInBackground {
  background: url('../img/truck_login.jpg') no-repeat;
  background-size: cover;
  overflow: hidden;
  background-position: center;
  // position:relative; 
  width:100%;
  height:100%;
}

@media screen and(max-width: 920px) {
  .signInBackground {
    background-image: url('../img/truck_login_responsive.jpg');
    width: 100%;
    background-size: cover;
    overflow: hidden;
    background-position: center;
  }
}

.ant-input {
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
  width: 100%;
  height: 32px;
  padding: 4px 11px;
  color: rgba(0,0,0,.65);
  font-size: 14px;
  line-height: 1.5;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all .3s;
}

</style>