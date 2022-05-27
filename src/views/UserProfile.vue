<template>
  <ContentBase>
    <div class="row">
      <div class="col-3">
        <!--使用":Entity="defined variable name"" 来将变量传入子组件-->
        <ProfileInfo v-if="isLogin" @follow="follow" @unfollow="unfollow" :user="user" />
        <!--子组件通过context.emit()触发父组件的submit_post事件, submit_post事件再触发submit_post函数-->
        <ProfilePublish v-if="is_me" @submit_post="submit_post" />
      </div>
      <div class="col-9">
        <!--将posts的内容传入子组件 名称为posts-->
        <PostProfile v-if="isLogin" :posts="posts" :user="user" @delete_post="deletePost"/>
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
import { computed } from 'vue'
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
        user.isFollowed = resp.is_followed;
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
        posts.count = resp.length;
        posts.posts = resp;
      }
    });

    // 关注事件
    const follow = () => {
      if (user.isFollowed) return;
      user.isFollowed = true;
      user.followerCount ++ ;
    };
    // 取关事件
    const unfollow = () => {
      if (!user.isFollowed) return;
      user.isFollowed = false;
      user.followerCount -- ;
    };
    /**
     * 发帖
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

    // 发帖内容为空
    const post_null = () => {
      this.flag = true;
    };

    // 删除一条帖子
    const deletePost = (post_id) => {
      // 将要被删除的那条帖子过滤掉
      posts.posts = posts.posts.filter(post => post.id !== post_id);
      posts.count = posts.length;
    }

    // 只有自己的账户才能实现发帖功能 判断是否是自己
    const is_me = computed(() => userId === store.state.user.id);

    const isLogin = computed(() => store.state.user.is_login === true);

    return {
      user,
      posts,
      is_me,
      isLogin,
      follow,
      unfollow,
      submit_post,
      post_null,
      deletePost,
    }
  }
}
</script>

<style scoped>
</style>