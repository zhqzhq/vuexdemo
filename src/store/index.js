import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list:[],
    inputvalue:'zhq',
    nextid:5,
    view:'all',
  },
  mutations: {
    setList(state,list){
      state.list=list
    },
    setInputvalue(state,value){
      state.inputvalue=value
    },
    additem(state){
      var obj={
        id:state.nextid,
        info:state.inputvalue,
        done:false
      }
      state.list.push(obj);
      state.nexid++;
      state.inputvalue=""
    },
    removeitems (state,id){
      const i = state.list.findIndex(x => x.id===id  )
      if(i!==-1){
        state.list.splice(i,1)
      }
    },
    setck(state,param){
      const i = state.list.findIndex(x => x.id===param.id);
      if(i !== -1){
        state.list[i].done=param.status
        
      }
    },
    cleanitem(state){
      state.list=state.list.filter(x=>x.done===false)

    },
    viewchange(state,key){
      state.view=key

    }

  },
  actions: {
    getList(context){
      axios.get("/list.json").then(({data})=>{
        context.commit('setList',data);
      })
    }
  },
  modules: {},
  getters:{
    undoneitem(state){
      return state.list.filter(x=> x.done===false).length
    },
    todolist(state){
      if(state.view==='undone'){
         return state.list.filter(x=>x.done===false)
      }
      if(state.view==="done"){
         return state.list.filter(x=>x.done===true)
      }
      if(state.view==="all"){
        return state.list
      }
    }
  }
});
