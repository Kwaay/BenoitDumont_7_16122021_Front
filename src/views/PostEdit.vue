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
              <img src="../assets/20210503_133718.png" alt="Profile Image" />
              <i class="fas fa-sort-down"></i>
            </div>
          </div>
          <div class="update">
            <h1>Modification d'un post</h1>
            <div class="update-container">
              <div class="media">
                <label for="post-image" class="design">
                  <div class="message">
                    <img :src="post.media" alt="Photo de profil" />
                    <p>Modifier l'image</p>
                  </div>
                  <input
                    type="file"
                    id="post-image"
                    class="upload"
                    @change="updateMedia()"
                  />
                </label>
              </div>
              <div class="upload-image">
                <label for="post-image" class="design"
                  ><i class="fas fa-upload"></i> Uploader une image</label
                >
                <input
                  type="file"
                  id="post-image"
                  class="upload"
                  @change="updateMedia()"
                />
              </div>
              <div class="update-form">
                <form @submit.prevent="submit" class="form-post-edit">
                  <div class="champ">
                    <label>Title *</label>
                    <br />
                    <input
                      type="text"
                      name="title"
                      placeholder="example: Title"
                      v-model="post.title"
                      :pattern="patternTitle"
                    />
                  </div>
                  <div class="champ">
                    <label>Content *</label>
                    <br />
                    <textarea
                      name="content"
                      placeholder="The text you want to post"
                      v-model="post.content"
                      :pattern="patternContent"
                    ></textarea>
                  </div>
                  <br />
                  <input
                    type="submit"
                    name="submit"
                    value="Modifier le post"
                    class="btn"
                  />
                </form>
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
      patternTitle:
        '[A-ZÀÈÌÒÙÁÉÍÓÚÝÂÊÎÔÛÃÑÕÄËÏÖÜŸÇßØÅÆ]{1}[a-z0-9àèìòùáéíóúýâêîôûãñõäëïöüÿçøåæœ?\'"! _-]{2,15}',
      patternContent:
        '[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\'"?!., _-]{4,255}',
      post: {},
    };
  },
  methods: {
    fetchPostData() {
      const token = localStorage.getItem('token');
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
    async updateMedia() {
      const { media } = this.post;
      const token = localStorage.getItem('token');
      await fetch(
        `http://localhost:3000/api/post/${this.$route.params.PostId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: media,
        },
      ).then(() => this.fetchPostData());
    },
    submit() {
      const regexTitle =
        /^[A-ZÀÈÌÒÙÁÉÍÓÚÝÂÊÎÔÛÃÑÕÄËÏÖÜŸÇßØÅÆ]{1}[a-z0-9àèìòùáéíóúýâêîôûãñõäëïöüÿçøåæœ?'"! _-]{2,15}$/;
      const regexContent =
        /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'"?!., _-]{4,255}$/;
      const { title, content } = this.post;
      if (!regexTitle.test(title) || !regexContent.test(content)) {
        return false;
      }
      const token = localStorage.getItem('token');
      return fetch(
        `http://localhost:3000/api/post/${this.$route.params.PostId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content,
          }),
        },
      );
    },
  },
  mounted() {
    this.fetchPostData();
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
  background-color: #22262b;
  padding-top: 5vh;
}

.sidebar {
  background-color: #22262b;
  height: 100vh;
  display: inline-flex;
  z-index: 99999;
  width: 100%;
}

.sidebar img {
  margin: 2vh;
  width: 85px;
  height: 85px;
  object-fit: cover;
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

.update {
  background-color: #2d3036;
  height: 100%;
  border-top-left-radius: 30px;
}

.update h1 {
  padding: 5vh;
  color: white;
  text-align: center;
}

.update-container {
  text-align: center;
  width: 100%;
}

.update-container img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.update-form {
  color: white;
}

.update-image input {
  color: white;
}

.upload {
  display: none;
}

.design {
  color: white;
}

.design i {
  padding: 0.5vh;
}

.message {
  position: relative;
  border-radius: 50%;
}

.message:hover img {
  opacity: 0.6;
  transition: all 450ms ease-in-out;
}

.message p {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  transition: all 450ms ease-in-out;
}

.message:hover p {
  display: block;
  color: white;
  transition: all 450ms ease-in-out;
}

.form-post-edit {
  margin: 4vh;
}

.champ {
  padding: 1vh;
}

.champ input,
.champ textarea {
  width: 418px;
  height: 48px;
  font-family: Nunito, sans-serif;
  text-align: center;
  font-size: 18px;
  margin-bottom: 30px;
  border-radius: 12px;
  border: 1px #707070 solid;
}

.champ textarea {
  height: 200px;
  resize: none;
}

.btn {
  border: 1px solid #a6a6a6;
  color: white;
  transition: all 450ms ease-in-out;
}

.btn:hover {
  background-color: white;
  color: #2d3036;
}
</style>
