<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div v-for="(item, key) in items" :key="key">{{ item.title }}</div>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data() {
  	return {
  		items : []
    }
  },
  async asyncData(){
	  return fetch('/api/articles').then(response =>
        response.json().then(data => ({ items: data }))
    )
  },
  mounted(){
  
  }
}
</script>
