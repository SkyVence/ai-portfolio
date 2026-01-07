# Prompts History

## Prompt 1
I want you to build a simple portfolio in html, css, js. You have access to tailwind standlone with `<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>`. You will build a modern dark themed with different section like, About me, Projects, Education, Contact. For the about me section keep it simple make a simple description i can change a placeholder picture. For the Project section, i want a bar on the left side with a date from the most recent (top one) to the oldest (bottom). All of this should be easy to add for me and modify. Keep the project structure as mentionned: index.html, js/* -> all of the javascript, css/* -> all the css. I want animation at some places but keep it sleek/minimalist.

## Prompt 2
Here is a list of issue is found/Modification you need to apply: When clicking a link i would like a fade-in/out, on the project timeline there is a couple of thing to change first there is an issue when a project card i hovered there is a little ball that you should remove, the date should have a month and the year and should be on top of the bar. The timeline should also have a space for the date (so no line around the date, add a gap of 4 or 6).

## Prompt 3
From now on you should create a prompt.md with all the prompt i sent you with the number in the order it has been sent. You should also get my previous messages.

## Prompt 4
I have a few more issue related to the timeline dates, the background for the date doesnt match the backgroup of the page in this section

## Prompt 5
Add a small gap between the timeline and the project cards

## Prompt 6
I want you to add a contact form that prefill an email, add text contact info beside it. Replace the twitter logo to the current X logo.

## Prompt 7
The mailto link didn't work when everything filled out

# Session 2

## Prompt 0
Please analyze this codebase and create an AGENTS.md file containing:
1. Build/lint/test commands - especially for running a single test
2. Code style guidelines including imports, formatting, types, naming conventions, error handling, etc.

The file you create will be given to agentic coding agents (such as yourself) that operate in this repository. Make it about 150 lines long.
If there are Cursor rules (in .cursor/rules/ or .cursorrules) or Copilot rules (in .github/copilot-instructions.md), make sure to include them.

If there's already an AGENTS.md, improve it if it's located in /

## Prompt 1
In the Agent.md you should mention the constant logging of conversation. When a new session is created it should make a `# N Session` for example then the prompt with the number of the prompt from 0 to n

## Prompt 2
In this project, there is an issue with the spacing on the left of the date where the project card are too close you should add a spacing or make the spacing higher.

## Prompt 3
In the footer add a link to page. This page is called why does this exist. In this you should explain this portfolio was ai generated for educationnal purpose to learn the usage of LLM Agent. Prompt enginnering. Make sure to include Agents.md and prompt.md in a formatted way.

## Prompt 4
Create a deployment plan using docker image, a reverse proxy already exist and i posses a vps with a domain name `skyvence.dev`.

## Prompt 5
Ill update you before you do anything more the reverse proxy is already configured, the proxy and the container will be on the same port so no need to expose a port in the docker compose configuration. Do not include nginx reverse proxy configuration

## Prompt 6
The docker image can be hosted on ghcr.io for this matter i want you to make a github action that build the image and pushes it to the registry.

## Prompt 7
Update why.html to include the latest logs

## Prompt 8
Add a small readme with a ci tag (skyvence/ai-portfolio) and update the necessary file like why.html.

## Prompt 9
Here is an issue for you when hosting the website the image in /img/* doesnt resolve can you fix it ? Do not forget to modify why.html
