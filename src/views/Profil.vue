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
            <router-link :to="{ name: 'Profil' }"
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
                <p><i class="fas fa-sign-out-alt"></i>{{ $t('LOGOUT') }}</p>
              </div>
            </transition>
          </div>
          <div class="profile">
            <div class="profile-container">
              <div class="infos">
                <img :src="userConnected.avatar" :alt="$t('ALTIMAGEPROFILE')" />
                <h1>{{ userConnected.name }} {{ userConnected.firstname }}</h1>
                <h2>{{ $t('PROFIL.LATESTPOSTS') }}</h2>
              </div>
              <div class="latest-posts">
                <div class="list-posts">
                  <div class="post" v-for="post in posts" :key="post.id">
                    <div class="post-title">
                      <h2>{{ post.title }}</h2>
                      <p>{{ formatDate(post.createdAt) }}</p>
                    </div>
                    <div class="post-content">
                      {{ post.content }}
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
                      <div class="post-actions">
                        <div class="update" @click="updatePost(post)">
                          <i class="fa fa-pencil"></i>
                        </div>
                        <deleteAction :data="post" />
                      </div>
                    </div>
                  </div>
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
import EventBus from '../EventBus';
import deleteAction from '../components/DeleteAction.vue';
import LogoWhite from '../assets/logo_white.png';
import LogoBlack from '../assets/logo_black.png';

