<template>
  <div class="test">
    <div class="content-signup">
      <img src="../assets/logo_full_black.png" alt="Logo Groupomania" />
      <h2>Inscription</h2>
      <form>
        <div class="champ">
          <label>Nom *</label>
          <br />
          <input
            type="text"
            name="nom"
            placeholder="example: John"
            v-model="name"
            :pattern="patternName"
          />
        </div>
        <div class="champ">
          <label>Prénom *</label>
          <br />
          <input
            type="text"
            name="prenom"
            placeholder="example: Doe"
            v-model="firstname"
            :pattern="patternFirstname"
          />
        </div>
        <div class="champ">
          <label>Pseudonyme *</label>
          <br />
          <input
            type="text"
            name="username"
            placeholder="Entre 4 et 10 caractères"
            v-model="username"
            :pattern="patternUsername"
          />
        </div>
        <div class="champ">
          <label>Email *</label>
          <br />
          <input
            type="email"
            name="email"
            placeholder="example@domain.fr"
            v-model="email"
            :pattern="patternEmail"
          />
        </div>
        <div class="champ">
          <label>Mot de passe *</label>
          <br />
          <input
            type="text"
            name="password"
            placeholder="Votre mot de passe"
            v-model="password"
            :pattern="patternPassword"
          />
        </div>
        <div class="champ pos">
          <label>Avatar</label>
          <br />
          <label for="post-image" class="design"
            ><i class="fas fa-upload"></i> Uploader une image</label
          >
          <input
            type="file"
            id="post-image"
            class="upload"
            @change="tempStoreImage"
          />
        </div>
        <p class="filename" v-if="this.avatar">
          Image sélectionnée <i class="fas fa-check-circle"></i>
        </p>
        <div class="champ">
          <label>Question *</label>
          <br />
          <input
            type="text"
            name="question"
            placeholder="Entre 4 et 15 caractères"
            v-model="question"
            :pattern="patternQuestion"
          />
        </div>
        <div class="champ">
          <label>Réponse *</label>
          <br />
          <input
            type="text"
            name="reponse"
            placeholder="Entre 4 et 15 caractères"
            v-model="reponse"
            :pattern="patternReponse"
          />
        </div>
        <br />
        <input
          type="submit"
          name="submit"
          value="Se connecter"
          class="btn"
          @click.prevent="submit"
        />
      </form>
      <h3>
        Déjà inscrit ?
        <router-link :to="{ name: 'Login' }">Se connecter</router-link>
      </h3>
      <h4>* = obligatoire</h4>
    </div>
  </div>
</template>

<script>
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
      console.log(e);
      const file = e.target.files[0];
      this.avatar = file;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-signup {
  width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.content-signup img {
  width: 350px;
  height: 200px;
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
}

.content-signup h3 {
  font-size: large;
}

.content-signup h4 {
  font-size: medium;
}

form label {
  font-size: 18px;
}

form input {
  width: 418px;
  height: 48px;
  font-family: Nunito, sans-serif;
  text-align: center;
  font-size: 18px;
  border-radius: 12px;
  border: 1px #707070 solid;
}

form input a {
  color: black;
}

.btn {
  width: 190px;
  height: 60px;
  background-color: #f3512f;
  border: transparent;
  border-radius: 12px;
  color: white;
  margin: 1.5vh;
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
  width: 80%;
}

.design {
  background-color: white;
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
