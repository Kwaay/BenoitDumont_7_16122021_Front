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
            <router-link :to="{ name: 'Token Dashboard' }">
              <p><i class="fas fa-ticket-alt"></i>Tokens</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="middle-container">
          <h2>Dashboard</h2>
          <div class="data">
            <div class="data-nb-users">
              <div class="data-container">
                <h3>Nombre d'utilisateurs inscrits</h3>
                <span>{{ this.nbUsers }}</span>
              </div>
            </div>
            <div class="data-nb-posts">
              <div class="data-container">
                <h3>Nombre de posts</h3>
                <span>{{ this.nbPosts }}</span>
              </div>
            </div>
            <div class="data-nb-reactions">
              <div class="data-container">
                <h3>Nombre de réactions</h3>
                <span>{{ this.nbReactions }}</span>
              </div>
            </div>
            <div class="data-nb-commentaires">
              <div class="data-container">
                <h3>Nombre de commentaires</h3>
                <span>{{ this.nbComments }}</span>
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
      nbUsers: '0',
      nbPosts: '0',
      nbReactions: '0',
      nbComments: '0',
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
        this.nbUsers = data.length;
      })
      .catch((error) => {
        this.error = error;
      });
    fetch('http://localhost:3000/api/post/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer' ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.nbPosts = data.length;
      })
      .catch((error) => {
        this.error = error;
      });

    fetch('http://localhost:3000/api/reaction/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer' ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.nbReactions = data.length;
      })
      .catch((error) => {
        this.error = error;
      });

    fetch('http://localhost:3000/api/comment/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer' ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.nbComments = data.length;
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
  color: white;
}

.data {
  display: flex;
  justify-content: space-between;
  padding-top: 2vh;
  flex-wrap: wrap;
}

.data-nb-users,
.data-nb-posts,
.data-nb-reactions,
.data-nb-commentaires {
  margin: 2vh 5vh;
  padding: 2vh;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  background-color: #3a3a3a;
  color: white;
  border-radius: 10px;
  min-width: 320px;
}

.data-nb-users span,
.data-nb-posts span,
.data-nb-reactions span,
.data-nb-commentaires span {
  font-size: x-large;
}

.data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.data-container h3 {
  font-size: large;
}
</style>
