<template>
  <ContentBase>
    <div class="row">
      <div class="col-3">
        <!--使用":Entity="defined variable name"" 来将变量传入子组件-->
        <ProfileInfo @follow="follow" @unfollow="unfollow" :user="user" />
        <!--子组件通过context.emit()触发父组件的submit_post事件, submit_post事件再触发submit_post函数-->
        <ProfilePublish @submit_post="submit_post" />
      </div>
      <div class="col-9">
        <!--将posts的内容传入子组件 名称为posts-->
        <PostProfile :posts="posts" />
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from '../components/ContentBase'
import ProfileInfo from '../components/UserProfile/ProfileInfo'
import PostProfile from '../components/UserProfile/PostProfile'
import ProfilePublish from '../components/UserProfile/ProfilePublish'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import $ from 'jquery'

export default {
  name: "UserProfile",
  components: {
    ContentBase,
    ProfileInfo,
    PostProfile,
    ProfilePublish,
  },
  // 初始化函数
  setup() {
    const store = useStore();
    const route = useRoute();
    const userId = parseInt(route.params.userId); // 在NavBae.vue中的route-link中设置入参 取出其中的userId
    const user = reactive({});  // 从服务器拉取用户信息
    const posts = reactive({}); // 博文内容

    // 获取用户信息
    $.ajax({
      url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
      type: 'get',
      data: {
        user_id: userId,
      },
      headers: {
        'Authorization': "Bearer " + store.state.user.access,
      },
      success(resp) {
        user.id = resp.id;
        user.username = resp.username;
        user.photo = resp.photo;
        user.followerCount = resp.followerCount;
        user.is_followed = resp.is_followed;
      },
    });
    // 获取用户的所有帖子
    $.ajax({
      url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
      type: 'get',
      data: {
        user_id: userId,
      },
      headers: {
        'Authorization': "Bearer " + store.state.user.access,
      },
      success(resp) {
        posts.posts = resp;
      }
    });

    // 关注事件
    const follow = () => {
      if (user.isFollowed) return;
      user.isFollowed = true;
      user.followerCount++;
    };
    // 取关事件
    const unfollow = () => {
      if (!user.isFollowed) return;
      user.isFollowed = false;
      user.followerCount--;
    };
    /**
     * 发帖事件
     * @param content 从子组件传来的发帖的内容
     */
    const submit_post = (content) => {
      posts.count++;
      posts.posts.unshift({
        id: posts.count,
        authorId: 1,
        content: content,
      });
    };

    // 发帖内容为空事件
    const post_null = () => {
      this.flag = true;
    };

    return {
      user,
      posts,
      follow,
      unfollow,
      submit_post,
      post_null,
    }
  }
}
</script>

<style scoped>
</style>