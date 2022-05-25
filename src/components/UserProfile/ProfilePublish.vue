<template>
    <div class="card edit-field">
        <div class="card-body">
            <div class="mb-3">
                <!--使用v-model绑定content 使:content=textarea.content-->
                <textarea v-model="content" class="form-control" id="edit-post" rows="3">
                </textarea>
                <!--@click绑定点击按钮发帖的事件-->
                <button @click="submit_post" type="button" class="btn btn-success btn-sm postout">发帖</button>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';

export default {
    name: 'ProfilePublish',
    setup(props, context) {
        /*
        使用ref函数, 用于创建一个响应式数据
        ref函数仅能监听基本类型的变化, 不能监听复杂类型的变化(比如对象、数组)
        */
        let content = ref('');
        const store = useStore();

        const submit_post = () => {
            // 内容为空不能发布
            if (content.value == ''){
                context.emit('post_null');
                return;
            }
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
                type: 'post',
                data: {
                    content: content.value,
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success() {
                    context.emit('submit_post', content.value);
                    content.value = '';
                }
            });
        };

        return {
            content,
            submit_post,
        }
    }
}
</script>

<style scoped>
.edit-field {
    margin-top: 10px;
}

.postout {
    margin-top: 10px;
    position: relative;
    left: 105px;
}
</style>