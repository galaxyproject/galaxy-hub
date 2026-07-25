---
title: "GCC2026 Fishbowl Discussion: AI, Galaxy, and Trustworthy Scientific Software"
date: "2026-07-09"
tease: "At GCC2026, the Galaxy community came together to ask how AI can support scientific discovery while preserving the trust, transparency, reproducibility, and human-centered values that define Galaxy."
tags: [gcc, conference, ai]
subsites: [global]
main_subsite: global
---

# GCC2026 Fishbowl Discussion Notes: AI, Galaxy, and the Future of Trustworthy Scientific Software

The Galaxy Community Conference 2026, held in Clermont-Ferrand, France, hosted a fishbowl-style discussion that brought the Galaxy community together to explore how artificial intelligence (AI) can support scientific discovery while preserving the trust, transparency, reproducibility, and human-centered values that have defined Galaxy for over 20 years.

## Session framing

The fishbowl discussion centered on one of the most urgent questions facing the Galaxy community:

**How should Galaxy adopt AI in ways that expand access and capability while protecting the values that have defined the project for 20 years: reproducibility, transparency, accessibility, openness, and trust?**

The discussion followed a series of talks on AI-enabled Galaxy features, including agents, workflow support, notebooks, BRC Analytics, AI-assisted workflow creation, and AI-supported literature mining. The fishbowl format invited participants to move into the discussion circle, share concerns, respond to one another, and collectively explore where Galaxy should go next.

The opening framing was not whether AI will affect scientific software, but how Galaxy should respond. AI is already entering scientific software, and while the Galaxy community may not be able to influence the entire world, it can influence where Galaxy fits in that world.

A key theme emerged early: **AI is already here, but Galaxy must decide how to use it responsibly.**

---

## 1. AI is already being used alongside Galaxy

Several participants noted that users are already using external AI systems alongside Galaxy, whether or not Galaxy officially supports those workflows.

Participants described people using AI to:

- interpret Galaxy error messages
- understand failed jobs
- plan analyses
- identify tools
- ask questions about workflows
- generate or modify code
- draft documentation
- explore results

One participant described using AI for Galaxy bug and error interpretation, noting that it can be genuinely useful when trying to understand what went wrong in a job. Orbit was also mentioned as a tool that sits outside Galaxy but can interact with Galaxy on a user’s behalf. This outside-the-interface model may provide some useful separation between Galaxy and the AI system.

A central point was that users will ask AI systems for help regardless of whether Galaxy provides an official AI assistant. If those users go to general-purpose AI tools, the answers may lack Galaxy-specific context. They may assume the user is working in Python, on the command line, or in another computational environment entirely. This can lead users away from Galaxy when a better Galaxy-specific answer could have helped them continue.

This led to one of the core tensions of the discussion:

> AI outside Galaxy may be unavoidable, but AI inside Galaxy carries a different level of responsibility.

If an AI response appears inside Galaxy, users may interpret it as something Galaxy endorses. That changes the stakes.

---

## 2. Guardrails: AI should assist, but not draw scientific conclusions

One of the clearest concerns raised was that AI agents embedded in Galaxy could go beyond what the community wants them to do.

One participant expressed concern that if an AI agent inside Galaxy is asked to “draw conclusions” from an analysis, users may assume that Galaxy supports or validates those conclusions. This was used as an example of a boundary that many participants felt should be handled carefully.

Participants generally saw value in AI for:

- finding tools
- explaining errors
- navigating workflows
- pointing users to Galaxy Training Network materials
- helping users discover relevant documentation
- helping developers with repetitive or tedious tasks
- improving documentation
- supporting workflow configuration
- helping users understand where to look next

But many were more cautious about AI:

- interpreting biological or scientific results
- deciding whether an analysis is valid
- making scientific claims
- replacing human judgment
- writing conclusions without user understanding
- obscuring uncertainty

A repeated theme was that **AI should support the scientific process, not replace it**.

One participant emphasized that AI could be useful for navigation, tool naming, and systematic inventory work across Galaxy’s tools, such as identifying overlap, missing features, or confusing naming. However, AI cannot replace human control.

Another participant framed the issue as not simply whether to use AI, but how to help users approach AI-assisted results critically. He compared this to long-standing critiques of Galaxy itself: Galaxy made powerful analyses accessible, but some worried users could run workflows without understanding them. AI amplifies this challenge rather than creating it from nothing.

---

## 3. Accessibility must not come at the cost of understanding

Galaxy has always aimed to make complex analysis more accessible. AI could extend that mission by helping users find relevant tools, understand errors, configure workflows, locate GTN tutorials, or identify next steps.

