<template>
    <div class="home">
        <div class="container">
            <div class="card">
                <div class="card-body">
                    <slot></slot> <!--slot存放父组件传来的所有children-->
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'ContentBase',
  components: {
  }
}
</script>

<style scoped>    <!--添加scope属性后, 不同组件间的css不会相互影响。-->
.container {  
  margin-top: 20px;
}

.card-body {
  text-align: left;
}
</style>