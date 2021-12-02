<template>
  <div class="main">
    <div class="features">
      <div class="paper">
        <RouterLink :to="'/genomics/global_platform/'">
          <h2>Global Platform<sup><font color="red">new</font></sup></h2>
          <h4>Freely accessible ready to use global infrastructure for SARS-CoV-2 monitoring</h4>
          <img :src="'./global_platform/figs/fig2.png'" />
        </RouterLink>
      </div>

      <div class="paper">
        <RouterLink :to="'/genomics/no-more-business-as-usual/'">
          <h2>PLoS Pathogens 2020</h2>
          <h4>
            No more business as usual: Agile and effective responses to emerging
            pathogen threats require open data and open analytics
          </h4>
          <img :src="'../img/plos_p.png'" />
        </RouterLink>
      </div>
    </div>

    <div class="features">
      <div class="feature">
        <RouterLink :to="'/evolution/'">
          <h2>Evolution</h2>
          <h4>Sites under selection</h4>
          <img :src="'../img/evo.png'" />
          <ul>
            <li>Natural Selection Analysis</li>
            <li>Analysis</li>
            <li>Visualizations</li>
            <li>Observable Notebooks</li>
          </ul>
        </RouterLink>
      </div>

      <div class="feature">
        <RouterLink :to="'/artic/'">
          <h2>Artic</h2>
          <h4>Amplicon based data analysis</h4>
          <img :src="$withBase('../img/artic.png')" />
        </RouterLink>
      </div>

      <div class="feature">
        <RouterLink :to="'/direct-rnaseq/'">
          <h2>direct RNA-seq</h2>
          <h4>direct RNA-seq data analysis</h4>
          <img :src="$withBase('../img/drna.png')" />
        </RouterLink>
        <ul>
          <li>
            <RouterLink :to="'/direct-rnaseq/1-preprocessing/'"
              >Pre-Processing</RouterLink
            >
          </li>
          <li>
            <RouterLink :to="'/direct-rnaseq/2-epigenetics/'"
              >RNA Epigenetics</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "genomics-intro",
};
</script>

<style scoped lang="stylus">
.features {
  padding: 1rem 0;
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: stretch;
  justify-content: space-between;
}

.h-feature {
  display: flex;

  .h-feature-focus {
    flex: 30%;
  }

  img {
    max-width: 100%;
    display: block;
    margin: 3rem auto 1.5rem;
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 500;
    border-bottom: none;
    padding-bottom: 0;
    color: lighten($textColor, 10%);
  }

  p {
    flex: 65%;
    text-align: left;
  }
}

.feature {
  flex-grow: 1;
  width: 100%;
  max-width: 30%;
  text-align: center;

  img {
    max-width: 100%;
    display: block;
    margin: 3rem auto 1.5rem;
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 500;
    border-bottom: none;
    padding-bottom: 0;
    color: lighten($textColor, 10%);
  }

  p, ul {
    text-align: left;
  }
}

.h-paper {
  display: flex;

  .h-paper-focus {
    flex: 45%;
  }

  img {
    max-width: 100%;
    display: block;
    margin: 3rem auto 1.5rem;
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 500;
    border-bottom: none;
    padding-bottom: 0;
    color: lighten($textColor, 10%);
  }

  p {
    flex: 65%;
    text-align: left;
  }
}

.paper {
  flex-grow: 1;
  width: 100%;
  max-width: 45%;
  text-align: center;

  img {
    max-width: 100%;
    display: block;
    margin: 3rem auto 1.5rem;
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 500;
    border-bottom: none;
    padding-bottom: 0;
    color: lighten($textColor, 10%);
  }

  p, ul {
    text-align: left;
  }
}

.footer {
  padding: 2.5rem;
  border-top: 1px solid $borderColor;
  text-align: center;
  color: lighten($textColor, 25%);
}
</style>