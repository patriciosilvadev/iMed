import Vue from 'vue';
import Router from 'vue-router';
import CreatePatient from '@/components/views/CreatePatient';
import EditPatient from '@/components/views/EditPatient';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/create-patient',
      name: 'CreatePatient',
      component: CreatePatient
    },
    { path: '/edit-patient', name: 'EditPatient', component: EditPatient }
  ]
});
