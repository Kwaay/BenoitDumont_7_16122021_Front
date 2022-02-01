<template>
  <div class="test">
    <div class="content">
      <div class="side">
        <div class="side-container">
          <img src="../assets/logo_full_white.png" alt="Logo Groupomania" />
          <div class="icons">
            <router-link :to="{ name: 'Home Dashboard' }">
              <p><i class="fas fa-home"></i>Dashboard</p>
            </router-link>
            <br />
            <router-link :to="{ name: 'User Dashboard' }">
              <p><i class="fas fa-user"></i>Utilisateurs</p>
            </router-link>
            <br />
            <router-link :to="{ name: 'Post Dashboard' }">
              <p><i class="fas fa-comment-alt"></i>Posts</p>
            </router-link>
            <br />
            <router-link :to="{ name: 'Token Dashboard' }">
              <p><i class="fas fa-ticket-alt"></i>Tokens</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="middle-container">
          <h2>Token Dashboard</h2>
          <data-table
            :v-bind="{ columns, data: tokens }"
            :columns="columns"
            :data="tokens"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import deleteActionButton from '../components/deleteActionButton.vue';

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
          component: deleteActionButton,
          sortable: false,
          searchable: false,
        },
      ],
    };
  },
  mounted() {
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
  computed: {
    data() {
      return this.tokens.map((token) => {
        const parsedCreatedAt = new Date(token.createdAt).toLocaleString();
        return {
          ...token,
          createdAt: parsedCreatedAt,
        };
      });
    },
  },
};
</script>

<style>
.content {
  background-color: #22262b;
  display: flex;
}

.content-container {
  display: flex;
  justify-content: space-between;
  background-color: #2d3036;
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
  background-color: #2d3036;
  width: 100%;
  color: white;
}

.middle-container h2 {
  padding: 2vh 4vh;
}

.token {
  border: 1px solid white;
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

.token-style {
  word-wrap: break-word;
  max-width: 600px;
}
</style>
