 

# Information can be requested from users at registration time

* * *

A recent addition to Galaxy introduced the ability to collect specific information about users on the User Registration page using the new Galaxy forms component. After registering, a user can maintain this information by accessing their "User Preferences".

### Details for using this feature

This feature uses a Galaxy form, which must be created by a Galaxy [admin](/src/admin/interface) user.

On the admin page, click on "Manage Forms" link on the left go to the "Create a new form" page.

Provide a name and description of the form, select "User Information" for the "Type" and click the "Add fields" button. You can add any number of fields of any supported type ( TextField, NumberField, TextArea, etc ). These fields will be displayed on the user registration page. When you are finished, click the "Save" button to save the form.

![](/src/admin/config/user-information/create_form.png)

After a form of type "User Information" has been created, the fields defined in the form will be displayed on the User Registration page.

![](/src/admin/config/user-information/user_registration.png)

Users can maintain this information by clicking the "Manage your information" link on the User Preferences page.

![](/src/admin/config/user-information/user_preferences.png)

Here is a sample of the Manage User Information page. Notice the "Add a new address" button. Users can add any number of addresses to their information.

![](/src/admin/config/user-information/user_information.png)

Clicking the "Add a new address" button displays the following page.

![](/src/admin/config/user-information/user_address.png)

When the address is saved, it is included on the Manage User Information page.

![](/src/admin/config/user-information/user_information_with_address.png)
