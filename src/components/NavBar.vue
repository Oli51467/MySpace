<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'home'}">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'userlist'}">用户列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'friendslist'}">好友列表</router-link>
        </li>
      </ul>
      <!--若用户未登录则展示登录-注册界面-->
      <ul class="navbar-nav" v-if="!$store.state.user.is_login">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'login'}">登录</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'register'}">注册</router-link>
        </li>
      </ul>
      <!--若已登录则展示用户的用户名和密码-->
      <ul class="navbar-nav" v-else>
        <li class="nav-item">
          <router-link 
          class="nav-link text" 
          :to="{name: 'userprofile', params: {userId: $store.state.user.id}}">
          {{ $store.state.user.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link 
          class="nav-link" 
          :to="{name: 'userprofile', params: {userId: $store.state.user.id}}">
          <img :src="$store.state.user.photo">
          </router-link>
        </li>
        <li class="nav-item text">
          <a class="nav-link" style="cursor: pointer" @click="logout"> 退出 </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { useStore } from 'vuex';

export default {
    name: "NavBase",

    setup() {
      const store = useStore();
      const logout = () => {
        store.commit('logout');
      };

      return {
        logout,
      };
    },
}
</script>


<style scoped>
img {
  border-radius: 50%;
  width: 30px;
  height: 30px
}

.text {
  position: relative;
  top: 2px;
}

</style>