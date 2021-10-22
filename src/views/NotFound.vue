<template>
  <div>
    <h1>Ooops!!!</h1>
    <h2>The {{ resouce }} you're looking for is not here.</h2>
    <router-link :to="{ name: 'event-list' }">Back ti the homepage</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resources: {
      type: String,
      required: true,
    },
  },
}
</script>