<template>
  <div class="component-modify" @click="modifyUser">
    <i class="fa fa-pencil"></i>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    modifyUser() {
      this.$router.push({
        name: 'User Admin Modification',
        params: { UserId: this.data.id },
      });
    },
  },
};
</script>

<style>
.component-modify {
  width: fit-content;
  transition: all 450ms ease-in-out;
}

.component-modify :hover {
  transition: all 450ms ease-in-out;
  color: orange;
  transform: scale(1.11);
}
</style>
