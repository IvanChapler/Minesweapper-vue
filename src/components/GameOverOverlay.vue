<template>
  <div class="overlay">
    <div class="overlay_modal">
      result
    </div>
    <div class="btns">
      <slot></slot>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.btns {
  display: flex;
  width: 130px;
  justify-content: space-between;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.53);
}
.overlay_modal {
  width: 400px;
  height: 100px;
  background: #181818;
  border-radius: 10px;
  border: 3px solid #535353;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
}
</style>