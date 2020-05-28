<template>
  <div>
    <header>
      my Trello
    </header>
    <main>
      <p class="info-line">All: 0 tasks</p>
      <div class="list-index">
        <!-- Listコンポーネントの呼び出し。必要なデータを渡している。 -->
        <!-- List.vueではここで渡された値をpropsで受け取る -->
        <!-- v-forとv-bind:keyは必ず一緒 -->
        <!-- バインドさせたコンポーネントにデータを受けわたす -->
        <list v-for="(item, index) in lists"
              :key="item.id"
              :title="item.title"
              :listIndex="index"
         />
        <list-add />
      </div>
    </main>
  </div>
</template>

<script>
import ListAdd from './ListAdd.vue' 
import List from './List'
import { mapState } from 'vuex'
// このコンポーネントを他のコンポーネントからimportして使用できるようになる
export default {
  components: {
    ListAdd,
    List
  },
  computed: {
    // stateのリストデータlistsを取得
    // stateをそのまま取得するので、mapStateヘルパーを使用
    // mapStateを使うと、stateで定義されたデータの名前と同じ名前の文字列でstateを呼び出せる。this.$store.stateって書かなくてもいい。
    // オブジェクトスプレッド演算子(...)を使用しているのは、computedのローカルのオブジェクトと一緒に定義できるようにするため。
    // mapStateにはオブジェクトスプレッド演算子を使わないと、ネストされたオブジェクトを返してしまうためにcomputedで参照できなくなってしまう。
    // computedにストアのstateからのデータと、ローカルでの算出データの両方を記述する時にこんな書き方をする
    ...mapState([
      'lists'
    ]),
  }
}
</script>