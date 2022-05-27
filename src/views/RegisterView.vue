<template>
  <ContentBase>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <!--为表单设置点击事件 并使用.prevent屏蔽其他事件-->
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="userName" class="form-label">用户名</label>
            <input v-model="userName" class="form-control" id="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="passWord" type="password" class="form-control" id="pwd">
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">确认密码</label>
            <input v-model="passwordConfirm" type="password" class="form-control" id="pwd_confirm">
          </div>
          <div class="error_message">{{errorMessage}}</div>
          <button type="submit" class="btn btn-primary">登录</button>
        </form>
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase'
import $ from 'jquery'
import { ref } from 'vue'
import router from '@/router';
import { useStore } from 'vuex';

export default {
  name: "RegisterView",
  components: {
    ContentBase,
  },

  setup() {
    const store = useStore();
    let userName = ref('');
    let passWord = ref('');
    let passwordConfirm = ref('');
    let errorMessage = ref('');

    const register = () => {
      errorMessage.value = "";
      $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/user/',
            type: 'post',
            data: {
                username: userName.value,
                password: passWord.value,
                password_confirm: passwordConfirm.value,
            },
            success(resp) {
              if (resp.result != 'success') {
                errorMessage.value = resp.result;
              }
              else {
                store.dispatch("login", {
                  userName: userName.value,
                  passWord: passWord.value,
                  // 登录成功 跳转到对应的用户主页
                  success() {
                    router.push({name: 'userlist'});
                  },
                  error() {
                    errorMessage.value = "系统异常,请稍后重试";
                  }
                });
              }
            }
        });
    }
    return {
      userName,
      passWord,
      passwordConfirm,
      errorMessage,  
      register,
    }
  },

}
</script>

<style scoped>
button {
  width: 100%;
}

.error_message {
  color: red;
}
</style>