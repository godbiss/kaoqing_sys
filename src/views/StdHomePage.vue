<template>
  <div class="container">
    

    <Bottom-Nav :idx="0"></Bottom-Nav>
  </div>
</template>

<script>
import BottomNav from "../components/BottomNav";
export default {
  name: "StdHomePage",
  components: { BottomNav },
};
</script>

<style scoped>

</style>