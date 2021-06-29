# Organization Management API

In managment API user can create a group ,read it and delete a group. For creating `name` and `organization_id` are neccsary to be mention in the attributes. Other attribute can also used as required.

| Data                   | required |     type      | description                                            |
| :--------------------- | :------- | :-----------: | :----------------------------------------------------- |
| id                     | no       | string($uuid) | (title is id),(readOnly is true)                       |
| name                   | yes      |    string     | (title is name) , (maxLength is 255), (minLength is 1) |
| organization_id        | yes      | string($uuid) | (title is Organization id)                             |
| description            | no       |    string     | (title is description), (maxLength is 255)             |
| local_printing_enabled | no       |    boolean    | (title id Local printing enabled)                      |
| myprinters_enabled     | no       |    boolean    | (title is Myprinters enabled)                          |
| origin                 | no       |    string     | (title is Origin),(readOnly is true)                   |
| num_members            | no       |    string     | (title is Num members),(readOnly is true)              |
| num_printers           | no       |    string     | (title: Num printers),(readOnly: true)                 |

For quick guide how to do all the requests please follow [quick guide for Managment API](../../quick-guides/writing_an_integrations.md)
