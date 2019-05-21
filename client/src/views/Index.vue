<template>
  <div class="menu">
    <h1>Med System</h1>
    <div class="cards">
      <menu-card :titulo="'Gerenciar pacientes'" :url="'PatientArea'" :icone="'user'"/>
      <menu-card :titulo="'Gerenciar funcionários'" :url="'Funcionarios'" :icone="'users'"/>
    </div>
  </div>
</template>

<script>
import MenuCard from "@/components/MenuCard";

export default {
  components: {
    MenuCard
  }
};
</script>

<style lang="scss">
.menu {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
    font-size: 70px;
    position: relative;
    bottom: 20%;
  }

  .cards {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .menu-card {
      width: 45%;
      h2 {
        font-size: 25px;
      }
    }
  }
}
</style>
