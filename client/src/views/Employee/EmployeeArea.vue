<template>
  <div class="employee-area">
    <h1>Área de gerenciamento de funcionários</h1>
    <div class="cards">
      <menu-card :titulo="'Cadastrar Atendente'" :url="'CreateReceptionist'" :icone="'user'"/>
      <menu-card :titulo="'Cadastrar Médico'" :url="'CreateDoctor'" :icone="'user'"/>
      <menu-card :titulo="'Cadastrar Enfermeira'" :url="'CreateNurse'" :icone="'user'"/>
      <menu-card :titulo="'Listar todos os funcionários'" :url="'EmployeeList'" :icone="'users'"/>
      <menu-card :titulo="'Editar atendente'" :url="'EditReceptionist'" :icone="'edit'"/>
      <menu-card :titulo="'Editar médico'" :url="'EditDoctor'" :icone="'edit'"/>
      <menu-card :titulo="'Editar enfermeira'" :url="'EditNurse'" :icone="'edit'"/>
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
.employee-area {
  /* height: 100vh; */
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
