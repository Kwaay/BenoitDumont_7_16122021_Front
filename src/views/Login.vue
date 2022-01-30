<template>
  <div class="test">
    <div class="content">
      <img src="../assets/logo_full_black.png" alt="Logo Groupomania" />
      <h1>Connexion</h1>
      <form @submit.prevent="submit">
        <label>Identifiant (email ou username) *</label>
        <input
          type="text"
          name="identifiant"
          placeholder="example@groupomania.fr"
          v-model="identifiant"
        />
        <label>Mot de passe *</label>
        <input
          type="password"
          name="password"
          placeholder="Votre mot de passe"
          v-model="password"
          pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
        />
        <input type="submit" name="submit" value="Se connecter" class="btn" />
      </form>
      <h3>Pas encore de compte ? <a href="#">S'inscrire</a></h3>
      <h4>Connexion avec un pseudonyme</h4>
      <br />
      <h5>* = obligatoire</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      identifiant: '',
      password: '',
      user: {},
    };
  },
  methods: {
    submit() {
      /* const alreadyLogin = localStorage.getItem('token');
      if (alreadyLogin !== 'null' || alreadyLogin !== 'undefined') {
        return this.$vToastify.error('Already logged in');
      } */
      if (this.identifiant.length === 0) {
        return this.$vToastify.error('Identifiant input is empty');
      }
      if (this.password.length === 0) {
        return this.$vToastify.error('Password input is empty');
      }
      const regexPassword =
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;

      if (!regexPassword.test(this.password)) {
        return this.$vToastify.error("Password doesn't have a correct format");
      }
      if (this.identifiant.includes('@groupomania.fr')) {
        const regexEmail = /^([\w-]+(?:\.[\w-]+)*)@groupomania\.fr$/i;
        if (!regexEmail.test(this.identifiant)) {
          return this.$vToastify.error("Email doesn't have a correct format");
        }
        return fetch('http://localhost:3000/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.identifiant,
            password: this.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            this.user = data;
            localStorage.setItem('token', data.token);
            return this.$vToastify.success('Successfully Login');
          });
      }

      fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.identifiant,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.user = data.value;
          localStorage.setItem('token', data.token);
          return this.$vToastify.success('Successfully Login');
        })
        .catch((error) => {
          return this.$vToastify.error(`An error occurred: ${error}`);
        });
      return true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  text-align: center;
  width: 1000px;
  margin: 0 auto;
}

.content img {
  width: 350px;
  height: 200px;
  object-fit: cover;
}

.content h1 {
  font-size: 36px;
  font-weight: 400;
}

form {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
}

form label {
  font-size: 18px;
  text-align: left;
  margin-bottom: 14px;
}

form input {
  width: 418px;
  height: 48px;
  font-family: Nunito, sans-serif;
  text-align: center;
  font-size: 18px;
  margin-bottom: 30px;
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
  margin: 0 auto;
}

h3,
h4,
h5 {
  font-weight: 300;
}
</style>
