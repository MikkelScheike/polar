import datetime

from pydantic import UUID4, EmailStr, field_validator

from polar.kit.email import EmailStrDNS
from polar.kit.http import get_safe_return_url
from polar.kit.schemas import Schema
from polar.user.schemas import (
    UserSignupAttribution,
)


class MagicLinkRequest(Schema):
    email: EmailStrDNS
    return_to: str | None = None
    attribution: UserSignupAttribution | None = None

    @field_validator("return_to")
    @classmethod
    def validate_return_to(cls, v: str | None) -> str:
        return get_safe_return_url(v)


class MagicLinkCreate(Schema):
    token_hash: str
    user_email: EmailStr
    signup_attribution: UserSignupAttribution | None = None
    user_id: UUID4 | None = None
    expires_at: datetime.datetime | None = None


class MagicLinkUpdate(Schema):
    pass
