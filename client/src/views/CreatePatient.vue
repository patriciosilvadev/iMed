<template>
  <div class="create-patient">
    <h1>Cadastrar paciente</h1>
    <form @submit.prevent="handlePatient">
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
      <custom-button :type="'submit'" :label="'Cadastrar'"/>
    </form>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

import api from "@/services/PatienteService";

export default {
  components: {
    CustomInput,
    CustomButton
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
        sexo: "",
        cpf: ""
      }
    };
  },
  methods: {
    async handlePatient() {
      try {
        const res = await api.createPatient(this.patient);
        alert("Deu certo!!!");
      } catch (err) {
        alert("Deu erro!!! - " + err.response.data.detail);
      }
    }
  }
};
</script>

<style lang="scss">
.create-patient {
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

    button {
      background: #63f5b0;
    }
  }
}
</style>
