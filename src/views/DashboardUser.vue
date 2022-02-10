<template>
  <div class="test">
    <div class="content">
      <div class="side">
        <div class="side-container">
          <router-link :to="{ name: 'Accueil' }">
            <p>
              <img src="../assets/logo_full_white.png" alt="Logo Groupomania" />
            </p>
          </router-link>
          <div class="icons">
            <router-link :to="{ name: 'Home Dashboard' }">
              <p><i class="fas fa-home"></i>Dashboard</p>
            </router-link>
            <br />
            <router-link :to="{ name: 'User Dashboard' }">
              <p><i class="fas fa-user"></i>Utilisateurs</p>
            </router-link>
            <br />
            <router-link :to="{ name: 'Post Dashboard' }">
              <p><i class="fas fa-comment-alt"></i>Posts</p>
            </router-link>
            <br />
            <router-link :to="{ name: 'Comment Dashboard' }">
              <p><i class="fas fa-comment"></i>Comments</p>
            </router-link>
            <br />
            <router-link :to="{ name: 'Token Dashboard' }">
              <p><i class="fas fa-ticket-alt"></i>Tokens</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="middle-container">
          <h2>User Dashboard</h2>
          <data-table :columns="columns" :data="userReturned" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../EventBus';
import modifyActionAdmin from '../components/ModifyActionAdmin.vue';
import deleteActionAdmin from '../components/DeleteAction.vue';

export default {
  data() {
    return {
      users: [],
      columns: [
        {
          key: 'id',
          title: 'Id',
          type: 'number',
        },
        {
          key: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          key: 'firstname',
          title: 'Firstname',
          type: 'string',
        },
        {
          key: 'username',
          title: 'Username',
          type: 'string',
        },
        {
          key: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          key: 'createdAt',
          title: 'Created At',
          type: 'string',
        },
        {
          key: 'updatedAt',
          title: 'Updated At',
          type: 'string',
        },
        {
          title: 'Modify',
          component: modifyActionAdmin,
          sortable: false,
          searchable: false,
        },
        {
          title: 'Delete',
          component: deleteActionAdmin,
          sortable: false,
          searchable: false,
        },
      ],
    };
  },
  computed: {
    userReturned() {
      return this.users.map((user) => {
        const parsedCreatedAt = new Date(user.createdAt).toLocaleString();
        const parsedUpdatedAt = new Date(user.updatedAt).toLocaleString();
        const userModified = {
          ...user,
          updatedAt: parsedUpdatedAt,
          createdAt: parsedCreatedAt,
        };
        return userModified;
      });
    },
  },
  methods: {
    listenEventBus() {
      EventBus.$on('deleteActionPressed', this.deleteUser);
      EventBus.$on('modifyActionPressed', this.modifyUser);
    },
    getUsers() {
      const token = localStorage.getItem('token');
      fetch('http://localhost:3000/api/user/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer:' ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.users = data;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    modifyUser(userData) {
      this.$router.push({
        name: 'User Admin Modification',
        params: { UserId: userData.id },
      });
    },
    deleteUser(userData) {
      const validation = window.confirm(
        'Are you sure you want to delete this user ?',
      );
      if (validation === true) {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/user/${userData.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer:' ${token}`,
            'Content-Type': 'application/json',
          },
        }).then(() => this.getUsers());
      }
    },
  },
  created() {
    this.listenEventBus();
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style scoped>
.content {
  background-color: #22262b;
  display: flex;
}

.content-container {
  display: flex;
  justify-content: space-between;
  background-color: #2d3036;
  padding-top: 5vh;
}

.side {
  height: 100vh;
  flex-shrink: 2;
}

.side-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.side-container img {
  width: 175px;
  height: 75px;
  object-fit: cover;
  margin: 3vh;
}

.icons {
  display: inline-flex;
  flex-direction: column;
}

.icons a {
  text-decoration: none;
}

.icons a i {
  margin: 1vh;
  font-size: 24px;
}

.icons p {
  font-size: 16px;
  display: flex;
  align-items: center;
}

.middle {
  background-color: #2d3036;
  width: 100%;
}

.middle-container h2 {
  padding: 5vh 0 0 5vh;
  color: white;
}

.list-users {
  display: flex;
  height: 100%;
  flex-wrap: wrap;
}

.user {
  color: white;
  border: 1px solid white;
  margin: 2vh 4vh;
  border-radius: 30px;
  max-width: 150px;
  max-height: 300px;
  text-align: center;
}

.user img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  margin: 1vh;
  border-radius: 20px;
}

.user-content {
  text-align: center;
}

.user-actions {
  display: inline-flex;
  margin: 1vh;
}

.update,
.delete {
  padding: 1vh;
  width: 100%;
  text-align: center;
  transition: all 450ms ease-in-out;
}

.update {
  border-top-right-radius: 20px;
}

.update :hover {
  transition: all 450ms ease-in-out;
  transform: scale(1.11);
  color: yellow;
}

.delete {
  border-bottom-right-radius: 20px;
}

.delete :hover {
  transition: all 450ms ease-in-out;
  transform: scale(1.11);
  color: red;
}
</style>
