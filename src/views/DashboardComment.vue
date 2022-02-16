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
          <h2>{{ $t('DASHBOARDCOMMENT.TITLE') }}</h2>
          <div class="list-comments">
            <div class="comment" v-for="comment in comments" :key="comment.id">
              <div class="comment-container">
                <img :src="comment.User.avatar" :alt="$t('ALTIMAGEPROFILE')" />
                <div class="align">
                  <p>
                    {{ comment.User.name }} {{ comment.User.firstname }} <br />
                    {{ formatDate(comment.createdAt) }}
                  </p>
                </div>
              </div>
              <div class="comment-content">
                <p>
                  {{ comment.content }}
                </p>
              </div>
              <div class="comment-actions">
                <div class="update" @click="updateComment(comment)">
                  <i class="fa fa-pencil"></i>
                </div>
                <deleteAction :data="comment" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../EventBus';
import deleteAction from '../components/DeleteAction.vue';
import i18n from '../I18n';
import LogoBlack from '../assets/logo_full_black.png';
import LogoWhite from '../assets/logo_full_white.png';

export default {
  metaInfo() {
    const title = this.$t('DASHBOARDCOMMENT.TITLE');
    return {
      title,
    };
  },
  components: { deleteAction },
  data() {
    return {
      comments: [],
    };
  },
  mounted() {
    EventBus.$on('deleteActionPressed', this.deleteComment);
    this.getComments();
  },
  methods: {
    getComments() {
      const token = localStorage.getItem('token');
      fetch('http://localhost:3000/api/comment/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer' ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.comments = data;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    updateComment(comment) {
      this.$router.push({
        name: 'Comment Admin Modification',
        params: { CommentId: comment.id },
      });
    },
    deleteComment(comment) {
      // eslint-disable-next-line no-alert
      const validation = window.confirm(i18n.$t('CONFIRM.COMMENT'));
      if (validation === true) {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/comment/${comment.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer:' ${token}`,
            'Content-Type': 'application/json',
          },
        }).then(() => this.getComments());
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
  background-color: #2d3036;
  padding-top: 5vh;
}

.side {
  flex-shrink: 2;
  background: var(--app-sidebar-color);
}

.side-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
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
  color: var(--app-text-primary-color);

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

.list-comments {
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
}

.comment-content {
  text-align: justify;
  padding: 0 2vh;
}

.comment-content h2 {
  padding: 0;
  color: var(--app-text-primary-color);
}

.comment {
  display: inline-flex;
  flex-direction: column;
  margin: 2.5vh 2.5vh 2.5vh 5vh;
  padding: 2vh;
  border: 1px solid var(--app-text-primary-color);
  border-radius: 20px;
  position: relative;
  width: 100%;
}

.comment p {
  color: var(--app-text-primary-color);
  font-size: 20px;
}

.comment p span {
  font-size: medium;
}

.comment-container {
  display: inline-flex;
  align-items: center;
  padding: 0 2vh 2vh;
}

.comment-container img {
  margin: 0;
  width: 85px;
  height: 85px;
  border-radius: 50%;
  object-fit: cover;
}

.align {
  display: flex;
  flex-direction: column;
  padding-left: 2vh;
}

.comment-image img {
  width: 350px;
  height: 200px;
  object-fit: cover;
  margin: 0;
}

.comment-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 4vh;
  bottom: 2vh;
}

.update {
  padding: 1vh;
  transition: all 450ms ease-in-out;
}

.update :hover {
  color: var(--app-text-primary-color);
  transform: scale(1.11);
}
</style>
