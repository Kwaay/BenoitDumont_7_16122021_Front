<template>
  <div class="test">
    <div class="content-signup">
      <img :src="this.getImage()" alt="Logo Groupomania" />
      <h2>{{ $t('SIGNUP.TITLE') }}</h2>
      <form>
        <div class="champ">
          <label>{{ $t('SIGNUP.NAMELABEL') }} *</label>
          <br />
          <input
            type="text"
            name="nom"
            :placeholder="$t('SIGNUP.NAMEPLACEHOLDER')"
            v-model="name"
            :pattern="patternName"
          />
        </div>
        <div class="champ">
          <label>{{ $t('SIGNUP.FIRSTNAMELABEL') }} *</label>
          <br />
          <input
            type="text"
            name="prenom"
            :placeholder="$t('SIGNUP.FIRSTNAMEPLACEHOLDER')"
            v-model="firstname"
            :pattern="patternFirstname"
          />
        </div>
        <div class="champ">
          <label>{{ $t('SIGNUP.USERNAMELABEL') }} *</label>
          <br />
          <input
            type="text"
            name="username"
            :placeholder="$t('SIGNUP.USERNAMEPLACEHOLDER')"
            v-model="username"
            :pattern="patternUsername"
          />
        </div>
        <div class="champ">
          <label>{{ $t('SIGNUP.EMAILLABEL') }} *</label>
          <br />
          <input
            type="email"
            name="email"
            :placeholder="$t('SIGNUP.EMAILPLACEHOLDER')"
            v-model="email"
            :pattern="patternEmail"
          />
        </div>
        <div class="champ">
          <label>{{ $t('SIGNUP.PASSWORDLABEL') }} *</label>
          <br />
          <input
            type="text"
            name="password"
            :placeholder="$t('SIGNUP.PASSWORDPLACEHOLDER')"
            v-model="password"
            :pattern="patternPassword"
          />
        </div>
        <div class="champ">
          <label>{{ $t('SIGNUP.AVATARLABEL') }}</label>
          <br />
          <label for="post-image" class="design"
            ><i class="fas fa-upload"></i>
            {{ $t('SIGNUP.AVATARSUBMIT') }}</label
          >
          <input
            type="file"
            id="post-image"
            class="upload"
            @change="tempStoreImage"
          />
        </div>
        <p class="filename" v-if="this.avatar">
          {{ $t('SIGNUP.SELECTEDIMAGE') }} <i class="fas fa-check-circle"></i>
        </p>
        <div class="champ">
          <label>{{ $t('SIGNUP.QUESTIONLABEL') }} *</label>
          <br />
          <input
            type="text"
            name="question"
            :placeholder="$t('SIGNUP.QUESTIONPLACEHOLDER')"
            v-model="question"
            :pattern="patternQuestion"
          />
        </div>
        <div class="champ">
          <label>{{ $t('SIGNUP.RESPONSELABEL') }} *</label>
          <br />
          <input
            type="text"
            name="reponse"
            :placeholder="$t('SIGNUP.RESPONSEPLACEHOLDER')"
            v-model="reponse"
            :pattern="patternReponse"
          />
        </div>
        <br />
        <input
          type="submit"
          name="submit"
          :value="$t('SIGNUP.SUBMITBUTTON')"
          class="btn"
          @click.prevent="submit"
        />
      </form>
      <h3>
        {{ $t('SIGNUP.ALREADYREGISTER') }}
        <router-link :to="{ name: 'Login' }">{{
          $t('SIGNUP.SWITCHREGISTERLOGIN')
        }}</router-link>
      </h3>
      <h4>* = {{ $t('SIGNUP.REQUIRED') }}</h4>
    </div>
  </div>
</template>

<script>
import LogoBlack from '../assets/logo_full_black.png';
import LogoWhite from '../assets/logo_full_white.png';