However, participants repeatedly returned to the need to preserve learning and understanding. If AI makes complex analyses feel too easy, users may stop learning the reasoning behind them.

One participant raised a concern about new contributors and younger researchers. Experienced Galaxy users may know how to ask useful AI questions because they already understand the system. New users may lack the vocabulary and conceptual framework needed to evaluate answers. Using AI does not automatically make someone an expert.

This concern was especially important in the context of training. If AI answers questions too quickly, it may prevent users from learning the concepts, assumptions, and limitations behind an analysis.

A useful framing emerged:

> Galaxy should help users use AI intelligently, not simply make AI available.

This could mean designing AI assistance that teaches, explains, links to trusted resources, and encourages critical thinking rather than simply providing an answer.

---

## 4. Auditability and provenance are essential

A major opportunity identified during the discussion was the ability for Galaxy to make AI use auditable.

One participant, speaking from the perspective of an instructor and supervisor, noted that students are already using AI tools. The key question is how a supervisor can know what happened, what was AI-assisted, and whether the student understands the work.

Galaxy is already built around histories, workflows, provenance, and reproducibility. These strengths could be extended to AI-assisted work.

Participants suggested that Galaxy could record:

- whether AI assistance was used
- which parts of an analysis were AI-assisted
- which model or agent was used
- what prompt or instruction was given
- what resources the AI response relied on
- what changes were made by the user afterward
- whether the user accepted, modified, or rejected the AI suggestion

This could be valuable for education, supervision, publication, compliance, and trust. It could also help distinguish between AI as a helper and AI as an untraceable source of scientific claims.

The discussion repeatedly returned to the importance of keeping the human in the loop. AI may help configure, search, summarize, or suggest, but the user should be able to inspect what happened and remain responsible for the scientific reasoning.

---

## 5. Galaxy’s existing strengths are highly relevant in the AI era

Several participants argued that Galaxy’s long-standing strengths become even more important in an AI-enabled research environment.

Galaxy already emphasizes:

- reproducible histories
- reusable workflows
- transparent execution records
- tool metadata
- training materials
- community review
- open infrastructure
- public documentation
- user support
- workflow sharing

These strengths provide a foundation for trustworthy AI-assisted science.

The discussion suggested that AI should be built around Galaxy’s existing values rather than treated as a separate layer. For example, AI assistance should point to histories, workflows, tool documentation, GTN materials, and community support rather than bypassing them.

The community also discussed the importance of attribution. If an AI answer is based on documentation, GTN tutorials, forum posts, or user-support answers, it should be possible to trace the answer back to those sources. One AI-support framework was mentioned as an example of linking AI-generated help back to the information it was sourced from.

This is important not only for trust, but also for credit. Much of the knowledge that AI systems rely on was created by human contributors, including people answering support questions, writing tutorials, documenting tools, and reviewing workflows.

---

## 6. AI can help with tool discovery, navigation, and error interpretation

There was broad support for using AI in areas where Galaxy users already face friction.

### Tool discovery and navigation

Several participants noted that finding the right tool in Galaxy can be difficult. Tool names may be confusing, domain-specific, abbreviated, or inconsistent. AI could help users describe what they want to do in plain language and then connect them to relevant tools, workflows, or tutorials.

AI could also help identify:

- duplicate tools
- overlapping tool functionality
- gaps in the tool ecosystem
- confusing naming
- missing metadata
- places where documentation could be improved

This kind of “inventory” work could benefit both users and maintainers.

### Error interpretation

Participants also saw value in AI-assisted error interpretation. Galaxy job logs can be long, technical, and difficult for users to interpret. An AI assistant that understands Galaxy could help distinguish between:

- user configuration errors
- tool failures
- missing inputs
- infrastructure problems
- admin-level problems
- known issues

One participant described using an AI tool to help interpret logs while covering user-support work, and another asked whether those kinds of skills could be added to Galaxy’s tool error report system. The answer was yes, suggesting a concrete area for future work.

### Error logs with more context

Another participant suggested that Galaxy could update error logs to include more context. This would help both humans and AI systems interpret failures more accurately.

---

## 7. AI should guide users to GTN and community resources, but not replace them

Many participants saw value in AI as a guide to existing community resources.

A useful AI assistant might point users to:

- Galaxy Training Network tutorials
- tool documentation
- workflow examples
- IWC workflows
- help forum posts
- relevant community discussions
- contribution guidelines
- tool wrapping guidance
- metadata and tagging instructions

