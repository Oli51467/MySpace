<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3 img-field">
                    <img class="img-fluid" :src="user.photo">
                </div>
                <div class="col-9">
                    <div class="username">{{user.userName}}</div>
                    <div class="fans">粉丝数：{{user.followerCount}}</div>
                    <button @click="follow" v-if="!user.isFollowed && !is_me" type="button" class="btn btn-success btn-sm">关注</button>
                    <button @click="unfollow" v-if="!is_me && user.isFollowed" type="button" class="btn btn-secondary btn-sm">取消关注</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import $ from 'jquery';

export default {
    name: 'ProfileInfo',
    // 父组件向子组件传递信息：props 子组件向父组件传递信息：event
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    setup(props, context) {
        const store = useStore();
        const route = useRoute();
        const is_me = computed(() => store.state.user.id === parseInt(route.params.userId));

        // 子组件的关注函数 通过context.emit()向父组件传递信息(函数)
        const follow = () => {
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/myspace/follow/',
                type: 'post',
                data: {
                    target_id: props.user.id,
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit('follow');
                    }
                }
            });
        }

        // 子组件的取消关注函数
        const unfollow = () => {
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/myspace/follow/',
                type: 'post',
                data: {
                    target_id: props.user.id,
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit('unfollow');
                    }
                }
            });
        }
        
        return {
            is_me,
            follow,
            unfollow
        }
    },
}
</script>

<style scoped>
img {
    border-radius: 50%;
    height: 55px;
}

.username {
    font-weight: bold;
}

.fans {
    font-size: small;
    color: gray;
}

button {
    padding: 2px 4px;
    font-size: 12px;
}

.img-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>