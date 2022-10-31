---
title: Native support for Elixir-AAI in Galaxy v.19.05
date: '2019-06-13'
tease: the European Galaxy Server hosted by Elixir Germany is now ready to accept
  logins from users using their Elixir AAI identity for authentication..
tags: [release]
supporters:
- elixir
- denbi
authors: bgruening
authors_structured:
- github: bgruening
subsites: [global, all-eu, us]
main_subsite: eu
---

As of Galaxy version 19.05 released last month, Galaxy can easily be configured to use Elixir-AAI service for authenticating users! As the first publicly available Galaxy instance, the [European Galaxy Server](https://usegalaxy.eu/) hosted by Elixir Germany is now ready to accept logins from users using their Elixir AAI identity for authentication.

The Elixir AAI integration into Galaxy main source code is one of the deliverables in the [Elixir Galaxy Community Implementation Study](https://elixir-europe.org/about-us/implementation-studies/galaxy), and was achieved through  collaboration between Elixir Norway, Elixir Germany, Elixir Finland, Elixir Czech Republic and the Galaxy core developers.

The integration is based upon the OpenID Connect functionality in Galaxy, implemented through the Python Social Auth library. Galaxy users with a registered Elixir AAI user profile, simply login by following the “Login with Elixir” button:

![ELIXIR AAI Integration](/assets/media/elixir_aai.png)


[User](https://galaxyproject.org/authnz/use/oidc/idps/elixir-aai/) and [Admin](https://galaxyproject.org/authnz/config/oidc/idps/elixir-aai/) documentation is available on the Galaxy Hub.
 
If other Galaxy instances also would like to accept Elixir AAI logins, they need to register with Elixir AAI as a Service Provider and configure their Galaxy instance accordingly. Documentation for the admin setup is provided.

[Admin documentation](https://galaxyproject.org/authnz/config/oidc/idps/elixir-aai/) at galaxyproject.org official Galaxy documentation site.

The Elixir Galaxy Community is working on organizing a training WS
on configuring your Galaxy for [Elixir AAI](https://elixir-europe.org/services/compute/aai) authentication during [GCC 2019](https://gcc2019.sched.com/event/MDTY/elixir-galaxy-aai-authentication-and-authorisation-infrastructure), so stay tuned!

