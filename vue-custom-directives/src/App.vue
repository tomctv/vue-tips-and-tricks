<script setup>
function onClickOutside() {
  console.log("You clicked outside");
}
</script>

<template>
  <header>

  </header>

  <main>
    <textarea name="textarea" id="textarea" cols="30" rows="10" placeholder="Tell me about you"
      v-click-outside="onClickOutside"></textarea>
  </main>
</template>

<style scoped></style>