export default {
  metaInfo() {
    const title = this.$t('PROFIL.TITLE');
    return {
      title,
    };
  },
  components: { deleteAction },
  data() {
    return {
      userConnected: {},
      user: {},
      posts: [],
      supportedExtensions: {
        image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'],
        video: ['mp4', 'avi'],
      },
      menuDisplayed: false,
    };
  },
  mounted() {
    EventBus.$on('deleteActionPressed', this.deletePost);
    const { token } = JSON.parse(localStorage.getItem('token'));
    fetch('http://localhost:3000/api/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.userConnected = data.user;
      })
      .catch((error) => {
        this.error = error;
      });
    this.getPosts();
  },
  methods: {
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
    updatePost(post) {
      this.$router.push({
        name: 'Post Admin Modification',
        params: { PostId: post.id },
      });
    },
    deletePost(post) {
      // eslint-disable-next-line no-alert
      const validation = window.confirm(
        'Are you sure you want to delete this post ?',
      );
      if (validation === true) {
        const { token } = JSON.parse(localStorage.getItem('token'));
        fetch(`http://localhost:3000/api/post/${post.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer:' ${token}`,
            'Content-Type': 'application/json',
          },
        }).then(() => this.getPosts());
      }
    },
    getPosts() {
      const { token } = JSON.parse(localStorage.getItem('token'));
      if (
        typeof this.$route.params.UserId !== 'number' ||
        this.$route.params.UserId < 1
      )
        return;
      fetch(`http://localhost:3000/api/user/${this.$route.params.UserId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.user = data;
          this.posts = data.Posts;
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
    toggleLogout() {
      this.menuDisplayed = !this.menuDisplayed;
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

.sidebar {
  background-color: var(--app-sidebar-color);
  display: inline-flex;
  z-index: 99999;
  width: 100%;
  height: 100vh;
}

.icons {
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  transition: color 450ms ease-in-out;
  height: 70%;
}

.icon-container {
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  transition: color 450ms ease-in-out;
  height: 70%;
}

.icons i {
  font-size: 32px;
  padding: 1vh;
}

.icons a {
  transition: color 450ms ease-in-out;
  color: var(--app-text-primary-color) !important;

  &:hover {
    opacity: 0.8;
  }
}

.icons img {
  margin: 2vh;
  width: 85px;
  height: 85px;
  object-fit: cover;
}

.box-posts {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.up {
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  padding-right: 4vh;
  position: relative;
}

.post-title {
  text-align: left;
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

.logout {
  height: 5vh;
  padding: 1.5vh;
  position: absolute;
  bottom: 0;
  background: var(--app-text-primary-color);
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
  color: var(--app-background-color);
}

.logout-enter {
  opacity: 0.5;
}

.logout-enter-active {
  opacity: 1;
}

.profile {
  padding: 0 3vh;
  overflow-x: hidden;
  overflow-y: scroll;
  width: calc(100% + 20px);
  height: 100%;
  background-color: var(--app-background-color);
  border-radius: 30px;
  padding-bottom: 10vh;
  color: var(--app-text-primary-color);
  border-top-left-radius: 30px;
}

.infos {
  text-align: center;
}

.infos h1 {
  padding-top: 2vh;
}

.infos img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid var(--app-text-primary-color);
  object-fit: cover;
}

.profile-container {
  padding: 2vh;
}

.latest-posts {
  text-align: center;
}

.list-posts {
  border-radius: 30px;
  margin: 0 auto;
}

.post {
  border: 1px solid var(--app-text-primary-color);
  border-radius: 30px;
  margin: 4vh;
  padding: 4vh;
  position: relative;
  font-size: 20px;
}

.post-content {
  text-align: left;
}

.post-image img {
  width: 350px;
  height: 200px;
  object-fit: cover;
  padding-top: 2vh;
}

.post-video {
  padding-top: 2vh;
}

.post-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 4vh;
  top: 2vh;
}

.update {
  padding: 1vh;
  transition: all 450ms ease-in-out;
}

.update :hover {
  color: var(--app-text-primary-color);
  transform: scale(1.11);
}

@media (max-width: 700px) {
  .sidebar {
    display: initial;
    height: initial;
  }

  .box-posts {
    position: initial;
    padding-bottom: 10vh;
  }

  .icon {
    height: 0;
  }

  .icons {
    height: initial;
  }

  .logout {
    height: 8vh;
    padding: 0.5vh;
    width: 100%;
    text-align: center;
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
    top: 2vh;
    right: 2vh;
    padding-right: 0;
  }

  .post {
    padding: 2vh;
  }

  .align {
    text-align: center;
  }

  .posts {
    margin-bottom: 0;
    height: initial;
    padding: 2vh 2.5vh;
    width: initial;
  }

  .posts h1 {
    text-align: center;
  }

  .posts form {
    flex-direction: column;
    gap: 20px;
  }

  .post-container {
    flex-direction: column;
  }

  .post-content {
    padding-top: 0;
    padding-bottom: 4vh;
  }

  .post-image img {
    width: 100%;
    height: 100%;
    padding-top: 2vh;
  }

  .post-video video {
    width: 100%;
    height: 100%;
  }

  .post-actions {
    justify-content: center;
    right: 0;
    left: 0;
    bottom: 0;
    top: initial;
  }
}

@media (max-width: 700px) {
  .sidebar {
    display: initial;
    height: initial;
  }

  .box-posts {
    position: initial;
    padding-bottom: 10vh;
  }

  .icon {
    height: 0;
  }

  .icons {
    height: initial;
  }

  .logout {
    height: 8vh;
    padding: 0.5vh;
    width: 100%;
    text-align: center;
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

  .profile {
    padding: 0;
    border-radius: 0;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    width: initial;
  }

  .up {
    position: absolute;
    top: 2vh;
    right: 2vh;
    padding-right: 0;
  }

  .post {
    padding: 2vh;
    margin: 2vh;
  }

  .align {
    text-align: center;
  }

  .posts {
    margin-bottom: 0;
    height: initial;
    padding: 2vh 2.5vh;
    width: initial;
  }

  .posts h1 {
    text-align: center;
  }

  .posts form {
    flex-direction: column;
    gap: 20px;
  }

  .post-title {
    text-align: center;
  }

  .post-container {
    flex-direction: column;
  }

  .post-content {
    padding-top: 0;
    padding-bottom: 4vh;
  }

  .post-image img {
    width: 100%;
    height: 100%;
    padding-top: 2vh;
  }

  .post-video video {
    width: 100%;
    height: 100%;
  }

  .post-actions {
    justify-content: center;
    right: 0;
    left: 0;
    bottom: 0;
    top: initial;
  }
}
</style>
