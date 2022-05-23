<template>
  <ContentBase>
    <div class="row">
      <div class="col-3">
        <ProfileInfo @follow="follow" @unfollow="unfollow" :user="user">
        
        </ProfileInfo>
      </div>
      <div class="col-9">
        <PostProfile></PostProfile>
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

    const follow = () => {
      if (user.isFollowed) return;
      user.isFollowed = true;
      user.followersCount ++;
    }

    const unfollow = () => {
      if (!user.isFollowed) return;
      user.isFollowed = false;
      user.followersCount --;
    }

    return {
      user,
      follow,
      unfollow
    }
  }
}
</script>

<style scoped>

</style>