export default {
  name: 'Register',
  data() {
    return {
      /* eslint-disable no-useless-escape */
      patternName:
        '^[A-ZÀÈÌÒÙÁÉÍÓÚÝÂÊÎÔÛÃÑÕÄËÏÖÜŸÇßØÅÆ]{1}[a-zàèìòùáéíóúýâêîôûãñõäëïöüÿçøåæœ]{2,15}$',
      patternFirstname:
        '^[A-ZÀÈÌÒÙÁÉÍÓÚÝÂÊÎÔÛÃÑÕÄËÏÖÜŸÇßØÅÆ]{1}[a-zàèìòùáéíóúýâêîôûãñõäëïöüÿçøåæœ]{2,15}$',
      patternUsername:
        '^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ_-]{4,20}$',
      patternEmail: '^([\w-]+(?:\.[\w-]+)*)@groupomania\.fr$/i',
      patternPassword:
        '^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$',
      patternQuestion:
        '^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ,.?"\'/ _-]{4,15}$',
      patternReponse:
        '^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ,.`\'"/ _-]{4,15}$',
      /* eslint-enable no-useless-escape */
      name: '',
      firstname: '',
      username: '',
      email: '',
      avatar: '',
      password: '',
      question: '',
      reponse: '',
      user: {},
    };
  },
  methods: {
    submit() {
      const regexName =
        /^[A-ZÀÈÌÒÙÁÉÍÓÚÝÂÊÎÔÛÃÑÕÄËÏÖÜŸÇßØÅÆ]{1}[a-zàèìòùáéíóúýâêîôûãñõäëïöüÿçøåæœ]{2,15}$/;
      const regexFirstname =
        /^[A-ZÀÈÌÒÙÁÉÍÓÚÝÂÊÎÔÛÃÑÕÄËÏÖÜŸÇßØÅÆ]{1}[a-zàèìòùáéíóúýâêîôûãñõäëïöüÿçøåæœ]{2,15}$/;
      const regexUsername =
        /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ_-]{4,20}$/;
      const regexEmail = /^([\w-]+(?:\.[\w-]+)*)@groupomania\.fr$/i;
      const regexPassword =
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
      const regexQuestion =
        /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ,.?"'/ _-]{4,15}$/;
      const regexReponse =
        /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ,.'"/ _-]{4,15}$/;
      const {
        name,
        firstname,
        username,
        email,
        password,
        question,
        reponse,
        avatar,
      } = this;
      if (this.name.length === 0) {
        return this.$vToastify.error('Name input is empty');
      }
      if (this.firstname.length === 0) {
        return this.$vToastify.error('Firstname input is empty');
      }
      if (this.username.length === 0) {
        return this.$vToastify.error('Username input is empty');
      }
      if (this.email.length === 0) {
        return this.$vToastify.error('Email input is empty');
      }
      if (this.password.length === 0) {
        return this.$vToastify.error('Password input is empty');
      }
      if (this.question.length === 0) {
        return this.$vToastify.error('Question input is empty');
      }
      if (this.reponse.length === 0) {
        return this.$vToastify.error('Reponse input is empty');
      }
      if (!regexName.test(name)) {
        return this.$vToastify.error("Name doesn't have a correct format");
      }
      if (!regexFirstname.test(firstname)) {
        return this.$vToastify.error("Firstname doesn't have a correct format");
      }
      if (!regexUsername.test(username)) {
        return this.$vToastify.error("Username doesn't have a correct format");
      }
      if (!regexEmail.test(email)) {
        return this.$vToastify.error("Email doesn't have a correct format");
      }
      if (!regexPassword.test(password)) {
        return this.$vToastify.error("Password doesn't have a correct format");
      }
      if (!regexQuestion.test(question)) {
        return this.$vToastify.error("Question doesn't have a correct format");
      }
      if (!regexReponse.test(reponse)) {
        return this.$vToastify.error("Reponse doesn't have a correct format");
      }
      if (avatar) {
        const data = new FormData();
        data.append('name', name);
        data.append('firstname', firstname);
        data.append('username', username);
        data.append('email', email);
        data.append('password', password);
        data.append('question', question);
        data.append('reponse', reponse);
        data.append('avatar', avatar);
        return fetch('http://localhost:3000/api/user/signup', {
          method: 'POST',
          body: data,
        })
          .then((response) => response.json())
          .then(() => {
            return this.$vToastify.success(
              'User has been created successfully with a avatar',
            );
          });
      }
      return fetch('http://localhost:3000/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          firstname,
          username,
          email,
          password,
          question,
          reponse,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.user = data.value;
          return this.$vToastify.success(
            'User has been created successfully without an avatar',
          );
        })
        .catch((error) => {
          this.error = error;
        });
    },
    tempStoreImage(e) {
      const file = e.target.files[0];
      this.avatar = file;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.test {
  background-color: var(--app-background-color);
}

.content-signup {
  width: 1000px;
  margin: 0 auto;
  text-align: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.content-signup img {
  width: 350px;
  height: 150px;
  object-fit: cover;
}

h3,
h4,
h5 {
  font-weight: 300;
}

.content-signup h2 {
  font-size: 36px;
  font-weight: 400;
  margin-bottom: 0 !important;
  color: var(--app-text-primary-color);
}

.content-signup h3 {
  font-size: large;
  color: var(--app-text-primary-color);
}

form input a {
  color: black;
}

.content-signup h3 a {
  color: var(--app-text-primary-color);
}

.content-signup h4 {
  font-size: medium;
  color: var(--app-text-primary-color);
}

form label {
  font-size: 18px;
  color: var(--app-text-primary-color);
}

form input {
  width: 418px;
  height: 48px;
  font-family: Nunito, sans-serif;
  text-align: center;
  font-size: 18px;
  border-radius: 12px;
  border: 1px #707070 solid;
  background-color: var(--app-input-background-color);
}

form input::placeholder {
  color: var(--app-input-placeholder-color);
}

.btn {
  width: 190px;
  height: 60px;
  background: var(--app-text-primary-color);
  border: transparent;
  border-radius: 12px;
  color: var(--app-background-color);
  margin: 1.5vh;
  transition: all 450ms ease-in-out;

  &:hover {
    background: var(--app-background-color);
    color: var(--app-text-primary-color);
    border: 1px solid var(--app-text-primary-color);
  }
}

button {
  font-size: large;
  font-family: Nunito, sans-serif;
}

.avatar {
  border: transparent;
  border-radius: initial;
}

.champ {
  display: inline-flex;
  flex-direction: column;
  padding: 1.5vh;
}

.champ label {
  text-align: left;
}

.champ i {
  font-size: 24px;
  padding: 1vh;
}

.upload {
  display: none;
}

.filename {
  text-align: right;
  width: 85%;
  color: var(--app-text-primary-color);
  margin: 0 auto;
}

.design {
  background-color: var(--app-input-background-color);
  color: var(--app-input-placeholder-color);
  border-radius: 12px;
  border: 1px #707070 solid;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 418px;
  height: 48px;
}
</style>
