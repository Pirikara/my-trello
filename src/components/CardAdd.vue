<template>
  <form :class="classList" @submit.prevent="addCardToList">
    <!-- 入力中しつつdataのbodyを更新-->
    <input v-model="body"
           type="text"
           class="text-input"
           placeholder="Add New Card"
           @focusin="startEditing"
           @focusout="finishEditing"
    />
    <button type="submit"
            class="add-button"
            v-if="isEditing || bodyExists"
    >
      Add
    </button>
  </form>
</template>

<script>
export default {
  // 受け取るデータを指定
  props: {
    listIndex: {
      type: Number,
      required: true
    }
  },
  data: function() {
    return {
      body: '',
      isEditing: false
    }
  },
  computed: {
    classList() {
      const classList = ['addcard']
      if (this.isEditing) {
        classList.push('active')
      }
      if (this.bodyExists) {
        classList.push('addable')
      }
      return classList
    },
    bodyExists(){
      return this.body.length > 0
    }
  },
  methods: {
    startEditing: function() {
      this.isEditing = true
    },
    finishEditing: function() {
      this.isEditing = false
    },
    addCardToList: function() {
      // dispatchで、storeのactionsに定義したaddCardToListを実行
      // addCardListメソッドで必要なlistindexをListコンポーネントから受け取る必要がある。（どのリストにカードを追加するかの情報が必要なため）
      this.$store.dispatch('addCardToList', { body: this.body, listIndex: this.listIndex })
      this.body = ''
    }
  }
}
</script>