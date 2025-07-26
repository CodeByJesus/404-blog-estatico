Title: Why This Blog Uses Pelican?
Date: 2025-07-25 16:00
Category: Blog
Tags: Pelican, Static Site, Django, Backend, Netlify
Author: Jesus Martinez
Summary: Discover why this blog has been built as a static site with Pelican, and how it relates to its original backend version in Django.

Hello everyone!

If you're reading this, you've probably noticed the speed and efficiency of this blog. Today I want to share the reason behind its architecture and why I chose [Pelican](https://getpelican.com/) to power it.

## The Advantage of Static Sites

In the world of web development, there are two main approaches to building sites: dynamic and static. Dynamic sites (like those built with Django, WordPress, etc.) generate content "on the fly" every time a user visits them, querying databases and executing server logic. This is powerful, but can be slower and more expensive.

Static sites, on the other hand, are simply pre-generated HTML, CSS, and JavaScript files. When a user visits them, the server simply delivers those files directly. This offers significant advantages:

*   **Extreme Speed:** With no server-side processing, loading is almost instantaneous.
*   **Enhanced Security:** Fewer dynamic components mean fewer attack points.
*   **Reduced Cost:** They can be hosted for free or very cheaply on services like Netlify.
*   **Simplicity of Maintenance:** Once generated, the files are very easy to serve.

Pelican is a static site generator written in Python that allows me to write my posts in Markdown and then "compile" them to pure HTML, taking advantage of all these benefits.

I hope this explanation clarifies why I chose Pelican for this blog and how it takes advantage of the benefits of static sites! 