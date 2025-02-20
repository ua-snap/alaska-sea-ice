<template>
  <div id="app">
    <div class="banner">
      University of Alaska Fairbanks • International Arctic Research Center
    </div>
    <header>
      <h1>Alaska Sea Ice</h1>
      <h2>
        View sea ice locations and coverage compared to ice conditions, weather
        patterns, temperature changes, and more.
      </h2>
    </header>

    <div>
      <section class="section">
        <div class="container">
          <div class="intro content clamp is-size-3">
            <p>
              This site shows data that aids understanding of Alaska&rsquo;s sea
              ice conditions and changes.
            </p>
          </div>
          <div class="intro content clamp is-size-4">
            <p>
              Use the map below to see current sea ice coverage, ice thickness,
              temperature variations, and other related data layers produced by
              scientists studying the Arctic environment.
              <strong>It is not designed for operational decision-making</strong
              >. For the most up-to-date information, visit the
              <a href="https://www.arctic.noaa.gov/"
                >National Oceanic and Atmospheric Administration Arctic
                Program</a
              >.
            </p>
          </div>

          <div class="intro content is-size-4 clamp">
            <p>
              To compare the current sea ice year to historical data, visit the
              <a href="https://seaiceatlas.org">Sea Ice Atlas</a>
              tool.
            </p>
            <p class="intro--legend">
              Sea ice areas are highlighted to show relative coverage and
              thickness.
            </p>
            <ul>
              <li>Click one or more map layer names to activate.</li>
              <li>
                Legends are shown below the map, scroll down to see details.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<style scoped lang="scss">
.banner {
  text-transform: uppercase;
  background-color: #545454;
  padding: 0.3rem;
  color: #efefef;
  letter-spacing: 0.2rem;
  text-align: center;
  font-size: 0.8rem;
}

header {
  padding-top: 3rem;

  background-image: url("assets/alaskaseaice.png");
  background-size: cover;

  text-align: center;

  img {
    max-width: 15rem;
  }
  h1 {
    margin-top: -1rem;
    padding: 0 0 1rem 0;
    font-family: "Yellowtail";
    color: white !important;
    text-shadow: 3px 3px 3px #000;

    @media (max-width: 458px) {
      font-size: 3.25rem;
      line-height: 0.95;
      margin-top: -0.5rem;
    }
    @media (min-width: 459px) and (max-width: 604px) {
      font-size: 3.1rem;
    }
    @media (min-width: 605px) and (max-width: 704px) {
      font-size: 4rem;
    }
    @media (min-width: 705px) and (max-width: 951px) {
      font-size: 4.75rem;
    }
    @media (min-width: 952px) {
      font-size: 6.5rem;
    }
  }
  h2 {
    border-top: 0.25rem solid white;
    background-color: rgb(39, 41, 26);
    padding: 0.5rem 0 0.75rem;
    color: white;
    font-weight: 400;
    font-size: 1.75rem;
  }
}

.clamp {
  max-width: 55rem;
  margin: 2rem auto;
}

.glow {
  font-size: 1.5rem;
  background-color: #f3f7a8;
}

.intro--legend {
  img {
    vertical-align: middle;
    display: inline-block;
    margin-right: 1rem;
  }
}
</style>
