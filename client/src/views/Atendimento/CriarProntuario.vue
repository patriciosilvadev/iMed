<template>
  <div class="patient-list">
    <h1>Aguardando triagem</h1>
    <div class="funcionarios">
      <div class="pacientes">
        <h2>Pacientes aguardando triagem</h2>
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
      <form @submit.prevent="setProntuario">
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
          :label="'Enfermeira responsavel'"
          :value="responsavel.personname"
          @inputValue="responsavel.personname = $event.value"
        />
        <div class="buttons">
          <button type="submit">Enviar para atendimento</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

import api from "@/services/EmployeeService";
import api2 from "@/services/ProntuarioService";
import api3 from "@/services/AtendimentoService";

export default {
  components: {
    CustomInput,
    CustomButton
  },
  data() {
    return {
      patients: [],
      nurses: [],
      prontuario: {
        patientid: '',
        nurseid: '',
        temperatura: '',
        pressao: '',
        sintomas: ''
      },
      atendimento: {
        patientid: '',
        doctorid: '',
        nurseid: '',
        receptionistid: '',
        prontuarioid: '',
        datainicio: '',
        datafim: ''
      },
      patient: '',
      responsavel: ''
    };
  },
  methods: {
    async getPatients() {
      try {
        const res = await api2.getPatientsTriagem();
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
      this.prontuario.patientid = patient.personid
      this.atendimento.patientid = patient.personid
      this.patient = patient
    },
    setNurse(nurse) {
      this.prontuario.nurseid = nurse.personid
      this.atendimento.nurseid = nurse.personid
      this.responsavel = nurse
    },
    async setProntuario() {
      try {
        const res = await api2.createProntuario(this.prontuario);
        const prontuario_res = await api2.getProntuario(this.patient);
        this.atendimento.prontuarioid = prontuario_res.data.rows[0].prontuarioid
        this.createAtendimento()
        alert("Deu certo!!!");
        location.reload();
      } catch (err) {
        console.log(err.response);
        alert("Deu erro!!!");
      }
    },
    async createAtendimento() {
      try {
        const res = await api3.gerarAtendimento(this.atendimento);
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
