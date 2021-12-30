<template>
  <div class="test">
    <h1>{{ msg }}</h1>
    <div class="content">
      <img src="../assets/logo.png" alt="Logo Groupomania" />
      <h1>Inscription</h1>
      <form id="register">
        <div class="c1">
          <label>Nom *</label>
          <br /><br />
          <input type="text" name="nom" placeholder="example: John"/>
        </div>
        <div class="c2">
          <label>Prénom *</label>
          <br /><br />
          <input type="text" name="prenom" placeholder="example: Doe"/>
        </div>
        <div class="c1">
          <label>Pseudonyme *</label>
          <br /><br />
          <input type="text" name="username" placeholder="Entre 4 et 10 caractères"/>
        </div>
        <div class="c2">
          <label>Email *</label>
          <br /><br />
          <input type="email" name="email" placeholder="example@domain.fr"/>
        </div>
        <div class="c1">
          <label>Mot de passe *</label>
          <br /><br />
          <input type="text" name="password" placeholder="Votre mot de passe" />
        </div>
        <div class="c2">
          <label>Avatar</label>
          <br /><br />
          <input type="file" name="avatar" class="avatar "/>
        </div>
        <br />
      </form>
        <button type="submit" name="submit" class="btn" form="#register">S'inscrire</button>
      <h3>Déjà inscrit ? <a href="#">Se connecter</a></h3>
      <br />
      <h5>* = obligatoire</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content {
    width: 1000px;
    margin:0 auto;
  }
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
      display: inline-grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 100px 100px;
      grid-gap: 20px;
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
      margin: 0 auto;
  }
  button {
    font-size: large;
    font-family: Nunito, sans-serif;
  }
  h3,h4,h5 {
      font-weight:300;
  }
  .avatar {
    border: transparent;
    border-radius: initial;
  }
  .c1 {
    grid-column: 1;
  }
  .c2 {
    grid-column: 2;
  }
</style>