<template>
  <div>
    <header>
      my Trello
    </header>
    <main>
      <p class="info-line">All: {{ totalCardCount }} tasks</p>
      <!-- computedのlistsにバインド -->
      <draggable :list="lists"
                 class="list-index"
                 @end="movingList"
      >
        <!-- Listコンポーネントの呼び出し。必要なデータを渡している。 -->
        <!-- List.vueではここで渡された値をpropsで受け取る -->
        <!-- v-forとv-bind:keyは必ず一緒 -->
        <!-- バインドさせたコンポーネントにデータを受けわたす -->
        <!-- List.vueから来たchangeイベントをハンドルし、movingCardイベントを発火 -->
        <list v-for="(item, index) in lists"
              :key="item.id"
              :title="item.title"
              :cards="item.cards"
              :listIndex="index"
              @change="movingCard"
        />
        <list-add />
      </draggable>
    </main>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ListAdd from './ListAdd.vue' 
import List from './List'
import { mapState } from 'vuex'
// このコンポーネントを他のコンポーネントからimportして使用できるようになる
export default {
  components: {
    ListAdd,
    List,
    draggable
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
    totalCardCount() {
      // 全体のカードの総数はストアのstateで管理しているcardsの数を合計して返す
      // stateのデータから算出したものをコンポーネントで取得したい時にgettersを使用する！！
      return this.$store.getters.totalCardCount
    }
  },
  methods: {
    // changeイベントから発火したmovingCard
    // ストアのactionsを呼び出す
    movingCard: function() {
      this.$store.dispatch('updateList', { lists: this.lists })
    },
    movingList: function() {
      this.$store.dispatch('updateList', { lists: this.lists })
    }
  }
}
</script>