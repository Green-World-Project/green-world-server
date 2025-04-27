# User Documentation

Base URLs:

# Authentication

- HTTP Authentication, scheme: bearer

# User

## POST LogIn

POST /login

> Body Parameters

```json
{
  "email": "string",
  "password": "string"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» email|body|string| yes |none|
|» password|body|string| yes |none|

> Response Examples

> 200 Response

```json
{
  "email": "Alejandrin_Pagac99@hotmail.com",
  "password": "h3Xl0nL1UklvkA6"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Register

POST /register

> Body Parameters

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "user@example.com",
  "phoneNumber": "string",
  "age": 16,
  "gender": "string",
  "password": "pa$$word"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|[User Schema](#schemauser schema)| no |none|

> Response Examples

> 200 Response

```json
{
  "firstName": "Jane",
  "lastName": "Bauch-Langosh",
  "username": "Nettie Halvorson",
  "email": "Alejandrin_Pagac99@hotmail.com",
  "phoneNumber": "(616) 794-0136",
  "age": 34,
  "gender": "male",
  "password": "h3Xl0nL1UklvkA6"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Get User

GET /user

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PUT Put User

PUT /user/edit

> Body Parameters

```json
{
  "password": "hey#hey"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» password|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PUT Put User Copy

PUT /user/edit/password

> Body Parameters

```json
{
  "password": "hey#hey"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» password|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Data Schema

<h2 id="tocS_User Schema">User Schema</h2>

<a id="schemauser schema"></a>
<a id="schema_User Schema"></a>
<a id="tocSuser schema"></a>
<a id="tocsuser schema"></a>

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "user@example.com",
  "phoneNumber": "string",
  "age": 16,
  "gender": "string",
  "password": "pa$$word"
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|firstName|string|true|none||none|
|lastName|string|true|none||none|
|email|string(email)|true|none||none|
|phoneNumber|string|true|none||none|
|age|integer|false|none||none|
|gender|string|false|none||none|
|password|string(password)|true|none||none|

