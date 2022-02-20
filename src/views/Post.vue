<template>
  <div class="test">
    <div class="content">
      <div class="sidebar">
        <div class="icons">
          <img :src="this.getImage()" alt="Logo" />
          <div class="icon-container">
            <router-link :to="{ name: 'Accueil' }"
              ><i class="fas fa-home"></i
            ></router-link>
            <router-link :to="{ name: 'Profil', params: { UserId: UserId } }"
              ><i class="fas fa-user"></i
            ></router-link>
            <router-link :to="{ name: 'Settings' }"
              ><i class="fas fa-cog"></i
            ></router-link>
            <router-link
              v-if="userConnected.rank === 1 || userConnected.rank === 2"
              :to="{ name: 'Home Dashboard' }"
              ><i class="fas fa-tools"></i
            ></router-link>
          </div>
        </div>
        <div class="box-posts">
          <div class="up">
            <div class="account">
              <img :src="userConnected.avatar" :alt="$t('ALTIMAGEPROFILE')" />
              <i
                @click="toggleLogout()"
                v-if="this.menuDisplayed === false"
                class="fas fa-sort-down"
              ></i>
              <i @click="toggleLogout()" v-else class="fas fa-sort-up"></i>
            </div>
            <transition name="logout">
              <div class="logout" v-if="this.menuDisplayed === true">
                <p @click="logout()">
                  <i class="fas fa-sign-out-alt"></i>{{ $t('LOGOUT') }}
                </p>
              </div>
            </transition>
          </div>
          <div class="page">
            <div class="post">
              <div class="post-container">
                <div class="post-title">
                  <img :src="post.User.avatar" :alt="$t('ALTIMAGEPROFILE')" />
                  <div class="align">
                    <p>
                      {{ post.User.name }} {{ post.User.firstname }} <br />
                      {{ formatDate(post.createdAt) }}
                    </p>
                  </div>
                </div>
                <div class="post-content">
                  <h2>{{ post.title }}</h2>
                  <p>
                    {{ post.content }}
                  </p>
                </div>
                <div
                  class="post-image"
                  v-if="post.media && isImage(post.media)"
                >
                  <img :src="post.media" :alt="$t('ALTMEDIA')" />
                </div>
                <div
                  class="post-video"
                  v-if="post.media && isVideo(post.media)"
                >
                  <video controls width="350" height="200">
                    <source :src="post.media" type="video/mp4" />
                  </video>
                </div>
                <div
                  class="post-actions"
                  v-if="
                    userConnected.id === post.User.id ||
                    userConnected.rank === 1 ||
                    userConnected.rank === 2
                  "
                >
                  <div class="update" @click="updatePost(post)">
                    <i class="fa fa-pencil"></i>
                  </div>
                  <deleteAction :data="post" />
                </div>
                <div class="reactions"></div>
              </div>
            </div>
            <ul class="comments" v-if="post.Comments">
              <li
                class="comment"
                v-for="comment in post.Comments"
                :key="comment.id"
              >
                <div class="comment-title">
                  <img :src="comment.User.avatar" />
                  <p>
                    {{ comment.User.name }} {{ comment.User.firstname }} <br />
                    {{ formatDate(comment.createdAt) }}
                  </p>
                </div>
                <p class="commentContent">{{ comment.content }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import deleteAction from '../components/DeleteAction.vue';
import LogoBlack from '../assets/logo_black.png';
import LogoWhite from '../assets/logo_white.png';

export default {
  name: 'Accueil',
  components: {
    deleteAction,
  },
  metaInfo() {
    const title = this.$t('POSTEDIT.TITLE');
    return {
      title,
    };
  },
  data() {
    return {
      post: {},
      supportedExtensions: {
        image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'],
        video: ['mp4', 'avi'],
      },
      userConnected: {},
      menuDisplayed: false,
      UserId: '',
    };
  },
  methods: {
    fetchPostData() {
      const { token } = JSON.parse(localStorage.getItem('token'));
      fetch(`http://localhost:3000/api/post/${this.$route.params.PostId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer: ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.post = data;
        })
        .catch((error) => {
          return this.$vToastify.error(`An error occurred: ${error}`);
        });
    },
    isImage(media) {
      if (
        this.supportedExtensions.image.includes(media.split('.').slice(-1)[0])
      ) {
        return true;
      }
      return false;
    },
    isVideo(media) {
      if (
        this.supportedExtensions.video.includes(media.split('.').slice(-1)[0])
      ) {
        return true;
      }
      return false;
    },
    getImage() {
      const theme = localStorage.getItem('theme');
      if (theme === 'light') {
        return LogoBlack;
      }
      return LogoWhite;
    },
    toggleLogout() {
      this.menuDisplayed = !this.menuDisplayed;
    },
  },
  created() {
    const { token } = JSON.parse(localStorage.getItem('token'));
    fetch('http://localhost:3000/api/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.userConnected = data.user;
        this.UserId = data.user.id;
      })
      .catch((error) => {
        return this.$vToastify.error(`An error occurred: ${error}`);
      });
  },
  mounted() {
    this.fetchPostData();
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

.sidebar {
  background-color: var(--app-sidebar-color);
  height: 100vh;
  display: inline-flex;
  z-index: 99999;
  width: 100%;
}

.icons {
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  transition: color 450ms ease-in-out;
  height: 70%;
}

.icons img {
  margin: 2vh;
  width: 85px;
  height: 85px;
  object-fit: cover;
}

.icons i {
  font-size: 32px;
  padding: 1vh;
}

.icons a {
  transition: color 450ms ease-in-out;
  color: var(--app-text-primary-color);

  &:hover {
    opacity: 0.8;
  }
}

.icon-container {
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  transition: color 450ms ease-in-out;
  height: 70%;
}

.up {
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  padding-right: 4vh;
  position: relative;
}

.account {
  display: inline-flex;
  align-items: center;
  color: var(--app-text-primary-color);
  padding: 2vh;
}

.account i {
  padding-left: 1vh;
  cursor: pointer;
}

.account img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 30px;
  border: 1px solid #2d3036;
}

.post-title {
  display: flex;
  align-items: center;
  padding-bottom: 2vh;
}

.align {
  display: inline-flex;
  flex-direction: column;
  padding-left: 2vh;
}

.align p {
  font-size: large;
}

.logout {
  height: 5vh;
  padding: 1.5vh;
  position: absolute;
  bottom: 0;
  background: var(--app-background-color);
  z-index: 99999;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  transform: translateY(100%);
  cursor: pointer;
}

.logout i {
  padding: 0.5vh;
}

.logout p {
  color: var(--app-text-primary-color);
}

.logout-enter {
  opacity: 0.5;
}

.logout-enter-active {
  opacity: 1;
}

.box-posts {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.page {
  background: var(--app-background-color);
  height: 100%;
  border-top-left-radius: 30px;
  display: flex;
}

.post {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: solid 2vh var(--app-sidebar-color);
  height: 100%;
}

.post-container {
  color: var(--app-text-primary-color);
  padding: 5vh;
  height: 100%;
  position: relative;
}

.post-container img {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  object-fit: cover;
}

.post-content p {
  font-size: large;
}

.post-image img {
  width: 800px;
  height: 400px;
  object-fit: cover;
  border-radius: 0;
  margin: 0;
}

.post-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 5vh;
  top: 5vh;
  color: var(--app-text-primary-color);
}

.comments {
  padding: 2vh;
  overflow-y: scroll;
  height: 100%;
  padding-bottom: 10vh;
  overflow-x: hidden;
}

.comment-container h1 {
  color: var(--app-text-primary-color);
  padding: 2vh;
}

.comment {
  color: var(--app-text-primary-color);
  padding: 2vh;
  border: 1px solid var(--app-border-color);
  margin: 2vh;
  border-radius: 30px;
  list-style-type: none;
}

.comment img {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  object-fit: cover;
}

.update {
  padding: 1vh;
}

.comment-title {
  display: flex;
  align-items: center;
  padding-bottom: 4vh;
}

.comment-title p {
  padding-left: 2vh;
  font-size: large;
}

@media (max-width: 700px) {
  .sidebar {
    display: initial;
  }

  .box-posts {
    position: initial;
  }

  .icons {
    height: initial;
  }

  .icon-container {
    flex-direction: row;
    position: fixed;
    bottom: 0;
    height: initial;
    width: 100%;
    left: 0;
    right: 0;
    padding: 2vh;
    background: var(--app-sidebar-color);
    z-index: 9999;
    margin-top: 5vh;
  }

  .up {
    position: absolute;
    top: 3vh;
    right: 2vh;
    padding-right: 0;
  }

  .logout {
    height: 8vh;
    padding: 0.5vh;
    width: 100%;
    text-align: center;
  }
}
</style>
