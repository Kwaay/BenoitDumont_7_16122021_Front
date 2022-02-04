<template>
  <div class="test">
    <div class="content">
      <div class="sidebar">
        <div class="icons">
          <img src="../assets/logo_white.png" alt="Logo White" />
          <router-link :to="{ name: 'Accueil' }"
            ><i class="fas fa-home"></i
          ></router-link>
          <router-link :to="{ name: 'Profil', params: { UserId: this.UserId } }"
            ><i class="fas fa-user"></i
          ></router-link>
          <router-link :to="{ name: 'Settings' }"
            ><i class="fas fa-cog"></i
          ></router-link>
          <router-link :to="{ name: 'Home Dashboard' }"
            ><i class="fas fa-tools"></i
          ></router-link>
        </div>
        <div class="box-posts">
          <div class="up">
            <div class="account">
              <img :src="userConnected.avatar" alt="Profile Image" />
              <i class="fas fa-sort-down"></i>
            </div>
          </div>
          <div class="posts">
            <h1>Créer un post</h1>
            <form @submit.prevent="submit">
              <input
                type="text"
                name="title"
                class="title-form"
                placeholder="Titre du post"
                v-model="title"
              />
              <input
                type="text"
                class="content-form"
                placeholder="Contenu du post"
                v-model="content"
              />
              <label for="post-image"><i class="fas fa-camera"></i></label>
              <input type="file" id="post-image" @change="tempStoreImage" />

              <input type="submit" value="Poster" class="btn" />
              <p class="filename" v-if="this.media">
                Image sélectionnée <i class="fas fa-check-circle"></i>
              </p>
            </form>
            <div class="post" v-for="post in posts" :key="post.id">
              <div class="post-container">
                <img :src="post.User.avatar" alt="Image de Profil" />
                <div class="align">
                  <p>
                    {{ post.User.name }} {{ post.User.firstname }} <br />
                    {{ new Date(post.createdAt).toLocaleString() }}
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
                  <img :src="post.media" alt="Image du Post" />
                </div>
                <div
                  class="post-video"
                  v-if="post.media && isVideo(post.media)"
                >
                  <video controls width="250">
                    <source :src="post.media" type="video/mp4" />
                  </video>
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
  name: 'Accueil',
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
  },
};
</script>

<style scoped lang="scss">
.content {
  background-color: #2d3036;
  display: flex;
}

.content-container {
  display: flex;
  justify-content: space-between;
  background-color: #2d3036;
  padding-top: 5vh;
}

.sidebar {
  background-color: #22262b;
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

.icons i {
  font-size: 32px;
  padding: 1vh;
}

.icons a {
  transition: color 450ms ease-in-out;

  &:hover {
    opacity: 0.8;
    color: white;
  }
}

.icons img {
  margin: 2vh;
  width: 85px;
  height: 85px;
  object-fit: cover;
}

.up {
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  padding: 4vh;
}

.account {
  display: inline-flex;
  align-items: center;
  color: white;
}

.account img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 30px;
  border: 1px solid #2d3036;
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
  background-color: #2d3036;
  border-radius: 30px;
  padding-bottom: 10vh;
  position: relative;
}

.posts h1 {
  font-size: 45px;
  color: white;
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
  color: white;
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

.posts form label :hover,
.posts form label :active {
  -webkit-text-stroke: 1px white;
}

.posts form input {
  background-color: #3a3a3a;
  border: 1px #707070 solid;
  border-radius: 30px;
  height: 42px;
  width: 100%;
  color: white;
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
  color: white;
}

#post-image {
  display: none;
}

.post {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid white;
  padding: 2vh;
  border-radius: 30px;
  margin: 1vh 0;
}

.post p {
  color: white;
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
</style>
