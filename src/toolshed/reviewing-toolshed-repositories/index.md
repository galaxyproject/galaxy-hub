---
title: Reviewing ToolShed Repositories
---
<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'>![Galaxy Main ToolShed](/src/images/logos/ToolShed.jpg)</a> </div>



# The Intergalactic Utilities Commission

The Galaxy community formed a commission to help improve the quality of published Galaxy utilities. More about the [IUC](/src/iuc/index.md).

# Granting authority to review a repository

The ability to review repositories is restricted to certain tool shed accounts via the tool shed's role-based authorization features.  Authority to review a repository is granted to these accounts by the tool shed administrator.  Clicking the **Manage roles** link in the tool shed's **Administration** menu will display a page like the following.  Notice the new **Repository reviewer** role authorizing a user or group member with the role to review repositories.

![](/src/toolshed/reviewing-toolshed-repositories/tool_shed_roles.png)

The Intergalactic Utilities Commission has been defined in the tool shed as a group that will have the **Repository reviewer** role.  Clicking the **Manage groups** administrator menu option displays the following page showing this new group.

![](/src/toolshed/reviewing-toolshed-repositories/tool_shed_groups.png)

For the sake of this discussion, we'll set the user account **test** to be a member of the **Intergalactic Utilities Commission** group as shown in the page below.  Although the focus of this document is the main Galaxy tool shed, those that maintain their own local tool sheds can use the features and processes described here to incorporate a review process into their environment if desired.  You can defined a local Intergalactic Utilities Commission using the combination of this groups and role, or you can associate a set of tool shed accounts with the role.

![](/src/toolshed/reviewing-toolshed-repositories/iuc_group_members.png)

Those user accounts that are authorized to review repositories will see additional options in their tool shed menus.  Logging in to the tool shed as as the **test** user displays a new section labeled **Reviewing Repositories** in our tool shed menu.

![](/src/toolshed/reviewing-toolshed-repositories/reviewing_repositories_menu.png)

# Repository components that can be reviewed

The default list of repository components that can be reviewed is shown on the page displayed when the **Manage review components** link within the **Reviewing Repositories** menu section is clicked.  Notice that you can add new review components from this page. Review components are clearly attributes of the repository, but you may choose to include additional process-oriented items for review in your local instance (e.g., installation and/or functional correctness within a Galaxy instance).  The current goal for the main Galaxy tool shed is for an automated buildbot to handle these review components some time soon.

![](/src/toolshed/reviewing-toolshed-repositories/review_components.png)

# Tool shed repository reviews

Ideally (but unusually), a repository reviewer will find all of the components (features) of a repository in perfect working order, so it can be marked as approved without any changes by the owner.  In most cases though, the process of reviewing a tool shed repository will incorporate "back-and-forth communication" between a reviewer and the owner of the repository under review.  The current tool shed feature that the reviewer can be use to support this communication process is the **Contact repository owner** option in the **Repository Actions** pop-up menu for the repository.  The general approach to using this feature as the communication mechanism would be for the reviewer to contact the repository owner when the review is completed.  A result of doing this is the email address exchange between the reviewer and the repository owner, so from this point on email exchanges are possible.  This approach can be enhanced if the IUC advises that it should be.

## Initial review of a tool shed repository

To see how this works, let's assume we have our favorite **Filter** repository (owned by the **test1** user account) in the tool shed as shown here.

![](/src/toolshed/reviewing-toolshed-repositories/filter.png)

Since the **filter** repository has not yet been reviewed, we'll click the **Repositories with no reviews** link in our tool shed menu to add a review to the repository.  The resulting page will be a list of all repositories in the tool shed that have not yet been reviewed.  Notice that the list includes a column labeled **Revisions for review**, implying that reviews of tool shed repositories are performed on a per-revision basis.  The **Repository name** column also includes a pop-up menu with an option labeled **Inspect repository revisions** that allows you to choose a specific revision for your review.  Each of these options take slightly different paths toward enabling you to add a review to this specified repository revision.

![](/src/toolshed/reviewing-toolshed-repositories/repositories_with_no_reviews.png)

Clicking the **'0:fb7df3011c2b** revision link in the **Revisions for review** column displays the following page, which includes both a **Revision** button and a button labeled **Add a review to this revision**.

