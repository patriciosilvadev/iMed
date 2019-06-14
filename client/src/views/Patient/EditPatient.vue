<template>
  <div class="edit-patient">
    <div class="container">
      <h1>Editar paciente</h1>
      <form @submit.prevent="handleSearch">
        <custom-input
          :name="'search'"
          :label="'CPF'"
          :value="searchInput"
          @inputValue="searchInput = $event.value"
        />
        <button type="submit">Buscar</button>
      </form>
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
import CustomInput from "@/components/CustomInput";

import api from "@/services/PatienteService";

export default {
  components: {
    CustomInput
  },
  data() {
    return {
      patient: {
        personname: "",
        birth: "",
        sex: "",
        cpf: "",
        healthplan: "",
        patientid: "",
        status: ""
      },
      searchInput: ""
    };
  },
  methods: {
    async handleEdit() {
      try {
        if (this.searchInput === "") {
          alert("Nenhum paciente para atualizar");
          return;
        }
        const res = await api.editPatient(this.patient);
        alert("Paciente atualizado");
        this.patient = "";
      } catch (err) {
        alert("Deu erro!!! - " + err.response.data.detail);
        console.log(err.response);
      }
    },
    async handleSearch() {
      try {
        const res = await api.searchPatient(this.searchInput);
        if (res.data !== "") this.patient = res.data;
        else {
          alert("Nenhum dado encontrado");
          this.patient = "";
        }
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
}
</style>
