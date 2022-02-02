<template>
  <div class="component-delete" @click="deleteAction">
    <i class="fa fa-trash-o"></i>
  </div>
</template>

<script>
import EventBus from '../EventBus';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteAction() {
      EventBus.$emit('deleteActionPressed', this.data);
      /* if (this.$router.currentRoute.path.includes('user')) {
        const validation = window.confirm(
          'Are you sure you want to delete this user ?',
        );
        if (validation === true) {
          const token = localStorage.getItem('token');
          fetch(`http://localhost:3000/api/user/${this.data.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer:' ${token}`,
              'Content-Type': 'application/json',
            },
          });
          return true;
        }
      }
      return false; */
    },
  },
};
</script>

<style>
.component-delete {
  width: fit-content;
  transition: all 450ms ease-in-out;
}

.component-delete :hover {
  transition: all 450ms ease-in-out;
  color: red;
  transform: scale(1.11);
}
</style>
