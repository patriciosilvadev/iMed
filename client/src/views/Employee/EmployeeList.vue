<template>
  <div class="patient-list">
    <h1>Funcionarios cadastrados</h1>
    <div class="funcionarios">
      <div class="medicos">
        <h2>Médicos</h2>
        <ul class="listagem">
          <li v-for="(doctor, index) in doctors" :key="index">
            <span>ID: {{doctor.personid}}</span>
            <span>Nome: {{doctor.personname}}</span>
            <span>CPF: {{doctor.cpf}}</span>
            <span>Nascimento: {{doctor.birth}}</span>
            <span>Sexo: {{doctor.sex}}</span>
            <span>Status: {{doctor.status}}</span>
            <span>CRM: {{doctor.crm}}</span>
            <span>Especialidade: {{doctor.especialidade}}</span>
            <span>Setor: {{doctor.setor}}</span>
          </li>
        </ul>
      </div>
      <div class="atendentes">
        <h2>Atendentes</h2>
        <ul class="listagem">
          <li v-for="(r, index) in receptionists" :key="index">
            <span>ID: {{r.personid}}</span>
            <span>Nome: {{r.personname}}</span>
            <span>CPF: {{r.cpf}}</span>
            <span>Nascimento: {{r.birth}}</span>
            <span>Sexo: {{r.sex}}</span>
            <span>Status: {{r.status}}</span>
            <span>Login: {{r.login}}</span>
            <span>Setor: {{r.setor}}</span>
          </li>
        </ul>
      </div>
      <div class="enfermeiros">
        <h2>Enfermeiras</h2>
        <ul class="listagem">
          <li v-for="(nurse, index) in nurses" :key="index">
            <span>ID: {{nurse.personid}}</span>
            <span>Nome: {{nurse.personname}}</span>
            <span>CPF: {{nurse.cpf}}</span>
            <span>Nascimento: {{nurse.birth}}</span>
            <span>Sexo: {{nurse.sex}}</span>
            <span>Status: {{nurse.status}}</span>
            <span>Cofen: {{nurse.cofen}}</span>
            <span>Setor: {{nurse.setor}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/EmployeeService";

export default {
  data() {
    return {
      doctors: [],
      receptionists: [],
      nurses: []
    };
  },
  methods: {
    async getDoctors() {
      try {
        const res = await api.getDoctors();
        this.doctors = res.data.rows;
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
    },
    async getReceptionists() {
      try {
        const res = await api.getReceptionists();
        this.receptionists = res.data.rows;
      } catch (err) {
        console.log(err.response);
      }
    }
  },
  mounted() {
    this.getDoctors();
    this.getNurses();
    this.getReceptionists();
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
