<template>
  <div class="test">
    <div class="content">
      <div class="side">
        <div class="side-container">
          <router-link :to="{ name: 'Accueil' }">
            <p>
              <img :src="this.getImage()" alt="Logo Groupomania" />
            </p>
          </router-link>
          <div class="icons">
            <router-link :to="{ name: 'Home Dashboard' }">
              <p>
                <i class="fas fa-home"></i>{{ $t('DASHBOARD.LISTDASHBOARD') }}
              </p>
            </router-link>
            <br />
            <router-link :to="{ name: 'User Dashboard' }">
              <p><i class="fas fa-user"></i>{{ $t('DASHBOARD.LISTUSER') }}</p>
            </router-link>
            <br />
            <router-link :to="{ name: 'Post Dashboard' }">
              <p>
                <i class="fas fa-comment-alt"></i>{{ $t('DASHBOARD.LISTPOST') }}
              </p>
            </router-link>
            <br />
            <router-link :to="{ name: 'Comment Dashboard' }">
              <p>
                <i class="fas fa-comment"></i>{{ $t('DASHBOARD.LISTCOMMENT') }}
              </p>
            </router-link>
            <br />
            <router-link :to="{ name: 'Token Dashboard' }">
              <p>
                <i class="fas fa-ticket-alt"></i>{{ $t('DASHBOARD.LISTTOKEN') }}
              </p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="middle-container">
          <h2>{{ $t('DASHBOARDTOKEN.TITLE') }}</h2>
          <data-table :columns="columns" :data="tokenReturned" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../EventBus';
import deleteActionAdmin from '../components/DeleteAction.vue';
import i18n from '../I18n';
import LogoBlack from '../assets/logo_full_black.png';
import LogoWhite from '../assets/logo_full_white.png';

export default {
  data() {
    return {
      tokens: [],
      columns: [
        {
          key: 'id',
          title: 'Id',
          type: 'number',
        },
        {
          key: 'createdAt',
          title: 'Created At',
          type: 'string',
        },
        {
          key: 'token',
          title: 'Token',
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
          title: 'IP Address',
          type: 'string',
        },
        {
          title: 'Revoke',
          component: deleteActionAdmin,
          sortable: false,
          searchable: false,
        },
      ],
    };
  },
  methods: {
    getTokens() {
      const token = localStorage.getItem('token');
      fetch('http://localhost:3000/api/token/', {
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
    revokeToken(tokenData) {
      // eslint-disable-next-line no-alert
      const validation = window.confirm(i18n.$t('CONFIRM.TOKEN'));
      if (validation === true) {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/token/${tokenData.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer:' ${token}`,
            'Content-Type': 'application/json',
          },
        }).then(() => this.getTokens());
      }
    },
    getImage() {
      const theme = localStorage.getItem('theme');
      if (theme === 'light') {
        return LogoBlack;
      }
      return LogoWhite;
    },
  },
  mounted() {
    EventBus.$on('deleteActionPressed', this.revokeToken);
    this.getTokens();
  },
  computed: {
    tokenReturned() {
      return this.tokens.map((token) => {
        const parsedCreatedAt = this.formatDate(token.createdAt);
        const tokenModified = {
          ...token,
          createdAt: parsedCreatedAt,
        };
        return tokenModified;
      });
    },
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

.side {
  height: 100vh;
  flex-shrink: 2;
}

.side-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.side-container img {
  width: 175px;
  height: 75px;
  object-fit: cover;
  margin: 3vh;
}

.icons {
  display: inline-flex;
  flex-direction: column;
}

.icons a {
  text-decoration: none;
  color: var(--app-action-icons-color);

  &:hover {
    opacity: 0.8;
  }
}

.icons a i {
  margin: 1vh;
  font-size: 24px;
}

.icons p {
  font-size: 16px;
  display: flex;
  align-items: center;
}

.middle {
  background-color: var(--app-background-color);
  width: 100%;
  color: var(--app-text-primary-color);
}

.middle-container h2 {
  padding: 5vh 0 0 5vh;
}

.token {
  border: 1px solid var(--app-text-primary-color);
  margin: 2vh 4vh;
  border-radius: 30px;
  padding: 2vh;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.wrap {
  word-wrap: break-word;
}
</style>
