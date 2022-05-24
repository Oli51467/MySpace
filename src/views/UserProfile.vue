<template>
  <ContentBase>
    <div class="row">
      <div class="col-3">
        <!--使用":Entity="defined variable name"" 来将变量传入子组件-->
        <ProfileInfo @follow="follow" @unfollow="unfollow" :user="user"/>
        <!--子组件通过context.emit()触发父组件的submit_post事件, submit_post事件再触发submit_post函数-->
        <ProfilePublish @submit_post="submit_post"/>
      </div>
      <div class="col-9">
        <!--将posts的内容传入子组件 名称为posts-->
        <PostProfile :posts="posts"/>
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
    // 预定义用户信息
    const user = reactive({
      id: 1,
      userName: "RavenSpur",
      lastName: "Raven",
      FirstName: "Spur",
      followersCount: 0,
      isFollowed: false
    });

    // 博文内容
    const posts = reactive({
      count: 3,
      posts: [
        {
          id: 1,
          authorId: 1,
          content: "这是一条内容",
        },
        {
          id: 2,
          authorId: 1,
          content: "这是一条内容",
        },
        {
          id: 3,
          authorId: 1,
          content: "这是一条内容",
        }
      ]
    });

    // 关注事件
    const follow = () => {
      if (user.isFollowed) return;
      user.isFollowed = true;
      user.followersCount ++;
    };
    // 取关事件
    const unfollow = () => {
      if (!user.isFollowed) return;
      user.isFollowed = false;
      user.followersCount --;
    };
    /**
     * 发帖事件
     * @param content 从子组件传来的发帖的内容
     */
    const submit_post = (content) => {
      posts.count ++;
      posts.posts.unshift ({
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