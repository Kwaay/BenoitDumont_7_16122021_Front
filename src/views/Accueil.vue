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
              <img :src="userConnected.user.avatar" alt="Profile Image" />
              <i class="fas fa-sort-down"></i>
            </div>
          </div>
          <div class="posts">
            <h1>Créer un post</h1>
            <form>
              <input type="text" name="create-post" placeholder="Ecrire ici" />
              <label for="post-image"><i class="fas fa-camera"></i></label>
              <input type="file" id="post-image" />
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
        this.userConnected = data;
        this.UserId = data.user.id;
      })
      .catch((error) => {
        return this.$vToastify.error(`An error occurred: ${error}`);
      });
  },
  mounted() {
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
  },
};
</script>

<style scoped lang="scss">
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

.sidebar {
  background-color: #2d3036;
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
  padding: 0 3vh;
  overflow-x: hidden;
  overflow-y: scroll;
  width: calc(100% + 20px);
  height: 100%;
  background-color: #22262b;
  border-radius: 30px;
  padding-bottom: 10vh;
}

.posts h1 {
  font-size: 45px;
  color: white;
  text-align: left;
}

.posts form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.posts form i {
  padding-left: 2vh;
  font-size: 48px;
}

.posts form label i {
  -webkit-text-stroke: 1px #707070;
  color: #3a3a3a;
  -webkit-text-fill-color: transparent;
  transition: all 450ms ease-in-out;
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
  padding-left: 2vh;
}

.posts form input::placeholder {
  font-family: Nunito, sans-serif;
  font-size: large;
}

.post-content {
  text-align: justify;
}

.post-content h2 {
  color: white;
}

#post-image {
  display: none;
}

.post {
  padding-top: 2vh;
  display: inline-flex;
  flex-direction: column;
  margin: 2vh;
  width: 100%;
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
  border-radius: 30px;
}

.align {
  display: flex;
  flex-direction: column;
  padding-left: 2vh;
}

.post-image img {
  width: 300px;
  height: 150px;
  object-fit: cover;
  margin: 0;
}
</style>
