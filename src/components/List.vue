<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <p class="list-counter">total: {{ totalCardInList }}</p>
      <div class="deletelist" @click="removeList">×</div>
    </div>
    <!-- Cardコンポーネント を呼び出し、Cardコンポーネントに必要なデータをバインディングで渡す -->
    <!-- cardsデータをList.vueは持っていないので、Boaed.vueからpropsで受け取る -->
    <card v-for="(item, index) in cards"
          :body="item.body"
          :key="item.id"
          :cardIndex="index"
          :listIndex="listIndex"
    />
    <!-- listIndexをCardAddに渡す -->
    <card-add :listIndex="listIndex" />
  </div>
</template>

<script>
import CardAdd from './CardAdd'
import Card from './Card'

export default {
  // 使用するコンポーネント を記述
  components: {
    CardAdd,
    Card
  },
  // propsプロパティ
  // propsには親から受け取るデータを定義
  // 受け取ったデータはdataと同じようにアクセスできる
  // propsで定義したデータはdataで定義するとエラーになる
  // 受け取るときのデータ型や必ず受け取ることなどルールを指定できる
  props: {
    title: {
      type: String,
      required: true
    },
    cards: {
      type: Array,
      required: true
    },
    listIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalCardInList() {
      return this.cards.length 
    }
  },
  methods: {
    // クリック時にremoveListが起動
    // store/index.jsに定義したremovelistアクションを呼び出す。
    removeList: function(){
      if(confirm("本当にこのリストを削除しますか？")){
        this.$store.dispatch('removelist', { listIndex: this.listIndex })
      }
    }
  },
}
</script>