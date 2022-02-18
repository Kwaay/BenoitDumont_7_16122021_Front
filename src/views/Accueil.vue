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
            <router-link :to="{ name: 'Home Dashboard' }"
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
          <div class="posts">
            <h1>{{ $t('ACCUEIL.CREATEPOST') }}</h1>
            <form @submit.prevent="submit">
              <input
                type="text"
                name="title"
                class="title-form"
                :placeholder="$t('ACCUEIL.TITLEPLACEHOLDER')"
              />
              <input
                type="text"
                class="content-form"
                :placeholder="$t('ACCUEIL.CONTENTPLACEHOLDER')"
                v-model="content"
              />
              <label for="post-image"><i class="fas fa-camera"></i></label>
              <input type="file" id="post-image" @change="tempStoreImage" />

              <input
                type="submit"
                :value="$t('ACCUEIL.BUTTONPOSTVALUE')"
                class="btn"
              />
              <p class="filename" v-if="this.media">
                {{ $t('ACCUEIL.SELECTEDIMAGE') }}
                <i class="fas fa-check-circle"></i>
              </p>
            </form>
            <div class="post" v-for="post in posts" :key="post.id">
              <div class="post-container">
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
              </div>
              <div
                class="post-actions"
                v-if="
                  userConnected.id === post.User.id || userConnected.rank === 1
                "
              >
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
</template>

<script>
import EventBus from '../EventBus';
import deleteAction from '../components/DeleteAction.vue';
import LogoWhite from '../assets/logo_white.png';
import LogoBlack from '../assets/logo_black.png';

export default {
  name: 'Accueil',
  metaInfo() {
    const title = this.$t('ACCUEIL.TITLE');
    return {
      title,
    };
  },
  components: { deleteAction },
  data() {
    return {
      userConnected: {},
      UserId: '',
      title: '',
      content: '',
      media: '',
      posts: [],
      supportedExtensions: {
        image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'],
        video: ['mp4', 'avi'],
      },
      menuDisplayed: false,
    };
  },
  created() {
    const token = localStorage.getItem('token');
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
    EventBus.$on('deleteActionPressed', this.deletePost);
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      const token = localStorage.getItem('token');
      fetch('http://localhost:3000/api/post', {
        method: 'GET',
        headers: {
          Authorization: `Bearer: ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.posts = data;
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
    submit() {
      if (this.title.length === 0) {
        return this.$vToastify.error('Title input is empty');
      }
      if (this.content.length === 0) {
        return this.$vToastify.error('Content input is empty');
      }
      const regexTitle =
        /^[A-ZÀÈÌÒÙÁÉÍÓÚÝÂÊÎÔÛÃÑÕÄËÏÖÜŸÇßØÅÆ]{1}[a-z0-9àèìòùáéíóúýâêîôûãñõäëïöüÿçøåæœ?'"! _-]{2,15}$/;
      const regexContent =
        /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'"?!., _-]{4,255}$/;
      if (!regexTitle.test(this.title)) {
        return this.$vToastify.error("Title doesn't have a correct format");
      }
      if (!regexContent.test(this.content)) {
        return this.$vToastify.error("Content doesn't have a correct format");
      }
      const token = localStorage.getItem('token');
      if (this.media) {
        const data = new FormData();
        data.append('media', this.media);
        data.append('title', this.title);
        data.append('content', this.content);
        return fetch('http://localhost:3000/api/post', {
          method: 'POST',
          headers: {
            Authorization: `Bearer: ${token}`,
          },
          body: data,
        })
          .then((response) => response.json())
          .then(() => {
            this.fetchPosts();
            return this.$vToastify.success(
              'Post has been created successfully with a media',
            );
          });
      }
      return fetch('http://localhost:3000/api/post', {
        method: 'POST',
        headers: {
          Authorization: `Bearer: ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.title,
          content: this.content,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          this.fetchPosts();
          return this.$vToastify.success(
            'Post has been created successfully without a media',
          );
        });
    },
    tempStoreImage(e) {
      const file = e.target.files[0];
      this.media = file;
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
        const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/post/${post.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer:' ${token}`,
            'Content-Type': 'application/json',
          },
        }).then(() => this.fetchPosts());
      }
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

.account img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 30px;
  border: 1px solid #2d3036;
}

.account i {
  padding-left: 1vh;
  cursor: pointer;
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

.box-posts {
  overflow: hidden;
  position: relative;
}

.posts {
  padding: 5vh;
  overflow-x: hidden;
  overflow-y: scroll;
  width: calc(100% + 20px);
  height: 100%;
  background-color: var(--app-background-color);
  border-radius: 30px;
  padding-bottom: 10vh;
  position: relative;
}

.posts h1 {
  font-size: 45px;
  color: var(--app-text-primary-color);
  text-align: left;
  margin-bottom: 0;
}

.title-form {
  max-width: 300px;
  padding-left: 2vh;
}

.content-form {
  max-width: 70%;
  padding-left: 2vh;
}

.filename {
  position: absolute;
  right: 1px;
  bottom: -1vh;
  color: var(--app-text-primary-color);
}

.filename i {
  font-size: 16px !important;
}

.btn {
  width: fit-content !important;
}

.posts form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4vh 0;
  flex-wrap: wrap;
  position: relative;
}

.posts form i {
  font-size: 48px;
}

.posts form label i {
  -webkit-text-stroke: 1px #707070;
  color: #3a3a3a;
  -webkit-text-fill-color: transparent;
  transition: all 450ms ease-in-out;
  cursor: pointer;
}

.update :hover {
  color: var(--app-text-primary-color);
  transform: scale(1.11);
}

.posts form label :hover,
.posts form label :active {
  -webkit-text-stroke: 1px var(--app-text-primary-color);
}

.posts form input {
  background-color: var(--app-input-background-color);
  border: 1px #707070 solid;
  border-radius: 30px;
  height: 42px;
  width: 100%;
  color: var(--app-text-primary-color);
}

.posts form input:focus-visible {
  outline: 1px solid var(--app-border-color);
}

.posts form input::placeholder {
  font-family: Nunito, sans-serif;
  font-size: large;
}

.post-content {
  text-align: justify;
  padding-top: 2vh;
}

.post-content h2 {
  color: var(--app-text-primary-color);
}

#post-image {
  display: none;
}

.post-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 4vh;
  top: 2vh;
  color: var(--app-text-primary-color);
}

.post {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--app-text-primary-color);
  padding: 4vh;
  border-radius: 30px;
  margin: 1vh 0;
  position: relative;
  font-size: 20px;
}

.post p {
  color: var(--app-text-primary-color);
  font-size: 20px;
}

.post p span {
  font-size: medium;
}

.post-container {
  display: inline-flex;
  align-items: center;
}

.post-container img {
  margin: 0;
  width: 85px;
  height: 85px;
  border-radius: 50%;
  object-fit: cover;
}

.align {
  display: flex;
  flex-direction: column;
  padding-left: 2vh;
}

.post-image img {
  width: 350px;
  height: 200px;
  object-fit: cover;
  margin: 0;
}

.update {
  padding: 1vh;
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

  .list-posts {
    padding-bottom: 10vh;
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
</style>
