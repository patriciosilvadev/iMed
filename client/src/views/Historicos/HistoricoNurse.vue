<template>
  <div class="edit-patient">
    <div class="container">
      <h1>Historico da enfermeira</h1>
      <form @submit.prevent="handleSearch">
        <custom-input
          :name="'search'"
          :label="'CPF'"
          :value="searchInput"
          @inputValue="searchInput = $event.value"
        />
        <button type="submit">Buscar</button>
      </form>
      <div class="listagem">
        <ul>
          <li v-for="(atendimento, index) in atendimentos" :key="index">
            <span>Data inicio: {{atendimento.data_inicio}}</span>
            <span>Data fim: {{atendimento.data_fim}}</span>
            <span>Nome: {{atendimento.nome_paciente}}</span>
            <span>Medico: {{atendimento.nome_medico}}</span>
            <span>Enfermeira responsavel pela triagem: {{atendimento.nome_enfermeira}}</span>
            <span>Temperatura: {{atendimento.temperatura}}</span>
            <span>Pressao: {{atendimento.pressao}}</span>
            <span>Sintomas: {{atendimento.sintomas}}</span>
            <span>Nome do procedimento: {{atendimento.procedimento_nome}}</span>
            <span>Local do resultado: {{atendimento.local_do_resultado}}</span>
            <span>Enfermeira responsavel pelo procedimento: {{atendimento.enfermeira_responsavel}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput";

import api from "@/services/EmployeeService";
import api2 from "@/services/HistoricoService";

export default {
  components: {
    CustomInput
  },
  data() {
    return {
      searchInput: "",
      nurse: '',
      atendimentos: [],
    };
  },
  methods: {
    async handleSearch() {
      try {
        const res = await api.searchNurse(this.searchInput);
        if (res.data !== "") {
          this.nurse = res.data;
          this.searchAtendimentos()
        }
        else {
          alert("Nenhum dado encontrado");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async searchAtendimentos() {
      try {
        const res = await api2.searchAtendimentosNurse(this.nurse);
        this.atendimentos = res.data.rows
      } catch (err) {
        console.log(err);
      }  
    }
  }
};
</script>

<style lang="scss">
.edit-patient {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
  }

  form {
    width: 50%;
    margin-top: 50px;

    .buttons {
      display: flex;
      justify-content: space-between;
    }

    button {
      background: #63f5b0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    color: white;
  }

  .listagem {
    margin-top: 50px;
    height: 300px;
    overflow: auto;

    li {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      border-bottom: 2px solid white;
      padding-bottom: 20px;
    }
  }
}
</style>
