<template>
  <div class="search-result">
    <div class="title">{{ result.title }}</div>
    <div class="date">{{ result.date }}</div>
    <div class="summary">{{ result.summary }}</div>
    <div class="tags">
      <span class="tag" v-for="tag in result.tags" :key="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  data() {
    return {
      result: {
        title: '标题占位符',
        date: '2023年10月28日',
        summary: '摘要占位符。这是搜索结果的简短描述。',
        tags: ['标签一', '标签二']
      }
    };
  }
}
</script>

<style scoped>
.search-result {
  font-family: 'Arial', sans-serif;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8px;
}

.date {
  font-size: 14px;
  color: #666666;
  margin-bottom: 16px;
}

.summary {
  font-size: 16px;
  color: #444444;
  margin-bottom: 16px;
}

.tags {
  display: flex;
}

.tag {
  background-color: #f0f0f0;
  border-radius: 16px;
  padding: 8px 16px;
  font-size: 14px;
  color: #777777;
  margin-right: 8px;
}
</style>
