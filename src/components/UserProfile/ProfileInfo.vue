<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <img class="img-fluid" src="https://tse1-mm.cn.bing.net/th/id/OIP-C.xn2JS6NszlMLJf2a9QHgmwHaEA?w=287&h=180&c=7&r=0&o=5&dpr=2&pid=1.7">
                </div>
                <div class="col-9">
                    <div class="username">{{user.userName}}</div>
                    <div class="fans">粉丝数：{{user.followersCount}}</div>
                    <button @click="follow" v-if="!user.isFollowed" type="button" class="btn btn-success btn-sm">关注</button>
                    <button @click="unfollow" v-if="user.isFollowed" type="button" class="btn btn-secondary btn-sm">取消关注</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
        // 子组件的关注函数 通过context.emit()向父组件传递信息(函数)
        const follow = () => {
            context.emit('follow');
        }

        // 子组件的取消关注函数
        const unfollow = () => {
            context.emit('unfollow');
        }
        
        return {
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
</style>