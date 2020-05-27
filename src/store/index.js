import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// localStorageに保存したリストを取得する
// key value方式で保存される
// getItemで設定したキーで保存したデータを取得
const savedLists = localStorage.getItem('trello-lists')

// ストアインスタンスの作成
const store = new Vuex.Store({
  state: {
    // localStrageに保存されたリストがあれば取得、なければデフォルトのリスト配列を設置
    // localStrageにはJSON形式の文字列型でデータが保存されている
    // 取得するときはJSON.parse(取得するデータ)でオブジェクトに変換する必要がある
    lists: savedLists ? JSON.parse(savedLists): [
      {
        title: 'Backlog',
        cards: [
          { body: 'English' },
          { body: 'Mathematics' },
        ]
      },
      {
        title: 'Todo',
        cards: [
          { body: 'Science' }
        ]
      },
      {
        title: 'Doing',
        cards: []
      }
    ],
  },
  mutations: {
    addlist(state, payload) {
      state.lists.push({ title: payload.title, cards: [] })
    },
  },
  actions: {
    addlist(context, payload){
      context.commit('addlist', payload)
    },
  },
  getters: {

  }
})

store.subscribe((mutation, state) => {
  // データの状態を更新後、localStorageに保存
  // localStorage.setItem('設定するキー', 文字列型のデータ) で保存
  // JSON.stringify(保存するデータ)でJSON形式に変換
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

// main.jsでインポートできるようにexport
export default store