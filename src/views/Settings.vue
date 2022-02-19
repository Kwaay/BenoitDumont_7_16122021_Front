<template>
  <div class="test">
    <div class="contents">
      <div class="sidebar">
        <div class="icon">
          <img :src="this.getImage()" alt="Logo" />
          <div class="icon-container">
            <router-link :to="{ name: 'Accueil' }"
              ><i class="fas fa-user"></i
            ></router-link>
            <router-link
              :to="{ name: 'Profil', params: { UserId: this.UserId } }"
              ><i class="fas fa-home"></i
            ></router-link>
            <router-link :to="{ name: 'Settings' }"
              ><i class="fas fa-cog"></i
            ></router-link>
            <router-link
              v-if="userConnected.rank === 1"
              :to="{ name: 'Home Dashboard' }"
              ><i class="fas fa-tools"></i
            ></router-link>
          </div>
        </div>
        <div class="box-posts">
          <div class="up">
            <div class="account">
              <img :src="userConnected.avatar" :alt="$t('ALTIMAGEPROFILE')" />
              <i
                @click="toggleLogout()"
                v-if="this.menuDisplayed === false"
                class="fas fa-sort-down"
              ></i>
              <i @click="toggleLogout()" v-else class="fas fa-sort-up"></i>
            </div>
            <transition name="logout">
              <div class="logout" v-if="this.menuDisplayed === true">
                <p><i class="fas fa-sign-out-alt"></i>{{ $t('LOGOUT') }}</p>
              </div>
            </transition>
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
                  @input="switchLanguage"
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
            <div class="mode">
              <div class="text">
                <h2>{{ $t('SETTINGS.THEMETITLE') }}</h2>
                <p>{{ $t('SETTINGS.THEMEDESC') }}</p>
              </div>
              <div class="colors">
                <input
                  type="checkbox"
                  id="mod"
                  class="colors"
                  v-model="darkMode"
                /><label for="mod" class="colors">Toggle</label>
              </div>
            </div>
            <div class="security">
              <div class="text">
                <h2>{{ $t('SETTINGS.SECURITYTITLE') }}</h2>
                <p>{{ $t('SETTINGS.SECURITYDESC') }}</p>
              </div>
              <div class="params">
                <input
                  type="checkbox"
                  id="security"
                  v-model="userConnected.maxSecurity"
                  @change="toggleMaxSecurity"
                /><label for="security">Toggle</label>
              </div>
            </div>
            <div class="history">
              <p
                @click="toggleTokenList()"
                v-if="this.tokenListDisplayed === false"
              >
                {{ $t('SETTINGS.HISTORYTITLE') }}
              </p>
              <div
                class="history-token"
                v-if="this.tokenListDisplayed === true"
              >
                <i class="fas fa-window-close" @click="toggleTokenList()"></i>
                <data-table :columns="columns" :data="tokenReturned" />
              </div>
            </div>
            <div class="action">
              <div class="supprimer" @click="deleteUser()">
                <p>
                  {{ $t('SETTINGS.DELETEACCOUNT') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoWhite from '../assets/logo_white.png';
import LogoBlack from '../assets/logo_black.png';

export default {
  name: 'Settings',
  metaInfo() {
    const title = this.$t('SETTINGS.TITLE');
    return {
      title,
    };
  },
  data() {
    return {
      userConnected: {},
      UserId: '',
      valueLang: {
        flag: localStorage.getItem('lang') === 'English' ? 'fi-us' : 'fi-fr',
        lang: localStorage.getItem('lang') || 'Français',
      },
      darkMode: true,
      menuDisplayed: false,
      tokenListDisplayed: false,
      tokens: [],
      columns: [
        {
          key: 'createdAt',
          title: this.$t('DATATABLE.CREATEDAT'),
          type: 'string',
        },
        {
          key: 'token',
          title: this.$t('DATATABLE.TOKEN'),
          component: {
            props: ['data'],
            render(createElement) {
              return createElement(
                'div',
                {
                  class: 'token-style',
                },
                this.data.token,
              );
            },
          },
        },
        {
          key: 'userAgent',
          title: 'User Agent',
          type: 'string',
        },
        {
          key: 'ipAddress',
          title: this.$t('DATATABLE.IPADDRESS'),
          type: 'string',
        },
      ],
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
        this.getTokens();
      })
      .catch((error) => {
        return this.$vToastify.error(`An error occurred: ${error}`);
      });
  },
  methods: {
    switchLanguage() {
      if (this.valueLang === null) return;

      localStorage.setItem('lang', this.valueLang.lang);
      this.$i18n.locale = this.valueLang.lang === 'Français' ? 'fr' : 'en';
    },
    getImage() {
      const theme = localStorage.getItem('theme');
      if (theme === 'light') {
        return LogoBlack;
      }
      return LogoWhite;
    },
    toggleLogout() {
      this.menuDisplayed = !this.menuDisplayed;
    },
    toggleTokenList() {
      this.tokenListDisplayed = !this.tokenListDisplayed;
    },
    toggleMaxSecurity() {
      const token = localStorage.getItem('token');
      if (
        typeof this.userConnected.id !== 'number' ||
        this.userConnected.id < 1
      )
        return;
      fetch(`http://localhost:3000/api/user/${this.userConnected.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer: ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          maxSecurity: this.userConnected.maxSecurity,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          return this.$vToastify.success(`Successfully modified`);
        })
        .catch((error) => {
          return this.$vToastify.error(`An error occurred: ${error}`);
        });
    },
    getTokens() {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:3000/api/token/user/${this.userConnected.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer:' ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.tokens = data;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    deleteUser() {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:3000/api/user/${this.userConnected.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer:' ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => {
          return this.$router.push({
            name: 'Login',
          });
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
  watch: {
    darkMode(value) {
      const htmlElement = document.documentElement;
      localStorage.setItem('theme', value ? 'dark' : 'light');
      htmlElement.setAttribute('theme', value ? 'dark' : 'light');
    },
  },
  computed: {
    tokenReturned() {
      if (this.tokens) {
        return this.tokens.map((token) => {
          const parsedCreatedAt = this.formatDate(token.createdAt);
          const tokenModified = {
            ...token,
            createdAt: parsedCreatedAt,
          };
          return tokenModified;
        });
      }
      return false;
    },
  },
};
</script>

<style scoped lang="scss">
.contents {
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
  background-color: var(--app-sidebar-color);
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

.icon a {
  transition: color 450ms ease-in-out;
  color: var(--app-text-primary-color);
}

.icon a :hover {
  opacity: 0.8;
}

.icon-container {
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  transition: color 450ms ease-in-out;
  height: 70%;
}

.up {
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  padding-right: 4vh;
  position: relative;
}

.account {
  display: inline-flex;
  align-items: center;
  color: var(--app-text-primary-color);
  padding: 2vh;
}

.account i {
  padding-left: 1vh;
  cursor: pointer;
}

.account img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 30px;
  border: 1px solid #2d3036;
}

.logout {
  height: 5vh;
  padding: 1.5vh;
  position: absolute;
  bottom: 0;
  background: var(--app-text-primary-color);
  z-index: 99999;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  transform: translateY(100%);
  cursor: pointer;
}

.logout i {
  padding: 0.5vh;
}

.logout p {
  color: var(--app-background-color);
}

.logout-enter {
  opacity: 0.5;
}

.logout-enter-active {
  opacity: 1;
}

.box-posts {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.settings {
  background-color: var(--app-background-color);
  color: var(--app-text-primary-color);
  padding: 5vh 5vh 10vh;
  border-top-left-radius: 30px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  width: calc(100% + 20px);
  margin-bottom: 10vh;
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
  padding-bottom: 4vh;
}

.history {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5vh 0;
  border: 1px solid #707070;
  flex-direction: column;
  position: relative;
}

.history-token i {
  position: absolute;
  right: 4vh;
  font-size: x-large;
}

.history p {
  color: #707070;
  font-size: x-large;
  margin: 0;
  text-align: center;
}

.action {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 5vh 0;
}

.supprimer {
  text-align: center;
  padding: 2.5vh;
  border: 1px solid #e61919;
  cursor: pointer;
}

.supprimer p {
  color: #e61919;
  font-size: x-large;
  margin: 0;
}

.colored {
  vertical-align: middle;
  color: var(--app-text-primary-color);
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
  background: #e61919;
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
  background: var(--app-background-color);
  border-radius: 90px;
  transition: 0.3s;
}

.colors label {
  cursor: pointer;
  text-indent: -9999px;
  width: 70px;
  height: 40px;
  background: var(--app-action-icons-color);
  display: block;
  border-radius: 100px;
  position: relative;
}

.colors input {
  height: 0;
  width: 0;
  visibility: hidden;
}

.params input:checked + label {
  background: green;
}

.colors label::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
  background: var(--app-background-color);
  border-radius: 90px;
  transition: 0.3s;
}

.params input:checked + label::after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

.colors input:checked + label::after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

@media (max-width: 700px) {
  .sidebar {
    display: initial;
    height: initial;
  }

  .box-posts {
    position: initial;
  }

  .icon {
    height: 0;
  }

  .logout {
    height: 8vh;
    padding: 0.5vh;
    width: 100%;
    text-align: center;
  }

  .icon-container {
    flex-direction: row;
    position: fixed;
    bottom: 0;
    height: initial;
    width: 100%;
    left: 0;
    right: 0;
    padding: 2vh;
    background: var(--app-sidebar-color);
    z-index: 9999;
    margin-top: 5vh;
  }

  .up {
    position: absolute;
    top: 2vh;
    right: 2vh;
    padding-right: 0;
  }

  .settings {
    border-top-left-radius: 0;
    margin-bottom: 0;
    height: initial;
    padding: 2vh 2.5vh;
    width: initial;
  }

  .lang,
  .mode,
  .security {
    flex-direction: column;
    align-items: flex-start;
  }

  .action {
    padding-bottom: 5vh;
  }

  .history {
    display: block;
  }

  .history-token i {
    right: 2.5vh;
  }

  .data-table {
    grid-template-columns: 100%;
    grid-template-areas:
      'search'
      'perPage'
      'table'
      'pagination'
      'info'
      'download';
    padding: 0;
  }
}
</style>