For example, if someone wants to create a new Galaxy tool, an AI assistant could point them to the relevant GTN materials and explain how the tool should be documented, tagged, and contributed.

However, several participants warned that using AI simply as a search engine may not always be worth the ecological or social cost. If a conventional search engine can point someone to the correct GTN tutorial or forum post, then using an LLM may be unnecessary.

This led to a practical question:

> When is AI genuinely helpful, and when should Galaxy simply improve search, indexing, documentation, or navigation?

One suggestion was to create a “should/shouldn’t” guide for AI use in Galaxy: when it is appropriate, when it adds value, and when simpler tools are better.

---

## 8. Public knowledge sharing may be threatened by private AI interactions

One of the strongest concerns was that AI could weaken public knowledge-sharing loops.

Historically, when a user asked a question on a forum, mailing list, help site, or issue tracker, the answer became public. Other users could find it later. Galaxy admins and community members had an incentive to answer well because the answer could help many people.

With AI chatbots, many of these questions may now happen privately. The answer helps one person but may not return to the public knowledge base. The same question may be asked repeatedly in private chats, consuming resources each time and preventing the community from building shared knowledge.

One participant raised this concern directly, noting that AI systems currently work well because they were trained on documentation, Stack Overflow, forums, and other public sources. But if people stop asking public questions and stop writing public answers, future knowledge sources may shrink. In five or ten years, the public corpus may not contain the next generation of troubleshooting knowledge.

This concern connects to broader trends such as the decline in Stack Overflow questions after the rise of ChatGPT-like tools.

The discussion raised several possible responses:

- encourage AI systems to point users back to public forums
- let users mark AI answers as useful and submit decontextualized versions publicly
- automatically generate draft help-forum posts from unresolved AI chats
- preserve attribution to source documentation and support answers
- improve Galaxy Help and GTN indexing
- make it easier for users to contribute what they learned back to the community

One participant suggested a system where, if an AI assistant helps solve a problem, Galaxy could decontextualize the question and answer, remove private details, and ask the user whether it can be added to a public knowledge base.

This would preserve the benefit of AI assistance while helping maintain the shared knowledge commons.

---

## 9. AI changes incentives, habits, and community behavior

One of the most important philosophical points in the discussion was that AI is not “just a tool.” Tools shape behavior.

A participant drew an analogy to smartphones and Wikipedia: as smartphone use grew, contribution patterns changed because phones are better for consuming information than contributing to it. The tool changed the environment.

The same may be true of AI. If AI makes it easier to get private answers than to ask public questions, community contribution may decline. If AI makes it easier to generate code than to mentor junior developers, training pathways may weaken. If AI makes it easier to create workflows than to understand them, scientific reasoning may suffer.

The takeaway was that Galaxy should not only ask what AI features it wants. It should ask:

- What behaviors do we want to encourage?
- What habits do we want to preserve?
- What incentives do we want to create?
- What kind of community do we want Galaxy to be?
- How can AI support, rather than weaken, community participation?

Another participant echoed this concern from the perspective of community building. He described using AI like a search assistant, but also worried that AI could break the human connections that make Galaxy strong. One of Galaxy’s strengths is that people help each other. AI should not replace that human layer.

---

## 10. Environmental and ethical concerns were central

Environmental impact was a major thread throughout the fishbowl.

Participants raised concerns about:

- energy use
- water use
- data center expansion
- ecological costs of unnecessary AI use
- whether LLMs should be used for simple search or indexing tasks
- whether speed is always the right goal
- how AI development aligns with Galaxy’s environmental sustainability efforts

The discussion was not anti-AI, but it was skeptical of using AI reflexively.

One participant, speaking from a biodiversity and ecology perspective, challenged the assumption that faster is always better. The point was not simply that AI has an environmental cost, but that the community should ask whether speed actually solves the problems at hand.

For biodiversity indicators and similar global challenges, the issue may not be that analysis is too slow. The deeper problem may be lack of transparency, reproducibility, trust, communication, and public engagement. Faster results do not automatically solve those problems.

This led to an important framing:

> The goal should not simply be to go faster. The goal should be to do better science, with people, trust, transparency, and reproducibility.

Other participants noted that AI’s environmental cost should be evaluated in context. For example, if AI helps optimize a widely used tool or pipeline, the energy spent developing that improvement could be offset by long-term computational savings. But this does not justify using large models for every small question.

A pragmatic suggestion was to develop guidance for when AI is appropriate and when lower-cost methods, such as search, documentation, or better indexing, should be used instead.

---

