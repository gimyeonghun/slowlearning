---
title: glacial-self-62998
date: 2022-09-15
type: post
tags: []
---
*This was originally written in September 2021, but reuploaded. Names were redacted for privacy*

So it’s finally over. I switched the domains around so now the awards web app is offline. I’m hosting a static site on the domain name now instead.

2 weeks ago, I experimented with getting a Rack-based Ruby app running on Heroku. I got that working by the 29th August and started working away on the app. Over that weekend I worked on creating an MVP - by Monday night, students could vote on award categories, vote on each other and fill out a profile. I created a rudimentary onboarding page where users/students could add a profile photo. I think the profile photo made a big difference because it allowed students to personalise their profile and recognise each other more easily.

Understanding how to upload images was my first technical challenge. The only other challenge before that was the Elo algorithm, but I just needed to understand how it worked. Image uploading was a different beast altogether, because I’ve never done this before. My first attempt was to save the images as a binary blob directly into the database. My test runs showed that things were loading reasonably so I shipped this version. The virtual awards ceremony was now officially on!

But it quickly ran into issues.

First, there was not enough users. People read my promotion messages and quickly dismissed it. That was okay, because there were some technical issues with it. But, as I mentioned previously, the thing that hurt me the most was that my closest friends didn’t seem too really care about it. I’ll be forever grateful to R\*\*\*, C\*\*\* and J\*\*\* for being the early adopters. They’ve forever earned my trust and I’ll do anything for them. The rest… eh we’ll see.

I quickly discovered that the login feature was broken for some reason and that I would have to iterate on what I currently had. Over the next couple of days, I’ve experimented with uploading images to S3 (again, first time I’ve ever done this! It was terrifying!), fixing the login situation and updating the algorithm so you can vote on 4 students rather than 2 (as was my original vision). I also rewrote the voting code so that it didn’t create new vote sessions each time the user loaded a voting page. To keep track of the state of the voting match, I previously created a new record with the voting match id and populated by the different students loaded. Then, a `POST` request would update the winner of that voting match. However, I’ve noticed that a lot of users would load the page, then move to a different page, which meant that there were a lot of rows with `NULL` for the winner column. I was very proud of fixing that, as the code was kind of bloated.

I also learnt how to do to JOIN queries by the 3rd September. This meant that I could update the awards pages to show the student rankings, load voting history for each student and view their shoutouts. Looking at my calendar, 3/9 was Thursday night. That was when I had 2 cons sessions and I had a crazy idea moment in the middle of cons. I thought about creating an additional interactive feature, called shoutouts, so that students could compliment each other. That was when I both hated and loved myself. I loved myself for having that creativity and realising that creativity doesn’t have to be limited to art - it can be applied to engineering too. I also hated myself because I knew I wouldn’t be able to get rid of the idea until I followed through with it.

Thursday was also when I created default profiles for students, rather than encouraging them to sign up. This meant that more students could vote on other students without having to wait for those students to register. I also implemented a privacy function so that students could opt out of the voting process. Interestingly, only 2 students opted out by the end of the awards ceremony.

By Saturday, I almost had everything finished. But I had some login issues. At this point, I was exhausted and decided to do “security by obscurity”. Version 2 was live.

The reception was a lot better. And this time, a couple of my friends did register early on and played around with it. I got to see their reactions and it was gratifying to see their having fun.

The voting was going well for the next week. I started nagging people to check out the website. The one thing that bothered me was that new account profiles were being created because students’ personal email addresses didn’t line up with the one saved in the database. But by Wednesday, I had a fix that also solved the login issue: if students haven’t signed up and had a different email address, the profile saved in the database was merged with their email address they input. I used the same code to merge the existing accounts in the database. My last commit was Wednesday, 1pm. I was officially done with coding. 8 days worth of coding.

The next couple of days was spent promoting the website and spending time away from programming. I also thought of different projects, stuff more related to FerrisWheel.app. On Friday I did the presentation and the whole thing was finally over. I stepped away from talking to people over the weekend and now it’s Monday. I feel recharged enough.

As a final note, I want to share some statistics. Also, can I say Heroku Dataclips has really saved my bacon and helped me understand SQL more. I really do appreciate it now!


- J\*\*\* had the highest score of 1596 for the “Most Influential Denstagram” award. E\*\*\* would be please to know that she came in 2nd place.
- C\*\*\* had a score of 1564 for the “Party Enamel” award. L*** tied with her for the same award.
- J\*\*\* had a score of 1564 for the “Fireball Award”.
- D\*\*\* had a score of 1564 for the “Colgate Award”.
- I had a score of 1548 for the “I see Both Sides Like Chanel” award. I was tied with V\*\*\*, but I gave V\*\*\* the award.
- There were 129 shoutouts (some more was made over the weekend). I made the bulk of the shoutouts but A*** comes as a close second.
- Only 37 students didn’t end up checking out the site.
- There were 648 student votes in total.
- There were 1.5K rows for the Award Votes and yet that loaded in 42ms. Damn, databases are fast.

This was a fun project and I’ve learnt so much from it. I would rewrite this in Rails just to see if I can iterate faster and to see what it would be like to have things autogenerated for you. I wrote everything by hand and would like to avoid that in the future. It would also be nice to have everything structured correctly. Plus I would like to write tests.
