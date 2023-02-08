<!-- 
	This is the sign in page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
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
        <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit"
          :hideRequiredMark="true">
          <div class="title">ONBOARD</div>
          <a-form-item class="container-login-item" label="Email" :colon="false">
          </a-form-item>
          <a-input v-decorator="[
              'email',
              {
                rules: [
                  { required: true, message: 'Please input your email!' },
                ],
              },
            ]" placeholder="Email" />
          <a-form-item class="container-login-item" label="Password" :colon="false">
          </a-form-item>
          <a-input v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please input your password!' },
                ],
              },
            ]" type="password" placeholder="Password" />
          <a-form-item class="mb-10">
            <a-switch v-model="rememberMe" /> Remember Me
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
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
export default {
  data() {
    return {
      // Binded model property for "Sign In Form" switch button for "Remember Me" .
      rememberMe: true,
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
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.signInBackground {
  background: url('../img/truck_login.jpg') no-repeat;
  background-size: cover;
  overflow: hidden;
  background-position: center;
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
</style>