const gamesData = [
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/age_of_war.swf",
    title: "Age of War",
    img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTfcaDjstZiJ1ztK5djUfAP2E3gsVQvJ19vKh1taAnovsKaHK_V4EG_Im-8qsVtfdBWANFo9g",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/happy_wheels.swf",
    title: "Happy Wheels (demo)",
    img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR4hynLt3_P7zB2IlZjSwxfYXeqLKsGPUKY-xyYrkoCNWaHPyT9o5tWF8wyEBMI6fKjr4qo",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/effing_worms.swf",
    title: "Effing worms",
    img: "https://cdn2.steamgriddb.com/grid/82b2658cd33c98bca3fb17e600497ca8.png",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/warfare_1944.swf",
    title: "Warfare 1944",
    img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQkbHquMEeHMKcpxfqEvUYqeas8dpov_bOiYC3ccxY_FN4ti3h1nvbwl1PoQ_5yBG2ngkpu5A",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/sift_heads_world.swf",
    title: "Sift heads world",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQGk4s9SJs5AqS7GbfvIREvqBv5RFPfS79gQ&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/skull_kid.swf",
    title: "SkullKid",
    img: "https://a.silvergames.com/j/b/skull-kid.jpg",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/duck-life-4.swf",
    title: "Duck life 4",
    img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ1tIvnya3kBQjX9ppg8Lg8sef5c603ynqWiOsWhruOmjG-RlQ5rXGvKyGVNCjOwE3CYcn0Vw",
  },

  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/raftwars.swf",
    title: "Raft Wars",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaU7FjX5dguFa2A_ESXVegbqWxG2B2dBLClQ&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/warfare-1917.swf",
    title: "Warfare 1917",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-erwZH9uj_qBIq4Fvl0LVvrH18LRz-PcTSA&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/stickwargame.swf",
    title: "Stick War",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ90INFtNke0rrMPi-zaxtA_-d432hrLmA7cg&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/cubefield.swf",
    title: "Cubefield",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROwQxvlzjDocpkJzvb7wXEtH4xuxopq9VJkw&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/dont-whack-your-teacher.swf",
    title: "Don't Whack Your Teacher",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmxcaopJaqYMgtyyJ80iqPTofXrB3ut86t-g&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/adrenaline.swf",
    title: "Andrenaline Challenge",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4IZAQUe94cp3v_ZgKCWArstiUPE4JC1zyXQ&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/angry-birds_rio.swf",
    title: "Angry Bird Rio",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkmin5XhHmMrfuR6EF-0GnQgor7en8USLtRg&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/angry-birds-halloween.swf",
    title: "Angry Bird Halloween",
    img: "https://i1.sndcdn.com/artworks-ZBJmEFcvRnyUAicy-YBzF4w-t500x500.jpg",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/dirt-bike-2.swf",
    title: "Dirt Bike 2",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJjLFmGBkqxKrGwvYCAYhxfcYJ5MRcW6hbgA&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/flight.swf",
    title: "Flight",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPbvUs38qWgULCbyVowc_PSW3Oh4BSs0Tqmg&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/this_is_the_only_level.swf",
    title: "This is the only level",
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4qjz.jpg",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/mario.swf",
    title: "Super Mario Flash",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFwNYu5cefN8B0DKzS3Qkc0qTlQRiJWD7IHQ&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/boxhead2play.swf",
    title: "Boxhead 2Play",
    img: "https://www2.minijuegosgratis.com/v3/games/thumbnails/8333_1.jpg",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/ragdoll_avalanche_2.swf",
    title: "Ragdoll Avalanche 2",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdBzTfPRV089YUYMbV7sygGdlmIB2O57-_Qg&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/neon_rider.swf",
    title: "Neon Rider",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrdVEHRMZXjaBMX5pFbgPGboqd1aa7ftpmqg&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/the-flood-runner.swf",
    title: "The Flood Runner ",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThPyEZaXbqbS-CiEYMDE0ehApm40LOmIxrXw&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/buddy.swf",
    title: "Buddy",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0JozGRbQ_Wjwy7k5jHldH30OqPaQqjLIjXw&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/free_rider_2.swf",
    title: "Free Rider 2",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh8VbjibynXk9tuNoBFu_f0WWGgmDDGUwJpQ&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/bloxorz.swf",
    title: "Bloxorz",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFnJMWMn8LZZNn_XM_m-OrU6zFCzXbYs3WRg&s",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/the-torture-game-3.swf",
    title: "The Torture Game 3",
    img: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/msnbc/Components/ArtAndPhoto-Fronts/TECH/080619/g-080619-tec-tortureGame.jpg",
  },
  {
    url: "https://swfdirect.weebly.com/uploads/2/7/4/4/27449221/mike_shadow_-_i_paid_for_it.swf",
    title: "I paid for it",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSumoegi3iQF7wMK36kn-5epmSROsYPtJFG3g&s",
  },
];

export default gamesData;
