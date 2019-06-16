<template>
  <div class="patient-area">
    <h1>Área de atendimento</h1>
    <div class="cards">
      <menu-card :titulo="'Prontuário'" :url="'CriarProntuario'" :icone="'edit'"/>
      <menu-card :titulo="'Atendimento'" :url="'CriarAtendimento'" :icone="'edit'"/>
      <menu-card :titulo="'Listar todos os pacientes'" :url="'PatientList'" :icone="'users'"/>
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
.patient-area {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 50px;

    .menu-card {
      width: 45%;
      margin-bottom: 10%;
    }
  }
}
</style>
