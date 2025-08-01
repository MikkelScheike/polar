from enum import StrEnum

from pydantic import GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import core_schema as cs


class Scope(StrEnum):
    openid = "openid"
    profile = "profile"
    email = "email"
    user_read = "user:read"

    web_default = "web_default"  # Web default scope. For users logged in on the web.

    organizations_read = "organizations:read"
    organizations_write = "organizations:write"

    custom_fields_read = "custom_fields:read"
    custom_fields_write = "custom_fields:write"

    discounts_read = "discounts:read"
    discounts_write = "discounts:write"

    checkout_links_read = "checkout_links:read"
    checkout_links_write = "checkout_links:write"

    checkouts_read = "checkouts:read"
    checkouts_write = "checkouts:write"

    transactions_read = "transactions:read"
    transactions_write = "transactions:write"

    payouts_read = "payouts:read"
    payouts_write = "payouts:write"

    products_read = "products:read"
    products_write = "products:write"

    benefits_read = "benefits:read"
    benefits_write = "benefits:write"

    events_read = "events:read"
    events_write = "events:write"

    meters_read = "meters:read"
    meters_write = "meters:write"

    files_read = "files:read"
    files_write = "files:write"

    subscriptions_read = "subscriptions:read"
    subscriptions_write = "subscriptions:write"

    customers_read = "customers:read"
    customers_write = "customers:write"

    customer_meters_read = "customer_meters:read"

    customer_sessions_write = "customer_sessions:write"

    orders_read = "orders:read"
    orders_write = "orders:write"

    refunds_read = "refunds:read"
    refunds_write = "refunds:write"
    payments_read = "payments:read"

    metrics_read = "metrics:read"

    webhooks_read = "webhooks:read"
    webhooks_write = "webhooks:write"

    external_organizations_read = "external_organizations:read"

    license_keys_read = "license_keys:read"
    license_keys_write = "license_keys:write"

    repositories_read = "repositories:read"
    repositories_write = "repositories:write"

    issues_read = "issues:read"
    issues_write = "issues:write"

    customer_portal_read = "customer_portal:read"
    customer_portal_write = "customer_portal:write"

    notifications_read = "notifications:read"
    notifications_write = "notifications:write"

    notification_recipients_read = "notification_recipients:read"
    notification_recipients_write = "notification_recipients:write"

    @classmethod
    def __get_pydantic_json_schema__(
        cls, core_schema: cs.CoreSchema, handler: GetJsonSchemaHandler
    ) -> JsonSchemaValue:
        json_schema = handler(core_schema)
        json_schema = handler.resolve_ref_schema(json_schema)
        json_schema["enumNames"] = SCOPES_SUPPORTED_DISPLAY_NAMES
        return json_schema


RESERVED_SCOPES = {Scope.web_default}
SCOPES_SUPPORTED = [s.value for s in Scope if s not in RESERVED_SCOPES]
SCOPES_SUPPORTED_DISPLAY_NAMES: dict[Scope, str] = {
    Scope.openid: "OpenID",
    Scope.profile: "Read your profile",
    Scope.email: "Read your email address",
    Scope.web_default: "Web Default",
    Scope.user_read: "User Read",
    Scope.organizations_read: "Read your organizations",
    Scope.organizations_write: "Create or modify organizations",
    Scope.custom_fields_read: "Read custom fields",
    Scope.custom_fields_write: "Create or modify custom fields",
    Scope.discounts_read: "Read discounts",
    Scope.discounts_write: "Create or modify discounts",
    Scope.checkout_links_read: "Read checkout links",
    Scope.checkout_links_write: "Create or modify checkout links",
    Scope.checkouts_read: "Read checkout sessions",
    Scope.checkouts_write: "Create or modify checkout sessions",
    Scope.transactions_read: "Read transactions",
    Scope.transactions_write: "Create or modify transactions",
    Scope.payouts_read: "Read payouts",
    Scope.payouts_write: "Create or modify payouts",
    Scope.products_read: "Read products",
    Scope.products_write: "Create or modify products",
    Scope.benefits_read: "Read benefits",
    Scope.benefits_write: "Create or modify benefits",
    Scope.events_read: "Read events",
    Scope.events_write: "Create events",
    Scope.meters_read: "Read meters",
    Scope.meters_write: "Create or modify meters",
    Scope.files_read: "Read file uploads",
    Scope.files_write: "Create or modify file uploads",
    Scope.subscriptions_read: "Read subscriptions made on your organizations",
    Scope.subscriptions_write: (
        "Create or modify subscriptions made on your organizations"
    ),
    Scope.customers_read: "Read customers",
    Scope.customers_write: "Create or modify customers",
    Scope.customer_meters_read: "Read customer meters",
    Scope.customer_sessions_write: "Create or modify customer sessions",
    Scope.orders_read: "Read orders made on your organizations",
    Scope.orders_write: "Modify orders made on your organizations",
    Scope.refunds_read: "Read refunds made on your organizations",
    Scope.refunds_write: "Create or modify refunds",
    Scope.payments_read: "Read payments made on your organizations",
    Scope.metrics_read: "Read metrics",
    Scope.webhooks_read: "Read webhooks",
    Scope.webhooks_write: "Create or modify webhooks",
    Scope.external_organizations_read: "Read external organizations",
    Scope.license_keys_read: "Read license keys",
    Scope.license_keys_write: "Modify license keys",
    Scope.customer_portal_read: "Read your orders, subscriptions and benefits",
    Scope.customer_portal_write: "Create or modify your orders, subscriptions and benefits",
    Scope.notifications_read: "Read notifications",
    Scope.notifications_write: "Mark notifications as read",
    Scope.notification_recipients_read: "Read notification recipients",
    Scope.notification_recipients_write: "Create or modify notification recipients",
}


def scope_to_set(scope: str) -> set[Scope]:
    return {Scope(x) for x in scope.strip().split()}


def scope_to_list(scope: str) -> list[Scope]:
    return list(scope_to_set(scope))
