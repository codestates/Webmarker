# Users



{% hint style="info" %}
**Good to know:** All the methods shown below are synced to an example Swagger file URL and are kept up to date automatically with changes to the API.
{% endhint %}

## User actions

{% swagger method="post" path="webmarker/users/login" baseUrl="http://" summary="Login" %}
{% swagger-description %}
User login
{% endswagger-description %}

{% swagger-parameter in="body" name="email" required="true" %}
user email
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" required="true" %}
user password
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

## Creating users

