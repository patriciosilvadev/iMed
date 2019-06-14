<template>
  <div class="create-patient">
    <h1>Cadastrar atendente</h1>
    <form @submit.prevent="handlePatient">
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
        :name="'cpf'"
        :label="'CPF'"
        :value="patient.cpf"
        @inputValue="patient.cpf = $event.value"
      />
      <custom-input
        :name="'setor'"
        :label="'Setor'"
        :value="patient.setor"
        @inputValue="patient.setor = $event.value"
      />
      <custom-input
        :name="'salario'"
        :label="'Salário'"
        :value="patient.salario"
        @inputValue="patient.salario = $event.value"
      />
      <custom-input
        :name="'login'"
        :label="'Login'"
        :value="patient.login"
        @inputValue="patient.login = $event.value"
      />
      <custom-button :type="'submit'" :label="'Cadastrar'"/>
    </form>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

import api from "@/services/EmployeeService";

export default {
  components: {
    CustomInput,
    CustomButton
  },
  data() {
    return {
      patient: {
        personname: "",
        cpf: "",
        birth: "",
        sex: "",
        setor: "",
        salario: "",
        login: ""
      }
    };
  },
  methods: {
    async handlePatient() {
      try {
        const res = await api.createReceptionist(this.patient);
        alert("Deu certo!!!");
      } catch (err) {
        console.log(err.response);
        alert("Deu erro!!!");
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
