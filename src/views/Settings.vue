<template>
  <div class="test">
    <div class="contents">
      <div class="sidebar">
        <div class="icon">
          <img src="../assets/logo_white.png" alt="Logo White" />
          <router-link :to="{ name: 'Profil', params: { UserId: this.UserId } }"
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
          <div class="upside">
            <div class="account">
              <img :src="userConnected.avatar" :alt="$t('ALTIMAGEPROFILE')" />
              <i class="fas fa-sort-down"></i>
            </div>
          </div>
          <div class="settings">
            <h1>{{ $t('SETTINGS.TITLE') }}</h1>
            <div class="lang">
              <div class="text">
                <h2>{{ $t('SETTINGS.LANGTITLE') }}</h2>
                <p>{{ $t('SETTINGS.LANGDESC') }}</p>
              </div>
              <div class="params">
                <multiselect
                  v-model="valueLang"
                  :placeholder="$t('SETTINGS.LANGOPTIONPLACEHOLDER')"
                  label="lang"
                  track-by="lang"
                  :options="[
                    {
                      flag: 'fi-fr',
                      lang: 'Français',
                    },
                    {
                      flag: 'fi-us',
                      lang: 'English',
                    },
                  ]"
                  :option-height="2"
                  :show-labels="false"
                >
                  <template slot="singleLabel" slot-scope="props">
                    <span class="fi" :class="props.option.flag"></span>
                    - <span class="colored">{{ props.option.lang }}</span>
                  </template>
                  <template slot="option" slot-scope="props">
                    <span class="fi" :class="props.option.flag"></span>
                    - <span class="colored">{{ props.option.lang }}</span>
                  </template>
                </multiselect>
              </div>
            </div>
            <br />
            <div class="mode">
              <div class="text">
                <h2>{{ $t('SETTINGS.THEMETITLE') }}</h2>
                <p>{{ $t('SETTINGS.THEMEDESC') }}</p>
              </div>
              <div class="params">
                <input type="checkbox" id="mod" /><label for="mod"
                  >Toggle</label
                >
              </div>
            </div>
            <br />
            <div class="security">
              <div class="text">
                <h2>{{ $t('SETTINGS.SECURITYTITLE') }}</h2>
                <p>{{ $t('SETTINGS.SECURITYDESC') }}</p>
              </div>
              <div class="params">
                <input type="checkbox" id="security" /><label for="security"
                  >Toggle</label
                >
              </div>
            </div>
            <br />
            <div class="history">
              <p>{{ $t('SETTINGS.HISTORYTITLE') }}</p>
            </div>
            <div class="action">
              <div class="supprimer">
                <p>{{ $t('SETTINGS.DELETEACCOUNT') }}</p>
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
  name: 'Settings',
  data() {
    return {
      userConnected: {},
      UserId: '',
      valueLang: '',
    };
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
};
</script>

<style>
body {
  background: #f1f1f1;
}

.contents {
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
  height: 100vh;
  display: inline-flex;
  z-index: 99999;
  width: 100%;
}

.icon img {
  margin: 2vh;
  width: 85px;
  height: 85px;
  object-fit: cover;
}

.icon {
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  transition: color 450ms ease-in-out;
  height: 70%;
}

.icon i {
  font-size: 32px;
  padding: 1vh;
}

.icon a :hover {
  transition: color 450ms ease-in-out;
  opacity: 0.8;
  color: white;
}

.upside {
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
  margin: 2vh;
}

.box-posts {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.settings {
  background-color: #22262b;
  color: white;
  padding: 5vh;
  border-top-left-radius: 30px;
  height: 100%;
}

.settings h1 {
  padding-bottom: 4vh;
}

.lang,
.mode,
.security {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.history {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5vh;
  border: 1px solid #707070;
}

.history p {
  color: #707070;
  font-size: x-large;
  margin: 0;
}

.action {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 5vh;
}

.supprimer {
  text-align: center;
  padding: 2.5vh;
  width: 20%;
  border: 1px solid #e61919;
}

.supprimer p {
  color: #e61919;
  font-size: x-large;
  margin: 0;
}
/* stylelint-disable selector-class-pattern */
.multiselect__tags {
  background-color: #22262b !important;
}

.multiselect__select {
  top: 50%;
  transform: translateY(-50%);
}

.multiselect__tags span img {
  width: 16px;
  height: 16px;
  border: 1px solid black;
  border-radius: 50%;
  vertical-align: middle;
}

.multiselect__element span img {
  width: 16px;
  height: 16px;
  border: 1px solid black;
  border-radius: 50%;
  vertical-align: middle;
}

.multiselect__input {
  background: #22262b !important;
  color: #adadad;
}

.multiselect ::placeholder {
  color: #adadad;
}

.multiselect__single {
  background-color: #22262b !important;
}

.multiselect__option {
  background: #22262b !important;
}

/* stylelint-enable selector-class-pattern */
.colored {
  vertical-align: middle;
  color: #a6a6a6;
}

.params input {
  height: 0;
  width: 0;
  visibility: hidden;
}

.params label {
  cursor: pointer;
  text-indent: -9999px;
  width: 70px;
  height: 40px;
  background: grey;
  display: block;
  border-radius: 100px;
  position: relative;
}

.params label::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 90px;
  transition: 0.3s;
}

.params input:checked + label {
  background: #78797d;
}

.params input:checked + label::after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}
</style>
