<template>
  <div class="test">
    <div class="content">
      <div class="side">
        <div class="side-container">
          <router-link :to="{ name: 'Accueil' }">
            <img :src="this.getImage()" alt="Logo Groupomania" />
          </router-link>
          <div class="icons">
            <router-link :to="{ name: 'Home Dashboard' }">
              <p>
                <i class="fas fa-home"></i>{{ $t('DASHBOARD.LISTDASHBOARD') }}
              </p>
            </router-link>
            <br />
            <router-link :to="{ name: 'User Dashboard' }">
              <p><i class="fas fa-user"></i>{{ $t('DASHBOARD.LISTUSER') }}</p>
            </router-link>
            <br />
            <router-link :to="{ name: 'Post Dashboard' }">
              <p>
                <i class="fas fa-comment-alt"></i>{{ $t('DASHBOARD.LISTPOST') }}
              </p>
            </router-link>
            <br />
            <router-link :to="{ name: 'Comment Dashboard' }">
              <p>
                <i class="fas fa-comment"></i>{{ $t('DASHBOARD.LISTCOMMENT') }}
              </p>
            </router-link>
            <br />
            <router-link :to="{ name: 'Token Dashboard' }">
              <p>
                <i class="fas fa-ticket-alt"></i>{{ $t('DASHBOARD.LISTTOKEN') }}
              </p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="middle-container">
          <h2>{{ $t('DASHBOARDHOME.TITLE') }}</h2>
          <div class="data">
            <div class="data-nb-users">
              <div class="data-container">
                <h3>{{ $t('DASHBOARDHOME.NBUSERS') }}</h3>
                <span>{{ this.nbUsers }}</span>
              </div>
            </div>
            <div class="data-nb-posts">
              <div class="data-container">
                <h3>{{ $t('DASHBOARDHOME.NBPOSTS') }}</h3>
                <span>{{ this.nbPosts }}</span>
              </div>
            </div>
            <div class="data-nb-reactions">
              <div class="data-container">
                <h3>{{ $t('DASHBOARDHOME.NBREACTS') }}</h3>
                <span>{{ this.nbReactions }}</span>
              </div>
            </div>
            <div class="data-nb-commentaires">
              <div class="data-container">
                <h3>{{ $t('DASHBOARDHOME.NBCOM') }}</h3>
                <span>{{ this.nbComments }}</span>
              </div>
            </div>
          </div>
          <div class="package-info">
            <AvailableUpdate stack="back" />
            <AvailableUpdate stack="front" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AvailableUpdate from '../components/AvailableUpdate.vue';
import LogoWhite from '../assets/logo_full_white.png';
import LogoBlack from '../assets/logo_full_black.png';

export default {
  components: { AvailableUpdate },
  data() {
    return {
      nbUsers: '0',
      nbPosts: '0',
      nbReactions: '0',
      nbComments: '0',
    };
  },
  async created() {
    this.getUsersCount();
    this.getPostsCount();
    this.getReactionsCount();
    this.getCommentsCount();
  },
  methods: {
    getUsersCount() {
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
    },
    getPostsCount() {
      const token = localStorage.getItem('token');
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
    },
    getReactionsCount() {
      const token = localStorage.getItem('token');
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
    },
    getCommentsCount() {
      const token = localStorage.getItem('token');
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
    getImage() {
      const theme = localStorage.getItem('theme');
      if (theme === 'light') {
        return LogoBlack;
      }
      return LogoWhite;
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  background-color: var(--app-background-color);
  display: flex;
}

.content-container {
  display: flex;
  justify-content: space-between;
  background-color: var(--app-background-color);
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
  background-color: var(--app-sidebar-color);
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
  color: var(--app-text-primary-color) !important;

  &:hover {
    opacity: 0.8;
  }
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
  width: 100%;
  color: var(--app-text-sidebar-color) !important;
}

.middle-container h2 {
  padding: 5vh 0 0 5vh;
  color: var(--app-text-primary-color);
}

.data {
  display: flex;
  justify-content: space-between;
  padding-top: 2vh;
  flex-wrap: wrap;
  margin: 0 5vh;
}

.data-nb-users,
.data-nb-posts,
.data-nb-reactions,
.data-nb-commentaires {
  padding: 2vh;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--app-input-background-color);
  color: var(--app-text-primary-color);
  border-radius: 10px;
  min-width: 300px;
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

.package-info {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  padding-top: 4vh;
}
</style>
