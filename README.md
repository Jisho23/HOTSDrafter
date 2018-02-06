# HOTSDrafter
The frontend app for a 'Heroes of the Storm' drafting application

This is a working proof of concept for a drafting application related to Heroes of the Storm. As it stands, without a complete API 
it is difficult to calculate perfectly the win/loss percentages but we can get a relatively good idea.

Instructions: 

Setup:

1) This program works with a local backend (link to github: https://github.com/Jisho23/hots_draft_api). Bundle install,
then create, migrate and seed which creates a partial DB dump. Seeding should be done overnight (it takes 5-7 hours 
depending on HOTSApi's latency). The database runs on Postgresql (not sqlite).

2) To run the app, simply open the index.html in this repo. If it is not accessing the database, make sure that it is running
on localhost:3000.

Use:
1) First choose the map that you want to search win rates for.
2) Depending on the map, it will take anywhere from 0-40 seconds to search for replay and player information.
3) From there, simply choose if a character is picked or banned and the math will do the rest. Note that it is accurate for
the first 4-5 picks, but after that the sample size is too small and will start firing back 100s or 0s (implying that there is
only one replay in the database that matches what your draft looks like).

 This app was built during fall 2017 - winter 2018 and is styled using Bulma.
 
 Demo video: https://youtu.be/ST_8jGjAxY0
