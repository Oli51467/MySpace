<template>
    <div class="card">
        <div class="card-body">
            <!--v-for相当于生成了3个div 每个div里的都可以使用其中的某一个post值-->
            <div class="postline" v-for="post in posts.posts" :key="post.id">
                <div class="card">
                    <div class="card-body">
                        {{post.content}}
                        <button v-if="is_me" type="button" class="btn btn-danger btn-sm" @click="deletePost(post.id)">删除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'PostProfile',
    /* 使用pros来接受父组件传来的参数 */
    props: {
        posts: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        }
    },

    setup(props, context) {
        const store = useStore();
        let is_me = computed(() => store.state.user.id === props.user.id);

        const deletePost = (post_id) => {
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
                type: 'delete',
                data: {
                    post_id: post_id,
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === 'success') {
                        context.emit('delete_post', post_id);
                    }
                }
            });
        }

        return {
            is_me,
            deletePost,
        }
    }
}
</script>

<style scoped>
.postline {
    padding-bottom: 10px;
}

button {
    float: right;
}
</style>