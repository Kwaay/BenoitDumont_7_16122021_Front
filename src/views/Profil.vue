<template>
  <div class="test">
    <div class="content">
      <div class="sidebar">
        <div class="icons">
          <img src="../assets/logo_white.png" alt="Logo White" />
          <router-link :to="{ name: 'Accueil' }"
            ><i class="fas fa-home"></i
          ></router-link>
          <router-link :to="{ name: 'Profil' }"
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
          <div class="profile">
            <div class="profile-container">
              <div class="infos">
                <img :src="userConnected.avatar" alt="Profile Image" />
                <h1>{{ userConnected.name }} {{ userConnected.firstname }}</h1>
                <h2>Derniers posts</h2>
              </div>
              <div class="latest-posts">
                <div class="list-posts">
                  <div class="post" v-for="post in posts" :key="post.id">
                    <div class="post-title">
                      <h2>{{ post.title }}</h2>
                      <p>{{ new Date(post.createdAt).toLocaleString() }}</p>
                    </div>
                    <div class="post-content">
                      {{ post.content }}
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
import deleteAction from '../components/deleteAction.vue';

export default {
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
    };
  },
  mounted() {
    EventBus.$on('deleteActionPressed', this.deletePost);
    const token = localStorage.getItem('token');
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
        }).then(() => this.getPosts());
      }
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

.post-title {
  text-align: left;
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

.profile {
  padding: 0 3vh;
  overflow-x: hidden;
  overflow-y: scroll;
  width: calc(100% + 20px);
  height: 100%;
  background-color: #22262b;
  border-radius: 30px;
  padding-bottom: 10vh;
  color: white;
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
  border: 1px solid white;
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
  max-width: 800px;
  margin: 0 auto;
}

.post {
  border: 1px solid white;
  border-radius: 30px;
  margin: 4vh;
  padding: 2vh;
  position: relative;
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
  color: yellow;
  transform: scale(1.11);
}
</style>
