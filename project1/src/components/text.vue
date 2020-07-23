<!--
 * @Author: your name
 * @Date: 2020-07-21 08:53:11
 * @LastEditTime: 2020-07-21 08:56:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project1\src\components\text.vue
-->
<template>
  <div id="box">{{ data }}</div>
</template>
<script>
export default {
  data: () => {
    return {
      data: "hello",
    };
  },
};
</script>
<style scoped>
#box {
  width: 100%;
  height: 500px;
  background-color: black;
}
</style>
