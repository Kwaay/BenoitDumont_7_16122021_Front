<template>
  <div class="test">
    <div class="content">
      <img src="../assets/logo_full_black.png" alt="Logo Groupomania" />
      <h1>Inscription</h1>
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
        <div class="champ">
          <label>Avatar</label>
          <br />
          <label for="post-image" class="design"
            ><i class="fas fa-upload"></i> Uploader une image</label
          >
          <input type="file" id="post-image" class="upload" />
        </div>
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
      <h3>Déjà inscrit ? <a href="#">Se connecter</a></h3>
      <h5>* = obligatoire</h5>
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
      // avatar: '',
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
        // avatar,
      } = this;
      if (
        name.length === 0 ||
        !regexName.test(name) ||
        firstname.length === 0 ||
        !regexFirstname.test(firstname) ||
        username.length === 0 ||
        !regexUsername.test(username) ||
        email.length === 0 ||
        !regexEmail.test(email) ||
        password.length === 0 ||
        !regexPassword.test(password) ||
        question.length === 0 ||
        !regexQuestion.test(question) ||
        reponse.length === 0 ||
        !regexReponse.test(reponse)
      ) {
        return false;
      }
      /* if (this.avatar === null || this.avatar === undefined) {
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
          });
      } */
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
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.content img {
  width: 275px;
  height: 150px;
  object-fit: cover;
}

.content h1 {
  font-size: 36px;
  font-weight: 400;
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

h3,
h4,
h5 {
  font-weight: 300;
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
