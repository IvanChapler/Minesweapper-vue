<template>
<v-container>
  <v-row justify="center" class="contacts_base">
    <v-col cols="2" align-self="center">
      <div class="contacts_img-wrapper">
        <img src="../img/Ml9x4gJhlz8.jpg" class="contacts-img">
      </div>
    </v-col>
    <v-col cols="4">
        <div class="contacts_text">
          Thank you for visiting my site! <br>
          If you have any questions, write to me.
        </div>
      <div class="contacts_icons-wrapper">
        <a class="contacts_icon" href="https://github.com/IvanChapler" target="_blank"><v-icon icon="mdi-github" size="x-large"></v-icon></a>
        <a class="contacts_icon" href="mailto:ererer4646@gmail.com?subject=Question&body=Hello! ..." target="_blank"><v-icon icon="mdi-gmail" size="x-large"></v-icon></a>
        <a class="contacts_icon" href="https://t.me/Tsukoumi" target="_blank"><v-icon icon="mdi-send" size="x-large"></v-icon></a>
      </div>
    </v-col>
  </v-row>
</v-container>
</template>

<script setup>
</script>

<style scoped>
.contacts_base {
  margin-top: 135px;
}

.contacts_img-wrapper {
  width: 150px;
  height: 150px;
  margin: 0 auto;
}

.contacts-img {
  width: 100%;
  border-radius: 50%;
  max-height: 100%;
  object-fit: cover;
  object-position: center;
}

.contacts_text {
  font-size: 19px;
  letter-spacing: 1.2px;
  line-height: 1.6;
}

.contacts_icons-wrapper {
  margin-top: 35px;
}

.contacts_icon {
  font-size: 25px;
  margin-right: 15px;
  text-decoration: none;
  color: white;
}

.contacts_icon:hover {
  color: #535353;
}
</style>