## Introduction

> no hooks, still making them dance - Jonwayne

Hooks are a feature in Okta that allows Okta to call out to an API, to get direction (or commands) on what to do.

This repository contains code to deploy a serverless API using [Zeit](https://zeit.co) that uses query parameters to control the responses of the API.  This allows for people to be able to demo Okta Hooks without needing to write code or deploy an API (such as https://github.com/omgitstom/cloudformation).

When specifying your hook URL location in Okta, you can specify query parameters allowing you to demo Okta hooks without modifying any code:



## Installation

TBD

## Pre-registration

Endpoint: `https://{yourzeitdeployurl}.now.sh/pre-reg`

Default Response:

```
{
    "commands": []
}
```

### Controlling the response

#### Update profile

To update a profile, specify the `mode` to be `profile-update` in a query parameter:

```
https://{yourzeitdeployurl}.now.sh/pre-reg?mode=profile-update
```

This will return a command to update the profile:

```
{
    "commands": [
        {
            "type": "com.okta.user.profile.update",
            "value": {
                "customVariable": "customValue"
            }
        }
    ]
}
```

To control the propery and value that is set, you can also pass the `key` and `value` in the query parameters:

```
https://{yourzeitdeployurl}.now.sh/pre-reg?mode=profile-update&key=favoriteAnimal&value=Miley+Cyrus
```

This will return the specified value in the command:

```
{
    "commands": [
        {
            "type": "com.okta.user.profile.update",
            "value": {
                "favoriteAnimal": "Miley Cyrus"
            }
        }
    ]
}
```

#### Deny registration

To deny the registration, specify the `mode` to be `profile-update` in a query parameter:

```
https://{yourzeitdeployurl}.now.sh/pre-reg?mode=deny-registration
```

Response:
```
{
    "commands": [
        {
            "type": "com.okta.action.update",
            "value": {
                "registration": "DENY"
            }
        }
    ]
}
```

#### Error

To error to the end user, specify the `mode` to be `error` in a query parameter:

```
https://{yourzeitdeployurl}.now.sh/pre-reg?mode=error
```

Response:
```
{
  {
    "commands": [],
    "error": {
        "errorSummary": "Customized Error Summary",
        "errorCauses": [
            {
                "errorSummary": "Customized Error Summary",
                "reason": "INVALID_FORMAT",
                "locationType": "body",
                "location": "email",
                "domain": "user"
            }
        ]
    }
  }
}
```

Additional query parameters can be provided to override any property in the errorCauses array.  For example:

```
https://{yourzeitdeployurl}.now.sh/pre-reg?mode=error&errorSummary=Something+went+wrong&reason=UNKNOWN_PROJECT_ID&locationType=body&location=projectId&domain=project
```

Will respond with:

```
{
    "commands": [],
    "error": {
        "errorSummary": "Something went wrong",
        "errorCauses": [
            {
                "errorSummary": "Something went wrong",
                "reason": "UNKNOWN_PROJECT_ID",
                "locationType": "body",
                "location": "projectId",
                "domain": "project"
            }
        ]
    }
}
```
