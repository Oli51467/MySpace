<template>
    <div class="card">
        <div class="card-body">
            <!--v-for相当于生成了3个div 每个div里的都可以使用其中的某一个post值-->
            <div class="postline" v-for="post in posts.posts" :key="post.id">
                <div class="card">
                    <div class="card-body">
                        {{post.content}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostProfile',
    /* 使用pros来接受父组件传来的参数 */
    props: {
        posts: {
            type: Object,
            required: true,
        },
    }
}
</script>

<style scoped>
.postline {
    padding-bottom: 10px;
}
</style>