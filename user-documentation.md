# Green World API Documentation

### User Documentation

Base URLs:

# Authentication

# User

## POST Log In User

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

## PUT Update User

PUT /user/edit

> Body Parameters

```json
{}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

```json
{
  "firstName": "Monte",
  "lastName": "Mueller",
  "username": "Kathy Leannon",
  "email": "Elvis_Abshire82@gmail.com",
  "phoneNumber": "(568) 310-5989",
  "age": 29,
  "gender": "female",
  "password": "LHY7hi000eNscDO"
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
|» username|string|false|none||none|
|» email|string|false|none||none|
|» phoneNumber|string|false|none||none|
|» age|integer|false|none||none|
|» gender|string|false|none||none|
|» password|string|false|none||none|

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

