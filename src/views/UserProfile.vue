<template>
  <ContentBase>
    <div class="row">
      <div class="col-3">
        <!--使用":Entity="defined variable name"" 来将变量传入子组件-->>
        <ProfileInfo @follow="follow" @unfollow="unfollow" :user="user">
        
        </ProfileInfo>
      </div>
      <div class="col-9">
        <!--将posts的内容传入子组件 名称为posts-->
        <PostProfile :posts="posts">

        </PostProfile>
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from '../components/ContentBase'
import ProfileInfo from '../components/UserProfile/ProfileInfo'
import PostProfile from '../components/UserProfile/PostProfile'
import { reactive } from 'vue'

export default {
  name: "UserProfile",
  components: {
    ContentBase,
    ProfileInfo,
    PostProfile,
  },
  // 初始化函数
  setup() {
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

    const follow = () => {
      if (user.isFollowed) return;
      user.isFollowed = true;
      user.followersCount ++;
    };

    const unfollow = () => {
      if (!user.isFollowed) return;
      user.isFollowed = false;
      user.followersCount --;
    };

    return {
      user,
      posts,
      follow,
      unfollow,
    }
  }
}
</script>

<style scoped>

</style>