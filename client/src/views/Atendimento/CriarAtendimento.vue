<template>
  <div class="patient-list">
    <h1>Aguardando atendimento</h1>
    <div class="funcionarios">
      <div class="pacientes">
        <h2>Pacientes aguardando atendimento</h2>
        <ul class="listagem">
          <li v-for="(patient, index) in patients" :key="index" @click="setPatient(patient)">
            <span>Nome: {{patient.personname}}</span>
            <span>Status: {{patient.status}}</span>
          </li>
        </ul>
      </div>
      <div class="medicos">
        <h2>Selecionar medico</h2>
        <ul class="listagem">
          <li v-for="(doctor, index) in doctors" :key="index" @click="setDoctor(doctor)">
            <span>Nome: {{doctor.personname}}</span>
            <span>Especialidade: {{doctor.especialidade}}</span>
            <span>CRM: {{doctor.crm}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="formulario">
      <form @submit.prevent="setAtendimento">
        <custom-input
          :name="'nome'"
          :label="'Nome'"
          :value="patient.personname"
          @inputValue="patient.personname = $event.value"
        />
        <custom-input
          :name="'pressao'"
          :label="'Pressao'"
          :value="prontuario.pressao"
          @inputValue="prontuario.pressao = $event.value"
        />
        <custom-input
          :name="'temperatura'"
          :label="'Temperatura'"
          :value="prontuario.temperatura"
          @inputValue="prontuario.temperatura = $event.value"
        />
        <custom-input
          :name="'sintomas'"
          :label="'Sintomas'"
          :value="prontuario.sintomas"
          @inputValue="prontuario.sintomas = $event.value"
        />
        <custom-input
          :name="'responsavel'"
          :label="'Medico responsavel'"
          :value="responsavel.personname"
          @inputValue="responsavel.personname = $event.value"
        />
        <custom-input
          :name="'inicio'"
          :label="'Data inicio'"
          :value="atendimento.datainicio"
          @inputValue="atendimento.datainicio = $event.value"
        />
        <custom-input
          :name="'fim'"
          :label="'Data fim'"
          :value="atendimento.datafim"
          @inputValue="atendimento.datafim = $event.value"
        />
        <div class="buttons">
          <button type="submit">Encerrar atendimento</button>
        </div>
      </form>
      <form @submit.prevent="createProcedimento">
        <custom-input
          :name="'procedimento'"
          :label="'Procedimento'"
          :value="procedimento.procedurename"
          @inputValue="procedimento.procedurename = $event.value"
        />
        <div class="buttons">
          <button type="submit">Enviar para procedimento</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

import api from "@/services/EmployeeService";
import api2 from "@/services/AtendimentoService";
import api3 from "@/services/ProntuarioService";
import api4 from "@/services/ProcedimentoService";

export default {
  components: {
    CustomInput,
    CustomButton
  },
  data() {
    return {
      patients: [],
      doctors: [],
      atendimento: '',
      prontuario: '',
      patient: '',
      responsavel: '',
      procedimento: {
        patientid: '',
        procedurename: '',
        treatmentid: ''
      }
    };
  },
  methods: {
    async getPatients() {
      try {
        const res = await api2.getPatientsAtendimento();
        this.patients = res.data.rows;
      } catch (err) {
        console.log(err.response);
      }
    },
    async getDoctors() {
      try {
        const res = await api.getDoctors();
        this.doctors = res.data.rows;
      } catch (err) {
        console.log(err.response);
      }
    },
    async getProntuario(patient) {
      try {
        const res = await api3.getProntuario(patient);
        this.prontuario = res.data.rows[0];
      } catch (err) {
        console.log(err.response);
      }
    },
    async getAtendimento() {
      try {
        const res = await api2.getAtendimento(this.patient, this.responsavel);
        this.atendimento = res.data.rows[0];
      } catch (err) {
        console.log(err.response);
      }
    },
    setPatient(patient) {
      this.patient = patient
      this.getProntuario(this.patient)
      this.getAtendimento()
    },
    setDoctor(doctor) {
      this.responsavel = doctor
      this.getAtendimento()
    },
    async setAtendimento() {
      try {
        this.atendimento.doctorid = this.responsavel.personid
        const res = await api2.endAtendimento(this.atendimento);
        alert("Deu certo!!!");
        location.reload();
      } catch (err) {
        console.log(err.response);
        alert("Deu erro!!!");
      }
    },
    async createProcedimento() {
      try {
        this.procedimento.patientid = this.patient.personid
        this.procedimento.treatmentid = this.atendimento.treatmentid
        const res = await api4.createProcedimento(this.procedimento);
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
    this.getDoctors();
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
  form {
    margin-top: 50px;

    button {
      background: #63f5b0;
      margin-top: 20px;
    }
  }
}
</style>
