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
          <h2>Post Dashboard</h2>
          <div class="list-posts">
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
                  <video controls width="350">
                    <source :src="post.media" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div class="post-actions">
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
      posts: {},
      supportedExtensions: {
        image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'],
        video: ['mp4', 'avi'],
      },
    };
  },
  mounted() {
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
        this.posts = data;
      })
      .catch((error) => {
        this.error = error;
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

.middle-container h2 {
  padding: 2vh 4vh;
}

.post-content {
  text-align: justify;
}

.post-content h2 {
  padding: 0;
  color: white;
}

.post {
  display: inline-flex;
  flex-direction: column;
  margin: 2vh;
  padding: 2vh;
  border: 1px solid white;
  border-radius: 20px;
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
  width: 350px;
  height: 200px;
  object-fit: cover;
  margin: 0;
}

.post-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.update,
.delete {
  padding: 1vh;
}

.update :hover {
  color: yellow;
  transform: scale(1.11);
}

.delete :hover {
  color: red;
  transform: scale(1.11);
}
</style>
