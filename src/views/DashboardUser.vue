<template>
  <div class="test">
    <div class="content">
      <div class="side">
        <div class="side-container">
          <img src="../assets/logo_full_white.png" alt="Logo Groupomania" />
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
            <router-link :to="{ name: 'Token Dashboard' }">
              <p><i class="fas fa-ticket-alt"></i>Tokens</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="middle-container">
          <h2>User Dashboard</h2>
          <div class="list-users">
            <div class="user" v-for="user in users" :key="user.id">
              <img :src="user.avatar" alt="Image for this User" />
              <div class="user-infos">
                <h3>{{ user.name }} {{ user.firstname }}</h3>
                <p>( {{ user.username }} )</p>
              </div>
              <div class="user-actions">
                <div class="update">
                  <i class="fa fa-pencil"></i>
                </div>
                <div class="delete">
                  <i class="fa fa-trash"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
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
  methods: {},
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
  padding: 2vh 4vh;
  color: white;
}

.user {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  color: white;
  border: 1px solid white;
  margin: 2vh 4vh;
  border-radius: 30px;
  max-width: 500px;
}

.user img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  margin: 2vh 2vh 0;
  border-radius: 50%;
}

.user-infos {
  padding: 1vh;
}

.user-infos p {
  text-align: center;
}

.user-actions {
  display: flex;
  align-items: center;
  width: 100%;
  transition: all 450ms ease-in-out;
}

.update,
.delete {
  padding: 0.5vh;
  border: 1px solid white;
  width: 100%;
  text-align: center;
  transition: all 450ms ease-in-out;
}

.update {
  border-bottom-left-radius: 30px;
}

.update :hover {
  transition: all 450ms ease-in-out;
  transform: scale(1.11);
  color: yellow;
}

.delete {
  border-bottom-right-radius: 30px;
}

.delete :hover {
  transition: all 450ms ease-in-out;
  transform: scale(1.11);
  color: red;
}
</style>
