# plant Care System Documentation

Base URLs:

# Authentication

- HTTP Authentication, scheme: bearer

# Plant Care System

## GET Get Plant Care System

GET /user/plants

> Body Parameters

```json
{}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

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

## POST Post Plant Care System

POST /user/plant-care

> Body Parameters

```json
{
  "plantID": "string",
  "groundArea": 0.1,
  "isWatered": true
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Plant Care System Schema](#schemaplant care system schema)| no |none|

> Response Examples

> 200 Response

```json
{
  "plantID": "680a54f1a7482cbe22a559ca",
  "groundArea": 5,
  "isWatered": false
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PUT Put Plant Care System

PUT /user/plant-care/{id}

> Body Parameters

```json
{
  "wateringTime": 6,
  "watering": true
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|
|body|body|object| no |none|

> Response Examples

> 200 Response

```json
{
  "wateringTime": 6,
  "watering": true
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## DELETE Delete Plant Care System

DELETE /user/plant-care/{id}

> Body Parameters

```json
{}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|
|body|body|object| no |none|

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

<h2 id="tocS_Plant Care System Schema">Plant Care System Schema</h2>

<a id="schemaplant care system schema"></a>
<a id="schema_Plant Care System Schema"></a>
<a id="tocSplant care system schema"></a>
<a id="tocsplant care system schema"></a>

```json
{
  "plantID": "string",
  "groundArea": 0.1,
  "isWatered": true
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|plantID|string|true|none||none|
|groundArea|number|true|none||none|
|isWatered|boolean|false|none||none|

