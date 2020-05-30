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
    // actionsから受け取ったリストのインデックスを使ってspliceでリストを削除
    removelist(state, payload) {
      state.lists.splice(payload.listIndex, 1)
    },
    addCardToList(state, payload) {
      state.lists[payload.listIndex].cards.push({ body: payload.body })
    },
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1)
    }
  },
  actions: {
    // mutationsのaddlistメソッドをcommitで実行
    addlist(context, payload){
      context.commit('addlist', payload)
    },
    // mutationsのremovelistメソッドをcommitで実行
    removelist(context, payload){
      context.commit('removelist', payload)
    },
    // mutationsのaddCardToListメソッドをcommitで実行
    addCardToList(context, payload) {
      context.commit('addCardToList', payload)
    },
    removeCardFromList(context, payload) {
      context.commit('removeCardFromList', payload)
    }
  },
  getters: {
    // gettersは第一引数にstate, 第二引数に他のgettersを受け取ることができる
    // 他のgettersで算出したものからさらに算出したいと言う実装もできる

    totalCardCount(state) {
      let count = 0
      // 全体のカードの枚数を返す実装
      // listsの一つ一つがcontentとなり、それぞれのcardsの枚数をcountに足していく
      state.lists.map(content => count += content.cards.length)
      return count
    }
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