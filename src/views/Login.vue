<template>
  <div class="test">
    <div class="content-login">
      <div class="content-login-container">
        <img src="../assets/logo_full_black.png" alt="Logo Groupomania" />
        <h2>{{ $t('LOGIN.TITLE') }}</h2>
        <form @submit.prevent="submit">
          <label>{{ $t('LOGIN.USERNAMEEMAILLABEL') }} *</label>
          <input
            type="text"
            name="identifiant"
            :placeholder="$t('LOGIN.USERNAMEEMAILPLACEHOLDER')"
            v-model="identifiant"
          />
          <label>{{ $t('LOGIN.PASSWORDLABEL') }} *</label>
          <input
            type="password"
            name="password"
            :placeholder="$t('LOGIN.PASSWORDPLACEHOLDER')"
            v-model="password"
            pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
          />
          <input
            type="submit"
            name="submit"
            :value="$t('LOGIN.SUBMITBUTTON')"
            class="btn"
          />
        </form>
        <h3>
          {{ $t('LOGIN.DONTHAVEACCOUNT') }}
          <router-link :to="{ name: 'Signup' }">{{
            $t('LOGIN.SWITCHLOGINREGISTER')
          }}</router-link>
        </h3>
        <br />
        <h4>* = {{ $t('LOGIN.REQUIRED') }}</h4>
      </div>
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
.content-login {
  text-align: center;
  width: 1000px;
  margin: 0 auto;
  height: 100vh;
}

.content-login img {
  width: 350px;
  height: 200px;
  object-fit: cover;
}

.content-login h2 {
  font-size: 36px;
  font-weight: 400;
  margin-bottom: 0 !important;
}

.content-login h3 {
  font-size: large;
  font-weight: 300;
}

.content-login h4 {
  font-size: medium;
  font-weight: 300;
}

.content-login-container {
  display: inline-flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
}

form {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  padding: 2vh 0;
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
</style>
