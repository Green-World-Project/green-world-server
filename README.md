---
title: Green World API Documentation
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.27"

---

# Green World API Documentation

Base URLs:

# Authentication

# User

## POST Log In User

POST /user/login

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
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Sign Up User

POST /user/signup

> Body Parameters

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "user@example.com",
  "phoneNumber": "string",
  "age": 16,
  "gender": "string",
  "password": "string"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» firstName|body|string| yes |none|
|» lastName|body|string| yes |none|
|» email|body|string(email)| yes |none|
|» phoneNumber|body|string| yes |none|
|» age|body|integer| no |none|
|» gender|body|string| no |none|
|» password|body|string| yes |none|

> Response Examples

```json
{
  "firstName": "Jane",
  "lastName": "Bauch-Langosh",
  "username": "Nettie Halvorson",
  "email": "Alejandrin_Pagac99@hotmail.com",
  "phoneNumber": "(616) 794-0136",
  "age": 34130795,
  "gender": "male",
  "password": "h3Xl0nL1UklvkA6"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PUT Update User

PUT /user/{username}

> Body Parameters

```json
{
  "_id": "string"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|username|path|string| yes |none|
|body|body|object| no |none|
|» _id|body|string| yes |none|

> Response Examples

```json
{
  "firstName": "Raghda",
  "lastName": "Elsayed",
  "phoneNumber": "01500000",
  "age": 22,
  "gender": "female",
  "email": "raghda@gmail.com",
  "password": "password"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» firstName|string|true|none||none|
|» lastName|string|true|none||none|
|» username|string|true|none||none|
|» email|string|true|none||none|
|» phoneNumber|string|true|none||none|
|» age|integer|true|none||none|
|» gender|string|true|none||none|
|» password|string|true|none||none|

# Data Schema

<h2 id="tocS_userSchema">userSchema</h2>

<a id="schemauserschema"></a>
<a id="schema_userSchema"></a>
<a id="tocSuserschema"></a>
<a id="tocsuserschema"></a>

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "user@example.com",
  "phoneNumber": "string",
  "age": 16,
  "gender": "string",
  "password": "string"
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
|password|string|true|none||none|

