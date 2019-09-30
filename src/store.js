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
    budgets: [],
    globalTotal: 0,
    user_id: localStorage.getItem('user_id') || null,
    types: 'nah'
  },
  mutations: {
  	// we cannot update the state directly 
  	// we need to use mutations to refresh our state
  	retrieveToken(state,token){
  		state.token = token
  	},
    destroyToken(state){
      state.token = null 
    },
    fetchBudgets(state){
      axios.get(`/budget/getAll/id/${state.user_id}`)
       .then(res=>{
          state.globalBudgets = res.data;
          state.budgets = res.data;
       })
       .catch(err=>{
          console.log('ERROR FETCHING BUDGETS',err)
       })
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
    }
  },
  actions: {

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
    fetchBudgets(context){
      context.commit('fetchBudgets')
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

    }
  }
})
