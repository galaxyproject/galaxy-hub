---
title: OpenAPI support in Galaxy and Interactive API Documentation
tease: "Since Galaxy release 22.05 it's much easier to discover, explore, learn and experiment with the Galaxy Rest API."
date: '2022-08-05'
tags: [galaxy]
supporters:
- galaxy-europe
subsites: [eu, freiburg]
main_subsite: freiburg
---

Since Galaxy release 22.05 it's much easier to **discover**, **explore**, **learn** and **experiment** with the *Galaxy Rest API*.

Thanks to the recent development efforts in modernizing the Galaxy backend by migrating our custom API framework to [FastAPI](https://fastapi.tiangolo.com/) and moving from a Synchronous (WSGI) to an Asynchronous Server Gateway Interface ([ASGI](https://asgi.readthedocs.io/en/latest/specs/main.html)), the Galaxy API is now [OpenAPI](https://github.com/OAI/OpenAPI-Specification) compliant. This enables many new features that were not possible with the previous framework.

One of those new features is that we now have interactive API documentation using [Swagger](https://swagger.io/)!

[You can go to **https://usegalaxy.eu/api/docs** and try it out now!](https://usegalaxy.eu/api/docs)

![Galaxy OpenAPI Demo](./2022-08-05-galaxy-open-api.gif)


### Let's have a look at how we are migrating our existing API routes

As an example, we can see how the *show quota details* route was migrated in the [*Quotas* API](https://github.com/galaxyproject/galaxy/blob/dev/lib/galaxy/webapps/galaxy/api/quotas.py).

Usually, the first step is moving the existing API logic to a *service layer*. Then, in the API module, we can focus on documenting each endpoint and keep the logic in a different class [QuotasService](https://github.com/galaxyproject/galaxy/blob/dev/lib/galaxy/webapps/galaxy/services/quotas.py) that has extensive [Python type hints](https://docs.python.org/3/library/typing.html) and returns [Pydantic](https://pydantic-docs.helpmanual.io/) models. These *Pydantic models* annotate each field with additional information used by FastAPI to generate the interactive documentation.

Here's an example of the *QuotaDetails* Pydantic model. It provides type hints for each field, default values, title and description:

```python
class QuotaDetails(QuotaBase):
    description: str = QuotaDescriptionField
    bytes: int = Field(
        ...,
        title="Bytes",
        description="The amount, expressed in bytes, of this Quota.",
    )
    operation: QuotaOperation = QuotaOperationField
    display_amount: str = Field(
        ...,
        title="Display Amount",
        description="Human-readable representation of the `amount` field.",
    )
    default: List[DefaultQuota] = Field(
        [],
        title="Default",
        description="A list indicating which types of default user quotas, if any, are associated with this quota.",
    )
    users: List[UserQuota] = Field(
        [],
        title="Users",
        description="A list of specific users associated with this quota.",
    )
    groups: List[GroupQuota] = Field(
        [],
        title="Groups",
        description="A list of specific groups of users associated with this quota.",
    )
```


Then, the `api/quotas/{id}` route in our [Quotas API module](https://github.com/galaxyproject/galaxy/blob/c975fbc538bdd600d91116c82e7536cd4828714e/lib/galaxy/webapps/galaxy/api/quotas.py#L65) will be something like this:

```python
@router.cbv
class FastAPIQuota:
    service: QuotasService = depends(QuotasService)

...

    @router.get(
        "/api/quotas/{id}",
        summary="Displays details on a particular active quota.",
        require_admin=True,
    )
    def show(
        self, trans: ProvidesUserContext = DependsOnTrans, id: EncodedDatabaseIdField = QuotaIdPathParam
    ) -> QuotaDetails:
        """Displays details on a particular active quota."""
        return self.service.show(trans, id)
```

While the `show` function in the [*QuotasService* class](https://github.com/galaxyproject/galaxy/blob/c975fbc538bdd600d91116c82e7536cd4828714e/lib/galaxy/webapps/galaxy/services/quotas.py#L56) is the same that we had in the previous API framework, now, it uses Pydantic models and type annotations to document the parameters and return models.

```python
class QuotasService(ServiceBase):
    """Interface/service object shared by controllers for interacting with quotas."""

...

    def show(self, trans: ProvidesUserContext, id: EncodedDatabaseIdField, deleted: bool = False) -> QuotaDetails:
        """Displays information about a quota."""
        quota = self.quota_manager.get_quota(trans, id, deleted=deleted)
        rval = quota.to_dict(view="element", value_mapper={"id": trans.security.encode_id, "total_disk_usage": float})
        return QuotaDetails.parse_obj(rval)
```

Galaxy is a complex application and its API is considerable large! So there are still some undocumented routes out there. If you are familiar with Galaxy and want to help migrate more API routes or improve the existing documented ones, you are very welcome! Please look at this [GitHub issue](https://github.com/galaxyproject/galaxy/issues/10889) to track which APIs still need documentation.

