---
title: Contributing content
pretitle: "[Home](/) > [Hub](/hub/) > [Contributing](/hub/contributing/)"
---

This page is for those who want to create or edit content pages on the Hub.

First, it might help to understand how this site works. The Hub is a [static site](https://bejamas.io/discovery/static-site-generators/) built with [Astro](https://astro.build/). For authors, what's important about this is it means the content on the site is created from a big folder of text files. Each file generates one page of the site. The text files are kept in a [Github repository](https://github.com/galaxyproject/galaxy-hub). You can edit the site by editing those files. Only a few maintainers have permissions to directly edit those files, though. So for everyone else, you use the Github interface to propose edits, which the maintainers can then evaluate and accept.

To make changes, you have two options.

## [Option 1] Editors: Do it all in Github

It's actually possible to contribute using only the Github website.

First, make sure you have a Github account. Then, go to the [repository page](https://github.com/galaxyproject/galaxy-hub).

### Adding a page

If you'd just like to create an entirely new page, then, on the main Github repository page, click the "Add file" button in the upper right. Then click "Create new file". In the new page that comes up, enter the path where your file should live in the box that says "Name your file". The path should start with "content", then the url where your page should be created, then "index.md". For instance, if you want to create a page at `https://galaxyproject.org/path/to/test-page/`, then you should type "content/path/to/test-page/index.md" in the box. Each time you hit `/`, Github will create a directory out of the last bit you typed. See the [file organization page](/hub/contributing/file-organization/) for a more detailed understanding of how the files and folders are placed.

Then in the main text box, type the contents of the page. It's best to use an existing `index.md` file as a reference.

### Editing an existing page

If you'd like to propose a change to an existing page, the easiest way is to use the "Edit" button in the Hub itself. Go to the page you want to change, then in the upper right corner, click the Github icon. You can also manually find it in the repository by looking in the `content` directory, then each folder in the page's url, just like you're looking through folders on your computer. See the [file organization page](/hub/contributing/file-organization/) for a more detailed understanding of how the files and folders are placed.

Once you've found the page, click the pencil icon in the upper right corner just above the page contents (next to the trash can and "Raw" and "Blame" buttons).

### Writing content

Whether you're adding a new page or changing an existing one, you'll be writing in YAML and Markdown. See the [YAML and Markdown](#yaml-and-markdown) section for more details on the formats.

You can actually get a rough idea of how it will display by clicking the "Preview" tab at the top of the box. This won't be exactly how the Hub displays it, and some Markdown features won't work, but it can help.

### Submit your changes

Once you're done, you'll want to add a "commit message" which describes your proposed change. You do this below the main text box, in the section labeled "Propose new file" (or "Propose changes"). In the first text box there, write a brief, one-line summary of what you're adding and why. Then in the second, larger box, you can add details if you want.

Then click "Propose new file" at the bottom. Then click the big, green "Create pull request" button. Then you'll see a couple more text boxes where you can describe your changes. This is the main post (called a "pull request") which the maintainers will read to understand what you're trying to do. You can use the commit message you already wrote if it's good enough for that. Once you're finished, click "Create pull request" at the bottom and the maintainers will look at it and decide if they want to add your changes. They might also reply with questions or requests for tweaks before they accept it.

## [Option 2] Developers: Clone the repository

For users familiar with git and the command line, you can clone the repository locally. You should probably first fork the repository: on the [repo page](https://github.com/galaxyproject/galaxy-hub), click the "Fork" button at the upper right of the page. Then make sure it shows your username as the owner (or whoever you want the owner to be), and the rest of the options you can leave as their defaults. Then click "Create fork". Then it'll take you to the page for your fork. Now you can clone it by clicking the big green "Code" button at the upper right. You'll probably want the "SSH" option, so copy the address (which should look like `git@github.com:[your-username]/galaxy-hub.git` but with your username instead of `[your-username]`) and paste it into a git clone command:
```sh
$ git clone 'git@github.com:[your-username]/galaxy-hub.git'
```
Then cd into the directory it creates and create a new branch to work on:
```sh
$ cd galaxy-hub
$ git checkout -b your-branch-name
```
Then you're ready to start making changes! To create a page, create the directories that define its url (see [file organization](/hub/contributing/file-organization/)) inside the `content` directory, then create an `index.md` file in the final directory you created. If you're editing an existing page, find its `index.md` inside `content`. See the [YAML and Markdown](#yaml-and-markdown) section for information on the formats to use in these files. To preview your changes as you make them, you can [run the development server](#running-the-development-server).

Once you're satisfied with your changes, commit them, then push them up to Github:
```sh
$ git push origin your-branch-name
```
The message you get after you do that will include a url you can visit to create the pull request to propose your changes. It should look something like `https://github.com/your-username/galaxy-hub/pull/new/your-branch-name`. Go to that url and create a description of your changes. This is what the maintainers will read to determine if they want to accept the changes. They may also ask for tweaks to make the changes acceptable for the Hub.

## YAML and Markdown

Static files are written in YAML and Markdown.

Each file should start with the metadata in [YAML](https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started) format. This section starts and ends with a line with just three dashes (`---`). The YAML header is where you put the title of the page and other metadata like the date of an event. Then after the YAML section is the content of the page in [Markdown](https://www.markdownguide.org/basic-syntax/). See [this page](/hub/contributing/markdown/) for tips on formatting your Markdown.

## Using components

The Hub provides interactive components like icons, embedded videos, and social media embeds. To use them in a page, add `components: true` to your frontmatter:

```yaml
---
title: "My Page"
components: true
---

Here's an icon: <Icon name="laptop" />
```

Available components include: `Icon`, `VegaEmbed`, `Twitter`, `Mastodon`, `VideoPlayer`, `Carousel`, `Flickr`, `Supporters`, `Contacts`, `MarkdownEmbed`, `CalendarEmbed`, and `Insert`.

Files with `components: true` are processed as MDX rather than plain Markdown. This means HTML comments must use JSX syntax (`{/* comment */}` instead of `<!-- comment -->`), and certain patterns like bare `<>` or `<` followed by a number need escaping. If you don't use any components, you don't need to worry about any of this — leave `components` out and your file will be processed as plain Markdown.

## Running the development server

Make sure you have [Node.js](https://nodejs.org/en/) installed (v18 or later), then:

```sh
$ cd astro
$ npm install
$ npm run dev
```

This starts a development server at http://localhost:4321 with hot reload. It automatically preprocesses content, generates redirects, and builds the search index.

To build the full production site:
```sh
$ npm run build
```

**Note**: The dev server is case-insensitive for URLs but production is case-sensitive. Always use lowercase, hyphen-separated paths.