![](/src/toolshed/reviewing-toolshed-repositories/revision_reviews.png)

The **Revision** button in the above page provides the mechanism for reviewing the repository contents.  Clicking it displays the page allowing the user to manage or review the repository contents, depending upon their administrative credentials or ownership of the repository.  From this page you can inspect the contents of the repository, including metadata about included tools (if the repository includes tools).

![](/src/toolshed/reviewing-toolshed-repositories/manage_repository.png)

Selecting the **View tool metadata**menu option in the above page displays the following page where we see that no requirements are defined for this tool (so the repository should not contain a **tool_dependencies.xml** file), but the tool config file does define 4 functional tests within it's `<tests>` tag set.

![](/src/toolshed/reviewing-toolshed-repositories/view_tool_metadata.png)

However, just because the tool config defines functional tests for the tool, the tests cannot be executed within the environment into which the repository will be installed unless the repository includes the input and output datasets defined within each `<test>` tag set defined in the tool config.  For tests to work, the repository must include a directory named **test-data** somewhere in its file system hierarchy, and all functional test input and output datasets must be included in this directory (see the [Including functional tests for your tools](/src/testing-installed-tools/index.md) page of the tool shed wiki for all of the details about including working functional tests in your tool shed repository tools).

We'll select the **Browse repository tip files** option from the **Repository Actions** pop-up menu in the above page to make sure the required files exist in the repository.  Unfortunately we discover that, in this case, they do not exist.

![](/src/toolshed/reviewing-toolshed-repositories/browse_repository_tip_files.png)

Now that we've inspected the contents of the **Filter** repository, we can return to adding out review by selecting the **Add a review to this revision** option in the **Repository Options** pop-up menu available on the various pages displayed above, or click the **Repositories with no reviews** menu options as we did before.  Using the first approach will create a new review for the specified revision and display a page like the following.

Notice the **Repository revision** button enabling you to easily move between viewing the revision contents and metadata, and the review itself.  The revision can be marked as approved using the **Approve this repository revision?** select list.  The review also consists of a section for each review component defined for the tool shed (see the **Repository components that can be reviewed** section above for details).

![](/src/toolshed/reviewing-toolshed-repositories/new_review.png)

As described above, a repository review consists of a section for each review component defined for the tool shed.  Since our example tool shed defines the list of review components to be the default list **Data types**, **Functional tests**, **README**, **Tool dependencies**, **Tools** and **Workflows**, the repository review page includes a section for each of these components.

![](/src/toolshed/reviewing-toolshed-repositories/new_review.png)

Obviously, not all of these components are applicable to all repositories.  Remember that the filter tool in our example **Filter** repository does not define any requirements, so the Tool dependencies component review can be ignored in our example.  In fact, our example repository contains no Data types, README files or Workflows either, so each of these component review can be ignored as well.

So this leaves us with reviewing only Tools and Functional tests for our example.  We'll fill out those 2 component sections as shown below and save the review (notice that all changes made on the review page will be saved when any **Save** button is clicked).  Each component review can be marked private (or not), marked as approved (or not) and rated using the Galaxy 5-star rating feature.  Of course comments can be made for each component as well, which is highly recommended if the component requires work by the repository owner before it can be marked as approved.

![](/src/toolshed/reviewing-toolshed-repositories/functional_tests_review.png)

![](/src/toolshed/reviewing-toolshed-repositories/tools_review.png)

## Repository owners and users with write permission can read reviews and undertake recommended actions

When owners of repositories that have been reviewed log into the tool shed, they will see a link labeled **Reviewed repositories I own** under the **My Repositories and Tools** menu section.  Similarly, users with write permission on a repository are allowed to see reviews of the repository via an available option in the **Repository Actions** pop-up menu.

Here we log in as the user **test1**, who owns the example **Filter** repository.

![](/src/toolshed/reviewing-toolshed-repositories/reviewed_repositories_i_own_menu_item.png)

Clicking the **Reviewed repositories I own** menu link displays a page like the following, which includes a pop-up menu option labeled **Inspect repository revisions** for each reviewed repository as well as links to each reviewer, reviewed revision, and revisions yet to be reviewed.

