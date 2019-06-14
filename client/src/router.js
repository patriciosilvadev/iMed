import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index';
import PatientArea from '@/views/PatientArea';
import CreatePatient from '@/views/CreatePatient';
import EditPatient from '@/views/EditPatient';
import PatientList from '@/views/PatientList';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/patient-area',
      name: 'PatientArea',
      component: PatientArea
    },
    {
      path: '/create-patient',
      name: 'CreatePatient',
      component: CreatePatient
    },
    { path: '/edit-patient', name: 'EditPatient', component: EditPatient },
    { path: '/patient-list', name: 'PatientList', component: PatientList }
  ]
});
