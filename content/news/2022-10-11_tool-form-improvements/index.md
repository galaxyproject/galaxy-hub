---
title: Tool form improvements
date: "2022-10-11"
tease: "New pull request from Laila Los merged: Tool form improvements"
autotoc: false
authors: Laila Los
author_github: ElectronicBlueberry
tags: ['enhancement', 'UI-UX', 'client', 'power-user']
subsites: [global]
---

The tool form is a central part of Galaxy and for every interface that is used by every user very frequently.
During the last release cycle the Tool form saw many small improvements to apply various "quality of life" changes.

Here are the changes (in no particular order):

## Sticky Title Bar

[Screencast 2022-08-31 16:46:10.webm](https://user-images.githubusercontent.com/44241786/187708223-7b60412e-3281-4dfa-9cf3-7aebd823ba19.webm)

The Title bar now follows the panel scroll. This is helpful in large tool forms.


## Second Run Button in Title Bar

![image](https://user-images.githubusercontent.com/44241786/187708525-4daae733-70b4-414d-9b55-5f92a2b5674a.png)

The second run button in the sticky title bar ensures that a user can run a tool from anywhere in the tool form. Both buttons states are linked, and disabled simultaneously when the button was pressed.


## Rename "Execute" to "Run Tool"

| Before | After |
|--|--|
| ![image](https://user-images.githubusercontent.com/44241786/187709199-b1452850-8cbd-43e1-99f5-f00a9679b30f.png) | ![image](https://user-images.githubusercontent.com/44241786/187709024-d559020d-1ed4-4adc-a251-70ffa2936546.png) |

"Run Tool" is a more specific wording than execute, as in addition to the action, it also clarifies what the action applies to. The buttons icon was also changed from a check-mark, to a play symbol.

## Remove Button Size and Text Morphing

| Before | After |
|--|--|
| ![image](https://user-images.githubusercontent.com/44241786/187710960-63897b26-7189-47dc-b392-abfcf43a29c5.png) | ![image](https://user-images.githubusercontent.com/44241786/187710694-64034c3b-78bf-49b9-840e-a8d8445083c5.png) |

This PR moves the "Please Wait..." text which appears when the button enters a loading state to a mouseover, instead of displaying it on the button.
This follows UX best practices to always have a button text be an action, also when disabled or preforming said action, and to avoid suddenly resizing elements when the user does not expect it.

This change, as well as the symbol change, also affect the `WorkflowRunForm`.


## Sections

![Untitled](https://user-images.githubusercontent.com/44241786/187711980-f07f057e-458d-4fc0-bc72-7617e291f7fc.png)

New sections have been added to the tool form, which make use of semantic heading elements to improve accessibility.


## Priority Break Points

| Before | After |
|--|--|
| ![image](https://user-images.githubusercontent.com/44241786/187709773-a07ff05c-56c5-4792-b125-d23c1737951a.png) | ![image](https://user-images.githubusercontent.com/44241786/187709955-25138d8d-97f1-4296-a24c-83a2dccd69a6.png) |

Priority break points in the title bar cause it's text to prefer breaking at set locations, rather than words, in order to maintain
coherent blocks of information on each line.


## Show Current Version in Version Select

![image](https://user-images.githubusercontent.com/44241786/187883972-1cffedc2-dcbc-4fe0-8e08-c5c48ff3174b.png)


Thanks to the reviewers [Nicola Soranzo](https://github.com/nsoranzo), [Dannon](https://github.com/dannon) and
[Aysam Guerler](https://github.com/guerler). Check out the code at [#14549](https://github.com/galaxyproject/galaxy/pull/14549)
