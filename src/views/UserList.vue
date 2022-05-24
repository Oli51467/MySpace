<template>
  <ContentBase>
    <div class="card" v-for="user in users" :key="user.id">
      <div class="card-body">
        <div class="row">
          <!--1 rate for head 如果在属性加上:, 则表示取字符串的值-->
          <div class="col-1">
            <!--fluid为响应式布局-->
            <img class="img-fluid" :src="user.photo" alt="">
          </div>
          <!--11 rate for other info-->
          <div class="col-11">
            <div class="username">{{user.username}}</div>
            <div class="followercount">粉丝数: {{user.followerCount}}</div>
          </div>
        </div>
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase'
import $ from 'jquery'
import { ref } from 'vue'

export default {
  name: "UserList",
  components: {
    ContentBase,
  },

  setup() {
    let users = ref([]);
    $.ajax({
      url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',
      type: 'get',
      contentType: "application/json",
      success(resp) {
        console.log(resp);
        users.value = resp;
      }
    });

    return {
      users,
    }
  }
}
</script>

<style scoped>
img {
  border-radius: 50%;
}

.username {
  font-weight: bold;
  height: 50%;
}

.followercount {
  font-size: 12px;
  color: lightgray;
  height: 50%;
  margin-top: 5px;
}

.card {
  margin-bottom: 10px;
  cursor: pointer;
}

.card:hover {
  box-shadow: 2px 2px 10px lightgray;
  transition: 500ms;
}
</style>