# 'RC Whitespace' Joomla Template.

You're probably not going to want to use this. I'm using GitHub for convenience here, rather than with the intention of sharing this widely. The template contains a lot of styling that's specific to my site, and is probably missing styling used by most other Joomls sites.

## Run in Docker

```
docker run -i -p 8000:8000 --name node-for-joomla -v /Applications/MAMP/htdocs/joomla3/templates/rc_whitespace:/src/ -w /src/ node:14
```

This will allow building the frontend assets, but the project needs to be server separately as part of a Joomla site.
