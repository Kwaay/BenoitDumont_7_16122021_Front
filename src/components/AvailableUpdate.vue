<template>
  <div class="packages-main">
    <h1>Dépendances {{ stack === 'back' ? 'API' : 'Front' }}</h1>
    <p>à mettre à jour</p>
    <div class="packages" v-if="packagesToUpdate === null">
      <div class="loading-dots">
        <p>Chargement en cours</p>
        <div class="loading-dots--dot"></div>
        <div class="loading-dots--dot"></div>
        <div class="loading-dots--dot"></div>
      </div>
    </div>
    <div class="packages" v-else>
      <div class="packages-container" v-if="packagesToUpdate.length !== 0">
        <ul>
          <li
            v-for="packageToUpdate in packagesToUpdate"
            :key="packageToUpdate[0]"
          >
            <a :href="`https://www.npmjs.com/package/${packageToUpdate[0]}`">{{
              packageToUpdate[0]
            }}</a>
            :
            <a
              class="version"
              :href="`https://www.npmjs.com/package/${
                packageToUpdate[0]
              }/v/${packageToUpdate[1].replace(/[\^~]/g, '')}`"
              >{{ packageToUpdate[1].replace(/[\^~]/g, '') }}</a
            >
            ->
            <a
              class="version"
              :class="getUpdateType(packageToUpdate[1], packageToUpdate[2])"
              :href="`https://www.npmjs.com/package/${
                packageToUpdate[0]
              }/v/${packageToUpdate[2].replace(/[\^~]/g, '')}`"
              >{{ packageToUpdate[2].replace(/[\^~]/g, '') }}</a
            >
          </li>
        </ul>
      </div>
      <p v-else>
        Toutes les dépendances sont à jour !
        <i class="fas fa-check-circle"></i>
      </p>
    </div>
  </div>
</template>

<script>
import frontPackageJSON from '../../package.json';

const frontPackages = {
  dependencies: frontPackageJSON.dependencies,
  devDependencies: frontPackageJSON.devDependencies,
};

export default {
  name: 'AvailableUpdate',
  props: {
    stack: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dependencies: {},
      devDependencies: {},
      packagesToUpdate: null,
    };
  },
  async created() {
    if (this.stack === 'back') {
      await this.getDependencies();
      await this.getDevDependencies();
    } else {
      this.dependencies = frontPackages.dependencies;
      this.devDependencies = frontPackages.devDependencies;
    }
    this.checkDependenciesUpdate();
  },
  methods: {
    async getDependencies() {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(
          'http://localhost:3000/api/config/dependencies',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer' ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        this.dependencies = data;
      } catch (error) {
        this.error = error;
      }
    },
    async getDevDependencies() {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(
          'http://localhost:3000/api/config/devdependencies',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer' ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        this.devDependencies = data;
      } catch (error) {
        this.error = error;
      }
    },
    checkDependenciesUpdate() {
      const token = localStorage.getItem('token');
      fetch('http://localhost:3000/api/config/checkUpdatesDependencies', {
        method: 'POST',
        headers: {
          Authorization: `Bearer' ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dependencies: this.dependencies,
          devDependencies: this.devDependencies,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.packagesToUpdate = data;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    getUpdateType(currentVersion, updateVersion) {
      const currentVersionIterable = currentVersion.split('.');
      const updateVersionIterable = updateVersion.split('.');

      if (currentVersionIterable[0] !== updateVersionIterable[0]) {
        return {
          majorupdate: true,
        };
      }
      if (currentVersionIterable[1] !== updateVersionIterable[1]) {
        return {
          minorupdate: true,
        };
      }
      if (currentVersionIterable[2] !== updateVersionIterable[2]) {
        return {
          patchupdate: true,
        };
      }
      return {};
    },
  },
};
</script>

<style scoped lang="scss">
.packages-main {
  padding-top: 2vh;
  background-color: #3a3a3a;
  color: white;
  border-radius: 10px;
  min-width: 500px;
  text-align: center;
}

.packages-main p {
  padding: 0;
  font-weight: 200;
  font-size: x-large;
}

@keyframes dot-keyframes {
  0% {
    opacity: 0.4;
    transform: scale(1, 1);
  }

  50% {
    opacity: 1;
    transform: scale(1.2, 1.2);
  }

  100% {
    opacity: 0.4;
    transform: scale(1, 1);
  }
}

.loading-dots {
  text-align: center;
  width: 100%;

  &--dot {
    animation: dot-keyframes 1.5s infinite ease-in-out;
    background-color: white;
    border-radius: 10px;
    display: inline-block;
    margin: 0.5vh;
    height: 8px;
    width: 8px;

    &:nth-child(2) {
      animation-delay: 0.5s;
    }

    &:nth-child(3) {
      animation-delay: 1s;
    }
  }
}

.packages-container li {
  padding: 0.5vh;
  list-style-type: circle;
}

.version {
  text-decoration: none;
}

.majorupdate,
.minorupdate,
.patchupdate {
  font-weight: bold;
}

.majorupdate {
  color: #e7903c !important;
}

.minorupdate {
  color: #ffd700 !important;
}

.patchupdate {
  color: #00d400 !important;
}
</style>