![](/src/toolshed/reviewing-toolshed-repositories/reviewed_repositories_i_own.png)

Clicking the **0:fb7df3011c2b** link in the **Reviewed revisions** column in the above page displays a page like the following.  Again, notice the **Revision** button enabling the repository owner to easily move between viewing the revision contents and metadata, and the review itself.  The **Reviewer** pop-up menu provides an option to browse the review to discover the reasons why the repository is not yet marked as approved.  The **Repository rating** value displayed on this page is the average of the rating the reviewer set for each component reviewed, and is automatically generated.  Remember in our example, the reviewer rated the **Functional tests** component with 0 stars and the **Tools** component with 4 stars.  The average rating of the 2 components is 2 stars, which is what we see on this page for the overall **	Repository rating**.

![](/src/toolshed/reviewing-toolshed-repositories/filter_revision_reviews.png)

Selecting the **Browse this review** option from the **Reviewer** pop-up menu shown in the page above displays the review in a page like the following.  Notice that only the components that the reviewer included in the review are displayed here.  Ignored components that are not relevant to the repository are not associated with the review.  This enables the user to easily determine the steps to be taken to correct problems detailed in the review.  In our example, the repository owner should upload functional test data files into a subdirectory named **test-data** in the repository.

![](/src/toolshed/reviewing-toolshed-repositories/filter_fb7df3011c2b_review.png)

After making the recommended corrections to the repository, the repository files hierarchy now look like this.

![](/src/toolshed/reviewing-toolshed-repositories/filter_file_hierarchy.png)

Uploading the functional test data files has created a new changeset revision in the repository as well.  Notice that the repository now has the initial revision **0:fb7df3011c2b** which was reviewed as well as the new revision **1:07d61f25cd35**.

![](/src/toolshed/reviewing-toolshed-repositories/filter_changelog.png)

## Reviewers can add additional reviews after corrective actions are performed by owners

When a reviewer clicks on the **Repositories reviewed by me** link in the tool shed menu, a page like the following is displayed enabling them to manage their current reviews.  A pop-up menu option enabling the reviewer to inspect the repository revisions is available along with links to reviewed revisions and links to revisions not yet reviewed.  In our example, the reviewer will most likely inspect the **Filter** repository's new **1:07d61f25cd35** revision since it likely includes the requested corrections.  The link associated with the reviewer **test** in the **Reviewers** column displays a list of all repository revision reviews performed by that reviewer.

![](/src/toolshed/reviewing-toolshed-repositories/repositories_reviewed_by_me.png)

Clicking on the **1:07d61f25cd35** revision link in the **Revisions for review** column in the above page displays a page like the following.  Now when the reviewer clicks the **Revision** button to view the repository contents, they'll discover the uploaded functional test data files.

![](/src/toolshed/reviewing-toolshed-repositories/add_review_to_07d61f25cd35.png)

Clicking the **Add review to this revision** button in the above page displays a page like the following.  Here the reviewer can copy the contents of the review they completed for the previous revision **0:fb7df3011c2b** to the review they are performing for the new revision **1:07d61f25cd35**.  In many cases this could save a lot of typing.  The review can also choose to create a review for the new revision without copying the contents of the previous review.

![](/src/toolshed/reviewing-toolshed-repositories/copy_previous_review.png)

Selecting the **Copy this review** option from the **Reviewer** column's pop-up menu in the above page will create a new review for the **1:07d61f25cd35** revision, copying the contents of the selected previous review.  The review page similar to the following will be displayed, and the review can make appropriate changes.

![](/src/toolshed/reviewing-toolshed-repositories/filter_07d61f25cd35_review.png)

For our example we'll set the **Approve this repository revision?** select field to Yes and make the following changes to the copied contents of our original review of the **Functional tests** component.

![](/src/toolshed/reviewing-toolshed-repositories/revision_approved.png)

![](/src/toolshed/reviewing-toolshed-repositories/functional_tests_review2.png)

Now when the repository owner clicks the **Reviewed repositories I own** link to inspect their **Filter** repository, they'll discover that revision **1:07d61f25cd35** has been approved.

![](/src/toolshed/reviewing-toolshed-repositories/revision_07d61f25cd35_approved.png)
