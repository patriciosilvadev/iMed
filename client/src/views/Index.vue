<template>
  <div class="menu">
    <h1>Med System</h1>
    <div class="cards">
      <menu-card :titulo="'Gerenciar pacientes'" :url="'PatientArea'" :icone="'user'"/>
      <menu-card :titulo="'Gerenciar funcionários'" :url="'EmployeeArea'" :icone="'users'"/>
      <menu-card
        :titulo="'Gerenciar atendimento'"
        :url="'AreaAtendimento'"
        :icone="'address-card'"
      />
      <menu-card :titulo="'Visualizar historicos'" :url="'Historicos'" :icone="'address-book'"/>
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
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    .menu-card {
      width: 45%;
      margin-bottom: 50px;
      h2 {
        font-size: 25px;
      }
    }
  }
}
</style>
