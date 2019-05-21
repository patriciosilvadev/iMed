<template>
  <div class="create-patient">
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
          :value="patient.nome"
          @inputValue="patient.nome = $event.value"
        />
        <custom-input
          :name="'nome_mae'"
          :label="'Nome da mãe'"
          :value="patient.nome_mae"
          @inputValue="patient.nome_mae = $event.value"
        />
        <custom-input
          :name="'nome_pai'"
          :label="'Nome do pai'"
          :value="patient.nome_pai"
          @inputValue="patient.nome_pai = $event.value"
        />
        <custom-input
          :name="'nascimento'"
          :label="'Data de nascimento'"
          :value="patient.nascimento"
          @inputValue="patient.nascimento = $event.value"
        />
        <custom-input
          :name="'rg_numero'"
          :label="'Número do RG'"
          :value="patient.rg_numero"
          @inputValue="patient.rg_numero = $event.value"
        />
        <custom-input
          :name="'rg_orgao'"
          :label="'Órgão emissor'"
          :value="patient.rg_orgao"
          @inputValue="patient.rg_orgao = $event.value"
        />
        <custom-input
          :name="'rg_data'"
          :label="'Data de emissão'"
          :value="patient.rg_data"
          @inputValue="patient.rg_data = $event.value"
        />
        <custom-input
          :name="'idade'"
          :label="'Idade'"
          :value="patient.idade"
          @inputValue="patient.idade = $event.value"
        />
        <custom-input
          :name="'sexo'"
          :label="'Sexo'"
          :value="patient.sexo"
          @inputValue="patient.sexo = $event.value"
        />
        <custom-input
          :name="'cpf'"
          :label="'CPF'"
          :value="patient.cpf"
          @inputValue="patient.cpf = $event.value"
        />
        <button type="submit">Editar</button>
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
        nome: "",
        nome_mae: "",
        nome_pai: "",
        nascimento: "",
        rg_numero: "",
        rg_orgao: "",
        rg_data: "",
        idade: "",
        sexoo: "",
        cpf: ""
      },
      searchInput: ""
    };
  },
  methods: {
    async handleEdit() {
      try {
        if (this.patient === "") {
          alert("Nenhum paciente para atualizar");
          return;
        }
        const res = await api.editPatient(this.searchInput, this.patient);
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

<style>
</style>
