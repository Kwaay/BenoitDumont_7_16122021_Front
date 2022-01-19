<template>
  <div class="test">
    <h1>{{ msg }}</h1>
    <div class="content">
      <img src="../assets/logo_base.png" alt="Logo Groupomania" />
      <h1>Connexion</h1>
      <form>
        <label>Email *</label>
        <input type="text" name="email" placeholder="example@domain.fr" />
        <label>Mot de passe *</label>
        <input type="text" name="password" placeholder="Votre mot de passe" />
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
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content img {
        width: 375px;
        height: 250px;
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
    h3,h4,h5 {
        font-weight:300;
    }
</style>