## 11. The community discussed regulation, consent, and model choice

Ethical concerns extended beyond energy use.

Participants raised concerns about:

- corporate control of AI systems
- lack of regulation
- data center expansion
- use of AI companies in military or surveillance contexts
- use of copyrighted or community-created materials in training data
- consent for AI ingestion
- whether Galaxy should prefer open-source or publicly funded models

One participant pushed back on the idea that “AI is inevitable, so there is nothing we can do.” They argued that Galaxy alone may not be able to change the AI industry, but Galaxy, ELIXIR, the EU, and the broader research community could potentially take collective positions on what kinds of AI use are acceptable.

The community could think carefully about:

- which models Galaxy integrates with
- whether models are open source
- whether models are publicly funded
- whether community material can be used for training
- how attribution is handled
- whether users and contributors can opt out of AI ingestion
- what kinds of AI use align with Galaxy values

This was not framed as a simple rejection of AI, but as a call for agency. The community can make choices.

---

## 12. Training, junior researchers, and “brain rot” concerns

Education and training were major concerns.

Participants worried about what happens when junior scientists, students, or new developers rely heavily on AI before they understand the underlying concepts.

Concerns included:

- users may not know how to ask good AI questions
- users may not know whether an answer is wrong
- students may complete analyses without understanding them
- junior developers may generate code they cannot maintain
- fewer people may learn how systems actually work
- mentorship pathways may weaken
- people may lose practice doing tasks by hand

one participant reflected on how AI can make experienced developers more productive, but also how it can change the way the brain works during the day. AI makes it possible to juggle many tasks at once, but that may come at the cost of deeper thinking. Easy tasks can get solved faster, while hard conceptual problems pile up.

Several people raised concerns about junior developers and scientists. Experienced users know what to inspect and where an AI-generated answer may fail. Newer users may not.

This suggests that Galaxy’s AI strategy should include education about AI itself:

- how to use AI critically
- how to verify AI-assisted work
- how to understand limitations
- how to preserve scientific reasoning
- how to document AI use
- how to avoid over-reliance
- how to ask better questions
- how to check outputs against controls and expectations

---

## 13. AI may help with documentation and tedious work

The discussion was not only cautious. Participants also identified places where AI can genuinely help.

One participant noted that AI has improved documentation practices. Developers often do not enjoy writing documentation or may leave knowledge buried in pull requests, issues, or code. AI can help turn work into documentation that lives with the code.

This was an important counterpoint to concerns about the loss of public knowledge. While AI may reduce public Q&A in some places, it may also help produce better documentation if used deliberately.

Participants also supported AI for tedious tasks such as:

- writing boilerplate
- improving documentation
- generating draft explanations
- helping with tool wrapper syntax
- summarizing long logs
- helping with repetitive code changes
- creating first drafts of training materials
- surfacing existing resources
- improving metadata
- checking formatting or tagging

One participant summarized the desired relationship well:

> AI should not do my work so I can do my laundry. AI should do my laundry so I can do my work.

In other words, AI should remove friction and tedious overhead, not replace scientific thinking.

---

## 14. AI should not be forced on users

Another important point was that AI features should not feel shoved into the Galaxy experience.

Participants supported AI as an optional assistant or opt-in capability, especially when users can choose whether and how to connect models or agents.

The community should avoid sacrificing non-AI usability. Improvements that help both humans and AI, such as clearer metadata, better documentation, structured workflows, and better validation, are especially valuable.

The ideal design direction is not “make Galaxy dependent on AI,” but rather:

- make Galaxy easier for humans
- make Galaxy more structured and transparent
- allow AI to use that structure responsibly
- keep AI optional where possible
- preserve workflows for users who do not want AI assistance

---

## 15. Human community remains central

A recurring theme was that Galaxy is a community, not just software.

Participants emphasized that users should know humans are behind Galaxy:

- developers
- trainers
- support contributors
- tool maintainers
- workflow reviewers
- instance administrators
- documentation writers
- community organizers

AI should not obscure the people who build and sustain the project.

One concern was that if AI saves time, that time should not simply be used to produce more AI-mediated output. It could be used for more outreach, better mentoring, better documentation, stronger support, and deeper community relationships.

The discussion repeatedly returned to the idea that Galaxy’s strength is not only technical infrastructure. It is also trust, openness, shared knowledge, and people helping one another.

---

## 16. Practical ideas and possible next steps

The fishbowl generated several concrete ideas that could shape future Galaxy AI work.

### AI guardrails and scope

