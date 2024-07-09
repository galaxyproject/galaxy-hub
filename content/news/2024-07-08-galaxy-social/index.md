---
title: Galaxy Social - Democratising Galaxy’s social media activity
date: '2024-07-08'
tease: A summary of what Galaxy Social is.
tags: [outreach]
subsites: [all-eu, global, us]
main_subsite: eu
---


Galaxy Social is an innovative project aimed at democratizing and streamlining social media activities for the Galaxy community.
This collaborative tool addresses several limitations of traditional social media management methods.

Key features of Galaxy Social include:

- Democratized Access: Enables community members to contribute and collaborate on social media posts easily.
- Simple Contribution Process: Uses markdown for creating new posts, making it accessible to a wider range of contributors.
- Review System: Implements a pull request workflow for peer review and coordination of posts.
- Multi-Platform Support: Currently supports Bluesky, Mastodon, Matrix, and Slack, with plans to expand to more platforms.
- Automated Input: Incorporates bots to retrieve content from various feeds, including YouTube and GitHub, with plans to expand for more input bots.
- Preview Feature: Allows contributors to see how posts will appear before they go live.
- Customizable Plugins: Written in Python, making it easy to extend functionality.

Galaxy Social addresses common challenges in social media management, such as manual processes, lack of review mechanisms, coordination difficulties, and security risks associated with credential sharing.
By implementing a GitHub-based workflow, it encourages community participation while maintaining quality control.

Future plans for Galaxy Social include supporting more social media platforms, introducing time-shifting for posts, improving video handling, and refining post-failure management.

We hope to engage a wider audience with our innovative approach to social media management, and we invite everyone to contribute to the [Galaxy Social GitHub repository](https://github.com/usegalaxy-eu/galaxy-social).
You can see here an example post:
```
---
media:
 - bluesky
 - mastodon
 - matrix
 - slack

mentions:
 bluesky:
  - galaxyproject.bsky.social
 mastodon:
  - galaxyfreiburg@bawü.social

hashtags:
 bluesky:
  - usegalaxy
  - GalaxyCommunity
 mastodon:
  - usegalaxy
---
Deploy ARC endpoints in the EGI Federated Cloud easily with Infrastructure Manager
https://galaxyproject.org/news/2024-05-20-esg-byoc-arc/
```
and here is the result in Slack, Matrix, Mastodon, and Bluesky:
![image](https://github.com/arash77/galaxy-hub/assets/2973722/c8de8bdf-3cee-466f-aea3-d2462b4bc88f)


For those interested in learning more about Galaxy Social, visit the [Poster](https://f1000research.com/posters/13-758), and [Slides](https://f1000research.com/slides/13-759).
