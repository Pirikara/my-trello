<template>
  <div class="card">
    <button class="close-button" @click="removeCardFromList">
      ×
    </button>
    <div class="body">
      <!-- コンポーネントで定義されたデータをテンプレートにMustache構文でデータバインド -->
      {{ body }}
    </div>
  </div>
</template>

<script>
export default {
  // propsでCard.vueで使いたいデータを受け取る
  props: {
    body: {
      type: String,
      required: true
    },
    listIndex: {
      type: Number,
      required: true
    },
    cardIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    // テンプレートでククリック時にハンドルされるremoveCardFromListを定義
    // this.$store.dispatchでstore/index.jsに定義したremoveCardFromListアクションを呼び出し
    removeCardFromList() {
      if(confirm('本当にこのカードを削除しますか？')){
        this.$store.dispatch('removeCardFromList', { cardIndex: this.cardIndex, listIndex: this.listIndex })
      }
    }
  }
}
</script>