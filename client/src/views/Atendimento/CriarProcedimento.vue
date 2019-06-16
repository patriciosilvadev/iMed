<template>
  <div class="patient-list">
    <h1>Aguardando procedimento</h1>
    <div class="funcionarios">
      <div class="pacientes">
        <h2>Pacientes aguardando procedimento</h2>
        <ul class="listagem">
          <li v-for="(patient, index) in patients" :key="index" @click="setPatient(patient)">
            <span>Nome: {{patient.personname}}</span>
            <span>Status: {{patient.status}}</span>
          </li>
        </ul>
      </div>
      <div class="enfermeiros">
        <h2>Selecionar enfermeira</h2>
        <ul class="listagem">
          <li v-for="(nurse, index) in nurses" :key="index" @click="setNurse(nurse)">
            <span>Nome: {{nurse.personname}}</span>
            <span>Cofen: {{nurse.cofen}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="formulario">
      <form @submit.prevent="insertProcedimento">
        <custom-input
          :name="'nome'"
          :label="'Nome'"
          :value="patient.personname"
          @inputValue="patient.personname = $event.value"
        />
        <custom-input
          :name="'responsavel'"
          :label="'Enfermeira responsavel'"
          :value="responsavel.personname"
          @inputValue="responsavel.personname = $event.value"
        />
        <custom-input
          :name="'procedimento'"
          :label="'Procedimento'"
          :value="procedimento.procedurename"
          @inputValue="procedimento.procedurename = $event.value"
        />
        <custom-input
          :name="'caminho'"
          :label="'Localizaçao dos resultados'"
          :value="procedimento.path"
          @inputValue="procedimento.path = $event.value"
        />
        <div class="buttons">
          <button type="submit">Finalizar procedimento</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

import api from "@/services/EmployeeService";
import api2 from "@/services/ProcedimentoService";

export default {
  components: {
    CustomInput,
    CustomButton
  },
  data() {
    return {
      patients: [],
      nurses: [],
      patient: '',
      responsavel: '',
      procedimento: {
        procedureid: '',
        patientid: '',
        nurseid: '',
        path: ''
      }
    };
  },
  methods: {
    async getPatients() {
      try {
        const res = await api2.getPatientsProcedimento();
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
    },
    setPatient(patient) {
      this.procedimento.patientid = patient.personid
      this.patient = patient
      this.getProcedimento()
    },
    setNurse(nurse) {
      this.procedimento.nurseid = nurse.personid
      this.responsavel = nurse
    },
    async getProcedimento() {
      try {
        const res = await api2.getProcedimento(this.patient);
        this.procedimento.procedurename = res.data.rows[0].procedurename
        this.procedimento.procedureid = res.data.rows[0].procedureid
      } catch (err) {
        console.log(err.response);
      }
    },
    async insertProcedimento() {
      try {
        const res = await api2.setProcedimento(this.procedimento);
        alert("Deu certo!!!");
        location.reload();
      } catch (err) {
        console.log(err.response);
        alert("Deu erro!!!");
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
  form {
    margin-top: 50px;

    button {
      background: #63f5b0;
      margin-top: 20px;
    }
  }
}
</style>
