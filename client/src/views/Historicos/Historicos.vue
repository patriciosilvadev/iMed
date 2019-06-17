<template>
  <div class="menu">
    <h1>Historicos</h1>
    <div class="cards">
      <menu-card :titulo="'Historico do paciente'" :url="'HistoricoPaciente'" :icone="'address-book'"/>
      <menu-card :titulo="'Historico do medico'" :url="'HistoricoDoctor'" :icone="'address-book'"/>
      <menu-card :titulo="'Historico da enfermeira'" :url="'HistoricoNurse'" :icone="'address-book'"/>
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
