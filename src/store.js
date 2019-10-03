import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// setting up the endpoint !!!!!!!
axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
 
export default new Vuex.Store({
  state: {
  	// token to verify auth user
  	token: localStorage.getItem('access_token') || null,

    // aqui guardaremos la data de los presupuestos (Presupuestos[])
    globalBudgets: [],
    // local budgets para cuando se consultan por fecha
    budgets: [],
    // ganancia total de budgets
    globalTotal: 0,
    // el id del usuario 
    user_id: localStorage.getItem('user_id') || null,
    // no funciona esto todavia
    types: 'nah',
    // aqui guardaremos la data para los controles 
    controls: [],
    current_control_id: localStorage.getItem('current_control_id') || null
    // 
  },
  mutations: {
  	// we cannot update the state directly 
  	// we need to use mutations to refresh our state
  	retrieveToken(state,token){
  		state.token = token
  	},
    destroyToken(state){
      state.token = null;
      state.user_id = '';
      state.budgets = [];
      state.controls = [];
      state.globalBudgets = [];
    },
    fetchGlobalBudgets(state,data){
      state.globalBudgets = data;
    },
    fetchBudgets(state,data){
      state.budgets = data;
    },
    fetchTypes(state){
       axios.get(`/type/id/${state.user_id}`)
        .then(res => {
            console.log('SUCCESS ',res.data)
            state.types = res.data;
        })
        .catch(function (error) {
          console.log('Error fetching types',error);
        })
    },
    fetchControls(state,data){
       state.controls = data;
    },
    fetchBudgetsFromTo(state,data){
      let fromMl = Date.parse(data.from);
      let toMl = Date.parse(data.to);
      
      let filteredBudgets = state.globalBudgets.filter(budget=>{

        let budgetDateMl = Date.parse(budget.date);

        if (budgetDateMl >= fromMl && budgetDateMl <= toMl) {
          return budget
        }
      })
      
      state.budgets = filteredBudgets;
    },
    retrieveUserData(state,data){

      localStorage.setItem('user_id',data[0].id);
      state.user_id = data[0].id;
    },
    setCurrentControl(state,data){
      localStorage.setItem('current_control_id',data.control_id);
      state.current_control_id = data.control_id;
    }
  },
  getters: {
    loggedIn(state){
      return state.token !== null
    },
    budgets(state){
      return state.budgets
    },
    user_id(state){
      return state.user_id
    },
    types(state){
      return state.types
    },
    controls(state){
      return state.controls
    },
    current_control_id(state){
      return state.current_control_id
    }
  },
  actions: {
    setCurrentControl(context,data){
      context.commit('setCurrentControl',data)
    },
    // authentication actions

  	register(context,data){

        return new Promise((resolve, reject) => {
          axios.post('/register',{
            username: data.username,
            email: data.email,
            password: data.password
          })
          .then(res=>{
            resolve(res);
          })
          .catch(error=>{
            reject(error)
          })
        }) 

    },
    destroyToken(context){

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;

      if(context.getters.loggedIn){
            
        return new Promise((resolve, reject) => {
          axios.post('/logout')
          .then(res=>{

            localStorage.removeItem('access_token');
            localStorage.removeItem('user_id');
            
            //encomendar la mutacion destroyToken
            context.commit('destroyToken');
            

            resolve(res);
            console.log(res);
          })
          .catch(error=>{

            localStorage.removeItem('access_token');
            context.commit('destroyToken');
            reject(error)
            console.log(error);
          })
        }) 
      }
    },
  	retrieveToken(context, credentials){
  	 
      return new Promise((resolve, reject) => {
      	axios.post('/login',{
    			username: credentials.username,
    			password: credentials.password ,
    		})
    		.then(res=>{
          const auth_data = JSON.parse(res.data.auth_data);
    			const token = auth_data.access_token;

    			localStorage.setItem('access_token',token);

    			context.commit('retrieveToken',token);
          context.commit('retrieveUserData',res.data.user_data);

          resolve(res);

    			console.log(res);
          console.log(res.data.user_data[0].id);
    		  console.log(JSON.parse(res.data.auth_data));
        })
    		.catch(error=>{
          reject(error)
    			console.log(error);
    		})
      })
  	},

    // Budgets actions
    fetchGlobalBudgets(context){
      axios.get(`/budget/getAll/${this.state.user_id}`)
       .then(res=>{
          context.commit('fetchGlobalBudgets',res.data)
       })
       .catch(err=>{
          console.log('ERROR FETCHING GLOBAL BUDGETS',err)
       })
    }, 
    fetchControls(context){
      axios.get(`/control/${this.state.user_id}`)
        .then(res=> {
          context.commit('fetchControls',res.data);
        })
        .catch(function (error) {
          // handle error
          console.log('ERROR FETCHING CONTROLS',error);
        })
    },
    fetchBudgets(context,data){
      if(data.control_id){
        return axios.get(`/budget/getAll/id/${this.state.user_id}/${data.control_id}?page=${data.currentPage}`)
         .then(res=>{
            context.commit('fetchBudgets',res.data.data)
            return res.data;
         })
         .catch(err=>{
            console.log('ERROR FETCHING BUDGETS',err)
         })
      }else{
          return axios.get(`/budget/getAll/id/${this.state.user_id}?page=${data.currentPage}`)
         .then(res=>{
            context.commit('fetchBudgets',res.data.data)
            return res.data;
         })
         .catch(err=>{
            console.log('ERROR FETCHING BUDGETS',err)
         })
      }
    },
    fetchTypes(context){
      context.commit('fetchTypes')
    },
    fetchBudgetsFromTo(context,data){
      context.commit('fetchBudgetsFromTo',data);
    },
    newBudget(context,data){

        return new Promise((resolve, reject) => {
          axios.post('/budget',{

            user_Id: data.userId,
            control_Id: data.control_Id,
            nroOrder: data.nroOrder,
            nroInvoice: data.nroInvoice,
            description: data.description,
            date: data.date,

            status: data.status,
            type: data.type,

            totalAmount: data.totalAmount,
            
            DRSE: data.descRPS,
            DEPS: data.descEPS,
          
            totalIncome: data.totalIncome
          })
          .then(res=>{
            resolve(res);
          })
          .catch(error=>{
            reject(error)
          })
        }) 

    },
    updateBudget(context,data){

        return new Promise((resolve, reject) => {
          axios.post('/budget/update',{
            id: data.id,
            user_Id: data.userId,
            nroOrder: data.nroOrder,
            nroInvoice: data.nroInvoice,
            description: data.description,
            date: data.date,

            status: data.status,
            type: data.type,

            totalAmount: data.totalAmount,
            
            DRSE: data.descRPS,
            DEPS: data.descEPS,
          
            totalIncome: data.totalIncome
          })
          .then(res=>{
            resolve(res);
          })
          .catch(error=>{
            reject(error)
          })
        }) 

    },
    // type actions

    newType(context,data){

        return new Promise((resolve, reject) => {
          axios.post('/type',{
            user_Id: data.userId,
            code: data.code,
            name: data.name
          })
          .then(res=>{
            resolve(res);
          })
          .catch(error=>{
            reject(error)
          })
        }) 

    },
    // control actions
    newControl(context,data){

        return new Promise((resolve, reject) => {
          axios.post('/control',{
            user_Id: data.userId,
            name: data.name
          })
          .then(res=>{
            resolve(res);
          })
          .catch(error=>{
            reject(error)
          })
        }) 
    }
  }
})
