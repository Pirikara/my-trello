<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <div class="deletelist" @click="removeList">×</div>
    </div>
  </div>
</template>

<script>
export default {
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
    listindex: {
      type: Number,
      required: true
    }
  },
  method: {
    // クリック時にremoveListが起動
    // store/index.jsに定義したremovelistアクションを呼び出す。
    removeList: function(){
      if(confirm("本当にこのリストを削除しますか？")){
        this.$store.dispatch('removeList', { listIndex: this.listIndex })
      }
    }
  },
}
</script>