- Define what Galaxy AI should and should not do.
- Avoid presenting AI-generated scientific conclusions as Galaxy-endorsed conclusions.
- Make AI assistance clearly distinguishable from validated scientific interpretation.
- Encourage AI to explain uncertainty and limits.
- Keep humans responsible for scientific judgment.

### Auditability and provenance

- Record when AI assistance is used.
- Track which model or agent was involved.
- Preserve prompts, responses, and accepted changes where appropriate.
- Link AI suggestions to histories, workflows, and tool executions.
- Support educational and publication compliance needs.

### Source attribution

- Link AI answers back to GTN tutorials, tool documentation, forum posts, and other sources.
- Preserve credit for human contributors.
- Support systems like Foundry that maintain attribution.

### Better use of community knowledge

- Integrate GTN, Galaxy Help, tool docs, and workflow resources into AI-assisted help.
- Let unresolved AI interactions become draft help-forum posts.
- Let users contribute decontextualized solved questions back to public knowledge bases.
- Improve indexing so simple resource-finding does not always require LLMs.

### Error interpretation

- Add more context to error logs.
- Build AI-assisted error interpretation into Galaxy’s bug/error reporting system.
- Help distinguish user errors from tool or infrastructure errors.
- Reuse skills developed by community support and admin teams.

### AI use guidance

- Create a “when to use AI / when not to use AI” guide.
- Consider ecological impact when selecting AI approaches.
- Use simpler search or indexing where sufficient.
- Prefer smaller, local, open, or community-aligned models when possible.

### Training

- Develop GTN-style training on responsible AI use.
- Teach users how to verify AI-assisted work.
- Teach junior researchers and developers how to avoid over-reliance.
- Include AI literacy as part of scientific workflow literacy.

### Community incentives

- Design AI features to encourage contribution, not only consumption.
- Preserve public Q&A and shared troubleshooting.
- Reward documentation and knowledge sharing.
- Keep humans visible in the support and development process.

---

## 17. Overall takeaways

The fishbowl did not produce a single consensus position on AI. Instead, it showed a thoughtful community working through the tradeoffs together.

Several points of broad agreement emerged:

1. **AI is already part of the scientific software landscape.**  
   Galaxy cannot ignore it, because users are already using it.

2. **Galaxy must protect trust.**  
   AI assistance inside Galaxy must be designed carefully because users may interpret it as Galaxy-endorsed.

3. **AI should assist, not replace scientific reasoning.**  
   Tool discovery, documentation, error interpretation, and workflow support are promising. Scientific conclusions require human judgment.

4. **Galaxy’s existing values are highly relevant.**  
   Reproducibility, transparency, histories, workflows, provenance, and training are even more important in an AI-enabled world.

5. **AI must be auditable.**  
   Users, instructors, supervisors, reviewers, and publishers need to know how AI was used.

6. **Community knowledge must remain public and attributed.**  
   AI should not move all troubleshooting into private, uncredited, non-reusable conversations.

7. **Environmental and ethical costs matter.**  
   AI should be used where it adds real value, not simply because it is available.

8. **The tool will shape the community.**  
   Galaxy should design AI features around the behaviors, incentives, and values it wants to foster.

9. **Training is essential.**  
   Responsible AI use must be taught, especially for new users, students, and junior developers.

10. **The human community remains Galaxy’s core strength.**  
    AI should support the people who build, teach, maintain, and use Galaxy, not replace them.

---

## The discussion at a glance

The GCC2026 AI fishbowl discussion explored how Galaxy should adopt AI while protecting reproducibility, transparency, accessibility, and trust. Participants saw promise in AI-assisted tool discovery, error interpretation, documentation, workflow support, and navigation. At the same time, they raised strong concerns about AI-generated scientific conclusions, loss of public knowledge-sharing, environmental impact, attribution, junior researcher training, and the risk of weakening human community connections.

Rather than treating AI as either inevitable progress or something to reject outright, the discussion focused on how Galaxy can shape AI around its existing values. Key ideas included keeping humans in the loop, making AI use auditable, linking AI answers back to trusted community resources, preserving public Q&A, providing responsible AI training, and ensuring that AI features support rather than replace Galaxy’s human community.

The discussion made clear that the Galaxy community is not approaching AI as a trend to adopt uncritically or a threat to reject outright. Instead, Galaxy is asking the harder question: how can AI be shaped by the same values that shaped Galaxy itself? The answer will require technical work, community governance, training, careful design, and continued open discussion. But the fishbowl showed that Galaxy has the right foundation for that work: a community committed to transparent, reproducible, accessible, and human-centered science.
