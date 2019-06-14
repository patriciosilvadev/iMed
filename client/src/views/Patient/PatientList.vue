<template>
  <div class="patient-list">
    <h1>Pacientes cadastrados</h1>
    <ul class="listagem">
      <li v-for="(patient, index) in patients" :key="index">
        <span>ID: {{patient.personid}}</span>
        <span>Nome: {{patient.personname}}</span>
        <span>CPF: {{patient.cpf}}</span>
        <span>Nascimento: {{patient.birth}}</span>
        <span>Sexo: {{patient.sex}}</span>
        <span>Plano: {{patient.healthplan}}</span>
        <span>Status: {{patient.status}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/services/PatienteService";

export default {
  data() {
    return {
      patients: []
    };
  },
  methods: {
    async getPatients() {
      try {
        const res = await api.getPatients();
        this.patients = res.data.rows;
      } catch (err) {
        console.log(err.response);
      }
    }
  },
  mounted() {
    this.getPatients();
  }
};
</script>

<style lang="scss">
.patient-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
    margin-bottom: 30px;
  }

  ul {
    margin: 0;
    padding: 0;
    color: white;
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
