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
              <img :src="userConnected.avatar" :alt="$t('ALTIMAGEPROFILE')" />
              <i class="fas fa-sort-down"></i>
            </div>
          </div>
          <div class="update">
            <h1>{{ $t('USEREDIT.TITLE') }}</h1>
            <div class="update-container">
              <label for="post-image" class="design">
                <div class="message">
                  <img :src="user.avatar" :alt="$t('ALTIMAGEPROFILE')" />
                  <p>{{ $t('USEREDIT.IMGOPACITYMESSAGE') }}</p>
                </div>
                <input
                  type="file"
                  id="post-image"
                  class="upload"
                  @change="updateImage"
                />
              </label>
              <div class="update-form">
                <form @submit.prevent="submit" class="form-user-edit">
                  <div class="champ">
                    <label>{{ $t('USEREDIT.NAMELABEL') }} *</label>
                    <br />
                    <input
                      type="text"
                      name="nom"
                      :placeholder="$t('USEREDIT.NAMEPLACEHOLDER')"
                      v-model="user.name"
                      :pattern="patternName"
                    />
                  </div>
                  <div class="champ">
                    <label>{{ $t('USEREDIT.FIRSTNAMELABEL') }} *</label>
                    <br />
                    <input
                      type="text"
                      name="prenom"
                      :placeholder="$t('USEREDIT.FIRSTNAMEPLACEHOLDER')"
                      v-model="user.firstname"
                      :pattern="patternFirstname"
                    />
                  </div>
                  <div class="champ">
                    <label>{{ $t('USEREDIT.USERNAMELABEL') }} *</label>
                    <br />
                    <input
                      type="text"
                      name="username"
                      :placeholder="$t('USEREDIT.USERNAMEPLACEHOLDER')"
                      v-model="user.username"
                      :pattern="patternUsername"
                    />
                  </div>
                  <div class="champ">
                    <label>{{ $t('USEREDIT.EMAILLABEL') }} *</label>
                    <br />
                    <input
                      type="email"
                      name="email"
                      :placeholder="$t('USEREDIT.EMAILPLACEHOLDER')"
                      v-model="user.email"
                    />
                  </div>
                  <div class="champ">
                    <label>{{ $t('USEREDIT.QUESTIONLABEL') }} *</label>
                    <br />
                    <input
                      type="text"
                      name="question"
                      :placeholder="$t('USEREDIT.QUESTIONPLACEHOLDER')"
                      v-model="user.question"
                      :pattern="patternQuestion"
                    />
                  </div>
                  <div class="champ">
                    <label>{{ $t('USEREDIT.RESPONSELABEL') }} *</label>
                    <br />
                    <input
                      type="text"
                      name="reponse"
                      :placeholder="$t('USEREDIT.RESPONSEPLACEHOLDER')"
                      v-model="user.reponse"
                      :pattern="patternReponse"
                    />
                  </div>
                  <br />
                  <input
                    type="submit"
                    name="submit"
                    :value="$t('USEREDIT.SUBMITBUTTON')"
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
      /* eslint-disable no-useless-escape */
      patternName:
        '[A-ZÀÈÌÒÙÁÉÍÓÚÝÂÊÎÔÛÃÑÕÄËÏÖÜŸÇßØÅÆ]{1}[a-zàèìòùáéíóúýâêîôûãñõäëïöüÿçøåæœ]{2,15}',
      patternFirstname:
        '[A-ZÀÈÌÒÙÁÉÍÓÚÝÂÊÎÔÛÃÑÕÄËÏÖÜŸÇßØÅÆ]{1}[a-zàèìòùáéíóúýâêîôûãñõäëïöüÿçøåæœ]{2,15}',
      patternUsername:
        '[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ_-]{4,20}',
      patternEmail: '([\w-]+(?:\.[\w-]+)*)@groupomania\.fr',
      patternQuestion:
        '[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ,.?"\'/ _-]{4,15}',
      patternReponse:
        '[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ,.`\'"/ _-]{4,15}',
      /* eslint-enable no-useless-escape */
      user: {},
      userConnected: {},
    };
  },
  methods: {
    updateImage(e) {
      const data = new FormData();
      data.append('avatar', e.target.files[0]);
      const token = localStorage.getItem('token');
      return fetch(
        `http://localhost:3000/api/user/${this.$route.params.UserId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        },
      ).then(() => this.fetchUserProfile());
    },
    submit() {
      const regexName =
        /^[A-ZÀÈÌÒÙÁÉÍÓÚÝÂÊÎÔÛÃÑÕÄËÏÖÜŸÇßØÅÆ]{1}[a-zàèìòùáéíóúýâêîôûãñõäëïöüÿçøåæœ]{2,15}$/;
      const regexFirstname =
        /^[A-ZÀÈÌÒÙÁÉÍÓÚÝÂÊÎÔÛÃÑÕÄËÏÖÜŸÇßØÅÆ]{1}[a-zàèìòùáéíóúýâêîôûãñõäëïöüÿçøåæœ]{2,15}$/;
      const regexUsername =
        /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ_-]{4,20}$/;
      const regexEmail = /^([\w-]+(?:\.[\w-]+)*)@groupomania\.fr$/i;
      const regexQuestion =
        /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ,.?"'/ _-]{4,15}$/;
      const regexReponse =
        /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ,.'"/ _-]{4,15}$/;
      const { name, firstname, username, email, question, reponse } = this.user;
      if (
        !regexName.test(name) ||
        !regexFirstname.test(firstname) ||
        !regexUsername.test(username) ||
        !regexEmail.test(email) ||
        !regexQuestion.test(question) ||
        !regexReponse.test(reponse)
      ) {
        return false;
      }
      const token = localStorage.getItem('token');
      return fetch(
        `http://localhost:3000/api/user/${this.$route.params.UserId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            firstname,
            username,
            email,
            question,
            reponse,
          }),
        },
      ).then(() => this.fetchUserProfile());
    },
    fetchUserProfile() {
      const token = localStorage.getItem('token');
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
        })
        .catch((error) => {
          this.error = error;
        });
    },
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
    this.fetchUserProfile();
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
  background-color: var(--app-background-color);
  height: 100vh;
  display: inline-flex;
  z-index: 99999;
  width: 100%;
}

.icons img {
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
    color: var(--app-text-primary-color);
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
  color: var(--app-text-primary-color);
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
  color: var(--app-text-primary-color);
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
  color: var(--app-text-primary-color);
}

.upload {
  display: none;
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
  color: var(--app-text-primary-color);
  transition: all 450ms ease-in-out;
}

.form-user-edit {
  margin: 4vh;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 900px;
}

.champ {
  padding: 1vh;
}

.champ input {
  width: 418px;
  height: 48px;
  font-family: Nunito, sans-serif;
  text-align: center;
  font-size: 18px;
  margin-bottom: 30px;
  border-radius: 12px;
  border: 1px #707070 solid;
}

.btn {
  border: 1px solid #a6a6a6;
  color: var(--app-text-primary-color);
  transition: all 450ms ease-in-out;
}

.btn:hover {
  background-color: var(--app-text-primary-color);
  color: #2d3036;
}
</style>
