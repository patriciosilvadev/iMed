<template>
  <div class="patient-list">
    <h1>Criar prontuario</h1>
    <div class="funcionarios">
      <div class="pacientes">
        <h2>Pacientes aguardando triagem</h2>
        <ul class="listagem">
          <li v-for="(patient, index) in patients" :key="index">
            <span>Nome: {{patient.personname}}</span>
            <span>Status: {{patient.status}}</span>
            <span>Plano: {{patient.healthplan}}</span>
          </li>
        </ul>
      </div>
      <div class="enfermeiros">
        <h2>Selecionar enfermeira</h2>
        <ul class="listagem">
          <li v-for="(nurse, index) in nurses" :key="index">
            <span>Nome: {{nurse.personname}}</span>
            <span>Cofen: {{nurse.cofen}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="formulario">
      <form @submit.prevent="handleEdit">
        <custom-input
          :name="'nome'"
          :label="'Nome'"
          :value="patient.personname"
          @inputValue="patient.personname = $event.value"
        />
        <custom-input
          :name="'nascimento'"
          :label="'Data de nascimento'"
          :value="patient.birth"
          @inputValue="patient.birth = $event.value"
        />
        <custom-input
          :name="'sexo'"
          :label="'Sexo'"
          :value="patient.sex"
          @inputValue="patient.sex = $event.value"
        />
        <custom-input
          :name="'plano'"
          :label="'Plano'"
          :value="patient.healthplan"
          @inputValue="patient.healthplan = $event.value"
        />
        <custom-input
          :name="'cpf'"
          :label="'CPF'"
          :value="patient.cpf"
          @inputValue="patient.cpf = $event.value"
        />
        <custom-input
          :name="'status'"
          :label="'Status'"
          :value="patient.status"
          @inputValue="patient.status = $event.value"
        />
        <div class="buttons">
          <button type="submit">Editar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/services/EmployeeService";
import api2 from "@/services/ProntuarioService";

export default {
  data() {
    return {
      patients: [],
      nurses: []
    };
  },
  methods: {
    async getPatients() {
      try {
        const res = await api2.getPatientsTriagem();
        console.log(res);
        this.patients = res.data.rows;
      } catch (err) {
        console.log(err.response);
      }
    },
    async getNurses() {
      try {
        const res = await api.getNurses();
        this.nurses = res.data.rows;
      } catch (err) {
        console.log(err.response);
      }
    }
  },
  mounted() {
    this.getPatients();
    this.getNurses();
  }
};
</script>

<style lang="scss">
.patient-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1,
  h2 {
    color: white;
    margin-bottom: 30px;
  }

  ul {
    margin: 0;
    padding: 0;
    color: white;
  }

  .funcionarios {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .listagem {
    height: 600px;
    overflow: scroll;

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
