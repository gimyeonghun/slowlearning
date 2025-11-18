---
title: "Magic Link Phishing"
date: 2025-08-08
type: quote
tags: ["passwords", "web app"]
---

[DecoPerson](https://news.ycombinator.com/item?id=44820331):

> The attack pattern is:
> 
> 1) User goes to BAD website and signs up.
> 
> 2) BAD website says “We’ve sent you an email, please enter the 6-digit code! The email will come from GOOD, as they are our sign-in partner.”
> 
> 3) BAD’s bots start a “Sign in with email one-time code” flow on the GOOD website using the user’s email.
> 
> 4) GOOD sends a one-time login code email to the user’s email address.
> 
> 5) The user is very likely to trust this email, because it’s from GOOD, and why would GOOD send it if it’s not a proper login?
> 
> 6) User enters code into BAD’s website.
> 
> 7) BAD uses code to login to GOOD’s website as the user. BAD now has full access to the user’s GOOD account.
> 
> This is why “email me a one-time code” is one of the worst authentication flows for phishing. It’s just so hard to stop users from making this mistake.
> 
> “Click a link in the email” is a tiny bit better because it takes the user straight to the GOOD website, and passing that link to BAD is more tedious and therefore more suspicious. However, if some popular email service suddenly decides your login emails or the login link within should be blocked, then suddenly many of your users cannot login.
> 
> Passkeys is the way to go. Password manager support for passkeys is getting really good. And I assure you, all passkeys being lost when a user loses their phone is far, far better than what’s been happening with passwords. I’d rather granny needs to visit the bank to get access to her account again, than someone phishes her and steals all her money.