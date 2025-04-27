# Plant Care System Documentation

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

POST /user/plant

> Body Parameters

```json
{
  "plantName": "string",
  "liter": 0.1,
  "wateringTime": 1,
  "watering": true
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Plant Care System Schema](#schemaplant care system schema)| no |none|

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

## PUT Put Plant Care System

PUT /user/plant/{id}

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
|» wateringTime|body|integer| yes |none|
|» watering|body|boolean| yes |none|

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

## DELETE Delete Plant Care System

DELETE /user/plant/{id}

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
  "plantName": "string",
  "liter": 0.1,
  "wateringTime": 1,
  "watering": true
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|plantName|string|true|none||none|
|liter|number(float)|true|none||none|
|wateringTime|integer|true|none||none|
|watering|boolean|true|none||none|

