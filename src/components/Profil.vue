<template>
  <div class="test">
    <div class="content">
      <div class="sidebar">
        <div class="icons">
          <img src="../assets/logo_white.png" alt="Logo White" />
          <a href="/"><i class="fas fa-home"></i></a>
          <a href="/profil"><i class="fas fa-user"></i></a>
          <a href="/settings"><i class="fas fa-cog"></i></a>
          <a href="/admin/dashboard"><i class="fas fa-tools"></i></a>
        </div>
        <div class="box-posts">
          <div class="up">
            <div class="account">
              <img src="../assets/20210503_133718.png" alt="Profile Image" />
              <i class="fas fa-sort-down"></i>
            </div>
          </div>
          <div class="profile">
            <div class="profile-container">
              <img src="../assets/20210503_133718.png" alt="Profile Image" />
              <div class="infos">
                <h1>{Prénom Nom}</h1>
              </div>
              <div class="latest-posts">
                <h2>Derniers posts</h2>
                <div class="list-posts">
                  <div class="post-infos">
                    <h2>{ post.title }</h2>
                    <h3>{ post.createdAt }</h3>
                    <p>{ post.content }</p>
                  </div>
                </div>
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
  data() {
    return {
      PostId: '',
      posts: [],
    };
  },
  mounted() {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/api/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((dataUsers) => {
        this.PostId = dataUsers.user.id;
      })
      .catch((error) => {
        this.error = error;
      });

    fetch(`http://localhost:3000/api/post/${this.PostId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((dataPosts) => {
        this.posts = dataPosts;
      })
      .catch((error) => {
        this.error = error;
      });
  },
};
</script>

<style scoped lang="scss">
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

.sidebar {
  background-color: #2d3036;
  height: 100vh;
  display: inline-flex;
  z-index: 99999;
  width: 100%;
}

.sidebar img {
  margin: 2vh;
  width: 85px;
  height: 85px;
  object-fit: cover;
}

.icons {
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  transition: color 450ms ease-in-out;
  height: 70%;
}

.icons i {
  font-size: 32px;
  padding: 1vh;
}

.icons a {
  transition: color 450ms ease-in-out;

  &:hover {
    opacity: 0.8;
    color: white;
  }
}

.up {
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
}

.profile {
  text-align: center;
  color: white;
  background-color: #22262b;
  border-top-left-radius: 30px;
  height: 100vh;
}

.profile img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid white;
}

.profile-container {
  padding: 2vh;
}

.list-posts {
  border: 1px solid white;
  border-radius: 30px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
