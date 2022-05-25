<template>
  <ContentBase>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <!--为表单设置点击事件 并使用.prevent屏蔽其他事件-->
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="userName" class="form-label">用户名</label>
            <input v-model="userName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="passWord" type="password" class="form-control" id="exampleInputPassword1">
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
import { ref } from 'vue'
import { useStore } from 'vuex';
import router from '@/router';

export default {
  name: "LoginView",
  components: {
    ContentBase,
  },

  setup() {
    const store = useStore();

    let userName = ref('');
    let passWord = ref('');
    let errorMessage = ref('');

    const login = () => {
      errorMessage.value = "";
      store.dispatch("login", {
        userName: userName.value,
        passWord: passWord.value,
        // 登录成功 跳转到对应的用户主页
        success() {
          router.push({name: 'userlist'});
        },
        // 登录失败 提示用户名或密码错误
        error() {
          errorMessage.value = "用户名或密码错误";
        },
      });
    }
    return {
      userName,
      passWord,
      errorMessage,  
      login,
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