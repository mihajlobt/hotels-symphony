<template>
  <div class="flex-container">
    <div v-if="reviews.length">
      <el-card v-for="review in reviews" :key="review.id">
        <el-row>{{ review.message }}</el-row>
        <el-row>Likes: {{ review.likes }}</el-row>
        <el-row>Dislikes: {{ review.dislikes }}</el-row>
        <el-row>Posted On: {{ review.created_at }}</el-row>
        <el-row>
          Author: {{ review.author.first_name }} {{ review.author.last_name }}
        </el-row>
      </el-card>
    </div>
    <el-card v-else>No Reviews</el-card>
  </div>
</template>

<script>
export default {
  name: "Review",
  computed: {
    reviews() {
      return this.$store.state.reviews;
    }
  }
};
</script>

<style scoped></style>
